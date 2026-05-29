import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;

    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=temoignage`, { next: { revalidate: 3600 } });
    if (!tagRes.ok) return NextResponse.json([]);

    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return NextResponse.json([]);

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100`, { next: { revalidate: 3600 } });
    if (!postsRes.ok) return NextResponse.json([]);

    const posts = await postsRes.json();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([]);
  }
}
