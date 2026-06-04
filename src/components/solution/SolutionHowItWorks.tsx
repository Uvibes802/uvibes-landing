"use client";

import { Compass, Clock, Eye, BookOpen } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionHowItWorks.css";

interface Step {
  n: string;
  icon: React.ElementType;
  title: string;
  body: string;
  tag: string;
  accent: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: Compass,
    title: "Les thématiques de votre collectif",
    body: "Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées.",
    tag: "200+ sujets en bibliothèque",
    accent: "#FD6E00",
  },
  {
    n: "02",
    icon: Clock,
    title: "Le moment et la durée des échanges",
    body: "Matin (7h–9h), pause déjeuner (12h–14h) ou après-midi (15h–17h). Chaque échange dure entre 6 et 20 minutes.",
    tag: "Pic d'engagement : après-midi",
    accent: "#D90A5C",
  },
  {
    n: "03",
    icon: Eye,
    title: "Les sujets sur lesquels obtenir la vision de votre collectif",
    body: "Satisfaction et bien-être, perception des initiatives, idées d'amélioration, attentes non exprimées.",
    tag: "Tableaux de bord temps réel",
    accent: "#FF6B35",
  },
  {
    n: "04",
    icon: BookOpen,
    title: "Les ressources explorées par votre collectif",
    body: "Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus.",
    tag: "Inclus dans tous les plans",
    accent: "#FF3D78",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`shiw-card${visible ? " shiw-card--vis" : ""}`}
      style={{
        "--delay": `${index * 80}ms`,
        "--card-accent": step.accent,
      } as React.CSSProperties}
    >
      <div className="shiw-card-top">
        <div className="shiw-card-icon">
          <Icon size={26} stroke="#fff" strokeWidth={1.8} />
        </div>
        <span className="shiw-card-watermark v-prompt" aria-hidden="true">{step.n}</span>
      </div>
      <h3 className="shiw-card-title v-prompt">{step.title}</h3>
      <p className="shiw-card-body">{step.body}</p>
      <div className="shiw-tag">
        <span className="shiw-tag-dot" aria-hidden="true" />
        <span className="shiw-tag-text v-mono">{step.tag}</span>
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

        <div className="shiw-grid">
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
