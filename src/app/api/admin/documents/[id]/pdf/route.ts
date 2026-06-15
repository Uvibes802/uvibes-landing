import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBusinessDocPdf } from "@/services/pdf/generateBusinessDocPdf";
import { pdfResponse } from "@/lib/pdfResponse";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const d = await prisma.businessDoc.findUnique({ where: { id } });
    if (!d) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

    const pdf = await generateBusinessDocPdf({
      numero: d.numero,
      type: d.type,
      clientNom: d.clientNom,
      clientContact: d.clientContact,
      clientEmail: d.clientEmail,
      clientAdresse: d.clientAdresse,
      objet: d.objet,
      dateEmission: d.dateEmission,
      dateEcheance: d.dateEcheance,
      lignes: JSON.parse(d.lignesJson || "[]"),
      corps: d.corps,
      conditions: d.conditions,
      tauxTva: d.tauxTva,
    });

    const inline = req.nextUrl.searchParams.get("inline") === "1";
    return pdfResponse(pdf, `${d.numero}.pdf`, inline);
  } catch (e) {
    console.error("[documents/pdf]", e);
    return NextResponse.json({ error: "Erreur génération PDF" }, { status: 500 });
  }
}
