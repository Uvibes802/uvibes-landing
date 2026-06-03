"use client";

import { useState } from "react";
import { Download, Mail, UserMinus, Search } from "lucide-react";
import type { NewsletterSubscriber } from "@prisma/client";

export default function NewsletterManager({
  initialSubscribers,
}: {
  initialSubscribers: NewsletterSubscriber[];
}) {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "actif" | "inactif">("actif");
  const [addEmail, setAddEmail] = useState("");
  const [addPrenom, setAddPrenom] = useState("");
  const [adding, setAdding] = useState(false);
  const [addMsg, setAddMsg] = useState("");

  const filtered = subscribers.filter((s) => {
    const matchSearch =
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.prenom?.toLowerCase() ?? "").includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "actif" && s.actif) ||
      (filter === "inactif" && !s.actif);
    return matchSearch && matchFilter;
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!addEmail) return;
    setAdding(true);
    setAddMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: addEmail, prenom: addPrenom, source: "crm" }),
      });
      const data = await res.json();
      if (!res.ok) { setAddMsg(data.error ?? "Erreur."); return; }
      setAddMsg(data.reactivated ? "Réactivé !" : "Inscrit !");
      setAddEmail(""); setAddPrenom("");
      // Rafraîchir (simple reload)
      window.location.reload();
    } finally {
      setAdding(false);
    }
  }

  async function handleUnsubscribe(email: string) {
    if (!confirm(`Désinscrire ${email} ?`)) return;
    await fetch("/api/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubscribers((prev) => prev.map((s) => s.email === email ? { ...s, actif: false } : s));
  }

  function exportCsv() {
    const actifs = subscribers.filter((s) => s.actif);
    const csv = ["Prénom,Email,Source,Date inscription"]
      .concat(actifs.map((s) =>
        `${s.prenom ?? ""},${s.email},${s.source},${new Date(s.createdAt).toLocaleDateString("fr-FR")}`
      ))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Ajout manuel */}
      <div className="crm-detail-card" style={{ maxWidth: 600 }}>
        <p className="crm-detail-section-title">Ajouter un abonné</p>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div className="crm-field-row" style={{ flex: 1, minWidth: 180 }}>
            <label className="crm-field-label">Email *</label>
            <input
              className="crm-field-input"
              type="email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              placeholder="nom@example.fr"
              required
            />
          </div>
          <div className="crm-field-row" style={{ flex: 1, minWidth: 140 }}>
            <label className="crm-field-label">Prénom</label>
            <input
              className="crm-field-input"
              value={addPrenom}
              onChange={(e) => setAddPrenom(e.target.value)}
              placeholder="Optionnel"
            />
          </div>
          <button type="submit" className="crm-btn --primary" disabled={adding} style={{ marginBottom: 16 }}>
            <Mail size={14} /> {adding ? "Ajout..." : "Ajouter"}
          </button>
        </form>
        {addMsg && <p style={{ fontSize: 13, color: "var(--crm-accent)", marginTop: -8 }}>{addMsg}</p>}
      </div>

      {/* Table */}
      <div className="crm-table-wrap">
        <div className="crm-table-header">
          <span className="crm-table-title">Abonnés</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {/* Filtre */}
            <div style={{ display: "flex", gap: 4 }}>
              {(["actif", "all", "inactif"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`crm-btn --sm ${filter === f ? "--primary" : "--outline"}`}
                  style={{ textTransform: "capitalize" }}
                >
                  {f === "all" ? "Tous" : f === "actif" ? "Actifs" : "Désinscrits"}
                </button>
              ))}
            </div>

            {/* Recherche */}
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--crm-muted)" }} />
              <input
                className="crm-search"
                style={{ paddingLeft: 30 }}
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="crm-btn --outline --sm" onClick={exportCsv}>
              <Download size={13} /> Export CSV
            </button>
          </div>
        </div>

        <table className="crm-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Prénom</th>
              <th>Source</th>
              <th>Inscription</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--crm-muted)", padding: 32 }}>
                  Aucun abonné trouvé.
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.email}</td>
                <td>{s.prenom ?? "—"}</td>
                <td>
                  <span className="crm-badge --prospect" style={{ textTransform: "capitalize" }}>{s.source}</span>
                </td>
                <td style={{ fontSize: 12, color: "var(--crm-muted)" }}>
                  {new Date(s.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td>
                  <span className={`crm-badge ${s.actif ? "--signe" : "--expire"}`}>
                    {s.actif ? "Actif" : "Désinscrit"}
                  </span>
                </td>
                <td>
                  {s.actif && (
                    <button
                      className="crm-btn --danger --sm"
                      onClick={() => handleUnsubscribe(s.email)}
                      title="Désinscrire"
                    >
                      <UserMinus size={13} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
