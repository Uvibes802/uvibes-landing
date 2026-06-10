"use client";

import "@/styles/blog/article.css";
import type { PublicArticle } from "@/services/blog/getArticles";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ArticleContent({ article }: { article: PublicArticle }) {
  const router = useRouter();

  const title = article.titre;
  // Contenu HTML déjà nettoyé à l'écriture (côté serveur) → rendu direct, identique SSR/client.
  const content = article.contenu;

  const dateFormatted = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <main className="article-main">
      {/* ── Hero ── */}
      <div className="article-hero">
        {article.imageUrl ? (
          <>
            <Image src={article.imageUrl} alt={title} fill className="article-hero-image" priority />
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
            <span className="article-hero-category">{article.categorieLabel || "Article"}</span>
            {dateFormatted && <span className="article-hero-date">{dateFormatted}</span>}
          </div>

          <h1 className="article-hero-title">{title}</h1>
          {article.auteur && <p className="article-hero-author v-mono">— {article.auteur}</p>}
        </div>
      </div>

      {/* ── Corps ── */}
      <article className="article-body-card">
        <div className="article-content" dangerouslySetInnerHTML={{ __html: content }} />
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
