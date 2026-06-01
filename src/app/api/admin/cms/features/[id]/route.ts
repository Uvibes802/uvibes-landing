import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const { nom } = await req.json();
  const feature = await prisma.feature.update({ where: { id }, data: { nom } });
  return NextResponse.json(feature);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await prisma.planFeature.deleteMany({ where: { featureId: id } });
  await prisma.feature.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
