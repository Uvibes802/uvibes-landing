"use client";

import { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Lightbulb,
  Calendar,
  Gamepad2,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionThemes.css";

/* ——— Types ——— */
interface ThemeCard {
  Icon: LucideIcon;
  title: string;
  desc: string;
  question: string;
  color: string;
  glow: string;
  iconBg: string;
}

/* ——— Données ——— */
const THEMES: ThemeCard[] = [
  {
    Icon: Sparkles,
    title: "Réflexions & loisirs",
    desc: "Aspirations individuelles, séries TV, modèles de réussite.",
    question: "Quel personnage de film t'inspire ?",
    color: "#FD6E00",
    glow: "rgba(253,110,0,.18)",
    iconBg: "linear-gradient(135deg, rgba(253,110,0,.18), rgba(255,150,60,.14))",
  },
  {
    Icon: GraduationCap,
    title: "Expertise & formation",
    desc: "Réflexions autour de sujets professionnels et pédagogiques.",
    question: "Comment vois-tu le management du futur ?",
    color: "#D90A5C",
    glow: "rgba(217,10,92,.16)",
    iconBg: "linear-gradient(135deg, rgba(217,10,92,.16), rgba(255,77,120,.12))",
  },
  {
    Icon: Lightbulb,
    title: "Astuces & bons plans",
    desc: "Partage d'expériences et conseils pratiques.",
    question: "Des recettes de saison à partager ?",
    color: "#F59E0B",
    glow: "rgba(245,158,11,.18)",
    iconBg: "linear-gradient(135deg, rgba(245,158,11,.18), rgba(253,200,60,.14))",
  },
  {
    Icon: Calendar,
    title: "Événements & actualités",
    desc: "Octobre rose, cultures locales, Tour de France.",
    question: "La tradition préférée de votre territoire ?",
    color: "#10B981",
    glow: "rgba(16,185,129,.16)",
    iconBg: "linear-gradient(135deg, rgba(16,185,129,.16), rgba(60,220,160,.12))",
  },
  {
    Icon: Gamepad2,
    title: "Jeux & mises en situation",
    desc: "Challenges en équipe et jeux de rôle.",
    question: "Trouvez 6 métiers commençant par M",
    color: "#6366F1",
    glow: "rgba(99,102,241,.16)",
    iconBg: "linear-gradient(135deg, rgba(99,102,241,.16), rgba(139,92,246,.12))",
  },
  {
    Icon: MessageSquare,
    title: "Débats",
    desc: "Mettre en commun différents points de vue.",
    question: "Bienfaits et limites du progrès",
    color: "#EC4899",
    glow: "rgba(236,72,153,.16)",
    iconBg: "linear-gradient(135deg, rgba(236,72,153,.16), rgba(249,115,180,.12))",
  },
];

/* ——— Sous-composant Card ——— */
function ThemeCard({ data }: { data: ThemeCard }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = data;

  return (
    <div
      className={`sth-card${hovered ? " sth-card--hovered" : ""}`}
      style={{
        "--sth-color": data.color,
        "--sth-glow": data.glow,
        "--sth-icon-bg": data.iconBg,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tuile icône */}
      <div className={`sth-card__icon-tile${hovered ? " sth-card__icon-tile--hovered" : ""}`} aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      {/* Titre */}
      <h3 className="sth-card__title v-prompt">{data.title}</h3>

      {/* Desc */}
      <p className="sth-card__desc">{data.desc}</p>

      {/* Question */}
      <p className="sth-card__question v-serif">
        «&nbsp;{data.question}&nbsp;»
      </p>
    </div>
  );
}

/* ——— Composant principal ——— */
export default function SolutionThemes() {
  const [sectionRef, visible] = useIntersectionOnce<HTMLElement>({
    threshold: 0.08,
  });

  return (
    <section
      id="themes"
      className={`sth-section sol-reveal${visible ? " --in" : ""}`}
      ref={sectionRef}
    >
      {/* Header */}
      <header className="sth-header">
        <div className="sth-eyebrow">
          <span className="sth-eyebrow__dot" aria-hidden="true" />
          <span className="v-mono sth-eyebrow__label">Thématiques</span>
        </div>
        <h2 className="sth-title v-prompt">
          6 univers de conversation
          <br />pour votre{" "}
          <span className="sth-title__accent v-serif">collectif.</span>
        </h2>
      </header>

      {/* Grille */}
      <div className="sth-grid">
        {THEMES.map((theme) => (
          <ThemeCard key={theme.title} data={theme} />
        ))}
      </div>
    </section>
  );
}
