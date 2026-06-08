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

    // Enregistrer la signature en base
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

    // Générer le PDF — tenter d'abord dans public/uploads, sinon /tmp (environnements read-only)
    let pdfUrl: string | null = null;
    try {
      const pdfBuffer = await generateQuotePdf({ quote });
      const pdfFilename = `${quote.numero}.pdf`;

      let pdfDir = path.join(process.cwd(), "public", "uploads", "devis");
      let writtenToPublic = true;

      try {
        await fs.mkdir(pdfDir, { recursive: true });
        await fs.writeFile(path.join(pdfDir, pdfFilename), pdfBuffer);
        pdfUrl = `/uploads/devis/${pdfFilename}`;
      } catch {
        // Fallback /tmp (Vercel, environnements read-only)
        writtenToPublic = false;
        pdfDir = path.join("/tmp", "devis");
        await fs.mkdir(pdfDir, { recursive: true });
        await fs.writeFile(path.join(pdfDir, pdfFilename), pdfBuffer);
        pdfUrl = `/api/devis/${id}/pdf`;
      }

      if (writtenToPublic && pdfUrl) {
        await prisma.quote.update({
          where: { id },
          data: { pdfPath: pdfUrl, pdfGeneratedAt: new Date() },
        });
      }
    } catch (pdfError) {
      console.error("[devis/signer] PDF generation failed:", pdfError);
      // La signature est enregistrée, on continue sans PDF
    }

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
      pdfPath: pdfUrl ?? undefined,
    };

    sendQuoteToCollectif(emailParams).catch(console.error);
    notifyDirectrice(emailParams).catch(console.error);

    return NextResponse.json({ ok: true, pdfUrl });
  } catch (e) {
    console.error("[devis/signer] Erreur:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
