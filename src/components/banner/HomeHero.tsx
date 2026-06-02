"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import VibrationLine from "@/components/shared/VibrationLine";
import AppMockup from "@/components/shared/AppMockup";
import "../../styles/banner/homeHero.css";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fallback = setTimeout(() => setVisible(true), 900);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); clearTimeout(fallback); }
    }, { threshold: 0.08 });
    io.observe(el);
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < window.innerHeight) setVisible(true);
    });
    return () => { clearTimeout(fallback); io.disconnect(); };
  }, []);

  return (
    <div ref={ref} className={`v-reveal${visible ? " --visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}


export default function HomeHero() {
  return (
    <section className="hero-section" aria-label="Présentation Uvibes">
      {/* ── Backdrop animé ── */}
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-blob hero-blob-p" />
        <div className="hero-blob hero-blob-o" />
        <div className="hero-blob hero-blob-k" />
        <div className="hero-blob hero-blob-l" />
        <div className="hero-blob hero-blob-m" />
        <div className="hero-blob hero-blob-n" />
        <div className="hero-blob hero-blob-g" />
        <div className="hero-blob hero-blob-h" />
        <div className="hero-blob hero-blob-i" />
        <div className="hero-blob hero-blob-j" />
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="hero-blob hero-blob-d" />
        <div className="hero-blob hero-blob-e" />
        <div className="hero-blob hero-blob-f" />
        <svg className="hero-grain" aria-hidden="true">
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="1.6" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div className="hero-dot-grid" />
        <svg className="hero-waves" viewBox="0 0 1600 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FD6E00" stopOpacity="0" />
              <stop offset="40%" stopColor="#FD6E00" stopOpacity=".8" />
              <stop offset="100%" stopColor="#D90A5C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-b" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D90A5C" stopOpacity="0" />
              <stop offset="50%" stopColor="#D90A5C" stopOpacity=".65" />
              <stop offset="100%" stopColor="#FD6E00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="none" stroke="url(#wave-a)" strokeWidth="1.5" strokeLinecap="round"
            d="M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300">
            <animate attributeName="d" dur="9s" repeatCount="indefinite"
              values="M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300;
                      M-50 300 Q 200 400 400 300 T 800 300 T 1200 300 T 1650 300;
                      M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300" />
          </path>
          <path fill="none" stroke="url(#wave-b)" strokeWidth="1.2" strokeLinecap="round"
            d="M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360">
            <animate attributeName="d" dur="11s" repeatCount="indefinite"
              values="M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360;
                      M-50 360 Q 250 440 500 360 T 1000 360 T 1500 360 T 1700 360;
                      M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360" />
          </path>
          <path fill="none" stroke="rgba(26,23,21,.3)" strokeWidth=".8" strokeLinecap="round"
            d="M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420">
            <animate attributeName="d" dur="14s" repeatCount="indefinite"
              values="M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420;
                      M-50 420 Q 180 480 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420;
                      M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420" />
          </path>
        </svg>
        {/* Particules flottantes */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((i) => {
          const colors = ["#FD6E00","#D90A5C","#FFB040","#FF5894","#FF9558"];
          const c = colors[i % colors.length];
          return (
            <div key={i} className={`hero-particle hero-particle-${i % 3}`}
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${((i * 37 + 13) % 100)}%`,
                width: `${4 + (i % 4) * 2}px`,
                height: `${4 + (i % 4) * 2}px`,
                background: c,
                boxShadow: `0 0 12px ${c}aa`,
                opacity: 0.55,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${10 + (i % 6) * 2}s`,
              }} />
          );
        })}
      </div>

      {/* ── Eyebrow ── */}
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-line" aria-hidden="true" />
        <span className="v-mono hero-eyebrow-text">Application bien-être collectif · 2026</span>
      </div>

      {/* ── Grille principale ── */}
      <div className="hero-grid">
        {/* Colonne texte — h1 uniquement */}
        <div className="hero-text-col">
          <Reveal delay={0}>
            <h1 className="hero-h1 v-prompt">
              Activez la<br />
              <span className="hero-h1-emph">
                <span className="v-serif" style={{ color: "#FFE456" }}>puissance</span>
                <svg className="hero-underline" viewBox="0 0 460 30" aria-hidden="true">
                  <path d="M5 22 Q 110 4 220 16 T 455 12" fill="none"
                    stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <br />de votre{" "}
              <span style={{ color: "var(--rose)" }}>collectif.</span>
            </h1>
          </Reveal>
        </div>

        {/* Colonne visuelle */}
        <div className="hero-visual-col">
          <AppMockup />
        </div>

        {/* Sub + CTAs + social proof — desktop: col1 row2 / mobile: après mockup */}
        <div className="hero-after">
          <Reveal delay={180}>
            <p className="hero-sub">
              Les bonnes conversations ne s&apos;improvisent pas. Elles se créent.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero-ctas">
              <Link href="/solution" className="btn-brand">
                Découvrir l&apos;application
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/#contact" className="btn-glass">
                Étudions votre projet
              </Link>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Ligne de vibration en bas ── */}
      <div className="hero-vib-line">
        <VibrationLine stroke="var(--rose)" strokeWidth={1.5} amplitude={18} freq={12}
          width={1400} height={70} speed={14} />
      </div>
    </section>
  );
}
