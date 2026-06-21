"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/uvibes/whyName.css";

// Petites particules flottantes — déco animée
const PARTS = Array.from({ length: 9 });

export default function WhyName() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`uvn-section${vis ? " uvn-vis" : ""}`} ref={ref}>
      {/* Particules flottantes */}
      <div className="uvn-particles" aria-hidden="true">
        {PARTS.map((_, i) => (
          <span
            key={i}
            className={`uvn-p uvn-p--${i % 3}`}
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 53 + 11) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="uvn-inner">
        {/* En-tête centré */}
        <div className="uvn-head">
          <p className="uv-eyebrow uvn-eyebrow">
            <span className="uv-eyebrow-dot" aria-hidden="true" />
            Le sens du nom
          </p>
          <h2 className="uv-section-title uvn-title">
            Pourquoi <em className="uv-serif-grad">«&nbsp;Uvibes&nbsp;»</em> ?
          </h2>
          <p className="uvn-lead">
            Uvibes active la richesse des échanges humains au sein des collectifs,
            en y faisant naître des <em className="uv-em-orange">rencontres inattendues</em>.
          </p>
        </div>

        {/* Décodage du nom — composition éditoriale, sans cartes */}
        <div className="uvn-decode">
          <div className="uvn-row">
            <span className="uvn-row-letter v-serif">U</span>
            <span className="uvn-row-body">
              <span className="uvn-row-key">You</span>
              <span className="uvn-row-def">celui qui vit l&apos;expérience. C&apos;est vous.</span>
            </span>
          </div>
          <div className="uvn-row-divider" aria-hidden="true" />
          <div className="uvn-row">
            <span className="uvn-row-letter v-serif">Vibes</span>
            <span className="uvn-row-body">
              <span className="uvn-row-key">les vibrations</span>
              <span className="uvn-row-def">ces sensations quand on se connecte à quelqu&apos;un, même encore inconnu.</span>
            </span>
          </div>
        </div>

        {/* Médias — paire de polaroïds vidéo centrée */}
        <div className="uvn-media">
          <div className="uvn-polaroid uvn-polaroid--a">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Colette-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Colette</span>
          </div>
          <div className="uvn-polaroid uvn-polaroid--b">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Delphine-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Delphine</span>
          </div>
        </div>

        {/* Phrase de clôture centrée */}
        <p className="uvn-closing">
          Chaque rencontre est une aventure pour <em className="uv-em-rose">(re)découvrir</em>{" "}
          quelqu&apos;un de son collectif — l&apos;émerveillement se crée, les conversations prennent vie.
        </p>
      </div>

      {/* Ligne de vibration bas de section */}
      <div className="uvn-vib" aria-hidden="true">
        <VibrationLine width={1800} height={50} amplitude={18} freq={8} stroke="rgba(253,110,0,.22)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={50} amplitude={11} freq={13} stroke="rgba(217,10,92,.14)" strokeWidth={1} speed={22} />
      </div>
    </section>
  );
}
