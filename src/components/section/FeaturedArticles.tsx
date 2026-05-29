"use client";

import VibrationLine from "@/components/shared/VibrationLine";
import { getExcerpt } from "@/services/blog/getExcerpt";
import { sanitizeText } from "@/services/blog/sanitize";
import { Article } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/section/featuredArticles.css";

const ACCENTS = ["#FD6E00", "#D90A5C", "#00AFDD"];

function formatDate(d: Date | string) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

interface CardProps {
  article: Article;
  accent: string;
  isMain?: boolean;
  excerpt: string;
}

function ArticleCard({ article: a, accent, isMain, excerpt }: CardProps) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`fa-card${isMain ? " fa-card--main" : " fa-card--side"}`}
      style={{ "--fa-accent": accent } as React.CSSProperties}
    >
      <div className="fa-card-img">
        {a.featured_image ? (
          <Image src={a.featured_image} alt={a.title.rendered} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="fa-card-wave-bg" aria-hidden="true">
            <VibrationLine
              width={480} height={60} amplitude={22} freq={4}
              stroke={accent} strokeWidth={2} speed={16}
            />
          </div>
        )}
        <div className="fa-card-shine" aria-hidden="true" />

        {/* Info — toujours visible, se cache au hover */}
        <div className="fa-card-info">
          <p className="v-mono fa-card-date">{formatDate(a.date)}</p>
          <h3 className="fa-card-title v-prompt">{a.title.rendered}</h3>
        </div>

        {/* Reveal — monte au hover */}
        <div className="fa-card-reveal">
          <p className="v-mono fa-card-date">{formatDate(a.date)}</p>
          <h3 className="fa-card-title v-prompt">{a.title.rendered}</h3>
          <p className="fa-card-excerpt">{excerpt}</p>
          <span className="fa-card-cta">
            {isMain ? "Lire l'article" : "Lire"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/featured-articles")
      .then((r) => r.json())
      .then((fetched) => {
        const sanitized = fetched.map((a: Article) => ({
          ...a,
          title: { ...a.title, rendered: sanitizeText(a.title.rendered) },
          content: { ...a.content, rendered: sanitizeText(a.content.rendered) },
          date: new Date(a.date),
        }));
        setArticles(sanitized);
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section className="fa-section">
      <div className="fa-header">
        <div>
          <p className="v-mono fa-eyebrow">Le blog Uvibes</p>
          <h2 className="fa-title v-prompt">
            Ressources &amp; <span className="v-serif">insights.</span>
          </h2>
        </div>
        <Link href="/blog" className="fa-cta-btn">
          Voir tous les articles →
        </Link>
      </div>

      <div className="fa-grid">
        {main && (
          <ArticleCard
            article={main}
            accent={ACCENTS[0]}
            isMain
            excerpt={getExcerpt(main.content.rendered, 160)}
          />
        )}
        <div className="fa-side">
          {rest.slice(0, 2).map((a, i) => (
            <ArticleCard
              key={a.id}
              article={a}
              accent={ACCENTS[i + 1]}
              excerpt={getExcerpt(a.content.rendered, 100)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
