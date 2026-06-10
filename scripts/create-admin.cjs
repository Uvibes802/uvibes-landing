// Créer / mettre à jour un compte admin avec un mot de passe fort de ton choix.
// Usage : node scripts/create-admin.cjs "email@uvibes.fr" "MotDePasseFort" "Nom Affiché" [ROLE]
// (charger l'env avant — voir README sécurité)
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const [, , email, password, nom = "Admin", role = "ADMIN"] = process.argv;
  if (!email || !password) {
    console.error('Usage : node scripts/create-admin.cjs "email" "motdepasse" "Nom" [ROLE]');
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("⚠️  Mot de passe trop court : minimum 12 caractères.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.adminUser.upsert({
    where: { email: email.trim().toLowerCase() },
    update: { passwordHash, nom, role },
    create: { email: email.trim().toLowerCase(), passwordHash, nom, role },
  });
  console.log(`✅ Compte admin prêt : ${user.email} (${user.role})`);
}

main().catch((e) => { console.error(e.message); process.exit(1); }).finally(() => prisma.$disconnect());
