"use client";

import { useEffect, useState } from "react";

// Citation BannerCount servie par la DB (CmsContent via /api/settings) — plus de WordPress.
// Éditable depuis l'admin (Contenus éditoriaux). FALLBACK utilisé si la DB ne répond pas.
const FALLBACK = {
  citation: "Uvibes a transformé la façon dont nos équipes se connaissent vraiment.",
  authorCitation: "Sophie M.",
  roleAuthor: "DRH — Groupe industriel, 800 collaborateurs",
  userNumber: "+ de 3 500 utilisateurs",
  userNumberTitle: "En 2026, sur Uvibes :",
};

export default function FetchCitation() {
  const [citation, setCitation] = useState<string>(FALLBACK.citation);
  const [authorCitation, setAuthorCitation] = useState<string>(FALLBACK.authorCitation);
  const [roleAuthor, setRoleAuthor] = useState<string>(FALLBACK.roleAuthor);
  const [userNumber, setUserNumber] = useState<string>(FALLBACK.userNumber);
  const [userNumberTitle, setUserNumberTitle] = useState<string>(FALLBACK.userNumberTitle);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s: Record<string, string>) => {
        if (s["citation-texte"]) setCitation(s["citation-texte"]);
        if (s["citation-auteur"]) setAuthorCitation(s["citation-auteur"]);
        if (s["citation-role"]) setRoleAuthor(s["citation-role"]);
        if (s["user-number"]) setUserNumber(s["user-number"]);
        if (s["user-number-title"]) setUserNumberTitle(s["user-number-title"]);
      })
      .catch(() => {});
  }, []);

  return { citation, authorCitation, roleAuthor, userNumber, userNumberTitle };
}
