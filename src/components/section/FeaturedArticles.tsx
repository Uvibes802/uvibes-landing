import VibrationLine from "@/components/shared/VibrationLine";
import type { PublicArticle } from "@/services/blog/getArticles";
import Image from "next/image";
import Link from "next/link";
import "../../styles/section/featuredArticles.css";

const ACCENTS = ["#FD6E00", "#D90A5C", "#00AFDD"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function ArticleCard({ article: a, accent, isMain }: { article: PublicArticle; accent: string; isMain?: boolean }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`fa-card${isMain ? " fa-card--main" : " fa-card--side"}`}
      style={{ "--fa-accent": accent } as React.CSSProperties}
    >
      <div className="fa-card-img">
        {a.imageUrl ? (
          <Image src={a.imageUrl} alt={a.titre} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="fa-card-wave-bg" aria-hidden="true">
            <VibrationLine width={480} height={60} amplitude={22} freq={4} stroke={accent} strokeWidth={2} speed={16} />
          </div>
        )}
        <div className="fa-card-shine" aria-hidden="true" />

        <div className="fa-card-info">
          <p className="v-mono fa-card-date">{formatDate(a.publishedAt)}</p>
          <h3 className="fa-card-title v-prompt">{a.titre}</h3>
        </div>

        <div className="fa-card-reveal">
          <p className="v-mono fa-card-date">{formatDate(a.publishedAt)}</p>
          <h3 className="fa-card-title v-prompt">{a.titre}</h3>
          <p className="fa-card-excerpt">{a.excerpt}</p>
          <span className="fa-card-cta">
            {isMain ? "Lire l'article" : "Lire"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedArticles({ articles }: { articles: PublicArticle[] }) {
  if (!articles || articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section className="fa-section">
      <div className="fa-blob fa-blob--1" aria-hidden="true" />
      <div className="fa-blob fa-blob--2" aria-hidden="true" />
      <div className="fa-header">
        <div>
          <p className="v-mono fa-eyebrow">Le blog Uvibes</p>
          <h2 className="fa-title v-prompt">
            <span className="fa-title-magenta">Ce qui nous arrive.</span>{" "}Ce qu&apos;on lit.{" "}<span className="v-serif">Ce qu&apos;on pense.</span>
          </h2>
        </div>
        <Link href="/blog" className="btn-brand fa-cta-btn">
          Voir tous les articles →
        </Link>
      </div>

      <div className="fa-grid">
        {main && <ArticleCard article={main} accent={ACCENTS[0]} isMain />}
        <div className="fa-side">
          {rest.slice(0, 2).map((a, i) => (
            <ArticleCard key={a.slug} article={a} accent={ACCENTS[i + 1]} />
          ))}
        </div>
      </div>
    </section>
  );
}
