import { getIronSession } from "iron-session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_OPTIONS, IDLE_TIMEOUT_MS, type SessionData } from "./lib/sessionOptions";

// Session admin valide = connectée ET active il y a moins de IDLE_TIMEOUT_MS.
// (lastSeen absent = ancienne session d'avant cette règle → tolérée, sera datée
// au prochain passage.)
function isSessionActive(session: SessionData): boolean {
  if (!session.isLoggedIn) return false;
  if (session.lastSeen && Date.now() - session.lastSeen > IDLE_TIMEOUT_MS) return false;
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Injecter le pathname dans les headers pour que layout.tsx puisse le lire
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Page de login : si déjà connecté (et session active), rediriger vers le dashboard
  // (évite l'état confus « page login + sidebar visible » qui ressemblait à un bypass).
  if (pathname === "/admin/login") {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);
    if (isSessionActive(session)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    // Session expirée par inactivité : on nettoie pour repartir sur une base saine.
    if (session.isLoggedIn) {
      session.destroy();
      await session.save();
    }
    return res;
  }

  // Protéger toutes les routes /admin/* sauf la page de login
  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);

    if (!isSessionActive(session)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Activité détectée → on prolonge la fenêtre d'inactivité.
    session.lastSeen = Date.now();
    await session.save();
    return res;
  }

  // Protéger les API admin
  if (pathname.startsWith("/api/admin") && !pathname.includes("/auth/")) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);

    if (!isSessionActive(session)) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    session.lastSeen = Date.now();
    await session.save();
    return res;
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/devis/:path*", "/devis"],
};
