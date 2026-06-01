import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const allowed = ["statut", "noteAdmin"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const rdv = await prisma.rdvReservation.update({ where: { id }, data });
  return NextResponse.json(rdv);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.rdvReservation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
