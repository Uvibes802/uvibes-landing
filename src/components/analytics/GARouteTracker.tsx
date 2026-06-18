"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// App Router ne renvoie pas de page_view lors des navigations client.
// Ce petit traqueur envoie un page_view à chaque changement de route.
export default function GARouteTracker() {
  const pathname = usePathname();
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname, GA_ID]);

  return null;
}
