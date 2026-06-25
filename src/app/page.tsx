import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, PAGE_SEO, hreflangFor } from "@/lib/seo";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/Footer";
import FeaturedArticles from "@/components/section/FeaturedArticles";

import { PartnerCarousel } from "@/components/carousel/PartnerCarousel";
import HomeHero from "@/components/banner/HomeHero";
import BannerCount from "@/components/section/BannerCount";
import ValuePillars from "@/components/section/ValuePillars";
import CollectifsSection from "@/components/collectifs/CollectifsSection";
import HowItWorks from "@/components/section/HowItWorks";
import PasseportExperience from "@/components/section/PasseportExperience";
import VideoSection from "@/components/section/VideoSection";
import ConversationIntro from "@/components/section/ConversationIntro";
import { fetchPartners } from "@/services/home/fetchPartners";
import { getFeaturedArticles } from "@/services/blog/getArticles";

// ISR : régénérée au plus toutes les 60 s ; les sauvegardes admin (articles à la une, etc.) forcent un revalidatePath
export const revalidate = 60;

// Données structurées de la page d'accueil — l'entité Organization + le WebSite.
// Aident Google ET les moteurs IA (GEO) à identifier clairement Uvibes comme entité.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Uvibes",
      url: SITE_URL,
      logo: `${SITE_URL}/images/Logo UVIBES.png`,
      description:
        "Uvibes est une innovation socio-digitale qui active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain.",
      sameAs: [
        "https://www.linkedin.com/company/uvibes",
        "https://www.instagram.com/uvibes_app",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Uvibes",
      url: SITE_URL,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  // Titre riche en mots-clés (source unique : PAGE_SEO) plutôt que « Bienvenue »,
  // qui n'apportait aucun signal SEO sur la page la plus importante du site.
  title: { absolute: PAGE_SEO.home.fr.title },
  description: PAGE_SEO.home.fr.description,
  // hreflang complet (11 langues + x-default) : les pages d'accueil traduites se
  // référencent déjà mutuellement via buildMetadata ; on rend la réciprocité côté FR.
  alternates: {
    canonical: SITE_URL,
    languages: hreflangFor("home"),
  },
};

export default async function Home() {
  const partners = await fetchPartners();
  const featured = await getFeaturedArticles();

  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <HomeHero />

      <ConversationIntro />

      <BannerCount />

      <ValuePillars />

      <CollectifsSection showCta={true} />

      <HowItWorks />

      <PasseportExperience />

      <PartnerCarousel logos={partners} />
      <VideoSection />

      <FeaturedArticles articles={featured} />

      {/* Wrapper gradient commun — contact + footer seamless */}
      <div style={{ background: "linear-gradient(165deg, #FD6E00 0%, #FF7A38 14%, #FF6098 42%, #E6007E 70%, #C20057 100%)" }}>
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
