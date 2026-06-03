import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
