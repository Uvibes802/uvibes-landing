"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  endpoint?: string;
  label?: string;
}

export default function SyncWpButton({ endpoint = "/api/admin/cms/partners/sync-wp", label = "Sync WordPress" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function sync() {
    if (!confirm(`Importer depuis WordPress ? Les données actuelles en DB seront remplacées.`)) return;
    setLoading(true); setMsg("");
    try {
      const res = await fetch(endpoint, { method: "POST" });
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
        {loading ? "Import en cours..." : label}
      </button>
    </div>
  );
}
