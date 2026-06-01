import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { nom, slug } = await req.json();
  if (!nom || !slug) return NextResponse.json({ error: "nom et slug requis" }, { status: 400 });

  const maxOrdre = await prisma.feature.aggregate({ _max: { ordre: true } });
  const ordre = (maxOrdre._max.ordre ?? -1) + 1;

  const feature = await prisma.feature.create({ data: { nom, slug, ordre } });

  // Créer une PlanFeature désactivée pour chaque plan existant
  const plans = await prisma.plan.findMany({ select: { id: true } });
  await prisma.planFeature.createMany({
    data: plans.map((p) => ({ planId: p.id, featureId: feature.id, valeur: false })),
  });

  return NextResponse.json(feature, { status: 201 });
}
