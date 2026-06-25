// Synchronisation des inscrits newsletter vers une liste Brevo (Contacts API).
// Variables d'environnement :
//   BREVO_API_KEY               = clé API v3 (Brevo → SMTP & API → API Keys)
//   BREVO_NEWSLETTER_LIST_ID    = id numérique de la liste (Brevo → Contacts → Lists)
// Best-effort : si Brevo échoue ou n'est pas configuré, on n'interrompt jamais le
// flux d'inscription — la table NewsletterSubscriber reste la source de vérité.

const BREVO_API = "https://api.brevo.com/v3";

// Ajoute / met à jour un contact dans la liste newsletter.
export async function syncBrevoContact(email: string, prenom?: string | null) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
  if (!apiKey || !listId) return; // non configuré → ignoré silencieusement
  try {
    await fetch(`${BREVO_API}/contacts`, {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        email,
        attributes: prenom ? { PRENOM: prenom } : undefined,
        listIds: [Number(listId)],
        updateEnabled: true, // met à jour le contact s'il existe déjà
      }),
    });
  } catch (e) {
    console.error("[brevo] sync contact échoué:", (e as Error).message);
  }
}

// Marque un contact comme désinscrit (blacklisté) côté Brevo.
export async function unsubscribeBrevoContact(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;
  try {
    await fetch(`${BREVO_API}/contacts/${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({ emailBlacklisted: true }),
    });
  } catch (e) {
    console.error("[brevo] désinscription échouée:", (e as Error).message);
  }
}
