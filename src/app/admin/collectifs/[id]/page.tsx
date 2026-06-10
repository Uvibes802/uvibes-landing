import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CollectifFicheClient from "@/components/admin/CollectifFicheClient";

interface Props { params: Promise<{ id: string }> }

export default async function CollectifFichePage({ params }: Props) {
  const { id } = await params;
  const collectif = await prisma.collectif.findUnique({
    where: { id },
    include: {
      quotes: { orderBy: { createdAt: "desc" } },
      interactions: { orderBy: { date: "desc" } },
      tasks: { orderBy: [{ done: "asc" }, { dueDate: "asc" }] },
    },
  });
  if (!collectif) notFound();

  return (
    <CollectifFicheClient
      collectif={{
        ...collectif,
        usagesPrevus: JSON.parse(collectif.usagesPrevus || "[]"),
      }}
    />
  );
}
