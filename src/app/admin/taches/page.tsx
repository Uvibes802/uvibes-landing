import { prisma } from "@/lib/prisma";
import GlobalTasksClient from "@/components/admin/GlobalTasksClient";

export default async function TachesPage() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ done: "asc" }, { dueDate: "asc" }],
    include: { collectif: { select: { id: true, nom: true } } },
  });
  return <GlobalTasksClient tasks={tasks} />;
}
