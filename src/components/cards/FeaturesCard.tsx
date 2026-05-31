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
      "Des échanges vidéo one-to-one, guidés par des questions adaptées à chaque thématique.",
      "200+ sujets prêts à l'emploi — ou les vôtres, en quelques clics.",
      "Des rencontres courtes, de 6 à 20 minutes, qui s'intègrent dans la journée.",
    ],
  },
  {
    n: "02",
    eyebrow: "Pour vous",
    accent: "rose" as const,
    title: "Une connaissance approfondie de votre organisation",
    points: [
      "Des tableaux de bord en temps réel : satisfaction, bien-être, engagement.",
      "La perception des initiatives collectives, mesurée à la source.",
      "Les attentes et besoins non exprimés, enfin rendus visibles.",
    ],
  },
  {
    n: "03",
    eyebrow: "Pour tous",
    accent: "orange" as const,
    title: "Un parcours d'entraînement aux compétences relationnelles",
    points: [
      "Un premier espace d'entraînement aux compétences interpersonnelles.",
      "Des échanges bienveillants qui renforcent la confiance en soi.",
      "Une habitude qui se cultive, échange après échange.",
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
        <div className="fc-circle">
          <video
            ref={videoRef}
            className={`fc-video${playing ? " --playing" : ""}`}
            src={getVideoUrl(videoSrc)}
            playsInline
            onPause={() => setPlaying(false)}
          />
          {!playing ? (
            <CirclePlay
              className="fc-play-icon"
              onClick={handlePlay}
              onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") handlePlay(); }}
              tabIndex={0}
              aria-label={`Lire la vidéo : ${feature.title}`}
            />
          ) : (
            <PauseCircle
              className="fc-play-icon fc-pause-icon"
              onClick={handlePause}
              onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") handlePause(); }}
              tabIndex={0}
              aria-label="Mettre en pause"
            />
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
          Ce qu&apos;Uvibes change,{" "}
          <span className="fc-intro-serif v-serif">concrètement.</span>
        </h2>
        <p className="fc-intro-sub">
          Trois regards sur une même expérience — pour votre collectif, pour vous, pour chacun.
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
