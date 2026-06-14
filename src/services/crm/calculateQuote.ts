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

// Remises automatiques par volume
function remiseVolume(nb: number): number {
  if (nb >= 1000) return 20;
  if (nb >= 500) return 15;
  if (nb >= 250) return 10;
  if (nb >= 100) return 5;
  return 0;
}

// Remises automatiques par durée
function remiseDuree(mois: number): number {
  if (mois >= 36) return 15;
  if (mois >= 24) return 8;
  return 0;
}

export async function calculateQuote(input: QuoteInput): Promise<QuoteResult> {
  const plan = await prisma.plan.findUnique({
    where: { slug: input.planSlug },
    include: {
      planFeatures: { include: { feature: true }, orderBy: { feature: { ordre: "asc" } } },
    },
  });

  if (!plan) throw new Error(`Plan "${input.planSlug}" introuvable`);

  // L'offre découverte est un prix forfaitaire mensuel : pas de remise volume/durée
  // automatique (sinon 480 €/mois deviendrait 456 € avec la remise de volume).
  const isTrial = plan.slug === "vibes-decouverte";
  const autoRemise = isTrial
    ? (input.remise ?? 0)
    : Math.max(
        remiseVolume(input.nombreUtilisateurs),
        remiseDuree(input.dureeContrat),
        input.remise ?? 0
      );

  // Prix base * nombre d'utilisateurs * durée en années
  const dureeAns = input.dureeContrat / 12;
  const prixBrut = plan.prixAnnuel * dureeAns;
  const prixHT = Math.round(prixBrut * (1 - autoRemise / 100) * 100) / 100;
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
    remise: autoRemise,
    dureeContrat: input.dureeContrat,
    nombreUtilisateurs: input.nombreUtilisateurs,
    mentionPrix: plan.mention ?? "HT · adapté à votre taille",
  };
}
