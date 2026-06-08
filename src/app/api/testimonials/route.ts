import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Témoignages affichés sur le site : pilotés depuis l'admin (table Testimony).
// Seuls les témoignages "actif = true" sont renvoyés, dans l'ordre défini.
// Format adapté à ce qu'attend le front (testimonyCard).
export async function GET() {
  try {
    const items = await prisma.testimony.findMany({
      where: { actif: true },
      orderBy: { ordre: "asc" },
    });

    const data = items.map((t) => ({
      id: t.id,
      testimony: t.texte,
      auteur_temoignage: t.auteur,
      role_et_entreprise_temoignage: t.role,
    }));

    return NextResponse.json(data);
  } catch {
    // En cas d'erreur DB, on renvoie une liste vide → le front garde ses témoignages de secours.
    return NextResponse.json([]);
  }
}
