import HeroContent from "@/components/banner/HeroContent";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/Footer";
import FloatingMenu from "@/components/menu/Menu";
import FeaturedArticles from "@/components/section/FeaturedArticles";

import UserNumberCard from "@/components/cards/userNumberCard";
import VideoCard from "@/components/cards/videoCard";
import { PartnerCarousel } from "@/components/carousel/PartnerCarousel";
import WhyUvibes from "@/components/section/WhyUvibes";
import Testimony from "@/components/testimony/testimony";
import { BenefitsHomeSection } from "../components/section/BenefitsHomeSection";
const mockupHome = "/images/mochupHome.png";

import { fetchHomeContent } from "@/services/home/fetchHomeContent";

// Server Component — le fetch WordPress se fait côté serveur, le HTML est pré-rempli pour le SEO
export default async function Home() {
  const { title, description } = await fetchHomeContent();

  return (
    <main>
      <HeroContent
        title={title}
        description={description}
        image={mockupHome}
      />
            
      <WhyUvibes />

      <UserNumberCard />
      <VideoCard
        title={
          <>
            Bien-être collectif: <br className="mobile-only" /> <span className="text-bold">elles y trouvent de <br className="mobile-only" /> la bonne humeur</span>
          </>
        }
        videoSrcDdesktop={"/videos/Lisa-desktop.mp4"}
        videoSrcMobile={"/videos/Lisa-mobile.mp4"}
      />
      <PartnerCarousel />

      <Testimony />

      <VideoCard
        title={
          <>
            Outil pédagogique: <br className="mobile-only" /> <span className="text-bold">ils y trouvent de <br className="mobile-only" /> nouvelles idées</span>
          </>
        }
        videoSrcDdesktop={"/videos/Delphine-desktop.mp4"}
        videoSrcMobile={"/videos/Delphine-mobile.mp4"}
      />

      <BenefitsHomeSection />

      <FeaturedArticles />

      <FloatingMenu />

      <Contact />
      <Footer />
    </main>
  );
}
