"use client";

import FetchCitation from "@/services/citation/citation";
import { useEffect, useRef, useState } from "react";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/section/bannerCount.css";

const FILLER_STATIC = "échanges engagés";

function useCountUp(target: number, duration: number, started: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return v;
}

export default function BannerCount() {
  const { userNumber } = FetchCitation();
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const numericMatch = userNumber?.match(/\d(?:[\s\d]*\d)?|\d/);
  const target = numericMatch ? parseInt(numericMatch[0].replace(/\s/g, ""), 10) : 12480;

  const animated = useCountUp(target, 2200, started);
  const display = animated.toLocaleString("fr-FR");

  const rawScore = useCountUp(49, 1800, started);
  const score = (rawScore / 10).toFixed(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -80px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <section className="banner-count" ref={ref}>
      <div className="bc-dash bc-dash--top"    aria-hidden="true" />
      <div className="bc-dash bc-dash--bottom" aria-hidden="true" />
      <div className="banner-count-vlines" aria-hidden="true">
        <VibrationLine width={1400} height={70} amplitude={20} freq={6} stroke="rgba(255,255,255,.25)" strokeWidth={1.5} speed={14} />
        <VibrationLine width={1400} height={70} amplitude={14} freq={9} stroke="rgba(255,255,255,.15)" strokeWidth={1} speed={20} />
        <VibrationLine width={1400} height={70} amplitude={26} freq={4} stroke="rgba(255,255,255,.12)" strokeWidth={2} speed={10} />
      </div>
      <div className="banner-count-inner">

        {/* Compteur principal */}
        <div className="banner-count-main">
          <span className="v-mono banner-count-label">Déjà actifs sur Uvibes</span>
          <div className="banner-count-row">
            <h2 className="banner-count-number v-prompt">
              {display}<span className="banner-count-plus">+</span>
            </h2>
            <span className="banner-count-filler v-serif">{FILLER_STATIC}</span>
          </div>
        </div>

        {/* Séparateur */}
        <div className="banner-count-sep" aria-hidden="true" />

        {/* Score 4.9 / 5 */}
        <div className="banner-count-score">
          <div className="banner-score-top">
            <span className="banner-score-num v-prompt">{score}</span>
            <div className="banner-score-right">
              <span className="banner-score-outof v-mono">/&thinsp;5</span>
              <div className="banner-score-stars" aria-hidden="true">
                {[1,2,3,4].map(i => (
                  <span key={i} className="banner-score-star --full">★</span>
                ))}
                {/* 5e étoile 90% via SVG gradient */}
                <svg width="13" height="13" viewBox="0 0 24 24" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="star-90" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="90%" stopColor="#FFE456" />
                      <stop offset="90%" stopColor="rgba(255,228,86,.2)" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#star-90)" d="M12 2.5l2.9 6.2 6.6.9-4.9 4.7 1.3 6.7L12 17.8 6.1 21l1.3-6.7-4.9-4.7 6.6-.9z" />
                </svg>
              </div>
            </div>
          </div>
          <span className="v-mono banner-score-label">312 avis vérifiés</span>
        </div>

      </div>
    </section>
  );
}
