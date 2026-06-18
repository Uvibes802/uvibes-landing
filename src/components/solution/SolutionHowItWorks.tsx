"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionHowItWorks.css";

interface Step {
  n: string;
  title: string;
  body: string;
  accent: string;
  video?: string;
  tilt?: "left" | "right";
  videoPos?: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Engager votre collectif",
    body: "Des expériences courtes et surprenantes, conçues pour encourager les échanges, faire circuler les bons plans et favoriser le partage d'expériences entre membres du collectif.",
    accent: "#FD6E00",
    video: "Isaline-desktop.mp4",
    tilt: "left",
    videoPos: "center 22%",
  },
  {
    n: "02",
    title: "Maîtriser l'expérience",
    body: "Vous définissez les thématiques, le moment et la durée des interactions afin de créer des échanges parfaitement adaptés à votre organisation et à vos objectifs.",
    accent: "#D90A5C",
  },
  {
    n: "03",
    title: "Comprendre votre collectif",
    body: "Interrogez votre communauté sur tous les sujets clés pour votre organisation et faites émerger une vision claire des besoins, attentes et ressentis du terrain.",
    accent: "#F0186F",
  },
  {
    n: "04",
    title: "Mesurer et piloter l'impact",
    body: "Accédez à un tableau de bord en temps réel pour suivre les usages, l'engagement et l'évolution de votre collectif, et piloter vos actions avec des données concrètes.",
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
            Processus
          </p>
          <h2 className="shiw-title v-prompt">
            Une méthode en 4 étapes<br />
            pour{" "}
            <span className="shiw-title-accent v-serif">activer et piloter votre collectif</span>
          </h2>
          <p className="shiw-subtitle">
            De l&apos;activation des échanges à la mesure des résultats&nbsp;: une méthode
            complète pour renforcer votre organisation.
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
