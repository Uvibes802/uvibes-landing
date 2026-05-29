import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import PricingTable from "@/components/features/PricingTable";
import Footer from "@/components/footer/Footer";
import FunctOrganisation from "@/components/funct/functOrganisation";
import JsonLd from "@/components/JsonLd";
import { AppointmentSection } from "@/components/section/appointmentSection";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata("features");

const mockupFeature = "/images/mockupFeature.png";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Uvibes",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android",
  url: `${SITE_URL}/features`,
  description:
    "Application bien-être collectif qui active les conversations positives, développe les soft skills et renforce la cohésion d'équipe au sein des collectifs.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Fonctionnement", item: `${SITE_URL}/features` },
  ],
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <HeroBanner
          subtitle=""
          title={"Des conversations \nqui font avancer \nvotre collectif"}
          description="Découvrez nos fonctionnalités et choisissez l'offre adaptée à vos besoins"
          image={mockupFeature}
          alt="Fonctionnalités de l'application"
          className="features-hero"
        />
        <nav>
        </nav>
        <FunctOrganisation />
        <FeaturesCard />
        <PricingTable />
        <PartnerBanner />
        <AppointmentSection />
      </main>
      <Footer />
    </>
  );
}
