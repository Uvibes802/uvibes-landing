import { prisma } from "@/lib/prisma";
import NewsletterManager from "@/components/admin/NewsletterManager";

export default async function NewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const total = subscribers.length;
  const actifs = subscribers.filter((s) => s.actif).length;
  const thisMonth = subscribers.filter((s) => {
    const now = new Date();
    return s.createdAt >= new Date(now.getFullYear(), now.getMonth(), 1);
  }).length;

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Newsletter</span>
        <span className="crm-topbar-user">{actifs} abonné·es actif·ves</span>
      </div>
      <div className="crm-content">
        {/* Métriques */}
        <div className="crm-metrics" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 28 }}>
          <div className="crm-metric-card --orange">
            <div className="crm-metric-label">Total inscrits</div>
            <div className="crm-metric-value">{total}</div>
            <div className="crm-metric-sub">depuis le début</div>
          </div>
          <div className="crm-metric-card --green">
            <div className="crm-metric-label">Actifs</div>
            <div className="crm-metric-value">{actifs}</div>
            <div className="crm-metric-sub">{total - actifs} désinscrits</div>
          </div>
          <div className="crm-metric-card">
            <div className="crm-metric-label">Ce mois</div>
            <div className="crm-metric-value">{thisMonth}</div>
            <div className="crm-metric-sub">nouvelles inscriptions</div>
          </div>
        </div>

        <NewsletterManager initialSubscribers={subscribers} />
      </div>
    </>
  );
}
