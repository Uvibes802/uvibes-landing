"use client";

import FetchTestimony from "@/services/testimony/testimony";
import { useEffect, useState } from "react";
import "../../styles/section/videoSection.css";

const ACCENTS = ["#FD6E00", "#FF9558", "#FD6E00"];

export default function VideoSection() {
  const testimonies = FetchTestimony();
  const [idx, setIdx] = useState(0);

  // Auto-rotate
  useEffect(() => {
    if (testimonies.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % testimonies.length), 5500);
    return () => clearInterval(timer);
  }, [testimonies.length]);

  const t = testimonies[idx] ?? testimonies[0];
  const accent = ACCENTS[idx % ACCENTS.length];

  return (
    <section className="vs-section">
      <div className="vs-blob vs-blob--a" aria-hidden="true" />
      <div className="vs-blob vs-blob--b" aria-hidden="true" />

      {/* Étoiles et particules */}
      <div className="vs-particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`vs-p vs-p--${(i % 4) + 1}`} style={{
            left: `${(i * 6.25 + 3) % 100}%`,
            top:  `${(i * 13 + 7) % 100}%`,
            animationDelay: `${(i * 0.4).toFixed(1)}s`,
            animationDuration: `${4 + (i % 5)}s`,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Header */}
      <div className="vs-header">
        <p className="v-mono vs-rating">4.9 / 5 · 312 avis vérifiés</p>
        <h2 className="vs-title v-prompt">
          <span className="vs-t-orange">Ça change </span>
          <span className="v-serif vs-t-gradient">quelque</span>
          <br /><span className="vs-t-orange">chose.</span>
        </h2>
      </div>

      {/* Carte unique */}
      <div className="vs-card-wrap">
        <div
          key={idx}
          className="vs-card"
          style={{ "--vs-accent": accent } as React.CSSProperties}
        >
          {/* Guillemet décoratif */}
          <span className="vs-card-glyph v-serif" aria-hidden="true">&ldquo;</span>

          {/* Étoiles 5/5 */}
          <div className="vs-card-stars" aria-label="5 étoiles sur 5">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className="vs-star" viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>

          {/* Citation */}
          <blockquote className="vs-card-quote v-serif">
            {t?.testimony}
          </blockquote>

          {/* Auteur */}
          <div className="vs-card-author">
            <div className="vs-card-avatar" aria-hidden="true">
              {(t?.auteur_temoignage || "M")[0].toUpperCase()}
            </div>
            <div className="vs-card-author-info">
              <span className="vs-card-name v-prompt">{t?.auteur_temoignage || "Membre Uvibes"}</span>
              {t?.role_et_entreprise_temoignage && (
                <span className="v-mono vs-card-role">{t.role_et_entreprise_temoignage}</span>
              )}
            </div>
          </div>

          {/* Barre déco basse */}
          <div className="vs-card-bar" aria-hidden="true" />
        </div>

        {/* Dots navigation */}
        {testimonies.length > 1 && (
          <div className="vs-dots" role="tablist" aria-label="Témoignages">
            {testimonies.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Témoignage ${i + 1}`}
                className={`vs-dot${i === idx ? " --active" : ""}`}
                style={{ "--vs-accent": ACCENTS[i % ACCENTS.length] } as React.CSSProperties}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
