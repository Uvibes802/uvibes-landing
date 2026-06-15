import { prisma } from "@/lib/prisma";
import DocumentsManager, { type DocItem } from "@/components/admin/DocumentsManager";

export default async function DocumentsPage() {
  let docs: Awaited<ReturnType<typeof prisma.businessDoc.findMany>> = [];
  let dbError = false;

  try {
    docs = await prisma.businessDoc.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  const initial: DocItem[] = docs.map((d) => ({
    id: d.id,
    numero: d.numero,
    type: d.type,
    clientNom: d.clientNom,
    clientContact: d.clientContact,
    clientEmail: d.clientEmail,
    clientAdresse: d.clientAdresse,
    objet: d.objet,
    dateEmission: d.dateEmission.toISOString(),
    dateEcheance: d.dateEcheance ? d.dateEcheance.toISOString() : null,
    lignes: JSON.parse(d.lignesJson || "[]"),
    corps: d.corps,
    conditions: d.conditions,
    tauxTva: d.tauxTva,
    statut: d.statut,
  }));

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Contrats &amp; factures</span>
        <span className="crm-topbar-user">{initial.length} document{initial.length > 1 ? "s" : ""}</span>
      </div>
      <div className="crm-content">
        {dbError && (
          <div style={{ padding: "1rem", background: "#fff3cd", borderRadius: 8, marginBottom: 16, color: "#856404", fontSize: 14 }}>
            ⚠️ Impossible de se connecter à la base de données.
          </div>
        )}
        <DocumentsManager initial={initial} />
      </div>
    </>
  );
}
