import { Article } from "@/types/article/article";

export async function fetchPostsByTagSlug(slug: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=${slug}`);
    if (!tagRes.ok) return [];
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return [];

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
    if (!postsRes.ok) return [];
    const posts = await postsRes.json();

    return posts.map((post: Article) => ({
      ...post,
      tags: { id: tagId, name: tags[0]?.name, slug: tags[0]?.slug },
    }));
  } catch {
    return [];
  }
}

export async function fetchFeaturedImageByPostSlug(slug: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${api}/wp-json/wp/v2/posts?slug=${slug}`);
    if (!res.ok) return null;
    const posts = await res.json();
    if (!posts.length) return null;

    const mediaId = posts[0].featured_media;
    if (!mediaId) return null;

    const mediaRes = await fetch(`${api}/wp-json/wp/v2/media/${mediaId}`);
    if (!mediaRes.ok) return null;
    const media = await mediaRes.json();
    return media.source_url ?? null;
  } catch {
    return null;
  }
}
