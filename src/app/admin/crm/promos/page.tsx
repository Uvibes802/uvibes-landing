import { prisma } from "@/lib/prisma";
import PromoManager from "@/components/admin/PromoManager";

export default async function PromosPage() {
  let promos: Awaited<ReturnType<typeof prisma.promoCode.findMany>> = [];
  let dbError = false;

  try {
    promos = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  const actifs = promos.filter((p) => p.actif).length;

  // Sérialiser les dates pour le composant client
  const serialized = promos.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    expiresAt: p.expiresAt ? p.expiresAt.toISOString() : null,
  }));

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Codes promo</span>
        <span className="crm-topbar-user">{actifs} code{actifs > 1 ? "s" : ""} actif{actifs > 1 ? "s" : ""}</span>
      </div>
      <div className="crm-content">
        {dbError && (
          <div style={{ padding: "1rem", background: "#fff3cd", borderRadius: 8, marginBottom: 16, color: "#856404", fontSize: 14 }}>
            ⚠️ Impossible de se connecter à la base de données.
          </div>
        )}
        <PromoManager initial={serialized} />
      </div>
    </>
  );
}
