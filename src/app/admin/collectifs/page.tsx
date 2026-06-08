import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUT_BADGE: Record<string, string> = {
  PROSPECT: "--prospect", QUALIFICATION: "--envoye", DEVIS_ENVOYE: "--envoye",
  NEGOCIATION: "--envoye", CLIENT: "--client", PERDU: "--refuse", INACTIF: "--brouillon",
};

interface Props { searchParams: Promise<{ q?: string; statut?: string }> }

export default async function CollectifsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.q ?? "";
  const statut = params.statut ?? "";

  const where: Record<string, unknown> = {};
  if (statut) where.statut = statut;
  if (search) where.OR = [
    { nom: { contains: search } },
    { email: { contains: search } },
    { contact: { contains: search } },
  ];

  const items = await prisma.collectif.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { quotes: true } } },
  });

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Collectifs ({items.length})</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="crm-btn --outline --sm" href="/api/admin/collectifs/export">⬇ Export CSV</a>
          <Link href="/admin/collectifs/nouveau" className="crm-btn --primary --sm">+ Nouveau collectif</Link>
        </span>
      </div>

      <div className="crm-content">
        <div className="crm-table-wrap">
          <div className="crm-table-header">
            <form style={{ display: "flex", gap: 10 }}>
              <input name="q" defaultValue={search} className="crm-search" placeholder="Nom, email, contact..." />
              <select name="statut" defaultValue={statut} className="crm-search" style={{ minWidth: 140 }}>
                <option value="">Tous les statuts</option>
                {["PROSPECT","QUALIFICATION","DEVIS_ENVOYE","NEGOCIATION","CLIENT","PERDU","INACTIF"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button type="submit" className="crm-btn --outline --sm">Filtrer</button>
              {(search || statut) && <Link href="/admin/collectifs" className="crm-btn --outline --sm">✕</Link>}
            </form>
          </div>

          <table className="crm-table">
            <thead>
              <tr><th>Organisation</th><th>Contact</th><th>Type</th><th>Taille</th><th>Statut CRM</th><th>Devis</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: "center", padding: 32, color: "var(--crm-muted)" }}>Aucun collectif</td></tr>
              )}
              {items.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.nom}</td>
                  <td>
                    <div>{c.contact}</div>
                    <div style={{ fontSize: 11, color: "var(--crm-muted)" }}>{c.email}</div>
                  </td>
                  <td style={{ fontSize: 12 }}>{c.typeCollectif}</td>
                  <td style={{ fontSize: 12 }}>{c.tailleCollectif}</td>
                  <td><span className={`crm-badge ${STATUT_BADGE[c.statut] ?? "--brouillon"}`}>{c.statut}</span></td>
                  <td style={{ textAlign: "center" }}>{c._count.quotes}</td>
                  <td style={{ fontSize: 12, color: "var(--crm-muted)" }}>{new Date(c.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td><Link href={`/admin/collectifs/${c.id}`} className="crm-btn --outline --sm">Voir</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
