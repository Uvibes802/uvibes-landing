import MaintenanceToggle from "@/components/admin/MaintenanceToggle";
import { getMaintenanceStatus } from "@/lib/maintenanceState";

export default async function MaintenancePage() {
  const active = getMaintenanceStatus();
  return (
    <>
      <div className="crm-topbar"><span className="crm-topbar-title">Mode maintenance</span></div>
      <div className="crm-content">
        <div className="crm-detail-card" style={{ maxWidth: 480 }}>
          <p className="crm-detail-section-title">Statut du site</p>
          <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
            En mode maintenance, les visiteurs voient une page &quot;Site en maintenance&quot;. L&apos;accès admin reste disponible.
          </p>
          <MaintenanceToggle active={active} />
        </div>
      </div>
    </>
  );
}
