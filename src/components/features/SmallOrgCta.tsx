"use client";

import Link from "next/link";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { useSettings } from "@/hooks/useSettings";
import "@/styles/features/smallOrgCta.css";

// Section qui suit les offres : invite les petites structures / collectifs
// à contacter l'équipe pour une offre sur mesure.
export default function SmallOrgCta() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });
  const t = useSettings();

  return (
    <section className={`soc-section${vis ? " soc-vis" : ""}`} ref={ref} id="petites-structures">
      <div className="soc-card">
        <div className="soc-glow" aria-hidden="true" />

        <div className="soc-content">
          <span className="soc-eyebrow v-mono">
            <span className="soc-eyebrow-dot" aria-hidden="true" />
            Besoin d&apos;une offre surmesure&nbsp;?
          </span>

          <h2 className="soc-title v-prompt">
            <span className="soc-nowrap">Une association,</span>{" "}
            <br className="soc-br-mob" />
            <span className="soc-nowrap">un petit collectif,</span>
            <br className="soc-br-all" />
            <span className="soc-nowrap">un budget serré&nbsp;?</span>{" "}
            <span className="soc-title-accent v-serif">Parlons-en.</span>
          </h2>

          <p className="soc-text">
            {t("soc-text", "Chez Uvibes, nous savons que chaque structure a ses réalités. En tant qu'association à but non lucratif, notre objectif est avant tout de favoriser le lien social, pas de maximiser la taille des contrats. Si nos formules standard ne correspondent pas à votre situation, nous pouvons construire ensemble une solution adaptée à vos besoins et à vos ressources.")}
          </p>

          <div className="soc-ctas">
            <Link href="/rendez-vous" className="btn-brand soc-cta-primary">
              {t("soc-cta", "Prendre rendez-vous")} →
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
