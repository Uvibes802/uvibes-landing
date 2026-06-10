import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { categorieLabel, slugify } from "@/lib/blogCategories";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

// Routes protégées par le middleware (/api/admin/*).

export async function GET() {
  const articles = await prisma.article.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const titre = String(b.titre ?? "").trim();
  if (!titre) return NextResponse.json({ error: "Le titre est requis" }, { status: 400 });

  let slug = String(b.slug ?? "").trim() || slugify(titre);
  if (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const article = await prisma.article.create({
    data: {
      slug,
      titre,
      contenu: sanitizeHtml(String(b.contenu ?? "")),
      excerpt: b.excerpt ? String(b.excerpt) : null,
      imageUrl: b.imageUrl ? String(b.imageUrl) : null,
      categorie: b.categorie ? String(b.categorie) : null,
      categorieLabel: categorieLabel(b.categorie),
      auteur: b.auteur ? String(b.auteur) : null,
      seoTitre: b.seoTitre ? String(b.seoTitre) : null,
      seoDescription: b.seoDescription ? String(b.seoDescription) : null,
      featured: !!b.featured,
      actif: b.actif !== false,
      publishedAt: b.publishedAt ? new Date(b.publishedAt) : new Date(),
    },
  });

  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json(article, { status: 201 });
}
