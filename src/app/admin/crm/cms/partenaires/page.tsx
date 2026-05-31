import { prisma } from "@/lib/prisma";
import CrudManager from "@/components/admin/CrudManager";

export default async function PartenairesPage() {
  const items = await prisma.partner.findMany({ orderBy: { ordre: "asc" } });
  return (
    <>
      <div className="crm-topbar"><span className="crm-topbar-title">Partenaires</span></div>
      <div className="crm-content">
        <CrudManager
          items={items}
          apiBase="/api/admin/cms/partners"
          fields={[
            { key: "nom", label: "Nom", required: true },
            { key: "logoUrl", label: "URL du logo", required: true },
            { key: "siteUrl", label: "Site web" },
          ]}
          displayField="nom"
          toggleField="actif"
        />
      </div>
    </>
  );
}
