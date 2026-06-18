import { prisma } from "@/lib/prisma";
import { requiredDocsForPlan } from "@/lib/legalDocs";

// Documents contractuels à joindre au PDF d'un devis : ceux acceptés à la signature
// si présents, sinon ceux requis par l'offre. Contenu lu en base (LegalDocument),
// éditable depuis /admin/cms/documents.
export async function fetchLegalDocsForQuote(quote: {
  planSlug: string;
  acceptedDocs?: string | null;
}): Promise<{ slug: string; titre: string; version: string; contenu: string }[]> {
  let slugs: string[] = [];
  try {
    const arr = JSON.parse(quote.acceptedDocs || "[]");
    if (Array.isArray(arr) && arr.length) slugs = arr;
  } catch {
    /* JSON invalide → on retombe sur les docs requis par l'offre */
  }
  if (!slugs.length) slugs = requiredDocsForPlan(quote.planSlug);

  const docs = await prisma.legalDocument.findMany({ where: { slug: { in: slugs } } });
  // Conserver l'ordre logique des slugs (CGV puis DPA/SLA, ou CGV-essai puis PDD)
  return slugs
    .map((s) => docs.find((d) => d.slug === s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({ slug: d.slug, titre: d.titre, version: d.version, contenu: d.contenu }));
}
