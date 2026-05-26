import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import FloatingMenu from "@/components/menu/Menu";
import { AppointmentSection } from "@/components/section/appointmentSection";
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

const mockupSolution = "/images/mockupFeature.png";

export default function SolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <HeroBanner
        subtitle=""
        title={"La solution\npour votre\ncollectif"}
        description="Découvrez comment Uvibes s'adapte à votre contexte et choisissez l'offre qui vous correspond"
        image={mockupSolution}
        alt="Application Uvibes"
        className="features-hero"
        useAppMockup={true}
      />
      <FloatingMenu />
      <main>
        <SolutionTabs />
        <PartnerBanner />
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
