import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Expose uniquement les settings non-sensibles nécessaires côté client
const PUBLIC_KEYS = ["rdv-systeme", "rdv-calendly-url"];

export async function GET() {
  const items = await prisma.cmsContent.findMany({
    where: { cle: { in: PUBLIC_KEYS } },
  });
  const settings = Object.fromEntries(items.map((i) => [i.cle, i.valeur]));
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
