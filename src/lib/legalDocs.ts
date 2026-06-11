// Registre des documents contractuels servis par le site et acceptés à la signature d'un devis.
// Source de vérité partagée entre le funnel (client) et la route de signature (serveur).
// Le contenu de chaque document est stocké en base (modèle LegalDocument) et éditable
// depuis le dashboard admin → /admin/cms/documents.

export interface LegalDocMeta {
  slug: string;
  titre: string; // libellé court affiché dans les cases d'acceptation
  route: string; // page publique du document
}

export const LEGAL_DOCS = {
  cgv: {
    slug: "cgv",
    titre: "Conditions générales de vente",
    route: "/documents/cgv",
  },
  "cgv-essai": {
    slug: "cgv-essai",
    titre: "Conditions générales de vente — Offre découverte (30 jours)",
    route: "/documents/cgv-essai",
  },
  dpa: {
    slug: "dpa",
    titre: "Accord de traitement des données",
    route: "/documents/dpa",
  },
  sla: {
    slug: "sla",
    titre: "Annexe relative au niveau de service",
    route: "/documents/sla",
  },
  pdd: {
    slug: "pdd",
    titre: "Politique de protection des données personnelles",
    route: "/documents/pdd",
  },
} as const satisfies Record<string, LegalDocMeta>;

export type LegalDocSlug = keyof typeof LEGAL_DOCS;

export const LEGAL_DOC_SLUGS = Object.keys(LEGAL_DOCS) as LegalDocSlug[];

/**
 * Documents que le client doit accepter pour signer un devis, selon l'offre.
 * - Offres annuelles (Connection / Premium / Boost) : CGV + DPA + SLA
 * - Offre découverte / événementielle (essai 30 jours, ponctuel) : CGV essai + PDD
 * Règle définie par la tutrice (fiche missions).
 */
export function requiredDocsForPlan(planSlug: string): LegalDocSlug[] {
  const slug = (planSlug || "").toLowerCase();
  if (
    slug.includes("decouverte") ||
    slug.includes("découverte") ||
    slug.includes("evenement") ||
    slug.includes("évenement") ||
    slug.includes("ponctuel") ||
    slug.includes("essai")
  ) {
    return ["cgv-essai", "pdd"];
  }
  return ["cgv", "dpa", "sla"];
}
