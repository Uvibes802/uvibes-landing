// Seed des tranches de tarification (4 tranches × 3 offres annuelles).
// Valeurs exactes fournies par la tutrice. Idempotent (upsert via deleteMany + create par plan).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TIERS = [
  { min: 50, max: 250, label: "50 – 250 membres" },
  { min: 250, max: 2000, label: "250 – 2 000 membres" },
  { min: 2000, max: 10000, label: "2 000 – 10 000 membres" },
  { min: 10000, max: null, label: "+ 10 000 membres" },
];

const PRIX: Record<string, number[]> = {
  "vibes-connection": [3500, 3980, 4500, 5500],
  "vibes-premium": [4500, 4980, 5500, 6500],
  "vibes-boost": [5500, 5980, 6500, 7500],
};

async function main() {
  for (const [slug, prix] of Object.entries(PRIX)) {
    const plan = await prisma.plan.findUnique({ where: { slug } });
    if (!plan) {
      console.log(`Plan introuvable, ignoré : ${slug}`);
      continue;
    }
    await prisma.planTier.deleteMany({ where: { planId: plan.id } });
    for (let i = 0; i < TIERS.length; i++) {
      await prisma.planTier.create({
        data: {
          planId: plan.id,
          label: TIERS[i].label,
          min: TIERS[i].min,
          max: TIERS[i].max,
          prixAnnuel: prix[i],
          ordre: i,
        },
      });
    }
    console.log(`Tiers seedés pour ${slug}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
