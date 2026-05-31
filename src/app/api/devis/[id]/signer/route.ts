import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateQuotePdf } from "@/services/pdf/generateQuotePdf";
import { sendQuoteToCollectif, notifyDirectrice } from "@/services/crm/sendQuoteEmail";
import path from "path";
import fs from "fs/promises";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { signatureData, signedByName, signedByRole } = await req.json();

    if (!signatureData || !signedByName) {
      return NextResponse.json({ error: "Signature et nom requis" }, { status: 400 });
    }

    const existingQuote = await prisma.quote.findUnique({
      where: { id },
      include: { collectif: true },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });
    }

    if (existingQuote.statut === "SIGNE") {
      return NextResponse.json({ error: "Devis déjà signé" }, { status: 400 });
    }

    // Enregistrer la signature
    const quote = await prisma.quote.update({
      where: { id },
      data: {
        signedAt: new Date(),
        signatureData,
        signedByName,
        signedByRole: signedByRole || null,
        statut: "SIGNE",
      },
      include: { collectif: true },
    });

    // Générer le PDF
    const pdfBuffer = await generateQuotePdf({ quote });
    const pdfDir = path.join(process.cwd(), "public", "uploads", "devis");
    await fs.mkdir(pdfDir, { recursive: true });
    const pdfFilename = `${quote.numero}.pdf`;
    const pdfPath = path.join(pdfDir, pdfFilename);
    await fs.writeFile(pdfPath, pdfBuffer);
    const pdfUrl = `/uploads/devis/${pdfFilename}`;

    await prisma.quote.update({
      where: { id },
      data: { pdfPath: pdfUrl, pdfGeneratedAt: new Date() },
    });

    // Emails (fire & forget)
    const emailParams = {
      to: quote.collectif.email,
      collectifNom: quote.collectif.nom,
      quoteNumero: quote.numero,
      quoteId: id,
      planNom: quote.planNom,
      prixHT: quote.prixHT,
      prixTTC: quote.prixTTC,
      signed: true,
      pdfPath: pdfUrl,
    };

    sendQuoteToCollectif(emailParams).catch(console.error);
    notifyDirectrice(emailParams).catch(console.error);

    return NextResponse.json({ ok: true, pdfUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
