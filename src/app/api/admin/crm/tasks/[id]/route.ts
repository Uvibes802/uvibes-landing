import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Ctx = { params: Promise<{ id: string }> };

const PRIORITES = ["BASSE", "NORMALE", "HAUTE"];

// Modifie une tâche (coche done, édite titre/échéance/priorité)
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.done !== undefined) data.done = Boolean(body.done);
  if (body.titre !== undefined) data.titre = String(body.titre).trim();
  if (body.description !== undefined) data.description = body.description ? String(body.description) : null;
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  if (body.priorite !== undefined && PRIORITES.includes(body.priorite)) data.priorite = body.priorite;

  const task = await prisma.task.update({ where: { id }, data });
  if (task.collectifId) revalidatePath(`/admin/collectifs/${task.collectifId}`);
  return NextResponse.json(task);
}

// Supprime une tâche
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const deleted = await prisma.task.delete({ where: { id } });
  if (deleted.collectifId) revalidatePath(`/admin/collectifs/${deleted.collectifId}`);
  return NextResponse.json({ ok: true });
}
