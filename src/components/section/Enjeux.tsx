"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/section/enjeux.css";

const ENJEUX = [
  {
    tag: "Entreprise", num: "01",
    q: "Comment retisser le lien après le télétravail ?",
    answer: "Des micro-rencontres hebdo entre services, sans réunion forcée.",
    stat: "+38% lien inter-équipes",
    bg: "linear-gradient(135deg, #FD6E00, #ff9558)", fg: "#fff",
  },
  {
    tag: "Université", num: "02",
    q: "Comment briser l'isolement des nouveaux arrivants ?",
    answer: "Buddy aléatoire pré-configuré dès la rentrée, en 3 minutes vidéo.",
    stat: "92% de matchs aboutis",
    bg: "linear-gradient(135deg, #D90A5C, #ff5e9c)", fg: "#fff",
  },
  {
    tag: "Association", num: "03",
    q: "Comment fidéliser des bénévoles dispersés ?",
    answer: "Rituels mensuels qui font sentir le collectif, même à distance.",
    stat: "×2 rétention 6 mois",
    bg: "var(--ink)", fg: "var(--paper)",
  },
  {
    tag: "Sport", num: "04",
    q: "Comment souder un collectif inter-générationnel ?",
    answer: "Questions partagées qui valent autant pour les U15 que les vétérans.",
    stat: "+47% de mixité d'âge",
    bg: "linear-gradient(135deg, #FD6E00, #D90A5C)", fg: "#fff",
  },
  {
    tag: "Seniors", num: "05",
    q: "Comment garder du lien hors des temps formels ?",
    answer: "Sessions douces, courtes, sans interface compliquée à apprendre.",
    stat: "0 ligne d'aide téléphonique",
    bg: "var(--paper)", fg: "var(--ink)",
  },
  {
    tag: "Mairie", num: "06",
    q: "Comment écouter sans réunion-marathon ?",
    answer: "Pulse hebdo agrégé, lisible sur mobile en moins de 5 minutes.",
    stat: "12× plus de retours qualitatifs",
    bg: "var(--cream-3)", fg: "var(--ink)",
  },
];

