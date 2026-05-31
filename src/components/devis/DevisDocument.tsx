"use client";

import { ArrowLeft, Check, Download, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignaturePad from "./SignaturePad";
import "@/styles/devis/devis.css";

interface Feature { slug: string; nom: string; inclus: boolean; }
interface Collectif {
  nom: string; contact: string; email: string;
  telephone?: string | null; ville?: string | null;
  typeCollectif: string; tailleCollectif: string;
}
interface QuoteData {
  id: string; numero: string; statut: string;
  planNom: string; planCouleur: string;
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
  const [signedName, setSignedName] = useState(quote.signedByName ?? "");

  const isSigned = statut === "SIGNE";
  const isExpired = quote.validUntil && new Date(quote.validUntil) < new Date() && !isSigned;

  async function handleSign(data: { signatureData: string; signedByName: string; signedByRole: string }) {
    setSigningLoading(true);
    try {
      const res = await fetch(`/api/devis/${quote.id}/signer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

      <div className="dv-doc-wrapper">
        <div className="dv-doc-header-bar">
          <div>
            <div className="dv-doc-numero">{quote.numero}</div>
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
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--rose)", margin: "0 0 12px" }}>Destinataire</h3>
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
              <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--rose)", margin: "20px 0 12px" }}>Fonctionnalités</h3>
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
            <div className="dv-price-row">
              <span className="dv-price-total-label">Total HT</span>
              <span className="dv-price-total-val">{quote.prixHT.toLocaleString("fr-FR")} €</span>
            </div>
            <hr className="dv-price-divider" />
            <div className="dv-price-row">
              <span className="dv-price-row-label">TVA 20%</span>
              <span className="dv-price-row-val">{(quote.prixTTC - quote.prixHT).toLocaleString("fr-FR")} €</span>
            </div>
            <div className="dv-price-row">
              <span className="dv-price-row-label">Total TTC</span>
              <span className="dv-price-row-val">{quote.prixTTC.toLocaleString("fr-FR")} €</span>
            </div>
          </div>

          {/* Mentions */}
          <p style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 16, lineHeight: 1.6 }}>
            Ce devis est valable 30 jours. La signature vaut acceptation des conditions générales de vente. TVA 20% applicable. Uvibes SAS — contact@uvibes.fr
          </p>

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
              <p style={{ color: "var(--ink-3)", margin: 0 }}>Ce devis a expiré. <Link href="/devis" style={{ color: "var(--orange)" }}>Demander un nouveau devis →</Link></p>
            </div>
          ) : (
            <SignaturePad onSign={handleSign} loading={signingLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
