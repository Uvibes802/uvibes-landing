"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Utilise un div (pas un p) pour éviter que le navigateur ferme le p parent
    const sanitize = (text: string) => {
      const result = DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return result || "";
    };

    const get = (cat: number) =>
      fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=${cat}`)
        .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });

    get(12).then((d) => { const v = sanitize(d[0].content.rendered); if (v) setCitation(v); }).catch(() => {});
    get(13).then((d) => { const v = sanitize(d[0].content.rendered); if (v) setAuthorCitation(v); }).catch(() => {});
    get(14).then((d) => { const v = sanitize(d[0].content.rendered); if (v) setRoleAuthor(v); }).catch(() => {});
    get(15)
      .then((d) => {
        const num = sanitize(d[0].content.rendered);
        const title = sanitize(d[0].title.rendered);
        if (num) setUserNumber(num);
        if (title) setUserNumberTitle(title);
      })
      .catch(() => {});
  }, [apiUrl]);

  return { citation, authorCitation, roleAuthor, userNumber, userNumberTitle };
}
