"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUTS_CRM = ["PROSPECT","QUALIFICATION","DEVIS_ENVOYE","NEGOCIATION","CLIENT","PERDU","INACTIF"];
const STATUT_BADGE: Record<string, string> = {
  BROUILLON: "--brouillon", ENVOYE: "--envoye", SIGNE: "--signe", REFUSE: "--refuse",
};

interface Quote {
  id: string; numero: string; planNom: string;
  prixHT: number; statut: string; createdAt: Date;
}

interface Collectif {
  id: string; nom: string; contact: string; email: string;
  telephone?: string | null; ville?: string | null;
  typeCollectif: string; tailleCollectif: string;
  usagesPrevus: string[]; notes?: string | null;
  statut: string; source: string; createdAt: Date;
  quotes: Quote[];
}

export default function CollectifFicheClient({ collectif: initial }: { collectif: Collectif }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: initial.nom, contact: initial.contact, email: initial.email,
    telephone: initial.telephone ?? "", ville: initial.ville ?? "",
    statut: initial.statut, notes: initial.notes ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true); setMsg("");
    try {
      const res = await fetch(`/api/admin/collectifs/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setMsg("✓ Enregistré"); router.refresh(); }
    } finally { setSaving(false); }
  }

  return (
    <>
      <div className="crm-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/crm/collectifs" className="crm-btn --outline --sm">
            <ArrowLeft size={13} /> Retour
          </Link>
          <span className="crm-topbar-title">{initial.nom}</span>
        </div>
        <button className="crm-btn --primary --sm" onClick={save} disabled={saving}>
          <Save size={13} /> {saving ? "..." : "Enregistrer"}
        </button>
      </div>

      {msg && (
        <div style={{ margin: "12px 28px 0", padding: "10px 16px", background: "rgba(22,163,74,.1)", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>
          {msg}
        </div>
      )}

      <div className="crm-content">
        <div className="crm-detail-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Infos contact */}
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Informations</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  ["Nom de l'organisation", "nom"],
                  ["Contact", "contact"],
                  ["Email", "email"],
                  ["Téléphone", "telephone"],
                  ["Ville", "ville"],
                ].map(([label, key]) => (
                  <div key={key} className="crm-field-row">
                    <label className="crm-field-label">{label}</label>
                    <input className="crm-field-input" value={(form as Record<string, string>)[key]} onChange={(e) => set(key, e.target.value)} />
                  </div>
                ))}
                <div className="crm-field-row">
                  <span className="crm-field-label">Type</span>
                  <span className="crm-field-value">{initial.typeCollectif}</span>
                </div>
                <div className="crm-field-row">
                  <span className="crm-field-label">Taille</span>
                  <span className="crm-field-value">{initial.tailleCollectif}</span>
                </div>
              </div>
              {initial.usagesPrevus.length > 0 && (
                <div className="crm-field-row" style={{ marginTop: 12 }}>
                  <span className="crm-field-label">Usages souhaités</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {initial.usagesPrevus.map((u) => (
                      <span key={u} style={{ padding: "3px 10px", background: "rgba(253,110,0,.1)", color: "var(--crm-accent)", borderRadius: 999, fontSize: 12 }}>{u}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Notes internes</p>
              <textarea
                className="crm-field-textarea"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Notes visibles uniquement par la directrice..."
              />
            </div>

            {/* Devis */}
            {initial.quotes.length > 0 && (
              <div className="crm-detail-card">
                <p className="crm-detail-section-title">Historique devis</p>
                <table className="crm-table">
                  <thead>
                    <tr><th>Numéro</th><th>Plan</th><th>Prix HT</th><th>Statut</th><th></th></tr>
                  </thead>
                  <tbody>
                    {initial.quotes.map((q) => (
                      <tr key={q.id}>
                        <td style={{ fontFamily: "monospace", fontSize: 12 }}>{q.numero}</td>
                        <td>{q.planNom}</td>
                        <td>{q.prixHT.toLocaleString("fr-FR")} €</td>
                        <td><span className={`crm-badge ${STATUT_BADGE[q.statut] ?? "--brouillon"}`}>{q.statut}</span></td>
                        <td><Link href={`/admin/crm/devis/${q.id}`} className="crm-btn --outline --sm">Voir</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar statut */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Statut CRM</p>
              <select className="crm-field-select" value={form.statut} onChange={(e) => set("statut", e.target.value)}>
                {STATUTS_CRM.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Source", initial.source],
                  ["Depuis le", new Date(initial.createdAt).toLocaleDateString("fr-FR")],
                  ["Devis", String(initial.quotes.length)],
                ].map(([l, v]) => (
                  <div key={l} className="crm-field-row">
                    <span className="crm-field-label">{l}</span>
                    <span className="crm-field-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
