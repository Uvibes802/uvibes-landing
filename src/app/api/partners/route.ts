import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const partners = await prisma.partner.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
  });
  return NextResponse.json(partners);
}
