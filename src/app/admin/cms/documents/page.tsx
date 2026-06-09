import { prisma } from "@/lib/prisma";
import LegalDocsManager from "@/components/admin/LegalDocsManager";
import { LEGAL_DOC_SLUGS, LEGAL_DOCS } from "@/lib/legalDocs";

export const dynamic = "force-dynamic";

export default async function CmsDocumentsPage() {
  const existing = await prisma.legalDocument.findMany();
  const bySlug = new Map(existing.map((d) => [d.slug, d]));

  // On présente les 4 documents attendus dans l'ordre du registre, même si le seed n'a pas encore tourné
  const docs = LEGAL_DOC_SLUGS.map((slug) => {
    const d = bySlug.get(slug);
    return {
      slug,
      titre: d?.titre ?? LEGAL_DOCS[slug].titre,
      version: d?.version ?? "30 mai 2026",
      contenu: d?.contenu ?? "",
      updatedAt: d?.updatedAt ?? new Date(),
    };
  });

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Documents contractuels</span>
      </div>
      <div className="crm-content">
        <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
          Modifiez ici les documents que le client accepte à la signature d&apos;un devis :
          CGV, accord de traitement des données, annexe niveau de service et politique de
          protection des données. Chaque document possède sa page publique.
        </p>
        <LegalDocsManager docs={docs} />
      </div>
    </>
  );
}
