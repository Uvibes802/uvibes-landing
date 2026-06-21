import type { Metadata } from "next";

export const SITE_URL = "https://uvibes.fr";
export const SITE_NAME = "Uvibes";
export const OG_IMAGE_DEFAULT = "/images/uvibes-section.png";

type LangSeo = { title: string; description: string; path: string };
type PageSeoConfig = { fr: LangSeo; en?: LangSeo };

// Chaque entrée porte le FR (toujours présent) et, si la page a un équivalent
// anglais publié, le EN — ce qui permet d'émettre les hreflang dans les deux sens.
export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    fr: {
      title: "Application bien-être collectif et lien social | Uvibes",
      description:
        "Uvibes active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain. Essayez gratuitement.",
      path: "/",
    },
    en: {
      title: "Bring Your Community to Life — Connection App | Uvibes",
      description:
        "Uvibes sparks real conversations inside organizations to build belonging, wellbeing and human connection. See why collectives can't stop talking about it.",
      path: "/en",
    },
  },
  avantages: {
    fr: {
      title: "Cohésion, engagement et soft skills pour collectifs | Uvibes",
      description:
        "Découvrez comment Uvibes aide entreprises, associations et écoles à créer des interactions humaines authentiques et à développer les soft skills.",
      path: "/avantages",
    },
  },
  features: {
    fr: {
      title: "Comment Uvibes active les conversations positives | Uvibes",
      description:
        "Échanges, participation, ressources : découvrez les fonctionnalités Uvibes et choisissez l'offre adaptée à votre collectif.",
      path: "/features",
    },
  },
  uvibes: {
    fr: {
      title: "Innovation socio-digitale à impact collectif | Uvibes",
      description:
        "Uvibes est une association à impact sociétal portée par une équipe engagée. Découvrez notre histoire, notre mission et nos valeurs éthiques.",
      path: "/a-propos",
    },
    en: {
      title: "Who's Behind Uvibes — Our Story & Team | Uvibes",
      description:
        "Meet the people and the idea powering Uvibes — a non-profit-driven project on a mission to make real conversation a habit again.",
      path: "/en/about",
    },
  },
  blog: {
    fr: {
      title: "Ressources sur lien social, soft skills et collectifs | Uvibes",
      description:
        "Articles, conseils et inspirations sur le bien-être au travail, la cohésion d'équipe et les interactions sociales positives au sein des collectifs.",
      path: "/blog",
    },
  },
  solution: {
    fr: {
      title: "La méthode Uvibes — Pour qui, comment ça marche | Uvibes",
      description:
        "Découvrez la méthode Uvibes et comment elle s'adapte à votre contexte : étudiants, entreprises, aidants, sportifs… Étapes, thématiques et fonctionnalités détaillées.",
      path: "/solution",
    },
    en: {
      title: "The Uvibes Method — How It Works | Uvibes",
      description:
        "From icebreaker to insight: see exactly how Uvibes turns short, guided conversations into real engagement, data and recognition for any organization.",
      path: "/en/method",
    },
  },
  tarifs: {
    fr: {
      title: "Tarifs & offres Uvibes — Connection, Premium, Boost | Uvibes",
      description:
        "Comparez les offres Uvibes (Connection, Premium, Boost) et l'offre découverte 30 jours. Choisissez le plan adapté à votre collectif et demandez votre devis.",
      path: "/tarifs",
    },
    en: {
      title: "Pricing & Plans — Connection, Premium, Boost | Uvibes",
      description:
        "Compare Uvibes plans (Connection, Premium, Boost) and the 30-day trial. Find the right fit for your community and request your quote in minutes.",
      path: "/en/pricing",
    },
  },
  "mentions-legales": {
    fr: {
      title: "Mentions légales | Uvibes",
      description: "Mentions légales du site Uvibes : éditeur, hébergeur et informations légales.",
      path: "/mentions-legales",
    },
  },
  "conditions-d-utilisation": {
    fr: {
      title: "Conditions générales d'utilisation | Uvibes",
      description: "Conditions générales d'utilisation du site et des services Uvibes.",
      path: "/conditions-d-utilisation",
    },
  },
  "politique-de-confidentialite": {
    fr: {
      title: "Politique de confidentialité | Uvibes",
      description: "Politique de confidentialité et protection des données personnelles sur Uvibes.",
      path: "/politique-de-confidentialite",
    },
  },
  "politique-cookies": {
    fr: {
      title: "Politique de cookies | Uvibes",
      description: "Politique de gestion des cookies utilisés sur le site Uvibes.",
      path: "/politique-cookies",
    },
  },
};

/**
 * Construit les métadonnées d'une page. `locale` détermine quelle langue de
 * l'entrée est utilisée comme contenu principal ; les hreflang couvrent
 * automatiquement les deux langues quand l'entrée en possède une paire.
 */
export function buildMetadata(page: keyof typeof PAGE_SEO, locale: "fr" | "en" = "fr"): Metadata {
  const entry = PAGE_SEO[page];
  const data = locale === "en" && entry.en ? entry.en : entry.fr;
  const url = `${SITE_URL}${data.path}`;

  const languages: Record<string, string> = { "fr-FR": `${SITE_URL}${entry.fr.path}` };
  if (entry.en) languages["en-US"] = `${SITE_URL}${entry.en.path}`;

  return {
    title: { absolute: data.title },
    description: data.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${data.title}`,
        },
      ],
    },
  };
}
