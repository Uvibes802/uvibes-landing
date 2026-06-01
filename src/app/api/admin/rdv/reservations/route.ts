import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const statut = req.nextUrl.searchParams.get("statut") ?? "";
  const where = statut ? { statut } : {};
  const items = await prisma.rdvReservation.findMany({
    where,
    orderBy: [{ date: "asc" }, { heure: "asc" }],
  });
  return NextResponse.json(items);
}
