import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DevisToggle from "@/components/admin/DevisToggle";
import DevisNumeroSetting from "@/components/admin/DevisNumeroSetting";

const STATUT_BADGE: Record<string, string> = {
  BROUILLON: "--brouillon", ENVOYE: "--envoye", VU: "--envoye",
  SIGNE: "--signe", REFUSE: "--refuse", EXPIRE: "--expire",
};
const STATUT_LABEL: Record<string, string> = {
  BROUILLON: "Brouillon", ENVOYE: "Envoyé", VU: "Consulté",
  SIGNE: "Signé ✓", REFUSE: "Refusé", EXPIRE: "Expiré",
};

interface Props { searchParams: Promise<{ q?: string; statut?: string; page?: string }> }

export default async function DevisListPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.q ?? "";
  const statut = params.statut ?? "";
  const page = Number(params.page ?? 1);
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (statut) where.statut = statut;
  if (search) where.OR = [
    { numero: { contains: search } },
    { collectif: { nom: { contains: search } } },
    { collectif: { email: { contains: search } } },
  ];

  const [total, items] = await Promise.all([
    prisma.quote.count({ where }),
    prisma.quote.findMany({
      where,
      include: { collectif: { select: { nom: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const pages = Math.ceil(total / limit);
  const devisDisabled = (await prisma.cmsContent.findUnique({ where: { cle: "devis-disabled" } }))?.valeur === "true";
  const prochainNumero = (await prisma.cmsContent.findUnique({ where: { cle: "devis-prochain-numero" } }))?.valeur ?? "";

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Devis ({total})</span>
        <Link href="/admin/devis/nouveau" className="crm-btn --primary --sm">+ Nouveau devis</Link>
      </div>

      <div className="crm-content">
        <div className="crm-detail-card" style={{ marginBottom: 20, display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div>
            <p className="crm-detail-section-title">Demandes de devis depuis le site</p>
            <DevisToggle active={devisDisabled} />
          </div>
          <div>
            <p className="crm-detail-section-title">Numérotation</p>
            <DevisNumeroSetting initial={prochainNumero || "D2600001"} />
          </div>
        </div>

        <div className="crm-table-wrap">
          <div className="crm-table-header">
            <form style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input name="q" defaultValue={search} className="crm-search" placeholder="Rechercher..." />
              <select name="statut" defaultValue={statut} className="crm-search" style={{ minWidth: 140 }}>
                <option value="">Tous les statuts</option>
                {Object.entries(STATUT_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              <button type="submit" className="crm-btn --outline --sm">Filtrer</button>
              {(search || statut) && (
                <Link href="/admin/devis" className="crm-btn --outline --sm">✕ Reset</Link>
              )}
            </form>
          </div>

          <table className="crm-table">
            <thead>
              <tr>
                <th>Numéro</th><th>Collectif</th><th>Plan</th>
                <th>Prix HT</th><th>Statut</th><th>Date</th><th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 32, color: "var(--crm-muted)" }}>
                  Aucun devis trouvé
                </td></tr>
              )}
              {items.map((q) => (
                <tr key={q.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{q.numero}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{q.collectif.nom}</div>
                    <div style={{ fontSize: 11, color: "var(--crm-muted)" }}>{q.collectif.email}</div>
                  </td>
                  <td style={{ fontSize: 12 }}>{q.planNom}</td>
                  <td style={{ fontWeight: 600 }}>
                    {q.prixHT.toLocaleString("fr-FR")} €
                    {q.promoPercent && q.promoPercent > 0 ? (
                      <span title={q.promoCode ? `Code ${q.promoCode}` : "Remise"} style={{ display: "inline-block", marginLeft: 6, fontSize: 11, fontWeight: 600, color: "var(--rose, #D90A5C)" }}>
                        −{q.promoPercent}%
                      </span>
                    ) : null}
                  </td>
                  <td>
                    <span className={`crm-badge ${STATUT_BADGE[q.statut] ?? "--brouillon"}`}>
                      {STATUT_LABEL[q.statut] ?? q.statut}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--crm-muted)" }}>
                    {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <Link href={`/admin/devis/${q.id}`} className="crm-btn --outline --sm">Voir</Link>
                    <Link href={`/devis/${q.id}`} className="crm-btn --outline --sm" target="_blank">↗</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pages > 1 && (
            <div style={{ padding: "12px 20px", display: "flex", gap: 8, justifyContent: "center" }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/admin/devis?page=${p}&q=${search}&statut=${statut}`}
                  className={`crm-btn --sm ${p === page ? "--primary" : "--outline"}`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
