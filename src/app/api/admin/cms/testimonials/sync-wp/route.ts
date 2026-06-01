import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return NextResponse.json({ error: "NEXT_PUBLIC_API_URL non défini" }, { status: 500 });

  const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=temoignage`);
  if (!tagRes.ok) return NextResponse.json({ error: "Impossible de contacter WordPress" }, { status: 502 });
  const tags = await tagRes.json();
  const tagId = tags[0]?.id;
  if (!tagId) return NextResponse.json({ error: "Tag 'temoignage' introuvable" }, { status: 404 });

  const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
  if (!postsRes.ok) return NextResponse.json({ error: "Erreur fetch WordPress" }, { status: 502 });
  const posts = await postsRes.json();

  if (!Array.isArray(posts) || posts.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  await prisma.testimony.deleteMany();

  let imported = 0;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const auteur = post.acf?.auteur_temoignage ?? post.title?.rendered ?? `Auteur ${i + 1}`;
    const role = post.acf?.role_et_entreprise_temoignage ?? "";
    const texte = post.acf?.texte_temoignage
      ?? post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim()
      ?? post.content?.rendered?.replace(/<[^>]+>/g, "").trim()
      ?? "";

    if (!texte) continue;
    await prisma.testimony.create({ data: { auteur, role, texte, ordre: i, actif: true } });
    imported++;
  }

  return NextResponse.json({ ok: true, imported });
}
