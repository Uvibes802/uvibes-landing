"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/tarifs/tarifsHero.css";

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
          <span className="th-title-accent v-serif">sans surprise.</span>
        </h1>
        <p className="th-desc">
          Une tarification simple&nbsp;: trois formules annuelles pour équiper
          durablement votre collectif, et une offre découverte de 30&nbsp;jours
          pour tester Uvibes sans engagement.
        </p>

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
