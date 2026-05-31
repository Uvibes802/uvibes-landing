import { prisma } from "@/lib/prisma";
import CrudManager from "@/components/admin/CrudManager";

export default async function TemoignagesPage() {
  const items = await prisma.testimony.findMany({ orderBy: { ordre: "asc" } });
  return (
    <>
      <div className="crm-topbar"><span className="crm-topbar-title">Témoignages</span></div>
      <div className="crm-content">
        <CrudManager
          items={items}
          apiBase="/api/admin/cms/testimonials"
          fields={[
            { key: "auteur", label: "Auteur", required: true },
            { key: "role", label: "Rôle & Entreprise" },
            { key: "texte", label: "Citation", multiline: true, required: true },
          ]}
          displayField="auteur"
          toggleField="actif"
        />
      </div>
    </>
  );
}
