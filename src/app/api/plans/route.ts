import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Endpoint public — plans actifs + leurs tranches de tarification.
// Consommé par le funnel devis (prix live selon la tranche) et la page /tarifs.
export async function GET() {
  const plans = await prisma.plan.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
    select: {
      slug: true,
      nom: true,
      prixAnnuel: true,
      tiers: {
        orderBy: { ordre: "asc" },
        select: { label: true, min: true, max: true, prixAnnuel: true },
      },
    },
  });
  return NextResponse.json(plans);
}
