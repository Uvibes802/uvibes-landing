import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { AppointmentSection } from "@/components/section/appointmentSection";
import SolutionHero from "@/components/solution/SolutionHero";
import SolutionTabs from "@/components/solution/SolutionTabs";
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
      <main id="solution-tabs">
        <SolutionTabs />
        <PartnerBanner />
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
