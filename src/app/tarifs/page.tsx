import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import PricingTable from "@/components/features/PricingTable";
import SmallOrgCta from "@/components/features/SmallOrgCta";
import TarifsHero from "@/components/tarifs/TarifsHero";
import WaveSeparator from "@/components/shared/WaveSeparator";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata("tarifs");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: `${SITE_URL}/tarifs` },
  ],
};

// Dégradé organique & saturé : plusieurs taches radiales vives superposées sur une base diagonale.
const HERO_GRADIENT =
  "radial-gradient(60% 55% at 16% 20%, #FF8A00 0%, transparent 55%), " +
  "radial-gradient(55% 50% at 85% 14%, #FF1E63 0%, transparent 55%), " +
  "radial-gradient(65% 60% at 78% 88%, #E6007E 0%, transparent 60%), " +
  "radial-gradient(60% 55% at 18% 85%, #FF4D00 0%, transparent 58%), " +
  "linear-gradient(135deg, #FD6E00 0%, #F62570 55%, #D90A5C 100%)";

export default function TarifsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div style={{ background: HERO_GRADIENT, position: "relative", overflow: "hidden" }}>
        <TarifsHero />
        {/* Couche avant = haut de PricingTable (#FFFBF4) → transition sans couture */}
        <WaveSeparator position="bottom" color="#FFFBF4" />
      </div>

      <main>
        <PricingTable />
        {/* Section petites structures + footer, sur le dégradé commun */}
        <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #E6007E 70%, #D90A5C 100%)", position: "relative", overflow: "hidden" }}>
          {/* Couche avant = bas de PricingTable (#FFF0F5) pour une transition sans couture */}
          <WaveSeparator position="top" color="#FFF0F5" />
          <SmallOrgCta />
          <Footer />
        </div>
      </main>
    </>
  );
}
