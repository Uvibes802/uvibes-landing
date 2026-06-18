import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "Affiche Uvibes";
const OUT = "public/images/affiche";

// slug de collectif -> dossier source
const MAP = {
  "culture": "Culture",
  "enseignement": "Enseignement",
  "tourisme": "tourisme",
  "reseaux-business": "Réseaux business",
  "adherents": "adherents et sociétaire",
  "entreprises": "Entreprise et équipe",
  "seniors": "senior",
  "echanges-pairs": "échanges entre pairs",
  "international": "international",
  "sport": "sport",
  "insertion": "insertion professionnelle",
  "lieu-de-vie": "Habitat",
};

function slugify(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // enlève accents
    .replace(/\.[^.]+$/, "")                           // enlève extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const manifest = {};

// Les noms de dossiers accentués peuvent être en NFD sur le disque → matche en normalisant.
const realDirs = fs.readdirSync(SRC, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);
const findDir = (wanted) =>
  realDirs.find(d => d.normalize("NFC") === wanted.normalize("NFC"));

for (const [slug, folder] of Object.entries(MAP)) {
  const realName = findDir(folder);
  if (!realName) { console.log("ABSENT:", folder); continue; }
  const srcDir = path.join(SRC, realName);
  const outDir = path.join(OUT, slug);
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
  manifest[slug] = [];
  for (const f of files) {
    const name = slugify(f) + ".webp";
    await sharp(path.join(srcDir, f))
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, name));
    manifest[slug].push(name);
  }
  console.log(`${slug}: ${manifest[slug].join(", ")}`);
}

fs.writeFileSync("/tmp/affiche-manifest.json", JSON.stringify(manifest, null, 2));
console.log("\n--- terminé ---");
