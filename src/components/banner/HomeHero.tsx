"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import VibrationLine from "@/components/shared/VibrationLine";
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

function PhoneMock() {
  return (
    <div className="hero-phone-wrap">
      <div className="hero-phone-body">
        <div className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <div className="hero-phone-status v-mono">EN CONVERSATION · 02:14</div>
          <div className="hero-phone-grid">
            <div className="hero-phone-tile">Léa</div>
            <div className="hero-phone-tile --dark">Vous</div>
          </div>
          <div className="hero-phone-question">
            <div className="hero-phone-q-label v-mono">QUESTION 02</div>
            <div className="hero-phone-q-text">
              Quelle est la dernière chose qui t&apos;a fait rire au travail ?
            </div>
          </div>
          <div className="hero-phone-actions">
            <span className="hero-phone-btn" />
            <span className="hero-phone-btn --rose" />
            <span className="hero-phone-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="hero-section" aria-label="Présentation Uvibes">
      {/* ── Backdrop animé ── */}
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="hero-blob hero-blob-d" />
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
          const colors = ["#FD6E00","#D90A5C","#1a1715"];
          return (
            <div key={i} className={`hero-particle hero-particle-${i % 3}`}
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${((i * 37 + 13) % 100)}%`,
                width: `${4 + (i % 4) * 2}px`,
                height: `${4 + (i % 4) * 2}px`,
                background: colors[i % 3],
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
        <div className="hero-live-badge">
          <span className="hero-live-dot" aria-hidden="true" />
          <span className="v-mono hero-live-text">3 142 conversations en cours</span>
        </div>
      </div>

      {/* ── Grille principale ── */}
      <div className="hero-grid">
        {/* Colonne texte */}
        <div className="hero-text-col">
          <Reveal delay={0}>
            <h1 className="hero-h1 v-prompt">
              Activez la{" "}
              <span className="hero-h1-emph">
                <span className="v-serif">puissance</span>
                <svg className="hero-underline" viewBox="0 0 460 30" aria-hidden="true">
                  <path d="M5 22 Q 110 4 220 16 T 455 12" fill="none"
                    stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <br />de votre{" "}
              <span style={{ color: "var(--rose)" }}>collectif.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="hero-sub">
              L&apos;outil digital qui crée les bons échanges, au bon moment.
              Et si les <strong style={{ color: "var(--orange)", fontWeight: 700 }}>conversations clés</strong> arrivaient enfin ?
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

          <Reveal delay={460}>
            <div className="hero-social-proof">
              <div className="hero-avatars" aria-hidden="true">
                {["#FD6E00","#D90A5C","#1a1715","#7a6f63"].map((c, i) => (
                  <span key={i} className="hero-avatar" style={{ background: c, marginLeft: i ? "-10px" : 0 }} />
                ))}
              </div>
              <div className="v-mono hero-proof-text">
                12 480 + utilisateurs<br />
                <span style={{ color: "var(--ink-3)" }}>en France &amp; Belgique · 2026</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Colonne visuelle */}
        <div className="hero-visual-col" aria-hidden="true">
          {/* Ripples concentriques */}
          <div className="hero-ripples">
            {[0,1,2,3].map((i) => (
              <div key={i} className="hero-ripple"
                style={{
                  borderColor: i % 2 === 0 ? "rgba(253,110,0,.5)" : "rgba(217,10,92,.5)",
                  animationDelay: `${i}s`,
                }} />
            ))}
          </div>
          {/* Orbite pointillée */}
          <svg className="hero-orbit" width="460" height="540" viewBox="0 0 460 540">
            <ellipse cx="230" cy="270" rx="200" ry="240" fill="none"
              stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="2 6" opacity=".5" />
          </svg>
          {/* EQ visualizer */}
          <div className="hero-eq">
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} className="hero-eq-bar"
                style={{
                  background: i % 2 ? "var(--rose)" : "var(--orange)",
                  animationDelay: `${i * 0.12}s`,
                  animationDuration: `${1.2 + i * 0.1}s`,
                }} />
            ))}
          </div>
          <PhoneMock />
          {/* Chip statut */}
          <Reveal delay={400}>
            <div className="hero-chip-status">
              <span className="hero-chip-dot" />
              <span className="v-mono">Léa, 28, RH · disponible</span>
            </div>
          </Reveal>
          {/* Chip témoignage */}
          <Reveal delay={560}>
            <div className="hero-chip-quote">
              <div className="v-mono" style={{ fontSize: "10px", letterSpacing: "1.4px", opacity: .8 }}>NOUVELLE RENCONTRE</div>
              <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "4px", lineHeight: 1.3 }}>
                « On bosse au même étage depuis 3 ans. »
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Ligne de vibration en bas ── */}
      <div className="hero-vib-line">
        <VibrationLine stroke="var(--ink)" strokeWidth={1.2} amplitude={18} freq={12}
          width={1400} height={70} speed={14} />
      </div>
    </section>
  );
}
