import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PipelineBoard, { type PipeCard } from "@/components/admin/PipelineBoard";

export default async function PipelinePage() {
  const collectifs = await prisma.collectif.findMany({
    orderBy: { updatedAt: "desc" },
    include: { quotes: { select: { prixHT: true } } },
  });

  const cards: PipeCard[] = collectifs.map((c) => ({
    id: c.id,
    nom: c.nom,
    contact: c.contact,
    ville: c.ville,
    statut: c.statut,
    ca: c.quotes.reduce((s, q) => s + q.prixHT, 0),
    devisCount: c.quotes.length,
  }));

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Pipeline commercial</span>
        <Link href="/admin/collectifs/nouveau" className="crm-btn --primary --sm">+ Nouveau collectif</Link>
      </div>

      <div className="crm-content">
        <p style={{ fontSize: 12, color: "var(--crm-muted)", margin: "0 0 14px" }}>
          Glissez-déposez une fiche d&apos;une colonne à l&apos;autre pour changer son statut.
        </p>
        <PipelineBoard initial={cards} />
      </div>
    </>
  );
}
