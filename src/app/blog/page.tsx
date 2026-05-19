import { HeroBanner } from "@/components/banner/heroBanner";
import AllArticle from "@/components/blog/allArticle";
import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import FloatingMenu from "@/components/menu/Menu";
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

const mockupBlog = "/images/mockupBlog.png";

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <HeroBanner
        subtitle=""
        title={"Explorez\ndes contenus\ninspirants"}
        description="Pour enrichir vos échanges, vos idées et vos réflexions"
        image={mockupBlog}
        alt="Fonctionnalités de l'application"
        className="blog-hero"
      />
      <nav>
        <FloatingMenu />
      </nav>
      <section className="blog-section">
        <AllArticle />
      </section>
      <Footer />
    </>
  );
}
