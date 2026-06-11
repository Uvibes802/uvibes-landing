"use client";

import Link from "next/link";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/features/smallOrgCta.css";

// Section qui suit les offres : invite les petites structures / collectifs
// à contacter l'équipe pour une offre sur mesure.
export default function SmallOrgCta() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`soc-section${vis ? " soc-vis" : ""}`} ref={ref} id="petites-structures">
      <div className="soc-card">
        <div className="soc-glow" aria-hidden="true" />

        <div className="soc-content">
          <span className="soc-eyebrow v-mono">
            <span className="soc-eyebrow-dot" aria-hidden="true" />
            Petite structure&nbsp;?
          </span>

          <h2 className="soc-title v-prompt">
            Une association, un petit collectif, un budget serré&nbsp;?{" "}
            <span className="soc-title-accent v-serif">Parlons-en.</span>
          </h2>

          <p className="soc-text">
            Association, petit collectif ou budget limité&nbsp;? Nos formules standard ne sont pas une fin en soi.
            Uvibes est porté par une association à but non lucratif&nbsp;: notre priorité, c&apos;est votre lien social,
            pas la taille du contrat. On construit ensemble une formule à votre échelle.
          </p>

          <div className="soc-ctas">
            <Link href="/rendez-vous" className="btn-brand soc-cta-primary">
              Prendre rendez-vous →
            </Link>
            <Link href="/#contact" className="soc-cta-ghost">
              Nous écrire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
