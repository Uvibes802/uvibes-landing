"use client";

import { useState } from "react";

interface Item { id: string; cle: string; label: string; valeur: string; }

export default function CmsContentManager({ items }: { items: Item[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(items.map((i) => [i.cle, i.valeur]))
  );
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

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

  return (
    <div className="crm-cms-grid">
      {items.map((item) => (
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
  );
}
