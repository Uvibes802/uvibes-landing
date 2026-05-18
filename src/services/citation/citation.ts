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
    const sanitizeText = (text: string) => {
      const tempDiv = document.createElement("p");
      tempDiv.innerHTML = text;
      return DOMPurify.sanitize(tempDiv.innerHTML, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      })
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=12`)
      .then((response) => response.json())
      .then((data) => {
        setCitation(sanitizeText(data[0].content.rendered));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la citation:", error);
        setCitation("Citation non disponible");
      });

    fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=13`)
      .then((response) => response.json())
      .then((data) => {
        setAuthorCitation(sanitizeText(data[0].content.rendered));
      });

    fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=14`)
      .then((response) => response.json())
      .then((data) => {
        setRoleAuthor(sanitizeText(data[0].content.rendered));
      });
    fetch(`${apiUrl}/wp-json/wp/v2/posts?categories=15`)
      .then((response) => response.json())
      .then((data) => {
        setUserNumber(sanitizeText(data[0].content.rendered));
        setUserNumberTitle(sanitizeText(data[0].title.rendered));
      });
  }, [apiUrl]);

  return { citation, authorCitation, roleAuthor, userNumber, userNumberTitle };
}
