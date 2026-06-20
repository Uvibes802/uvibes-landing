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
  // upsert : crée la clé si elle n'existe pas encore (ex. nouveaux toggles ajoutés après le seed)
  const item = await prisma.cmsContent.upsert({
    where: { cle },
    create: { cle, label: cle, valeur },
    update: { valeur },
  });
  return NextResponse.json(item);
}
