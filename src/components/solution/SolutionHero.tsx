"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionHero.css";

const VIDEOS = ["Isaline-desktop.mp4", "Lisa-desktop.mp4", "Delphine-desktop.mp4", "Colette-desktop.mp4"];

function MacBook() {
  const [src, setSrc] = useState(VIDEOS[0]);
  useEffect(() => { setSrc(VIDEOS[Math.floor(Math.random() * VIDEOS.length)]); }, []);

  return (
    <div className="sh-mac-wrap">
      <div className="sh-mac-halo" aria-hidden="true" />
      <div className="sh-mac">
        <div className="sh-mac-lid">
          <div className="sh-mac-notch" aria-hidden="true" />
          <div className="sh-mac-display">
            <video
              className="sh-mac-video"
              src={getVideoUrl(src)}
              autoPlay muted loop playsInline
            />
            <div className="sh-mac-screen-glow" aria-hidden="true" />
            <div className="sh-mac-badge">
              <span className="sh-mac-dot" aria-hidden="true" />
              Live · Uvibes
            </div>
          </div>
        </div>
        <div className="sh-mac-hinge" aria-hidden="true" />
        <div className="sh-mac-body" aria-hidden="true">
          <div className="sh-mac-keyboard" />
          <div className="sh-mac-trackpad" />
        </div>
        <div className="sh-mac-foot" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function SolutionHero() {
  return (
    <section className="sh-section">
      {/* Blobs gradient */}
      <div className="sh-blobs" aria-hidden="true">
        {["a","b","c","d","e","f"].map(l => (
          <div key={l} className={`sh-blob sh-blob--${l}`} />
        ))}
      </div>

      <div className="sh-inner">
        {/* Texte */}
        <div className="sh-content">
          <p className="v-mono sh-eyebrow">
            <span className="sh-eyebrow-dot" aria-hidden="true" />
            La solution Uvibes
          </p>
          <h1 className="sh-title v-prompt">
            La solution<br />
            pour votre<br />
            <span className="sh-title-accent">collectif.</span>
          </h1>
          <p className="sh-desc">
            Découvrez comment Uvibes s&apos;adapte à votre contexte
            et choisissez l&apos;offre qui vous correspond.
          </p>
          <div className="sh-ctas">
            <Link href="#solution-tabs" className="btn-brand sh-cta-primary">
              Explorer la solution →
            </Link>
            <Link href="/solution#offres" className="sh-cta-ghost">
              Voir les offres
            </Link>
          </div>
        </div>

        {/* MacBook */}
        <MacBook />
      </div>
    </section>
  );
}
