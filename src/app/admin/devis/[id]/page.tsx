import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DevisDetailClient from "@/components/admin/DevisDetailClient";

interface Props { params: Promise<{ id: string }> }

export default async function DevisDetailPage({ params }: Props) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({
    where: { id },
    include: { collectif: true },
  });
  if (!quote) notFound();

  return (
    <DevisDetailClient
      quote={{
        ...quote,
        featuresJson: JSON.parse(quote.featuresJson || "[]"),
        collectif: {
          id: quote.collectif.id,
          nom: quote.collectif.nom,
          contact: quote.collectif.contact,
          email: quote.collectif.email,
          typeCollectif: quote.collectif.typeCollectif,
          statut: quote.collectif.statut,
        },
      }}
    />
  );
}
