"use client";

import { Plus, Search, Trash2, ToggleLeft, ToggleRight, Mail, Check } from "lucide-react";
import { useState } from "react";

interface Promo {
  id: string;
  code: string;
  pourcentage: number;
  description: string | null;
  actif: boolean;
  expiresAt: string | null;
  usageMax: number | null;
  usageCount: number;
  planSlug: string | null;
}

interface PlanPreview {
  slug: string;
  nom: string;
  prixAnnuel: number;
}

export default function PromoManager({ initial, plans }: { initial: Promo[]; plans: PlanPreview[] }) {
  const [items, setItems] = useState<Promo[]>(initial);
  const [msg, setMsg] = useState("");
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? items.filter((i) => i.code.toLowerCase().includes(query.trim().toLowerCase()) || (i.description ?? "").toLowerCase().includes(query.trim().toLowerCase()))
    : items;

  // Formulaire création
  const [creating, setCreating] = useState(false);
  const [code, setCode] = useState("");
  const [pct, setPct] = useState("");
  const [desc, setDesc] = useState("");
  const [expires, setExpires] = useState("");
  const [usageMax, setUsageMax] = useState("");
  const [planSlug, setPlanSlug] = useState("");
  const [loading, setLoading] = useState(false);

  // Envoi email (par code)
  const [sendFor, setSendFor] = useState<string | null>(null);
  const [sendEmail, setSendEmail] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sending, setSending] = useState(false);

  const pctNum = Number(pct) || 0;

  async function create() {
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/admin/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, pourcentage: pctNum, description: desc, expiresAt: expires || null, usageMax: usageMax || null, planSlug: planSlug || null }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.error ?? "Erreur"); return; }
      setItems((p) => [data, ...p]);
      setCode(""); setPct(""); setDesc(""); setExpires(""); setUsageMax(""); setPlanSlug(""); setCreating(false);
    } finally { setLoading(false); }
  }

  async function toggle(item: Promo) {
    const res = await fetch(`/api/admin/promos/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !item.actif }),
    });
    const data = await res.json();
    if (res.ok) setItems((p) => p.map((i) => (i.id === item.id ? data : i)));
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce code promo ?")) return;
    await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
    setItems((p) => p.filter((i) => i.id !== id));
  }

  async function send(promoId: string) {
    if (!sendEmail.trim()) { setMsg("Email du destinataire requis"); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch("/api/admin/promos/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoId, email: sendEmail.trim(), message: sendMessage }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.error ?? "Échec de l'envoi"); return; }
      setMsg("✅ Code envoyé à " + sendEmail);
      setSendFor(null); setSendEmail(""); setSendMessage("");
    } finally { setSending(false); }
  }

  return (
    <div>
      {msg && <div style={{ marginBottom: 12, padding: "8px 14px", background: "rgba(217,10,92,.08)", borderRadius: 8, fontSize: 13, color: "var(--rose, #D90A5C)" }}>{msg}</div>}

      <div className="crm-table-wrap" style={{ marginBottom: 16 }}>
        <div className="crm-table-header">
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--crm-muted)" }} />
            <input
              className="crm-search"
              style={{ paddingLeft: 30 }}
              type="search"
              placeholder="Rechercher un code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="crm-btn --primary --sm" onClick={() => setCreating((v) => !v)}>
            <Plus size={13} /> Nouveau code
          </button>
        </div>

        <table className="crm-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Réduction</th>
              <th>Offre</th>
              <th>Utilisation</th>
              <th>Expiration</th>
              <th>Actif</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--crm-muted)" }}>Aucun code promo</td></tr>
            )}
            {filtered.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, letterSpacing: ".04em" }}>{item.code}</td>
                <td>
                  <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "rgba(253,110,0,.12)", color: "#D90A5C", fontWeight: 700, fontSize: 13 }}>
                    −{item.pourcentage}%
                  </span>
                </td>
                <td style={{ fontSize: 13 }}>
                  {item.planSlug ? (plans.find((p) => p.slug === item.planSlug)?.nom ?? item.planSlug) : <span style={{ color: "var(--crm-muted)" }}>Toutes les offres</span>}
                </td>
                <td style={{ fontSize: 13 }}>
                  {item.usageCount}{item.usageMax !== null ? ` / ${item.usageMax}` : ""}
                </td>
                <td style={{ fontSize: 13 }}>
                  {item.expiresAt ? new Date(item.expiresAt).toLocaleDateString("fr-FR") : "—"}
                </td>
                <td>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: item.actif ? "#16a34a" : "var(--crm-muted)" }} onClick={() => toggle(item)}>
                    {item.actif ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                </td>
                <td style={{ display: "flex", gap: 6 }}>
                  <button className="crm-btn --outline --sm" onClick={() => { setSendFor(sendFor === item.id ? null : item.id); setMsg(""); }} title="Envoyer par email">
                    <Mail size={12} />
                  </button>
                  <button className="crm-btn --danger --sm" onClick={() => remove(item.id)}>
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire création */}
      {creating && (
        <div className="crm-detail-card" style={{ marginBottom: 20 }}>
          <p className="crm-detail-section-title">Nouveau code promo</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="crm-field-row">
              <label className="crm-field-label">Code *</label>
              <input className="crm-field-input" value={code} placeholder="BIENVENUE10" onChange={(e) => setCode(e.target.value.toUpperCase())} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Pourcentage de réduction *</label>
              <input className="crm-field-input" type="number" min={1} max={100} value={pct} placeholder="10" onChange={(e) => setPct(e.target.value)} />
            </div>
            <div className="crm-field-row" style={{ gridColumn: "1 / -1" }}>
              <label className="crm-field-label">Description (interne, optionnel)</label>
              <input className="crm-field-input" value={desc} placeholder="Offre de lancement" onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="crm-field-row" style={{ gridColumn: "1 / -1" }}>
              <label className="crm-field-label">Offre concernée</label>
              <select className="crm-field-input" value={planSlug} onChange={(e) => setPlanSlug(e.target.value)}>
                <option value="">Toutes les offres</option>
                {plans.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.nom}</option>
                ))}
              </select>
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Expire le (optionnel)</label>
              <input className="crm-field-input" type="date" value={expires} onChange={(e) => setExpires(e.target.value)} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Nombre d&apos;utilisations max (optionnel)</label>
              <input className="crm-field-input" type="number" min={1} value={usageMax} placeholder="illimité" onChange={(e) => setUsageMax(e.target.value)} />
            </div>
          </div>

          {/* Visualisation de la réduction sur les vraies offres */}
          {pctNum > 0 && plans.length > 0 && (
            <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, background: "rgba(253,110,0,.07)", border: "1px solid rgba(253,110,0,.15)", fontSize: 14 }}>
              <p style={{ margin: "0 0 10px", fontWeight: 600, color: "var(--crm-muted)" }}>
                Aperçu de la réduction sur {planSlug ? "l'offre concernée" : "les offres"} :
              </p>
              {plans.filter((p) => !planSlug || p.slug === planSlug).map((p) => {
                const reduction = Math.round(p.prixAnnuel * (pctNum / 100));
                return (
                  <div key={p.nom} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", borderTop: "1px solid rgba(253,110,0,.12)" }}>
                    <span style={{ fontWeight: 600 }}>{p.nom}</span>
                    <span>
                      <span style={{ color: "var(--crm-muted)", textDecoration: "line-through" }}>{p.prixAnnuel.toLocaleString("fr-FR")} €</span>{" "}
                      <span style={{ color: "#D90A5C", fontWeight: 700 }}>−{reduction.toLocaleString("fr-FR")} €</span>{" "}
                      → <strong>{(p.prixAnnuel - reduction).toLocaleString("fr-FR")} €</strong>
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="crm-btn --primary" onClick={create} disabled={loading}>{loading ? "..." : "Créer le code"}</button>
            <button className="crm-btn --outline" onClick={() => setCreating(false)}>Annuler</button>
          </div>
        </div>
      )}

      {/* Formulaire envoi email */}
      {sendFor && (
        <div className="crm-detail-card">
          <p className="crm-detail-section-title">
            Envoyer le code {items.find((i) => i.id === sendFor)?.code} par email
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <div className="crm-field-row">
              <label className="crm-field-label">Email du client *</label>
              <input className="crm-field-input" type="email" value={sendEmail} placeholder="client@exemple.fr" onChange={(e) => setSendEmail(e.target.value)} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Message personnalisé (optionnel)</label>
              <textarea className="crm-field-textarea" value={sendMessage} placeholder="Bonjour, suite à notre échange, voici un code de réduction…" onChange={(e) => setSendMessage(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="crm-btn --primary" onClick={() => send(sendFor)} disabled={sending}>
              {sending ? "Envoi..." : <><Check size={14} /> Envoyer</>}
            </button>
            <button className="crm-btn --outline" onClick={() => setSendFor(null)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}
