"use client";

import Image from "next/image";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionHowItWorks.css";

interface Step {
  n: string;
  title: string;
  body: string;
  accent: string;
  video?: string;
  image?: string;
  tilt?: "left" | "right";
  videoPos?: string;
}

const STEPS_FR: Step[] = [
  {
    n: "01",
    title: "Engager votre collectif",
    body: "Des expériences courtes et surprenantes, conçues pour encourager les échanges, faire circuler les bons plans et favoriser le partage d'expériences entre membres du collectif.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Maîtriser l'expérience",
    body: "Vous définissez les thématiques, le moment et la durée des interactions afin de créer des échanges parfaitement adaptés à votre organisation et à vos objectifs.",
    accent: "#00AFDD",
  },
  {
    n: "03",
    title: "Comprendre votre collectif",
    body: "Interrogez votre communauté sur tous les sujets clés pour votre organisation et faites émerger une vision claire des besoins, attentes et ressentis du terrain.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Mesurer et piloter l'impact",
    body: "Accédez à un tableau de bord en temps réel pour suivre les usages, l'engagement et l'évolution de votre collectif, et piloter vos actions avec des données concrètes.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_EN: Step[] = [
  {
    n: "01",
    title: "Engage your community",
    body: "Short, surprising experiences designed to spark exchanges, pass on good tips and encourage members to share what they know.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Shape the experience",
    body: "You set the topics, timing and length of each interaction to create exchanges perfectly suited to your organization and your goals.",
    accent: "#00AFDD",
  },
  {
    n: "03",
    title: "Understand your community",
    body: "Ask your community about every topic that matters to your organization, and get a clear picture of needs, expectations and feelings on the ground.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Measure and steer the impact",
    body: "Access a real-time dashboard to track usage, engagement and how your community evolves — and steer your actions with real data.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
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
function PolaroidVideo({ step, locale = "fr" }: { step: Step; locale?: "fr" | "en" }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`shiw-polaroid shiw-polaroid--${step.tilt}${visible ? " shiw-polaroid--visible" : ""}`}
    >
      <div className={`shiw-polaroid-media${step.image ? " shiw-polaroid-media--img" : ""}`}>
        {step.image ? (
          <Image
            className="shiw-polaroid-img"
            src={step.image}
            alt={locale === "en" ? "Uvibes dashboard — real-time tracking" : "Tableau de bord Uvibes — suivi en temps réel"}
            width={900}
            height={560}
          />
        ) : (
          <video
            className="shiw-polaroid-video"
            src={getVideoUrl(step.video!)}
            style={step.videoPos ? { objectPosition: step.videoPos } : undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>
    </div>
  );
}

export default function SolutionHowItWorks({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const STEPS = locale === "en" ? STEPS_EN : STEPS_FR;
  return (
    <section id="comment" className="shiw-section">
      <div className="shiw-xblob shiw-xblob--1" aria-hidden="true" />
      <div className="shiw-xblob shiw-xblob--2" aria-hidden="true" />
      <div className="shiw-inner">

        <header className="shiw-head">
          <p className="shiw-eyebrow v-mono">
            <span className="shiw-eyebrow-dot" aria-hidden="true" />
            {locale === "en" ? "Process" : "Processus"}
          </p>
          <h2 className="shiw-title v-prompt">
            {locale === "en" ? (
              <>A method in 4 steps<br />to{" "}<span className="shiw-title-accent v-serif">activate and steer your community</span></>
            ) : (
              <>Une méthode en 4 étapes<br />pour{" "}<span className="shiw-title-accent v-serif">activer et piloter votre collectif</span></>
            )}
          </h2>
          <p className="shiw-subtitle">
            {locale === "en"
              ? "From sparking exchanges to measuring results: a complete method to strengthen your organization."
              : <>De l&apos;activation des échanges à la mesure des résultats&nbsp;: une méthode complète pour renforcer votre organisation.</>}
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
                    : (step.video || step.image) && <PolaroidVideo step={step} locale={locale} />}
                </div>

                {/* Cercle numéroté — toujours au centre */}
                <div className="shiw-hstep-dot">
                  <span className="shiw-hstep-num">{step.n}</span>
                </div>

                {/* Slot bas : contenu (02,04) — sinon vidéo polaroïd si définie (01) */}
                <div className={`shiw-hstep-bottom${isTop ? " shiw-hstep-slot--empty" : ""}`}>
                  {!isTop
                    ? <StepContent step={step} index={i} />
                    : (step.video || step.image) && <PolaroidVideo step={step} locale={locale} />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
