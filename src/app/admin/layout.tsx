import { getSession } from "@/lib/session";
import CrmSidebar from "@/components/admin/CrmSidebar";
import CrmNotifications from "@/components/admin/CrmNotifications";
import "@/styles/admin/crm.css";

// Le middleware /src/middleware.ts gère la protection des routes.
// Ce layout n'affiche la sidebar que si l'utilisateur est authentifié.
export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Page login ou non authentifié → afficher sans sidebar
  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="crm-shell">
      {/* Blobs colorés animés en fond (déco — esprit site) */}
      <div className="crm-shell-deco" aria-hidden="true">
        <span className="crm-deco-blob crm-deco-blob--1" />
        <span className="crm-deco-blob crm-deco-blob--2" />
      </div>
      <CrmSidebar nom={session.adminNom} />
      {/* Cloche de notifications — fixe en haut à droite, sur toutes les pages admin */}
      <CrmNotifications />
      <main className="crm-main">{children}</main>
    </div>
  );
}
