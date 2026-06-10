import { prisma } from "@/lib/prisma";
import BlogManager from "@/components/admin/BlogManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const rows = await prisma.article.findMany({ orderBy: { publishedAt: "desc" } });
  const articles = rows.map((a) => ({
    id: a.id,
    slug: a.slug,
    titre: a.titre,
    excerpt: a.excerpt,
    contenu: a.contenu,
    imageUrl: a.imageUrl,
    categorie: a.categorie,
    categorieLabel: a.categorieLabel,
    auteur: a.auteur,
    seoTitre: a.seoTitre,
    seoDescription: a.seoDescription,
    publishedAt: a.publishedAt.toISOString(),
    featured: a.featured,
    actif: a.actif,
  }));

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Blog — articles</span>
      </div>
      <div className="crm-content">
        <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
          Rédige et gère les articles du blog avec l&apos;éditeur riche. Les modifications
          apparaissent immédiatement sur le site.
        </p>
        <BlogManager articles={articles} />
      </div>
    </>
  );
}
