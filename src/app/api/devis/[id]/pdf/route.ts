import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateQuotePdf } from "@/services/pdf/generateQuotePdf";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: { collectif: true },
    });

    if (!quote) {
      return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });
    }

    const pdfBuffer = await generateQuotePdf({ quote });

    // ?inline=1 → affichage dans le navigateur (aperçu) au lieu du téléchargement
    const inline = req.nextUrl.searchParams.get("inline") === "1";
    const disposition = inline ? "inline" : "attachment";

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${quote.numero}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur génération PDF" }, { status: 500 });
  }
}
