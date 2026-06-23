"use client";

import { Trash2, Plus, Link2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/admin/globalTasks.css";

interface TaskWithLinks {
  id: string; titre: string; dueDate?: Date | string | null;
  done: boolean; priorite: string;
  collectif?: { id: string; nom: string } | null;
  quote?: { id: string; numero: string } | null;
}

const PRIO_COLOR: Record<string, string> = {
  HAUTE: "#dc2626", NORMALE: "var(--crm-accent)", BASSE: "#9ca3af",
};

// Rotation légère par note (effet post-it punaisé), cycle de 6 valeurs
const ROT = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.2];

const startOfToday = () => new Date(new Date().toDateString());

export default function GlobalTasksClient({
  tasks, collectifs, quotes,
}: {
  tasks: TaskWithLinks[];
  collectifs: { id: string; nom: string }[];
  quotes: { id: string; numero: string }[];
}) {
  const router = useRouter();

  // Formulaire de création rapide
  const [open, setOpen] = useState(false);
  const [titre, setTitre] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priorite, setPriorite] = useState("NORMALE");
  const [lien, setLien] = useState(""); // "" | "c:<id>" | "q:<id>"
  const [loading, setLoading] = useState(false);

  async function create() {
    if (!titre.trim()) return;
    setLoading(true);
    try {
      const collectifId = lien.startsWith("c:") ? lien.slice(2) : null;
      const quoteId = lien.startsWith("q:") ? lien.slice(2) : null;
      await fetch("/api/admin/crm/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, dueDate: dueDate || null, priorite, collectifId, quoteId }),
      });
      setTitre(""); setDueDate(""); setPriorite("NORMALE"); setLien(""); setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function toggle(t: TaskWithLinks) {
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

  const Note = (t: TaskWithLinks, i: number, late = false) => (
    <div
      key={t.id}
      className={`gt-note${t.done ? " gt-note--done" : ""}${late ? " gt-note--late" : ""}`}
      style={{ "--gt-rot": `${ROT[i % ROT.length]}deg`, "--gt-prio": PRIO_COLOR[t.priorite] ?? "var(--crm-accent)" } as React.CSSProperties}
    >
      <button className="gt-note-del" onClick={() => remove(t.id)} title="Supprimer">
        <Trash2 size={12} />
      </button>
      <label className="gt-note-check">
        <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
        <span className="gt-note-titre">{t.titre}</span>
      </label>
      <p className="gt-note-date">
        {t.dueDate ? new Date(t.dueDate).toLocaleDateString("fr-FR") : "Sans échéance"}
      </p>
      {(t.collectif || t.quote) && (
        <Link
          href={t.collectif ? `/admin/collectifs/${t.collectif.id}` : `/admin/devis/${t.quote!.id}`}
          className="gt-note-link"
        >
          <Link2 size={11} /> {t.collectif ? t.collectif.nom : t.quote!.numero}
        </Link>
      )}
    </div>
  );

  return (
    <>
      <div className="crm-topbar">
        <span className="crm-topbar-title">Tâches & relances</span>
        <button className="crm-btn --primary --sm" onClick={() => setOpen((o) => !o)}>
          <Plus size={13} /> Nouvelle note
        </button>
      </div>

      <div className="crm-content" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {open && (
          <div className="crm-detail-card">
            <p className="crm-detail-section-title">Nouvelle note</p>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
              <div className="crm-field-row" style={{ gridColumn: "1 / -1" }}>
                <label className="crm-field-label">Note *</label>
                <input className="crm-field-input" value={titre} placeholder="Relancer le collectif sur le devis..." onChange={(e) => setTitre(e.target.value)} />
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Échéance</label>
                <input className="crm-field-input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Priorité</label>
                <select className="crm-field-input" value={priorite} onChange={(e) => setPriorite(e.target.value)}>
                  <option value="BASSE">Basse</option>
                  <option value="NORMALE">Normale</option>
                  <option value="HAUTE">Haute</option>
                </select>
              </div>
              <div className="crm-field-row">
                <label className="crm-field-label">Lier à</label>
                <select className="crm-field-input" value={lien} onChange={(e) => setLien(e.target.value)}>
                  <option value="">Rien en particulier</option>
                  <optgroup label="Collectifs">
                    {collectifs.map((c) => <option key={c.id} value={`c:${c.id}`}>{c.nom}</option>)}
                  </optgroup>
                  <optgroup label="Devis">
                    {quotes.map((q) => <option key={q.id} value={`q:${q.id}`}>{q.numero}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button className="crm-btn --primary" onClick={create} disabled={loading || !titre.trim()}>{loading ? "..." : "Créer la note"}</button>
              <button className="crm-btn --outline" onClick={() => setOpen(false)}>Annuler</button>
            </div>
          </div>
        )}

        <div className="crm-detail-card">
          <p className="crm-detail-section-title" style={{ color: enRetard.length ? "#dc2626" : undefined }}>
            En retard ({enRetard.length})
          </p>
          {enRetard.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Rien en retard 🎉</p>
          ) : (
            <div className="gt-board">{enRetard.map((t, i) => Note(t, i, true))}</div>
          )}
        </div>

        <div className="crm-detail-card">
          <p className="crm-detail-section-title">À venir ({aVenir.length})</p>
          {aVenir.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>Aucune tâche à venir.</p>
          ) : (
            <div className="gt-board">{aVenir.map((t, i) => Note(t, i))}</div>
          )}
        </div>

        {faites.length > 0 && (
          <div className="crm-detail-card">
            <p className="crm-detail-section-title">Terminées ({faites.length})</p>
            <div className="gt-board">{faites.slice(0, 20).map((t, i) => Note(t, i))}</div>
          </div>
        )}
      </div>
    </>
  );
}
