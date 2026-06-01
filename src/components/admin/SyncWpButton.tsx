"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SyncWpButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function sync() {
    if (!confirm("Importer les partenaires depuis WordPress ? Les partenaires actuels en DB seront remplacés.")) return;
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/admin/cms/partners/sync-wp", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMsg(`✓ ${data.imported} partenaire(s) importé(s)`);
        router.refresh();
      } else {
        setMsg(`Erreur : ${data.error}`);
      }
    } catch {
      setMsg("Erreur réseau");
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 4000);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {msg && <span style={{ fontSize: 12, color: msg.startsWith("✓") ? "#16a34a" : "var(--rose, #D90A5C)" }}>{msg}</span>}
      <button className="crm-btn --outline --sm" onClick={sync} disabled={loading}>
        <RefreshCw size={13} className={loading ? "crm-spin" : ""} />
        {loading ? "Import en cours..." : "Sync WordPress"}
      </button>
    </div>
  );
}
