"use client";

import { Plus, Trash2, Download, Pencil, FileText, ScrollText } from "lucide-react";
import { useState } from "react";

interface Ligne { description: string; quantite: number; prixUnitaire: number }

export interface DocItem {
  id: string;
  numero: string;
  type: string; // FACTURE | CONTRAT
  clientNom: string;
  clientContact: string | null;
  clientEmail: string | null;
  clientAdresse: string | null;
  objet: string | null;
  dateEmission: string;
  dateEcheance: string | null;
  lignes: Ligne[];
  corps: string | null;
  conditions: string | null;
  tauxTva: number;
  statut: string;
}

// État du formulaire (création ou édition)
interface Draft {
  id: string | null; // null = création
  type: string;
  clientNom: string;
  clientContact: string;
  clientEmail: string;
  clientAdresse: string;
  objet: string;
  dateEcheance: string;
  lignes: Ligne[];
  corps: string;
  conditions: string;
  tauxTva: number;
}

const emptyDraft = (type: string): Draft => ({
  id: null,
  type,
  clientNom: "",
  clientContact: "",
  clientEmail: "",
  clientAdresse: "",
  objet: "",
  dateEcheance: "",
  lignes: [{ description: "", quantite: 1, prixUnitaire: 0 }],
  corps: "",
  conditions: type === "FACTURE"
    ? "Règlement à 30 jours. Association Éclatens — TVA non applicable, art. 293 B du CGI."
    : "Le présent contrat est régi par le droit français.",
  tauxTva: 0,
});

