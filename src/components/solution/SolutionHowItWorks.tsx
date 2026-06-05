"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionHowItWorks.css";

const STEPS = [
  {
    n: "01",
    title: "Les thématiques de votre collectif",
    body: "Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées.",
    tag: "200+ sujets en bibliothèque",
    accent: "#FD6E00",
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
    accent: "#FF6B35",
  },
  {
    n: "04",
    title: "Les ressources explorées par votre collectif",
    body: "Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus.",
    tag: "Inclus dans tous les plans",
    accent: "#E6007E",
  },
];

function ZigStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.15 });
  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`shiw-step${visible ? " shiw-step--visible" : ""}${isRight ? " shiw-step--right" : ""}`}
      style={{ "--step-color": step.accent, "--step-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      {/* Numéro */}
      <div className="shiw-step-num">
        <span className="shiw-step-num-text">{step.n}</span>
        <span className="shiw-step-num-line" aria-hidden="true" />
      </div>

      {/* Texte */}
      <div className="shiw-step-content">
        <h3 className="shiw-step-title">{step.title}</h3>
        <p className="shiw-step-body">{step.body}</p>
        <span className="shiw-step-tag">
          <span className="shiw-step-tag-dot" aria-hidden="true" />
          {step.tag}
        </span>
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
          {STEPS.map((step, i) => (
            <ZigStep key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
