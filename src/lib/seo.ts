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
    path: "/uvibes",
  },
  blog: {
    title: "Ressources sur lien social, soft skills et collectifs | Uvibes",
    description:
      "Articles, conseils et inspirations sur le bien-être au travail, la cohésion d'équipe et les interactions sociales positives au sein des collectifs.",
    path: "/blog",
  },
  solution: {
    title: "La solution Uvibes — Pour qui, comment ça marche, nos offres | Uvibes",
    description:
      "Découvrez comment Uvibes s'adapte à votre contexte : étudiants, entreprises, aidants, sportifs… Fonctionnalités et offres détaillées.",
    path: "/solution",
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
