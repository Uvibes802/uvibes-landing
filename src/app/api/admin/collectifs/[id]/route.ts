import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const collectif = await prisma.collectif.findUnique({
    where: { id },
    include: { quotes: { orderBy: { createdAt: "desc" } } },
  });
  if (!collectif) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({
    ...collectif,
    usagesPrevus: JSON.parse(collectif.usagesPrevus || "[]"),
  });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const allowed = ["statut", "notes", "nom", "contact", "email", "telephone", "ville"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const collectif = await prisma.collectif.update({ where: { id }, data });
  return NextResponse.json(collectif);
}
