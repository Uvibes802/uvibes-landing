import { prisma } from "@/lib/prisma";

// Articles servis par la DB (table Article) — plus de WordPress.
export type PublicArticle = {
  slug: string;
  titre: string;
  excerpt: string | null;
  contenu: string;
  imageUrl: string | null;
  categorie: string | null;
  categorieLabel: string | null;
  auteur: string | null;
  publishedAt: string; // ISO (sérialisable server → client)
  featured: boolean;
  seoTitre?: string | null;
  seoDescription?: string | null;
};

function toPublic(a: {
  slug: string; titre: string; excerpt: string | null; contenu: string;
  imageUrl: string | null; categorie: string | null; categorieLabel: string | null;
  auteur: string | null; publishedAt: Date; featured: boolean;
  seoTitre?: string | null; seoDescription?: string | null;
}): PublicArticle {
  return {
    slug: a.slug,
    titre: a.titre,
    excerpt: a.excerpt,
    contenu: a.contenu,
    imageUrl: a.imageUrl,
    categorie: a.categorie,
    categorieLabel: a.categorieLabel,
    auteur: a.auteur,
    publishedAt: a.publishedAt.toISOString(),
    featured: a.featured,
    seoTitre: a.seoTitre ?? null,
    seoDescription: a.seoDescription ?? null,
  };
}

export async function getArticles(): Promise<PublicArticle[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { actif: true },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(toPublic);
  } catch {
    // DB injoignable (ex. hoquet au build ISR) → liste vide, régénérée à la prochaine revalidation
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const a = await prisma.article.findUnique({ where: { slug } });
    if (!a || !a.actif) return null;
    return toPublic(a);
  } catch {
    return null;
  }
}

export async function getFeaturedArticles(limit = 3): Promise<PublicArticle[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { actif: true, featured: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    return rows.map(toPublic);
  } catch {
    return [];
  }
}

export async function getAllArticleSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return prisma.article.findMany({
    where: { actif: true },
    select: { slug: true, updatedAt: true },
  });
}
