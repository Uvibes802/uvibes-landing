import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildIcsCalendar } from "@/lib/ics";

// Flux d'abonnement iCalendar des rendez-vous (la directrice s'y abonne une fois
// dans son agenda Apple/Google → tous les RDV s'affichent et se mettent à jour seuls).
// Protégé par un token (?token=) car non couvert par le middleware admin :
// un abonnement calendrier ne peut pas envoyer de cookie de session.
// URL d'abonnement : webcal://<host>/api/rdv/calendar?token=<CRON_SECRET>
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const rdvs = await prisma.rdvReservation.findMany({
    where: { statut: { not: "ANNULE" } },
    orderBy: { date: "asc" },
  });

  const ics = buildIcsCalendar(
    rdvs.map((r) => ({
      uid: r.id,
      date: r.date,
      heure: r.heure,
      titre: `RDV Uvibes — ${r.nom}${r.statut === "EN_ATTENTE" ? " (à confirmer)" : ""}`,
      description: `Sujet : ${r.sujet}${r.organisation ? `\nOrganisation : ${r.organisation}` : ""}${r.telephone ? `\nTéléphone : ${r.telephone}` : ""}\nEmail : ${r.email}`,
      lieu: "Visioconférence",
    }))
  );

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
