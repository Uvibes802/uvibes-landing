
type PartnerPost = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
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
}

export interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
}

export async function fetchPartners(): Promise<PartnerLogo[]> {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const tagRes = await fetch(`${api}/wp-json/wp/v2/tags?slug=partner-logo`);
    if (!tagRes.ok) return [];
    const tags = await tagRes.json();
    const tagId = tags[0]?.id;
    if (!tagId) return [];

    const postsRes = await fetch(`${api}/wp-json/wp/v2/posts?tags=${tagId}&per_page=100&_embed`);
    if (!postsRes.ok) return [];
    const posts = await postsRes.json();

    return posts
      .map((post: PartnerPost) => ({
        id: post.id,
        src: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        alt: post.title.rendered,
      }))
      .filter((p: PartnerLogo) => p.src !== "");
  } catch {
    return [];
  }
}
