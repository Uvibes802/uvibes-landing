"use client";

import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { useDevisStatus } from "@/hooks/useDevisStatus";
import OffreEvenementielle from "./OffreEvenementielle";

import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";
import { featuresEn, plansEn } from "./PricingDataEn";

interface PlanTierApi { label: string; min: number; max: number | null; prixAnnuel: number; }
interface PlanApi { slug: string; tiers: PlanTierApi[]; }

// PricingData n'a pas de slug — on le déduit du nom pour relier aux tranches en base.
const SLUG_BY_NAME: Record<string, string> = {
  "VIBES CONNECTION": "vibes-connection",
  "VIBES BOOST": "vibes-boost",
  "VIBES PREMIUM": "vibes-premium",
};

// Ordre : Connection, Boost (populaire, au centre), Premium. Les 3 CTA mènent au devis.
const PLAN_META_FR = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Faire votre devis",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Le plus populaire",
    inherit: "vibes premium",
    cta: "Faire votre devis",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Faire votre devis",
  },
];

const PLAN_META_EN = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Get your quote",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Most popular",
    inherit: "vibes premium",
    cta: "Get your quote",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Get your quote",
  },
];

/* Fonctionnalités « nouvelles » vs le plan hérité (Connection) — pour la mise en avant */
const FRESH: Record<number, (i: number) => boolean> = {
  0: () => true,                    // Connection — base, tout est "frais"
  1: (i) => i >= 7,                 // Boost — hérite de Premium (0-6), ajoute 7 à 10
  2: (i) => i >= 4 && i < 7,        // Premium — hérite de Connection (0-3), ajoute 4 à 6
};

export default function PricingTable({ locale = "fr" }: { locale?: "fr" | "en" }) {
  // Prix de référence : statiques (tableau validé par la tutrice), cf. PricingData.ts
  const mergedPlans = locale === "en" ? plansEn : plans;
  const FEATURES_LIST = locale === "en" ? featuresEn : features;
  const PLAN_META = locale === "en" ? PLAN_META_EN : PLAN_META_FR;

  // Tranches de tarification (4 tranches éditables en admin) — affichées au dépli
  const [apiPlans, setApiPlans] = useState<PlanApi[]>([]);
  const [openTiers, setOpenTiers] = useState<string | null>(null);
  const { devisEnabled } = useDevisStatus();
  useEffect(() => {
    fetch("/api/plans").then((r) => r.json()).then(setApiPlans).catch(() => {});
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

      {/* Mêmes cartes premium sur tous les écrans (empilées en mobile) */}
      <div className="pt-desktop-only">
        {/* Header */}
        <div className="pt-head">
          <span className="pt-eyebrow v-mono">
            <span className="pt-eyebrow-dot" aria-hidden="true" />
            {locale === "en" ? "Pricing" : "Tarification"}
          </span>
          <h2 className="pt-title v-prompt">
            {locale === "en" ? (
              <>Our Vibes{" "}<span className="pt-title-serif v-serif">plans.</span></>
            ) : (
              <>Nos offres{" "}<span className="pt-title-serif v-serif">Vibes.</span></>
            )}
          </h2>
          <p className="pt-subtitle">
            {locale === "en" ? "Find the plan that fits your community." : "Choisissez le plan adapté à votre collectif."}
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
                  <span className="v-mono pt-card-price-note">{locale === "en" ? "Excl. VAT / year" : "Prix HT / an"}</span>
                </div>

                {/* Tarif selon la taille — 4 tranches éditables en admin */}
                {(() => {
                  const slug = SLUG_BY_NAME[plan.name];
                  const tiers = apiPlans.find((ap) => ap.slug === slug)?.tiers ?? [];
                  if (!tiers.length) return null;
                  const open = openTiers === slug;
                  return (
                    <div className="pt-card-tiers">
                      <button
                        type="button"
                        className="pt-card-tiers-toggle"
                        aria-expanded={open}
                        onClick={() => setOpenTiers(open ? null : slug)}
                      >
                        {locale === "en"
                          ? (open ? "Hide pricing by size" : "See pricing by size")
                          : (open ? "Masquer les tarifs par taille" : "Voir les tarifs par taille")}
                        <ChevronDown size={13} className="pt-card-tiers-toggle-arrow" aria-hidden="true" />
                      </button>
                      {open && (
                        <ul className="pt-card-tiers-list">
                          {tiers.map((t) => (
                            <li key={t.label}>
                              <span>{t.label}</span>
                              <span>{t.prixAnnuel.toLocaleString(locale === "en" ? "en-US" : "fr-FR")} €</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })()}

                {/* CTA — les 3 offres mènent au devis (masqué si désactivé par l'admin) */}
                <div className="pt-card-cta-wrap">
                  {devisEnabled ? (
                    <Link href="/devis" className="pt-card-cta">
                      {meta.cta}
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link href="/rendez-vous" className="pt-card-cta">
                      {locale === "en" ? "Contact us" : "Nous contacter"}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>

                {/* Label héritage */}
                <div className={`pt-card-inherit-label v-mono${f ? " --featured" : ""}`}>
                  {meta.inherit
                    ? (locale === "en" ? `Everything in ${meta.inherit} :` : `Tout ${meta.inherit} :`)
                    : (locale === "en" ? "What's included" : "Ce qui est inclus")}
                </div>

                {/* Liste features */}
                <ul className="pt-card-list">
                  {FEATURES_LIST.map((feat, fi) => {
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
      <OffreEvenementielle locale={locale} />
    </section>
  );
}
