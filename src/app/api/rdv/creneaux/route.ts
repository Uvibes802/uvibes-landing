import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlots(heureDebut: string, heureFin: string, dureeMinutes: number): string[] {
  const slots: string[] = [];
  const [startH, startM] = heureDebut.split(":").map(Number);
  const [endH, endM] = heureFin.split(":").map(Number);
  let current = startH * 60 + startM;
  const end = endH * 60 + endM;
  while (current + dureeMinutes <= end) {
    const h = Math.floor(current / 60).toString().padStart(2, "0");
    const m = (current % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    current += dureeMinutes;
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date requis" }, { status: 400 });

  const jsDay = new Date(date).getDay(); // 0=Dimanche ... 6=Samedi
  // Convertir en 1=Lundi ... 5=Vendredi (0=Dimanche → invalide)
  const jourSemaine = jsDay === 0 ? 7 : jsDay;

  const dispo = await prisma.rdvDisponibilite.findFirst({
    where: { jourSemaine, actif: true },
  });

  if (!dispo) return NextResponse.json({ slots: [] });

  const allSlots = generateSlots(dispo.heureDebut, dispo.heureFin, dispo.dureeMinutes);

  // Retirer les créneaux déjà réservés (hors annulés)
  const reserved = await prisma.rdvReservation.findMany({
    where: { date, statut: { not: "ANNULE" } },
    select: { heure: true },
  });
  const reservedSet = new Set(reserved.map((r) => r.heure));
  const availableSlots = allSlots.filter((s) => !reservedSet.has(s));

  return NextResponse.json({ slots: availableSlots, dureeMinutes: dispo.dureeMinutes });
}
