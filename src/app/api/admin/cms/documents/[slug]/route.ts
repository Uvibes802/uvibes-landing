import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEGAL_DOC_SLUGS } from "@/lib/legalDocs";

// Routes protégées par le middleware (/api/admin/*).

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await prisma.legalDocument.findUnique({ where: { slug } });
  if (!doc) return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(LEGAL_DOC_SLUGS as string[]).includes(slug)) {
    return NextResponse.json({ error: "Document inconnu" }, { status: 400 });
  }

  const { titre, version, contenu } = await req.json();
  if (typeof contenu !== "string" || !contenu.trim()) {
    return NextResponse.json({ error: "Le contenu ne peut pas être vide" }, { status: 400 });
  }

  const data: { contenu: string; titre?: string; version?: string } = { contenu };
  if (typeof titre === "string" && titre.trim()) data.titre = titre.trim();
  if (typeof version === "string" && version.trim()) data.version = version.trim();

  const doc = await prisma.legalDocument.update({ where: { slug }, data });
  return NextResponse.json(doc);
}
