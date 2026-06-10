// Import unique des partenaires depuis WordPress (tag partner-logo) vers la DB (table Partner).
// Étape de migration "élimination de WP".
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function decode(s) {
  return (s || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&rsquo;|&#8217;|&#039;|&#39;/g, "’")
    .replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) throw new Error("NEXT_PUBLIC_API_URL non défini");

  const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=partner-logo`);
  const tagId = (await tagRes.json())[0]?.id;
  if (!tagId) throw new Error("tag partner-logo introuvable");

  const posts = await (await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`)).json();
  if (!Array.isArray(posts)) throw new Error("réponse WP inattendue");

  // On repart propre (supprime placeholders + doublons du seed)
  await prisma.partner.deleteMany();

  let ordre = 0;
  let imported = 0;
  for (const post of posts) {
    const nom = decode(post.title?.rendered);
    const logoUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
    if (!nom || !logoUrl) continue;
    await prisma.partner.create({ data: { nom, logoUrl, actif: true, ordre } });
    ordre++;
    imported++;
    console.log(`  + ${nom}`);
  }
  console.log(`✅ ${imported} partenaire(s) importé(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
