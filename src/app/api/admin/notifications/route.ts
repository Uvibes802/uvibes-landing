import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Protégé par le middleware (/api/admin/*). Sert les messages du formulaire de
// contact en notifications pour le dashboard.
export async function GET() {
  const [messages, unread] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.contactMessage.count({ where: { lu: false } }),
  ]);
  return NextResponse.json({ messages, unread });
}

// Marquer comme lu : { id } pour un message, { all: true } pour tout.
export async function PATCH(req: NextRequest) {
  const { id, all } = await req.json();
  if (all) {
    await prisma.contactMessage.updateMany({ where: { lu: false }, data: { lu: true } });
  } else if (id) {
    await prisma.contactMessage.update({ where: { id }, data: { lu: true } });
  }
  return NextResponse.json({ ok: true });
}
