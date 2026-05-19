import { fetchPostsByTagSlug } from "@/services/blog/article";
import { getExcerpt } from "@/services/blog/getExcerpt";
import { sanitizeText } from "@/services/blog/sanitize";
import { Article } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogUvibesArticle() {
  const [uvibesArticles, setUvibesArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await fetchPostsByTagSlug("uvibes");
      const articlesWithImages = await Promise.all(
        articles.map(async (article: Article) => {
          let featuredImage = null;
          if (article.featured_media) {
            const mediaRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/media/${article.featured_media}`
            );
            const media = await mediaRes.json();
            featuredImage = media.source_url;
          }
          return {
            ...article,
            featured_image: featuredImage,
            title: {
              ...article.title,
              rendered: sanitizeText(article.title.rendered),
            },
            content: {
              ...article.content,
              rendered: sanitizeText(article.content.rendered),
            },
            date: new Date(article.date),
          };
        })
      );
      const sortedArticles = articlesWithImages.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      setUvibesArticles(sortedArticles);
    };
    fetchArticles();
  }, []);

  return (
    <section className="article-section">
      {uvibesArticles.map((article) => (
        <article key={article.id} className="blog-article uvibes-article">
          <Image
            src={article.featured_image}
            alt={article.title.rendered}
            width={200}
            height={200}
          />
          <div className="article-card-content">
            <h3>{article.title.rendered}</h3>
            <p>{getExcerpt(article.content.rendered, 240)}</p>
            <p>
              <strong>{article.acf.auteur_custom}</strong>
            </p>
            <p>{article.date.toLocaleDateString()}</p>
            <Link href={`/blog/${article.slug}`}>{`Lire l'article : ${article.title.rendered}`}</Link>
          </div>
        </article>
      ))}
    </section>
  );
}
