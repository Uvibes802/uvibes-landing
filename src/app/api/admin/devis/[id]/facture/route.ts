import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInvoicePdf } from "@/services/pdf/generateInvoicePdf";
import { pdfResponse } from "@/lib/pdfResponse";

// Génère la facture PDF d'un devis (à la volée). Réservé à l'admin (middleware).
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
    if (!quote) return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });

    const pdfBuffer = await generateInvoicePdf({ quote });
    const inline = req.nextUrl.searchParams.get("inline") === "1";
    const filename = `${quote.numero.replace(/^UV/, "FAC")}.pdf`;
    return pdfResponse(pdfBuffer, filename, inline);
  } catch (e) {
    console.error("[facture] ", e);
    return NextResponse.json({ error: "Erreur génération facture" }, { status: 500 });
  }
}
