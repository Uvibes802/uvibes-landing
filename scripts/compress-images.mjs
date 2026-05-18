// Script one-shot pour compresser les images lourdes de public/images/
// Compresse en gardant le même format et le même nom — aucune référence à changer dans le code.
// Utilisation : node scripts/compress-images.mjs

import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const IMAGES_DIR = "./public/images";
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const MIN_SIZE_KB = 200; // Ignore les fichiers déjà légers

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".PNG"];

const files = readdirSync(IMAGES_DIR).filter((f) =>
  EXTENSIONS.includes(extname(f))
);

console.log(`\n${files.length} images trouvées — compression en cours...\n`);

for (const file of files) {
  const inputPath = join(IMAGES_DIR, file);
  const sizeKB = statSync(inputPath).size / 1024;

  if (sizeKB < MIN_SIZE_KB) {
    console.log(`⏭  ${file} (${Math.round(sizeKB)} KB) — déjà léger, ignoré`);
    continue;
  }

  const ext = extname(file).toLowerCase();
  const tmpPath = inputPath + ".tmp";

  try {
    const img = sharp(inputPath);

    if (ext === ".png" || ext === ".PNG") {
      await img.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(tmpPath);
    } else {
      await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath);
    }

    const newSizeKB = statSync(tmpPath).size / 1024;
    const gain = Math.round(100 - (newSizeKB / sizeKB) * 100);

    // Remplace l'original par la version compressée
    unlinkSync(inputPath);
    renameSync(tmpPath, inputPath);

    console.log(`✅ ${file} | ${Math.round(sizeKB)} KB → ${Math.round(newSizeKB)} KB (-${gain}%)`);
  } catch (err) {
    // Nettoie le fichier temporaire si erreur
    try { unlinkSync(tmpPath); } catch {}
    console.error(`❌ ${file} — erreur : ${err.message}`);
  }
}

console.log("\nCompression terminée. Aucune référence dans le code à modifier.");
