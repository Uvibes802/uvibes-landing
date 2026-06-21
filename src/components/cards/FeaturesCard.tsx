"use client";

import { getVideoUrl } from "@/utils/videoUrl";
import { FeaturesData } from "@/data/features/featuresData";
import { Check, CirclePlay, PauseCircle } from "lucide-react";
import { useRef, useState } from "react";
import "../../styles/cards/FeaturesCard.css";

const FEATURES_FR = [
  {
    n: "01",
    eyebrow: "Pour votre collectif",
    accent: "orange" as const,
    title: "Le voyage conversationnel",
    points: [
      "Des échanges vidéo one-to-one, guidés par des questions.",
      "Sur un nombre infini de sujets.",
      "Pendant un temps court, de 6 à 10 minutes.",
    ],
  },
  {
    n: "02",
    eyebrow: "Pour vous",
    accent: "rose" as const,
    title: "La connaissance approfondie de votre organisation",
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
    title: "Le parcours d'entraînement aux compétences relationnelles",
    points: [
      "Une cité des savoirs incluant vidéos, podcasts et articles.",
      "Plus de 5h d'entraînement en autonomie.",
      "Avec une attestation à la fin.",
    ],
  },
];

const FEATURES_EN = [
  {
    n: "01",
    eyebrow: "For your community",
    accent: "orange" as const,
    title: "The conversational journey",
    points: [
      "One-to-one video exchanges, guided by questions.",
      "On an endless range of topics.",
      "In a short window, from 6 to 10 minutes.",
    ],
  },
  {
    n: "02",
    eyebrow: "For you",
    accent: "rose" as const,
    title: "A deep understanding of your organization",
    points: [
      "Fresh insight into individual and collective dynamics.",
      "The ability to regularly gather opinions on the topics you choose.",
      "New ideas and proposals emerging naturally.",
    ],
  },
  {
    n: "03",
    eyebrow: "For everyone",
    accent: "orange" as const,
    title: "A training path for relational skills",
    points: [
      "A knowledge hub with videos, podcasts and articles.",
      "Over 5 hours of self-paced training.",
      "With a certificate at the end.",
    ],
  },
];

function FeatureRow({
  feature,
  videoSrc,
  index,
  locale = "fr",
}: {
  feature: typeof FEATURES_FR[0];
  videoSrc: string;
  index: number;
  locale?: "fr" | "en";
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
          aria-label={playing ? (locale === "en" ? "Pause" : "Mettre en pause") : `${locale === "en" ? "Play" : "Lire"} : ${feature.title}`}
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

export function FeaturesCard({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const FEATURES = locale === "en" ? FEATURES_EN : FEATURES_FR;
  return (
    <section className="fc-section" id="fonctionnalites" style={{ scrollMarginTop: 70 }}>
      {/* Intro centré */}
      <div className="fc-intro">
        <span className="fc-intro-eyebrow v-mono">
          <span className="fc-intro-dot" aria-hidden="true" />
          {locale === "en" ? "Results" : "Résultats"}
        </span>
        <h2 className="fc-intro-title v-prompt">
          {locale === "en" ? (
            <>The real change brought by{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>
          ) : (
            <>Les changements concrets apportés par{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>
          )}
        </h2>
        <p className="fc-intro-sub">
          {locale === "en" ? "Real, high-impact feedback from the field." : <>Des retours d&apos;expérience à fort impact positif.</>}
        </p>
      </div>

      {/* 3 rangées */}
      {FEATURES.map((f, i) => (
        <FeatureRow
          key={i}
          feature={f}
          videoSrc={FeaturesData[i]?.video ?? ""}
          index={i}
          locale={locale}
        />
      ))}
    </section>
  );
}
