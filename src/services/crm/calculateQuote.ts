import { prisma } from "@/lib/prisma";

export interface QuoteInput {
  planSlug: string;
  nombreUtilisateurs: number;
  dureeContrat: number; // mois : 12, 24, 36
  remise?: number; // % 0–100
}

export interface QuoteResult {
  plan: { id: string; slug: string; nom: string; couleur: string; description: string };
  features: { slug: string; nom: string; inclus: boolean }[];
  prixAnnuelBase: number;
  prixHT: number;
  prixTTC: number;
  remise: number;
  dureeContrat: number;
  nombreUtilisateurs: number;
  mentionPrix: string;
}

export async function calculateQuote(input: QuoteInput): Promise<QuoteResult> {
  const plan = await prisma.plan.findUnique({
    where: { slug: input.planSlug },
    include: {
      planFeatures: { include: { feature: true }, orderBy: { feature: { ordre: "asc" } } },
    },
  });

  if (!plan) throw new Error(`Plan "${input.planSlug}" introuvable`);

  // Aucune remise automatique : les seules réductions proviennent des codes promo,
  // appliqués à la signature. `input.remise` reste possible mais vaut 0 en pratique.
  const remise = input.remise ?? 0;

  // Prix base * durée en années
  const dureeAns = input.dureeContrat / 12;
  const prixBrut = plan.prixAnnuel * dureeAns;
  const prixHT = Math.round(prixBrut * (1 - remise / 100) * 100) / 100;
  const prixTTC = Math.round(prixHT * 1.2 * 100) / 100;

  return {
    plan: {
      id: plan.id,
      slug: plan.slug,
      nom: plan.nom,
      couleur: plan.couleur,
      description: plan.description,
    },
    features: plan.planFeatures.map((pf) => ({
      slug: pf.feature.slug,
      nom: pf.feature.nom,
      inclus: pf.valeur,
    })),
    prixAnnuelBase: plan.prixAnnuel,
    prixHT,
    prixTTC,
    remise,
    dureeContrat: input.dureeContrat,
    nombreUtilisateurs: input.nombreUtilisateurs,
    mentionPrix: plan.mention ?? "HT · adapté à votre taille",
  };
}
