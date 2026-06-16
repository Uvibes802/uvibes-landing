import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { randomBytes } from "crypto";

// Téléversement d'une image depuis l'ordinateur (équipe, partenaires, témoignages…).
// Enregistre dans public/uploads/images/ et renvoie le chemin public.
// NB : pour un déploiement serverless (Vercel), migrer vers un stockage objet
// (S3 / Supabase Storage). Ici stockage disque local (dev / serveur persistant).
const EXT: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg", "image/gif": "gif",
  "video/mp4": "mp4", "video/webm": "webm",
};
const ALLOWED = Object.keys(EXT);
const MAX_IMAGE = 5 * 1024 * 1024;   // 5 Mo
const MAX_VIDEO = 50 * 1024 * 1024;  // 50 Mo

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (png, jpg, webp, svg, gif, mp4, webm)" }, { status: 415 });
  }
  const isVideo = file.type.startsWith("video/");
  if (file.size > (isVideo ? MAX_VIDEO : MAX_IMAGE)) {
    return NextResponse.json({ error: `Fichier trop lourd (max ${isVideo ? "50" : "5"} Mo)` }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = EXT[file.type] ?? "bin";
  const safeBase = (file.name || "fichier").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 40);
  const sub = isVideo ? "videos" : "images";
  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}-${safeBase}.${ext}`;

  // Écriture sur disque. Sur un hébergement serverless (Vercel), le FS est en
  // lecture seule → on renvoie un message clair invitant à coller une URL.
  try {
    const dir = path.join(process.cwd(), "public", "uploads", sub);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), buffer);
  } catch {
    return NextResponse.json(
      { error: "Téléversement direct indisponible sur cet hébergement (stockage en lecture seule). Collez plutôt l'URL du fichier (ex : lien CloudFront)." },
      { status: 501 }
    );
  }

  return NextResponse.json({ url: `/uploads/${sub}/${filename}` }, { status: 201 });
}
