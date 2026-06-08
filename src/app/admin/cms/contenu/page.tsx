import { prisma } from "@/lib/prisma";
import CmsContentManager from "@/components/admin/CmsContentManager";

export default async function CmsContenuPage() {
  const items = await prisma.cmsContent.findMany({ orderBy: { cle: "asc" } });
  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Contenus éditoriaux</span>
      </div>
      <div className="crm-content">
        <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
          Ces contenus remplacent les données WordPress. Modifiez et sauvegardez ligne par ligne.
        </p>
        <CmsContentManager items={items} />
      </div>
    </>
  );
}
