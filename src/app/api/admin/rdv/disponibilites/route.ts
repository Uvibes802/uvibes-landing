import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.rdvDisponibilite.findMany({ orderBy: { jourSemaine: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { jourSemaine, heureDebut, heureFin, dureeMinutes } = await req.json();
  const item = await prisma.rdvDisponibilite.create({
    data: { jourSemaine: Number(jourSemaine), heureDebut, heureFin, dureeMinutes: Number(dureeMinutes ?? 30) },
  });
  return NextResponse.json(item, { status: 201 });
}
