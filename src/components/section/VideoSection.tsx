"use client";

import VibrationLine from "@/components/shared/VibrationLine";
import { useEffect, useState } from "react";
import "../../styles/section/videoSection.css";

const VIDEOS = [
  { name: "Isaline", role: "Étudiante M2", quote: "J'ai rencontré quelqu'un d'une autre filière en 3 minutes. On déjeune ensemble depuis.", src: "/videos/Isaline-desktop.mp4" },
  { name: "Théo", role: "DRH groupe industriel", quote: "Mes managers se découvrent des points communs qu'on ne voit pas en réunion.", src: "/videos/Lisa-desktop.mp4" },
  { name: "Alina", role: "Responsable asso", quote: "Mes bénévoles se sont enfin parlé, sans qu'on organise un événement.", src: null },
  { name: "Eva", role: "Vie étudiante", quote: "Des étudiants de cultures différentes ont échangé. Les barrières sont tombées.", src: null },
  { name: "Marc", role: "Coach sportif", quote: "Les nouveaux et les anciens du club se mélangent vraiment depuis Uvibes.", src: "/videos/Delphine-desktop.mp4" },
  { name: "Sofia", role: "Coordinatrice seniors", quote: "Nos adhérents repartent avec des numéros, plus seulement avec un café.", src: null },
];

const TESTIMONIALS = [
  {
    quote: "Uvibes a créé une vraie dynamique dans notre équipe. En 10 minutes, des collègues qui se côtoyaient depuis des années ont découvert qu'ils avaient des passions communes.",
    name: "Marie-Claire D.",
    role: "Directrice des Ressources Humaines — Groupe industriel",
    stars: 5,
  },
  {
    quote: "Ce qui m'a surpris, c'est la facilité avec laquelle des étudiants de cultures très différentes ont pu échanger. Uvibes a vraiment brisé les barrières.",
    name: "Pr. Jean-Luc M.",
    role: "Responsable vie étudiante — Université",
    stars: 5,
  },
  {
    quote: "Nos adhérents se sentaient isolés. Depuis qu'on utilise Uvibes lors de nos événements, ils repartent avec de nouvelles rencontres et l'envie de revenir.",
    name: "Isabelle R.",
    role: "Coordinatrice — Association seniors",
    stars: 5,
  },
];

const PALETTES = [
  ["#FD6E00","#ffb37a"], ["#D90A5C","#ff7eb1"], ["#1a1715","#4a4239"],
  ["#f3ede3","#e2d7c1"], ["#FD6E00","#D90A5C"], ["#2a2422","#FD6E00"],
];

function Stars({ n }: { n: number }) {
  return (
    <div className="vs-stars" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < n ? "var(--orange)" : "transparent"}
          stroke="var(--orange)" strokeWidth={i < n ? 0 : 1.5}>
          <path d="M12 2.5l2.9 6.2 6.6.9-4.9 4.7 1.3 6.7L12 17.8 6.1 21l1.3-6.7-4.9-4.7 6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function VideoSection() {
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeatured((f) => (f + 1) % VIDEOS.length), 3600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="vs-section">
      {/* Vibration déco fond */}
      <div className="vs-bg-vibration" aria-hidden="true">
        <VibrationLine width={900} height={140} amplitude={50} freq={5}
          stroke="var(--orange)" strokeWidth={1.2} speed={20} />
      </div>

      {/* Header */}
      <div className="vs-header">
        <div>
          <Stars n={5} />
          <p className="v-mono vs-rating">4.9 / 5 · 312 avis</p>
          <h2 className="vs-title v-prompt">
            Ils <span className="v-serif">aiment</span>
            <br />l&apos;expérience.
          </h2>
        </div>
        <p className="vs-sub">Témoignages vidéo de membres d&apos;organisations qui utilisent Uvibes.</p>
      </div>

      {/* Grille vidéo asymétrique */}
      <div className="vs-grid">
        {VIDEOS.map((v, i) => {
          const isFeat = i === featured;
          const [c1, c2] = PALETTES[i % PALETTES.length];
          const initials = v.name.slice(0, 2);

          return (
            <div key={i} className={`vs-tile-wrap${isFeat ? " --featured" : ""}`}>
              <button
                className={`vs-tile${isFeat ? " --playing" : ""}`}
                style={{ background: `linear-gradient(155deg, ${c1}, ${c2})` } as React.CSSProperties}
                onClick={() => setFeatured(i)}
                aria-label={`Témoignage de ${v.name}, ${v.role}`}
              >
                <span className="vs-tile-initials v-prompt" aria-hidden="true">{initials}</span>
                <div className="vs-tile-badge v-mono">{isFeat ? "▶ NOW" : "▶ 02:43"}</div>
                <div className="vs-tile-bottom">
                  <div className="v-mono vs-tile-role">{v.role}</div>
                  <div className="vs-tile-name v-prompt">{v.name}</div>
                </div>
              </button>
              {isFeat && (
                <p className="vs-featured-quote v-serif">« {v.quote} »</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Témoignages écrits */}
      <div className="vs-testimonials">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="vs-testimonial">
            <Stars n={t.stars} />
            <p className="vs-testimonial-quote">« {t.quote} »</p>
            <div className="vs-testimonial-meta">
              <div className="vs-testimonial-name">{t.name}</div>
              <div className="v-mono vs-testimonial-role">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
