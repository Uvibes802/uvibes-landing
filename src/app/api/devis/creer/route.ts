import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { calculateQuote } from "@/services/crm/calculateQuote";
import { generateQuoteNumber } from "@/services/crm/generateQuoteNumber";
import { notifyDirectrice, sendQuoteToCollectif } from "@/services/crm/sendQuoteEmail";

export async function POST(req: NextRequest) {
  try {
    // Anti-spam : limite la création publique de collectifs + devis
    if (!rateLimit({ key: "devis-creer", ip: getClientIp(req), max: 5, windowMs: 10 * 60_000 })) {
      return NextResponse.json({ error: "Trop de demandes — réessayez plus tard." }, { status: 429 });
    }

    // Garde serveur : refuse la création si les devis sont désactivés par l'admin
    // (en complément du masquage UI, pour empêcher tout contournement via appel direct à l'API)
    const devisDisabled = (await prisma.cmsContent.findUnique({ where: { cle: "devis-disabled" } }))?.valeur === "true";
    if (devisDisabled) {
      return NextResponse.json({ error: "Les demandes de devis sont temporairement suspendues." }, { status: 403 });
    }

    const body = await req.json();
    const {
      // Infos collectif
      nom, contact, email, telephone, ville, adresse, siret,
      typeCollectif, typePrecision, tailleCollectif, usagesPrevus, besoinsNotes,
      // Devis
      planSlug, nombreUtilisateurs, dureeContrat,
    } = body;

    if (!nom || !contact || !email || !planSlug || !nombreUtilisateurs || !dureeContrat) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // « Autre » → on fusionne la précision saisie dans le type d'organisation
    const typeFinal = typeCollectif === "Autre" && typePrecision?.trim()
      ? `Autre : ${typePrecision.trim()}`
      : typeCollectif;

    // Calculer le prix
    const calc = await calculateQuote({ planSlug, nombreUtilisateurs, dureeContrat });

    // Créer ou retrouver le collectif
    const collectif = await prisma.collectif.create({
      data: {
        nom, contact, email,
        telephone: telephone || null,
        ville: ville || null,
        adresse: adresse || null,
        siret: siret || null,
        typeCollectif: typeFinal, tailleCollectif,
        usagesPrevus: JSON.stringify(usagesPrevus || []),
        besoinsNotes: besoinsNotes || null,
        source: "formulaire_site",
      },
    });

    // Créer le devis
    const numero = await generateQuoteNumber();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const quote = await prisma.quote.create({
      data: {
        numero,
        collectifId: collectif.id,
        planSlug: calc.plan.slug,
        planNom: calc.plan.nom,
        planCouleur: calc.plan.couleur,
        featuresJson: JSON.stringify(calc.features),
        nombreUtilisateurs,
        dureeContrat,
        remise: calc.remise,
        prixHT: calc.prixHT,
        prixTTC: calc.prixTTC,
        mentionPrix: calc.mentionPrix,
        statut: "ENVOYE",
        validUntil,
      },
    });

    // Envoyer le devis au client (lien vers la page de devis + signature) — fire & forget
    sendQuoteToCollectif({
      to: email,
      collectifNom: nom,
      quoteNumero: numero,
      quoteId: quote.id,
      planNom: calc.plan.nom,
      prixHT: calc.prixHT,
      prixTTC: calc.prixTTC,
    }).catch(console.error);

    // Notifier la directrice (fire & forget)
    notifyDirectrice({
      to: process.env.EMAIL_USER ?? "",
      collectifNom: nom,
      quoteNumero: numero,
      quoteId: quote.id,
      planNom: calc.plan.nom,
      prixHT: calc.prixHT,
      prixTTC: calc.prixTTC,
    }).catch(console.error);

    return NextResponse.json({ id: quote.id, numero });
  } catch (e: unknown) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
