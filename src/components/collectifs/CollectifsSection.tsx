"use client";

import { useState } from "react";
import Image from "next/image";
import { collectifs } from "@/data/collectifs/collectifsData";
import "@/styles/collectifs/collectifsSection.css";

export default function CollectifsSection() {
  const [activeId, setActiveId] = useState(collectifs[0].id);
  const active = collectifs.find((c) => c.id === activeId)!;

  return (
    <section className="collectifs-section">
      <div className="collectifs-header">
        <h2 className="title-h2-orange">Chaque collectif a ses enjeux.</h2>
        <p className="collectifs-intro">Découvrez le vôtre.</p>
      </div>

      {/* ── Ticker infini ── */}
      <div className="collectifs-ticker" aria-hidden="true">
        <div className="collectifs-ticker-track --forward">
          {[...collectifs, ...collectifs].map((c, i) => (
            <span key={i} className="collectifs-ticker-item">
              <span className="collectifs-ticker-dot" style={{ background: c.color }} />
              {c.name}
            </span>
          ))}
        </div>
        <div className="collectifs-ticker-track --reverse">
          {[...collectifs, ...collectifs].map((c, i) => (
            <span key={i} className="collectifs-ticker-item">
              <span className="collectifs-ticker-dot" style={{ background: c.color }} />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <div className="collectifs-split">
        {/* ── Sidebar liste ── */}
        <nav className="collectifs-nav" aria-label="Sélecteur de collectif">
          {collectifs.map((c, i) => (
            <button
              key={c.id}
              className={`collectif-nav-item${activeId === c.id ? " --active" : ""}`}
              style={{ "--c-color": c.color } as React.CSSProperties}
              onClick={() => setActiveId(c.id)}
              aria-pressed={activeId === c.id}
            >
              <span className="collectif-nav-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="collectif-nav-name">{c.name}</span>
              <span className="collectif-nav-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>

        {/* ── Panneau détail ── */}
        <div className="collectifs-panel" key={activeId}>
          {/* Header coloré avec flyers */}
          <div
            className="collectif-panel-hero"
            style={{ "--c-color": active.color } as React.CSSProperties}
          >
            <div className="collectif-panel-meta">
              <span className="collectif-panel-tag">{active.subtitle}</span>
              <h3 className="collectif-panel-title">{active.name}</h3>
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

          {/* Contenu texte */}
          <div className="collectif-panel-body">
            <div className="collectif-panel-col">
              <h4
                className="collectif-panel-col-title"
                style={{ color: active.color }}
              >
                Ce que vous y gagnez
              </h4>
              <ul className="collectif-panel-list">
                {active.gains.map((g, i) => (
                  <li key={i} style={{ "--c-color": active.color } as React.CSSProperties}>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="collectif-panel-col">
              <h4
                className="collectif-panel-col-title"
                style={{ color: active.color }}
              >
                Pourquoi ça fonctionne
              </h4>
              <ul className="collectif-panel-list">
                {active.pourquoi.map((p, i) => (
                  <li key={i} style={{ "--c-color": active.color } as React.CSSProperties}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
