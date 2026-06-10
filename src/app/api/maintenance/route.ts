import { getMaintenanceStatus, setMaintenanceStatus } from "@/lib/maintenanceState";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Mot de passe stocké dans .env.local — ne jamais mettre une valeur en dur ici
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Retourne le statut actuel du mode maintenance
export async function GET() {
  const status = getMaintenanceStatus();
  return NextResponse.json({ maintenanceMode: status });
}

// Active ou désactive le mode maintenance après vérification du mot de passe
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, maintenanceMode } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
