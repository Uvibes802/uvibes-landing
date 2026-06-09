import AllArticle from "@/components/blog/allArticle";
import Footer from "@/components/footer/Footer";
import WaveSeparator from "@/components/shared/WaveSeparator";
import JsonLd from "@/components/JsonLd";
import VibrationLine from "@/components/shared/VibrationLine";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import "../../styles/page/blog.css";

export const metadata: Metadata = buildMetadata("blog");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Hero blog ── */}
      <section className="blog-hero">
        {/* Blobs */}
        <div className="blog-hero-blob blog-hero-blob--a" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--b" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--c" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--d" aria-hidden="true" />

        {/* Particules flottantes CSS-only */}
        <div className="blog-hero-particles" aria-hidden="true">
          <span className="bhp bhp--1" />
          <span className="bhp bhp--2" />
          <span className="bhp bhp--3" />
          <span className="bhp bhp--4" />
          <span className="bhp bhp--5" />
          <span className="bhp bhp--6" />
          <span className="bhp bhp--7" />
          <span className="bhp bhp--8" />
        </div>

        {/* Anneaux animés */}
        <div className="blog-hero-rings" aria-hidden="true">
          <span className="bhr bhr--1" />
          <span className="bhr bhr--2" />
          <span className="bhr bhr--3" />
        </div>

        <div className="blog-hero-inner">
          <p className="blog-hero-eyebrow">Le blog Uvibes · Idées & conversations</p>
          <h1 className="blog-hero-title v-prompt">
            Explorez<br />
            <em className="blog-hero-em">des contenus</em>
            <br />inspirants
          </h1>
          <p className="blog-hero-sub">
            Pour enrichir vos échanges, vos idées et vos réflexions.
          </p>
        </div>

        {/* VibrationLines bas */}
        <div className="blog-hero-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={7} stroke="rgba(255,255,255,.35)" strokeWidth={2} speed={16} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={11} stroke="rgba(255,255,255,.2)" strokeWidth={1.5} speed={22} />
          <VibrationLine width={1800} height={50} amplitude={8}  freq={15} stroke="rgba(255,255,255,.12)" strokeWidth={1} speed={30} />
        </div>
        {/* Séparateur wavy animé en bas du hero */}
        <WaveSeparator position="bottom" />
      </section>

      <section className="blog-content">
        <AllArticle />
      </section>

      <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 15%, #FF80B0 45%, #E6007E 70%, #D90A5C 100%)", position: "relative", overflow: "hidden", paddingTop: "100px" }}>
        {/* Séparateur wavy animé (cohérent avec les autres sections) */}
        <WaveSeparator position="top" />
        <Footer />
      </div>
    </>
  );
}
