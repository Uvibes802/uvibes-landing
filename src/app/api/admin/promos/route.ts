import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Liste des codes promo (admin)
export async function GET() {
  const items = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

// Création d'un code promo
export async function POST(req: NextRequest) {
  const { code, pourcentage, description, expiresAt, usageMax } = await req.json();

  const cleanCode = String(code ?? "").trim().toUpperCase();
  const pct = Number(pourcentage);

  if (!cleanCode) return NextResponse.json({ error: "Code requis" }, { status: 400 });
  if (!pct || pct <= 0 || pct > 100) {
    return NextResponse.json({ error: "Pourcentage invalide (1 à 100)" }, { status: 400 });
  }

  const existing = await prisma.promoCode.findUnique({ where: { code: cleanCode } });
  if (existing) return NextResponse.json({ error: "Ce code existe déjà" }, { status: 409 });

  const item = await prisma.promoCode.create({
    data: {
      code: cleanCode,
      pourcentage: pct,
      description: description?.trim() || null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      usageMax: usageMax ? Number(usageMax) : null,
    },
  });

  return NextResponse.json(item);
}
