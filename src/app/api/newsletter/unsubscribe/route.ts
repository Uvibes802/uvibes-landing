import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unsubscribeBrevoContact } from "@/lib/brevo";

// Désinscription en un clic depuis le lien dans l'email de newsletter.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("e");
  if (email) {
    await prisma.newsletterSubscriber
      .updateMany({ where: { email }, data: { actif: false, unsubscribedAt: new Date() } })
      .catch(() => {});
    await unsubscribeBrevoContact(email).catch(() => {});
  }

  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Désinscription — Uvibes</title></head>
    <body style="font-family:sans-serif;background:#FFF6F0;display:grid;place-items:center;min-height:100vh;margin:0">
      <div style="background:#fff;padding:40px;border-radius:18px;box-shadow:0 20px 50px -20px rgba(217,10,92,.3);text-align:center;max-width:420px">
        <h1 style="color:#D90A5C;margin:0 0 10px">C'est fait ✓</h1>
        <p style="color:#4A1530;line-height:1.6">Vous êtes désinscrit·e de la newsletter Uvibes. Vous ne recevrez plus nos emails.</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvibes.fr"}" style="display:inline-block;margin-top:14px;color:#FD6E00;font-weight:600;text-decoration:none">← Retour sur uvibes.fr</a>
      </div>
    </body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
