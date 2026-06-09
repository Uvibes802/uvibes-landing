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

interface PromoEmailParams {
  to: string;
  code: string;
  pourcentage: number;
  message?: string; // message personnalisé optionnel
}

export async function sendPromoEmail({ to, code, pourcentage, message }: PromoEmailParams) {
  const transporter = createTransport();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#4A1530">
      <div style="background:linear-gradient(135deg,#FD6E00,#D90A5C);padding:32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">Uvibes</h1>
      </div>
      <div style="padding:32px;background:#FFFBF4;border-radius:0 0 12px 12px;border:1px solid rgba(74,21,48,.09)">
        <h2 style="margin-top:0">Une offre rien que pour vous 🎁</h2>
        ${message ? `<p style="white-space:pre-line">${escapeHtml(message)}</p>` : "<p>Profitez d'une réduction sur votre devis Uvibes&nbsp;:</p>"}
        <div style="text-align:center;margin:28px 0">
          <div style="display:inline-block;background:#fff;border:2px dashed #FD6E00;border-radius:14px;padding:20px 36px">
            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#B0507E;margin-bottom:6px">Votre code promo</div>
            <div style="font-size:30px;font-weight:800;letter-spacing:.05em;color:#D90A5C">${code}</div>
            <div style="font-size:15px;color:#FD6E00;margin-top:6px">−${pourcentage}% sur votre devis</div>
          </div>
        </div>
        <p style="font-size:14px">Saisissez ce code au moment de signer votre devis en ligne pour appliquer la réduction.</p>
        <hr style="border:none;border-top:1px dashed rgba(74,21,48,.16);margin:24px 0"/>
        <p style="color:#B0507E;font-size:13px">Une question ? Répondez simplement à cet email.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Uvibes" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Votre code promo Uvibes : −${pourcentage}%`,
    html,
  });
}
