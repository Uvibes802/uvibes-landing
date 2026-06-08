// Rate-limiting simple par IP, en mémoire.
// Note : l'état est par instance → suffisant en local / mono-instance.
// Pour un déploiement serverless multi-instances, brancher un store partagé (Redis…).

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Map<string, Entry>>();

interface Options {
  key: string;       // identifiant de la route (ex. "promo-validate")
  ip: string;        // IP du client
  max: number;       // nombre de requêtes autorisées par fenêtre
  windowMs: number;  // durée de la fenêtre en ms
}

/** Renvoie true si la requête est autorisée, false si la limite est atteinte. */
export function rateLimit({ key, ip, max, windowMs }: Options): boolean {
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = new Map();
    buckets.set(key, bucket);
  }

  const now = Date.now();
  const entry = bucket.get(ip);

  if (!entry || now > entry.resetAt) {
    bucket.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;

  entry.count++;
  return true;
}

/** Extrait l'IP cliente depuis l'en-tête x-forwarded-for. */
export function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
