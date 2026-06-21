// Correspondance des chemins entre FR et EN — seulement les pages qui ont un réel équivalent traduit.
export const FR_TO_EN: Record<string, string> = {
  "/": "/en",
  "/solution": "/en/method",
  "/tarifs": "/en/pricing",
  "/a-propos": "/en/about",
};

export const EN_TO_FR: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN).map(([fr, en]) => [en, fr])
);

// Si la page courante n'a pas d'équivalent traduit, on retombe sur l'accueil de l'autre langue.
export function getLocaleSwitchHref(pathname: string, locale: "fr" | "en"): string {
  if (locale === "fr") return FR_TO_EN[pathname] ?? "/en";
  return EN_TO_FR[pathname] ?? "/";
}
