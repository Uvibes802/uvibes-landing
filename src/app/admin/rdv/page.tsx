import { prisma } from "@/lib/prisma";
import RdvManager from "@/components/admin/RdvManager";

export default async function RdvPage() {
  const [reservations, disponibilites] = await Promise.all([
    prisma.rdvReservation.findMany({ orderBy: [{ date: "asc" }, { heure: "asc" }] }),
    prisma.rdvDisponibilite.findMany({ orderBy: { jourSemaine: "asc" } }),
  ]);

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Rendez-vous</span>
      </div>
      <div className="crm-content">
        <RdvManager reservations={reservations} disponibilites={disponibilites} />
      </div>
    </>
  );
}
