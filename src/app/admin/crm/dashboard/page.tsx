import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUT_BADGE: Record<string, string> = {
  BROUILLON: "--brouillon", ENVOYE: "--envoye", VU: "--envoye",
  SIGNE: "--signe", REFUSE: "--refuse", EXPIRE: "--expire",
};
const STATUT_LABEL: Record<string, string> = {
  BROUILLON: "Brouillon", ENVOYE: "Envoyé", VU: "Consulté",
  SIGNE: "Signé", REFUSE: "Refusé", EXPIRE: "Expiré",
};

export default async function DashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalDevis, devisSigne, devisMois, collectifsTotal, lastDevis] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { statut: "SIGNE" } }),
    prisma.quote.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.collectif.count(),
    prisma.quote.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { collectif: { select: { nom: true } } },
    }),
  ]);

  const tauxConversion = totalDevis > 0 ? Math.round((devisSigne / totalDevis) * 100) : 0;

  // CA prévisionnel (somme HT des devis signés)
  const caSigne = await prisma.quote.aggregate({
    where: { statut: "SIGNE" },
    _sum: { prixHT: true },
  });

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Dashboard</span>
        <Link href="/devis" className="crm-btn --primary --sm" target="_blank">
          + Créer un devis test
        </Link>
      </div>

      <div className="crm-content">
        {/* Métriques */}
        <div className="crm-metrics">
          <div className="crm-metric-card --orange">
            <div className="crm-metric-label">Devis ce mois</div>
            <div className="crm-metric-value">{devisMois}</div>
            <div className="crm-metric-sub">depuis le 1er du mois</div>
          </div>
          <div className="crm-metric-card --green">
            <div className="crm-metric-label">Devis signés</div>
            <div className="crm-metric-value">{devisSigne}</div>
            <div className="crm-metric-sub">sur {totalDevis} au total</div>
          </div>
          <div className="crm-metric-card">
            <div className="crm-metric-label">Taux conversion</div>
            <div className="crm-metric-value">{tauxConversion}%</div>
            <div className="crm-metric-sub">{devisSigne} / {totalDevis} devis</div>
          </div>
          <div className="crm-metric-card --rose">
            <div className="crm-metric-label">CA signé (HT)</div>
            <div className="crm-metric-value" style={{ fontSize: 22 }}>
              {(caSigne._sum.prixHT ?? 0).toLocaleString("fr-FR")} €
            </div>
            <div className="crm-metric-sub">{collectifsTotal} collectifs</div>
          </div>
        </div>

        {/* Derniers devis */}
        <div className="crm-table-wrap">
          <div className="crm-table-header">
            <span className="crm-table-title">Derniers devis</span>
            <Link href="/admin/crm/devis" className="crm-btn --outline --sm">Voir tout →</Link>
          </div>
          <table className="crm-table">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Collectif</th>
                <th>Plan</th>
                <th>Prix HT</th>
                <th>Statut</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lastDevis.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--crm-muted)", padding: 32 }}>
                  Aucun devis pour l&apos;instant. <Link href="/devis" style={{ color: "var(--crm-accent)" }}>Créer le premier →</Link>
                </td></tr>
              )}
              {lastDevis.map((q) => (
                <tr key={q.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 12 }}>{q.numero}</td>
                  <td style={{ fontWeight: 500 }}>{q.collectif.nom}</td>
                  <td style={{ fontSize: 12 }}>{q.planNom}</td>
                  <td style={{ fontWeight: 600 }}>{q.prixHT.toLocaleString("fr-FR")} €</td>
                  <td>
                    <span className={`crm-badge ${STATUT_BADGE[q.statut] ?? "--brouillon"}`}>
                      {STATUT_LABEL[q.statut] ?? q.statut}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--crm-muted)" }}>
                    {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                    <Link href={`/admin/crm/devis/${q.id}`} className="crm-btn --outline --sm">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
