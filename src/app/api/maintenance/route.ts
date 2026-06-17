import { getMaintenanceStatus, setMaintenanceStatus } from "@/lib/maintenanceState";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Retourne le statut actuel du mode maintenance
export async function GET() {
  const status = getMaintenanceStatus();
  return NextResponse.json({ maintenanceMode: status });
}

// Active ou désactive le mode maintenance — réservé à l'admin connecté (session iron-session).
// Plus de mot de passe séparé (qui échouait si ADMIN_PASSWORD n'était pas défini).
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { maintenanceMode } = body;

    if (typeof maintenanceMode !== "boolean") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    setMaintenanceStatus(maintenanceMode);
    // Invalide le cache de toutes les pages (le layout lit l'état maintenance)
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, maintenanceMode });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
