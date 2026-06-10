import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const TYPES = ["NOTE", "APPEL", "EMAIL", "REUNION"];

// Ajoute une interaction (échange) à un collectif
export async function POST(req: NextRequest) {
  const body = await req.json();
  const collectifId = String(body.collectifId || "");
  const contenu = String(body.contenu || "").trim();
  const type = TYPES.includes(body.type) ? body.type : "NOTE";
  if (!collectifId || !contenu) {
    return NextResponse.json({ error: "collectifId et contenu requis" }, { status: 400 });
  }
  const interaction = await prisma.interaction.create({
    data: {
      collectifId,
      contenu,
      type,
      auteur: body.auteur ? String(body.auteur) : null,
      date: body.date ? new Date(body.date) : undefined,
    },
  });
  revalidatePath(`/admin/collectifs/${collectifId}`);
  return NextResponse.json(interaction, { status: 201 });
}
