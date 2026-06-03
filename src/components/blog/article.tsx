"use client";

import { sanitizeText } from "@/services/blog/sanitize";
import "@/styles/blog/article.css";
import type { Article } from "@/types/article/article";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ArticleContent({ article }: { article: Article }) {
  const router = useRouter();

  const title = sanitizeText(article.title.rendered);
  const content = sanitizeText(article.content.rendered);

  function parse(rendered: string): import("react").ReactNode {
    return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
  }

  const dateFormatted = article.date
    ? new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <main className="article-main">
      {/* ── Hero ── */}
      <div className="article-hero">
        {article.featured_image ? (
          <>
            <Image
              src={article.featured_image}
              alt={title}
              fill
              className="article-hero-image"
              priority
            />
            <div className="article-hero-overlay" aria-hidden="true" />
          </>
        ) : (
          <div className="article-hero-gradient-only" aria-hidden="true" />
        )}

        <div className="article-hero-content">
          <button
            className="article-back-hero"
            onClick={() => router.push("/blog")}
            aria-label="Retour au blog"
          >
            <ArrowLeft size={14} /> Retour au blog
          </button>

          <div className="article-hero-meta">
            <span className="article-hero-category">Article</span>
            {dateFormatted && (
              <span className="article-hero-date">{dateFormatted}</span>
            )}
          </div>

          <h1 className="article-hero-title">{title}</h1>
        </div>
      </div>

      {/* ── Corps ── */}
      <article className="article-body-card">
        <div className="article-content">
          {parse(content)}
        </div>
      </article>

      {/* ── Retour bas ── */}
      <button
        className="article-back-button"
        onClick={() => router.push("/blog")}
        style={{ display: "flex" }}
      >
        <ArrowLeft size={16} /> Retour aux articles
      </button>
    </main>
  );
}
