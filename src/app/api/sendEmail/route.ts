import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { lastname, firstname, email, message, newsletter, share } =
    await req.json();

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
    subject: `Nouveau message de ${lastname} ${firstname} via le site Uvibes`,
    html: `
           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
             <h2 style="color: #333;">Nouveau message de contact ${lastname} ${firstname} via le site Uvibes</h2>
             <p><strong>Nom:</strong> ${lastname}</p>
             <p><strong>Prénom:</strong> ${firstname}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Newsletter:</strong> ${newsletter ? "Oui" : "Non"}</p>
             <p><strong>Accepte de partager ses informations:</strong> ${
               share ? "Oui" : "Non"
             }</p>
             <p><strong>Message:</strong></p>
             <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
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
