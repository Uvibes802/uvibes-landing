import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuoteToCollectif } from "@/services/crm/sendQuoteEmail";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
  if (!quote) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  await sendQuoteToCollectif({
    to: quote.collectif.email,
    collectifNom: quote.collectif.nom,
    quoteNumero: quote.numero,
    quoteId: id,
    planNom: quote.planNom,
    prixHT: quote.prixHT,
    prixTTC: quote.prixTTC,
  });

  await prisma.quote.update({
    where: { id },
    data: { statut: "ENVOYE", sentAt: new Date(), sentTo: quote.collectif.email },
  });

  return NextResponse.json({ ok: true });
}
