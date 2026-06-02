import AllArticle from "@/components/blog/allArticle";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

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

      {/* Hero blog vivid */}
      <section style={{
        background: "linear-gradient(135deg, #FD6E00 0%, #FF7040 20%, #FF5888 55%, #D90A5C 100%)",
        padding: "calc(var(--nav-height) + 4rem) clamp(1.5rem, 5vw, 3.5rem) 5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "52vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-roboto-mono), monospace", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,.7)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Le blog Uvibes · Idées & conversations
          </p>
          <h1 style={{ fontFamily: "var(--font-prompt), sans-serif", fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", margin: "0 0 1.5rem" }}>
            Explorez<br />
            <span style={{ fontStyle: "italic", fontFamily: "var(--font-instrument), serif", fontWeight: 400 }}>
              des contenus
            </span>
            <br />inspirants
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(255,255,255,.85)", lineHeight: 1.65, margin: 0 }}>
            Pour enrichir vos échanges, vos idées et vos réflexions.
          </p>
        </div>
        {/* Anneaux déco */}
        <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", border: "2px solid rgba(255,255,255,.12)", animation: "uvSpin 28s linear infinite", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -70, left: -50, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      </section>

      <section style={{ background: "var(--paper)", padding: "clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 3.5rem)", minHeight: "60vh" }}>
        <AllArticle />
      </section>

      <Footer />
    </>
  );
}
