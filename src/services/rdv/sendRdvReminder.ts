import { createMailTransport, MAIL_FROM, emailShell } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escapeHtml";

interface RdvReminderParams {
  to: string;
  nom: string;
  date: string; // "2026-06-15"
  heure: string; // "14:00"
  sujet: string;
}

export async function sendRdvReminder({ to, nom, date, heure, sujet }: RdvReminderParams) {
  const transporter = createMailTransport();

  const dateLisible = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = emailShell(`
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
  `);

  await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject: `Rappel : votre rendez-vous Uvibes le ${dateLisible}`,
    html,
  });
}
