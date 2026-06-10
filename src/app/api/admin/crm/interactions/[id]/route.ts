import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Ctx = { params: Promise<{ id: string }> };

// Supprime une interaction
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const deleted = await prisma.interaction.delete({ where: { id } });
  revalidatePath(`/admin/collectifs/${deleted.collectifId}`);
  return NextResponse.json({ ok: true });
}
