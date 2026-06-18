import sharp from "sharp";
import fs from "fs";
import path from "path";
const SRC = "Affiche Uvibes";
const OUT = "public/images/dashboard";
const dir = fs.readdirSync(SRC, { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name)
  .find(d => d.normalize("NFC").toLowerCase().includes("tableau"));
if (!dir) { console.error("dossier introuvable"); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(path.join(SRC, dir)).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
let i = 1;
for (const f of files) {
  await sharp(path.join(SRC, dir, f))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `dashboard-${i}.webp`));
  console.log(`dashboard-${i}.webp <- ${f}`);
  i++;
}
