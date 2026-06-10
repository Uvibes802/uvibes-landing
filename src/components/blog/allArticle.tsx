"use client";

import "@/styles/blog/blogSection.css";
import type { PublicArticle } from "@/services/blog/getArticles";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const CATEGORIES = [
  { value: "", label: "Tous" },
  { value: "science-et-societe", label: "Science & Société" },
  { value: "experiences-inattendues", label: "Expériences" },
  { value: "entreprise-article", label: "Entreprise" },
  { value: "education-article", label: "Éducation" },
  { value: "personnes-sensibles-aux-échanges", label: "Collectifs" },
  { value: "uvibes-article", label: "Uvibes" },
];

const ARTICLES_PER_PAGE = 9;

function ArticleCard({ article }: { article: PublicArticle }) {
  const hasImage = !!article.imageUrl;
  return (
    <Link href={`/blog/${article.slug}`} className="ba-card">
      <div className="ba-card-img">
        {hasImage ? (
          <Image src={article.imageUrl as string} alt={article.titre} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="ba-card-placeholder" aria-hidden="true" />
        )}
        <div className="ba-card-overlay" aria-hidden="true" />
      </div>
      <div className="ba-card-body">
        <p className="v-mono ba-card-date">
          {new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        <h2 className="ba-card-title v-prompt">{article.titre}</h2>
        <p className="ba-card-excerpt">{article.excerpt}</p>
        {article.auteur && <p className="v-mono ba-card-author">— {article.auteur}</p>}
        <span className="ba-card-cta">Lire l&apos;article →</span>
      </div>
    </Link>
  );
}

export default function AllArticle({ articles }: { articles: PublicArticle[] }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => (selectedCategory ? articles.filter((a) => a.categorie === selectedCategory) : articles),
    [articles, selectedCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const current = filtered.slice(start, start + ARTICLES_PER_PAGE);

  const handleCategory = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ba-wrap">
      <div className="ba-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`ba-filter-btn${selectedCategory === cat.value ? " --active" : ""}`}
            onClick={() => handleCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {current.length === 0 ? (
        <p className="ba-empty">Aucun article dans cette catégorie pour le moment.</p>
      ) : (
        <div className="ba-grid">
          {current.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="ba-pagination">
          <button className="ba-page-btn" onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>
            ← Précédent
          </button>
          <span className="v-mono ba-page-info">{currentPage} / {totalPages}</span>
          <button className="ba-page-btn" onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}>
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}
