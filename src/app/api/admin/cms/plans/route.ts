import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const plans = await prisma.plan.findMany({
    orderBy: { ordre: "asc" },
    include: {
      planFeatures: {
        include: { feature: true },
        orderBy: { feature: { ordre: "asc" } },
      },
      tiers: { orderBy: { ordre: "asc" } },
    },
  });
  return NextResponse.json(plans);
}
