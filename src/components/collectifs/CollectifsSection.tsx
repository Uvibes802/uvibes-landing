"use client";

import { useState, useEffect } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import Image from "next/image";
import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import { collectifs as collectifsFr } from "@/data/collectifs/collectifsData";
import { collectifsEn } from "@/data/collectifs/collectifsDataEn";
import "@/styles/collectifs/collectifsSection.css";

interface CollectifsSectionProps {
  showCta?: boolean;
  locale?: "fr" | "en";
}

export default function CollectifsSection({ showCta = false, locale = "fr" }: CollectifsSectionProps) {
  const collectifs = locale === "en" ? collectifsEn : collectifsFr;
  const [activeId, setActiveId] = useState(collectifs[0].id);
  const [isLocked, setIsLocked] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const active = collectifs.find((c) => c.id === activeId)!;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.07 });

  // Fermeture de l'affiche en grand à la touche Échap + blocage du scroll
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    if (isLocked) return;
    const t = setInterval(() => {
      setActiveId((curr) => {
        const idx = collectifs.findIndex((c) => c.id === curr);
        return collectifs[(idx + 1) % collectifs.length].id;
      });
    }, 3500);
    return () => clearInterval(t);
  }, [isLocked]);

  return (
    <section className={`collectifs-section${vis ? " c-vis" : ""}`} ref={ref}>
      <div className="cs-blob cs-blob--1" aria-hidden="true" />
      <div className="cs-blob cs-blob--2" aria-hidden="true" />
      <div className="collectifs-inner">
        <div className="collectifs-header">
          <div className="collectifs-header-left">
            <span className="collectifs-eyebrow">
              <span className="collectifs-eyebrow-dot" aria-hidden="true" />
              {locale === "en" ? "Who's it for?" : "Pour qui ?"}
            </span>
            <h2 className="collectifs-title">
              {locale === "en" ? (
                <>Every <span className="collectifs-title-serif">organization</span><br />has its own challenges.</>
              ) : (
                <>Chaque{" "}<span className="collectifs-title-serif">organisation</span><br />a ses enjeux.</>
              )}
            </h2>
            <p className="collectifs-desc">
              {locale === "en"
                ? `${collectifs.length} sectors where Uvibes brings a sharper read of the field and a stronger engaged community.`
                : <>{collectifs.length} secteurs d&apos;activité auxquels Uvibes apporte une meilleure compréhension du terrain et un engagement renforcé de son collectif.</>}
            </p>
          </div>
        </div>

        {/* ── Ticker de pills cliquables ── */}
        <div className="collectifs-pills-ticker" aria-label={locale === "en" ? "Community selector" : "Sélecteur de collectif"}>
          <div className="collectifs-pills-track">
            {collectifs.map((c) => (
              <button
                key={c.id}
                className={`collectif-pill-btn${activeId === c.id ? " --active" : ""}`}
                style={{ "--c-color": c.color } as React.CSSProperties}
                onClick={() => { setIsLocked(true); setActiveId(c.id); }}
                aria-pressed={activeId === c.id}
              >
                <span className="collectif-pill-dot" aria-hidden="true" />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Déco gauche/droite du panneau ── */}
        <div className="collectifs-deco collectifs-deco--left" aria-hidden="true">
          <span className="coll-deco-ring coll-deco-ring--1" />
          <span className="coll-deco-ring coll-deco-ring--2" />
          <span className="coll-deco-dot" />
        </div>
        <div className="collectifs-deco collectifs-deco--right" aria-hidden="true">
          <span className="coll-deco-ring coll-deco-ring--3" />
          <span className="coll-deco-dot coll-deco-dot--2" />
          <span className="coll-deco-cross" />
        </div>

        {/* ── Panneau détail + lignes derrière ── */}
        <div className="collectifs-panel-wrapper">
          {/* Lignes vibration pleine largeur derrière la carte */}
          <div className="collectifs-panel-vlines" aria-hidden="true">
            <VibrationLine width={1600} height={60} amplitude={24} freq={4} stroke="rgba(244,98,31,.32)" strokeWidth={2}   speed={13} />
            <VibrationLine width={1600} height={60} amplitude={14} freq={7} stroke="rgba(217,10,92,.22)"  strokeWidth={1.2} speed={19} />
            <VibrationLine width={1600} height={60} amplitude={32} freq={3} stroke="rgba(244,98,31,.18)"  strokeWidth={2.5} speed={9}  />
            <VibrationLine width={1600} height={60} amplitude={10} freq={10} stroke="rgba(217,10,92,.18)" strokeWidth={1}   speed={25} />
            <VibrationLine width={1600} height={60} amplitude={20} freq={5} stroke="rgba(0,175,221,.15)"  strokeWidth={1.5} speed={17} />
            <VibrationLine width={1600} height={60} amplitude={28} freq={6} stroke="rgba(244,98,31,.12)"  strokeWidth={3}   speed={11} />
          </div>

          {/* Particules déco */}
          <div className="collectifs-particles" aria-hidden="true">
            <span className="cp cp--1" /><span className="cp cp--2" /><span className="cp cp--3" />
            <span className="cp cp--4" /><span className="cp cp--5" /><span className="cp cp--6" />
            <span className="cp cp--7" /><span className="cp cp--8" />
          </div>

          <div className="collectifs-panel" key={activeId} style={{ "--c-color": active.color } as React.CSSProperties}>
          <div className="collectif-panel-hero">
            {/* Particules animées */}
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="collectif-panel-sparkle"
                aria-hidden="true"
                style={{
                  left: `${(i * 71 + 5) % 100}%`,
                  top: `${(i * 47 + 10) % 100}%`,
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                } as React.CSSProperties}
              />
            ))}
            <div className="collectif-panel-meta">
              <span className="collectif-panel-tag">
                {locale === "en" ? "Case" : "Cas"} {String(collectifs.findIndex(c => c.id === activeId) + 1).padStart(2, "0")} / {collectifs.length}
              </span>
              <h3 className="collectif-panel-title">{active.name}</h3>
              <p className="collectif-panel-subtitle">{active.subtitle}</p>
            </div>
            <div className="collectif-panel-flyers">
              {active.flyers.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className="collectif-panel-flyer-wrap"
                  onClick={() => { setIsLocked(true); setLightbox(f); }}
                  aria-label={locale === "en" ? `Enlarge poster: ${f.alt}` : `Agrandir l'affiche : ${f.alt}`}
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={160}
                    height={225}
                    className="collectif-panel-flyer-img"
                  />
                  <span className="collectif-panel-flyer-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="collectif-panel-body">
            <div className="collectif-panel-col collectif-panel-col--gains">
              <div className="collectif-panel-col-title">{locale === "en" ? "→ What you gain" : "→ Ce que vous y gagnez"}</div>
              <ul className="collectif-panel-list collectif-panel-list--gains">
                {active.gains.map((g, i) => (
                  <li key={i}>
                    <span className="collectif-panel-bullet" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="collectif-panel-col collectif-panel-col--pourquoi">
              <div className="collectif-panel-col-title">{locale === "en" ? "→ Why it works" : "→ Pourquoi ça fonctionne"}</div>
              <ul className="collectif-panel-list collectif-panel-list--pourquoi">
                {active.pourquoi.map((p, i) => (
                  <li key={i}>
                    <svg className="collectif-panel-check" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="2.5" aria-hidden="true">
                      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>{/* fin collectifs-panel */}
        </div>{/* fin collectifs-panel-wrapper */}

        {showCta && (
          <div className="collectifs-cta">
            <Link href={locale === "en" ? "/en/method" : "/solution"} className="btn-cta primary collectifs-cta-btn">
              {locale === "en" ? "Discover our method" : "Découvrir notre méthode"}
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox — affiche en grand */}
      {lightbox && (
        <div
          className="cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button type="button" className="cs-lightbox-close" aria-label={locale === "en" ? "Close" : "Fermer"} onClick={() => setLightbox(null)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <figure className="cs-lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={900}
              height={1270}
              className="cs-lightbox-img"
            />
          </figure>
        </div>
      )}
    </section>
  );
}
