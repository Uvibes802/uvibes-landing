import AllArticle from "@/components/blog/allArticle";
import Footer from "@/components/footer/Footer";
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

      {/* ── Hero blog — blobs turquoise/corail/rose — palette distincte ── */}
      <section className="blog-hero">
        {/* Blobs : couleur dominante cyan/turquoise = ID visuel unique au blog */}
        <div className="blog-hero-blob blog-hero-blob--a" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--b" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--c" aria-hidden="true" />
        <div className="blog-hero-blob blog-hero-blob--d" aria-hidden="true" />

        <div className="blog-hero-inner">
          <p className="blog-hero-eyebrow">Le blog Uvibes · Idées & conversations</p>
          <h1 className="blog-hero-title v-prompt">
            Explorez<br />
            <em className="blog-hero-em v-serif">des contenus</em>
            <br />inspirants
          </h1>
          <p className="blog-hero-sub">
            Pour enrichir vos échanges, vos idées et vos réflexions.
          </p>
        </div>

        {/* VibrationLine bas */}
        <div className="blog-hero-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={20} freq={8} stroke="rgba(255,255,255,.28)" strokeWidth={1.5} speed={18} />
          <VibrationLine width={1800} height={50} amplitude={12} freq={13} stroke="rgba(255,255,255,.16)" strokeWidth={1} speed={25} />
        </div>
      </section>

      <section className="blog-content">
        <AllArticle />
      </section>

      <Footer />
    </>
  );
}
