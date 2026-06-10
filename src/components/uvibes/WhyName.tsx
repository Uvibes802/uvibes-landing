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
        {/* Colonne texte */}
        <div className="uvn-text">
          <p className="uv-eyebrow">
            <span className="uv-eyebrow-dot" aria-hidden="true" />
            Le sens du nom
          </p>
          <h2 className="uv-section-title">
            Pourquoi <em className="uv-serif-grad">«&nbsp;Uvibes&nbsp;»</em> ?
          </h2>

          <p className="uvn-lead">
            Uvibes active la richesse des échanges humains au sein des collectifs,
            en y faisant naître des <em className="uv-em-orange">rencontres inattendues</em>.
          </p>
          <p className="uvn-body">
            <strong className="uvn-hl uvn-hl--rose">«&nbsp;Vibes&nbsp;»</strong>, en anglais,
            évoque ces vibrations, ces sensations que l&apos;on ressent quand on se connecte
            à quelqu&apos;un, notamment une personne encore inconnue. Et ce{" "}
            <strong className="uvn-hl uvn-hl--orange">«&nbsp;U&nbsp;»</strong>, c&apos;est pour{" "}
            <em className="uv-em-orange">You</em>, celui qui vit l&apos;expérience.
          </p>
          <p className="uvn-body">
            Chaque rencontre sur Uvibes est une aventure pour{" "}
            <em className="uv-em-rose">(re)découvrir</em> quelqu&apos;un de son collectif
            autour de questions ouvertes et positives. L&apos;émerveillement se crée,
            et les conversations prennent vie.
          </p>
        </div>

        {/* Médias — polaroïds côte à côte */}
        <div className="uvn-media">
          <div className="uvn-polaroid uvn-polaroid--a">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Colette-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
          </div>
          <div className="uvn-polaroid uvn-polaroid--b">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Delphine-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
          </div>
        </div>
      </div>

      {/* Ligne de vibration bas de section */}
      <div className="uvn-vib" aria-hidden="true">
        <VibrationLine width={1800} height={50} amplitude={18} freq={8} stroke="rgba(253,110,0,.22)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={50} amplitude={11} freq={13} stroke="rgba(217,10,92,.14)" strokeWidth={1} speed={22} />
      </div>
    </section>
  );
}
