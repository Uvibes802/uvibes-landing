import { prisma } from "@/lib/prisma";
import EquipeManager from "@/components/admin/EquipeManager";
import SyncWpButton from "@/components/admin/SyncWpButton";

export default async function EquipePage() {
  const [members, catEntry] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: [{ equipe: "asc" }, { ordre: "asc" }] }),
    prisma.cmsContent.findUnique({ where: { cle: "team-categories" } }),
  ]);

  let categories: string[] = ["Direction", "Tech", "Commercial"];
  if (catEntry?.valeur) {
    try { categories = JSON.parse(catEntry.valeur); } catch { /* keep default */ }
  }

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Équipe ({members.length})</span>
        <SyncWpButton endpoint="/api/admin/cms/team/sync-wp" label="Sync WordPress" />
      </div>
      <div className="crm-content">
        <EquipeManager members={members} categories={categories} />
      </div>
    </>
  );
}
