import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuoteToCollectif } from "@/services/crm/sendQuoteEmail";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
  if (!quote) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Destinataire : email fourni par l'admin (envoi à une adresse au choix), sinon celui du collectif
  let destinataire = quote.collectif.email;
  try {
    const body = await req.json();
    if (body?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
      destinataire = String(body.email).trim();
    }
  } catch {
    // pas de corps JSON → on garde l'email du collectif
  }

  await sendQuoteToCollectif({
    to: destinataire,
    collectifNom: quote.collectif.nom,
    quoteNumero: quote.numero,
    quoteId: id,
    planNom: quote.planNom,
    prixHT: quote.prixHT,
    prixTTC: quote.prixTTC,
  });

  await prisma.quote.update({
    where: { id },
    data: { statut: "ENVOYE", sentAt: new Date(), sentTo: destinataire },
  });

  return NextResponse.json({ ok: true, sentTo: destinataire });
}
