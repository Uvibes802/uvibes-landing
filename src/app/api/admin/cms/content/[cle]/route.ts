import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ cle: string }> }) {
  const { cle } = await params;
  const item = await prisma.cmsContent.findUnique({ where: { cle } });
  if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ cle: string }> }) {
  const { cle } = await params;
  const { valeur } = await req.json();
  const item = await prisma.cmsContent.update({ where: { cle }, data: { valeur } });
  return NextResponse.json(item);
}
