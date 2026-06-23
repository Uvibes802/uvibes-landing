import type { Metadata } from "next";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/Footer";

import { PartnerCarousel } from "@/components/carousel/PartnerCarousel";
import HomeHero from "@/components/banner/HomeHero";
import BannerCount from "@/components/section/BannerCount";
import ValuePillars from "@/components/section/ValuePillars";
import CollectifsSection from "@/components/collectifs/CollectifsSection";
import HowItWorks from "@/components/section/HowItWorks";
import PasseportExperience from "@/components/section/PasseportExperience";
import ConversationIntro from "@/components/section/ConversationIntro";
import { fetchPartners } from "@/services/home/fetchPartners";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata("home", "it");

export default async function HomeIt() {
  const partners = await fetchPartners();

  return (
    <main>
      <HomeHero locale="it" />

      <ConversationIntro locale="it" />

      <BannerCount locale="it" />

      <ValuePillars locale="it" />

      <CollectifsSection showCta={true} locale="it" />

      <HowItWorks locale="it" />

      <PasseportExperience locale="it" />

      <PartnerCarousel logos={partners} locale="it" />

      {/* Wrapper gradient commun — contact + footer seamless */}
      <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #D90A5C 72%, #B80048 100%)" }}>
        <Contact locale="it" />
        <Footer locale="it" />
      </div>
    </main>
  );
}
