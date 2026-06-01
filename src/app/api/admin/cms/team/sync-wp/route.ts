import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SLUGS = [
  { slug: "direction", equipe: "Direction" },
  { slug: "tech", equipe: "Tech" },
  { slug: "commercial", equipe: "Commercial" },
];

export async function POST() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return NextResponse.json({ error: "NEXT_PUBLIC_API_URL non défini" }, { status: 500 });

  await prisma.teamMember.deleteMany();

  let imported = 0;
  let ordre = 0;

  for (const { slug, equipe } of SLUGS) {
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=${slug}`);
    if (!tagRes.ok) continue;
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) continue;

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
    if (!postsRes.ok) continue;
    const posts = await postsRes.json();
    if (!Array.isArray(posts)) continue;

    for (const post of posts) {
      const nom = post.title?.rendered?.replace(/<[^>]+>/g, "").trim() ?? "";
      const poste = post.content?.rendered?.replace(/<[^>]+>/g, "").trim() ?? "";
      const photoUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
      if (!nom) continue;
      await prisma.teamMember.create({ data: { nom, poste, equipe, photoUrl, ordre, actif: true } });
      ordre++;
      imported++;
    }
  }

  return NextResponse.json({ ok: true, imported });
}
