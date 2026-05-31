import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Features produit ─────────────────────────────────
  const featuresData = [
    { slug: "experiences", nom: "Expériences interactives (1 000 vibes)", ordre: 0 },
    { slug: "sondages", nom: "Sondages", ordre: 1 },
    { slug: "barometre", nom: "Baromètre bien-être", ordre: 2 },
    { slug: "statistiques", nom: "Statistiques & pilotage", ordre: 3 },
    { slug: "logo", nom: "Logo de votre entreprise", ordre: 4 },
    { slug: "kit-com", nom: "Kit de communication", ordre: 5 },
    { slug: "actualites", nom: "Actualités internes", ordre: 6 },
    { slug: "networking", nom: "Networking — cartes de visite digitales", ordre: 7 },
    { slug: "brainstorming", nom: "Brainstorming — enquêtes post vibes", ordre: 8 },
    { slug: "employer-branding", nom: "Employer branding — invités extérieurs", ordre: 9 },
    { slug: "soft-skills", nom: "Soft skills — parcours ou médiathèque", ordre: 10 },
  ];

  const features: { [key: string]: string } = {};
  for (const f of featuresData) {
    const feat = await prisma.feature.upsert({
      where: { slug: f.slug },
      update: { nom: f.nom },
      create: f,
    });
    features[f.slug] = feat.id;
  }

  // ── Plans tarifaires ──────────────────────────────────
  const plansData = [
    {
      slug: "vibes-connection",
      nom: "Vibes Connection",
      couleur: "#fd6e00",
      description: "Favorisez les interactions et suivez l'état d'esprit de votre collectif.",
      prixAnnuel: 2990,
      mention: "Sur devis",
      ordre: 0,
      included: ["experiences", "sondages", "barometre", "statistiques"],
    },
    {
      slug: "vibes-premium",
      nom: "Vibes Premium",
      couleur: "#FFE456",
      description: "Renforcez la visibilité de votre marque et l'efficacité de votre communication interne.",
      prixAnnuel: 4990,
      mention: "Sur devis",
      ordre: 1,
      included: ["experiences", "sondages", "barometre", "statistiques", "logo", "kit-com"],
    },
    {
      slug: "vibes-boost",
      nom: "Vibes Boost",
      couleur: "#D90A5C",
      description: "Boostez la dynamique de votre collectif avec des outils de travail innovants.",
      prixAnnuel: 7990,
      mention: "Sur devis",
      ordre: 2,
      included: featuresData.map((f) => f.slug),
    },
  ];

  for (const p of plansData) {
    const { included, ...planFields } = p;
    const plan = await prisma.plan.upsert({
      where: { slug: p.slug },
      update: planFields,
      create: planFields,
    });

    for (const featureSlug of featuresData.map((f) => f.slug)) {
      await prisma.planFeature.upsert({
        where: { planId_featureId: { planId: plan.id, featureId: features[featureSlug] } },
        update: { valeur: included.includes(featureSlug) },
        create: { planId: plan.id, featureId: features[featureSlug], valeur: included.includes(featureSlug) },
      });
    }
  }

  // ── CMS par défaut ────────────────────────────────────
  const cmsDefaults = [
    { cle: "hero-title", label: "Titre hero (homepage)", valeur: "Activez la puissance de votre collectif." },
    { cle: "hero-subtitle", label: "Sous-titre hero (homepage)", valeur: "L'outil digital qui crée les bons échanges, au bon moment." },
    { cle: "citation-texte", label: "Citation BannerCount", valeur: "Uvibes a transformé nos échanges internes." },
    { cle: "citation-auteur", label: "Auteur de la citation", valeur: "Marie Dupont" },
    { cle: "citation-role", label: "Rôle de l'auteur", valeur: "DRH — Entreprise XY" },
    { cle: "user-number", label: "Nombre d'utilisateurs (BannerCount)", valeur: "3 500" },
  ];

  for (const c of cmsDefaults) {
    await prisma.cmsContent.upsert({
      where: { cle: c.cle },
      update: {},
      create: c,
    });
  }

  // ── Admin par défaut ──────────────────────────────────
  const passwordHash = await bcrypt.hash("uvibes-admin-2026", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@uvibes.fr" },
    update: {},
    create: {
      email: "admin@uvibes.fr",
      passwordHash,
      nom: "Directrice Uvibes",
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Seed terminé : plans, features, CMS, admin créés");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
