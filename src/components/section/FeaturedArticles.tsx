import VibrationLine from "@/components/shared/VibrationLine";
import type { PublicArticle } from "@/services/blog/getArticles";
import Image from "next/image";
import Link from "next/link";
import "../../styles/section/featuredArticles.css";

const ACCENTS = ["#FD6E00", "#D90A5C", "#00AFDD"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// Desktop — design d'origine : 1 carte principale + 2 cartes latérales,
// texte superposé à la photo (visible en permanence, détail complet au survol).
function ArticleCardOld({ article: a, accent, isMain }: { article: PublicArticle; accent: string; isMain?: boolean }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`fa-card-old${isMain ? " fa-card-old--main" : " fa-card-old--side"}`}
      style={{ "--fa-accent": accent } as React.CSSProperties}
    >
      <div className="fa-card-old-img">
        {a.imageUrl ? (
          <Image src={a.imageUrl} alt={a.titre} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="fa-card-old-wave-bg" aria-hidden="true">
            <VibrationLine width={480} height={60} amplitude={22} freq={4} stroke={accent} strokeWidth={2} speed={16} />
          </div>
        )}
        <div className="fa-card-old-shine" aria-hidden="true" />

        <div className="fa-card-old-info">
          <p className="v-mono fa-card-old-date">{formatDate(a.publishedAt)}</p>
          <h3 className="fa-card-old-title v-prompt">{a.titre}</h3>
        </div>

        <div className="fa-card-old-reveal">
          <p className="v-mono fa-card-old-date">{formatDate(a.publishedAt)}</p>
          <h3 className="fa-card-old-title v-prompt">{a.titre}</h3>
          <p className="fa-card-old-excerpt">{a.excerpt}</p>
          <span className="fa-card-old-cta">
            {isMain ? "Lire l'article" : "Lire"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Mobile — image en haut sur fond plein, texte en dessous (jamais superposé à
// la photo → pas de souci de lisibilité sur les images sombres en responsive).
function ArticleCard({ article: a, accent, imageOnRight }: { article: PublicArticle; accent: string; imageOnRight: boolean }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={`fa-card${imageOnRight ? " fa-card--img-right" : " fa-card--img-left"}`}
      style={{ "--fa-accent": accent } as React.CSSProperties}
    >
      <div className="fa-card-img">
        {a.imageUrl ? (
          <Image src={a.imageUrl} alt={a.titre} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="fa-card-wave-bg" aria-hidden="true" />
        )}
      </div>

      <div className="fa-card-info">
        <p className="v-mono fa-card-date">{formatDate(a.publishedAt)}</p>
        <h3 className="fa-card-title v-prompt">{a.titre}</h3>
        <p className="fa-card-excerpt">{a.excerpt}</p>
        <span className="fa-card-cta">
          Lire l&apos;article <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedArticles({ articles }: { articles: PublicArticle[] }) {
  if (!articles || articles.length === 0) return null;

  const [main, ...rest] = articles;
  const shown = articles.slice(0, 3);

  return (
    <section className="fa-section">
      <div className="fa-blob fa-blob--1" aria-hidden="true" />
      <div className="fa-blob fa-blob--2" aria-hidden="true" />
      <div className="fa-header">
        <div>
          <p className="v-mono fa-eyebrow"><span className="fa-eyebrow-dot" aria-hidden="true" />Le blog Uvibes</p>
          <h2 className="fa-title v-prompt">
            <span className="fa-title-magenta">Ce qui nous arrive.</span><br />Ce qu&apos;on lit{" "}.{" "}<span className="v-serif">Ce qu&apos;on pense.</span>
          </h2>
        </div>
        <Link href="/blog" className="btn-brand fa-cta-btn">
          Voir tous les articles →
        </Link>
      </div>

      {/* Desktop (≥768px) : design d'origine, 1 carte principale + 2 latérales */}
      <div className="fa-grid fa-grid--desktop">
        {main && <ArticleCardOld article={main} accent={ACCENTS[0]} isMain />}
        <div className="fa-side-old">
          {rest.slice(0, 2).map((a, i) => (
            <ArticleCardOld key={a.slug} article={a} accent={ACCENTS[i + 1]} />
          ))}
        </div>
      </div>

      {/* Mobile (<768px) : cartes empilées, moitié photo / moitié texte */}
      <div className="fa-grid fa-grid--mobile">
        {shown.map((a, i) => (
          <ArticleCard key={a.slug} article={a} accent={ACCENTS[i % ACCENTS.length]} imageOnRight={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
