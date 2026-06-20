import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();

  // Mise à jour des features (tableau [{featureId, valeur}])
  if (body.features) {
    for (const f of body.features as { featureId: string; valeur: boolean }[]) {
      await prisma.planFeature.updateMany({
        where: { planId: id, featureId: f.featureId },
        data: { valeur: f.valeur },
      });
    }
  }

  // Mise à jour des tranches de tarification (tableau [{id, prixAnnuel}])
  if (body.tiers) {
    for (const t of body.tiers as { id: string; prixAnnuel: number }[]) {
      await prisma.planTier.update({
        where: { id: t.id },
        data: { prixAnnuel: t.prixAnnuel },
      });
    }
  }

  const allowed = ["nom", "description", "prixAnnuel", "mention", "actif", "couleur"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  if (Object.keys(data).length === 0) return NextResponse.json({ ok: true });

  const plan = await prisma.plan.update({ where: { id }, data });
  return NextResponse.json(plan);
}
