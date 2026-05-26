"use client";

import FetchCitation from "@/services/citation/citation";
import { useEffect, useRef, useState } from "react";
import "../../styles/section/bannerCount.css";

const FILLERS = ["organisations", "rencontres provoquées", "minutes d'écoute", "vibrations partagées"];

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
  const [phrase, setPhrase] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const numericMatch = userNumber?.match(/\d(?:[\s\d]*\d)?|\d/);
  const target = numericMatch ? parseInt(numericMatch[0].replace(/\s/g, ""), 10) : 12480;

  const animated = useCountUp(target, 2200, started);
  const display = animated.toLocaleString("fr-FR");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -80px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPhrase((p) => (p + 1) % FILLERS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="banner-count" ref={ref}>
      <div className="banner-count-inner">
        <span className="v-mono banner-count-label">EN 2026, SUR UVIBES</span>
        <h2 className="banner-count-number v-prompt">
          {display}<span className="banner-count-plus">+</span>
        </h2>
        <span className="banner-count-filler v-serif">{FILLERS[phrase]}</span>
        <div className="banner-count-live">
          <span className="banner-count-dot" />
          <span className="v-mono">live · synchronisé wordpress</span>
        </div>
      </div>
    </section>
  );
}
