import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Liste les documents commerciaux (factures & contrats)
export async function GET() {
  const docs = await prisma.businessDoc.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(docs);
}

// Crée un document avec un numéro auto (FAC-YYYY-XXXX / CTR-YYYY-XXXX)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const type = body.type === "CONTRAT" ? "CONTRAT" : "FACTURE";
  if (!body.clientNom || !String(body.clientNom).trim()) {
    return NextResponse.json({ error: "Nom du destinataire requis" }, { status: 400 });
  }

  const annee = new Date().getFullYear();
  const prefix = type === "CONTRAT" ? "CTR" : "FAC";
  const count = await prisma.businessDoc.count({ where: { type } });
  const numero = `${prefix}-${annee}-${String(count + 1).padStart(4, "0")}`;

  const doc = await prisma.businessDoc.create({
    data: {
      numero,
      type,
      clientNom: String(body.clientNom).trim(),
      clientContact: body.clientContact || null,
      clientEmail: body.clientEmail || null,
      clientAdresse: body.clientAdresse || null,
      objet: body.objet || null,
      dateEcheance: body.dateEcheance ? new Date(body.dateEcheance) : null,
      lignesJson: JSON.stringify(Array.isArray(body.lignes) ? body.lignes : []),
      corps: body.corps || null,
      conditions: body.conditions || null,
      tauxTva: typeof body.tauxTva === "number" ? body.tauxTva : 20,
    },
  });
  return NextResponse.json(doc, { status: 201 });
}
