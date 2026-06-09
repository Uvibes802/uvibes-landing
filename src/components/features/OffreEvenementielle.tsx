"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/features/offreEvenementielle.css";

const INCLUSIONS = [
  {
    num: "01",
    icon: "⚡",
    label: "Jusqu'à 500 vibes",
    detail: "Expériences interactives pour mobiliser votre collectif",
  },
  {
    num: "02",
    icon: "🎯",
    label: "1 session thématique",
    detail: "Sur le sujet de votre choix, personnalisée pour votre public",
  },
  {
    num: "03",
    icon: "📊",
    label: "3 campagnes de sondages",
    detail: "3 sondages personnalisés chacune — recueillez ce qui compte",
  },
  {
    num: "04",
    icon: "🗺️",
    label: "1 infographie clé en main",
    detail: "Toutes les informations nécessaires pour faciliter l'inscription de vos membres",
  },
  {
    num: "BONUS",
    icon: "📈",
    label: "2 indicateurs d'usage",
    detail: "Pour suivre l'engagement et l'activité de votre communauté",
  },
];

export default function OffreEvenementielle() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });
  const [open, setOpen] = useState(false);

  return (
    <section
      className={`oe-section oe-compact${vis ? " oe-vis" : ""}${open ? " oe-open" : ""}`}
      ref={ref}
      id="offre-evenementielle"
    >
      {/* Fond déco */}
      <div className="oe-bg-stripe" aria-hidden="true" />

      <div className="oe-inner">
        {/* Barre compacte cliquable — flèche sur le côté */}
        <button className="oe-bar" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span className="oe-eyebrow-pill">Offre événementielle</span>
          <span className="oe-bar-title v-prompt">
            30 jours d&apos;expérience <span className="oe-title-accent v-serif">Uvibes</span>
          </span>
          <span className="oe-bar-arrow" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </button>

        {/* Contenu repliable */}
        <div className="oe-reveal">
          <div className="oe-reveal-inner">
        <p className="oe-subtitle">
          Faites découvrir Uvibes à votre organisation pendant un mois complet
          et mobilisez votre collectif autour d&apos;échanges simples et engageants.
        </p>

        {/* Contenu de l'offre — kit visuel */}
        <div className="oe-kit">
          <div className="oe-kit-header">
            <span className="oe-kit-label">Ce que vous recevez</span>
            <div className="oe-kit-line" aria-hidden="true" />
          </div>

          <div className="oe-items">
            {INCLUSIONS.map((item, i) => (
              <div
                key={item.num}
                className={`oe-item${item.num === "BONUS" ? " oe-item--bonus" : ""}`}
                style={{ "--oe-i": i } as React.CSSProperties}
              >
                <div className="oe-item-num">{item.num}</div>
                <div className="oe-item-icon" aria-hidden="true">{item.icon}</div>
                <div className="oe-item-body">
                  <p className="oe-item-label">{item.label}</p>
                  <p className="oe-item-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="oe-cta-block">
          <p className="oe-cta-note">
            Vous avez des besoins spécifiques ou êtes une structure de moins de 250 personnes&nbsp;?
            <strong> Parlons-en ensemble.</strong>
          </p>
          <div className="oe-ctas">
            <Link href="/rendez-vous" className="btn-brand oe-cta-primary">
              Prendre rendez-vous →
            </Link>
            <Link href="/#contact" className="oe-cta-ghost">
              Nous contacter
            </Link>
          </div>
        </div>
          </div>{/* oe-reveal-inner */}
        </div>{/* oe-reveal */}
      </div>
    </section>
  );
}
