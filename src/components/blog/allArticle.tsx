"use client";

import useBlogArticles from "@/services/blog/useBlogArticles";
import { getExcerpt } from "@/services/blog/getExcerpt";
import "@/styles/blog/blogSection.css";
import type { Article } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const SLUGS = {
  entreprise: "entreprise-article",
  education: "education-article",
  science: "science-et-societe",
  vulnerability: "personnes-sensibles-aux-échanges",
  uvibes: "uvibes-article",
  experience: "experiences-inattendues",
} as const;

const ARTICLES_PER_PAGE = 9;

export default function AllArticle() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const current = filtered.slice(start, start + ARTICLES_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="article-section">
      <select
        name="category"
        id="categories"
        value={selectedCategory}
        onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
      >
        <option value="">Toutes les catégories</option>
        <option value="science-et-societe">Science et Société</option>
        <option value="experiences-inattendues">Expériences inattendues</option>
        <option value="entreprise-article">Entreprise</option>
        <option value="education-article">Education</option>
        <option value="personnes-sensibles-aux-echanges">Collectifs sensibles aux échanges</option>
        <option value="uvibes-article">Uvibes</option>
      </select>

      {current.map((article: Article) => (
        <article
          key={article.id}
          className={`blog-article ${article.tags.slug}`}
          onClick={() => router.push(`/blog/${article.slug}`)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/blog/${article.slug}`); }}
        >
          <Image
            src={article.featured_image}
            alt={article.title.rendered}
            width={200}
            height={200}
          />
          <div className="article-card-content">
            <h3>{article.title.rendered}</h3>
            <p>{getExcerpt(article.content.rendered, 240)}</p>
            <p><strong>{article.acf.auteur_custom}</strong></p>
            <p>{article.date.toLocaleDateString()}</p>
            <Link href={`/blog/${article.slug}`}>{`Lire l'article : ${article.title.rendered}`}</Link>
          </div>
        </article>
      ))}

      <div className="pagination-controls">
        <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </section>
  );
}
