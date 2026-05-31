"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MaintenanceToggle({ active }: { active: boolean }) {
  const [on, setOn] = useState(active);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    try {
      const password = prompt("Mot de passe admin requis :");
      if (!password) return;
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, active: !on }),
      });
      if (res.ok) { setOn(!on); router.refresh(); }
      else alert("Mot de passe incorrect");
    } finally { setLoading(false); }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{
        width: 64, height: 34, borderRadius: 999, cursor: "pointer",
        background: on ? "linear-gradient(135deg,#FD6E00,#D90A5C)" : "rgba(74,21,48,.15)",
        position: "relative", transition: "background 300ms",
      }} onClick={toggle}>
        <div style={{
          position: "absolute", top: 4, left: on ? 34 : 4,
          width: 26, height: 26, borderRadius: 50,
          background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.2)",
          transition: "left 250ms",
        }} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: on ? "var(--crm-accent)" : "var(--crm-text)" }}>
          {loading ? "..." : on ? "Site en maintenance" : "Site en ligne"}
        </div>
        <div style={{ fontSize: 12, color: "var(--crm-muted)" }}>
          {on ? "Les visiteurs voient la page maintenance" : "Le site est accessible normalement"}
        </div>
      </div>
    </div>
  );
}
