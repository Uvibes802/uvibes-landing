// Échappe les caractères HTML d'une valeur fournie par l'utilisateur,
// avant de l'injecter dans un template d'email HTML (évite l'injection HTML/script).
export function escapeHtml(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
