import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const item = await prisma.testimony.update({ where: { id }, data: await req.json() });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.testimony.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
