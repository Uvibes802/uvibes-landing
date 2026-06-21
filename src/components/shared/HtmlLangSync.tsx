"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Le root layout ne peut déclarer qu'un seul <html lang="…"> statique côté serveur ;
// ce composant le corrige côté client selon la langue réelle de la route (/en/...).
export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/en") ? "en" : "fr";
  }, [pathname]);

  return null;
}
