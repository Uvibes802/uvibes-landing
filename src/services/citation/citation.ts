"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export default function FetchCitation() {
  const [citation, setCitation] = useState<string>("");
  const [authorCitation, setAuthorCitation] = useState<string>("");
  const [roleAuthor, setRoleAuthor] = useState<string>("");
  const [userNumber, setUserNumber] = useState<string>("");
  const [userNumberTitle, setUserNumberTitle] = useState<string>("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const sanitize = (text: string) => {
      const div = document.createElement("p");
      div.innerHTML = text;
      return DOMPurify.sanitize(div.innerHTML, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const get = (cat: number) =>
      fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=${cat}`)
        .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });

    get(12).then((d) => setCitation(sanitize(d[0].content.rendered))).catch(() => {});
    get(13).then((d) => setAuthorCitation(sanitize(d[0].content.rendered))).catch(() => {});
    get(14).then((d) => setRoleAuthor(sanitize(d[0].content.rendered))).catch(() => {});
    get(15)
      .then((d) => {
        setUserNumber(sanitize(d[0].content.rendered));
        setUserNumberTitle(sanitize(d[0].title.rendered));
      })
      .catch(() => {});
  }, [apiUrl]);

  return { citation, authorCitation, roleAuthor, userNumber, userNumberTitle };
}
