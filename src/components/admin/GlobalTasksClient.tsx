"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TaskWithCollectif {
  id: string; titre: string; dueDate?: Date | string | null;
  done: boolean; priorite: string;
  collectif?: { id: string; nom: string } | null;
}

const PRIO_COLOR: Record<string, string> = {
  HAUTE: "#dc2626", NORMALE: "var(--crm-accent)", BASSE: "#9ca3af",
};

const startOfToday = () => new Date(new Date().toDateString());

export default function GlobalTasksClient({ tasks }: { tasks: TaskWithCollectif[] }) {
  const router = useRouter();

  async function toggle(t: TaskWithCollectif) {
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

  const today = startOfToday();
  const actives = tasks.filter((t) => !t.done);
  const enRetard = actives.filter((t) => t.dueDate && new Date(t.dueDate) < today);
  const aVenir = actives.filter((t) => !t.dueDate || new Date(t.dueDate) >= today);
  const faites = tasks.filter((t) => t.done);

  const Row = (t: TaskWithCollectif, late = false) => (
    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,.05)" }}>
      <input type="checkbox" checked={t.done} onChange={() => toggle(t)} style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--crm-accent)" }} />
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIO_COLOR[t.priorite] ?? "var(--crm-accent)", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 14, textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--crm-muted)" : "inherit" }}>{t.titre}</p>
        <p style={{ margin: "1px 0 0", fontSize: 11.5, color: late ? "#dc2626" : "var(--crm-muted)", fontWeight: late ? 600 : 400 }}>
          {t.dueDate ? new Date(t.dueDate).toLocaleDateString("fr-FR") : "Sans échéance"}
          {t.collectif && <> · <Link href={`/admin/collectifs/${t.collectif.id}`} style={{ color: "var(--crm-accent)" }}>{t.collectif.nom}</Link></>}
        </p>
      </div>
      <button onClick={() => remove(t.id)} title="Supprimer" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--crm-muted)", padding: 4 }}>
        <Trash2 size={14} />
      </button>
    </div>
  );

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Tâches & relances</span>
        <span style={{ fontSize: 13, color: "var(--crm-muted)" }}>{actives.length} à traiter</span>
      </div>

      <div className="crm-content" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="crm-detail-card">
          <p className="crm-detail-section-title" style={{ color: enRetard.length ? "#dc2626" : undefined }}>
            En retard ({enRetard.length})
          </p>
          {enRetard.length === 0 ? <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Rien en retard 🎉</p> : enRetard.map((t) => Row(t, true))}
        </div>

        <div className="crm-detail-card">
          <p className="crm-detail-section-title">À venir ({aVenir.length})</p>
          {aVenir.length === 0 ? <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Aucune tâche à venir.</p> : aVenir.map((t) => Row(t))}
        </div>

        {faites.length > 0 && (
          <div className="crm-detail-card">
            <p className="crm-detail-section-title">Terminées ({faites.length})</p>
            {faites.slice(0, 20).map((t) => Row(t))}
          </div>
        )}
      </div>
    </>
  );
}
