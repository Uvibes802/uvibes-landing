const FALLBACK_TITLE = "Activez \nla puissance \nde votre collectif";
const FALLBACK_DESC = "Et si les conversations clés arrivaient enfin ? \nL'outil digital qui les déclenche, au bon moment";

export async function fetchHomeContent() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const [titleRes, subtitleRes] = await Promise.all([
      fetch(`${api}/wp-json/wp/v2/tags?slug=title-homepage`, { next: { revalidate: 3600 } }),
      fetch(`${api}/wp-json/wp/v2/tags?slug=subtitle-homepage`, { next: { revalidate: 3600 } }),
    ]);

    if (!titleRes.ok || !subtitleRes.ok) return { title: FALLBACK_TITLE, description: FALLBACK_DESC };

    const [titleTags, subtitleTags] = await Promise.all([titleRes.json(), subtitleRes.json()]);

    let title = FALLBACK_TITLE;
    let description = FALLBACK_DESC;

    const titleTagId = titleTags[0]?.id;
    if (titleTagId) {
      const res = await fetch(`${api}/wp-json/wp/v2/posts?tags=${titleTagId}&per_page=1`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const posts = await res.json();
        if (posts.length > 0) title = posts[0].title.rendered;
      }
    }

    const subtitleTagId = subtitleTags[0]?.id;
    if (subtitleTagId) {
      const res = await fetch(`${api}/wp-json/wp/v2/posts?tags=${subtitleTagId}&per_page=1`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const posts = await res.json();
        if (posts.length > 0) description = posts[0].title.rendered;
      }
    }

    return { title, description };
  } catch {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESC };
  }
}
