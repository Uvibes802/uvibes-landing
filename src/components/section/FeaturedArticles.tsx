"use client";

import VibrationLine from "@/components/shared/VibrationLine";
import { getExcerpt } from "@/services/blog/getExcerpt";
import { sanitizeText } from "@/services/blog/sanitize";
import { Article } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/section/featuredArticles.css";

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
        <Link href="/blog" className="btn-glass fa-cta">
          Voir tous les articles →
        </Link>
      </div>

      <div className="fa-grid">
        {/* Article principal */}
        {main && (
          <Link href={`/blog/${main.slug}`} className="fa-card fa-card--main">
            <div className="fa-card-header">
              {main.featured_image ? (
                <Image
                  src={main.featured_image}
                  alt={main.title.rendered}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="fa-card-wave" aria-hidden="true">
                  <VibrationLine width={480} height={80} amplitude={28} freq={4} stroke="var(--orange)" strokeWidth={1.5} speed={16} />
                </div>
              )}
              <div className="fa-card-overlay" />
            </div>
            <div className="fa-card-body">
              <p className="v-mono fa-card-date">
                {main.date instanceof Date ? main.date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}
              </p>
              <h3 className="fa-card-title v-prompt">{main.title.rendered}</h3>
              <p className="fa-card-excerpt">{getExcerpt(main.content.rendered, 140)}</p>
              {main.acf?.auteur_custom && (
                <p className="v-mono fa-card-author">{main.acf.auteur_custom}</p>
              )}
              <span className="fa-card-link">Lire l&apos;article →</span>
            </div>
          </Link>
        )}

        {/* Articles secondaires */}
        <div className="fa-side">
          {rest.slice(0, 2).map((a) => (
            <Link key={a.id} href={`/blog/${a.slug}`} className="fa-card fa-card--side">
              <div className="fa-card-header fa-card-header--side">
                {a.featured_image ? (
                  <Image src={a.featured_image} alt={a.title.rendered} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div className="fa-card-wave" aria-hidden="true">
                    <VibrationLine width={240} height={50} amplitude={16} freq={5} stroke="var(--rose)" strokeWidth={1} speed={20} />
                  </div>
                )}
                <div className="fa-card-overlay" />
              </div>
              <div className="fa-card-body">
                <p className="v-mono fa-card-date">
                  {a.date instanceof Date ? a.date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}
                </p>
                <h3 className="fa-card-title v-prompt">{a.title.rendered}</h3>
                <p className="fa-card-excerpt">{getExcerpt(a.content.rendered, 90)}</p>
                <span className="fa-card-link">Lire →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
