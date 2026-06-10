"use client";

import { Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface Task {
  id: string; titre: string; description?: string | null;
  dueDate?: Date | string | null; done: boolean; priorite: string;
  collectifId?: string | null;
}

const PRIO_COLOR: Record<string, string> = {
  HAUTE: "#dc2626", NORMALE: "var(--crm-accent)", BASSE: "#9ca3af",
};

// Une tâche en retard si échéance passée et non faite
function isLate(t: Task) {
  return !t.done && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString());
}

export default function TasksPanel({ collectifId, tasks }: { collectifId: string; tasks: Task[] }) {
  const router = useRouter();
  const [titre, setTitre] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priorite, setPriorite] = useState("NORMALE");
  const [busy, setBusy] = useState(false);

  async function add() {
    if (!titre.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/crm/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectifId, titre, dueDate: dueDate || null, priorite }),
      });
      if (res.ok) { setTitre(""); setDueDate(""); setPriorite("NORMALE"); router.refresh(); }
    } finally { setBusy(false); }
  }

  async function toggle(t: Task) {
    await fetch(`/api/admin/crm/tasks/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !t.done }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/crm/tasks/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="crm-detail-card">
      <p className="crm-detail-section-title">Tâches & relances</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <input
          className="crm-field-input"
          style={{ flex: 1, minWidth: 160 }}
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") add(); }}
          placeholder="Ex : Relancer après envoi du devis"
        />
        <input className="crm-field-input" style={{ width: 150 }} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select className="crm-field-select" style={{ width: 110 }} value={priorite} onChange={(e) => setPriorite(e.target.value)}>
          <option value="BASSE">Basse</option>
          <option value="NORMALE">Normale</option>
          <option value="HAUTE">Haute</option>
        </select>
        <button className="crm-btn --primary --sm" onClick={add} disabled={busy || !titre.trim()}>
          <Plus size={13} /> Ajouter
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Aucune tâche.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t)} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--crm-accent)" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIO_COLOR[t.priorite] ?? "var(--crm-accent)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13.5, textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--crm-muted)" : "inherit" }}>{t.titre}</p>
                {t.dueDate && (
                  <p style={{ margin: "1px 0 0", fontSize: 11, color: isLate(t) ? "#dc2626" : "var(--crm-muted)", fontWeight: isLate(t) ? 600 : 400 }}>
                    {isLate(t) ? "En retard · " : "Échéance "}{new Date(t.dueDate).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
              <button onClick={() => remove(t.id)} title="Supprimer" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--crm-muted)", padding: 4 }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
