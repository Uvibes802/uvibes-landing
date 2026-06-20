"use client";

import { useEffect, useState } from "react";

// Lit le toggle admin « devis-disabled » (CmsContent) — masque les CTA devis
// partout sur le site quand la directrice désactive temporairement les demandes.
export function useDevisStatus(): { devisEnabled: boolean; loaded: boolean } {
  const [devisEnabled, setDevisEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => setDevisEnabled(s["devis-disabled"] !== "true"))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return { devisEnabled, loaded };
}
