"use client";

import { PartnerLogo } from "@/services/home/fetchPartners";
import VibrationLine from "@/components/shared/VibrationLine";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
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

      <div className="trustees-inner">
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
              <div key={i} className="trustees-logo-item">
                <Image
                  src={logo.src || "/images/Logo UVIBES.png"}
                  alt={logo.alt}
                  width={180}
                  height={72}
                  style={{ objectFit: "contain", height: "96px", width: "auto", maxWidth: "200px" }}
                />
                <span className="trustees-sep" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lignes épaisses bas — dégradé orange → rose */}
      <div className="trustees-vline trustees-vline--bottom" aria-hidden="true">
        <GradientVibrationLine id="vline-bot-1" width={1800} height={55} amplitude={32} freq={5} strokeWidth={14} speed={11} colorFrom="#FD6E00" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="vline-bot-2" width={1800} height={55} amplitude={22} freq={7} strokeWidth={8}  speed={16} colorFrom="#D90A5C" colorTo="#FD6E00" style={{ width: "100%" }} />
      </div>

    </section>
  );
}
