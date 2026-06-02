"use client";

import { useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import Image from "next/image";
import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import { collectifs } from "@/data/collectifs/collectifsData";
import "@/styles/collectifs/collectifsSection.css";

interface CollectifsSectionProps {
  showCta?: boolean;
}

export default function CollectifsSection({ showCta = false }: CollectifsSectionProps) {
  const [activeId, setActiveId] = useState(collectifs[0].id);
  const active = collectifs.find((c) => c.id === activeId)!;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.07 });

  return (
    <section className={`collectifs-section${vis ? " c-vis" : ""}`} ref={ref}>
      <div className="collectifs-inner">
        <div className="collectifs-header">
          <div className="collectifs-header-left">
            <span className="collectifs-eyebrow">
              <span className="collectifs-eyebrow-dot" aria-hidden="true" />
              Pour qui ?
            </span>
            <h2 className="collectifs-title">
              Chaque{" "}
              <span className="collectifs-title-serif">collectif</span>
              <br />a ses enjeux.
            </h2>
            <p className="collectifs-desc">
              Découvrez le vôtre. Onze contextes typiques —{" "}
              la vraie réponse vient toujours d&apos;une conversation.
            </p>
          </div>
        </div>

        {/* ── Ticker de pills cliquables ── */}
        <div className="collectifs-pills-ticker" aria-label="Sélecteur de collectif">
          <div className="collectifs-pills-track">
            {collectifs.map((c) => (
              <button
                key={c.id}
                className={`collectif-pill-btn${activeId === c.id ? " --active" : ""}`}
                style={{ "--c-color": c.color } as React.CSSProperties}
                onClick={() => setActiveId(c.id)}
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
                Cas {String(collectifs.findIndex(c => c.id === activeId) + 1).padStart(2, "0")} / {collectifs.length}
              </span>
              <h3 className="collectif-panel-title">{active.name}</h3>
              <p className="collectif-panel-subtitle">{active.subtitle}</p>
            </div>
            <div className="collectif-panel-flyers">
              {active.flyers.map((f, i) => (
                <div key={i} className="collectif-panel-flyer-wrap">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={160}
                    height={225}
                    className="collectif-panel-flyer-img"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="collectif-panel-body">
            <div className="collectif-panel-col collectif-panel-col--gains">
              <div className="collectif-panel-col-title">→ Ce que vous y gagnez</div>
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
              <div className="collectif-panel-col-title">→ Pourquoi ça fonctionne</div>
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
            <Link href="/solution" className="btn-cta primary">
              Voir toutes les solutions par collectif
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
