"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/uvibes/whyName.css";

// Petites particules flottantes — déco animée
const PARTS = Array.from({ length: 9 });

export default function WhyName({ locale = "fr" }: { locale?: "fr" | "en" }) {
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
            {locale === "en" ? "What's in the name" : "Le sens du nom"}
          </p>
          <h2 className="uv-section-title uvn-title">
            {locale === "en" ? (
              <>Why <em className="uv-serif-grad">&ldquo;Uvibes&rdquo;</em>?</>
            ) : (
              <>Pourquoi <em className="uv-serif-grad">«&nbsp;Uvibes&nbsp;»</em> ?</>
            )}
          </h2>
          <p className="uvn-lead">
            {locale === "en" ? (
              <>Uvibes brings out the richness of human exchange within communities, sparking <em className="uv-em-orange">unexpected encounters</em>.</>
            ) : (
              <>Uvibes active la richesse des échanges humains au sein des collectifs, en y faisant naître des <em className="uv-em-orange">rencontres inattendues</em>.</>
            )}
          </p>
        </div>

        {/* Décodage du nom — emblème typographique + paragraphe filé, sans cartes ni lignes */}
        <div className="uvn-decode">
          <div className="uvn-emblem" aria-hidden="true">
            <span className="uvn-emblem-u v-serif">U</span>
            <span className="uvn-emblem-vibes v-serif">Vibes</span>
          </div>
          <p className="uvn-statement">
            {locale === "en" ? (
              <>
                <strong className="uvn-statement-key">U</strong>, as in <em className="uvn-statement-em">You</em> —
                you&apos;re the one living the experience.{" "}
                <strong className="uvn-statement-key">Vibes</strong>, as in{" "}
                <em className="uvn-statement-em">vibrations</em> — those feelings that arise
                when you connect with someone, even a total stranger.
              </>
            ) : (
              <>
                <strong className="uvn-statement-key">U</strong>, comme <em className="uvn-statement-em">You</em> —
                celui qui vit l&apos;expérience, c&apos;est vous.{" "}
                <strong className="uvn-statement-key">Vibes</strong>, comme{" "}
                <em className="uvn-statement-em">les vibrations</em> — ces sensations qui naissent
                quand on se connecte à quelqu&apos;un, même encore inconnu.
              </>
            )}
          </p>
        </div>

        {/* Médias — paire de polaroïds vidéo centrée */}
        <div className="uvn-media">
          <div className="uvn-polaroid uvn-polaroid--a">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Nadine-mobile.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Nadine</span>
          </div>
          <div className="uvn-polaroid uvn-polaroid--b">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Isaline-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Isaline</span>
          </div>
        </div>

        {/* Phrase de clôture centrée */}
        <p className="uvn-closing">
          {locale === "en" ? (
            <>Every encounter is a chance to <em className="uv-em-rose">(re)discover</em>{" "}
            someone in your community — where wonder is created and conversations come alive.</>
          ) : (
            <>Chaque rencontre est une aventure pour <em className="uv-em-rose">(re)découvrir</em>{" "}
            quelqu&apos;un de son collectif — l&apos;émerveillement se crée, les conversations prennent vie.</>
          )}
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
