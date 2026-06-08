"use client";

import Link from "next/link";
import "../../styles/banner/partnerBanner.css";
import PartnerGroup from "./PartnerGroup";

export function PartnerBanner() {
  return (
    <section className="pb-section">
      {/* Blobs déco */}
      <div className="pb-blob pb-blob--a" aria-hidden="true" />
      <div className="pb-blob pb-blob--b" aria-hidden="true" />

      <div className="pb-inner">
        {/* Eyebrow */}
        <p className="pb-eyebrow v-mono">
          <span className="pb-eyebrow-dot" aria-hidden="true" />
          Ils font confiance à Uvibes
        </p>

        {/* Logos partenaires */}
        <div className="pb-logos">
          <PartnerGroup />
        </div>

        {/* Titre */}
        <h2 className="pb-title v-prompt">
          Prêt à activer l&apos;énergie<br />
          de votre <span className="pb-title-accent v-serif">collectif ?</span>
        </h2>

        <p className="pb-desc">
          Rejoignez les organisations qui utilisent Uvibes pour créer des échanges
          authentiques et valoriser l&apos;intelligence collective.
        </p>

        {/* CTAs fusionnés */}
        <div className="pb-ctas">
          <Link href="/rendez-vous" className="pb-btn-primary">
            Parler à un conseiller →
          </Link>
          <Link href="/solution#offres" className="pb-btn-ghost">
            Voir les offres
          </Link>
        </div>
      </div>
    </section>
  );
}
