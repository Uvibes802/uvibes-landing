import { NextRequest, NextResponse } from "next/server";
import { calculateQuote } from "@/services/crm/calculateQuote";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planSlug, nombreUtilisateurs, dureeContrat, remise } = body;

    if (!planSlug || !nombreUtilisateurs || !dureeContrat) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    const result = await calculateQuote({ planSlug, nombreUtilisateurs, dureeContrat, remise });
    return NextResponse.json(result);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
