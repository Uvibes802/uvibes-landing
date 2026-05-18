import DOMPurify from "dompurify";

const decodeHtmlEntities = (text: string) => {
  if (typeof window === "undefined") {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export const sanitizeText = (text: string) => {
  if (typeof window === "undefined") {
    return decodeHtmlEntities(text.replace(/<[^>]*>/g, ""));
  }

  const sanitized = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
    ],
    ALLOWED_ATTR: [
      "href",
      "title",
      "target",
      "rel",
      "src",
      "alt",
      "width",
      "height",
    ],
  });

  return decodeHtmlEntities(sanitized);
};
