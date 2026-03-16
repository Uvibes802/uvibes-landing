"use client";

import AvantagesContent from "@/components/avantages/avantagesContent";
import AvantagesContentDesktop from "@/components/avantages/avantagesContentDesktop";
import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import FloatingMenu from "@/components/menu/Menu";
import { AppointmentSection } from "@/components/section/appointmentSection";
import Resize from "@/services/resize/resize";
import Image from "next/image";
import mockupAvantages from "../../../public/images/MockupAvantage.png";
import visuelfemme from "../../../public/images/visuel-avantagePage.jpg";

export default function Avantages() {
  const { isMobile, mounted } = Resize();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <HeroBanner
        subtitle=""
        title="Uvibes, moteur d'une dynamique positive"
        description="À la clé, une source intarissable de données stratégiques"
        image={mockupAvantages}
        alt="Fonctionnalités de l'application"
      />
      <nav>
        <FloatingMenu />
      </nav>
      <main style={{backgroundColor: "#FDF5FD"}}>
        {isMobile ? <AvantagesContent /> : <AvantagesContentDesktop />}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "40dvh" : "60vh",
          }}
        >
          <Image
            src={isMobile ? visuelfemme : visuelfemme}
            alt="visuel femme téléphone"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            loading="lazy"
          />
        </div>
        <PartnerBanner />
        <AppointmentSection />
        <Footer />
      </main>
    </>
  );
}
