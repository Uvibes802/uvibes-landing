"use client";

import { ArrowLeft, Check, Download, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignaturePad from "./SignaturePad";
import { LEGAL_DOCS, requiredDocsForPlan } from "@/lib/legalDocs";
import { useDevisStatus } from "@/hooks/useDevisStatus";
import "@/styles/devis/devis.css";

interface Feature { slug: string; nom: string; inclus: boolean; }
interface Collectif {
  nom: string; contact: string; email: string;
  telephone?: string | null; ville?: string | null;
  typeCollectif: string; tailleCollectif: string;
}
interface QuoteData {
  id: string; numero: string; statut: string;
  planSlug: string; planNom: string; planCouleur: string;
  nombreUtilisateurs: number; dureeContrat: number;
  remise: number; prixHT: number; prixTTC: number;
  featuresJson: Feature[];
  signedAt?: Date | null; signedByName?: string | null; pdfPath?: string | null;
  collectif: Collectif;
  createdAt: Date; validUntil?: Date | null;
}

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    BROUILLON: { cls: "--brouillon", label: "Brouillon" },
    ENVOYE:    { cls: "--envoye", label: "En attente de signature" },
    VU:        { cls: "--envoye", label: "Consulté" },
    SIGNE:     { cls: "--signe", label: "✓ Signé" },
    EXPIRE:    { cls: "--expire", label: "Expiré" },
  };
  const s = map[statut] ?? { cls: "--brouillon", label: statut };
  return <span className={`dv-statut-badge ${s.cls}`}>{s.label}</span>;
}

