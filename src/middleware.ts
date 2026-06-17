import { getIronSession } from "iron-session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_OPTIONS, type SessionData } from "./lib/sessionOptions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Injecter le pathname dans les headers pour que layout.tsx puisse le lire
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Page de login : si déjà connecté, rediriger vers le dashboard
  // (évite l'état confus « page login + sidebar visible » qui ressemblait à un bypass).
  if (pathname === "/admin/login") {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return res;
  }

  // Protéger toutes les routes /admin/* sauf la page de login
  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return res;
  }

  // Protéger les API admin
  if (pathname.startsWith("/api/admin") && !pathname.includes("/auth/")) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    const session = await getIronSession<SessionData>(request, res, SESSION_OPTIONS);

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return res;
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/devis/:path*", "/devis"],
};
