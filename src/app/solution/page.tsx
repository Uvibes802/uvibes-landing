import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import PricingTable from "@/components/features/PricingTable";
import SmallOrgCta from "@/components/features/SmallOrgCta";
import SolutionAnchorNav from "@/components/solution/SolutionAnchorNav";
import SolutionHero from "@/components/solution/SolutionHero";
import WaveSeparator from "@/components/shared/WaveSeparator";
import SolutionHowItWorks from "@/components/solution/SolutionHowItWorks";
import SolutionThemes from "@/components/solution/SolutionThemes";
import SolutionSoftSkills from "@/components/solution/SolutionSoftSkills";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata("solution");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "La solution", item: `${SITE_URL}/solution` },
  ],
};

const HERO_GRADIENT = "linear-gradient(135deg, #FD6E00 0%, #FF8530 8%, #FFB870 20%, #FFB0A0 35%, #FF88B8 52%, #FF5898 70%, #E6007E 88%, #D90A5C 100%)";

export default function SolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div style={{ background: HERO_GRADIENT, position: "relative", overflow: "hidden" }}>
        <SolutionHero />
        {/* Séparateur wavy : la couche avant prend la couleur du haut de SolutionHowItWorks (#FFF6EC) → pas de couture */}
        <WaveSeparator position="bottom" color="#FFF6EC" />
      </div>

      <SolutionAnchorNav />

      <main className="sol-main-content">
        <SolutionHowItWorks />
        <SolutionThemes />
        <SolutionSoftSkills />
        <FeaturesCard />
        <PricingTable />
        {/* Section petites structures (remplace "Ils font confiance") + footer, sur le dégradé commun */}
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
