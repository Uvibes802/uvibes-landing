// Langues du site — ajouter un code ici suffit pour qu'il apparaisse dans le sélecteur de langue,
// à condition que ses pages existent sous /<code>/... (cf. PATHS ci-dessous).
export const SUPPORTED_LOCALES = ["fr", "en", "es", "de", "it", "pt", "ru", "zh", "ja", "hi", "ar"] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  fr: "FR", en: "EN", es: "ES", de: "DE", it: "IT", pt: "PT",
  ru: "RU", zh: "中文", ja: "日本語", hi: "HI", ar: "عربي",
};

// Chemin FR canonique → chemin correspondant pour chaque langue traduite.
// Seules les pages qui ont un réel équivalent traduit apparaissent ici.
const PATHS: Record<string, Partial<Record<SiteLocale, string>>> = {
  "/": { en: "/en", es: "/es", de: "/de", it: "/it", pt: "/pt", ru: "/ru", zh: "/zh", ja: "/ja", hi: "/hi", ar: "/ar" },
  "/solution": { en: "/en/method", es: "/es/method", de: "/de/method", it: "/it/method", pt: "/pt/method", ru: "/ru/method", zh: "/zh/method", ja: "/ja/method", hi: "/hi/method", ar: "/ar/method" },
  "/tarifs": { en: "/en/pricing", es: "/es/pricing", de: "/de/pricing", it: "/it/pricing", pt: "/pt/pricing", ru: "/ru/pricing", zh: "/zh/pricing", ja: "/ja/pricing", hi: "/hi/pricing", ar: "/ar/pricing" },
  "/a-propos": { en: "/en/about", es: "/es/about", de: "/de/about", it: "/it/about", pt: "/pt/about", ru: "/ru/about", zh: "/zh/about", ja: "/ja/about", hi: "/hi/about", ar: "/ar/about" },
};

// Langues qui s'affichent de droite à gauche — déterminent dir="rtl" sur <html>.
export const RTL_LOCALES: SiteLocale[] = ["ar"];

export function detectLocale(pathname: string): SiteLocale {
  for (const l of SUPPORTED_LOCALES) {
    if (l !== "fr" && pathname.startsWith(`/${l}`)) return l;
  }
  return "fr";
}

// Retrouve le chemin FR canonique correspondant à une URL traduite donnée.
function frPathFor(pathname: string, locale: SiteLocale): string {
  if (locale === "fr") return pathname;
  for (const [fr, byLocale] of Object.entries(PATHS)) {
    if (byLocale[locale] === pathname) return fr;
  }
  return "/";
}

// Si la page courante n'a pas d'équivalent traduit dans la langue cible,
// on retombe sur l'accueil de cette langue (ou FR pour le français).
export function getLocaleSwitchHref(pathname: string, fromLocale: SiteLocale, toLocale: SiteLocale): string {
  if (toLocale === fromLocale) return pathname;
  const fr = frPathFor(pathname, fromLocale);
  if (toLocale === "fr") return fr;
  return PATHS[fr]?.[toLocale] ?? `/${toLocale}`;
}
