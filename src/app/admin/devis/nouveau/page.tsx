import { prisma } from "@/lib/prisma";
import AdminDevisForm from "@/components/admin/AdminDevisForm";

export default async function NouveauDevisPage() {
  const [collectifs, plans] = await Promise.all([
    prisma.collectif.findMany({
      select: { id: true, nom: true, email: true, contact: true },
      orderBy: { nom: "asc" },
    }),
    prisma.plan.findMany({
      where: { actif: true },
      orderBy: { ordre: "asc" },
      select: { slug: true, nom: true, prixAnnuel: true },
    }),
  ]);

  return <AdminDevisForm collectifs={collectifs} plans={plans} />;
}
