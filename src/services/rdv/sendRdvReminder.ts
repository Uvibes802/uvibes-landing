import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escapeHtml";

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
}

interface RdvReminderParams {
  to: string;
  nom: string;
  date: string; // "2026-06-15"
  heure: string; // "14:00"
  sujet: string;
}

export async function sendRdvReminder({ to, nom, date, heure, sujet }: RdvReminderParams) {
  const transporter = createTransport();

  const dateLisible = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#4A1530">
      <div style="background:linear-gradient(135deg,#FD6E00,#D90A5C);padding:32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">Uvibes</h1>
      </div>
      <div style="padding:32px;background:#FFFBF4;border-radius:0 0 12px 12px;border:1px solid rgba(74,21,48,.09)">
        <h2 style="margin-top:0">Rappel de votre rendez-vous</h2>
        <p>Bonjour ${escapeHtml(nom)},</p>
        <p>Nous vous rappelons votre rendez-vous avec l'équipe Uvibes&nbsp;:</p>
        <div style="background:#FFF6EC;border:1px solid #E0AEC4;border-radius:12px;padding:18px 22px;margin:20px 0">
          <p style="margin:0 0 6px"><strong>📅 ${dateLisible}</strong></p>
          <p style="margin:0 0 6px"><strong>🕒 ${heure}</strong></p>
          <p style="margin:0">📌 ${escapeHtml(sujet)}</p>
        </div>
        <p>En cas d'empêchement, répondez simplement à cet email pour reprogrammer.</p>
        <p>À très bientôt&nbsp;!</p>
        <hr style="border:none;border-top:1px dashed rgba(74,21,48,.16);margin:24px 0"/>
        <p style="color:#B0507E;font-size:13px">L'équipe Uvibes — uvibes.fr</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Uvibes" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Rappel : votre rendez-vous Uvibes le ${dateLisible}`,
    html,
  });
}
