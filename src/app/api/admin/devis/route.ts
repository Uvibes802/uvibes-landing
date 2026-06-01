import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const statut = searchParams.get("statut");
  const search = searchParams.get("q");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (statut) where.statut = statut;
  if (search) {
    where.OR = [
      { numero: { contains: search } },
      { collectif: { nom: { contains: search } } },
      { collectif: { email: { contains: search } } },
    ];
  }

  const [total, items] = await Promise.all([
    prisma.quote.count({ where }),
    prisma.quote.findMany({
      where,
      include: { collectif: { select: { nom: true, email: true, typeCollectif: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return NextResponse.json({ total, page, limit, items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      collectifId, nomNouveauCollectif, contactNouveauCollectif, emailNouveauCollectif,
      telephoneNouveauCollectif, villeNouveauCollectif, typeCollectif, tailleCollectif,
      planSlug, nombreUtilisateurs, dureeContrat, remiseManuelle, envoyerMaintenant,
    } = body;

    if (!planSlug || !nombreUtilisateurs || !dureeContrat) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Import dynamique pour éviter les dépendances circulaires
    const { calculateQuote } = await import("@/services/crm/calculateQuote");
    const { generateQuoteNumber } = await import("@/services/crm/generateQuoteNumber");

    const calc = await calculateQuote({ planSlug, nombreUtilisateurs, dureeContrat });
    const remise = remiseManuelle != null ? Number(remiseManuelle) : calc.remise;

    let cId = collectifId;
    if (!cId) {
      if (!nomNouveauCollectif || !emailNouveauCollectif) {
        return NextResponse.json({ error: "Nom et email du collectif requis" }, { status: 400 });
      }
      const collectif = await prisma.collectif.create({
        data: {
          nom: nomNouveauCollectif,
          contact: contactNouveauCollectif ?? nomNouveauCollectif,
          email: emailNouveauCollectif,
          telephone: telephoneNouveauCollectif || null,
          ville: villeNouveauCollectif || null,
          typeCollectif: typeCollectif ?? "Autre",
          tailleCollectif: tailleCollectif ?? "50-250",
          source: "admin",
        },
      });
      cId = collectif.id;
    }

    const numero = await generateQuoteNumber();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const quote = await prisma.quote.create({
      data: {
        numero,
        collectifId: cId,
        planSlug: calc.plan.slug,
        planNom: calc.plan.nom,
        planCouleur: calc.plan.couleur,
        featuresJson: JSON.stringify(calc.features),
        nombreUtilisateurs,
        dureeContrat,
        remise,
        prixHT: calc.prixHT,
        prixTTC: calc.prixTTC,
        mentionPrix: calc.mentionPrix,
        statut: envoyerMaintenant ? "ENVOYE" : "BROUILLON",
        validUntil,
      },
    });

    if (envoyerMaintenant) {
      const { sendQuoteToCollectif } = await import("@/services/crm/sendQuoteEmail");
      const collectif = await prisma.collectif.findUnique({ where: { id: cId } });
      if (collectif) {
        await sendQuoteToCollectif({
          to: collectif.email,
          collectifNom: collectif.nom,
          quoteNumero: numero,
          quoteId: quote.id,
          planNom: calc.plan.nom,
          prixHT: calc.prixHT,
          prixTTC: calc.prixTTC,
        }).catch(console.error);
        await prisma.quote.update({ where: { id: quote.id }, data: { sentAt: new Date(), sentTo: collectif.email } });
      }
    }

    return NextResponse.json({ id: quote.id, numero }, { status: 201 });
  } catch (e: unknown) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
