import { getSession } from "@/lib/session";
import CrmSidebar from "@/components/admin/CrmSidebar";
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
      <CrmSidebar nom={session.adminNom} />
      <main className="crm-main">{children}</main>
    </div>
  );
}
