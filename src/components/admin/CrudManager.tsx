"use client";

import { Plus, Trash2, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

interface FieldDef {
  key: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
}

interface Props {
  items: Record<string, unknown>[];
  apiBase: string;
  fields: FieldDef[];
  displayField?: string;
  toggleField?: string;
  defaultValues?: Record<string, unknown>;
}

export default function CrudManager({ items: initial, apiBase, fields, toggleField, defaultValues }: Props) {
  const [items, setItems] = useState(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function openNew() {
    setForm(Object.fromEntries(fields.map((f) => [f.key, ""])));
    setEditId("__new__");
    setIsNew(true);
  }

  function openEdit(item: Record<string, unknown>) {
    setForm(Object.fromEntries(fields.map((f) => [f.key, String(item[f.key] ?? "")])));
    setEditId(item.id as string);
    setIsNew(false);
  }

  function cancel() { setEditId(null); setForm({}); setIsNew(false); }

  async function save() {
    setLoading(true); setMsg("");
    try {
      const body = { ...defaultValues, ...form };
      let res: Response;
      if (isNew) {
        res = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`${apiBase}/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setItems((prev) => [...prev, data]);
        } else {
          setItems((prev) => prev.map((i) => (i.id === editId ? data : i)));
        }
        cancel();
      } else {
        setMsg(data.error ?? "Erreur");
      }
    } finally { setLoading(false); }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function toggle(item: Record<string, unknown>) {
    if (!toggleField) return;
    const res = await fetch(`${apiBase}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [toggleField]: !item[toggleField] }),
    });
    const data = await res.json();
    if (res.ok) setItems((prev) => prev.map((i) => (i.id === item.id ? data : i)));
  }

  return (
    <div>
      {msg && <div style={{ marginBottom: 12, padding: "8px 14px", background: "rgba(217,10,92,.08)", borderRadius: 8, fontSize: 13, color: "var(--rose, #D90A5C)" }}>{msg}</div>}

      <div className="crm-table-wrap" style={{ marginBottom: 16 }}>
        <div className="crm-table-header" style={{ justifyContent: "flex-end" }}>
          <button className="crm-btn --primary --sm" onClick={openNew}>
            <Plus size={13} /> Ajouter
          </button>
        </div>
        <table className="crm-table">
          <thead>
            <tr>
              {fields.slice(0, 2).map((f) => <th key={f.key}>{f.label}</th>)}
              {toggleField && <th>Actif</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={fields.length + 2} style={{ textAlign: "center", padding: 24, color: "var(--crm-muted)" }}>Aucun élément</td></tr>
            )}
            {items.map((item) => (
              <tr key={String(item.id)}>
                {fields.slice(0, 2).map((f) => (
                  <td key={f.key} style={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 13 }}>
                    {String(item[f.key] ?? "")}
                  </td>
                ))}
                {toggleField && (
                  <td>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: item[toggleField] ? "#16a34a" : "var(--crm-muted)" }} onClick={() => toggle(item)}>
                      {item[toggleField] ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </td>
                )}
                <td style={{ display: "flex", gap: 6 }}>
                  <button className="crm-btn --outline --sm" onClick={() => openEdit(item)}><Edit2 size={12} /></button>
                  <button className="crm-btn --danger --sm" onClick={() => remove(String(item.id))}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire inline */}
      {editId && (
        <div className="crm-detail-card" style={{ marginBottom: 20 }}>
          <p className="crm-detail-section-title">{isNew ? "Ajouter" : "Modifier"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {fields.map((f) => (
              <div key={f.key} className="crm-field-row" style={f.multiline ? { gridColumn: "1 / -1" } : {}}>
                <label className="crm-field-label">{f.label}{f.required && " *"}</label>
                {f.multiline
                  ? <textarea className="crm-field-textarea" value={form[f.key] ?? ""} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} />
                  : <input className="crm-field-input" value={form[f.key] ?? ""} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} />
                }
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="crm-btn --primary" onClick={save} disabled={loading}>{loading ? "..." : "Enregistrer"}</button>
            <button className="crm-btn --outline" onClick={cancel}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}
