import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Équipe affichée sur le site : pilotée depuis l'admin (table TeamMember).
// Remplace l'ancien fetch WordPress côté client (CORS/extensions/lenteur).
// ?equipe=<catégorie> filtre par onglet ; sinon renvoie tout (actif uniquement).
export async function GET(req: NextRequest) {
  try {
    const equipe = req.nextUrl.searchParams.get("equipe") ?? undefined;

    const items = await prisma.teamMember.findMany({
      where: { actif: true, ...(equipe ? { equipe } : {}) },
      orderBy: { ordre: "asc" },
    });

    const data = items.map((m) => ({
      name: m.nom,
      position: m.poste,
      image: m.photoUrl ?? null,
      team: m.equipe,
    }));

    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
