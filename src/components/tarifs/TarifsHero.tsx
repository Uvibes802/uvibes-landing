"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/tarifs/tarifsHero.css";

// Teaser de prix repris de PricingData (3 980 / 4 980 / 5 980) — pastilles cliquables vers les offres.
const TEASERS = [
  { nom: "Connection", prix: "3 980 €", accent: "#FD6E00" },
  { nom: "Premium", prix: "4 980 €", accent: "#E6007E" },
  { nom: "Boost", prix: "5 980 €", accent: "#FFB800", populaire: true },
];

export default function TarifsHero() {
  return (
    <section className="th-section" aria-label="Tarifs et offres Uvibes">
      <div className="th-vib" aria-hidden="true">
        <VibrationLine width={1800} height={55} amplitude={22} freq={8} stroke="rgba(255,255,255,.32)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={55} amplitude={14} freq={12} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
      </div>

      <div className="th-inner">
        <p className="th-eyebrow">
          <span className="th-eyebrow-dot" aria-hidden="true" />
          Tarifs &amp; offres
        </p>
        <h1 className="th-title v-prompt">
          Des offres claires,<br />
          <span className="th-title-accent">sans surprise.</span>
        </h1>
        <p className="th-desc">
          Trois formules annuelles pour équiper durablement votre collectif,
          et une offre découverte de 30&nbsp;jours pour tester sans engagement.
        </p>

        {/* Teaser de prix — aperçu visuel distinct du reste du site */}
        <div className="th-teasers">
          {TEASERS.map((t) => (
            <Link
              key={t.nom}
              href="#offres"
              className={`th-chip${t.populaire ? " th-chip--pop" : ""}`}
              style={{ "--th-accent": t.accent } as React.CSSProperties}
            >
              {t.populaire && <span className="th-chip-tag">Populaire</span>}
              <span className="th-chip-name">{t.nom}</span>
              <span className="th-chip-price v-prompt">{t.prix}</span>
              <span className="th-chip-unit">HT / an</span>
            </Link>
          ))}
        </div>

        <div className="th-ctas">
          <Link href="/devis" className="btn-brand th-cta-primary">
            Faire un devis →
          </Link>
          <Link href="#offres" className="th-cta-ghost">
            Comparer les offres
          </Link>
        </div>
      </div>
    </section>
  );
}
