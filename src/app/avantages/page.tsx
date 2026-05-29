import AvantagesPageClient from "@/components/avantages/AvantagesPageClient";
import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { AppointmentSection } from "@/components/section/appointmentSection";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import "../../styles/features/PricingTable.css";

export const metadata: Metadata = buildMetadata("avantages");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Avantages", item: `${SITE_URL}/avantages` },
  ],
};

const mockupAvantages = "/images/MockupAvantage.png";

export default function Avantages() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <HeroBanner
        subtitle=""
        title={"Des conversations\ndevenues\nstratégiques"}
        description="Transformez vos missions en actions concrètes et en données exploitables"
        image={mockupAvantages}
        alt="Fonctionnalités de l'application"
        className="avantages-hero"
      />
      <nav>
      </nav>
      <main id="top">
        <AvantagesPageClient />
        <PartnerBanner />
        <AppointmentSection />
        <Footer />
      </main>
    </>
  );
}
