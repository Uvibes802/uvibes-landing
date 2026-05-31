import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import PricingTable from "@/components/features/PricingTable";
import { AppointmentSection } from "@/components/section/appointmentSection";
import SolutionAnchorNav from "@/components/solution/SolutionAnchorNav";
import SolutionForWho from "@/components/solution/SolutionForWho";
import SolutionHero from "@/components/solution/SolutionHero";
import SolutionHowItWorks from "@/components/solution/SolutionHowItWorks";
import SolutionProofBar from "@/components/solution/SolutionProofBar";
import SolutionThemes from "@/components/solution/SolutionThemes";
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

export default function SolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <SolutionHero />
      <SolutionProofBar />
      <SolutionAnchorNav />
      <main>
        <SolutionForWho />
        <SolutionHowItWorks />
        <SolutionThemes />
        <FeaturesCard />
        <PricingTable />
        <PartnerBanner />
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
