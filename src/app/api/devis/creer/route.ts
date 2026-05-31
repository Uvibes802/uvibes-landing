import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateQuote } from "@/services/crm/calculateQuote";
import { generateQuoteNumber } from "@/services/crm/generateQuoteNumber";
import { notifyDirectrice } from "@/services/crm/sendQuoteEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      // Infos collectif
      nom, contact, email, telephone, ville,
      typeCollectif, tailleCollectif, usagesPrevus, besoinsNotes,
      // Devis
      planSlug, nombreUtilisateurs, dureeContrat,
    } = body;

    if (!nom || !contact || !email || !planSlug || !nombreUtilisateurs || !dureeContrat) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Calculer le prix
    const calc = await calculateQuote({ planSlug, nombreUtilisateurs, dureeContrat });

    // Créer ou retrouver le collectif
    const collectif = await prisma.collectif.create({
      data: {
        nom, contact, email,
        telephone: telephone || null,
        ville: ville || null,
        typeCollectif, tailleCollectif,
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
