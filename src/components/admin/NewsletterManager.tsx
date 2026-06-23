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
  // Bornes optionnelles pour l'export par période (ex : préparer un import Brevo
  // d'une plage de dates précise). Vides = tous les abonnés actifs.
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
    // Échappe une cellule CSV (prénom avec virgule/guillemet ne doit pas casser
    // l'import Brevo) — même logique que le helper serveur lib/csv.ts.
    const cell = (v: string) => /[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

    // Bornes optionnelles : début de journée pour "du", fin de journée pour "au".
    const fromTs = fromDate ? new Date(fromDate + "T00:00:00").getTime() : -Infinity;
    const toTs = toDate ? new Date(toDate + "T23:59:59.999").getTime() : Infinity;

    const actifs = subscribers.filter((s) => {
      if (!s.actif) return false;
      const ts = new Date(s.createdAt).getTime();
      return ts >= fromTs && ts <= toTs;
    });

    const csv = ["Prénom,Email,Source,Date inscription"]
      .concat(actifs.map((s) =>
        [
          cell(s.prenom ?? ""),
          cell(s.email),
          cell(s.source),
          cell(new Date(s.createdAt).toLocaleDateString("fr-FR")),
        ].join(",")
      ))
      .join("\n");
    // BOM UTF-8 pour qu'Excel ouvre correctement les accents
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const suffix = fromDate || toDate ? `${fromDate || "debut"}_${toDate || "fin"}` : new Date().toISOString().slice(0, 10);
    a.download = `newsletter-${suffix}.csv`;
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

            {/* Export par période — bornes optionnelles (vides = tous les actifs) */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="date"
                className="crm-field-input"
                value={fromDate}
                max={toDate || undefined}
                onChange={(e) => setFromDate(e.target.value)}
                title="Inscrits à partir du (optionnel)"
                style={{ width: 138, padding: "5px 9px", fontSize: 12 }}
              />
              <span style={{ color: "var(--crm-muted)", fontSize: 12 }}>→</span>
              <input
                type="date"
                className="crm-field-input"
                value={toDate}
                min={fromDate || undefined}
                onChange={(e) => setToDate(e.target.value)}
                title="Inscrits jusqu'au (optionnel)"
                style={{ width: 138, padding: "5px 9px", fontSize: 12 }}
              />
              <button className="crm-btn --outline --sm" onClick={exportCsv}>
                <Download size={13} /> Export CSV
              </button>
            </div>
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
