import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Expose uniquement les settings non-sensibles nécessaires côté client
const PUBLIC_KEYS = [
  "rdv-systeme",
  "rdv-calendly-url",
  "citation-texte",
  "citation-auteur",
  "citation-role",
  "user-number",
  "user-number-title",
  // Offre découverte (4ème offre) — éditable depuis l'admin
  "oe-titre",
  "oe-prix-accent",
  "oe-subtitle",
  "oe-prix",
  "oe-prix-note",
  "oe-points",
  // Hero (accueil)
  "hero-sub",
  "hero-cta-primary",
  "hero-cta-secondary",
  // Section « Petite structure »
  "soc-text",
  "soc-cta",
];

export async function GET() {
  const items = await prisma.cmsContent.findMany({
    where: { cle: { in: PUBLIC_KEYS } },
  });
  const settings = Object.fromEntries(items.map((i) => [i.cle, i.valeur]));
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
