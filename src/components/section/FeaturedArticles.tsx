import type { PublicArticle } from "@/services/blog/getArticles";
import Image from "next/image";
import Link from "next/link";
import "../../styles/section/featuredArticles.css";

const ACCENTS = ["#FD6E00", "#D90A5C", "#00AFDD"];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// L'image alterne de côté à chaque carte (1ère à droite, 2e à gauche, etc.) —
// le texte vit toujours sur un fond plein (plus de superposition sur la photo,
// donc plus de problème de lisibilité sur les photos sombres).
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

      <div className="fa-grid">
        {shown.map((a, i) => (
          <ArticleCard key={a.slug} article={a} accent={ACCENTS[i % ACCENTS.length]} imageOnRight={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
