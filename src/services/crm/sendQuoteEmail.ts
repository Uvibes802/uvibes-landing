import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escapeHtml";

interface QuoteEmailParams {
  to: string;
  collectifNom: string;
  quoteNumero: string;
  quoteId: string;
  planNom: string;
  prixHT: number;
  prixTTC: number;
  signed?: boolean;
  pdfPath?: string;
}

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvibes.fr";

export async function sendQuoteToCollectif(params: QuoteEmailParams) {
  const transporter = createTransport();
  const devisUrl = `${SITE_URL}/devis/${params.quoteId}`;

  const subject = params.signed
    ? `Votre devis signé Uvibes — ${params.quoteNumero}`
    : `Votre devis Uvibes — ${params.quoteNumero}`;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#4A1530">
      <div style="background:linear-gradient(135deg,#FD6E00,#D90A5C);padding:32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">Uvibes</h1>
      </div>
      <div style="padding:32px;background:#FFFBF4;border-radius:0 0 12px 12px;border:1px solid rgba(74,21,48,.09)">
        <h2 style="margin-top:0">Bonjour,</h2>
        <p>Voici votre devis <strong>${params.quoteNumero}</strong> pour <strong>${escapeHtml(params.collectifNom)}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr style="background:#FFF6EC">
            <td style="padding:12px;border:1px solid #E0AEC4">Plan</td>
            <td style="padding:12px;border:1px solid #E0AEC4"><strong>${params.planNom}</strong></td>
          </tr>
          <tr>
            <td style="padding:12px;border:1px solid #E0AEC4">Prix HT</td>
            <td style="padding:12px;border:1px solid #E0AEC4"><strong>${params.prixHT.toLocaleString("fr-FR")} €</strong></td>
          </tr>
          <tr style="background:#FFF6EC">
            <td style="padding:12px;border:1px solid #E0AEC4">Prix TTC (TVA 20%)</td>
            <td style="padding:12px;border:1px solid #E0AEC4"><strong>${params.prixTTC.toLocaleString("fr-FR")} €</strong></td>
          </tr>
        </table>
        ${params.signed
          ? `<p>✅ Votre devis a été <strong>signé</strong>. Vous pouvez le télécharger en PDF via le lien ci-dessous.</p>`
          : `<p>Consultez et signez votre devis en ligne en cliquant sur le bouton ci-dessous.</p>`
        }
        <a href="${devisUrl}" style="display:inline-block;background:linear-gradient(90deg,#FD6E00,#D90A5C);color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:600;margin:16px 0">
          ${params.signed ? "Télécharger le PDF" : "Voir mon devis →"}
        </a>
        <hr style="border:none;border-top:1px dashed rgba(74,21,48,.16);margin:24px 0"/>
        <p style="color:#B0507E;font-size:13px">Une question ? Répondez à cet email ou contactez-nous sur uvibes.fr</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Uvibes" <${process.env.EMAIL_USER}>`,
    to: params.to,
    subject,
    html,
  });
}

export async function notifyDirectrice(params: QuoteEmailParams) {
  const transporter = createTransport();
  const adminUrl = `${SITE_URL}/admin/devis/${params.quoteId}`;

  await transporter.sendMail({
    from: `"Uvibes CRM" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER ?? "",
    subject: `${params.signed ? "✅ Devis signé" : "📄 Nouveau devis"} — ${params.collectifNom} — ${params.quoteNumero}`,
    html: `
      <p>Un devis vient d'être ${params.signed ? "signé" : "créé"}.</p>
      <ul>
        <li><strong>Collectif :</strong> ${params.collectifNom}</li>
        <li><strong>Numéro :</strong> ${params.quoteNumero}</li>
        <li><strong>Plan :</strong> ${params.planNom}</li>
        <li><strong>Prix HT :</strong> ${params.prixHT.toLocaleString("fr-FR")} €</li>
      </ul>
      <a href="${adminUrl}">Voir dans le CRM →</a>
    `,
  });
}
