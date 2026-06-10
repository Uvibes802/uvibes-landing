// Applique le schéma Prisma sur la base via le POOLER.
// En local, DIRECT_URL (port 5432) est injoignable depuis le sandbox →
// on force DIRECT_URL = DATABASE_URL (pooler, port 6543) puis on lance db push.
// Usage : node scripts/db-push.cjs
const fs = require("fs");
const { execSync } = require("child_process");

// Charge .env.local (sans expansion $, en retirant les guillemets)
const envFile = ".env.local";
for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (!m) continue;
  let val = m[2].trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  process.env[m[1]] = val;
}

// Le direct (5432) n'est pas joignable en local → on pointe le pooler.
process.env.DIRECT_URL = process.env.DATABASE_URL;

execSync("npx prisma db push --skip-generate", { stdio: "inherit", env: process.env });
console.log("✅ Schéma appliqué (pooler).");
