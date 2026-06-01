import { prisma } from "@/lib/prisma";
import AdminDevisForm from "@/components/admin/AdminDevisForm";

export default async function NouveauDevisPage() {
  const collectifs = await prisma.collectif.findMany({
    select: { id: true, nom: true, email: true, contact: true },
    orderBy: { nom: "asc" },
  });

  return <AdminDevisForm collectifs={collectifs} />;
}
