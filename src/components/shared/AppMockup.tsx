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
          src="/images/freepik__background__26732.png"
          alt="Interface de l'application Uvibes"
          width={460}
          height={690}
          priority
          className="apm-img"
        />
      </div>

      {/* Couche 4 — Chips flottantes (desktop uniquement) */}
      <div className="apm-chip apm-chip--left" aria-hidden="true">
        <span className="apm-chip-text">Qu&apos;est-ce qui vous a marqué récemment ?</span>
      </div>

      <div className="apm-chip apm-chip--top-right" aria-hidden="true">
        <span className="apm-chip-hello">Une personne qui vous inspire ?</span>
      </div>

      <div className="apm-chip apm-chip--bottom-right" aria-hidden="true">
        <span className="apm-chip-quote">Une habitude qui vous plaît au quotidien ?</span>
      </div>
    </div>
  );
}
