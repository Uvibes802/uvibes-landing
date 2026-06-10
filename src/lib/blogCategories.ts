// Catégories de blog (slug = valeur stockée dans Article.categorie, alignée sur le filtre public).
export const BLOG_CATEGORIES = [
  { slug: "science-et-societe", label: "Science & Société" },
  { slug: "experiences-inattendues", label: "Expériences" },
  { slug: "entreprise-article", label: "Entreprise" },
  { slug: "education-article", label: "Éducation" },
  { slug: "personnes-sensibles-aux-échanges", label: "Collectifs" },
  { slug: "uvibes-article", label: "Uvibes" },
] as const;

export function categorieLabel(slug?: string | null): string | null {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? null;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
