import ArticleContent from "@/components/blog/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/services/blog/getArticles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ISR : article régénéré au plus toutes les 60 s (revalidatePath immédiat à l'édition admin)
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return { title: "Article introuvable" };

  const description = a.seoDescription || a.excerpt || undefined;
  return {
    // seoTitre = titre Yoast complet (déjà suffixé) → absolute pour éviter le double "| Uvibes"
    title: a.seoTitre ? { absolute: a.seoTitre } : a.titre,
    description,
    openGraph: {
      title: a.seoTitre || a.titre,
      description,
      images: a.imageUrl ? [a.imageUrl] : undefined,
    },
    twitter: {
      title: a.seoTitre || a.titre,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return notFound();
  return <ArticleContent article={article} />;
}
