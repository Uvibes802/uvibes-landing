"use client";

import { useState } from "react";

interface Item { id: string; cle: string; label: string; valeur: string; }

// Clés avec rendu spécial
const TOGGLE_KEYS: Record<string, { on: string; off: string }> = {
  "rdv-systeme": { on: "custom", off: "calendly" },
};
const HIDDEN_KEYS = ["team-categories"]; // géré dans la page Équipe

export default function CmsContentManager({ items }: { items: Item[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(items.map((i) => [i.cle, i.valeur]))
  );
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const visible = items.filter((i) => !HIDDEN_KEYS.includes(i.cle));

  async function save(cle: string) {
    setLoading((l) => ({ ...l, [cle]: true }));
    try {
      await fetch(`/api/admin/cms/content/${cle}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valeur: values[cle] }),
      });
      setSaved((s) => ({ ...s, [cle]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [cle]: false })), 2000);
    } finally {
      setLoading((l) => ({ ...l, [cle]: false }));
    }
  }

  async function toggle(cle: string, opts: { on: string; off: string }) {
    const next = values[cle] === opts.on ? opts.off : opts.on;
    setValues((v) => ({ ...v, [cle]: next }));
    await fetch(`/api/admin/cms/content/${cle}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valeur: next }),
    });
    setSaved((s) => ({ ...s, [cle]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [cle]: false })), 2000);
  }

  return (
    <div>
      {/* Section RDV système */}
      {items.some((i) => i.cle === "rdv-systeme") && (
        <div className="crm-detail-card" style={{ marginBottom: 24, borderLeft: "4px solid var(--mainColor)" }}>
          <p className="crm-detail-section-title">Système de prise de rendez-vous</p>
          <p style={{ fontSize: 12, color: "var(--crm-muted)", marginBottom: 16 }}>
            Choisissez quel système utiliser pour le bouton &ldquo;On en parle ?&rdquo; dans le menu et les offres.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button
              className={`crm-btn --sm ${values["rdv-systeme"] === "custom" ? "--primary" : "--outline"}`}
              onClick={() => toggle("rdv-systeme", TOGGLE_KEYS["rdv-systeme"])}
            >
              ✓ Système intégré Uvibes {values["rdv-systeme"] === "custom" ? "(actif)" : ""}
            </button>
            <button
              className={`crm-btn --sm ${values["rdv-systeme"] === "calendly" ? "--primary" : "--outline"}`}
              onClick={() => toggle("rdv-systeme", TOGGLE_KEYS["rdv-systeme"])}
            >
              Calendly {values["rdv-systeme"] === "calendly" ? "(actif)" : ""}
            </button>
            {saved["rdv-systeme"] && <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Sauvé</span>}
          </div>
          {values["rdv-systeme"] === "calendly" && (
            <div className="crm-cms-item" style={{ marginTop: 16 }}>
              <div className="crm-cms-item-label">
                URL Calendly
                <div className="crm-cms-item-cle">rdv-calendly-url</div>
              </div>
              <input
                className="crm-field-input"
                style={{ flex: 1 }}
                value={values["rdv-calendly-url"] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, "rdv-calendly-url": e.target.value }))}
              />
              <button className="crm-cms-save-btn" onClick={() => save("rdv-calendly-url")} disabled={loading["rdv-calendly-url"]}>
                {saved["rdv-calendly-url"] ? "✓ Sauvé" : "Enregistrer"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Autres contenus éditoriaux */}
      <div className="crm-cms-grid">
        {visible
          .filter((i) => i.cle !== "rdv-systeme" && i.cle !== "rdv-calendly-url")
          .map((item) => (
            <div key={item.cle} className="crm-cms-item">
              <div className="crm-cms-item-label">
                {item.label}
                <div className="crm-cms-item-cle">{item.cle}</div>
              </div>
              <input
                className="crm-field-input"
                style={{ flex: 1 }}
                value={values[item.cle] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [item.cle]: e.target.value }))}
              />
              <button
                className="crm-cms-save-btn"
                onClick={() => save(item.cle)}
                disabled={loading[item.cle]}
              >
                {saved[item.cle] ? "✓ Sauvé" : loading[item.cle] ? "..." : "Enregistrer"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
