import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRdvReminder } from "@/services/rdv/sendRdvReminder";

// Envoi automatique des rappels pour les RDV confirmés du lendemain.
// À déclencher par une tâche planifiée (cron Vercel ou externe), ex. chaque matin.
// Protégé par un secret optionnel : si CRON_SECRET est défini, il faut passer ?key=...
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const key = req.nextUrl.searchParams.get("key");
    if (key !== secret) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  // Date du lendemain au format "YYYY-MM-DD"
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const target = tomorrow.toISOString().slice(0, 10);

  const rdvs = await prisma.rdvReservation.findMany({
    where: { date: target, statut: "CONFIRME" },
  });

  let sent = 0;
  for (const rdv of rdvs) {
    try {
      await sendRdvReminder({
        to: rdv.email,
        nom: rdv.nom,
        date: rdv.date,
        heure: rdv.heure,
        sujet: rdv.sujet,
      });
      sent++;
    } catch (e) {
      console.error("[rdv/reminders] échec pour", rdv.email, e);
    }
  }

  return NextResponse.json({ ok: true, date: target, total: rdvs.length, sent });
}
