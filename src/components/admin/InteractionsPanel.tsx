"use client";

import { Phone, Mail, Users, StickyNote, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface Interaction {
  id: string; type: string; contenu: string;
  auteur?: string | null; date: Date | string;
}

const TYPES = [
  { value: "NOTE", label: "Note", icon: StickyNote },
  { value: "APPEL", label: "Appel", icon: Phone },
  { value: "EMAIL", label: "Email", icon: Mail },
  { value: "REUNION", label: "Réunion", icon: Users },
];
const ICON: Record<string, typeof Phone> = {
  NOTE: StickyNote, APPEL: Phone, EMAIL: Mail, REUNION: Users,
};

export default function InteractionsPanel({ collectifId, interactions }: { collectifId: string; interactions: Interaction[] }) {
  const router = useRouter();
  const [type, setType] = useState("NOTE");
  const [contenu, setContenu] = useState("");
  const [busy, setBusy] = useState(false);

  async function add() {
    if (!contenu.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/crm/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectifId, type, contenu }),
      });
      if (res.ok) { setContenu(""); setType("NOTE"); router.refresh(); }
    } finally { setBusy(false); }
  }

  async function remove(id: string) {
    await fetch(`/api/admin/crm/interactions/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="crm-detail-card">
      <p className="crm-detail-section-title">Journal des échanges</p>

      {/* Ajout d'une interaction */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <select className="crm-field-select" style={{ width: 120 }} value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input
          className="crm-field-input"
          style={{ flex: 1, minWidth: 180 }}
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") add(); }}
          placeholder="Résumé de l'échange (appel, email, RDV…)"
        />
        <button className="crm-btn --primary --sm" onClick={add} disabled={busy || !contenu.trim()}>
          <Plus size={13} /> Ajouter
        </button>
      </div>

      {/* Timeline */}
      {interactions.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Aucun échange enregistré.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {interactions.map((it) => {
            const Icon = ICON[it.type] ?? StickyNote;
            return (
              <div key={it.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 8, background: "rgba(253,110,0,.1)", color: "var(--crm-accent)", flexShrink: 0 }}>
                  <Icon size={15} />
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}>{it.contenu}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--crm-muted)" }}>
                    {new Date(it.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                    {it.auteur ? ` · ${it.auteur}` : ""}
                  </p>
                </div>
                <button onClick={() => remove(it.id)} title="Supprimer" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--crm-muted)", padding: 4 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
