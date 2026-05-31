"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/admin/crm.css";

export default function CrmLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push("/admin/crm/dashboard");
      router.refresh();
    } catch {
      setError("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="crm-login-page">
      <div className="crm-login-card">
        <h1 className="crm-login-brand">Uvibes CRM</h1>
        <p className="crm-login-sub">Espace directrice — accès réservé</p>

        {error && <div className="crm-login-error">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="crm-field-label" style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input
              type="email"
              className="crm-field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@uvibes.fr"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="crm-field-label" style={{ display: "block", marginBottom: 6 }}>Mot de passe</label>
            <input
              type="password"
              className="crm-field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="crm-btn --primary" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter →"}
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 11, color: "var(--crm-muted)", textAlign: "center" }}>
          Identifiants par défaut :<br />
          admin@uvibes.fr · uvibes-admin-2026
        </p>
      </div>
    </div>
  );
}
