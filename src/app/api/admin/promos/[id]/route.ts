import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

// Activer/désactiver un code promo
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.actif !== undefined) data.actif = body.actif;
  if (body.planSlug !== undefined) data.planSlug = body.planSlug || null;
  const item = await prisma.promoCode.update({ where: { id }, data });
  return NextResponse.json(item);
}

// Supprimer un code promo
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.promoCode.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
