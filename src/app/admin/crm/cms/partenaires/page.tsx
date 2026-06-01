import { prisma } from "@/lib/prisma";
import CrudManager from "@/components/admin/CrudManager";
import SyncWpButton from "@/components/admin/SyncWpButton";

export default async function PartenairesPage() {
  const items = await prisma.partner.findMany({ orderBy: { ordre: "asc" } });
  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Partenaires ({items.length})</span>
        <SyncWpButton />
      </div>
      <div className="crm-content">
        {items.length === 0 && (
          <div style={{ marginBottom: 16, padding: "12px 18px", background: "rgba(253,110,0,.07)", border: "1px solid rgba(253,110,0,.2)", borderRadius: 10, fontSize: 13, color: "var(--crm-accent)" }}>
            Aucun partenaire en DB — clique sur <strong>Sync WordPress</strong> pour importer les logos depuis WordPress.
          </div>
        )}
        <CrudManager
          items={items}
          apiBase="/api/admin/cms/partners"
          fields={[
            { key: "nom", label: "Nom", required: true },
            { key: "logoUrl", label: "URL du logo", required: true, type: "image" },
            { key: "siteUrl", label: "Site web" },
          ]}
          displayField="nom"
          toggleField="actif"
        />
      </div>
    </>
  );
}
