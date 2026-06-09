"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Doc {
  slug: string;
  titre: string;
  version: string;
  contenu: string;
  updatedAt: string | Date;
}

export default function LegalDocsManager({ docs }: { docs: Doc[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <p
        style={{
          fontSize: 13,
          color: "var(--crm-muted)",
          background: "rgba(253,110,0,.06)",
          border: "1px solid rgba(253,110,0,.18)",
          borderRadius: 10,
          padding: "12px 16px",
          margin: 0,
        }}
      >
        Mise en forme : <code>## Titre</code> pour un article, <code>### Sous-titre</code> pour un
        sous-article, <code>- </code> en début de ligne pour une puce, une ligne vide pour séparer les
        paragraphes. Ces documents sont ceux que le client accepte à la signature de son devis.
      </p>

      {docs.map((doc) => (
        <DocEditor key={doc.slug} doc={doc} />
      ))}
    </div>
  );
}

function DocEditor({ doc }: { doc: Doc }) {
  const [titre, setTitre] = useState(doc.titre);
  const [version, setVersion] = useState(doc.version);
  const [contenu, setContenu] = useState(doc.contenu);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const dirty = titre !== doc.titre || version !== doc.version || contenu !== doc.contenu;

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/cms/documents/${doc.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, version, contenu }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      doc.titre = titre;
      doc.version = version;
      doc.contenu = contenu;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="crm-detail-card" style={{ borderLeft: "4px solid var(--mainColor)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <span className="crm-detail-section-title" style={{ textTransform: "uppercase" }}>
          {doc.slug}
        </span>
        <a
          href={`/documents/${doc.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="crm-btn --sm --outline"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          Voir la page <ExternalLink size={13} />
        </a>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: "1 1 280px" }}>
          <label className="crm-cms-item-label" htmlFor={`titre-${doc.slug}`}>
            Titre du document
          </label>
          <input
            id={`titre-${doc.slug}`}
            className="crm-field-input"
            style={{ width: "100%" }}
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div style={{ flex: "0 1 200px" }}>
          <label className="crm-cms-item-label" htmlFor={`version-${doc.slug}`}>
            Version
          </label>
          <input
            id={`version-${doc.slug}`}
            className="crm-field-input"
            style={{ width: "100%" }}
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
      </div>

      <label className="crm-cms-item-label" htmlFor={`contenu-${doc.slug}`}>
        Contenu
      </label>
      <textarea
        id={`contenu-${doc.slug}`}
        className="crm-field-input"
        style={{ width: "100%", minHeight: 320, fontFamily: "monospace", lineHeight: 1.6, resize: "vertical" }}
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
      />

      {error && <p className="dv-error-msg" style={{ marginTop: 8 }}>{error}</p>}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
        <button className="crm-cms-save-btn" onClick={save} disabled={saving || !dirty}>
          {saving ? "Enregistrement..." : saved ? "✓ Enregistré" : "Enregistrer"}
        </button>
        {dirty && !saving && (
          <span style={{ fontSize: 12, color: "var(--crm-muted)" }}>Modifications non enregistrées</span>
        )}
      </div>
    </div>
  );
}
