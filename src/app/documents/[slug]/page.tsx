import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LEGAL_DOCS, LEGAL_DOC_SLUGS, type LegalDocSlug } from "@/lib/legalDocs";
import LegalDocContent from "@/components/legal/LegalDocContent";
import "@/styles/legal/legal.css";

interface Props {
  params: Promise<{ slug: string }>;
}

// ISR : régénéré au plus toutes les 60 s ; l'édition admin force un revalidatePath immédiat
export const revalidate = 60;

function isLegalSlug(slug: string): slug is LegalDocSlug {
  return (LEGAL_DOC_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return { title: "Document introuvable" };
  const doc = await prisma.legalDocument.findUnique({ where: { slug } });
  const titre = doc?.titre ?? LEGAL_DOCS[slug].titre;
  return {
    title: titre,
    description: `${titre} — document contractuel Uvibes.`,
  };
}

export default async function DocumentLegalPage({ params }: Props) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  const doc = await prisma.legalDocument.findUnique({ where: { slug } });
  if (!doc) notFound();

  return (
    <main className="legal-page">
      <div className="legal-hero">
        <p className="legal-hero-eyebrow">Document contractuel</p>
        <h1 className="legal-hero-title">{doc.titre}</h1>
      </div>
      <div className="legal-content-card">
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 0 }}>
          Version du {doc.version} · mise à jour le{" "}
          {new Date(doc.updatedAt).toLocaleDateString("fr-FR")}
        </p>

        <LegalDocContent contenu={doc.contenu} />

        <footer>
          <p>
            <em>
              Pour toute question relative à ce document, contactez-nous à{" "}
              <a href="mailto:contact@uvibes.fr">contact@uvibes.fr</a>.
            </em>
          </p>
        </footer>
      </div>
    </main>
  );
}
