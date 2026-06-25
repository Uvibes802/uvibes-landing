import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMailTransport, MAIL_FROM, emailShell } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escapeHtml";

// Protégé par le middleware (/api/admin/*). Envoie une newsletter à tous les
// inscrits actifs via le relais SMTP Brevo, un email par destinataire (lien de
// désinscription personnalisé). Envoi par lots pour ne pas saturer.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvibes.fr";

function renderEmail(bodyHtml: string, prenom: string | null, unsubUrl: string) {
  return emailShell(`
      ${prenom ? `<p style="margin-top:0">Bonjour ${escapeHtml(prenom)},</p>` : `<p style="margin-top:0">Bonjour,</p>`}
      <div style="font-size:15px;line-height:1.7">${bodyHtml}</div>
      <hr style="border:none;border-top:1px dashed rgba(74,21,48,.16);margin:28px 0"/>
      <p style="color:#B0507E;font-size:12px;text-align:center">
        Vous recevez cet email car vous êtes inscrit·e à la newsletter Uvibes.<br/>
        <a href="${unsubUrl}" style="color:#B0507E">Se désinscrire</a>
      </p>
  `);
}

export async function POST(req: NextRequest) {
  const { sujet, message } = await req.json();
  if (!sujet?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Sujet et message requis." }, { status: 400 });
  }

  const subs = await prisma.newsletterSubscriber.findMany({ where: { actif: true } });
  if (subs.length === 0) return NextResponse.json({ sent: 0, failed: 0, total: 0 });

  const transporter = createMailTransport();
  // Le message saisi est du texte simple → on échappe puis on garde les sauts de ligne
  const bodyHtml = escapeHtml(message).replace(/\n/g, "<br />");

  let sent = 0;
  let failed = 0;
  // Envoi par lots de 20 en parallèle
  for (let i = 0; i < subs.length; i += 20) {
    const batch = subs.slice(i, i + 20);
    const results = await Promise.allSettled(
      batch.map((s) => {
        const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?e=${encodeURIComponent(s.email)}`;
        return transporter.sendMail({
          from: MAIL_FROM,
          to: s.email,
          subject: sujet,
          html: renderEmail(bodyHtml, s.prenom, unsubUrl),
        });
      }),
    );
    results.forEach((r) => (r.status === "fulfilled" ? sent++ : failed++));
  }

  return NextResponse.json({ sent, failed, total: subs.length });
}
