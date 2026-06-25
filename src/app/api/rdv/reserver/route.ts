import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMailTransport, MAIL_FROM, MAIL_TO_ADMIN, emailShell } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escapeHtml";
import { buildIcsEvent } from "@/lib/ics";

// Rate limiting simple : 3 réservations par IP par heure
const attempts = new Map<string, { count: number; resetAt: number }>();
function checkRate(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) { attempts.set(ip, { count: 1, resetAt: now + 3600_000 }); return true; }
  if (entry.count >= 3) return false;
  entry.count++; return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRate(ip)) return NextResponse.json({ error: "Trop de réservations — réessayez plus tard." }, { status: 429 });

  const { date, heure, nom, email, telephone, organisation, sujet, message } = await req.json();
  if (!date || !heure || !nom || !email || !sujet) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  // Vérifier que le créneau est encore disponible
  const existing = await prisma.rdvReservation.findFirst({
    where: { date, heure, statut: { not: "ANNULE" } },
  });
  if (existing) return NextResponse.json({ error: "Ce créneau vient d'être pris. Choisissez-en un autre." }, { status: 409 });

  const rdv = await prisma.rdvReservation.create({
    data: { date, heure, nom, email, telephone: telephone || null, organisation: organisation || null, sujet, message: message || null },
  });

  // Email de confirmation au client
  try {
    const transporter = createMailTransport();
    const dateFormatted = new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    // Fichier .ics joint → ajout en 1 clic à l'agenda (Apple Calendar, Google, Outlook)
    const ics = buildIcsEvent({
      uid: rdv.id,
      date, heure,
      titre: `RDV Uvibes — ${nom}`,
      description: `Sujet : ${sujet}${organisation ? `\nOrganisation : ${organisation}` : ""}${telephone ? `\nTéléphone : ${telephone}` : ""}\nEmail : ${email}`,
      lieu: "Visioconférence",
    });
    const icsAttachment = { filename: "rendez-vous-uvibes.ics", content: ics, contentType: "text/calendar; charset=utf-8; method=PUBLISH" };

    // Destinataire de la notification directrice (configurable en CMS, sinon le compte d'envoi)
    const notifSetting = await prisma.cmsContent.findUnique({ where: { cle: "rdv-notif-email" } });
    const directriceEmail = (notifSetting?.valeur || MAIL_TO_ADMIN) ?? "";

    // Les deux emails partent en parallèle (chaque envoi SMTP est lent).
    await Promise.all([
    transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: `Confirmation de rendez-vous Uvibes — ${dateFormatted} à ${heure}`,
      html: emailShell(`
            <h2>Bonjour ${escapeHtml(nom)},</h2>
            <p>Votre demande de rendez-vous a bien été enregistrée. Nous confirmerons rapidement.</p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0">
              <tr style="background:#FFF6EC"><td style="padding:12px;border:1px solid #E0AEC4">Date</td><td style="padding:12px;border:1px solid #E0AEC4"><strong>${dateFormatted}</strong></td></tr>
              <tr><td style="padding:12px;border:1px solid #E0AEC4">Heure</td><td style="padding:12px;border:1px solid #E0AEC4"><strong>${heure}</strong></td></tr>
              <tr style="background:#FFF6EC"><td style="padding:12px;border:1px solid #E0AEC4">Sujet</td><td style="padding:12px;border:1px solid #E0AEC4"><strong>${escapeHtml(sujet)}</strong></td></tr>
            </table>
            <p style="color:#B0507E;font-size:13px">Ajoutez ce rendez-vous à votre agenda avec le fichier joint. Une question ? Contactez-nous sur uvibes.fr</p>
        `),
      attachments: [icsAttachment],
    }),
    // Notifier la directrice (immédiat, à chaque prise de RDV) + .ics pour l'agenda
    transporter.sendMail({
      from: MAIL_FROM,
      to: directriceEmail,
      subject: `📅 Nouveau RDV — ${nom} — ${dateFormatted} ${heure}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#4A1530">
          <p style="font-size:16px"><strong>Nouveau rendez-vous demandé</strong></p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;border:1px solid #E0AEC4">Date</td><td style="padding:8px;border:1px solid #E0AEC4"><strong>${dateFormatted} à ${heure}</strong></td></tr>
            <tr><td style="padding:8px;border:1px solid #E0AEC4">Contact</td><td style="padding:8px;border:1px solid #E0AEC4">${escapeHtml(nom)} — ${escapeHtml(email)}</td></tr>
            ${telephone ? `<tr><td style="padding:8px;border:1px solid #E0AEC4">Téléphone</td><td style="padding:8px;border:1px solid #E0AEC4">${escapeHtml(telephone)}</td></tr>` : ""}
            ${organisation ? `<tr><td style="padding:8px;border:1px solid #E0AEC4">Organisation</td><td style="padding:8px;border:1px solid #E0AEC4">${escapeHtml(organisation)}</td></tr>` : ""}
            <tr><td style="padding:8px;border:1px solid #E0AEC4">Sujet</td><td style="padding:8px;border:1px solid #E0AEC4">${escapeHtml(sujet)}</td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #E0AEC4">Message</td><td style="padding:8px;border:1px solid #E0AEC4">${escapeHtml(message)}</td></tr>` : ""}
          </table>
          <p style="color:#B0507E;font-size:13px">Fichier .ics joint pour l'ajouter à votre agenda.</p>
        </div>`,
      attachments: [icsAttachment],
    }),
    ]);
  } catch (e) { console.error("Email RDV:", e); }

  return NextResponse.json({ id: rdv.id }, { status: 201 });
}
