import type { Metadata } from "next";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/Footer";
import FeaturedArticles from "@/components/section/FeaturedArticles";

import { PartnerCarousel } from "@/components/carousel/PartnerCarousel";
import HomeHero from "@/components/banner/HomeHero";
import BannerCount from "@/components/section/BannerCount";
import ValuePillars from "@/components/section/ValuePillars";
import CollectifsSection from "@/components/collectifs/CollectifsSection";
import HowItWorks from "@/components/section/HowItWorks";
import VideoSection from "@/components/section/VideoSection";
import ConversationIntro from "@/components/section/ConversationIntro";
import { fetchPartners } from "@/services/home/fetchPartners";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Bienvenue | Uvibes" },
  description:
    "Uvibes active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain.",
};

export default async function Home() {
  const partners = await fetchPartners();

  return (
    <main>
      <HomeHero />

      <ConversationIntro />

      <div className="v-reveal"><BannerCount /></div>

      <div className="v-reveal"><ValuePillars /></div>

      <div className="v-reveal"><CollectifsSection showCta={true} /></div>

      <div className="v-reveal"><HowItWorks /></div>

      {/* Séparateur vibration entre HowItWorks et vibe-zone */}
      <div className="vibe-sep" aria-hidden="true">
        <GradientVibrationLine id="vsep-1" width={1800} height={55} amplitude={38} freq={4} strokeWidth={18} speed={9}  colorFrom="#FD6E00" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="vsep-2" width={1800} height={55} amplitude={28} freq={6} strokeWidth={10} speed={13} colorFrom="#D90A5C" colorTo="#FD6E00" style={{ width: "100%" }} />
      </div>

      {/* Zone partagée étoilée : partenaires + témoignages */}
      <div className="vibe-zone v-reveal">
        <PartnerCarousel logos={partners} />
        <VideoSection />
      </div>

      <div className="v-reveal"><FeaturedArticles /></div>

      <div className="v-reveal"><Contact /></div>
      <Footer />
    </main>
  );
}
