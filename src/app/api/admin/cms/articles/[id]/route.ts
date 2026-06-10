import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { categorieLabel } from "@/lib/blogCategories";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await req.json();

  // Si le slug change, vérifier l'unicité (hors article courant)
  if (b.slug) {
    const clash = await prisma.article.findUnique({ where: { slug: String(b.slug).trim() } });
    if (clash && clash.id !== id) {
      return NextResponse.json({ error: "Ce slug est déjà utilisé par un autre article." }, { status: 400 });
    }
  }

  const article = await prisma.article.update({
    where: { id },
    data: {
      ...(b.slug ? { slug: String(b.slug).trim() } : {}),
      ...(b.titre !== undefined ? { titre: String(b.titre).trim() } : {}),
      ...(b.contenu !== undefined ? { contenu: sanitizeHtml(String(b.contenu)) } : {}),
      ...(b.excerpt !== undefined ? { excerpt: b.excerpt ? String(b.excerpt) : null } : {}),
      ...(b.imageUrl !== undefined ? { imageUrl: b.imageUrl ? String(b.imageUrl) : null } : {}),
      ...(b.categorie !== undefined
        ? { categorie: b.categorie ? String(b.categorie) : null, categorieLabel: categorieLabel(b.categorie) }
        : {}),
      ...(b.auteur !== undefined ? { auteur: b.auteur ? String(b.auteur) : null } : {}),
      ...(b.seoTitre !== undefined ? { seoTitre: b.seoTitre ? String(b.seoTitre) : null } : {}),
      ...(b.seoDescription !== undefined ? { seoDescription: b.seoDescription ? String(b.seoDescription) : null } : {}),
      ...(b.featured !== undefined ? { featured: !!b.featured } : {}),
      ...(b.actif !== undefined ? { actif: !!b.actif } : {}),
      ...(b.publishedAt ? { publishedAt: new Date(b.publishedAt) } : {}),
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  revalidatePath("/");
  return NextResponse.json(article);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
