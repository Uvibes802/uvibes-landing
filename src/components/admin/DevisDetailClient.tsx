"use client";

import { ArrowLeft, Download, Mail, RefreshCw, Eye, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUTS = ["BROUILLON", "ENVOYE", "VU", "SIGNE", "REFUSE", "EXPIRE"];
const STATUT_BADGE: Record<string, string> = {
  BROUILLON: "--brouillon", ENVOYE: "--envoye", VU: "--envoye",
  SIGNE: "--signe", REFUSE: "--refuse", EXPIRE: "--expire",
};

interface Feature { slug: string; nom: string; inclus: boolean; }

interface Quote {
  id: string; numero: string; statut: string;
  planNom: string; planCouleur: string;
  nombreUtilisateurs: number; dureeContrat: number;
  remise: number; prixHT: number; prixTTC: number;
  featuresJson: Feature[];
  signedAt?: Date | null; signedByName?: string | null; signedByRole?: string | null;
  pdfPath?: string | null; sentAt?: Date | null;
  validUntil?: Date | null; createdAt: Date;
  collectif: { id: string; nom: string; contact: string; email: string; typeCollectif: string; statut: string; };
}

export default function DevisDetailClient({ quote: initial }: { quote: Quote }) {
  const router = useRouter();
  const [quote] = useState(initial);
  const [statut, setStatut] = useState(initial.statut);
  const [remise, setRemise] = useState(String(initial.remise));
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPdf, setShowPdf] = useState(false);

  async function save() {
    setSaving(true); setMsg("");
    try {
      const res = await fetch(`/api/admin/devis/${quote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut, remise: Number(remise) }),
      });
      if (res.ok) { setMsg("✓ Enregistré"); router.refresh(); }
    } finally { setSaving(false); }
  }

  const alreadySent = !!quote.sentAt || ["ENVOYE", "VU", "SIGNE"].includes(statut);

  async function envoyer() {
    const verbe = alreadySent ? "Renvoyer" : "Envoyer";
    if (!confirm(`${verbe} ce devis à ${quote.collectif.email} ?`)) return;
    setSending(true); setMsg("");
    try {
      const res = await fetch(`/api/admin/devis/${quote.id}/envoyer`, { method: "POST" });
      const data = await res.json();
      if (res.ok) { setMsg(alreadySent ? "✓ Email renvoyé" : "✓ Email envoyé"); setStatut("ENVOYE"); }
      else setMsg("Erreur : " + data.error);
    } finally { setSending(false); }
  }

  return (
    <>
      <div className="crm-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/crm/devis" className="crm-btn --outline --sm">
            <ArrowLeft size={13} /> Retour
          </Link>
          <span className="crm-topbar-title">{quote.numero}</span>
          <span className={`crm-badge ${STATUT_BADGE[statut] ?? "--brouillon"}`}>{statut}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="crm-btn --outline --sm" onClick={envoyer} disabled={sending}>
            <Mail size={13} /> {sending ? "Envoi..." : alreadySent ? "Renvoyer par email" : "Envoyer par email"}
          </button>
          <button className="crm-btn --outline --sm" onClick={() => setShowPdf(true)}>
            <Eye size={13} /> Aperçu PDF
          </button>
          <a href={`/api/devis/${quote.id}/pdf`} className="crm-btn --outline --sm" target="_blank">
            <Download size={13} /> Télécharger
          </a>
          <a href={`/devis/${quote.id}`} className="crm-btn --outline --sm" target="_blank">
            ↗ Vue client
          </a>
        </div>
      </div>

      {msg && (
        <div style={{ margin: "12px 28px 0", padding: "10px 16px", background: "rgba(22,163,74,.1)", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>
          {msg}
        </div>
      )}

      <div className="crm-content">
        <div className="crm-detail-grid">
          {/* Colonne principale */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Collectif */}
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Collectif</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["Organisation", quote.collectif.nom],
                  ["Contact", quote.collectif.contact],
                  ["Email", quote.collectif.email],
                  ["Type", quote.collectif.typeCollectif],
                ].map(([l, v]) => (
                  <div key={l} className="crm-field-row">
                    <span className="crm-field-label">{l}</span>
                    <span className="crm-field-value">{v}</span>
                  </div>
                ))}
              </div>
              <Link href={`/admin/crm/collectifs/${quote.collectif.id}`} className="crm-btn --outline --sm" style={{ marginTop: 8 }}>
                Voir la fiche collectif →
              </Link>
            </div>

            {/* Devis */}
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Détails du devis</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  ["Plan", quote.planNom],
                  ["Utilisateurs", String(quote.nombreUtilisateurs)],
                  ["Durée", `${quote.dureeContrat} mois`],
                  ["Prix HT", `${quote.prixHT.toLocaleString("fr-FR")} €`],
                  ["Prix TTC", `${quote.prixTTC.toLocaleString("fr-FR")} €`],
                  ["Émis le", new Date(quote.createdAt).toLocaleDateString("fr-FR")],
                ].map(([l, v]) => (
                  <div key={l} className="crm-field-row">
                    <span className="crm-field-label">{l}</span>
                    <span className="crm-field-value">{v}</span>
                  </div>
                ))}
              </div>

              {quote.featuresJson.length > 0 && (
                <>
                  <p className="crm-detail-section-title" style={{ marginTop: 16 }}>Fonctionnalités</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {quote.featuresJson.map((f) => (
                      <div key={f.slug} style={{ fontSize: 12, color: f.inclus ? "var(--crm-text)" : "var(--crm-muted)", display: "flex", gap: 6 }}>
                        <span>{f.inclus ? "✓" : "✕"}</span> {f.nom}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Signature */}
            {quote.signedAt && (
              <div className="crm-detail-card" style={{ borderLeft: "4px solid #16a34a" }}>
                <p className="crm-detail-section-title">Signature</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="crm-field-row">
                    <span className="crm-field-label">Signé par</span>
                    <span className="crm-field-value">{quote.signedByName}</span>
                  </div>
                  <div className="crm-field-row">
                    <span className="crm-field-label">Poste</span>
                    <span className="crm-field-value">{quote.signedByRole ?? "—"}</span>
                  </div>
                  <div className="crm-field-row">
                    <span className="crm-field-label">Date</span>
                    <span className="crm-field-value">{new Date(quote.signedAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Colonne actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Actions</p>

              <div className="crm-field-row">
                <label className="crm-field-label">Statut</label>
                <select className="crm-field-select" value={statut} onChange={(e) => setStatut(e.target.value)}>
                  {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="crm-field-row">
                <label className="crm-field-label">Remise manuelle (%)</label>
                <input
                  type="number" min={0} max={50} step={1}
                  className="crm-field-input"
                  value={remise}
                  onChange={(e) => setRemise(e.target.value)}
                />
              </div>

              <button className="crm-btn --primary" style={{ width: "100%", justifyContent: "center" }} onClick={save} disabled={saving}>
                <RefreshCw size={13} /> {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>

            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Informations</p>
              <div className="crm-field-row">
                <span className="crm-field-label">Numéro</span>
                <span className="crm-field-value" style={{ fontFamily: "monospace" }}>{quote.numero}</span>
              </div>
              {quote.sentAt && (
                <div className="crm-field-row">
                  <span className="crm-field-label">Envoyé le</span>
                  <span className="crm-field-value">{new Date(quote.sentAt).toLocaleDateString("fr-FR")}</span>
                </div>
              )}
              {quote.validUntil && (
                <div className="crm-field-row">
                  <span className="crm-field-label">Expire le</span>
                  <span className="crm-field-value">{new Date(quote.validUntil).toLocaleDateString("fr-FR")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modale aperçu PDF — affichage inline, sans téléchargement */}
      {showPdf && (
        <div
          onClick={() => setShowPdf(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 12, width: "min(900px, 100%)", height: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--crm-border, #eee)" }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Aperçu — {quote.numero}</span>
              <button onClick={() => setShowPdf(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)" }}>
                <X size={18} />
              </button>
            </div>
            <iframe
              src={`/api/devis/${quote.id}/pdf?inline=1`}
              title={`Aperçu du devis ${quote.numero}`}
              style={{ flex: 1, width: "100%", border: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
