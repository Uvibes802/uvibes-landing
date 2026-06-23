"use client";

import { useState } from "react";
import { Check } from "lucide-react";

// Numéro qui sera attribué au PROCHAIN devis créé (format D + année 2 chiffres + séquence
// 5 chiffres, ex. D2600103). S'incrémente seul à chaque devis ; modifiable ici si besoin
// de redémarrer la séquence ou de la faire correspondre à une numérotation existante.
export default function DevisNumeroSetting({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const valid = /^D\d{2}\d{5}$/.test(value);

  async function save() {
    if (!valid) { setError("Format attendu : D + année (2 chiffres) + numéro (5 chiffres), ex. D2600103"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/cms/content/devis-prochain-numero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valeur: value }),
      });
      if (res.ok) setSaved(value);
      else setError("Action non autorisée — reconnectez-vous.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Prochain numéro de devis</div>
      <div style={{ fontSize: 12, color: "var(--crm-muted)", marginBottom: 10 }}>
        S&apos;incrémente automatiquement à chaque devis créé ; l&apos;année se met à jour seule.
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          className="crm-field-input"
          style={{ width: 160, fontFamily: "monospace" }}
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder="D2600103"
        />
        <button className="crm-btn --outline --sm" onClick={save} disabled={loading || value === saved}>
          {loading ? "..." : "Enregistrer"}
        </button>
        {value === saved && !error && <Check size={16} style={{ color: "#16a34a" }} />}
      </div>
      {error && <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6 }}>{error}</p>}
    </div>
  );
}
