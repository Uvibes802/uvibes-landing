import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { LEGAL_VERSION, CGV_CONTENU, CGV_ESSAI_CONTENU, DPA_CONTENU, SLA_CONTENU, PDD_CONTENU } from "./legalDocsContent";

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
      prixAnnuel: 3980,
      mention: "HT / an · indicatif jusqu'à 1 000 utilisateurs",
      ordre: 0,
      included: ["experiences", "sondages", "barometre", "statistiques"],
    },
    {
      slug: "vibes-premium",
      nom: "Vibes Premium",
      couleur: "#FFE456",
      description: "Renforcez la visibilité de votre marque et l'efficacité de votre communication interne.",
      prixAnnuel: 4980,
      mention: "HT / an · indicatif jusqu'à 1 000 utilisateurs",
      ordre: 1,
      included: ["experiences", "sondages", "barometre", "statistiques", "logo", "kit-com"],
    },
    {
      slug: "vibes-boost",
      nom: "Vibes Boost",
      couleur: "#D90A5C",
      description: "Boostez la dynamique de votre collectif avec des outils de travail innovants.",
      prixAnnuel: 5980,
      mention: "HT / an · indicatif jusqu'à 1 000 utilisateurs",
      ordre: 2,
      included: featuresData.map((f) => f.slug),
    },
    {
      // Offre découverte / essai 30 jours — facturée au mois (prixAnnuel/12 = 480 €).
      slug: "vibes-decouverte",
      nom: "Offre découverte",
      couleur: "#FD6E00",
      description: "30 jours pour faire vivre Uvibes à votre collectif, sans engagement annuel.",
      prixAnnuel: 5760,
      mention: "480 € / mois · essai 30 jours",
      ordre: 3,
      included: ["experiences", "sondages", "barometre", "statistiques"],
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
    // Homepage hero
    { cle: "hero-title", label: "Titre hero (homepage)", valeur: "Activez la puissance de votre collectif." },
    { cle: "hero-subtitle", label: "Sous-titre hero (homepage)", valeur: "L'outil digital qui crée les bons échanges, au bon moment." },
    // BannerCount
    { cle: "citation-texte", label: "Citation BannerCount", valeur: "En prenant le temps de réfléchir du point de vue d’une autre personne, nous développons notre humilité intellectuelle." },
    { cle: "citation-auteur", label: "Auteur de la citation", valeur: "Ilios Koutsou" },
    { cle: "citation-role", label: "Rôle de l'auteur", valeur: "Docteur en psychologie et Maître de conférences à l’Université libre de Bruxelles" },
    { cle: "user-number", label: "Nombre d'utilisateurs (BannerCount)", valeur: "+ de 3 500 utilisateurs" },
    { cle: "user-number-title", label: "Titre du compteur (BannerCount)", valeur: "En 2026, sur Uvibes :" },
    // Page À propos
    { cle: "uvibes-mission", label: "Mission Uvibes (page À propos)", valeur: "Uvibes est la plateforme qui transforme les collectifs en communautés vivantes, engagées et efficaces." },
    { cle: "uvibes-annee-creation", label: "Année de création", valeur: "2022" },
    { cle: "uvibes-ville", label: "Ville siège social", valeur: "Paris, France" },
    // Page Solution
    { cle: "solution-title", label: "Titre page /solution", valeur: "La solution Uvibes" },
    { cle: "solution-subtitle", label: "Sous-titre page /solution", valeur: "Un outil pensé pour chaque type de collectif, à chaque étape de son évolution." },
    // Contact
    { cle: "contact-email", label: "Email de contact affiché", valeur: "contact@uvibes.fr" },
    { cle: "contact-telephone", label: "Téléphone de contact affiché", valeur: "+33 1 00 00 00 00" },
    // SEO
    { cle: "og-description", label: "Description OG (réseaux sociaux)", valeur: "Uvibes, la plateforme qui active la puissance de votre collectif grâce aux expériences interactives." },
    // Système RDV
    { cle: "rdv-notif-email", label: "Email qui reçoit les notifications de RDV (directrice)", valeur: "contact@uvibes.fr" },
    { cle: "rdv-systeme", label: "Système de prise de RDV (custom | calendly)", valeur: "custom" },
    { cle: "rdv-calendly-url", label: "URL Calendly (si système = calendly)", valeur: "https://calendly.com/uvibescommunication/30min" },
    // Catégories équipe
    { cle: "team-categories", label: "Catégories équipe (JSON)", valeur: JSON.stringify(["Équipe projet", "Comité d'expertise", "Architectes du code"]) },
    // Offre découverte (4ème offre) — éditable
    { cle: "oe-titre", label: "4ème offre — titre de la barre", valeur: "Faites vivre Uvibes à votre collectif" },
    { cle: "oe-prix-accent", label: "4ème offre — accroche prix (barre)", valeur: "dès 480 €/mois" },
    { cle: "oe-subtitle", label: "4ème offre — sous-titre", valeur: "Le moyen le plus simple de tester Uvibes : un mois complet pour mobiliser votre collectif et mesurer l'impact, avant tout engagement annuel." },
    { cle: "oe-prix", label: "4ème offre — prix affiché", valeur: "480 €" },
    { cle: "oe-prix-note", label: "4ème offre — mention sous le prix", valeur: "sans engagement annuel" },
    // Hero (accueil)
    { cle: "hero-sub", label: "Hero accueil — sous-titre", valeur: "Les bonnes conversations ne s'improvisent pas. Elles se créent." },
    { cle: "hero-cta-primary", label: "Hero accueil — bouton principal", valeur: "Découvrir l'application" },
    { cle: "hero-cta-secondary", label: "Hero accueil — bouton secondaire", valeur: "Étudions votre projet" },
    // Section « Petite structure ? »
    { cle: "soc-text", label: "Section Petite structure — texte", valeur: "Association, petit collectif ou budget limité ? Nos formules standard ne sont pas une fin en soi. Uvibes est porté par une association à but non lucratif : notre priorité, c'est votre lien social, pas la taille du contrat. On construit ensemble une formule à votre échelle." },
    { cle: "soc-cta", label: "Section Petite structure — bouton", valeur: "Prendre rendez-vous" },
    // Offre découverte (4ème offre) — éditable
    { cle: "oe-points", label: "4ème offre — points inclus (1 par ligne : label | détail | bonus)", valeur: [
      "Jusqu'à 500 vibes | expériences interactives pour mobiliser votre collectif",
      "1 session thématique | sur le sujet de votre choix, personnalisée pour votre public",
      "3 campagnes de sondages | 3 sondages personnalisés chacune, pour recueillir ce qui compte",
      "1 infographie clé en main | tout ce qu'il faut pour faciliter l'inscription de vos membres",
      "2 indicateurs d'usage | pour suivre l'engagement de votre communauté | bonus",
    ].join("\n") },
  ];

  for (const c of cmsDefaults) {
    await prisma.cmsContent.upsert({
      where: { cle: c.cle },
      update: {},
      create: c,
    });
  }

  // ── Partenaires ───────────────────────────────────────
  const partenaires = [
    { nom: "Université Paris Cité", logoUrl: "/images/partners/upc.png", siteUrl: "https://u-paris.fr", ordre: 0 },
    { nom: "Fédération Française de Handball", logoUrl: "/images/partners/ffhb.png", siteUrl: "https://ff-handball.org", ordre: 1 },
    { nom: "Croix-Rouge Française", logoUrl: "/images/partners/croix-rouge.png", siteUrl: "https://www.croix-rouge.fr", ordre: 2 },
    { nom: "Mairie de Lyon", logoUrl: "/images/partners/lyon.png", siteUrl: "https://www.lyon.fr", ordre: 3 },
  ];
  for (const p of partenaires) {
    await prisma.partner.upsert({
      where: { id: p.nom.toLowerCase().replace(/\s/g, "-") },
      update: {},
      create: p,
    }).catch(() => prisma.partner.create({ data: p }));
  }

  // ── Témoignages ───────────────────────────────────────
  const temoignages = [
    { auteur: "Marie Dupont", role: "DRH — Entreprise XY", texte: "Uvibes a transformé nos échanges internes. Les équipes sont plus engagées et la communication est bien plus fluide.", ordre: 0 },
    { auteur: "Thomas Martin", role: "Directeur Sportif — Club Athlétisme Toulouse", texte: "L'application est intuitive et nos adhérents l'ont adoptée en moins d'une semaine. Un vrai plus pour notre collectif.", ordre: 1 },
    { auteur: "Isabelle Leroy", role: "Responsable RH — Association Solidarité 13", texte: "Le baromètre bien-être nous a permis d'identifier des problèmes avant qu'ils ne deviennent critiques. Indispensable.", ordre: 2 },
  ];
  for (const t of temoignages) {
    await prisma.testimony.create({ data: t }).catch(() => {});
  }

  // ── Équipe ────────────────────────────────────────────
  const equipe = [
    { nom: "Sofia Ait-Taleb", poste: "CEO & Co-fondatrice", equipe: "Direction", ordre: 0 },
    { nom: "Lucas Bernard", poste: "CTO", equipe: "Tech", ordre: 1 },
    { nom: "Amina Chouaib", poste: "Responsable Partenariats", equipe: "Commercial", ordre: 2 },
  ];
  for (const m of equipe) {
    await prisma.teamMember.create({ data: m }).catch(() => {});
  }

  // ── Admin par défaut ──────────────────────────────────
  // Jamais de mot de passe en dur : on lit ADMIN_INITIAL_PASSWORD, sinon on génère
  // un mot de passe aléatoire (affiché une fois). Sur une base existante, le mot de
  // passe n'est PAS réinitialisé (update vide). Pour créer un vrai compte : scripts/create-admin.cjs
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: "admin@uvibes.fr" } });
  if (!existingAdmin) {
    const initialPassword =
      process.env.ADMIN_INITIAL_PASSWORD || randomBytes(15).toString("base64url");
    await prisma.adminUser.create({
      data: {
        email: "admin@uvibes.fr",
        passwordHash: await bcrypt.hash(initialPassword, 12),
        nom: "Directrice Uvibes",
        role: "SUPER_ADMIN",
      },
    });
    if (!process.env.ADMIN_INITIAL_PASSWORD) {
      console.log(`⚠️  Admin créé avec un mot de passe aléatoire : ${initialPassword} (à changer)`);
    }
  }

  // ── Disponibilités RDV ────────────────────────────────
  // Lundi à Vendredi, 9h-18h, créneaux 30 min
  const joursOuvrables = [1, 2, 3, 4, 5]; // 1=Lundi ... 5=Vendredi
  const existingDispo = await prisma.rdvDisponibilite.count();
  if (existingDispo === 0) {
    for (const jour of joursOuvrables) {
      await prisma.rdvDisponibilite.create({
        data: { jourSemaine: jour, heureDebut: "09:00", heureFin: "18:00", dureeMinutes: 30, actif: true },
      });
    }
  }

  // ── Documents contractuels (éditables depuis l'admin) ─────
  const documentsLegaux = [
    { slug: "cgv", titre: "Conditions générales de vente", contenu: CGV_CONTENU },
    { slug: "cgv-essai", titre: "CGV — Offre découverte (essai 30 jours)", contenu: CGV_ESSAI_CONTENU },
    { slug: "dpa", titre: "Accord de traitement des données", contenu: DPA_CONTENU },
    { slug: "sla", titre: "Annexe relative au niveau de service", contenu: SLA_CONTENU },
    { slug: "pdd", titre: "Politique de protection des données personnelles", contenu: PDD_CONTENU },
  ];
  for (const d of documentsLegaux) {
    await prisma.legalDocument.upsert({
      where: { slug: d.slug },
      // On ne réécrase pas le contenu si la directrice l'a déjà modifié depuis l'admin
      update: { titre: d.titre },
      create: { ...d, version: LEGAL_VERSION },
    });
  }

  console.log("✅ Seed terminé : plans, features, CMS, documents légaux, partenaires, témoignages, équipe, admin, RDV créés");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
