"use client";

import { Plus, Trash2, Edit2, ToggleLeft, ToggleRight, Pencil, Check } from "lucide-react";
import { useState } from "react";

interface Member { id: string; nom: string; poste: string; equipe: string; photoUrl?: string | null; actif: boolean; ordre: number; }

interface Props {
  members: Member[];
  categories: string[];
}

export default function EquipeManager({ members: initMembers, categories: initCats }: Props) {
  const [members, setMembers] = useState(initMembers);
  const [categories, setCategories] = useState(initCats);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Member>>({});
  const [isNew, setIsNew] = useState(false);
  const [, setSelectedEquipe] = useState(initCats[0] ?? "");
  const [renamingCat, setRenamingCat] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [msg, setMsg] = useState("");

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(""), 2500); }

  function openNew(equipe: string) {
    setForm({ equipe, nom: "", poste: "", photoUrl: "" });
    setEditId("__new__");
    setIsNew(true);
    setSelectedEquipe(equipe);
  }

  function openEdit(m: Member) {
    setForm({ ...m });
    setEditId(m.id);
    setIsNew(false);
  }

  function cancel() { setEditId(null); setForm({}); setIsNew(false); }

  async function save() {
    const url = isNew ? "/api/admin/cms/team" : `/api/admin/cms/team/${editId}`;
    const method = isNew ? "POST" : "PATCH";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { flash(data.error ?? "Erreur"); return; }
    if (isNew) setMembers((prev) => [...prev, data]);
    else setMembers((prev) => prev.map((m) => m.id === editId ? data : m));
    cancel();
    flash("✓ Sauvegardé");
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce membre ?")) return;
    await fetch(`/api/admin/cms/team/${id}`, { method: "DELETE" });
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function toggle(m: Member) {
    const res = await fetch(`/api/admin/cms/team/${m.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actif: !m.actif }) });
    if (res.ok) { const data = await res.json(); setMembers((prev) => prev.map((x) => x.id === m.id ? data : x)); }
  }

  // Gestion catégories
  async function saveCats(newCats: string[]) {
    await fetch("/api/admin/cms/content/team-categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valeur: JSON.stringify(newCats) }),
    });
  }

  async function addCategory() {
    if (!newCatName.trim() || categories.includes(newCatName.trim())) return;
    const updated = [...categories, newCatName.trim()];
    setCategories(updated);
    await saveCats(updated);
    setNewCatName("");
    flash("✓ Équipe créée");
  }

  async function startRename(cat: string) { setRenamingCat(cat); setRenameVal(cat); }

  async function confirmRename(oldName: string) {
    if (!renameVal.trim() || renameVal === oldName) { setRenamingCat(null); return; }
    // Renommer tous les membres de cette équipe
    const toUpdate = members.filter((m) => m.equipe === oldName);
    for (const m of toUpdate) {
      await fetch(`/api/admin/cms/team/${m.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ equipe: renameVal.trim() }) });
    }
    setMembers((prev) => prev.map((m) => m.equipe === oldName ? { ...m, equipe: renameVal.trim() } : m));
    const updated = categories.map((c) => c === oldName ? renameVal.trim() : c);
    setCategories(updated);
    await saveCats(updated);
    setRenamingCat(null);
    flash("✓ Équipe renommée");
  }

  async function deleteCategory(cat: string) {
    const count = members.filter((m) => m.equipe === cat).length;
    if (count > 0 && !confirm(`Cette équipe contient ${count} membre(s). Supprimer quand même ?`)) return;
    const updated = categories.filter((c) => c !== cat);
    setCategories(updated);
    await saveCats(updated);
    flash("✓ Équipe supprimée");
  }

  return (
    <div>
      {msg && <div style={{ marginBottom: 16, padding: "8px 14px", background: "rgba(22,163,74,.1)", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>{msg}</div>}

      {/* Gestion des équipes */}
      <div className="crm-detail-card" style={{ marginBottom: 24 }}>
        <p className="crm-detail-section-title">Gérer les équipes</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {categories.map((cat) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "var(--crm-bg)", border: "1px solid var(--crm-border)", borderRadius: 8 }}>
              {renamingCat === cat ? (
                <>
                  <input
                    className="crm-field-input"
                    style={{ width: 140, padding: "2px 8px", fontSize: 12 }}
                    value={renameVal}
                    onChange={(e) => setRenameVal(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") confirmRename(cat); if (e.key === "Escape") setRenamingCat(null); }}
                    autoFocus
                  />
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#16a34a" }} onClick={() => confirmRename(cat)}><Check size={13} /></button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{cat}</span>
                  <span style={{ fontSize: 11, color: "var(--crm-muted)" }}>({members.filter((m) => m.equipe === cat).length})</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)" }} onClick={() => startRename(cat)}><Pencil size={11} /></button>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)" }} onClick={() => deleteCategory(cat)}><Trash2 size={11} /></button>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="crm-field-input"
            style={{ flex: 1, maxWidth: 240 }}
            placeholder="Nouvelle équipe..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addCategory(); }}
          />
          <button className="crm-btn --primary --sm" onClick={addCategory}><Plus size={13} /> Ajouter</button>
        </div>
      </div>

      {/* Liste membres par équipe */}
      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--crm-muted)", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
              {cat} <span style={{ fontWeight: 400 }}>({members.filter((m) => m.equipe === cat).length} membres)</span>
            </h3>
            <button className="crm-btn --primary --sm" onClick={() => openNew(cat)}><Plus size={13} /> Ajouter un membre</button>
          </div>

          <div className="crm-table-wrap">
            <table className="crm-table">
              <thead><tr><th>Nom</th><th>Poste</th><th>Photo</th><th>Actif</th><th></th></tr></thead>
              <tbody>
                {members.filter((m) => m.equipe === cat).length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: 20, color: "var(--crm-muted)", fontSize: 13 }}>Aucun membre dans cette équipe</td></tr>
                )}
                {members.filter((m) => m.equipe === cat).map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 500, fontSize: 13 }}>{m.nom}</td>
                    <td style={{ fontSize: 13, color: "var(--crm-muted)" }}>{m.poste}</td>
                    <td style={{ fontSize: 12 }}>
                      {m.photoUrl ? <a href={m.photoUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--mainColor)", textDecoration: "underline" }}>Voir</a> : "—"}
                    </td>
                    <td>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: m.actif ? "#16a34a" : "var(--crm-muted)" }} onClick={() => toggle(m)}>
                        {m.actif ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>
                    </td>
                    <td style={{ display: "flex", gap: 6 }}>
                      <button className="crm-btn --outline --sm" onClick={() => openEdit(m)}><Edit2 size={12} /></button>
                      <button className="crm-btn --danger --sm" onClick={() => remove(m.id)}><Trash2 size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formulaire inline si on édite un membre de cette équipe */}
          {editId && (isNew ? form.equipe === cat : members.find((m) => m.id === editId)?.equipe === cat) && (
            <div className="crm-detail-card" style={{ marginTop: 12 }}>
              <p className="crm-detail-section-title">{isNew ? "Ajouter un membre" : "Modifier"}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { key: "nom", label: "Nom *" },
                  { key: "poste", label: "Poste *" },
                  { key: "photoUrl", label: "URL photo" },
                ].map(({ key, label }) => (
                  <div key={key} className="crm-field-row">
                    <label className="crm-field-label">{label}</label>
                    <input className="crm-field-input" value={(form as Record<string, string>)[key] ?? ""} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}
                <div className="crm-field-row">
                  <label className="crm-field-label">Équipe</label>
                  <select className="crm-field-select" value={form.equipe ?? cat} onChange={(e) => setForm((f) => ({ ...f, equipe: e.target.value }))}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="crm-btn --primary" onClick={save}>Enregistrer</button>
                <button className="crm-btn --outline" onClick={cancel}>Annuler</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