export default function Enjeux() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % ENJEUX.length), 3400);
    return () => clearInterval(t);
  }, []);

  const a = ENJEUX[active];
  const isLightFg = a.fg === "#fff";

  return (
    <section className="enjeux-section">
      {/* Vague décorative haut */}
      <svg className="enjeux-wave-top" viewBox="0 0 1600 80" preserveAspectRatio="none">
        <path d="M0 80 Q 200 20 400 50 T 800 50 T 1200 50 T 1600 50 L 1600 80 Z" fill="var(--cream-2)" />
      </svg>

      <div className="enjeux-inner">
        {/* Grand mot décoratif */}
        <div className="enjeux-bg-word v-prompt" aria-hidden="true">enjeux</div>

        {/* Header */}
        <div className="enjeux-header">
          <div className="enjeux-header-left">
            <span className="v-mono enjeux-eyebrow">
              <span className="enjeux-eyebrow-dot" aria-hidden="true" />
              05 / enjeux
            </span>
            <h2 className="enjeux-title v-prompt">
              Chaque{" "}
              <span className="v-serif enjeux-title-emph">collectif</span>
              <br />a ses enjeux.
            </h2>
            <p className="enjeux-sub">
              DRH, dirigeants d&apos;association, managers, équipes étudiantes, clubs sportifs, mairies —
              Uvibes s&apos;adapte à votre vocabulaire et à vos rituels.
            </p>
          </div>
          <div className="enjeux-controls">
            <button
              className="enjeux-ctrl-btn"
              onClick={() => setActive((a) => (a - 1 + ENJEUX.length) % ENJEUX.length)}
              aria-label="cas précédent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="v-mono enjeux-counter">
              {String(active + 1).padStart(2, "0")} / {String(ENJEUX.length).padStart(2, "0")}
            </span>
            <button
              className="enjeux-ctrl-btn --ink"
              onClick={() => setActive((a) => (a + 1) % ENJEUX.length)}
              aria-label="cas suivant"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grille : carte réponse + chips */}
        <div className="enjeux-grid">
          {/* Carte réponse morphing */}
          <div
            className="enjeux-answer-card"
            style={{ background: a.bg, color: a.fg } as React.CSSProperties}
          >
            {/* Sparkles */}
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
              <span key={i} className="enjeux-sparkle"
                style={{ left: `${(i * 71) % 100}%`, top: `${(i * 47 + 10) % 100}%`,
                  animationDelay: `${i * 0.3}s` }} />
            ))}

            <div className="enjeux-answer-top">
              <span className="v-mono enjeux-answer-tag"
                style={{ background: isLightFg ? "rgba(255,255,255,.18)" : "rgba(26,23,21,.1)",
                  border: `1px solid ${isLightFg ? "rgba(255,255,255,.22)" : "rgba(26,23,21,.15)"}` }}>
                Cas {a.num} · {a.tag}
              </span>
              <div className="enjeux-dots">
                {ENJEUX.map((_, i) => (
                  <span key={i} className="enjeux-dot-ind"
                    style={{
                      width: i === active ? "22px" : "6px",
                      background: isLightFg
                        ? (i === active ? "#fff" : "rgba(255,255,255,.4)")
                        : (i === active ? "var(--ink)" : "rgba(26,23,21,.3)"),
                    }} />
                ))}
              </div>
            </div>

            <div className="enjeux-answer-body">
              <p className="v-serif enjeux-answer-intro">La question</p>
              <h3 className="enjeux-answer-q v-prompt">« {a.q} »</h3>
            </div>

            <div className="enjeux-answer-footer">
              <div className="v-mono enjeux-answer-label">→ Ce qu&apos;Uvibes apporte</div>
              <p className="enjeux-answer-text">{a.answer}</p>
              <div className="enjeux-answer-stat-row"
                style={{ borderTopColor: isLightFg ? "rgba(255,255,255,.35)" : "rgba(26,23,21,.25)" }}>
                <div className="enjeux-stat v-prompt">{a.stat}</div>
                <button className="enjeux-voir-btn"
                  style={{ background: isLightFg ? "rgba(255,255,255,.18)" : "var(--ink)",
                    color: isLightFg ? "#fff" : "var(--paper)" }}>
                  Voir ce cas d&apos;usage →
                </button>
              </div>
            </div>
          </div>

          {/* Chips grid 2×3 */}
          <div className="enjeux-chips-grid">
            {ENJEUX.map((e, i) => {
              const isAct = i === active;
              return (
                <button key={i} className={`enjeux-chip${isAct ? " --active" : ""}`}
                  onClick={() => setActive(i)}
                  style={isAct ? { background: e.bg, color: e.fg, border: "1px solid transparent" } as React.CSSProperties : {}}
                >
                  {isAct && (
                    <svg className="enjeux-chip-wave" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <path fill="none" stroke={e.fg === "#fff" ? "#fff" : "var(--ink)"} strokeWidth="1"
                        d="M0 60 Q 75 30 150 60 T 300 60">
                        <animate attributeName="d" dur="3.5s" repeatCount="indefinite"
                          values="M0 60 Q 75 30 150 60 T 300 60; M0 60 Q 75 90 150 60 T 300 60; M0 60 Q 75 30 150 60 T 300 60" />
                      </path>
                    </svg>
                  )}
                  <div className="enjeux-chip-top v-mono">
                    Cas {e.num} · {e.tag}
                    <span className="enjeux-chip-dot-ind"
                      style={{ background: isAct ? (e.fg === "#fff" ? "#fff" : "var(--ink)") : "var(--orange)" }} />
                  </div>
                  <div className="enjeux-chip-q">{e.q}</div>
                  {isAct && (
                    <svg className="enjeux-chip-arrow" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA bas */}
        <div className="enjeux-cta-row">
          <Link href="/solution" className="btn-brand">
            Trouvez votre cas d&apos;usage
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="v-mono enjeux-cta-hint">· ou laissez la rotation décider pour vous</span>
        </div>
      </div>

      {/* Vague décorative bas */}
      <svg className="enjeux-wave-bot" viewBox="0 0 1600 80" preserveAspectRatio="none">
        <path d="M0 0 Q 200 60 400 30 T 800 30 T 1200 30 T 1600 30 L 1600 0 Z" fill="var(--cream-2)" />
      </svg>
    </section>
  );
}
