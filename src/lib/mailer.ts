import nodemailer from "nodemailer";

// Transport email partagé — relais SMTP Brevo (remplace l'ancien OAuth2 Gmail).
// Identifiants à mettre dans l'environnement (.env.local + variables Vercel) :
//   SMTP_HOST  = smtp-relay.brevo.com
//   SMTP_PORT  = 587
//   SMTP_USER  = <login SMTP Brevo>           (ex. 83914d001@smtp-brevo.com)
//   SMTP_PASS  = <clé SMTP Brevo>
// Ne jamais committer ces valeurs : elles vivent uniquement dans .env.local.
export function createMailTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false, // STARTTLS sur le port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Expéditeur affiché — adresse @uvibes.fr à VÉRIFIER dans Brevo (sender + SPF/DKIM).
// Le login SMTP ci-dessus ne sert qu'à l'authentification ; le « From » est libre
// du moment qu'il est validé côté Brevo.
export const MAIL_FROM = process.env.MAIL_FROM ?? '"Uvibes" <contact@uvibes.fr>';

// Boîte interne qui reçoit les notifications (devis signé, nouveau RDV, etc.).
export const MAIL_TO_ADMIN =
  process.env.NOTIFY_EMAIL ?? process.env.MAIL_FROM_ADDRESS ?? "contact@uvibes.fr";

// Enveloppe HTML de marque partagée par tous les emails client (header dégradé +
// carte crème). On ne passe que le contenu propre à chaque email (titre, texte,
// footer) — l'habillage est centralisé ici pour rester cohérent.
export function emailShell(inner: string) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#4A1530">
      <div style="background:linear-gradient(135deg,#FD6E00,#D90A5C);padding:32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">Uvibes</h1>
      </div>
      <div style="padding:32px;background:#FFFBF4;border-radius:0 0 12px 12px;border:1px solid rgba(74,21,48,.09)">
        ${inner}
      </div>
    </div>`;
}
