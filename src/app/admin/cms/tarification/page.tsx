import { prisma } from "@/lib/prisma";
import TarificationManager from "@/components/admin/TarificationManager";

export default async function TarificationPage() {
  const plans = await prisma.plan.findMany({
    orderBy: { ordre: "asc" },
    include: {
      planFeatures: {
        include: { feature: true },
        orderBy: { feature: { ordre: "asc" } },
      },
    },
  });
  return (
    <>
      <div className="crm-topbar"><span className="crm-topbar-title">Tarification</span></div>
      <div className="crm-content">
        <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
          Modifiez les prix et les fonctionnalités incluses dans chaque plan.
        </p>
        <TarificationManager plans={plans} />
      </div>
    </>
  );
}
