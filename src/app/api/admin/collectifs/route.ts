import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const statut = searchParams.get("statut");
  const search = searchParams.get("q");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (statut) where.statut = statut;
  if (search) {
    where.OR = [
      { nom: { contains: search } },
      { email: { contains: search } },
      { contact: { contains: search } },
    ];
  }

  const [total, items] = await Promise.all([
    prisma.collectif.count({ where }),
    prisma.collectif.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { _count: { select: { quotes: true } } },
    }),
  ]);

  return NextResponse.json({ total, page, limit, items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, contact, email, telephone, ville, typeCollectif, tailleCollectif } = body;

  if (!nom?.trim() || !contact?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Nom, contact et email sont requis" }, { status: 400 });
  }

  const collectif = await prisma.collectif.create({
    data: {
      nom: nom.trim(),
      contact: contact.trim(),
      email: email.trim().toLowerCase(),
      telephone: telephone?.trim() || null,
      ville: ville?.trim() || null,
      typeCollectif: typeCollectif ?? "Entreprise",
      tailleCollectif: tailleCollectif ?? "50-250",
      source: "admin_manuel",
    },
  });

  return NextResponse.json(collectif, { status: 201 });
}
