"use client";

import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import OffreEvenementielle from "./OffreEvenementielle";

import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";

// Ordre : Connection, Boost (populaire, au centre), Premium. Les 3 CTA mènent au devis.
const PLAN_META = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Faire un devis",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Le plus populaire",
    inherit: "vibes premium",
    cta: "Faire un devis",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Faire un devis",
  },
];

/* Fonctionnalités « nouvelles » vs le plan hérité (Connection) — pour la mise en avant */
const FRESH: Record<number, (i: number) => boolean> = {
  0: () => true,                    // Connection — base, tout est "frais"
  1: (i) => i >= 7,                 // Boost — hérite de Premium (0-6), ajoute 7 à 10
  2: (i) => i >= 4 && i < 7,        // Premium — hérite de Connection (0-3), ajoute 4 à 6
};

export default function PricingTable() {
  // Prix de référence : statiques (tableau validé par la tutrice), cf. PricingData.ts
  const mergedPlans = plans;

  return (
    <section
      className="pt-section"
      id="offres"
      style={{ scrollMarginTop: 70 }}
    >
      {/* Fond — ondes de vibration animées (motif uvibes), derrière les cartes */}
      <div className="pt-waves" aria-hidden="true">
        <GradientVibrationLine id="pt-w1" width={1800} height={70} amplitude={32} freq={5} strokeWidth={24} speed={10} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="pt-w2" width={1800} height={70} amplitude={26} freq={7} strokeWidth={16} speed={14} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="pt-w3" width={1800} height={70} amplitude={36} freq={4} strokeWidth={20} speed={12} colorFrom="#E6007E" colorTo="#FD6E00" style={{ width: "100%" }} />
      </div>

      {/* Mêmes cartes premium sur tous les écrans (empilées en mobile) */}
      <div className="pt-desktop-only">
        {/* Header */}
        <div className="pt-head">
          <span className="pt-eyebrow v-mono">
            <span className="pt-eyebrow-dot" aria-hidden="true" />
            Tarification
          </span>
          <h2 className="pt-title v-prompt">
            Nos offres{" "}
            <span className="pt-title-serif v-serif">Vibes.</span>
          </h2>
          <p className="pt-subtitle">
            Choisissez le plan adapté à votre collectif.
          </p>
        </div>

        {/* Grille 3 cards */}
        <div className="pt-grid">
          {mergedPlans.map((plan, pi) => {
            const meta = PLAN_META[pi];
            const f = meta.featured;
            const freshFn = FRESH[pi];

            return (
              <div
                key={plan.name}
                className={`pt-card${f ? " pt-card--featured" : ""}`}
                style={{ "--pt-accent": meta.accent } as React.CSSProperties}
              >
                {/* Liseré haut featured */}
                {f && <div className="pt-card-stripe" aria-hidden="true" />}
                {/* Glow déco featured */}
                {f && <div className="pt-card-glow" aria-hidden="true" />}

                {/* Header card */}
                <div className="pt-card-top">
                  <span className="pt-card-square" aria-hidden="true" />
                  {meta.badge && (
                    <span className={`pt-card-badge v-mono${f ? " --featured" : ""}`}>
                      {meta.badge}
                    </span>
                  )}
                </div>

                <h3 className="pt-card-name v-prompt">{plan.name}</h3>
                <p className="pt-card-desc">{plan.description}</p>

                {/* Prix */}
                <div className="pt-card-price">
                  <span className="pt-card-price-value v-prompt">{plan.price}</span>
                  <span className="v-mono pt-card-price-note">HT / an · indicatif jusqu&apos;à 1 000 utilisateurs</span>
                </div>

                {/* CTA — les 3 offres mènent au devis */}
                <div className="pt-card-cta-wrap">
                  <Link href="/devis" className="pt-card-cta">
                    {meta.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Label héritage */}
                <div className={`pt-card-inherit-label v-mono${f ? " --featured" : ""}`}>
                  {meta.inherit ? `Tout ${meta.inherit} :` : "Ce qui est inclus"}
                </div>

                {/* Liste features */}
                <ul className="pt-card-list">
                  {features.map((feat, fi) => {
                    const included = plan.values[fi] ?? false;
                    const fresh = meta.inherit ? freshFn(fi) : included;
                    return (
                      <li
                        key={fi}
                        className={`pt-card-feat${!included ? " --off" : ""}${fresh && included ? " --fresh" : ""}`}
                      >
                        <span className="pt-card-feat-icon">
                          {included
                            ? <Check size={15} strokeWidth={2.6} />
                            : <X size={15} strokeWidth={1.8} />
                          }
                        </span>
                        <span>{feat.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4ème offre — événementielle, présentée dans la même section que les 3 offres annuelles */}
      <OffreEvenementielle />
    </section>
  );
}
