"use client";

import { Check, X, Trash2, Calendar, Settings } from "lucide-react";
import { useState } from "react";

const JOURS = ["", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const STATUT_BADGE: Record<string, string> = {
  EN_ATTENTE: "--brouillon",
  CONFIRME: "--signe",
  ANNULE: "--refuse",
};
const STATUT_LABEL: Record<string, string> = {
  EN_ATTENTE: "En attente",
  CONFIRME: "Confirmé ✓",
  ANNULE: "Annulé",
};

interface Reservation {
  id: string; date: string; heure: string;
  nom: string; email: string; telephone?: string | null;
  organisation?: string | null; sujet: string; message?: string | null;
  statut: string; noteAdmin?: string | null; createdAt: string | Date;
}

interface Dispo {
  id: string; jourSemaine: number; heureDebut: string;
  heureFin: string; dureeMinutes: number; actif: boolean;
}

interface Props {
  reservations: Reservation[];
  disponibilites: Dispo[];
}

export default function RdvManager({ reservations: initRes, disponibilites: initDispo }: Props) {
  const [reservations, setReservations] = useState(initRes);
  const [dispos, setDispos] = useState(initDispo);
  const [tab, setTab] = useState<"reservations" | "disponibilites">("reservations");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [note, setNote] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Nouveau créneau
  const [newJour, setNewJour] = useState(1);
  const [newDebut, setNewDebut] = useState("09:00");
  const [newFin, setNewFin] = useState("18:00");
  const [newDuree, setNewDuree] = useState(30);

  async function updateStatut(id: string, statut: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/rdv/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    if (res.ok) {
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, statut } : r));
      if (selected?.id === id) setSelected((s) => s ? { ...s, statut } : s);
      setMsg("✓ Statut mis à jour");
      setTimeout(() => setMsg(""), 2000);
    }
    setSaving(false);
  }

  async function sendReminder(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/rdv/reservations/${id}/reminder`, { method: "POST" });
      setMsg(res.ok ? "✓ Rappel envoyé au client" : "Échec de l'envoi du rappel");
    } catch {
      setMsg("Échec de l'envoi du rappel");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  async function saveNote(id: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/rdv/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteAdmin: note }),
    });
    if (res.ok) {
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, noteAdmin: note } : r));
      setMsg("✓ Note sauvegardée");
      setTimeout(() => setMsg(""), 2000);
    }
    setSaving(false);
  }

  async function deleteRes(id: string) {
    if (!confirm("Supprimer cette réservation ?")) return;
    await fetch(`/api/admin/rdv/reservations/${id}`, { method: "DELETE" });
    setReservations((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  async function toggleDispo(id: string, actif: boolean) {
    const res = await fetch(`/api/admin/rdv/disponibilites/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif }),
    });
    if (res.ok) setDispos((prev) => prev.map((d) => d.id === id ? { ...d, actif } : d));
  }

  async function updateDispo(id: string, field: string, value: string | number) {
    const res = await fetch(`/api/admin/rdv/disponibilites/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    if (res.ok) setDispos((prev) => prev.map((d) => d.id === id ? { ...d, [field]: value } : d));
  }

  async function deleteDispo(id: string) {
    if (!confirm("Supprimer ce créneau ?")) return;
    await fetch(`/api/admin/rdv/disponibilites/${id}`, { method: "DELETE" });
    setDispos((prev) => prev.filter((d) => d.id !== id));
  }

  async function addDispo() {
    const res = await fetch("/api/admin/rdv/disponibilites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jourSemaine: newJour, heureDebut: newDebut, heureFin: newFin, dureeMinutes: newDuree }),
    });
    const data = await res.json();
    if (res.ok) setDispos((prev) => [...prev, data]);
  }

  const filteredRes = filterStatut ? reservations.filter((r) => r.statut === filterStatut) : reservations;

  const enAttente = reservations.filter((r) => r.statut === "EN_ATTENTE").length;
  const confirmes = reservations.filter((r) => r.statut === "CONFIRME").length;

  return (
    <div>
      {/* Stats rapides */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total RDV", value: reservations.length, color: "var(--crm-text)" },
          { label: "En attente", value: enAttente, color: "var(--crm-accent)" },
          { label: "Confirmés", value: confirmes, color: "#16a34a" },
        ].map(({ label, value, color }) => (
          <div key={label} className="crm-detail-card" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="crm-field-label">{label}</span>
            <span style={{ fontSize: 24, fontWeight: 800, color, fontFamily: "var(--font-prompt, sans-serif)", lineHeight: 1 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button className={`crm-btn --sm ${tab === "reservations" ? "--primary" : "--outline"}`} onClick={() => setTab("reservations")}>
          <Calendar size={13} /> Réservations {enAttente > 0 && <span style={{ background: "var(--crm-accent)", color: "#fff", borderRadius: 999, padding: "1px 6px", fontSize: 10, marginLeft: 4 }}>{enAttente}</span>}
        </button>
        <button className={`crm-btn --sm ${tab === "disponibilites" ? "--primary" : "--outline"}`} onClick={() => setTab("disponibilites")}>
          <Settings size={13} /> Disponibilités ({dispos.filter(d => d.actif).length} actives)
        </button>
      </div>

      {msg && <div style={{ marginBottom: 12, padding: "8px 14px", background: "rgba(22,163,74,.1)", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>{msg}</div>}

      {/* TAB : Réservations */}
      {tab === "reservations" && (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 20 }}>
          <div>
            <div className="crm-table-wrap">
              <div className="crm-table-header">
                <select className="crm-search" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)} style={{ minWidth: 160 }}>
                  <option value="">Tous les statuts</option>
                  {Object.entries(STATUT_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <table className="crm-table">
                <thead>
                  <tr><th>Date</th><th>Heure</th><th>Nom</th><th>Sujet</th><th>Statut</th><th></th></tr>
                </thead>
                <tbody>
                  {filteredRes.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--crm-muted)" }}>Aucun rendez-vous</td></tr>
                  )}
                  {filteredRes.map((r) => (
                    <tr key={r.id} style={{ cursor: "pointer", background: selected?.id === r.id ? "rgba(253,110,0,.04)" : "" }} onClick={() => { setSelected(r); setNote(r.noteAdmin ?? ""); }}>
                      <td style={{ fontSize: 13 }}>{new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</td>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{r.heure}</td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{r.nom}</div>
                        <div style={{ fontSize: 11, color: "var(--crm-muted)" }}>{r.email}</div>
                      </td>
                      <td style={{ fontSize: 12, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.sujet}</td>
                      <td><span className={`crm-badge ${STATUT_BADGE[r.statut] ?? "--brouillon"}`}>{STATUT_LABEL[r.statut] ?? r.statut}</span></td>
                      <td>
                        <button className="crm-btn --danger --sm" onClick={(e) => { e.stopPropagation(); deleteRes(r.id); }}><Trash2 size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panneau détail */}
          {selected && (
            <div className="crm-detail-card" style={{ position: "sticky", top: 80, height: "fit-content" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p className="crm-detail-section-title" style={{ margin: 0 }}>Détail RDV</p>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)" }} onClick={() => setSelected(null)}><X size={16} /></button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Date", new Date(selected.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
                  ["Heure", selected.heure],
                  ["Nom", selected.nom],
                  ["Email", selected.email],
                  ["Téléphone", selected.telephone ?? "—"],
                  ["Organisation", selected.organisation ?? "—"],
                  ["Sujet", selected.sujet],
                ].map(([l, v]) => (
                  <div key={l} className="crm-field-row">
                    <span className="crm-field-label">{l}</span>
                    <span className="crm-field-value" style={{ fontSize: 13 }}>{v}</span>
                  </div>
                ))}
                {selected.message && (
                  <div className="crm-field-row">
                    <span className="crm-field-label">Message</span>
                    <span className="crm-field-value" style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{selected.message}</span>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                <button
                  className="crm-btn --sm"
                  style={{ background: selected.statut === "CONFIRME" ? "rgba(22,163,74,.1)" : "#16a34a", color: selected.statut === "CONFIRME" ? "#16a34a" : "#fff", border: selected.statut === "CONFIRME" ? "1px solid rgba(22,163,74,.3)" : "none", cursor: selected.statut === "CONFIRME" ? "default" : "pointer" }}
                  onClick={() => updateStatut(selected.id, "CONFIRME")}
                  disabled={saving || selected.statut === "CONFIRME"}
                >
                  <Check size={13} /> {selected.statut === "CONFIRME" ? "Confirmé ✓" : "Confirmer"}
                </button>
                <button className="crm-btn --danger --sm" onClick={() => updateStatut(selected.id, "ANNULE")} disabled={saving || selected.statut === "ANNULE"}>
                  <X size={13} /> {selected.statut === "ANNULE" ? "Annulé" : "Annuler"}
                </button>
                <button className="crm-btn --outline --sm" onClick={() => sendReminder(selected.id)} disabled={saving}>
                  <Calendar size={13} /> Envoyer un rappel
                </button>
              </div>

              <div className="crm-field-row" style={{ marginTop: 16 }}>
                <label className="crm-field-label">Note interne</label>
                <textarea className="crm-field-textarea" style={{ minHeight: 72 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note visible uniquement par l'admin..." />
              </div>
              <button className="crm-btn --outline --sm" onClick={() => saveNote(selected.id)} disabled={saving}>
                Sauvegarder la note
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB : Disponibilités */}
      {tab === "disponibilites" && (
        <div>
          <div className="crm-detail-card" style={{ marginBottom: 20 }}>
            <p className="crm-detail-section-title">Ajouter un créneau de disponibilité</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr) auto", gap: 12, alignItems: "end" }}>
              <div className="crm-field-row">
                <label className="crm-field-label">Jour</label>
                <select className="crm-field-select" value={newJour} onChange={(e) => setNewJour(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7].map((j) => <option key={j} value={j}>{JOURS[j]}</option>)}
                </select>
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Début</label>
                <input type="time" className="crm-field-input" value={newDebut} onChange={(e) => setNewDebut(e.target.value)} />
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Fin</label>
                <input type="time" className="crm-field-input" value={newFin} onChange={(e) => setNewFin(e.target.value)} />
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Durée (min)</label>
                <select className="crm-field-select" value={newDuree} onChange={(e) => setNewDuree(Number(e.target.value))}>
                  {[15, 30, 45, 60].map((d) => <option key={d} value={d}>{d} min</option>)}
                </select>
              </div>
              <button className="crm-btn --primary --sm" onClick={addDispo}>Ajouter</button>
            </div>
          </div>

          <div className="crm-table-wrap">
            <table className="crm-table">
              <thead>
                <tr><th>Jour</th><th>Début</th><th>Fin</th><th>Durée créneaux</th><th>Actif</th><th></th></tr>
              </thead>
              <tbody>
                {dispos.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--crm-muted)" }}>Aucune disponibilité configurée</td></tr>
                )}
                {dispos.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600, fontSize: 13 }}>{JOURS[d.jourSemaine]}</td>
                    <td>
                      <input type="time" className="crm-field-input" style={{ width: 100 }} value={d.heureDebut}
                        onChange={(e) => { setDispos((prev) => prev.map((x) => x.id === d.id ? { ...x, heureDebut: e.target.value } : x)); }}
                        onBlur={(e) => updateDispo(d.id, "heureDebut", e.target.value)}
                      />
                    </td>
                    <td>
                      <input type="time" className="crm-field-input" style={{ width: 100 }} value={d.heureFin}
                        onChange={(e) => { setDispos((prev) => prev.map((x) => x.id === d.id ? { ...x, heureFin: e.target.value } : x)); }}
                        onBlur={(e) => updateDispo(d.id, "heureFin", e.target.value)}
                      />
                    </td>
                    <td>
                      <select className="crm-field-select" style={{ width: 100 }} value={d.dureeMinutes}
                        onChange={(e) => updateDispo(d.id, "dureeMinutes", Number(e.target.value))}>
                        {[15, 30, 45, 60].map((x) => <option key={x} value={x}>{x} min</option>)}
                      </select>
                    </td>
                    <td>
                      <button
                        className={`crm-badge ${d.actif ? "--signe" : "--brouillon"}`}
                        style={{ background: "none", border: `1px solid ${d.actif ? "rgba(22,163,74,.3)" : "var(--crm-border)"}`, cursor: "pointer" }}
                        onClick={() => toggleDispo(d.id, !d.actif)}
                      >
                        {d.actif ? "✓ Actif" : "Inactif"}
                      </button>
                    </td>
                    <td>
                      <button className="crm-btn --danger --sm" onClick={() => deleteDispo(d.id)}><Trash2 size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
