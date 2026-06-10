import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";

// Changement du mot de passe de l'admin connecté.
// Route sous /api/admin/* → protégée par le middleware ; on revérifie la session ici.
export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.adminId) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();
  if (!newPassword || String(newPassword).length < 12) {
    return NextResponse.json({ error: "Le nouveau mot de passe doit faire au moins 12 caractères." }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!user) return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });

  const ok = await bcrypt.compare(String(currentPassword ?? ""), user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 400 });

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(String(newPassword), 12) },
  });

  return NextResponse.json({ ok: true });
}
