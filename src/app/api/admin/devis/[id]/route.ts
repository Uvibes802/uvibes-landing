import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
  if (!quote) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({
    ...quote,
    featuresJson: JSON.parse(quote.featuresJson || "[]"),
    collectif: { ...quote.collectif, usagesPrevus: JSON.parse(quote.collectif.usagesPrevus || "[]") },
  });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const allowed = ["statut", "remise", "prixHT", "prixTTC", "validUntil", "mentionPrix"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const quote = await prisma.quote.update({ where: { id }, data });
  return NextResponse.json(quote);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.quote.update({ where: { id }, data: { statut: "EXPIRE" } });
  return NextResponse.json({ ok: true });
}
