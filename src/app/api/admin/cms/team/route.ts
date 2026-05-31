import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const equipe = req.nextUrl.searchParams.get("equipe");
  const items = await prisma.teamMember.findMany({
    where: equipe ? { equipe } : undefined,
    orderBy: [{ equipe: "asc" }, { ordre: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { nom, poste, equipe, photoUrl, ordre } = await req.json();
  if (!nom || !poste || !equipe) return NextResponse.json({ error: "Champs requis" }, { status: 400 });
  const item = await prisma.teamMember.create({ data: { nom, poste, equipe, photoUrl, ordre: ordre ?? 0 } });
  return NextResponse.json(item);
}
