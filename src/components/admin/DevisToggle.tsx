"use client";

import { useState } from "react";

export default function DevisToggle({ active }: { active: boolean }) {
  // "active" = devis désactivés (true = désactivé)
  const [off, setOff] = useState(active);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cms/content/devis-disabled", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valeur: (!off).toString() }),
      });
      if (res.ok) setOff(!off);
      else alert("Action non autorisée — reconnectez-vous.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          width: 64, height: 34, borderRadius: 999, cursor: "pointer",
          background: off ? "linear-gradient(135deg,#FD6E00,#D90A5C)" : "rgba(74,21,48,.15)",
          position: "relative", transition: "background 300ms",
        }}
        onClick={toggle}
      >
        <div style={{
          position: "absolute", top: 4, left: off ? 34 : 4,
          width: 26, height: 26, borderRadius: 50,
          background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.2)",
          transition: "left 250ms",
        }} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: off ? "var(--crm-accent)" : "var(--crm-text)" }}>
          {loading ? "..." : off ? "Devis désactivés" : "Devis ouverts"}
        </div>
        <div style={{ fontSize: 12, color: "var(--crm-muted)" }}>
          {off ? "Les boutons « Faire un devis » sont masqués sur le site" : "Les visiteurs peuvent demander un devis normalement"}
        </div>
      </div>
    </div>
  );
}
