import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRdvReminder } from "@/services/rdv/sendRdvReminder";

// Envoi manuel d'un rappel de RDV au client (depuis l'admin)
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rdv = await prisma.rdvReservation.findUnique({ where: { id } });
    if (!rdv) return NextResponse.json({ error: "RDV introuvable" }, { status: 404 });

    await sendRdvReminder({
      to: rdv.email,
      nom: rdv.nom,
      date: rdv.date,
      heure: rdv.heure,
      sujet: rdv.sujet,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[rdv/reminder]", e);
    return NextResponse.json({ error: "Échec de l'envoi du rappel" }, { status: 500 });
  }
}
