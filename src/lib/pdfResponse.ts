import { NextResponse } from "next/server";

// Renvoie un buffer PDF en réponse HTTP (inline = aperçu navigateur, sinon téléchargement).
// Partagé par les routes de génération PDF (devis, facture).
export function pdfResponse(buffer: Buffer, filename: string, inline: boolean) {
  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
      "Content-Length": String(buffer.length),
    },
  });
}