const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function DocumentsManager({ initial }: { initial: DocItem[] }) {
  const [items, setItems] = useState<DocItem[]>(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function startCreate(type: string) {
    setMsg("");
    setDraft(emptyDraft(type));
  }

  function startEdit(d: DocItem) {
    setMsg("");
    setDraft({
      id: d.id,
      type: d.type,
      clientNom: d.clientNom,
      clientContact: d.clientContact ?? "",
      clientEmail: d.clientEmail ?? "",
      clientAdresse: d.clientAdresse ?? "",
      objet: d.objet ?? "",
      dateEcheance: d.dateEcheance ? d.dateEcheance.slice(0, 10) : "",
      lignes: d.lignes.length ? d.lignes : [{ description: "", quantite: 1, prixUnitaire: 0 }],
      corps: d.corps ?? "",
      conditions: d.conditions ?? "",
      tauxTva: d.tauxTva,
    });
  }

  function patch(p: Partial<Draft>) {
    setDraft((d) => (d ? { ...d, ...p } : d));
  }

  // Lignes (factures)
  function setLigne(i: number, p: Partial<Ligne>) {
    setDraft((d) => d ? { ...d, lignes: d.lignes.map((l, k) => (k === i ? { ...l, ...p } : l)) } : d);
  }
  function addLigne() {
    setDraft((d) => d ? { ...d, lignes: [...d.lignes, { description: "", quantite: 1, prixUnitaire: 0 }] } : d);
  }
  function removeLigne(i: number) {
    setDraft((d) => d ? { ...d, lignes: d.lignes.filter((_, k) => k !== i) } : d);
  }

  const totalHT = draft ? draft.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0) : 0;
  const tva = Math.round(totalHT * (draft?.tauxTva ?? 0) / 100 * 100) / 100;
  const ttc = totalHT + tva;

  async function save() {
    if (!draft) return;
    if (!draft.clientNom.trim()) { setMsg("Nom du destinataire requis"); return; }
    setLoading(true); setMsg("");
    try {
      const payload = {
        type: draft.type,
        clientNom: draft.clientNom.trim(),
        clientContact: draft.clientContact,
        clientEmail: draft.clientEmail,
        clientAdresse: draft.clientAdresse,
        objet: draft.objet,
        dateEcheance: draft.dateEcheance || null,
        lignes: draft.type === "FACTURE" ? draft.lignes.filter((l) => l.description.trim()) : [],
        corps: draft.corps,
        conditions: draft.conditions,
        tauxTva: draft.tauxTva,
      };
      const url = draft.id ? `/api/admin/documents/${draft.id}` : "/api/admin/documents";
      const res = await fetch(url, {
        method: draft.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.error ?? "Erreur"); return; }
      const item: DocItem = { ...data, lignes: JSON.parse(data.lignesJson || "[]") };
      setItems((p) => draft.id ? p.map((i) => (i.id === item.id ? item : i)) : [item, ...p]);
      setDraft(null);
    } finally { setLoading(false); }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce document ?")) return;
    await fetch(`/api/admin/documents/${id}`, { method: "DELETE" });
    setItems((p) => p.filter((i) => i.id !== id));
  }

  return (
    <div>
      {msg && <div style={{ marginBottom: 12, padding: "8px 14px", background: "rgba(217,10,92,.08)", borderRadius: 8, fontSize: 13, color: "var(--rose, #D90A5C)" }}>{msg}</div>}

      <div className="crm-table-wrap" style={{ marginBottom: 16 }}>
        <div className="crm-table-header" style={{ justifyContent: "flex-end", gap: 8 }}>
          <button className="crm-btn --outline --sm" onClick={() => startCreate("CONTRAT")}>
            <ScrollText size={13} /> Nouveau contrat
          </button>
          <button className="crm-btn --primary --sm" onClick={() => startCreate("FACTURE")}>
            <Plus size={13} /> Nouvelle facture
          </button>
        </div>

        <table className="crm-table">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Type</th>
              <th>Destinataire</th>
              <th>Objet</th>
              <th>Émis le</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "var(--crm-muted)" }}>Aucun document</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, letterSpacing: ".02em" }}>{item.numero}</td>
                <td>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12, background: item.type === "FACTURE" ? "rgba(253,110,0,.12)" : "rgba(230,0,126,.12)", color: item.type === "FACTURE" ? "#fd6e00" : "#E6007E" }}>
                    {item.type === "FACTURE" ? <FileText size={12} /> : <ScrollText size={12} />}
                    {item.type === "FACTURE" ? "Facture" : "Contrat"}
                  </span>
                </td>
                <td>{item.clientNom}</td>
                <td style={{ fontSize: 13, color: "var(--crm-muted)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.objet || "—"}</td>
                <td style={{ fontSize: 13 }}>{new Date(item.dateEmission).toLocaleDateString("fr-FR")}</td>
                <td style={{ display: "flex", gap: 6 }}>
                  <a className="crm-btn --outline --sm" href={`/api/admin/documents/${item.id}/pdf?inline=1`} target="_blank" rel="noreferrer" title="Voir le PDF">
                    <Download size={12} />
                  </a>
                  <button className="crm-btn --outline --sm" onClick={() => startEdit(item)} title="Éditer">
                    <Pencil size={12} />
                  </button>
                  <button className="crm-btn --danger --sm" onClick={() => remove(item.id)} title="Supprimer">
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire création / édition */}
      {draft && (
        <div className="crm-detail-card">
          <p className="crm-detail-section-title">
            {draft.id ? "Éditer" : "Nouveau"} {draft.type === "FACTURE" ? "— Facture" : "— Contrat"}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="crm-field-row">
              <label className="crm-field-label">Destinataire *</label>
              <input className="crm-field-input" value={draft.clientNom} placeholder="Collectif Les Amarres" onChange={(e) => patch({ clientNom: e.target.value })} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Contact (personne)</label>
              <input className="crm-field-input" value={draft.clientContact} placeholder="Marie Dupont" onChange={(e) => patch({ clientContact: e.target.value })} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">Email</label>
              <input className="crm-field-input" type="email" value={draft.clientEmail} placeholder="contact@exemple.fr" onChange={(e) => patch({ clientEmail: e.target.value })} />
            </div>
            <div className="crm-field-row">
              <label className="crm-field-label">{draft.type === "FACTURE" ? "Échéance" : "Valable jusqu'au"}</label>
              <input className="crm-field-input" type="date" value={draft.dateEcheance} onChange={(e) => patch({ dateEcheance: e.target.value })} />
            </div>
            <div className="crm-field-row" style={{ gridColumn: "1 / -1" }}>
              <label className="crm-field-label">Adresse</label>
              <input className="crm-field-input" value={draft.clientAdresse} placeholder="12 rue des Lilas, 75011 Paris" onChange={(e) => patch({ clientAdresse: e.target.value })} />
            </div>
            <div className="crm-field-row" style={{ gridColumn: "1 / -1" }}>
              <label className="crm-field-label">Objet</label>
              <input className="crm-field-input" value={draft.objet} placeholder={draft.type === "FACTURE" ? "Abonnement Vibes Premium — 2026" : "Contrat de prestation Vibes Premium"} onChange={(e) => patch({ objet: e.target.value })} />
            </div>
          </div>

          {draft.type === "FACTURE" ? (
            <>
              <p className="crm-detail-section-title" style={{ marginTop: 22 }}>Lignes</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {draft.lignes.map((l, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 70px 110px 110px 32px", gap: 8, alignItems: "center" }}>
                    <input className="crm-field-input" value={l.description} placeholder="Description" onChange={(e) => setLigne(i, { description: e.target.value })} />
                    <input className="crm-field-input" type="number" min={0} value={l.quantite} title="Quantité" onChange={(e) => setLigne(i, { quantite: Number(e.target.value) || 0 })} />
                    <input className="crm-field-input" type="number" min={0} value={l.prixUnitaire} title="Prix unitaire HT" onChange={(e) => setLigne(i, { prixUnitaire: Number(e.target.value) || 0 })} />
                    <span style={{ textAlign: "right", fontWeight: 600, fontSize: 13 }}>{fmt(l.quantite * l.prixUnitaire)} €</span>
                    <button className="crm-btn --danger --sm" onClick={() => removeLigne(i)} disabled={draft.lignes.length === 1} title="Retirer"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
              <button className="crm-btn --outline --sm" style={{ marginTop: 10 }} onClick={addLigne}><Plus size={12} /> Ajouter une ligne</button>

              <div style={{ marginTop: 16, marginLeft: "auto", width: 280 }}>
                <div className="crm-field-row" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <label className="crm-field-label" style={{ margin: 0 }}>Taux de TVA (%)</label>
                  <input className="crm-field-input" type="number" min={0} max={100} style={{ width: 80, textAlign: "right" }} value={draft.tauxTva} onChange={(e) => patch({ tauxTva: Number(e.target.value) || 0 })} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 14 }}><span style={{ color: "var(--crm-muted)" }}>Total HT</span><strong>{fmt(totalHT)} €</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 14 }}><span style={{ color: "var(--crm-muted)" }}>TVA {draft.tauxTva}%</span><strong>{fmt(tva)} €</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", marginTop: 4, borderRadius: 8, background: "rgba(230,0,126,.1)", color: "#E6007E", fontWeight: 700 }}><span>Total TTC</span><span>{fmt(ttc)} €</span></div>
              </div>
            </>
          ) : (
            <div className="crm-field-row" style={{ marginTop: 18 }}>
              <label className="crm-field-label">Corps du contrat</label>
              <textarea className="crm-field-textarea" rows={12} value={draft.corps} placeholder={"Article 1 — Objet\nLe présent contrat a pour objet…\n\nArticle 2 — Durée\n…"} onChange={(e) => patch({ corps: e.target.value })} />
              <span style={{ fontSize: 12, color: "var(--crm-muted)", marginTop: 4 }}>Une ligne vide sépare deux paragraphes dans le PDF.</span>
            </div>
          )}

          <div className="crm-field-row" style={{ marginTop: 18 }}>
            <label className="crm-field-label">Conditions / mentions (pied de page)</label>
            <textarea className="crm-field-textarea" rows={2} value={draft.conditions} onChange={(e) => patch({ conditions: e.target.value })} />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="crm-btn --primary" onClick={save} disabled={loading}>{loading ? "..." : draft.id ? "Enregistrer" : "Créer le document"}</button>
            {draft.id && (
              <a className="crm-btn --outline" href={`/api/admin/documents/${draft.id}/pdf?inline=1`} target="_blank" rel="noreferrer"><Download size={14} /> Voir le PDF</a>
            )}
            <button className="crm-btn --outline" onClick={() => setDraft(null)}>Annuler</button>
          </div>
          {!draft.id && <p style={{ fontSize: 12, color: "var(--crm-muted)", marginTop: 8 }}>Le PDF sera téléchargeable une fois le document créé.</p>}
        </div>
      )}
    </div>
  );
}
