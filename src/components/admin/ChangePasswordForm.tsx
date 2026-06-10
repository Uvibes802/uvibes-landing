"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next.length < 12) { setMsg({ type: "err", text: "Le nouveau mot de passe doit faire au moins 12 caractères." }); return; }
    if (next !== confirm) { setMsg({ type: "err", text: "Les deux nouveaux mots de passe ne correspondent pas." }); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setMsg({ type: "ok", text: "Mot de passe changé avec succès." });
      setCurrent(""); setNext(""); setConfirm("");
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Erreur" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="crm-detail-card" style={{ maxWidth: 460, borderLeft: "4px solid var(--mainColor)" }}>
      <p className="crm-detail-section-title">Changer mon mot de passe</p>

      <div style={{ marginTop: 14 }}>
        <label className="crm-cms-item-label" htmlFor="cp-current">Mot de passe actuel</label>
        <input id="cp-current" type="password" autoComplete="current-password" className="crm-field-input" style={{ width: "100%" }} value={current} onChange={(e) => setCurrent(e.target.value)} required />
      </div>
      <div style={{ marginTop: 14 }}>
        <label className="crm-cms-item-label" htmlFor="cp-new">Nouveau mot de passe (12 caractères min.)</label>
        <input id="cp-new" type="password" autoComplete="new-password" className="crm-field-input" style={{ width: "100%" }} value={next} onChange={(e) => setNext(e.target.value)} required minLength={12} />
      </div>
      <div style={{ marginTop: 14 }}>
        <label className="crm-cms-item-label" htmlFor="cp-confirm">Confirmer le nouveau mot de passe</label>
        <input id="cp-confirm" type="password" autoComplete="new-password" className="crm-field-input" style={{ width: "100%" }} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>

      {msg && (
        <p style={{ marginTop: 12, fontSize: 13, color: msg.type === "ok" ? "#16a34a" : "#b91c1c" }}>{msg.text}</p>
      )}

      <button type="submit" className="crm-cms-save-btn" style={{ marginTop: 16 }} disabled={loading}>
        {loading ? "Modification…" : "Changer le mot de passe"}
      </button>
    </form>
  );
}
