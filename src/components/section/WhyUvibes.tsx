'use client';

import { useEffect, useRef } from "react";
import { getVideoUrl } from "@/utils/videoUrl";
import "../../styles/section/whyUvibes.css";

export default function WhyUvibes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const keywords = Array.from(section.querySelectorAll<HTMLElement>(".kw"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          keywords.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.18}s`;
            el.classList.add("kw-visible");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-uvibes-section" ref={sectionRef}>
      <div className="why-uvibes-container">
        <div className="why-uvibes-text-container">
          <h2 className="title-h2-orange uvibes-title">
            Vos équipes se côtoient.<br className="mobile-only" /> Mais se connaissent-elles vraiment&nbsp;?
          </h2>
          <article className="why-uvibes-article">
            <p className="text-regular why-uvibes-text">
              Dans un <span className="kw kw-orange">collectif</span>, on partage les mêmes espaces, les mêmes objectifs.
              Pourtant, la plupart des gens qui se <span className="kw kw-rose">côtoient</span> chaque jour restent de parfaits <span className="kw kw-amber">inconnus</span>.
            </p>
            <p className="text-regular why-uvibes-text">
              <span className="kw kw-cyan">Uvibes</span> est une <span className="kw kw-cyan">app mobile</span> qui crée des{" "}
              <span className="kw kw-green">rencontres authentiques</span> au sein de votre équipe.
              Des <span className="kw kw-cyan">échanges vidéo</span> guidés de 6 à 20 minutes, autour de questions{" "}
              <span className="kw kw-green">positives</span> — pour que chaque personne devienne quelqu&apos;un que vous{" "}
              <span className="kw kw-rose">connaissez vraiment</span>.
            </p>
          </article>
        </div>
      </div>
      <video
        src={getVideoUrl("/videos/Isaline-desktop.mp4")}
        muted
        autoPlay
        loop
        playsInline
        width={300}
        className="why-uvibes-video"
      ></video>
    </section>
  );
}
