import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/csv";

// Export CSV des collectifs
export async function GET() {
  const collectifs = await prisma.collectif.findMany({ orderBy: { createdAt: "desc" } });

  const csv = toCsv(
    ["Nom", "Contact", "Email", "Téléphone", "Ville", "Type", "Taille", "Statut", "Source", "Créé le"],
    collectifs.map((c) => [
      c.nom,
      c.contact,
      c.email,
      c.telephone ?? "",
      c.ville ?? "",
      c.typeCollectif,
      c.tailleCollectif,
      c.statut,
      c.source,
      c.createdAt.toLocaleDateString("fr-FR"),
    ])
  );

  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="collectifs-${date}.csv"`,
    },
  });
}
