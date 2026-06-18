"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/tarifs/tarifsHero.css";

// Particules flottantes (déco) — mêmes teintes que la page Méthode
type Particle = {
  c: string; s: number; anim: string; dur: string; del: string;
  top?: string; bottom?: string; left?: string; right?: string; border?: boolean;
};
const PARTICLES: Particle[] = [
  { c: "#FFE456", s: 14, top: "16%", left: "8%",  anim: "th-p-0", dur: "11s", del: "0s" },
  { c: "#fff",    s: 8,  top: "28%", right: "12%", anim: "th-p-1", dur: "14s", del: "1.2s" },
  { c: "#FFB0A0", s: 22, top: "62%", left: "6%",  anim: "th-p-2", dur: "16s", del: "0.4s", border: true },
  { c: "#fff",    s: 6,  top: "12%", right: "26%", anim: "th-p-0", dur: "9s",  del: "2s" },
  { c: "#FFE456", s: 10, top: "70%", right: "16%", anim: "th-p-1", dur: "13s", del: "0.8s" },
  { c: "#fff",    s: 30, top: "40%", left: "3%",   anim: "th-p-2", dur: "20s", del: "1.6s", border: true },
  { c: "#fff",    s: 18, bottom: "22%", right: "8%", anim: "th-p-0", dur: "17s", del: "0.3s", border: true },
  { c: "#FFE456", s: 7,  top: "48%", right: "30%", anim: "th-p-1", dur: "8s",  del: "0.1s" },
];

export default function TarifsHero() {
  return (
    <section className="th-section" aria-label="Tarifs et offres Uvibes">
      {/* Décor animé (même esprit que la page Méthode) : blobs doux + particules */}
      <div className="th-blobs" aria-hidden="true">
        <span className="th-blob th-blob--a" />
        <span className="th-blob th-blob--b" />
        <span className="th-blob th-blob--c" />
        <span className="th-blob th-blob--d" />
        <span className="th-blob th-blob--e" />
      </div>
      <div className="th-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="th-particle"
            style={{
              width: p.s, height: p.s,
              top: p.top, left: p.left, right: p.right, bottom: p.bottom,
              background: p.border ? "transparent" : p.c,
              border: p.border ? `1.5px solid ${p.c}` : "none",
              animationName: p.anim,
              animationDuration: p.dur,
              animationDelay: p.del,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="th-vib" aria-hidden="true">
        <VibrationLine width={1800} height={55} amplitude={22} freq={8} stroke="rgba(255,255,255,.32)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={55} amplitude={14} freq={12} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
      </div>

      <div className="th-inner">
        <h1 className="th-title v-prompt">
          Des offres adaptées à votre besoin<br />
          et <span className="th-title-accent v-serif">sans surprise.</span>
        </h1>
        <p className="th-desc">
          Trois formules annuelles pour déployer Uvibes dans la durée, et une
          offre découverte de 30&nbsp;jours pour l&apos;essayer sans engagement.
        </p>

        <div className="th-ctas">
          <Link href="/devis" className="btn-brand th-cta-primary">
            Faire un devis →
          </Link>
          <Link href="#offres" className="th-cta-ghost">
            Comparer les offres
          </Link>
        </div>
      </div>
    </section>
  );
}
