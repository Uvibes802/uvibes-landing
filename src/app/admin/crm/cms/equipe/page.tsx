import { prisma } from "@/lib/prisma";
import CrudManager from "@/components/admin/CrudManager";

const EQUIPES = [
  { slug: "equipe-projet", label: "Équipe projet" },
  { slug: "comite-expertise", label: "Comité d'expertise" },
  { slug: "les-architectes-du-code", label: "Architectes du code" },
];

export default async function EquipePage() {
  const members = await prisma.teamMember.findMany({ orderBy: [{ equipe: "asc" }, { ordre: "asc" }] });

  return (
    <>
      <div className="crm-topbar"><span className="crm-topbar-title">Équipe</span></div>
      <div className="crm-content">
        {EQUIPES.map(({ slug, label }) => (
          <div key={slug} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--crm-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              {label}
            </h3>
            <CrudManager
              items={members.filter((m) => m.equipe === slug)}
              apiBase="/api/admin/cms/team"
              defaultValues={{ equipe: slug }}
              fields={[
                { key: "nom", label: "Nom", required: true },
                { key: "poste", label: "Poste", required: true },
                { key: "photoUrl", label: "URL photo" },
              ]}
              displayField="nom"
              toggleField="actif"
            />
          </div>
        ))}
      </div>
    </>
  );
}
