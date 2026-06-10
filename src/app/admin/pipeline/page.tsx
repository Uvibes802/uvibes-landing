import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Colonnes du pipeline commercial (même ordre que le cycle de vente)
const COLONNES: { statut: string; label: string; couleur: string }[] = [
  { statut: "PROSPECT", label: "Prospect", couleur: "#9ca3af" },
  { statut: "QUALIFICATION", label: "Qualification", couleur: "#00AFDD" },
  { statut: "DEVIS_ENVOYE", label: "Devis envoyé", couleur: "#FD6E00" },
  { statut: "NEGOCIATION", label: "Négociation", couleur: "#E6007E" },
  { statut: "CLIENT", label: "Client", couleur: "#16a34a" },
  { statut: "PERDU", label: "Perdu", couleur: "#dc2626" },
];

export default async function PipelinePage() {
  const collectifs = await prisma.collectif.findMany({
    orderBy: { updatedAt: "desc" },
    include: { quotes: { select: { prixHT: true, statut: true } } },
  });

  // Regroupe par statut ; les statuts hors colonnes (INACTIF) ne s'affichent pas dans le board
  const parStatut = (s: string) => collectifs.filter((c) => c.statut === s);

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Pipeline commercial</span>
        <Link href="/admin/collectifs/nouveau" className="crm-btn --primary --sm">+ Nouveau collectif</Link>
      </div>

      <div className="crm-content">
        <div className="crm-pipeline">
          {COLONNES.map((col) => {
            const items = parStatut(col.statut);
            return (
              <div key={col.statut} className="crm-pipe-col">
                <div className="crm-pipe-col-head" style={{ borderTopColor: col.couleur }}>
                  <span className="crm-pipe-col-title">{col.label}</span>
                  <span className="crm-pipe-col-count">{items.length}</span>
                </div>
                <div className="crm-pipe-col-body">
                  {items.length === 0 && <p className="crm-pipe-empty">—</p>}
                  {items.map((c) => {
                    const ca = c.quotes.reduce((s, q) => s + q.prixHT, 0);
                    return (
                      <Link key={c.id} href={`/admin/collectifs/${c.id}`} className="crm-pipe-card">
                        <span className="crm-pipe-card-nom">{c.nom}</span>
                        <span className="crm-pipe-card-sub">{c.contact}{c.ville ? ` · ${c.ville}` : ""}</span>
                        {c.quotes.length > 0 && (
                          <span className="crm-pipe-card-ca">{ca.toLocaleString("fr-FR")} € · {c.quotes.length} devis</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
