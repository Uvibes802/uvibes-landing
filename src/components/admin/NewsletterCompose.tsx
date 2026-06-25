"use client";

import { Send } from "lucide-react";
import { useState } from "react";

// Composer + envoyer une newsletter à tous les inscrits actifs (via Brevo).
export default function NewsletterCompose({ actifs }: { actifs: number }) {
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [error, setError] = useState("");

  async function send() {
    if (!sujet.trim() || !message.trim()) {
      setError("Renseignez un sujet et un message.");
      return;
    }
    if (!confirm(`Envoyer cette newsletter à ${actifs} inscrit·e·s actif·ve·s ?`)) return;
    setSending(true);
    setError("");
    setResult(null);
    try {
      const r = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sujet, message }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? "Erreur lors de l'envoi.");
        return;
      }
      setResult(d);
      if (d.sent > 0) { setSujet(""); setMessage(""); }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="crm-card" style={{ marginBottom: 28 }}>
      <h2 className="crm-card-title" style={{ marginTop: 0 }}>Envoyer une newsletter</h2>
      <p style={{ fontSize: 13, color: "var(--crm-muted)", marginTop: -4 }}>
        Partira à <strong>{actifs}</strong> inscrit·e·s actif·ve·s depuis <code>contact@uvibes.fr</code> (relais Brevo).
      </p>

      <label className="crm-field-label" style={{ display: "block", margin: "14px 0 6px" }}>Sujet</label>
      <input
        className="crm-field-input"
        value={sujet}
        onChange={(e) => setSujet(e.target.value)}
        placeholder="Les nouveautés Uvibes de juin"
      />

      <label className="crm-field-label" style={{ display: "block", margin: "14px 0 6px" }}>Message</label>
      <textarea
        className="crm-field-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={8}
        placeholder="Écrivez votre message… (les sauts de ligne sont conservés)"
        style={{ resize: "vertical", lineHeight: 1.6 }}
      />

      {error && <p style={{ color: "#D90A5C", fontSize: 13, marginTop: 10 }}>{error}</p>}
      {result && (
        <p style={{ color: result.failed ? "#C2410C" : "#1a8a4a", fontSize: 13, marginTop: 10 }}>
          ✓ Envoyée : <strong>{result.sent}</strong> reçu·e·s
          {result.failed > 0 ? ` · ${result.failed} échec(s)` : ""} (sur {result.total}).
        </p>
      )}

      <button
        type="button"
        className="crm-btn --primary"
        onClick={send}
        disabled={sending}
        style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8 }}
      >
        <Send size={15} /> {sending ? "Envoi en cours…" : "Envoyer la newsletter"}
      </button>
    </div>
  );
}
