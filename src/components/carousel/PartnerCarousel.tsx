"use client";

import { fetchPartners, PartnerLogo } from "@/services/home/fetchPartners";
import Image from "next/image";
import { useEffect, useState } from "react";
import eklore from "../../../public/images/eklore.png";
import fetedesvoisins from "../../../public/images/LogoFeteDesVoisins.png";
import university from "../../../public/images/upvd_logo_hori_rvb.png";
import "../../styles/carousel/PartnerCarousel.css";

const FALLBACK: PartnerLogo[] = [
  { id: 1, src: university.src, alt: "Université de Perpignan" },
  { id: 2, src: eklore.src, alt: "Eklore" },
  { id: 3, src: fetedesvoisins.src, alt: "Fête des voisins" },
  { id: 4, src: university.src, alt: "Université de Perpignan" },
  { id: 5, src: eklore.src, alt: "Eklore" },
  { id: 6, src: fetedesvoisins.src, alt: "Fête des voisins" },
];

export function PartnerCarousel() {
  const [logos, setLogos] = useState<PartnerLogo[]>(FALLBACK);

  useEffect(() => {
    fetchPartners()
      .then((p) => { if (p.length > 0) setLogos(p); })
      .catch(() => {});
  }, []);

  // Triple pour que le marquee ne rame pas en rebouclant
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="trustees-section">
      <div className="trustees-header">
        <h3 className="trustees-title v-prompt">
          <span className="v-serif">Ils avancent</span> avec nous
        </h3>
        <span className="v-mono trustees-sub">+ 80 organisations partenaires</span>
      </div>

      <div className="trustees-marquee-wrap">
        <div className="trustees-marquee-track">
          {track.map((logo, i) => (
            <div key={i} className="trustees-logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={56}
                style={{ objectFit: "contain", height: "48px", width: "auto" }}
              />
              <span className="trustees-sep" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
