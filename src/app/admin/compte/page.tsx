import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ComptePage() {
  const session = await getSession();
  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Mon compte</span>
      </div>
      <div className="crm-content">
        <p style={{ fontSize: 13, color: "var(--crm-muted)", marginBottom: 20 }}>
          Connecté·e en tant que <strong>{session.adminNom}</strong> ({session.adminEmail}).
        </p>
        <ChangePasswordForm />
      </div>
    </>
  );
}
