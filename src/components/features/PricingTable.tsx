"use client";

import usePricing from "@/services/pricing/usePricing";
import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";

import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";
import PricingMobile from "./PricingMobile";

const PLAN_META = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Démarrer",
    ctaType: "calendly" as const,
  },
  {
    accent: "#FFE456",
    featured: true,
    badge: "Le plus populaire",
    inherit: "Connection",
    cta: "Faire un devis",
    ctaType: "devis" as const,
  },
  {
    accent: "var(--rose)",
    featured: false,
    badge: "Tout inclus",
    inherit: "Premium",
    cta: "Contacter l&apos;équipe",
    ctaType: "contact" as const,
  },
];

/* Fresh features per plan (newly added vs inherited) */
const FRESH: Record<number, (i: number) => boolean> = {
  0: () => true,                    // Connection — all its features are "fresh"
  1: (i) => i >= 4 && i < 6,       // Premium — features 4-5 are new
  2: (i) => i >= 6,                 // Boost — features 6-10 are new
};

export default function PricingTable() {
  const pricingData = usePricing();
  const [rdvSysteme, setRdvSysteme] = useState<"custom" | "calendly">("custom");
   
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/uvibescommunication/30min");

  const mergedPlans = plans.map((plan) => {
    const dynamicPrice = pricingData.find(
      (p) => p.planName === plan.name.toUpperCase()
    )?.price;
    return { ...plan, price: dynamicPrice || "Sur devis" };
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (s["rdv-systeme"]) setRdvSysteme(s["rdv-systeme"] as "custom" | "calendly");
        if (s["rdv-calendly-url"]) setCalendlyUrl(s["rdv-calendly-url"]);
      })
      .catch(() => {});
  }, []);

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

      {/* Mobile — composant existant */}
      <div className="pt-mobile-only">
        <PricingMobile />
      </div>

      {/* Desktop — 3 cards redesign */}
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
            Tous les plans incluent les expériences interactives.
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
                  <span className="v-mono pt-card-price-note">· adapté à votre taille</span>
                </div>

                {/* CTA */}
                <div className="pt-card-cta-wrap">
                  {meta.ctaType === "devis" ? (
                    <Link href="/devis" className="pt-card-cta">
                      {meta.cta}
                      <ArrowRight size={16} />
                    </Link>
                  ) : meta.ctaType === "calendly" ? (
                    rdvSysteme === "calendly" ? (
                      <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="pt-card-cta">
                        {meta.cta}
                        <ArrowRight size={16} />
                      </a>
                    ) : (
                      <Link href="/rdv" className="pt-card-cta">
                        {meta.cta}
                        <ArrowRight size={16} />
                      </Link>
                    )
                  ) : (
                    <Link href="/#contact" className="pt-card-cta">
                      Contacter l&apos;équipe
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>

                {/* Label héritage */}
                <div className={`pt-card-inherit-label v-mono${f ? " --featured" : ""}`}>
                  {meta.inherit ? `Tout ${meta.inherit}, et :` : "Ce qui est inclus"}
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
    </section>
  );
}
