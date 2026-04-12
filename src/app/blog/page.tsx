"use client";

import { HeroBanner } from "@/components/banner/heroBanner";
import AllArticle from "@/components/blog/allArticle";
import Footer from "@/components/footer/Footer";
import FloatingMenu from "@/components/menu/Menu";
const mockupBlog = "/images/mockupBlog.png";
export default function BlogPage() {
  return (
    <>
      <HeroBanner
        subtitle=""
        title={"Explorez\ndes\u00A0contenus\ninspirants"}
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
