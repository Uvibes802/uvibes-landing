import Link from "next/link";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import SolutionAnchorNav from "@/components/solution/SolutionAnchorNav";
import SolutionHero from "@/components/solution/SolutionHero";
import WaveSeparator from "@/components/shared/WaveSeparator";
import SolutionHowItWorks from "@/components/solution/SolutionHowItWorks";
import SolutionThemes from "@/components/solution/SolutionThemes";
import SolutionStrategie from "@/components/solution/SolutionStrategie";
import SolutionSoftSkills from "@/components/solution/SolutionSoftSkills";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import "@/styles/solution/tarifsBridge.css";

export const metadata: Metadata = buildMetadata("solution", "ar");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/ar` },
    { "@type": "ListItem", position: 2, name: "المنهجية", item: `${SITE_URL}/ar/method` },
  ],
};

const HERO_GRADIENT = "linear-gradient(135deg, #FD6E00 0%, #FF8530 8%, #FFB870 20%, #FFB0A0 35%, #FF88B8 52%, #FF5898 70%, #E6007E 88%, #D90A5C 100%)";

export default function MethodPageAr() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div style={{ background: HERO_GRADIENT, position: "relative", overflow: "hidden" }}>
        <SolutionHero locale="ar" />
        {/* Séparateur wavy : la couche avant prend la couleur du haut de SolutionHowItWorks (#FFF6EC) → pas de couture */}
        <WaveSeparator position="bottom" color="#FFF6EC" />
      </div>

      <SolutionAnchorNav locale="ar" />

      <main className="sol-main-content">
        <SolutionHowItWorks locale="ar" />
        <SolutionThemes locale="ar" />

        {/* Stratégie — sur fond dégradé (même esprit que la section équipe / à propos), encadrée par 2 vagues */}
        <div className="str-gradient-wrap" style={{ background: HERO_GRADIENT, position: "relative", overflow: "hidden" }}>
          <WaveSeparator position="top" color="#FFF0F8" />
          <SolutionStrategie locale="ar" />
          <WaveSeparator position="bottom" color="#FFF0F8" />
        </div>

        <SolutionSoftSkills locale="ar" />
        {/* Renvoi vers les tarifs, juste avant la section Résultats */}
        <div className="sol-offers-cta">
          <Link href="/ar/pricing" className="btn-brand sol-offers-cta-btn">
            خطط Uvibes الخاصة بنا ←
          </Link>
        </div>
        <FeaturesCard locale="ar" />
        {/* Pont vers les offres : la tarification vit désormais sur sa propre page /tarifs */}
        <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #E6007E 70%, #D90A5C 100%)", position: "relative", overflow: "hidden" }}>
          {/* Couche avant = crème de FeaturesCard (#FFF6EC) pour une transition sans couture */}
          <WaveSeparator position="top" color="#FFF6EC" />
          <section className="sol-tarifs-bridge">
            <p className="sol-bridge-eyebrow">هل أنت مستعد للبدء؟</p>
            <h2 className="sol-bridge-title v-prompt">اكتشف خطط Uvibes الخاصة بنا</h2>
            <p className="sol-bridge-sub">
              خطط تناسب كل مجموعة، بالإضافة إلى عرض تجريبي لمدة 30 يومًا لتجربتها دون أي التزام.
            </p>
            <Link href="/ar/pricing" className="btn-brand sol-bridge-cta">
              عرض الخطط والأسعار ←
            </Link>
          </section>
          <Footer locale="ar" />
        </div>
      </main>
    </>
  );
}
