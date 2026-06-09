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
      {/* Séparateur wavy en couches (haut) — 3 vagues étagées, chacune remplie du haut
          jusqu'à son bord ondulé (lignes de base décalées) → couvre toujours le fond,
          l'écart entre couches apparaît comme des marches ombrées. */}
      <div className="vs-wave-stack" aria-hidden="true">
        {/* Couche 3 (arrière) — bord le plus bas, 4 ondulations douces */}
        <svg className="vs-wave-layer vs-wave-layer--3" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 H1440 V46 C1320,58 1200,34 1080,46 C960,58 840,34 720,46 C600,58 480,34 360,46 C240,58 120,34 0,46 Z" />
        </svg>
        {/* Couche 2 (milieu) — bord intermédiaire, opposition de phase */}
        <svg className="vs-wave-layer vs-wave-layer--2" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 H1440 V34 C1320,24 1200,44 1080,34 C960,24 840,44 720,34 C600,24 480,44 360,34 C240,24 120,44 0,34 Z" />
        </svg>
        {/* Couche 1 (avant) — bord le plus haut, vague serrée 6 ondulations */}
        <svg className="vs-wave-layer vs-wave-layer--1" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 H1440 V22 C1320,34 1200,10 1080,22 C960,34 840,10 720,22 C600,34 480,10 360,22 C240,34 120,10 0,22 Z" />
        </svg>
      </div>
      <svg className="vs-wave vs-wave--bottom" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 H1440 V30 C1320,4 1200,54 1080,30 C960,6 840,54 720,30 C600,6 480,54 360,30 C240,6 120,54 0,30 Z" />
      </svg>
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
