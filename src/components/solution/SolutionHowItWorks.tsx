"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionHowItWorks.css";

interface Step {
  n: string;
  title: string;
  body: string;
  tag: string;
  accent: string;
  video?: string;
  tilt?: "left" | "right";
  videoPos?: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Les thématiques de votre collectif",
    body: "Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées.",
    tag: "200+ sujets en bibliothèque",
    accent: "#FD6E00",
    video: "Isaline-desktop.mp4",
    tilt: "left",
    videoPos: "center 22%",
  },
  {
    n: "02",
    title: "Le moment et la durée des échanges",
    body: "Matin (7h–9h), pause déjeuner (12h–14h) ou après-midi (15h–17h). Chaque échange dure entre 6 et 20 minutes.",
    tag: "Pic d'engagement : après-midi",
    accent: "#D90A5C",
  },
  {
    n: "03",
    title: "Les sujets sur lesquels obtenir la vision de votre collectif",
    body: "Satisfaction et bien-être, perception des initiatives, idées d'amélioration, attentes non exprimées.",
    tag: "Tableaux de bord temps réel",
    accent: "#F0186F",
  },
  {
    n: "04",
    title: "Les ressources explorées par votre collectif",
    body: "Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus.",
    tag: "Inclus dans tous les plans",
    accent: "#E6007E",
    video: "Colette-desktop.mp4",
    tilt: "right",
  },
];

function StepContent({ step, index }: { step: Step; index: number }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`shiw-step-content${visible ? " shiw-step-content--visible" : ""}`}
      style={{ "--step-color": step.accent, "--step-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      <h3 className="shiw-step-title">{step.title}</h3>
      <p className="shiw-step-body">{step.body}</p>
      <span className="shiw-step-tag">
        <span className="shiw-step-tag-dot" aria-hidden="true" />
        {step.tag}
      </span>
    </div>
  );
}

/* Vignette vidéo style polaroïd — légèrement inclinée, fondu au scroll */
function PolaroidVideo({ step }: { step: Step }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`shiw-polaroid shiw-polaroid--${step.tilt}${visible ? " shiw-polaroid--visible" : ""}`}
    >
      <div className="shiw-polaroid-media">
        <video
          className="shiw-polaroid-video"
          src={getVideoUrl(step.video!)}
          style={step.videoPos ? { objectPosition: step.videoPos } : undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  );
}

export default function SolutionHowItWorks() {
  return (
    <section id="comment" className="shiw-section">
      <div className="shiw-xblob shiw-xblob--1" aria-hidden="true" />
      <div className="shiw-xblob shiw-xblob--2" aria-hidden="true" />
      <div className="shiw-inner">

        <header className="shiw-head">
          <p className="shiw-eyebrow v-mono">
            <span className="shiw-eyebrow-dot" aria-hidden="true" />
            Configuration
          </p>
          <h2 className="shiw-title v-prompt">
            Comment ça marche<br />
            pour votre{" "}
            <span className="shiw-title-accent v-serif">organisation ?</span>
          </h2>
          <p className="shiw-subtitle">
            Vous gardez le contrôle. Nous fournissons la plateforme, vous définissez le contenu.
          </p>
        </header>

        <div className="shiw-roadmap">
          {STEPS.map((step, i) => {
            const isTop = i % 2 === 0;
            return (
              <div
                key={step.n}
                className="shiw-hstep"
                style={{ "--step-color": step.accent } as React.CSSProperties}
              >
                {/* Slot haut : contenu (01,03) — sinon vidéo polaroïd si définie (04) */}
                <div className={`shiw-hstep-top${!isTop ? " shiw-hstep-slot--empty" : ""}`}>
                  {isTop
                    ? <StepContent step={step} index={i} />
                    : step.video && <PolaroidVideo step={step} />}
                </div>

                {/* Cercle numéroté — toujours au centre */}
                <div className="shiw-hstep-dot">
                  <span className="shiw-hstep-num">{step.n}</span>
                </div>

                {/* Slot bas : contenu (02,04) — sinon vidéo polaroïd si définie (01) */}
                <div className={`shiw-hstep-bottom${isTop ? " shiw-hstep-slot--empty" : ""}`}>
                  {!isTop
                    ? <StepContent step={step} index={i} />
                    : step.video && <PolaroidVideo step={step} />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
