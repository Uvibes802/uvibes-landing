import { prisma } from "@/lib/prisma";

export async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `UV-${year}-`;

  // Compter les devis existants cette année
  const count = await prisma.quote.count({
    where: { numero: { startsWith: prefix } },
  });

  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}
