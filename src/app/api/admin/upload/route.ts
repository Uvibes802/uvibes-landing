import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { randomBytes } from "crypto";

// Téléversement d'une image depuis l'ordinateur (équipe, partenaires, témoignages…).
// Enregistre dans public/uploads/images/ et renvoie le chemin public.
// NB : pour un déploiement serverless (Vercel), migrer vers un stockage objet
// (S3 / Supabase Storage). Ici stockage disque local (dev / serveur persistant).
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];
const EXT: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg", "image/gif": "gif",
};

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (png, jpg, webp, svg, gif)" }, { status: 415 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Fichier trop lourd (max 5 Mo)" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = EXT[file.type] ?? "png";
  const safeBase = (file.name || "image").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 40);
  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}-${safeBase}.${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads", "images");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/images/${filename}` }, { status: 201 });
}
