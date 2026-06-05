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

      <BannerCount />

      <ValuePillars />

      <CollectifsSection showCta={true} />

      <HowItWorks />

      <PartnerCarousel logos={partners} />
      <VideoSection />

      <FeaturedArticles />

      {/* Wrapper gradient commun — contact + footer seamless */}
      <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #D90A5C 72%, #B80048 100%)" }}>
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
