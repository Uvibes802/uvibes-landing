"use client";

import { useEffect, useState } from "react";

// Lit les contenus éditoriaux exposés par /api/settings (clés autorisées côté serveur).
// Renvoie une fonction `t(cle, fallback)` qui rend la valeur éditée ou le texte par défaut.
// Centralise le fetch (un seul appel par composant) — réutilisable partout.
export function useSettings() {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => { if (alive) setValues(s || {}); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (cle: string, fallback: string) => values[cle] || fallback;
}
