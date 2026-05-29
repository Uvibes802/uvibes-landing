"use client";

import { getVideoUrl } from "@/utils/videoUrl";
import { FeaturesData } from "@/data/features/featuresData";
import { CircleCheckBig, CirclePlay, PauseCircle } from "lucide-react";
import { useRef, useState } from "react";
import "../../styles/cards/FeaturesCard.css";

const NUMS = ["01", "02", "03"];
const EYEBROWS = ["Pour votre collectif", "Pour vous", "Pour tous"];

export function FeaturesCard() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const videoRefs = useRef<{ [id: number]: HTMLVideoElement | null }>({});

  const handlePlay = (id: number) => {
    for (const [key, ref] of Object.entries(videoRefs.current)) {
      if (Number(key) !== id && ref && !ref.paused) ref.pause();
    }
    const video = videoRefs.current[id];
    if (video) { video.play(); setActiveVideoId(id); }
  };

  const handlePause = (id: number) => {
    videoRefs.current[id]?.pause();
    setActiveVideoId(null);
  };

  return (
    <section className="features-card-container">
      {FeaturesData.map((feature, index) => {
        const color = index % 2 === 0 ? "orange" : "pink";
        /* Découpe le titre en sous-titre éditorial */
        const colonIdx = feature.title.indexOf(":");
        const titleMain  = colonIdx > -1 ? feature.title.slice(colonIdx + 1).trim() : feature.title;

        return (
          <article
            key={feature.id}
            className={`features-card ${color}`}
            data-num={NUMS[index] ?? ""}
          >
            {/* Texte */}
            <div className="features-card-text">
              <span className={`features-card-eyebrow`}>
                <span className="features-card-eyebrow-dot" aria-hidden="true" />
                {EYEBROWS[index]}
              </span>

              <h3 className="title-h3 feature-title">
                {titleMain.split("–")[0]?.trim() || titleMain}
                {titleMain.includes("–") && (
                  <span>{titleMain.split("–")[1]?.trim()}</span>
                )}
              </h3>

              <ul>
                {feature.items.map(({ id, item }) => (
                  <li key={id} className="feature-list-item">
                    <CircleCheckBig className={`features-item-icon ${color}-icon`} />
                    <p className="text">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visuel — vidéo circulaire */}
            <div className="features-card-visual">
              <div className="features-video-halo" aria-hidden="true" />
              <div className="features-video-container">
                <video
                  className={`features-video${activeVideoId === feature.id ? " playing" : ""}`}
                  ref={(el) => { videoRefs.current[feature.id] = el; }}
                  src={getVideoUrl(feature.video)}
                  playsInline
                  onPause={() => handlePause(feature.id)}
                >
                  <source src={getVideoUrl(feature.video)} type="video/mp4" />
                  <track kind="captions" src="/videos/test-temoignage.vtt" srcLang="fr" label="French" />
                </video>

                {activeVideoId !== feature.id ? (
                  <CirclePlay
                    className={`features-video-icon ${color}-video-icon`}
                    onClick={() => handlePlay(feature.id)}
                    onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") handlePlay(feature.id); }}
                    tabIndex={0}
                    aria-label={`Lire la vidéo : ${feature.title}`}
                  />
                ) : (
                  <PauseCircle
                    className={`features-video-icon pause-icon ${color}-video-icon`}
                    onClick={() => handlePause(feature.id)}
                    onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") handlePause(feature.id); }}
                    tabIndex={0}
                    aria-label="Mettre en pause"
                  />
                )}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
