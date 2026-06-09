"use client";

import { PartnerLogo } from "@/services/home/fetchPartners";
import VibrationLine from "@/components/shared/VibrationLine";
import Image from "next/image";
import eklore from "../../../public/images/eklore.png";
import eclatens from "../../../public/images/LogoEclatens.png";
import fetedesvoisins from "../../../public/images/LogoFeteDesVoisins.png";
import university from "../../../public/images/upvd_logo_hori_rvb.png";
import "../../styles/carousel/PartnerCarousel.css";

const FALLBACK: PartnerLogo[] = [
  { id: 1, src: university.src,     alt: "Université de Perpignan" },
  { id: 2, src: eklore.src,         alt: "Eklore" },
  { id: 3, src: fetedesvoisins.src, alt: "Fête des voisins" },
  { id: 4, src: eclatens.src,       alt: "Éclatens" },
];

export function PartnerCarousel({ logos = FALLBACK }: { logos?: PartnerLogo[] }) {
  const display = logos.length > 0 ? logos : FALLBACK;
  const track = [...display, ...display, ...display];

  return (
    <section className="trustees-section">
      {/* halo de fond — identité Uvibes */}
      <div className="trustees-bg" aria-hidden="true" />

      <div className="trustees-inner">
        <p className="trustees-eyebrow v-mono">
          <span className="trustees-eyebrow-dot" aria-hidden="true" />
          Partenaires &amp; collectifs
        </p>

        <h2 className="trustees-title v-prompt">
          <span className="trustees-t-orange">Ils </span>
          <span className="trustees-underline-wrap">
            <span className="v-serif trustees-t-gradient">avancent</span>
            <span className="trustees-vline-under" aria-hidden="true">
              <VibrationLine width={400} height={18} amplitude={5} freq={5} stroke="#D90A5C" strokeWidth={3} speed={5} style={{ width: "100%" }} />
            </span>
          </span>
          {" "}<span className="trustees-t-orange">avec nous.</span>
        </h2>

        <div className="trustees-marquee-wrap">
          <div className="trustees-marquee-track">
            {track.map((logo, i) => (
              <div key={i} className="trustees-logo-card">
                <Image
                  src={logo.src || "/images/Logo UVIBES.png"}
                  alt={logo.alt}
                  width={180}
                  height={72}
                  style={{ objectFit: "contain", height: "64px", width: "auto", maxWidth: "170px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
