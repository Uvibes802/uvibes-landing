"use client";

import useBlogArticles from "@/services/blog/useBlogArticles";
import { getExcerpt } from "@/services/blog/getExcerpt";
import "@/styles/blog/blogSection.css";
import type { Article } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const SLUGS = {
  entreprise:    "entreprise-article",
  education:     "education-article",
  science:       "science-et-societe",
  vulnerability: "personnes-sensibles-aux-échanges",
  uvibes:        "uvibes-article",
  experience:    "experiences-inattendues",
} as const;

const CATEGORIES = [
  { value: "",                                 label: "Tous" },
  { value: "science-et-societe",               label: "Science & Société" },
  { value: "experiences-inattendues",          label: "Expériences" },
  { value: "entreprise-article",               label: "Entreprise" },
  { value: "education-article",                label: "Éducation" },
  { value: "personnes-sensibles-aux-echanges", label: "Collectifs" },
  { value: "uvibes-article",                   label: "Uvibes" },
];

const ARTICLES_PER_PAGE = 9;

function ArticleCard({ article }: { article: Article }) {
  const excerpt = getExcerpt(article.content.rendered, 140);
  const hasImage = !!article.featured_image;

  return (
    <Link href={`/blog/${article.slug}`} className="ba-card">
      <div className="ba-card-img">
        {hasImage ? (
          <Image
            src={article.featured_image}
            alt={article.title.rendered}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="ba-card-placeholder" aria-hidden="true" />
        )}
        <div className="ba-card-overlay" aria-hidden="true" />
      </div>
      <div className="ba-card-body">
        <p className="v-mono ba-card-date">
          {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        <h3 className="ba-card-title v-prompt">{article.title.rendered}</h3>
        <p className="ba-card-excerpt">{excerpt}</p>
        {article.acf?.auteur_custom && (
          <p className="v-mono ba-card-author">— {article.acf.auteur_custom}</p>
        )}
        <span className="ba-card-cta">Lire l&apos;article →</span>
      </div>
    </Link>
  );
}

export default function AllArticle() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const entreprise    = useBlogArticles(SLUGS.entreprise);
  const education     = useBlogArticles(SLUGS.education);
  const science       = useBlogArticles(SLUGS.science);
  const vulnerability = useBlogArticles(SLUGS.vulnerability);
  const uvibes        = useBlogArticles(SLUGS.uvibes);
  const experience    = useBlogArticles(SLUGS.experience);

  const allArticles = useMemo(
    () =>
      [...entreprise, ...education, ...science, ...vulnerability, ...uvibes, ...experience].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [entreprise, education, science, vulnerability, uvibes, experience]
  );

  const filtered = selectedCategory
    ? allArticles.filter((a) => a.tags.slug === selectedCategory)
    : allArticles;

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
      {/* Filtres pills */}
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
          {current.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
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
