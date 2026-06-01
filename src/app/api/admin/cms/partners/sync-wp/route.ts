import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return NextResponse.json({ error: "NEXT_PUBLIC_API_URL non défini" }, { status: 500 });

  // 1. Récupérer le tag "partner-logo" sur WordPress
  const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=partner-logo`);
  if (!tagRes.ok) return NextResponse.json({ error: "Impossible de contacter WordPress" }, { status: 502 });
  const tags = await tagRes.json();
  const tagId = tags[0]?.id;
  if (!tagId) return NextResponse.json({ error: "Tag 'partner-logo' introuvable sur WordPress" }, { status: 404 });

  // 2. Récupérer les articles avec ce tag
  const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
  if (!postsRes.ok) return NextResponse.json({ error: "Erreur fetch articles WordPress" }, { status: 502 });
  const posts = await postsRes.json();

  if (!Array.isArray(posts) || posts.length === 0) {
    return NextResponse.json({ error: "Aucun partenaire trouvé sur WordPress", imported: 0 }, { status: 200 });
  }

  // 3. Supprimer les anciens partenaires DB (issus du seed avec faux chemins)
  await prisma.partner.deleteMany();

  // 4. Insérer les partenaires WordPress
  let imported = 0;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const logoUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
    const nom = post.title?.rendered ?? `Partenaire ${i + 1}`;
    const link = post._embedded?.["wp:term"]?.[0]?.[0]?.link ?? null;

    if (!logoUrl) continue;

    await prisma.partner.create({
      data: { nom, logoUrl, siteUrl: link, ordre: i, actif: true },
    });
    imported++;
  }

  return NextResponse.json({ ok: true, imported });
}