export default function DevisDocument({ quote }: { quote: QuoteData }) {
  const [statut, setStatut] = useState(quote.statut);
  const [pdfPath, setPdfPath] = useState(quote.pdfPath);
  const [signingLoading, setSigningLoading] = useState(false);
  const { devisEnabled } = useDevisStatus();
  const [signedName, setSignedName] = useState(quote.signedByName ?? "");

  // Code promo
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; pourcentage: number } | null>(null);
  const [promoMsg, setPromoMsg] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const isSigned = statut === "SIGNE";
  const isExpired = quote.validUntil && new Date(quote.validUntil) < new Date() && !isSigned;

  // Documents à accepter selon l'offre (annuelle : CGV+DPA+SLA · événementielle : CGV+PDD)
  const requiredDocs = requiredDocsForPlan(quote.planSlug).map((slug) => LEGAL_DOCS[slug]);

  // Prix affichés : recalculés si un code promo est appliqué
  const prixHT = appliedPromo
    ? Math.round(quote.prixHT * (1 - appliedPromo.pourcentage / 100) * 100) / 100
    : quote.prixHT;
  const prixTTC = Math.round(prixHT * 1.2 * 100) / 100;

  async function applyPromo() {
    if (!promoInput.trim()) return;
    setPromoLoading(true); setPromoMsg("");
    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoInput, planSlug: quote.planSlug }),
      });
      const data = await res.json();
      if (!data.valid) {
        setAppliedPromo(null);
        setPromoMsg(data.error ?? "Code invalide");
        return;
      }
      setAppliedPromo({ code: data.code, pourcentage: data.pourcentage });
      setPromoMsg("");
    } catch {
      setPromoMsg("Erreur de vérification du code");
    } finally {
      setPromoLoading(false);
    }
  }

  async function handleSign(data: { signatureData: string; signedByName: string; signedByRole: string; acceptedDocs: string[] }) {
    setSigningLoading(true);
    try {
      const res = await fetch(`/api/devis/${quote.id}/signer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, promoCode: appliedPromo?.code ?? null }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setStatut("SIGNE");
      setSignedName(data.signedByName);
      setPdfPath(result.pdfUrl);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur";
      alert("Erreur : " + msg);
    } finally {
      setSigningLoading(false);
    }
  }

  return (
    <div className="dv-page">
      <header className="dv-header">
        <span className="dv-header-brand">Uvibes</span>
        <Link href="/" className="dv-header-back">
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </header>

      <main className="dv-doc-wrapper">
        <div className="dv-doc-header-bar">
          <div>
            <h1 className="dv-doc-numero">{quote.numero}</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-3)" }}>
              Émis le {new Date(quote.createdAt).toLocaleDateString("fr-FR")}
              {quote.validUntil && !isSigned && (
                <> · Valable jusqu&apos;au {new Date(quote.validUntil).toLocaleDateString("fr-FR")}</>
              )}
            </p>
          </div>
          <StatutBadge statut={statut} />
        </div>

        <div className="dv-doc-body">
          {/* Collectif */}
          <h2 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--rose)", margin: "0 0 12px" }}>Destinataire</h2>
          <div className="dv-info-grid">
            <div className="dv-info-item">
              <span className="dv-info-label">Organisation</span>
              <span className="dv-info-value">{quote.collectif.nom}</span>
            </div>
            <div className="dv-info-item">
              <span className="dv-info-label">Contact</span>
              <span className="dv-info-value">{quote.collectif.contact}</span>
            </div>
            <div className="dv-info-item">
              <span className="dv-info-label">Email</span>
              <span className="dv-info-value">{quote.collectif.email}</span>
            </div>
            <div className="dv-info-item">
              <span className="dv-info-label">Type</span>
              <span className="dv-info-value">{quote.collectif.typeCollectif}</span>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "var(--sol-divider)", margin: "20px 0" }} />

          {/* Plan */}
          <div className="dv-plan-summary" style={{ borderLeftColor: quote.planCouleur }}>
            <div className="dv-plan-summary-name">{quote.planNom}</div>
            <p className="dv-plan-summary-detail">{quote.nombreUtilisateurs} utilisateurs · {quote.dureeContrat} mois</p>
            {quote.remise > 0 && (
              <p className="dv-plan-summary-detail" style={{ color: "var(--rose)" }}>Remise appliquée : −{quote.remise}%</p>
            )}
          </div>

          {/* Features */}
          {quote.featuresJson.length > 0 && (
            <>
              <h2 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--rose)", margin: "20px 0 12px" }}>Fonctionnalités</h2>
              <ul className="dv-features-list">
                {quote.featuresJson.map((f) => (
                  <li key={f.slug} className={`dv-feature-item${!f.inclus ? " --off" : ""}`}>
                    {f.inclus
                      ? <Check size={14} strokeWidth={2.5} color="var(--orange)" />
                      : <X size={14} color="var(--ink-4)" />
                    }
                    {f.nom}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Prix */}
          <div className="dv-price-block">
            {quote.remise > 0 && (
              <div className="dv-price-row">
                <span className="dv-price-row-label">Remise</span>
                <span className="dv-price-row-val">−{quote.remise}%</span>
              </div>
            )}
            {appliedPromo && (
              <div className="dv-price-row">
                <span className="dv-price-row-label">Code promo {appliedPromo.code}</span>
                <span className="dv-price-row-val" style={{ color: "var(--rose)" }}>−{appliedPromo.pourcentage}%</span>
              </div>
            )}
            <div className="dv-price-row">
              <span className="dv-price-total-label">Total HT</span>
              <span className="dv-price-total-val">{prixHT.toLocaleString("fr-FR")} €</span>
            </div>
            <hr className="dv-price-divider" />
            <div className="dv-price-row">
              <span className="dv-price-row-label">TVA 20%</span>
              <span className="dv-price-row-val">{(prixTTC - prixHT).toLocaleString("fr-FR")} €</span>
            </div>
            <div className="dv-price-row">
              <span className="dv-price-row-label">Total TTC</span>
              <span className="dv-price-row-val">{prixTTC.toLocaleString("fr-FR")} €</span>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "var(--sol-divider)", margin: "24px 0" }} />

          {/* Section signature / succès */}
          {isSigned ? (
            <div className="dv-signed-success">
              <div className="dv-signed-icon">✅</div>
              <h3 className="dv-signed-title">Devis signé !</h3>
              <p className="dv-signed-sub">
                Signé par <strong>{signedName}</strong>
                {quote.signedAt && (
                  <> le {new Date(quote.signedAt).toLocaleDateString("fr-FR")}</>
                )}
                .<br />Un email de confirmation vous a été envoyé.
              </p>
              {pdfPath && (
                <a href={pdfPath} download className="dv-download-btn">
                  <Download size={16} /> Télécharger le PDF
                </a>
              )}
              {!pdfPath && (
                <Link href={`/api/devis/${quote.id}/pdf`} className="dv-download-btn">
                  <Download size={16} /> Télécharger le PDF
                </Link>
              )}
            </div>
          ) : isExpired ? (
            <div style={{ padding: 20, background: "rgba(176,80,126,.08)", borderRadius: 12, textAlign: "center" }}>
              <p style={{ color: "var(--ink-3)", margin: 0 }}>
                Ce devis a expiré.{" "}
                {devisEnabled ? (
                  <Link href="/devis" style={{ color: "var(--orange)" }}>Demander un nouveau devis →</Link>
                ) : (
                  <Link href="/rendez-vous" style={{ color: "var(--orange)" }}>Nous contacter →</Link>
                )}
              </p>
            </div>
          ) : (
            <>
              {/* Code promo */}
              <div className="dv-promo">
                <label className="dv-label">Vous avez un code promo&nbsp;?</label>
                <div className="dv-promo-row">
                  <input
                    className="dv-input"
                    type="text"
                    placeholder="Ex : BIENVENUE10"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoMsg(""); }}
                    disabled={!!appliedPromo}
                  />
                  {appliedPromo ? (
                    <button
                      type="button"
                      className="dv-promo-btn --remove"
                      onClick={() => { setAppliedPromo(null); setPromoInput(""); }}
                    >
                      Retirer
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="dv-promo-btn"
                      onClick={applyPromo}
                      disabled={promoLoading || !promoInput.trim()}
                    >
                      {promoLoading ? "..." : "Appliquer"}
                    </button>
                  )}
                </div>
                {appliedPromo && (
                  <p className="dv-promo-ok">✓ Code {appliedPromo.code} appliqué — −{appliedPromo.pourcentage}%</p>
                )}
                {promoMsg && <p className="dv-error-msg">{promoMsg}</p>}
              </div>

              <SignaturePad requiredDocs={requiredDocs} onSign={handleSign} loading={signingLoading} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
