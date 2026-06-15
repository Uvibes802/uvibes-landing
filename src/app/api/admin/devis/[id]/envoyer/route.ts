import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuoteToCollectif } from "@/services/crm/sendQuoteEmail";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
  if (!quote) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Destinataire + message personnalisé fournis par l'admin
  let destinataire = quote.collectif.email;
  let message: string | undefined;
  try {
    const body = await req.json();
    if (body?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
      destinataire = String(body.email).trim();
    }
    if (body?.message && String(body.message).trim()) {
      message = String(body.message).trim().slice(0, 2000);
    }
  } catch {
    // pas de corps JSON → valeurs par défaut
  }

  await sendQuoteToCollectif({
    to: destinataire,
    collectifNom: quote.collectif.nom,
    quoteNumero: quote.numero,
    quoteId: id,
    planNom: quote.planNom,
    prixHT: quote.prixHT,
    prixTTC: quote.prixTTC,
    message,
  });

  await prisma.quote.update({
    where: { id },
    data: { statut: "ENVOYE", sentAt: new Date(), sentTo: destinataire },
  });

  return NextResponse.json({ ok: true, sentTo: destinataire });
}
