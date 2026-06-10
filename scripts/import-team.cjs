// Import unique des membres d'équipe depuis WordPress vers la DB (table TeamMember).
// Étape de migration "élimination de WP". Lancé une fois avec l'env chargé.
// Slugs WP réels → libellés de catégorie alignés sur les onglets du site + l'admin.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "equipe-projet", label: "Équipe projet" },
  { slug: "comite-expertise", label: "Comité d'expertise" },
  { slug: "les-architectes-du-code", label: "Architectes du code" },
];

function decodeEntities(s) {
  const named = {
    "&rsquo;": "’", "&lsquo;": "‘", "&rdquo;": "”", "&ldquo;": "“",
    "&amp;": "&", "&nbsp;": " ", "&hellip;": "…", "&ndash;": "–", "&mdash;": "—",
    "&laquo;": "«", "&raquo;": "»", "&eacute;": "é", "&egrave;": "è",
    "&agrave;": "à", "&ccedil;": "ç", "&ocirc;": "ô", "&ecirc;": "ê",
    "&icirc;": "î", "&ucirc;": "û", "&acirc;": "â", "&euml;": "ë",
    "&quot;": '"', "&#039;": "'", "&#39;": "'",
  };
  return (s || "")
    .replace(/&[a-zA-Z]+;|&#0?39;/g, (m) => named[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function stripHtml(s) {
  return decodeEntities((s || "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

async function main() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error("NEXT_PUBLIC_API_URL non défini");

  await prisma.teamMember.deleteMany();

  let ordre = 0;
  let imported = 0;

  for (const { slug, label } of CATEGORIES) {
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=${slug}`);
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) {
      console.log(`  (tag ${slug} introuvable)`);
      continue;
    }

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
    const posts = await postsRes.json();
    if (!Array.isArray(posts)) continue;

    for (const post of posts) {
      const nom = stripHtml(post.title?.rendered);
      const poste = stripHtml(post.content?.rendered);
      const photoUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
      if (!nom) continue;
      await prisma.teamMember.create({
        data: { nom, poste, equipe: label, photoUrl, ordre, actif: true },
      });
      ordre++;
      imported++;
      console.log(`  + ${label} — ${nom}`);
    }
  }

  console.log(`✅ ${imported} membre(s) importé(s).`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
