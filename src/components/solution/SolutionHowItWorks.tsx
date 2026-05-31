"use client";

import { Compass, Clock, Eye, BookOpen } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionHowItWorks.css";

/* ── Types ──────────────────────────────────────────────────────── */
interface Step {
  n: string;
  icon: React.ElementType;
  title: string;
  body: string;
  tag: string;
}

/* ── Données ────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    n: "01",
    icon: Compass,
    title: "Les thématiques de votre collectif",
    body: "Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées.",
    tag: "200+ sujets en bibliothèque",
  },
  {
    n: "02",
    icon: Clock,
    title: "Le moment et la durée des échanges",
    body: "Matin (7h–9h), pause déjeuner (12h–14h) ou après-midi (15h–17h). Chaque échange dure entre 6 et 20 minutes.",
    tag: "Pic d'engagement : après-midi",
  },
  {
    n: "03",
    icon: Eye,
    title: "Les sujets sur lesquels obtenir la vision de votre collectif",
    body: "Satisfaction et bien-être, perception des initiatives, idées d'amélioration, attentes non exprimées.",
    tag: "Tableaux de bord temps réel",
  },
  {
    n: "04",
    icon: BookOpen,
    title: "Les ressources explorées par votre collectif",
    body: "Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus.",
    tag: "Inclus dans tous les plans",
  },
];

/* ── Composant StepRow ──────────────────────────────────────────── */
function StepRow({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`shiw-step${visible ? " shiw-step--visible" : ""}`}
      style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
    >
      {/* Rail : trait + pastille */}
      <div className="shiw-rail">
        {!isLast && <div className="shiw-rail-line" aria-hidden="true" />}
        <div className="shiw-rail-dot" aria-label={`Étape ${step.n}`}>
          <Icon size={26} stroke="#fff" strokeWidth={1.8} />
        </div>
      </div>

      {/* Contenu */}
      <div className="shiw-content">
        {/* Filigrane numéro */}
        <span className="shiw-watermark v-prompt" aria-hidden="true">
          {step.n}
        </span>

        <div className="shiw-content-inner">
          <p className="shiw-step-label v-mono">Étape {step.n}</p>
          <h3 className="shiw-step-title v-prompt">{step.title}</h3>
          <p className="shiw-step-body">{step.body}</p>
          <div className="shiw-tag">
            <span className="shiw-tag-dot" aria-hidden="true" />
            <span className="shiw-tag-text v-mono">{step.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Composant principal ────────────────────────────────────────── */
export default function SolutionHowItWorks() {
  return (
    <section id="comment" className="shiw-section">
      <div className="shiw-inner">
        {/* Colonne gauche */}
        <div className="shiw-head">
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
          <p className="shiw-you-define v-mono">Vous définissez :</p>
        </div>

        {/* Colonne droite — 4 étapes */}
        <div className="shiw-steps">
          {STEPS.map((step, i) => (
            <StepRow
              key={step.n}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
