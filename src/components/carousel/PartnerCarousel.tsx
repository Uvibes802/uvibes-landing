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

const TRUSTEES_TXT: Record<string, { before: string; underlined: string; after: string }> = {
  en: { before: "They ", underlined: "move forward", after: " with us." },
  es: { before: "Ellos ", underlined: "avanzan", after: " con nosotros." },
  de: { before: "Sie ", underlined: "gehen voran", after: " mit uns." },
  it: { before: "Loro ", underlined: "avanzano", after: " con noi." },
  pt: { before: "Eles ", underlined: "avançam", after: " connosco." },
  ru: { before: "Они ", underlined: "идут вперёд", after: " с нами." },
  zh: { before: "", underlined: "他们与我们一起", after: "前行。" },
  ja: { before: "", underlined: "私たちと共に", after: "歩んでいます。" },
  hi: { before: "वे ", underlined: "हमारे साथ", after: " आगे बढ़ रहे हैं।" },
  ar: { before: "إنهم ", underlined: "يتقدمون", after: " معنا." },
};

export function PartnerCarousel({ logos = FALLBACK, locale = "fr" }: { logos?: PartnerLogo[]; locale?: string }) {
  const display = logos.length > 0 ? logos : FALLBACK;
  const track = [...display, ...display, ...display];
  const trustees = locale !== "fr" ? TRUSTEES_TXT[locale] : undefined;

  return (
    <section className="trustees-section">

      <div className="trustees-inner">
        <h2 className="trustees-title v-prompt">
          {trustees ? (
            <>
              <span className="trustees-t-orange">{trustees.before}</span>
              <span className="trustees-underline-wrap">
                <span className="v-serif trustees-t-gradient">{trustees.underlined}</span>
                <span className="trustees-vline-under" aria-hidden="true">
                  <VibrationLine width={400} height={18} amplitude={5} freq={5} stroke="#D90A5C" strokeWidth={3} speed={5} style={{ width: "100%" }} />
                </span>
              </span>
              <span className="trustees-t-orange">{trustees.after}</span>
            </>
          ) : (
            <>
              <span className="trustees-t-orange">Ils </span>
              <span className="trustees-underline-wrap">
                <span className="v-serif trustees-t-gradient">avancent</span>
                <span className="trustees-vline-under" aria-hidden="true">
                  <VibrationLine width={400} height={18} amplitude={5} freq={5} stroke="#D90A5C" strokeWidth={3} speed={5} style={{ width: "100%" }} />
                </span>
              </span>
              {" "}<span className="trustees-t-orange">avec nous.</span>
            </>
          )}
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

    </section>
  );
}
