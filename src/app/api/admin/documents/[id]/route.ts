import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const doc = await prisma.businessDoc.findUnique({ where: { id } });
  if (!doc) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  for (const k of ["clientNom", "clientContact", "clientEmail", "clientAdresse", "objet", "corps", "conditions", "statut"]) {
    if (body[k] !== undefined) data[k] = body[k] || null;
  }
  if (body.dateEcheance !== undefined) data.dateEcheance = body.dateEcheance ? new Date(body.dateEcheance) : null;
  if (Array.isArray(body.lignes)) data.lignesJson = JSON.stringify(body.lignes);
  if (typeof body.tauxTva === "number") data.tauxTva = body.tauxTva;

  const doc = await prisma.businessDoc.update({ where: { id }, data });
  return NextResponse.json(doc);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.businessDoc.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
