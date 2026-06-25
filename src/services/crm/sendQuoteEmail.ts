import { createMailTransport, MAIL_FROM, MAIL_TO_ADMIN, emailShell } from "@/lib/mailer";
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
  message?: string; // message personnalisé saisi par l'admin à l'envoi
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvibes.fr";

export async function sendQuoteToCollectif(params: QuoteEmailParams) {
  const transporter = createMailTransport();
  const devisUrl = `${SITE_URL}/devis/${params.quoteId}`;

  const subject = params.signed
    ? `Votre devis signé Uvibes — ${params.quoteNumero}`
    : `Votre devis Uvibes — ${params.quoteNumero}`;

  const html = emailShell(`
        <h2 style="margin-top:0">Bonjour,</h2>
        ${params.message
          ? `<div style="background:#FFF6EC;border-left:3px solid #FD6E00;padding:14px 18px;border-radius:8px;margin:0 0 20px;white-space:pre-wrap">${escapeHtml(params.message)}</div>`
          : ""
        }
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
  `);

  await transporter.sendMail({
    from: MAIL_FROM,
    to: params.to,
    subject,
    html,
  });
}

export async function notifyDirectrice(params: QuoteEmailParams) {
  const transporter = createMailTransport();
  const adminUrl = `${SITE_URL}/admin/devis/${params.quoteId}`;

  await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO_ADMIN,
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
