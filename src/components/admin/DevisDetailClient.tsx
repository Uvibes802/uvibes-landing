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
  promoCode?: string | null; promoPercent?: number | null;
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
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  // Modale d'envoi par email (adresse + message personnalisé)
  const [showSend, setShowSend] = useState(false);
  const [sendTo, setSendTo] = useState(initial.collectif.email);
  const [sendMessage, setSendMessage] = useState("");

  async function save() {
    setSaving(true); setMsg("");
    try {
      const res = await fetch(`/api/admin/devis/${quote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      if (res.ok) { setMsg("✓ Enregistré"); router.refresh(); }
    } finally { setSaving(false); }
  }

  const alreadySent = !!quote.sentAt || ["ENVOYE", "VU", "SIGNE"].includes(statut);

  async function doSend() {
    const email = sendTo.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg("Adresse email invalide."); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch(`/api/admin/devis/${quote.id}/envoyer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: sendMessage.trim() || undefined }),
      });
      const data = await res.json();
      if (res.ok) { setMsg(`✓ Devis envoyé à ${data.sentTo ?? email}`); setStatut("ENVOYE"); setShowSend(false); }
      else setMsg("Erreur : " + data.error);
    } finally { setSending(false); }
  }

  return (
    <>
      <div className="crm-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/devis" className="crm-btn --outline --sm">
            <ArrowLeft size={13} /> Retour
          </Link>
          <span className="crm-topbar-title">{quote.numero}</span>
          <span className={`crm-badge ${STATUT_BADGE[statut] ?? "--brouillon"}`}>{statut}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="crm-btn --outline --sm" onClick={() => { setSendTo(quote.collectif.email); setShowSend(true); }} disabled={sending}>
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

            {/* Documents téléchargeables */}
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Documents téléchargeables</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`/api/devis/${quote.id}/pdf`} target="_blank" className="crm-btn --outline --sm">
                  <Download size={13} /> Devis (PDF)
                </a>
                <a href={`/api/admin/devis/${quote.id}/facture`} target="_blank" className="crm-btn --outline --sm">
                  <Download size={13} /> Facture (PDF)
                </a>
                {statut === "SIGNE" && (
                  <a href={`/api/devis/${quote.id}/pdf`} target="_blank" className="crm-btn --outline --sm">
                    <Download size={13} /> Contrat (devis signé)
                  </a>
                )}
              </div>
              {statut !== "SIGNE" && (
                <p style={{ fontSize: 12, color: "var(--crm-muted)", marginTop: 8 }}>
                  Le contrat (devis signé avec acceptation des documents) sera disponible une fois le devis signé.
                </p>
              )}
            </div>

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
              <Link href={`/admin/collectifs/${quote.collectif.id}`} className="crm-btn --outline --sm" style={{ marginTop: 8 }}>
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

              {quote.promoPercent && quote.promoPercent > 0 ? (
                <p style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: "var(--rose, #D90A5C)" }}>
                  Remise appliquée : −{quote.promoPercent}%
                  {quote.promoCode ? ` (code ${quote.promoCode})` : ""}
                </p>
              ) : (
                <p style={{ marginTop: 12, fontSize: 12, color: "var(--crm-muted)" }}>
                  Aucune remise (prix standard)
                </p>
              )}

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

      {/* Modale d'envoi par email — adresse + message personnalisé */}
      {showSend && (
        <div
          onClick={() => !sending && setShowSend(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 14, width: "min(520px, 100%)", padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Envoyer le devis {quote.numero}</span>
              <button onClick={() => setShowSend(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)" }}><X size={18} /></button>
            </div>

            <div className="crm-field-row" style={{ marginBottom: 14 }}>
              <label className="crm-field-label">Adresse email du destinataire</label>
              <input
                className="crm-field-input"
                type="email"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                placeholder="client@organisation.fr"
              />
            </div>

            <div className="crm-field-row" style={{ marginBottom: 18 }}>
              <label className="crm-field-label">Message personnalisé (optionnel)</label>
              <textarea
                className="crm-field-textarea"
                style={{ minHeight: 110 }}
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                placeholder="Bonjour, suite à notre échange, voici votre devis personnalisé…"
              />
              <span style={{ fontSize: 11, color: "var(--crm-muted)", marginTop: 4 }}>
                Ce message apparaîtra en tête de l&apos;email, avant le récapitulatif du devis.
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="crm-btn --outline" onClick={() => setShowSend(false)} disabled={sending}>Annuler</button>
              <button className="crm-btn --primary" onClick={doSend} disabled={sending}>
                <Mail size={13} /> {sending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
