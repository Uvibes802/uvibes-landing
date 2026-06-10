import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const PRIORITES = ["BASSE", "NORMALE", "HAUTE"];

// Liste les tâches (filtre optionnel ?collectifId= / ?done=)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collectifId = searchParams.get("collectifId");
  const doneParam = searchParams.get("done");
  const tasks = await prisma.task.findMany({
    where: {
      ...(collectifId ? { collectifId } : {}),
      ...(doneParam !== null ? { done: doneParam === "true" } : {}),
    },
    orderBy: [{ done: "asc" }, { dueDate: "asc" }],
    include: { collectif: { select: { id: true, nom: true } } },
  });
  return NextResponse.json(tasks);
}

// Crée une tâche / relance
export async function POST(req: NextRequest) {
  const body = await req.json();
  const titre = String(body.titre || "").trim();
  if (!titre) return NextResponse.json({ error: "titre requis" }, { status: 400 });
  const task = await prisma.task.create({
    data: {
      titre,
      description: body.description ? String(body.description) : null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      priorite: PRIORITES.includes(body.priorite) ? body.priorite : "NORMALE",
      collectifId: body.collectifId ? String(body.collectifId) : null,
    },
  });
  if (task.collectifId) revalidatePath(`/admin/collectifs/${task.collectifId}`);
  return NextResponse.json(task, { status: 201 });
}
