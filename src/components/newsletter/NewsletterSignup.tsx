"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setMsg(data.error ?? "Erreur."); return; }
      setStatus("success");
      setMsg(data.reactivated ? "Bienvenue de nouveau !" : "Merci ! À bientôt dans votre boîte mail.");
    } catch {
      setStatus("error");
      setMsg("Erreur de connexion. Réessayez.");
    }
  }

  if (status === "success") {
    return (
      <div className="nl-success">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,.25)" />
          <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <form className="nl-form" onSubmit={handleSubmit} noValidate>
      <p className="nl-label">Restez informé·e</p>
      <div className="nl-row">
        <input
          type="email"
          className="nl-input"
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button type="submit" className="nl-btn" disabled={status === "loading" || !email}>
          {status === "loading" ? "..." : "→"}
        </button>
      </div>
      {status === "error" && <p className="nl-error">{msg}</p>}
    </form>
  );
}
