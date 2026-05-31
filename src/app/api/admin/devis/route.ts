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
      { numero: { contains: search } },
      { collectif: { nom: { contains: search } } },
      { collectif: { email: { contains: search } } },
    ];
  }

  const [total, items] = await Promise.all([
    prisma.quote.count({ where }),
    prisma.quote.findMany({
      where,
      include: { collectif: { select: { nom: true, email: true, typeCollectif: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return NextResponse.json({ total, page, limit, items });
}
