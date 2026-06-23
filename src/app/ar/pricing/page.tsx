import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import PricingTable from "@/components/features/PricingTable";
import SmallOrgCta from "@/components/features/SmallOrgCta";
import TarifsHero from "@/components/tarifs/TarifsHero";
import WaveSeparator from "@/components/shared/WaveSeparator";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata("tarifs", "ar");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/ar` },
    { "@type": "ListItem", position: 2, name: "الأسعار", item: `${SITE_URL}/ar/pricing` },
  ],
};

// Même dégradé que la page Méthode (/solution) → cohérence visuelle entre les deux pages.
const HERO_GRADIENT = "linear-gradient(135deg, #FD6E00 0%, #FF8530 8%, #FFB870 20%, #FFB0A0 35%, #FF88B8 52%, #FF5898 70%, #E6007E 88%, #D90A5C 100%)";

export default function PricingPageAr() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div style={{ background: HERO_GRADIENT, position: "relative", overflow: "hidden" }}>
        <TarifsHero locale="ar" />
        {/* Couche avant = haut de PricingTable (#FFFBF4) → transition sans couture */}
        <WaveSeparator position="bottom" color="#FFFBF4" />
      </div>

      <main>
        <PricingTable locale="ar" />
        {/* Section petites structures + footer, sur le dégradé commun */}
        <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #E6007E 70%, #D90A5C 100%)", position: "relative", overflow: "hidden" }}>
          {/* Couche avant = crème du bas de PricingTable (#FFF0F5) → la wave prolonge
              la section précédente, comme les waves des autres pages (cf. /solution). */}
          <WaveSeparator position="top" color="#FFF0F5" />
          <SmallOrgCta locale="ar" />
          <Footer locale="ar" />
        </div>
      </main>
    </>
  );
}
