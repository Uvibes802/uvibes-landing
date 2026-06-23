// Source unique des options de session iron-session.
// Volontairement sans import de "next/headers" → utilisable côté middleware (edge) ET serveur.

export interface SessionData {
  adminId?: string;
  adminEmail?: string;
  adminNom?: string;
  isLoggedIn: boolean;
  lastSeen?: number; // timestamp de la dernière activité → timeout d'inactivité
}

// Déconnexion automatique après 2 h d'inactivité (sécurité : une session admin
// oubliée sur un poste partagé ne reste plus valable indéfiniment).
export const IDLE_TIMEOUT_MS = 2 * 60 * 60 * 1000;

const secret = process.env.IRON_SESSION_SECRET;

// En production, un secret fort est obligatoire : pas de fallback faible.
if (process.env.NODE_ENV === "production" && !secret) {
  throw new Error("IRON_SESSION_SECRET doit être défini en production.");
}

export const SESSION_OPTIONS = {
  password: secret ?? "uvibes-crm-dev-secret-32-chars-min!!",
  cookieName: "uvibes_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24, // 1 jour (plafond absolu ; l'inactivité coupe avant via IDLE_TIMEOUT_MS)
  },
};
