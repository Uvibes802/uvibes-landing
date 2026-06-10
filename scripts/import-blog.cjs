// Import unique des articles de blog depuis WordPress vers la DB (table Article).
// Migration "élimination de WP" — préserve le HTML fidèle, l'image, la catégorie,
// l'auteur, le SEO Yoast et le statut "à la une".
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// slug de tag WP → libellé de catégorie (alignés sur le blog public)
const CATEGORIES = [
  { slug: "science-et-societe", label: "Science & Société" },
  { slug: "experiences-inattendues", label: "Expériences" },
  { slug: "entreprise-article", label: "Entreprise" },
  { slug: "education-article", label: "Éducation" },
  { slug: "personnes-sensibles-aux-échanges", label: "Collectifs" },
  { slug: "uvibes-article", label: "Uvibes" },
];

function decode(s) {
  return (s || "")
    .replace(/&amp;/g, "&").replace(/&rsquo;|&#8217;|&#039;|&#39;/g, "’")
    .replace(/&lsquo;|&#8216;/g, "‘").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")
    .replace(/&hellip;|&#8230;/g, "…").replace(/&nbsp;/g, " ")
    .replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç").replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .trim();
}

function excerptFrom(html) {
  const text = decode((html || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return text.length > 180 ? text.slice(0, 180).replace(/\s+\S*$/, "") + "…" : text;
}

async function tagId(api, slug) {
  const r = await fetch(`${api}/wp-json/wp/v2/tags?slug=${encodeURIComponent(slug)}`);
  const t = await r.json();
  return t[0]?.id ?? null;
}

async function postsForTag(api, id) {
  if (!id) return [];
  const r = await fetch(`${api}/wp-json/wp/v2/posts?tags=${id}&per_page=100&_embed`);
  const p = await r.json();
  return Array.isArray(p) ? p : [];
}

async function main() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error("NEXT_PUBLIC_API_URL non défini");

  // Articles "à la une" (tag homepage-article)
  const featuredSlugs = new Set(
    (await postsForTag(api, await tagId(api, "homepage-article"))).map((p) => p.slug)
  );

  const bySlug = new Map();
  for (const { slug, label } of CATEGORIES) {
    const posts = await postsForTag(api, await tagId(api, slug));
    for (const post of posts) {
      if (!post.slug || bySlug.has(post.slug)) continue; // dédoublonnage
      const yoast = post.yoast_head_json || {};
      bySlug.set(post.slug, {
        slug: post.slug,
        titre: decode(post.title?.rendered) || post.slug,
        contenu: post.content?.rendered || "",
        excerpt: excerptFrom(post.content?.rendered),
        imageUrl: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
        categorie: slug,
        categorieLabel: label,
        auteur: post.acf?.auteur_custom ? decode(post.acf.auteur_custom) : null,
        seoTitre: yoast.title || null,
        seoDescription: yoast.description || null,
        publishedAt: new Date(post.date || Date.now()),
        featured: featuredSlugs.has(post.slug),
        actif: true,
      });
    }
  }

  let n = 0;
  for (const data of bySlug.values()) {
    await prisma.article.upsert({ where: { slug: data.slug }, update: data, create: data });
    n++;
    console.log(`  + [${data.categorieLabel}]${data.featured ? " ★" : ""} ${data.titre}`);
  }
  console.log(`✅ ${n} article(s) importé(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
