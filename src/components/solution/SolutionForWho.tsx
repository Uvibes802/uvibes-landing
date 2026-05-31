"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionForWho.css";

/* ——— Types ——— */
interface Benefit {
  title: string;
  desc: string;
}

interface CardData {
  badge: string;
  accent: string;
  glow: string;
  intro: string;
  stat: { value: string; desc: string; source: string };
  benefits: Benefit[];
}

/* ——— Données ——— */
const CARDS: CardData[] = [
  {
    badge: "Entreprises",
    accent: "var(--orange)",
    glow: "rgba(253,110,0,.14)",
    intro:
      "Stimule le bien-être individuel pour renforcer la performance collective.",
    stat: {
      value: "93 %",
      desc: "des salariés non engagés ou activement désengagés",
      source: "Gallup, 2025",
    },
    benefits: [
      {
        title: "Performance",
        desc: "Stimuler la réflexion et susciter l'adhésion collective.",
      },
      {
        title: "Lien d'appartenance",
        desc: "Renforcer le lien affectif entre l'entreprise et ses équipes.",
      },
      {
        title: "RSE",
        desc: "Satisfaire le besoin relationnel et alléger la gestion émotionnelle.",
      },
    ],
  },
  {
    badge: "Enseignement",
    accent: "var(--rose)",
    glow: "rgba(217,10,92,.14)",
    intro:
      "Améliore la sociabilité des apprenants et renforce le lien de la communauté.",
    stat: {
      value: "41 %",
      desc: "des étudiants présentent des symptômes dépressifs",
      source: "Université Bordeaux, 2024",
    },
    benefits: [
      {
        title: "Santé mentale",
        desc: "Échanges bienveillants, élimination du cyberharcèlement.",
      },
      {
        title: "Soft skills",
        desc: "Premier espace d'entraînement aux compétences interpersonnelles.",
      },
      {
        title: "Appartenance",
        desc: "Renforcer le lien alumni, initier des mentorats enrichissants.",
      },
    ],
  },
  {
    badge: "Collectifs",
    accent: "var(--blueUvibes)",
    glow: "rgba(0,175,221,.14)",
    intro:
      "Une nouvelle respiration pour les organisations du prendre soin.",
    stat: {
      value: "−38 %",
      desc: "de risque de démence grâce à une vie sociale active",
      source: "Rush University, 2025",
    },
    benefits: [
      {
        title: "Lien social",
        desc: "Rompre l'isolement et stimuler les capacités cognitives.",
      },
      {
        title: "Épanouissement",
        desc: "Renforcer la confiance en soi et en son entourage.",
      },
      {
        title: "Transmission",
        desc: "Créer des communautés d'entraide entre pairs.",
      },
    ],
  },
];

/* ——— Sous-composant Card ——— */
function ForWhoCard({ data }: { data: CardData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`sfw-card${hovered ? " sfw-card--hovered" : ""}`}
      style={
        {
          "--card-accent": data.accent,
          "--card-glow": data.glow,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow déco */}
      <div className="sfw-card__glow" aria-hidden="true" />

      {/* Badge */}
      <span className="sfw-card__badge v-mono">{data.badge}</span>

      {/* Intro */}
      <p className="sfw-card__intro">{data.intro}</p>

      {/* Séparateur + stat */}
      <div className="sfw-card__stat-block">
        <span className="sfw-card__stat-value v-prompt">{data.stat.value}</span>
        <p className="sfw-card__stat-desc">{data.stat.desc}</p>
        <p className="sfw-card__stat-source v-mono">{data.stat.source}</p>
      </div>

      {/* Bénéfices */}
      <ul className="sfw-card__benefits">
        {data.benefits.map((b) => (
          <li key={b.title} className="sfw-card__benefit-item">
            <span className="sfw-card__check-chip" aria-hidden="true">
              <Check size={13} strokeWidth={2.6} />
            </span>
            <span className="sfw-card__benefit-text">
              <strong className="v-prompt">{b.title}</strong>
              <span className="sfw-card__benefit-desc">{b.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ——— Composant principal ——— */
export default function SolutionForWho() {
  const [sectionRef, visible] = useIntersectionOnce<HTMLElement>({
    threshold: 0.08,
  });

  return (
    <section
      id="pour-qui"
      className={`sfw-section sol-reveal${visible ? " --in" : ""}`}
      ref={sectionRef}
    >
      {/* Header */}
      <header className="sfw-header">
        <div className="sfw-eyebrow">
          <span className="sfw-eyebrow__dot" aria-hidden="true" />
          <span className="v-mono sfw-eyebrow__label">Pour qui ?</span>
        </div>
        <h2 className="sfw-title v-prompt">
          Uvibes s&apos;adapte
          <br />à votre{" "}
          <span className="sfw-title__accent v-serif">contexte.</span>
        </h2>
        <p className="sfw-subtitle">
          Des résultats concrets, mesurés — quel que soit votre collectif.
        </p>
      </header>

      {/* Grille */}
      <div className="sfw-grid">
        {CARDS.map((card) => (
          <ForWhoCard key={card.badge} data={card} />
        ))}
      </div>
    </section>
  );
}
