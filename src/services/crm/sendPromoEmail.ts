import { createMailTransport, MAIL_FROM, emailShell } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escapeHtml";

interface PromoEmailParams {
  to: string;
  code: string;
  pourcentage: number;
  message?: string; // message personnalisé optionnel
}

export async function sendPromoEmail({ to, code, pourcentage, message }: PromoEmailParams) {
  const transporter = createMailTransport();

  const html = emailShell(`
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
  `);

  await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject: `Votre code promo Uvibes : −${pourcentage}%`,
    html,
  });
}
