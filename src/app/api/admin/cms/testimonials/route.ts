import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.testimony.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { texte, auteur, role } = await req.json();
  if (!texte || !auteur) return NextResponse.json({ error: "texte et auteur requis" }, { status: 400 });
  const item = await prisma.testimony.create({ data: { texte, auteur, role: role ?? "" } });
  return NextResponse.json(item);
}
