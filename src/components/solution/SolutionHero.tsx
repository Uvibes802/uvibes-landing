"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/solution/solutionHero.css";

const PARTICLES = [
  { color: "#FD6E00", size: 14, top: "12%", left: "6%",  anim: "particle-0", dur: "11s", del: "0s"   },
  { color: "#D90A5C", size: 22, top: "25%", right: "7%", anim: "particle-1", dur: "14s", del: "1.2s" },
  { color: "#FFE456", size: 8,  top: "55%", right:"14%", anim: "particle-2", dur: "16s", del: "0.4s" },
  { color: "#FD6E00", size: 32, top: "5%",  left: "45%", anim: "particle-0", dur: "18s", del: "2s"   },
  { color: "#D90A5C", size: 10, top: "70%", left: "4%",  anim: "particle-1", dur: "13s", del: "0.8s" },
  { color: "#00AFDD", size: 18, top: "40%", left: "2%",  anim: "particle-2", dur: "12s", del: "1.6s" },
  { color: "#FD6E00", size: 6,  top: "8%",  right:"22%", anim: "particle-0", dur: "7s",  del: "3s"   },
  { color: "#fff",    size: 5,  top: "82%", right:"18%", anim: "particle-1", dur: "17s", del: "0.3s" },
  { color: "#FFB800", size: 12, bottom:"20%",left:"30%", anim: "particle-2", dur: "15s", del: "1s"   },
  { color: "#fff",    size: 40, top: "35%", right:"2%",  anim: "particle-0", dur: "22s", del: "2.5s", border: true },
  { color: "#FD6E00", size: 28, bottom:"15%",right:"5%", anim: "particle-1", dur: "20s", del: "0.6s", border: true },
  { color: "#D90A5C", size: 48, top: "60%", right:"3%",  anim: "particle-2", dur: "25s", del: "1.8s", border: true },
  { color: "#fff",    size: 20, top: "20%", left:"20%",  anim: "particle-0", dur: "9s",  del: "4s",   border: true },
  { color: "#FFE456", size: 8,  top: "48%", left:"18%",  anim: "particle-1", dur: "8s",  del: "0.1s"  },
];

export default function SolutionHero() {
  return (
    <section className="sh-section" aria-label="Présentation de la solution">
      {/* Grille de points */}
      <div className="sh-dot-grid" aria-hidden="true" />

      {/* Blobs */}
      <div className="sh-blobs" aria-hidden="true">
        {["a","b","c","d","e","f"].map(l => (
          <div key={l} className={`sh-blob sh-blob--${l}`} />
        ))}
      </div>

      {/* Particules flottantes */}
      <div className="sh-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`sh-particle`}
            style={{
              width: p.size, height: p.size,
              top: p.top, left: (p as {left?: string}).left,
              right: (p as {right?: string}).right,
              bottom: (p as {bottom?: string}).bottom,
              background: (p as {border?: boolean}).border ? "transparent" : p.color,
              border: (p as {border?: boolean}).border ? `1.5px solid ${p.color.replace("#fff", "rgba(255,255,255,.45)").replace("#FD6E00", "rgba(253,110,0,.45)").replace("#D90A5C", "rgba(217,10,92,.45)")}` : "none",
              borderRadius: "50%",
              opacity: (p as {border?: boolean}).border ? 0.55 : 0.6,
              animationName: p.anim,
              animationDuration: p.dur,
              animationDelay: p.del,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* VibrationLine bas de section */}
      <div className="sh-vib" aria-hidden="true">
        <VibrationLine width={1800} height={55} amplitude={22} freq={8} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={55} amplitude={14} freq={12} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
      </div>

      <div className="sh-inner">
        {/* Texte */}
        <div className="sh-content">
          <h1 className="sh-title v-prompt">
            La méthode<br />
            pour votre<br />
            <span className="sh-title-accent">organisation.</span>
          </h1>
          <p className="sh-desc">
            Découvrez comment Uvibes s&apos;adapte à votre contexte
            et choisissez l&apos;offre qui vous correspond.
          </p>
          <div className="sh-ctas">
            <Link href="#solution-tabs" className="btn-brand sh-cta-primary">
              Explorer la solution →
            </Link>
            <Link href="/tarifs" className="sh-cta-ghost">
              Voir les offres
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
