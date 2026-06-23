import { prisma } from "@/lib/prisma";
import GlobalTasksClient from "@/components/admin/GlobalTasksClient";

export default async function TachesPage() {
  const [tasks, collectifs, quotes] = await Promise.all([
    prisma.task.findMany({
      orderBy: [{ done: "asc" }, { dueDate: "asc" }],
      include: {
        collectif: { select: { id: true, nom: true } },
        quote: { select: { id: true, numero: true } },
      },
    }),
    prisma.collectif.findMany({ select: { id: true, nom: true }, orderBy: { nom: "asc" } }),
    prisma.quote.findMany({ select: { id: true, numero: true }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  return <GlobalTasksClient tasks={tasks} collectifs={collectifs} quotes={quotes} />;
}
