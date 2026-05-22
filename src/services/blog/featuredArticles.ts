
type FeaturedArticle = {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: string;
      }
    ];
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  };
};

export async function fetchFeaturedArticles() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=homepage-article`);
    if (!tagRes.ok) return [];
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return [];

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=3&_embed`);
    if (!postsRes.ok) return [];
    const posts = await postsRes.json();

    return posts.map((post: FeaturedArticle) => ({
      ...post,
      featured_image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
      tags: { id: tagId, name: tags[0]?.name, slug: tags[0]?.slug },
    }));
  } catch {
    return [];
  }
}
