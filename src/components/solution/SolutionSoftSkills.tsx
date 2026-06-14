"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/solution/solutionSoftSkills.css";

// ── Médias hébergés sur CloudFront (fournis par la tutrice) ───────────────
// Laisser vide tant que l'URL n'est pas connue → un placeholder propre s'affiche.
// Vidéo : remplacer par getVideoUrl("nom-du-reel.mp4") une fois en ligne.
const REEL_SRC = "";    // TODO reel 9:16 (CloudFront)
const PODCAST_SRC = ""; // TODO épisode podcast .mp3 (CloudFront)

/* Barres de l'onde du podcast */
const WAVE_BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.45, 0.8, 0.5, 0.7, 0.3];

export default function SolutionSoftSkills() {
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
            Ce que Uvibes fait aussi d&apos;unique
          </p>
          <h2 className="sss-title v-prompt">
            Entraîner et valoriser<br />
            les <span className="sss-title-accent v-serif">soft skills.</span>
          </h2>
          <p className="sss-subtitle">
            Au-delà des rencontres, Uvibes devient un vrai parcours&nbsp;:<br />
            on apprend, on s&apos;entraîne, et on repart avec une reconnaissance concrète.
          </p>
        </header>

        <div className="sss-rows">

          {/* ── 01 · Vidéo — reel 9:16 dans un cadre épuré ── */}
          <div className="sss-row" style={{ "--c": "#FD6E00" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-video-frame">
                {REEL_SRC ? (
                  <video
                    className="sss-video"
                    src={REEL_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="Aperçu vidéo Uvibes"
                  />
                ) : (
                  <div className="sss-video-ph" aria-hidden="true">
                    <span className="sss-video-ph-play">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">01</span>
              <h3 className="sss-row-title">Des ressources à disposition</h3>
              <p className="sss-row-body">
                Des vidéos courtes et concrètes pour comprendre, pas à pas, comment
                progresser sur chaque soft skill.
              </p>
            </div>
          </div>

          {/* ── 02 · Podcast — sans carte, éléments animés ── */}
          <div className="sss-row sss-row--reverse" style={{ "--c": "#E6007E" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className={`sss-podcast${playing ? " is-playing" : ""}`}>
                <div className="sss-podcast-discwrap">
                  <span className="sss-podcast-halo" aria-hidden="true" />
                  <span className="sss-podcast-halo sss-podcast-halo--2" aria-hidden="true" />
                  <button
                    type="button"
                    className="sss-podcast-disc"
                    onClick={togglePodcast}
                    aria-pressed={playing}
                    aria-label={playing ? "Mettre le podcast en pause" : "Écouter le podcast"}
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
            <div className="sss-text-col">
              <span className="sss-num v-mono">02</span>
              <h3 className="sss-row-title">Un podcast pour aller plus loin</h3>
              <p className="sss-row-body">
                Des épisodes pour creuser chaque soft skill, à écouter quand vous
                voulez, où vous voulez.
              </p>
            </div>
          </div>

          {/* ── 03 · Attestation ── */}
          <div className="sss-row" style={{ "--c": "#F59E0B" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <Image
                src="/images/attestation-lou.png"
                alt="Attestation d'entraînement Uvibes — exemple Lou"
                width={260}
                height={184}
                className="sss-attestation-img"
              />
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">03</span>
              <h3 className="sss-row-title">Une attestation pour se valoriser</h3>
              <p className="sss-row-body">
                Les utilisateurs obtiennent une attestation qui reconnaît leur entraînement
                et valorise leurs soft skills.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
