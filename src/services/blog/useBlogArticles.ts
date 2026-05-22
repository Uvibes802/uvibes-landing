"use client";

import { useEffect, useState } from "react";
import { fetchPostsByTagSlug } from "@/services/blog/article";
import { sanitizeText } from "@/services/blog/sanitize";
import type { Article } from "@/types/article/article";

const api = process.env.NEXT_PUBLIC_API_URL;

async function enrichArticle(article: Article): Promise<Article> {
  let featuredImage = "";
  if (article.featured_media) {
    try {
      const res = await fetch(`${api}/wp-json/wp/v2/media/${article.featured_media}`);
      if (res.ok) {
        const media = await res.json();
        featuredImage = media.source_url ?? "";
      }
    } catch {
      // pas d'image — on garde null
    }
  }
  return {
    ...article,
    featured_image: featuredImage,
    title: { ...article.title, rendered: sanitizeText(article.title.rendered) },
    content: { ...article.content, rendered: sanitizeText(article.content.rendered) },
    date: new Date(article.date),
  };
}

export default function useBlogArticles(tagSlug: string) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const raw = await fetchPostsByTagSlug(tagSlug);
        const enriched = await Promise.all(raw.map(enrichArticle));
        const sorted = enriched.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        if (!cancelled) setArticles(sorted);
      } catch {
        // garde le state vide
      }
    };
    load();
    return () => { cancelled = true; };
  }, [tagSlug]);

  return articles;
}
