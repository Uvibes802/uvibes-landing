import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/services/blog/getArticles";

// On retire un éventuel slash final pour éviter les URLs en double slash (uvibes.fr//page)
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://uvibes.fr").replace(/\/$/, "");

// Codes BCP47 + préfixe de route, alignés sur src/lib/seo.ts (BCP47) — mêmes 11 langues.
const LOCALES = [
  { bcp47: "en-US", prefix: "/en" },
  { bcp47: "es-ES", prefix: "/es" },
  { bcp47: "de-DE", prefix: "/de" },
  { bcp47: "it-IT", prefix: "/it" },
  { bcp47: "pt-PT", prefix: "/pt" },
  { bcp47: "ru-RU", prefix: "/ru" },
  { bcp47: "zh-CN", prefix: "/zh" },
  { bcp47: "ja-JP", prefix: "/ja" },
  { bcp47: "hi-IN", prefix: "/hi" },
  { bcp47: "ar-SA", prefix: "/ar" },
];

// Construit le dict `alternates.languages` d'un groupe de pages équivalentes
// (ex. home, /about, /method, /pricing) : chemin FR + même suffixe pour les 10 autres langues.
function altLanguages(frPath: string, suffix: string): Record<string, string> {
  const languages: Record<string, string> = { "fr-FR": `${BASE_URL}${frPath}` };
  for (const { bcp47, prefix } of LOCALES) {
    languages[bcp47] = `${BASE_URL}${prefix}${suffix}`;
  }
  return languages;
}

// Une page traduite par langue, pour un suffixe de route donné (ex. "/about").
function localizedPages(suffix: string, alternates: Record<string, string>, changeFrequency: "weekly" | "monthly", priority: number): MetadataRoute.Sitemap {
  return LOCALES.map(({ prefix }) => ({
    url: `${BASE_URL}${prefix}${suffix}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: alternates },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homeAlternates = altLanguages("", "");
  const aboutAlternates = altLanguages("/a-propos", "/about");
  const methodAlternates = altLanguages("/solution", "/method");
  const pricingAlternates = altLanguages("/tarifs", "/pricing");

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeAlternates },
    },
    ...localizedPages("", homeAlternates, "weekly", 1),
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: aboutAlternates },
    },
    ...localizedPages("/about", aboutAlternates, "monthly", 0.9),
    {
      // Page réelle (/features et /avantages sont des 301 → /solution, ne pas les lister)
      url: `${BASE_URL}/solution`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: methodAlternates },
    },
    ...localizedPages("/method", methodAlternates, "monthly", 0.8),
    {
      url: `${BASE_URL}/tarifs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: pricingAlternates },
    },
    ...localizedPages("/pricing", pricingAlternates, "monthly", 0.8),
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
