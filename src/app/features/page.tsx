"use client";
import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import Footer from "@/components/footer/Footer";
import FunctOrganisation from "@/components/funct/functOrganisation";
import FloatingMenu from "@/components/menu/Menu";
import { AppointmentSection } from "@/components/section/appointmentSection";

import PricingTable from "@/components/features/PricingTable";
const mockupFeature = "/images/mockupFeature.png";
export default function FeaturesPage() {
  return (
    <>
      <main>
        <HeroBanner
          subtitle=""
          title={"Des\u00A0conversations \nqui font avancer \nvotre collectif"}
          description="Découvrez nos fonctionnalités et choisissez l’offre adaptée à vos besoins"
          image={mockupFeature}
          alt="Fonctionnalités de l'application"
        />
        <nav>
          <FloatingMenu />
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
