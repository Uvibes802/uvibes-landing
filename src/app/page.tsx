import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/Footer";
import FloatingMenu from "@/components/menu/Menu";
import FeaturedArticles from "@/components/section/FeaturedArticles";

import { PartnerCarousel } from "@/components/carousel/PartnerCarousel";
import HomeHero from "@/components/banner/HomeHero";
import BannerCount from "@/components/section/BannerCount";
import ValuePillars from "@/components/section/ValuePillars";
import Enjeux from "@/components/section/Enjeux";
import HowItWorks from "@/components/section/HowItWorks";
import AdvantagesGrid from "@/components/section/AdvantagesGrid";
import VideoSection from "@/components/section/VideoSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <HomeHero />

      <BannerCount />

      <ValuePillars />

      <Enjeux />

      <PartnerCarousel />

      <HowItWorks />

      <AdvantagesGrid />

      <VideoSection />

      <FeaturedArticles />

      <FloatingMenu />

      <Contact />
      <Footer />
    </main>
  );
}
