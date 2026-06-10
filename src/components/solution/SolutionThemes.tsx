"use client";

import { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Lightbulb,
  Globe,
  Gamepad2,
  Flame,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/solution/solutionThemes.css";

interface Theme {
  Icon: LucideIcon;
  title: string;
  desc: string;
  q1: string;
  q2: string;
  label: string;
  color: string;
}

const THEMES: Theme[] = [
  {
    Icon: Sparkles,
    title: "Réflexions & loisirs",
    desc: "Discussions autour des passions, inspirations et moments de vie.",
    q1: "Quel personnage de film t'inspire ?",
    q2: "Quel hobby aimerais-tu commencer ?",
    label: "Conversation ouverte",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Expertise & formation",
    desc: "Partager des idées, apprendre et réfléchir ensemble.",
    q1: "Comment vois-tu le management du futur ?",
    q2: "Quelle compétence deviendra essentielle ?",
    label: "Discussion & réflexion",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Astuces & bons plans",
    desc: "Conseils pratiques et idées utiles du quotidien.",
    q1: "Des recettes de saison à partager ?",
    q2: "Une habitude qui te fait gagner du temps ?",
    label: "Partage d'expériences",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Événements & actualités",
    desc: "Échanger autour des tendances, cultures et événements.",
    q1: "La tradition préférée de votre territoire ?",
    q2: "Un événement qui t'a marqué récemment ?",
    label: "Échanges spontanés",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Jeux & mises en situation",
    desc: "Créer des interactions fun et dynamiques.",
    q1: "Trouvez 6 métiers commençant par M",
    q2: "Quelle équipe survivrait sur une île déserte ?",
    label: "Moments ludiques",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Débats",
    desc: "Confronter les points de vue avec intelligence.",
    q1: "Bienfaits et limites du progrès",
    q2: "Le télétravail est-il l'avenir ?",
    label: "Opinions & perspectives",
    color: "#FFB800",
  },
];

// Légère rotation + décalage par carte pour l'effet "paquet" empilé
const ROT = [-2.4, 1.6, -1.4, 2, -1.8, 1.2];
const OFFX = [-7, 6, -5, 7, -6, 5];

export default function SolutionThemes() {
  // Une seule carte ouverte à la fois — null = tas fermé, tous les titres visibles
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive((prev) => (prev === i ? null : i));

  return (
    <section id="themes" className="sth-section">
      {/* Fond — ondes de vibration épaisses (motif uvibes), derrière les cartes */}
      <div className="sth-waves" aria-hidden="true">
        <GradientVibrationLine id="sth-w1" width={1800} height={70} amplitude={32} freq={5} strokeWidth={24} speed={9} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w2" width={1800} height={70} amplitude={26} freq={7} strokeWidth={16} speed={13} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w3" width={1800} height={70} amplitude={36} freq={4} strokeWidth={20} speed={11} colorFrom="#E6007E" colorTo="#FD6E00" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w4" width={1800} height={70} amplitude={24} freq={6} strokeWidth={14} speed={15} colorFrom="#D90A5C" colorTo="#00AFDD" style={{ width: "100%" }} />
      </div>

      <div className="sth-header">
        <div className="sth-eyebrow-wrap">
          <span className="sth-eyebrow-dot" aria-hidden="true" />
          <span className="sth-eyebrow-text">Thématiques</span>
        </div>
        <h2 className="sth-heading">
          <span className="sth-heading-main">6 univers de conversation<br />pour votre{" "}</span>
          <span className="sth-heading-sub v-serif">collectif.</span>
        </h2>
      </div>

      <div className="sth-deck">
        {THEMES.map((theme, i) => {
          const { Icon } = theme;
          const open = active === i;
          return (
            <div
              key={theme.title}
              className={`sth-card${open ? " sth-card--open" : ""}`}
              style={{
                "--accent": theme.color,
                "--rot": `${ROT[i]}deg`,
                "--tx": `${OFFX[i]}px`,
                zIndex: open ? 50 : i + 1,
              } as React.CSSProperties}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <div className="sth-card-header">
                <span className="sth-card-icon" aria-hidden="true">
                  <Icon size={23} strokeWidth={1.9} />
                </span>
                <h3 className="sth-card-title">{theme.title}</h3>
                <span className="sth-card-plus" aria-hidden="true" />
              </div>

              <div className="sth-card-reveal">
                <div className="sth-card-reveal-inner">
                  <p className="sth-card-desc">{theme.desc}</p>
                  <ul className="sth-card-questions">
                    <li><span className="sth-card-qdot" aria-hidden="true" />{theme.q1}</li>
                    <li><span className="sth-card-qdot" aria-hidden="true" />{theme.q2}</li>
                  </ul>
                  <span className="sth-card-label">{theme.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
