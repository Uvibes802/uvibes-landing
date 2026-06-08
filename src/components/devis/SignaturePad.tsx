"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  onSign: (data: { signatureData: string; signedByName: string; signedByRole: string; termsAccepted: boolean }) => Promise<void>;
  loading?: boolean;
}

export default function SignaturePad({ onSign, loading }: Props) {
  const canvasRef = useRef<SignatureCanvas>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [nameError, setNameError] = useState("");
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleEnd = () => setIsEmpty(false);
  const handleClear = () => { canvasRef.current?.clear(); setIsEmpty(true); };

  const handleValidate = async () => {
    if (!name.trim()) { setNameError("Nom requis"); return; }
    if (!terms) { setTermsError("Vous devez accepter les conditions pour signer."); return; }
    if (isEmpty || !canvasRef.current || canvasRef.current.isEmpty()) {
      alert("Veuillez apposer votre signature dans le cadre ci-dessus.");
      return;
    }

    const signatureData = canvasRef.current.toDataURL("image/png");
    await onSign({ signatureData, signedByName: name.trim(), signedByRole: role.trim(), termsAccepted: true });
  };

  return (
    <div className="dv-sign-section">
      <h3 className="dv-sign-title">Signer ce devis</h3>
      <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20 }}>
        En signant, vous acceptez les conditions générales et engagez votre organisation.
      </p>

      <div className="dv-sign-fields">
        <div className="dv-field">
          <label className="dv-label">Nom & prénom du signataire *</label>
          <input
            className={`dv-input${nameError ? " --error" : ""}`}
            type="text"
            placeholder="Marie Dupont"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
          />
          {nameError && <p className="dv-error-msg">{nameError}</p>}
        </div>
        <div className="dv-field">
          <label className="dv-label">Titre / Poste (optionnel)</label>
          <input
            className="dv-input"
            type="text"
            placeholder="DRH, Directeur, Responsable..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>

      <label className="dv-label" style={{ marginBottom: 8, display: "block" }}>
        Signature *
      </label>
      <div className="dv-sign-canvas-wrap">
        <SignatureCanvas
          ref={canvasRef}
          penColor="#4A1530"
          canvasProps={{ style: { width: "100%", height: "100%" } }}
          onEnd={handleEnd}
        />
        {isEmpty && (
          <div className="dv-sign-canvas-hint">Tracez votre signature ici</div>
        )}
      </div>

      {/* Acceptation CGV / confidentialité — obligatoire */}
      <label className="dv-terms">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => { setTerms(e.target.checked); setTermsError(""); }}
        />
        <span>
          J&apos;ai lu et j&apos;accepte les{" "}
          <a href="/conditions-d-utilisation" target="_blank" rel="noopener noreferrer">conditions générales</a>
          {" "}et la{" "}
          <a href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>.
        </span>
      </label>
      {termsError && <p className="dv-error-msg" style={{ marginTop: 4 }}>{termsError}</p>}

      <div className="dv-sign-actions">
        <button type="button" className="dv-sign-clear" onClick={handleClear}>
          Effacer
        </button>
        <button
          type="button"
          className="dv-sign-validate"
          onClick={handleValidate}
          disabled={loading}
        >
          {loading ? "Validation..." : "✓ Valider ma signature"}
        </button>
      </div>
    </div>
  );
}
