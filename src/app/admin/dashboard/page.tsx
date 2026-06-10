import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Colonnes du pipeline (même ordre/couleurs que la page Pipeline)
const PIPE: { statut: string; label: string; couleur: string }[] = [
  { statut: "PROSPECT", label: "Prospect", couleur: "#9ca3af" },
  { statut: "QUALIFICATION", label: "Qualif.", couleur: "#00AFDD" },
  { statut: "DEVIS_ENVOYE", label: "Devis", couleur: "#FD6E00" },
  { statut: "NEGOCIATION", label: "Négo.", couleur: "#E6007E" },
  { statut: "CLIENT", label: "Client", couleur: "#16a34a" },
];

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

  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const [totalDevis, devisSigne, devisMois, collectifsTotal, lastDevis, pipeGroups, relances] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { statut: "SIGNE" } }),
    prisma.quote.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.collectif.count(),
    prisma.quote.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { collectif: { select: { nom: true } } },
    }),
    // Répartition du pipeline par statut
    prisma.collectif.groupBy({ by: ["statut"], _count: { _all: true } }),
    // Prochaines relances (non faites, échéance < demain), en retard d'abord
    prisma.task.findMany({
      where: { done: false, dueDate: { lt: startOfTomorrow } },
      orderBy: { dueDate: "asc" },
      take: 6,
      include: { collectif: { select: { id: true, nom: true } } },
    }),
  ]);

  const pipeCount = (s: string) => pipeGroups.find((g) => g.statut === s)?._count._all ?? 0;

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

        {/* Relances + Pipeline */}
        <div className="crm-detail-grid" style={{ marginBottom: 20 }}>
          {/* Relances à traiter */}
          <div className="crm-detail-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p className="crm-detail-section-title" style={{ margin: 0 }}>Relances à traiter</p>
              <Link href="/admin/taches" className="crm-btn --outline --sm">Voir tout →</Link>
            </div>
            {relances.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Aucune relance en attente 🎉</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {relances.map((t) => {
                  const late = t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString());
                  return (
                    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: late ? "#dc2626" : "var(--crm-accent)", flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 13.5 }}>{t.titre}</span>
                      {t.collectif && (
                        <Link href={`/admin/collectifs/${t.collectif.id}`} style={{ fontSize: 11.5, color: "var(--crm-accent)" }}>{t.collectif.nom}</Link>
                      )}
                      <span style={{ fontSize: 11.5, color: late ? "#dc2626" : "var(--crm-muted)", fontWeight: late ? 600 : 400, whiteSpace: "nowrap" }}>
                        {t.dueDate ? new Date(t.dueDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Aperçu pipeline */}
          <div className="crm-detail-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p className="crm-detail-section-title" style={{ margin: 0 }}>Pipeline</p>
              <Link href="/admin/pipeline" className="crm-btn --outline --sm">Ouvrir →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PIPE.map((p) => (
                <div key={p.statut} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.couleur, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13.5 }}>{p.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{pipeCount(p.statut)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Derniers devis */}
        <div className="crm-table-wrap">
          <div className="crm-table-header">
            <span className="crm-table-title">Derniers devis</span>
            <Link href="/admin/devis" className="crm-btn --outline --sm">Voir tout →</Link>
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
                    <Link href={`/admin/devis/${q.id}`} className="crm-btn --outline --sm">Voir</Link>
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
