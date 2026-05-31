import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.partner.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, logoUrl, siteUrl, ordre } = body;
  if (!nom || !logoUrl) return NextResponse.json({ error: "nom et logoUrl requis" }, { status: 400 });
  const item = await prisma.partner.create({ data: { nom, logoUrl, siteUrl, ordre: ordre ?? 0 } });
  return NextResponse.json(item);
}
