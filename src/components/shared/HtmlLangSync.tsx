"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { detectLocale, RTL_LOCALES } from "@/lib/i18nRoutes";

// Le root layout ne peut déclarer qu'un seul <html lang="…"> statique côté serveur ;
// ce composant le corrige côté client selon la langue réelle de la route (/en/..., /es/...).
// dir="rtl" est posé pour les langues right-to-left (arabe) — le texte se lit alors
// correctement de droite à gauche ; les éléments décoratifs ne sont pas repositionnés.
export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = detectLocale(pathname);
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
