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
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionThemes.css";

interface Theme {
  Icon: LucideIcon;
  title: string;
  desc: string;
  q1: string;
  q2: string;
  label: string;
  color: string;
  cardGradient: string;
  iconBg: string;
}

const THEMES: Theme[] = [
  {
    Icon: Sparkles,
    title: "Réflexions & loisirs",
    desc: "Discussions autour des passions, inspirations et moments de vie.",
    q1: "Quel personnage de film t'inspire ?",
    q2: "Quel hobby aimerais-tu commencer ?",
    label: "Conversation ouverte",
    color: "#00AFDD",
    cardGradient: "linear-gradient(145deg, rgba(0,175,221,.07) 0%, rgba(0,175,221,.02) 100%)",
    iconBg: "rgba(0,175,221,.1)",
  },
  {
    Icon: GraduationCap,
    title: "Expertise & formation",
    desc: "Partager des idées, apprendre et réfléchir ensemble.",
    q1: "Comment vois-tu le management du futur ?",
    q2: "Quelle compétence deviendra essentielle ?",
    label: "Discussion & réflexion",
    color: "#FD6E00",
    cardGradient: "linear-gradient(145deg, rgba(253,110,0,.07) 0%, rgba(253,110,0,.02) 100%)",
    iconBg: "rgba(253,110,0,.1)",
  },
  {
    Icon: Lightbulb,
    title: "Astuces & bons plans",
    desc: "Conseils pratiques et idées utiles du quotidien.",
    q1: "Des recettes de saison à partager ?",
    q2: "Une habitude qui te fait gagner du temps ?",
    label: "Partage d'expériences",
    color: "#10B981",
    cardGradient: "linear-gradient(145deg, rgba(16,185,129,.07) 0%, rgba(16,185,129,.02) 100%)",
    iconBg: "rgba(16,185,129,.1)",
  },
  {
    Icon: Globe,
    title: "Événements & actualités",
    desc: "Échanger autour des tendances, cultures et événements.",
    q1: "La tradition préférée de votre territoire ?",
    q2: "Un événement qui t'a marqué récemment ?",
    label: "Échanges spontanés",
    color: "#FFB800",
    cardGradient: "linear-gradient(145deg, rgba(255,184,0,.07) 0%, rgba(255,184,0,.02) 100%)",
    iconBg: "rgba(255,184,0,.1)",
  },
  {
    Icon: Gamepad2,
    title: "Jeux & mises en situation",
    desc: "Créer des interactions fun et dynamiques.",
    q1: "Trouvez 6 métiers commençant par M",
    q2: "Quelle équipe survivrait sur une île déserte ?",
    label: "Moments ludiques",
    color: "#D90A5C",
    cardGradient: "linear-gradient(145deg, rgba(217,10,92,.06) 0%, rgba(217,10,92,.02) 100%)",
    iconBg: "rgba(217,10,92,.09)",
  },
  {
    Icon: Flame,
    title: "Débats",
    desc: "Confronter les points de vue avec intelligence.",
    q1: "Bienfaits et limites du progrès",
    q2: "Le télétravail est-il l'avenir ?",
    label: "Opinions & perspectives",
    color: "#E6007E",
    cardGradient: "linear-gradient(145deg, rgba(230,0,126,.06) 0%, rgba(230,0,126,.02) 100%)",
    iconBg: "rgba(230,0,126,.09)",
  },
];

function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  const { Icon } = theme;

  return (
    <div
      ref={ref}
      className={`sth-card${visible ? " sth-card--visible" : ""}${hovered ? " sth-card--hovered" : ""}`}
      style={{ "--sth-color": theme.color, "--sth-icon-bg": theme.iconBg, "--sth-delay": `${index * 60}ms` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Barre accent */}
      <div className="sth-card-top-bar" aria-hidden="true" />

      {/* Icône + Titre */}
      <div className="sth-card-head">
        <div className={`sth-icon${hovered ? " sth-icon--hovered" : ""}`} aria-hidden="true">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <h3 className="sth-card-title">{theme.title}</h3>
      </div>

      {/* Corps */}
      <div className="sth-card-body">
        <p className="sth-card-desc">{theme.desc}</p>
        <ul className="sth-questions">
          <li className="sth-question"><span className="sth-q-dot" aria-hidden="true" />{theme.q1}</li>
          <li className="sth-question"><span className="sth-q-dot" aria-hidden="true" />{theme.q2}</li>
        </ul>
        <span className="sth-label">{theme.label}</span>
      </div>
    </div>
  );
}

export default function SolutionThemes() {
  return (
    <section id="themes" className="sth-section">
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

      <div className="sth-grid">
        {THEMES.map((theme, i) => (
          <ThemeCard key={theme.title} theme={theme} index={i} />
        ))}
      </div>
    </section>
  );
}
