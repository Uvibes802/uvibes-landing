import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "Affiche Uvibes";
const OUT = "public/images/passeport";

function slugify(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// slug du nom de fichier diplôme -> id de carte passeport
const FILE_TO_CARD = {
  "culture": "culture",
  "societaire": "adherents",
  "sport": "sport",
  "chercheur-emploi": "insertion",
  "echanges-entre-pairs": "echanges-pairs",
  "enseignement": "enseignement",
  "entreprises-et-equipes": "entreprises",
  "habitat": "lieu-de-vie",
  "international": "international",
  "reseaux-business-medef": "business",
  "seniors": "seniors",
  "tourisme": "tourisme",
};

// trouve le dossier Diplôme (peut être en NFD sur le disque)
const dipDir = fs.readdirSync(SRC, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .find(d => d.normalize("NFC").toLowerCase() === "diplôme".normalize("NFC"));

if (!dipDir) { console.error("Dossier Diplôme introuvable"); process.exit(1); }

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(path.join(SRC, dipDir)).filter(f => /\.(png|jpe?g)$/i.test(f));
const done = {};

for (const f of files) {
  const card = FILE_TO_CARD[slugify(f)];
  if (!card) { console.log("ignoré:", f); continue; }
  await sharp(path.join(SRC, dipDir, f))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${card}.webp`));
  done[card] = f;
}

console.log("Diplômes générés:", Object.keys(done).sort().join(", "));
