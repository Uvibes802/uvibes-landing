import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Validation publique d'un code promo (utilisée à la signature du devis).
// Renvoie le pourcentage si le code est valide.
export async function POST(req: NextRequest) {
  try {
    // Anti brute-force : empêche l'énumération des codes promo
    if (!rateLimit({ key: "promo-validate", ip: getClientIp(req), max: 10, windowMs: 60_000 })) {
      return NextResponse.json({ valid: false, error: "Trop de tentatives — réessayez dans une minute." }, { status: 429 });
    }

    const { code } = await req.json();
    const cleanCode = String(code ?? "").trim().toUpperCase();
    if (!cleanCode) {
      return NextResponse.json({ valid: false, error: "Code vide" }, { status: 400 });
    }

    const promo = await prisma.promoCode.findUnique({ where: { code: cleanCode } });

    if (!promo || !promo.actif) {
      return NextResponse.json({ valid: false, error: "Code invalide" });
    }
    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, error: "Code expiré" });
    }
    if (promo.usageMax !== null && promo.usageCount >= promo.usageMax) {
      return NextResponse.json({ valid: false, error: "Code épuisé" });
    }

    return NextResponse.json({ valid: true, code: promo.code, pourcentage: promo.pourcentage });
  } catch {
    return NextResponse.json({ valid: false, error: "Erreur serveur" }, { status: 500 });
  }
}
