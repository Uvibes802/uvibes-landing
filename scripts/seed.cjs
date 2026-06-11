// Lance le seed Prisma (idempotent) en chargeant .env.local.
// Le client Prisma écrit via DATABASE_URL (pooler) — DIRECT_URL n'est pas requis pour le seed.
// Usage : node scripts/seed.cjs
const fs = require("fs");
const { execSync } = require("child_process");

for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (!m) continue;
  let val = m[2].trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  process.env[m[1]] = val;
}

execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env: process.env });
