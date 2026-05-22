"use client";

import { useState } from "react";
import Image from "next/image";
import { collectifs } from "@/data/collectifs/collectifsData";
import "@/styles/collectifs/collectifsSection.css";

export default function CollectifsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="collectifs-section">
      <div className="collectifs-header">
        <h2 className="title-h2-orange">Chaque collectif a ses enjeux.</h2>
        <p className="collectifs-intro">Découvrez le vôtre.</p>
      </div>

      <div className="collectifs-list">
        {collectifs.map((collectif) => {
          const isOpen = openId === collectif.id;
          return (
            <div
              key={collectif.id}
              className={`collectif-item${isOpen ? " --open" : ""}`}
              style={{ "--collectif-color": collectif.color } as React.CSSProperties}
            >
              <button
                className="collectif-trigger"
                onClick={() => toggle(collectif.id)}
                aria-expanded={isOpen}
                aria-controls={`collectif-drawer-${collectif.id}`}
              >
                <span className="collectif-dot" aria-hidden="true" />
                <div className="collectif-trigger-text">
                  <span className="collectif-name">{collectif.name}</span>
                  <span className="collectif-sub">{collectif.subtitle}</span>
                </div>
                <svg
                  className="collectif-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                id={`collectif-drawer-${collectif.id}`}
                className="collectif-drawer"
              >
                <div className="collectif-drawer-inner">
                  {collectif.flyers.length > 0 && (
                    <div className="collectif-flyers">
                      {collectif.flyers.map((flyer, i) => (
                        <div key={i} className="collectif-flyer-wrap">
                          <Image
                            src={flyer.src}
                            alt={flyer.alt}
                            width={200}
                            height={280}
                            className="collectif-flyer-img"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="collectif-content">
                    <div className="collectif-gains">
                      <h4 className="collectif-content-title">Ce que vous y gagnez</h4>
                      <ul className="collectif-list-items">
                        {collectif.gains.map((gain, i) => (
                          <li key={i}>{gain}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="collectif-pourquoi">
                      <h4 className="collectif-content-title">Pourquoi ça fonctionne</h4>
                      <ul className="collectif-list-items">
                        {collectif.pourquoi.map((raison, i) => (
                          <li key={i}>{raison}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
