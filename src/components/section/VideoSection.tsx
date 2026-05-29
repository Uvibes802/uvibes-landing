"use client";

import FetchTestimony from "@/services/testimony/testimony";
import { useEffect, useState } from "react";
import "../../styles/section/videoSection.css";

const ACCENTS = ["#FD6E00", "#D90A5C", "#FF9558"];

function Stars({ color = "#FD6E00" }: { color?: string }) {
  return (
    <div className="vs-stars" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2.5l2.9 6.2 6.6.9-4.9 4.7 1.3 6.7L12 17.8 6.1 21l1.3-6.7-4.9-4.7 6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

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
        <p className="v-mono vs-rating">4.9 / 5 · 312 avis</p>
        <h2 className="vs-title v-prompt">
          <span className="vs-t-rose">Ils </span>
          <span className="v-serif vs-t-gradient">aiment</span>
          <br /><span className="vs-t-rose">l&apos;expérience.</span>
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

          {/* Étoiles + score */}
          <div className="vs-card-stars">
            <Stars color={accent} />
            <span className="v-mono vs-card-score">5.0</span>
          </div>

          {/* Citation */}
          <blockquote className="vs-card-quote v-serif">
            {t?.testimony}
          </blockquote>

          {/* Auteur */}
          <div className="vs-card-author">
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
