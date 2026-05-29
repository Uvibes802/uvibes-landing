import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;

    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=homepage-article`, { cache: "no-store" });
    if (!tagRes.ok) return NextResponse.json([]);
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return NextResponse.json([]);

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=3&orderby=date&order=desc&_embed`, { cache: "no-store" });
    if (!postsRes.ok) return NextResponse.json([]);
    const posts = await postsRes.json();

    const articles = posts.map((post: { _embedded?: { "wp:featuredmedia"?: [{ source_url: string }] }; [key: string]: unknown }) => ({
      ...post,
      featured_image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    }));

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([]);
  }
}
