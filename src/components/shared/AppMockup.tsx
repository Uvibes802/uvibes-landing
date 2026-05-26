"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/shared/appMockup.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const RINGS = [0, 1, 2, 3];

export default function AppMockup() {
  const reduced = useReducedMotion();

  return (
    <div className={`apm-wrap${reduced ? " --no-motion" : ""}`}>
      {/* Couche 1 — Halo gradient */}
      <div className="apm-halo" aria-hidden="true" />

      {/* Couche 2 — Rings de vibration */}
      <div className="apm-rings" aria-hidden="true">
        {RINGS.map((i) => (
          <span key={i} className="apm-ring" style={{ animationDelay: `${i}s` } as React.CSSProperties} />
        ))}
      </div>

      {/* Couche 3 — Image */}
      <div className="apm-img-wrap">
        <Image
          src="/images/mockup-home.webp"
          alt="Interface de l'application Uvibes"
          width={460}
          height={690}
          priority
          className="apm-img"
        />
      </div>

      {/* Couche 4 — Chips flottantes (desktop uniquement) */}
      <div className="apm-chip apm-chip--left" aria-hidden="true">
        <span className="apm-chip-dot" />
        <span className="v-mono apm-chip-text">3 142 conversations live</span>
      </div>

      <div className="apm-chip apm-chip--top-right" aria-hidden="true">
        <span className="v-mono apm-chip-vibes">+ 17 VIBES</span>
        <span className="apm-chip-hello">Bonjour Thomas 👋</span>
      </div>

      <div className="apm-chip apm-chip--bottom-right" aria-hidden="true">
        <span className="v-mono apm-chip-live">EN COURS · 04:59</span>
        <span className="v-serif apm-chip-quote">« Un personnage de film qui t&apos;inspire ? »</span>
      </div>
    </div>
  );
}
