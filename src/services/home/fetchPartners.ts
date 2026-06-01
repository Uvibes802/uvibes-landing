import { prisma } from "@/lib/prisma";

export interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
  siteUrl?: string;
}

// Lit en priorité la DB admin — fallback WordPress si DB vide
export async function fetchPartners(): Promise<PartnerLogo[]> {
  try {
    const dbPartners = await prisma.partner.findMany({
      where: { actif: true },
      orderBy: { ordre: "asc" },
    });

    if (dbPartners.length > 0) {
      return dbPartners.map((p, i) => ({
        id: i,
        src: p.logoUrl,
        alt: p.nom,
        siteUrl: p.siteUrl ?? undefined,
      }));
    }

    // Fallback WordPress si DB vide
    const api = process.env.NEXT_PUBLIC_API_URL;
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=partner-logo`, { next: { revalidate: 3600 } });
    if (!tagRes.ok) return [];
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return [];

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`, { next: { revalidate: 3600 } });
    if (!postsRes.ok) return [];
    const posts = await postsRes.json();

    return posts
      .map((post: { id: number; title: { rendered: string }; _embedded?: { "wp:featuredmedia"?: [{ source_url: string }] } }, i: number) => ({
        id: i,
        src: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        alt: post.title.rendered,
      }))
      .filter((p: PartnerLogo) => p.src !== "");
  } catch {
    return [];
  }
}
