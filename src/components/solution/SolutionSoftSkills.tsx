"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionSoftSkills.css";

// ── Médias hébergés sur CloudFront (fournis par la tutrice) ───────────────
// Laisser vide tant que l'URL n'est pas connue → un placeholder propre s'affiche.
// Vidéo : remplacer par getVideoUrl("nom-du-reel.mp4") une fois en ligne.
const REEL_SRC = "";    // TODO reel 9:16 (CloudFront)
const PODCAST_SRC = ""; // TODO épisode podcast .mp3 (CloudFront)

/* Barres de l'onde du podcast */
const WAVE_BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.45, 0.8, 0.5, 0.7, 0.3];

export default function SolutionSoftSkills({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePodcast = () => {
    const a = audioRef.current;
    if (!a || !PODCAST_SRC) return;
    if (a.paused) { a.play(); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };

  return (
    <section id="soft-skills" className={`sss-section${vis ? " sss-vis" : ""}`} ref={ref}>
      {/* Ondes de vibration en fond — identité uvibes */}
      <div className="sss-waves" aria-hidden="true">
        <GradientVibrationLine id="sss-w1" width={1800} height={70} amplitude={30} freq={5} strokeWidth={20} speed={11} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="sss-w2" width={1800} height={70} amplitude={24} freq={7} strokeWidth={13} speed={15} colorFrom="#FFB800" colorTo="#D90A5C" style={{ width: "100%" }} />
      </div>

      <div className="sss-inner">
        <header className="sss-head">
          <p className="sss-eyebrow">
            <span className="sss-eyebrow-dot" aria-hidden="true" />
            {locale === "en" ? "Something else Uvibes does uniquely" : <>Ce que Uvibes fait aussi d&apos;unique</>}
          </p>
          <h2 className="sss-title v-prompt">
            {locale === "en" ? (
              <>Train and showcase<br />your <span className="sss-title-accent v-serif">soft skills.</span></>
            ) : (
              <>Entraîner et valoriser<br />les <span className="sss-title-accent v-serif">soft skills.</span></>
            )}
          </h2>
          <p className="sss-subtitle">
            {locale === "en" ? (
              <>Beyond the encounters themselves, Uvibes becomes a real development path:<br />you learn, you practice, and your commitment gets concretely recognized.</>
            ) : (
              <>Au-delà des rencontres, Uvibes devient un véritable parcours de développement&nbsp;:<br />on apprend, on s&apos;exerce et on obtient une reconnaissance concrète de son engagement.</>
            )}
          </p>
        </header>

        <div className="sss-rows">

          {/* ── 01 · Ressources — vidéo (reel) + podcast côte à côte ── */}
          <div className="sss-row" style={{ "--c": "#FD6E00" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-resources">
                <div className="sss-video-frame sss-video-frame--mini">
                  {REEL_SRC ? (
                    <video
                      className="sss-video"
                      src={REEL_SRC}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={locale === "en" ? "Uvibes video preview" : "Aperçu vidéo Uvibes"}
                    />
                  ) : (
                    <div className="sss-video-ph" aria-hidden="true">
                      <span className="sss-video-ph-play">
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </div>
                  )}
                </div>
                <div className={`sss-podcast${playing ? " is-playing" : ""}`}>
                  <div className="sss-podcast-discwrap">
                    <span className="sss-podcast-halo" aria-hidden="true" />
                    <span className="sss-podcast-halo sss-podcast-halo--2" aria-hidden="true" />
                    <button
                      type="button"
                      className="sss-podcast-disc"
                      onClick={togglePodcast}
                      aria-pressed={playing}
                      aria-label={playing ? (locale === "en" ? "Pause the podcast" : "Mettre le podcast en pause") : (locale === "en" ? "Listen to the podcast" : "Écouter le podcast")}
                    >
                      {playing ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                  </div>
                  <div className="sss-podcast-wave" aria-hidden="true">
                    {WAVE_BARS.map((h, i) => (
                      <span key={i} className="sss-podcast-bar" style={{ "--h": h, animationDelay: `${i * 0.08}s` } as React.CSSProperties} />
                    ))}
                  </div>
                  {PODCAST_SRC && (
                    <audio ref={audioRef} src={PODCAST_SRC} onEnded={() => setPlaying(false)} preload="none" />
                  )}
                </div>
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">01</span>
              <h3 className="sss-row-title">{locale === "en" ? "Resources at your fingertips" : "Des ressources à disposition"}</h3>
              <p className="sss-row-body">
                {locale === "en"
                  ? "Videos, podcasts and articles to understand, step by step, how to grow each soft skill."
                  : <>Des vidéos, podcasts et articles pour comprendre, pas à pas, comment progresser sur chaque soft skill.</>}
              </p>
            </div>
          </div>

          {/* ── 02 · Terrain d'entraînement — vidéo polaroïd d'un vibe réel ── */}
          <div className="sss-row sss-row--reverse" style={{ "--c": "#E6007E" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <figure className="sss-vibe-polaroid">
                <video
                  className="sss-vibe-video"
                  src={getVideoUrl("arjun-mobile.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={locale === "en" ? "Preview of a real Uvibes conversation" : "Aperçu d'un échange Uvibes en conditions réelles"}
                />
              </figure>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">02</span>
              <h3 className="sss-row-title">{locale === "en" ? "An ongoing training ground" : <>Un terrain d&apos;entraînement continu</>}</h3>
              <p className="sss-row-body">
                {locale === "en"
                  ? "Real-life situations to build and strengthen relational skills."
                  : <>Des mises en situation réelles pour développer et renforcer ses compétences relationnelles.</>}
              </p>
            </div>
          </div>

          {/* ── 03 · Attestation ── */}
          <div className="sss-row" style={{ "--c": "#F59E0B" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <Image
                src="/images/attestation-lou.png"
                alt={locale === "en" ? "Uvibes training certificate — Lou's example" : "Attestation d'entraînement Uvibes — exemple Lou"}
                width={260}
                height={184}
                className="sss-attestation-img"
              />
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">03</span>
              <h3 className="sss-row-title">{locale === "en" ? "Recognition for your commitment" : <>Une valorisation de l&apos;engagement</>}</h3>
              <p className="sss-row-body">
                {locale === "en" ? "A certificate that recognizes the journey completed." : "Une attestation qui reconnaît le parcours réalisé."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
