"use client";

import { getVideoUrl } from "@/utils/videoUrl";
import { FeaturesData } from "@/data/features/featuresData";
import { Check, CirclePlay, PauseCircle } from "lucide-react";
import { useRef, useState } from "react";
import "../../styles/cards/FeaturesCard.css";

const FEATURES = [
  {
    n: "01",
    eyebrow: "Pour votre collectif",
    accent: "orange" as const,
    title: "Un voyage conversationnel",
    points: [
      "Des échanges vidéo one-to-one, guidés par des questions.",
      "Sur un nombre infini de sujets.",
      "Sur un temps court, de 6 à 10 minutes.",
    ],
  },
  {
    n: "02",
    eyebrow: "Pour vous",
    accent: "rose" as const,
    title: "Une connaissance approfondie de votre organisation",
    points: [
      "Un éclairage nouveau sur les dynamiques individuelles et collectives.",
      "La possibilité de recueillir régulièrement des avis sur les sujets de votre choix.",
      "L'émergence de nouvelles réflexions et propositions.",
    ],
  },
  {
    n: "03",
    eyebrow: "Pour tous",
    accent: "orange" as const,
    title: "Un parcours d'entraînement aux compétences relationnelles",
    points: [
      "Une cité des savoirs incluant vidéos, podcasts et articles.",
      "Plus de 5h d'entraînement en autonomie.",
      "Avec une attestation à la fin.",
    ],
  },
];

function FeatureRow({
  feature,
  videoSrc,
  index,
}: {
  feature: typeof FEATURES[0];
  videoSrc: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverse = index % 2 === 1;

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };
  const handlePause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className={`fc-row fc-row--${feature.accent}${reverse ? " fc-row--reverse" : ""}`}>
      {/* Filigrane numéro */}
      <span className="fc-watermark" aria-hidden="true">{feature.n}</span>

      {/* Texte */}
      <div className="fc-text">
        <span className="fc-eyebrow v-mono">
          <span className="fc-eyebrow-dot" aria-hidden="true" />
          {feature.eyebrow}
        </span>
        <h3 className="fc-title v-prompt">{feature.title}</h3>
        <ul className="fc-list">
          {feature.points.map((p, i) => (
            <li key={i} className="fc-item">
              <span className="fc-chip" aria-hidden="true">
                <Check size={13} strokeWidth={2.6} />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visuel vidéo circulaire */}
      <div className="fc-visual">
        <div className="fc-halo" aria-hidden="true" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="fc-ripple" style={{ animationDelay: `${i * 1.3}s` }} aria-hidden="true" />
        ))}
        <div
          className={`fc-circle fc-circle--clickable`}
          onClick={playing ? handlePause : handlePlay}
          role="button"
          tabIndex={0}
          aria-label={playing ? "Mettre en pause" : `Lire : ${feature.title}`}
          onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") { if (playing) { handlePause(); } else { handlePlay(); } } }}
        >
          <video
            ref={videoRef}
            className={`fc-video${playing ? " --playing" : ""}`}
            src={getVideoUrl(videoSrc)}
            playsInline
            onPause={() => setPlaying(false)}
          />
          {!playing ? (
            <CirclePlay className="fc-play-icon" aria-hidden="true" />
          ) : (
            <PauseCircle className="fc-play-icon fc-pause-icon" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturesCard() {
  return (
    <section className="fc-section" id="fonctionnalites" style={{ scrollMarginTop: 70 }}>
      {/* Intro centré */}
      <div className="fc-intro">
        <span className="fc-intro-eyebrow v-mono">
          <span className="fc-intro-dot" aria-hidden="true" />
          Fonctionnalités
        </span>
        <h2 className="fc-intro-title v-prompt">
          Ce que Uvibes change,{" "}
          <span className="fc-intro-serif v-serif">concrètement.</span>
        </h2>
        <p className="fc-intro-sub">
          Trois regards sur une même expérience : pour votre collectif, pour vous, pour chacun.
        </p>
      </div>

      {/* 3 rangées */}
      {FEATURES.map((f, i) => (
        <FeatureRow
          key={i}
          feature={f}
          videoSrc={FeaturesData[i]?.video ?? ""}
          index={i}
        />
      ))}
    </section>
  );
}
