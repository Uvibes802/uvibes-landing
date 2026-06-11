"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/features/offreEvenementielle.css";

const INCLUSIONS = [
  { label: "Jusqu'à 500 vibes", detail: "expériences interactives pour mobiliser votre collectif" },
  { label: "1 session thématique", detail: "sur le sujet de votre choix, personnalisée pour votre public" },
  { label: "3 campagnes de sondages", detail: "3 sondages personnalisés chacune, pour recueillir ce qui compte" },
  { label: "1 infographie clé en main", detail: "tout ce qu'il faut pour faciliter l'inscription de vos membres" },
  { label: "2 indicateurs d'usage", detail: "pour suivre l'engagement de votre communauté", bonus: true },
];

export default function OffreEvenementielle() {
  const [ref, vis] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.08 });
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`oe-section oe-compact${vis ? " oe-vis" : ""}${open ? " oe-open" : ""}`}
      ref={ref}
      id="offre-evenementielle"
    >
      {/* Fond déco */}
      <div className="oe-bg-stripe" aria-hidden="true" />

      <div className="oe-inner">
        {/* Barre compacte cliquable — le prix accroche dès l'état replié */}
        <button className="oe-bar" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span className="oe-eyebrow-pill">Offre découverte · 30 jours</span>
          <span className="oe-bar-title v-prompt">
            Faites vivre Uvibes à votre collectif{" "}
            <span className="oe-title-accent v-serif">dès 480 €/mois</span>
          </span>
          <span className="oe-bar-arrow" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </button>

        {/* Contenu repliable */}
        <div className="oe-reveal">
          <div className="oe-reveal-inner">
            <p className="oe-subtitle">
              Le moyen le plus simple de tester Uvibes&nbsp;: un mois complet pour mobiliser
              votre collectif et mesurer l&apos;impact, avant tout engagement annuel.
            </p>

            {/* Prix */}
            <div className="oe-price">
              <span className="oe-price-value v-prompt">480&nbsp;€</span>
              <span className="oe-price-unit">/ mois</span>
              <span className="oe-price-note">sans engagement annuel</span>
            </div>

            {/* Ce qui est inclus — points simples */}
            <ul className="oe-points">
              {INCLUSIONS.map((item) => (
                <li key={item.label} className={`oe-point${item.bonus ? " oe-point--bonus" : ""}`}>
                  <span className="oe-point-check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.8} />
                  </span>
                  <span className="oe-point-text">
                    <strong>{item.label}</strong>
                    {item.bonus && <span className="oe-point-bonus-tag">bonus</span>}
                    <span className="oe-point-detail"> — {item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="oe-cta-block">
              <p className="oe-cta-note">
                Besoin d&apos;un format sur mesure ou structure de moins de 250 personnes&nbsp;?
                <strong> Parlons-en.</strong>
              </p>
              <div className="oe-ctas">
                <Link href="/devis" className="btn-brand oe-cta-primary">
                  Faire un devis →
                </Link>
                <Link href="/#contact" className="oe-cta-ghost">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>{/* oe-reveal-inner */}
        </div>{/* oe-reveal */}
      </div>
    </div>
  );
}
