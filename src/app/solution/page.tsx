import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import PricingTable from "@/components/features/PricingTable";
import SolutionAnchorNav from "@/components/solution/SolutionAnchorNav";
import SolutionHero from "@/components/solution/SolutionHero";
import SolutionHowItWorks from "@/components/solution/SolutionHowItWorks";
import SolutionThemes from "@/components/solution/SolutionThemes";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { getVideoUrl } from "@/utils/videoUrl";
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

      {/* Hero avec stats intégrés — fond continu */}
      <div style={{ background: HERO_GRADIENT }}>
        <SolutionHero />
      </div>

      <SolutionAnchorNav />

      <main className="sol-main-content">
        <SolutionHowItWorks />

        {/* Vidéos éparpillées après les étapes */}
        <div className="sol-vid-scatter">
          <div className="sol-scatter-vid sol-scatter-vid--a">
            <video src={getVideoUrl("Lisa-desktop.mp4")} autoPlay muted loop playsInline className="sol-scatter-vid__el" />
            <div className="sol-scatter-vid__label">Lisa · Professionnelle RH</div>
          </div>
          <div className="sol-scatter-vid sol-scatter-vid--b">
            <video src={getVideoUrl("Delphine-desktop.mp4")} autoPlay muted loop playsInline className="sol-scatter-vid__el" />
            <div className="sol-scatter-vid__label">Delphine · Responsable collectif</div>
          </div>
        </div>

        <SolutionThemes />
        <FeaturesCard />

        <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: 4 }}>
          <GradientVibrationLine id="sol-vib-1" width={1800} height={50} amplitude={28} freq={5} strokeWidth={10} speed={11} colorFrom="#FD6E00" colorTo="#D90A5C" style={{ width: "100%" }} />
          <GradientVibrationLine id="sol-vib-2" width={1800} height={50} amplitude={18} freq={8} strokeWidth={6} speed={16} colorFrom="#D90A5C" colorTo="#FD6E00" style={{ width: "100%" }} />
        </div>

        {/* Vidéo éparpillée avant pricing */}
        <div className="sol-vid-single">
          <div className="sol-scatter-vid sol-scatter-vid--c">
            <video src={getVideoUrl("Isaline-desktop.mp4")} autoPlay muted loop playsInline className="sol-scatter-vid__el" />
            <div className="sol-scatter-vid__label">Isaline · Étudiante</div>
          </div>
        </div>

        <PricingTable />
        <PartnerBanner />
      </main>
      <Footer />
    </>
  );
}
