import { prisma } from "@/lib/prisma";

const QUOTE_NUMBER_KEY = "devis-prochain-numero";

// Format : D + année sur 2 chiffres + séquence sur 5 chiffres (ex. D2600103).
// Le numéro de départ est éditable depuis l'admin (/admin/devis, clé CmsContent
// "devis-prochain-numero") ; il s'incrémente ensuite automatiquement à chaque
// devis créé, et l'année se met à jour seule au changement d'année (26 → 27).
export async function generateQuoteNumber(): Promise<string> {
  const yy = String(new Date().getFullYear()).slice(-2);

  const setting = await prisma.cmsContent.findUnique({ where: { cle: QUOTE_NUMBER_KEY } });
  const match = setting?.valeur.match(/^D(\d{2})(\d{5})$/);

  // Si le numéro configuré correspond à l'année en cours, on l'utilise tel quel ;
  // sinon (nouvelle année, ou jamais configuré) on redémarre la séquence à 1.
  const seq = match && match[1] === yy ? Number(match[2]) : 1;
  const numero = `D${yy}${String(seq).padStart(5, "0")}`;

  const next = `D${yy}${String(seq + 1).padStart(5, "0")}`;
  await prisma.cmsContent.upsert({
    where: { cle: QUOTE_NUMBER_KEY },
    create: { cle: QUOTE_NUMBER_KEY, label: "Prochain numéro de devis", valeur: next },
    update: { valeur: next },
  });

  return numero;
}
