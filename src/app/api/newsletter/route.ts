import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { syncBrevoContact, unsubscribeBrevoContact } from "@/lib/brevo";

export async function POST(req: NextRequest) {
  try {
    // Anti-spam : limite les inscriptions répétées depuis une même IP
    if (!rateLimit({ key: "newsletter", ip: getClientIp(req), max: 5, windowMs: 60_000 })) {
      return NextResponse.json({ error: "Trop de tentatives — réessayez dans une minute." }, { status: 429 });
    }

    const { email, prenom, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.actif) {
        return NextResponse.json({ message: "Déjà inscrit." }, { status: 200 });
      }
      // Réactiver si désinscrit
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { actif: true, unsubscribedAt: null },
      });
      await syncBrevoContact(email, existing.prenom);
      return NextResponse.json({ success: true, reactivated: true });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        prenom: prenom?.trim() || null,
        source: source ?? "site",
        actif: true,
      },
    });

    // Pousse l'inscrit dans la liste Brevo (best-effort, ne bloque pas la réponse)
    await syncBrevoContact(email, prenom?.trim() || null);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email requis." }, { status: 400 });

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { actif: false, unsubscribedAt: new Date() },
    });
    await unsubscribeBrevoContact(email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
