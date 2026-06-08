import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPromoEmail } from "@/services/crm/sendPromoEmail";

// Envoi d'un code promo par email à un client (depuis l'admin)
export async function POST(req: NextRequest) {
  try {
    const { promoId, email, message } = await req.json();

    if (!promoId || !email) {
      return NextResponse.json({ error: "Code promo et email requis" }, { status: 400 });
    }

    const promo = await prisma.promoCode.findUnique({ where: { id: promoId } });
    if (!promo) return NextResponse.json({ error: "Code promo introuvable" }, { status: 404 });

    await sendPromoEmail({
      to: email,
      code: promo.code,
      pourcentage: promo.pourcentage,
      message: message?.trim() || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[promos/send]", e);
    return NextResponse.json({ error: "Échec de l'envoi de l'email" }, { status: 500 });
  }
}
