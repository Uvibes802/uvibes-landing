import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/session";

// Déconnexion par soumission de formulaire native (pas de fetch) → fonctionne
// même si une extension navigateur casse window.fetch. Le serveur détruit la
// session et redirige vers la page de login (303 : POST → GET).
export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  const session = await getSessionFromRequest(req, res);
  session.destroy();
  return res;
}
