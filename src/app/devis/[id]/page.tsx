import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DevisDocument from "@/components/devis/DevisDocument";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id }, include: { collectif: true } });
  if (!quote) return { title: "Devis introuvable" };
  return {
    title: `Devis ${quote.numero} — ${quote.collectif.nom} | Uvibes`,
    robots: { index: false },
  };
}

export default async function DevisPage({ params }: Props) {
  const { id } = await params;

  const quote = await prisma.quote.findUnique({
    where: { id },
    include: { collectif: true },
  });

  if (!quote) notFound();

  const data = {
    ...quote,
    featuresJson: JSON.parse(quote.featuresJson || "[]"),
    collectif: {
      ...quote.collectif,
      usagesPrevus: JSON.parse(quote.collectif.usagesPrevus || "[]"),
    },
  };

  return <DevisDocument quote={data} />;
}
