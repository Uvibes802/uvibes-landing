import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escapeHtml";

// Rate limiting : max 5 requêtes par minute par IP pour éviter le spam
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Première requête ou fenêtre expirée : on repart de zéro
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Trop de requêtes. Réessayez dans une minute." },
      { status: 429 }
    );
  }

  const { lastname, firstname, email, message, newsletter, share } =
    await req.json();

  // Authentification Gmail via OAuth2 — credentials dans .env.local
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nouveau message de ${lastname} ${firstname} via le site Uvibes`,
    html: `
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
             <h2 style="color: #333;">Nouveau message de contact ${escapeHtml(lastname)} ${escapeHtml(firstname)} via le site Uvibes</h2>
             <p><strong>Nom:</strong> ${escapeHtml(lastname)}</p>
             <p><strong>Prénom:</strong> ${escapeHtml(firstname)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Newsletter:</strong> ${newsletter ? "Oui" : "Non"}</p>
             <p><strong>Accepte de partager ses informations:</strong> ${
               share ? "Oui" : "Non"
             }</p>
             <p><strong>Message:</strong></p>
             <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${escapeHtml(message)}</p>
           </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
