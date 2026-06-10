import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/services/blog/getArticles";

// On retire un éventuel slash final pour éviter les URLs en double slash (uvibes.fr//page)
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://uvibes.fr").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      // Page réelle (/features et /avantages sont des 301 → /solution, ne pas les lister)
      url: `${BASE_URL}/solution`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rendez-vous`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/conditions-d-utilisation`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];

  try {
    const articles = await getAllArticleSlugs();
    blogPosts = articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des articles pour le sitemap:", error);
  }

  return [...staticPages, ...blogPosts];
}
