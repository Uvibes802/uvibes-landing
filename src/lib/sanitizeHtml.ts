// Nettoyage HTML côté serveur (sans DOM) du contenu d'article saisi dans l'admin.
// Retire les vecteurs XSS courants tout en gardant la mise en forme (titres, listes, liens, images).
// Appliqué à l'écriture (POST/PUT) → le rendu public peut afficher le HTML stocké directement.
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  let out = html;

  // Balises dangereuses + leur contenu
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");
  out = out.replace(/<\/?(iframe|object|embed|form|input|textarea|noscript|base|meta|link|svg|math)\b[^>]*>/gi, "");

  // Gestionnaires d'événements inline : onclick="…", onload=…, etc.
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // URLs javascript: dans href/src
  out = out.replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=$2#$2');

  return out;
}
