import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/csv";

// Export CSV des abonnés newsletter
export async function GET() {
  const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  const csv = toCsv(
    ["Email", "Prénom", "Source", "Actif", "Inscrit le", "Désinscrit le"],
    subs.map((s) => [
      s.email,
      s.prenom ?? "",
      s.source,
      s.actif ? "oui" : "non",
      s.createdAt.toLocaleDateString("fr-FR"),
      s.unsubscribedAt ? s.unsubscribedAt.toLocaleDateString("fr-FR") : "",
    ])
  );

  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-${date}.csv"`,
    },
  });
}
