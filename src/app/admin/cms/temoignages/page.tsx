import { prisma } from "@/lib/prisma";
import CrudManager from "@/components/admin/CrudManager";
import SyncWpButton from "@/components/admin/SyncWpButton";

export default async function TemoignagesPage() {
  const items = await prisma.testimony.findMany({ orderBy: { ordre: "asc" } });
  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Témoignages ({items.length})</span>
        <SyncWpButton endpoint="/api/admin/cms/testimonials/sync-wp" label="Sync WordPress" />
      </div>
      <div className="crm-content">
        <CrudManager
          items={items}
          apiBase="/api/admin/cms/testimonials"
          fields={[
            { key: "auteur", label: "Auteur", required: true },
            { key: "role", label: "Rôle & Entreprise" },
            { key: "texte", label: "Citation", multiline: true, required: true },
            { key: "photoUrl", label: "Photo du commentateur", type: "image" },
            { key: "logoUrl", label: "Logo de l'organisation", type: "image" },
          ]}
          displayField="auteur"
          toggleField="actif"
        />
      </div>
    </>
  );
}
