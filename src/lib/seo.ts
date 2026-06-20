import type { Metadata } from "next";

export const SITE_URL = "https://uvibes.fr";
export const SITE_NAME = "Uvibes";
export const OG_IMAGE_DEFAULT = "/images/uvibes-section.png";

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: "Application bien-être collectif et lien social | Uvibes",
    description:
      "Uvibes active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain. Essayez gratuitement.",
    path: "/",
  },
  avantages: {
    title: "Cohésion, engagement et soft skills pour collectifs | Uvibes",
    description:
      "Découvrez comment Uvibes aide entreprises, associations et écoles à créer des interactions humaines authentiques et à développer les soft skills.",
    path: "/avantages",
  },
  features: {
    title: "Comment Uvibes active les conversations positives | Uvibes",
    description:
      "Échanges, participation, ressources : découvrez les fonctionnalités Uvibes et choisissez l'offre adaptée à votre collectif.",
    path: "/features",
  },
  uvibes: {
    title: "Innovation socio-digitale à impact collectif | Uvibes",
    description:
      "Uvibes est une association à impact sociétal portée par une équipe engagée. Découvrez notre histoire, notre mission et nos valeurs éthiques.",
    path: "/a-propos",
  },
  blog: {
    title: "Ressources sur lien social, soft skills et collectifs | Uvibes",
    description:
      "Articles, conseils et inspirations sur le bien-être au travail, la cohésion d'équipe et les interactions sociales positives au sein des collectifs.",
    path: "/blog",
  },
  solution: {
    title: "La méthode Uvibes — Pour qui, comment ça marche | Uvibes",
    description:
      "Découvrez la méthode Uvibes et comment elle s'adapte à votre contexte : étudiants, entreprises, aidants, sportifs… Étapes, thématiques et fonctionnalités détaillées.",
    path: "/solution",
  },
  tarifs: {
    title: "Tarifs & offres Uvibes — Connection, Premium, Boost | Uvibes",
    description:
      "Comparez les offres Uvibes (Connection, Premium, Boost) et l'offre découverte 30 jours. Choisissez le plan adapté à votre collectif et demandez votre devis.",
    path: "/tarifs",
  },
  "mentions-legales": {
    title: "Mentions légales | Uvibes",
    description: "Mentions légales du site Uvibes : éditeur, hébergeur et informations légales.",
    path: "/mentions-legales",
  },
  "conditions-d-utilisation": {
    title: "Conditions générales d'utilisation | Uvibes",
    description: "Conditions générales d'utilisation du site et des services Uvibes.",
    path: "/conditions-d-utilisation",
  },
  "politique-de-confidentialite": {
    title: "Politique de confidentialité | Uvibes",
    description: "Politique de confidentialité et protection des données personnelles sur Uvibes.",
    path: "/politique-de-confidentialite",
  },
  "politique-cookies": {
    title: "Politique de cookies | Uvibes",
    description: "Politique de gestion des cookies utilisés sur le site Uvibes.",
    path: "/politique-cookies",
  },
};

export function buildMetadata(page: keyof typeof PAGE_SEO): Metadata {
  const { title, description, path } = PAGE_SEO[page];
  const url = `${SITE_URL}${path}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
  };
}
