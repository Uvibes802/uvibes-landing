"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, Star, ExternalLink } from "lucide-react";
import RichEditor from "./RichEditor";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

interface Article {
  id: string;
  slug: string;
  titre: string;
  excerpt: string | null;
  contenu: string;
  imageUrl: string | null;
  categorie: string | null;
  categorieLabel: string | null;
  auteur: string | null;
  seoTitre: string | null;
  seoDescription: string | null;
  publishedAt: string;
  featured: boolean;
  actif: boolean;
}

type Draft = Partial<Article>;

const emptyDraft = (): Draft => ({
  titre: "",
  slug: "",
  contenu: "",
  excerpt: "",
  imageUrl: "",
  categorie: BLOG_CATEGORIES[0].slug,
  auteur: "",
  seoTitre: "",
  seoDescription: "",
  featured: false,
  actif: true,
  publishedAt: new Date().toISOString(),
});

export default function BlogManager({ articles: initial }: { articles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initial);
  const [editing, setEditing] = useState<Draft | null>(null); // null = vue liste
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isNew = editing && !editing.id;

  function startNew() { setError(""); setEditing(emptyDraft()); }
  function startEdit(a: Article) { setError(""); setEditing({ ...a }); }
  function cancel() { setEditing(null); setError(""); }

  function set<K extends keyof Draft>(key: K, val: Draft[K]) {
    setEditing((d) => (d ? { ...d, [key]: val } : d));
  }

  async function save() {
    if (!editing) return;
    if (!editing.titre?.trim()) { setError("Le titre est requis."); return; }
    setSaving(true); setError("");
    try {
      const url = editing.id ? `/api/admin/cms/articles/${editing.id}` : "/api/admin/cms/articles";
      const res = await fetch(url, {
        method: editing.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setArticles((list) => {
        const others = list.filter((a) => a.id !== data.id);
        return [data, ...others].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      });
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function remove(a: Article) {
    if (!confirm(`Supprimer l'article « ${a.titre} » ? Cette action est définitive.`)) return;
    const res = await fetch(`/api/admin/cms/articles/${a.id}`, { method: "DELETE" });
    if (res.ok) setArticles((list) => list.filter((x) => x.id !== a.id));
  }

  // ── Vue formulaire ───────────────────────────────────────────────
  if (editing) {
    return (
      <div>
        <button className="crm-btn --sm --outline" onClick={cancel} style={{ marginBottom: 18, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={14} /> Retour à la liste
        </button>

        <div className="crm-detail-card" style={{ borderLeft: "4px solid var(--mainColor)" }}>
          <p className="crm-detail-section-title">{isNew ? "Nouvel article" : "Modifier l'article"}</p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 14 }}>
            <div style={{ flex: "1 1 320px" }}>
              <label className="crm-cms-item-label" htmlFor="a-titre">Titre</label>
              <input id="a-titre" className="crm-field-input" style={{ width: "100%" }} value={editing.titre ?? ""} onChange={(e) => set("titre", e.target.value)} />
            </div>
            <div style={{ flex: "0 1 240px" }}>
              <label className="crm-cms-item-label" htmlFor="a-slug">Slug (URL) — auto si vide</label>
              <input id="a-slug" className="crm-field-input" style={{ width: "100%" }} value={editing.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="mon-article" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 14 }}>
            <div style={{ flex: "1 1 200px" }}>
              <label className="crm-cms-item-label" htmlFor="a-cat">Catégorie</label>
              <select id="a-cat" className="crm-field-input" style={{ width: "100%" }} value={editing.categorie ?? ""} onChange={(e) => set("categorie", e.target.value)}>
                {BLOG_CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label className="crm-cms-item-label" htmlFor="a-auteur">Auteur</label>
              <input id="a-auteur" className="crm-field-input" style={{ width: "100%" }} value={editing.auteur ?? ""} onChange={(e) => set("auteur", e.target.value)} />
            </div>
            <div style={{ flex: "0 1 170px" }}>
              <label className="crm-cms-item-label" htmlFor="a-date">Date de publication</label>
              <input id="a-date" type="date" className="crm-field-input" style={{ width: "100%" }} value={(editing.publishedAt ?? "").slice(0, 10)} onChange={(e) => set("publishedAt", new Date(e.target.value).toISOString())} />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label className="crm-cms-item-label" htmlFor="a-img">URL de l&apos;image (illustration)</label>
            <input id="a-img" className="crm-field-input" style={{ width: "100%" }} value={editing.imageUrl ?? ""} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://…" />
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={!!editing.featured} onChange={(e) => set("featured", e.target.checked)} /> À la une (homepage)
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={editing.actif !== false} onChange={(e) => set("actif", e.target.checked)} /> Publié (visible sur le site)
            </label>
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="crm-cms-item-label" htmlFor="a-excerpt">Résumé (extrait affiché dans la liste)</label>
            <textarea id="a-excerpt" className="crm-field-input" style={{ width: "100%", minHeight: 64 }} value={editing.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
          </div>

          <div style={{ marginTop: 16 }}>
            <label className="crm-cms-item-label">Contenu de l&apos;article</label>
            <RichEditor value={editing.contenu ?? ""} onChange={(html) => set("contenu", html)} />
          </div>

          <details style={{ marginTop: 20 }}>
            <summary style={{ cursor: "pointer", fontSize: 13, color: "var(--crm-muted)" }}>SEO (optionnel)</summary>
            <div style={{ marginTop: 12 }}>
              <label className="crm-cms-item-label" htmlFor="a-seot">Titre SEO</label>
              <input id="a-seot" className="crm-field-input" style={{ width: "100%" }} value={editing.seoTitre ?? ""} onChange={(e) => set("seoTitre", e.target.value)} />
              <label className="crm-cms-item-label" htmlFor="a-seod" style={{ marginTop: 12, display: "block" }}>Description SEO</label>
              <textarea id="a-seod" className="crm-field-input" style={{ width: "100%", minHeight: 56 }} value={editing.seoDescription ?? ""} onChange={(e) => set("seoDescription", e.target.value)} />
            </div>
          </details>

          {error && <p className="dv-error-msg" style={{ marginTop: 12 }}>{error}</p>}

          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button className="crm-cms-save-btn" onClick={save} disabled={saving}>
              {saving ? "Enregistrement…" : isNew ? "Créer l'article" : "Enregistrer"}
            </button>
            <button className="crm-btn --sm --outline" onClick={cancel}>Annuler</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Vue liste ────────────────────────────────────────────────────
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "var(--crm-muted)", margin: 0 }}>{articles.length} article(s)</p>
        <button className="crm-cms-save-btn" onClick={startNew} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Plus size={15} /> Nouvel article
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {articles.map((a) => (
          <div key={a.id} className="crm-detail-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <strong style={{ fontSize: 14 }}>{a.titre}</strong>
                {a.featured && <Star size={13} fill="var(--mainColor)" color="var(--mainColor)" />}
                {!a.actif && <span style={{ fontSize: 11, color: "#b91c1c", background: "rgba(185,28,28,.08)", padding: "1px 7px", borderRadius: 6 }}>Masqué</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--crm-muted)", marginTop: 3 }}>
                {a.categorieLabel ?? "—"} · {new Date(a.publishedAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
            <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" className="crm-btn --sm --outline" style={{ display: "inline-flex", alignItems: "center", gap: 5 }} aria-label="Voir l'article">
              <ExternalLink size={13} />
            </a>
            <button className="crm-btn --sm --outline" onClick={() => startEdit(a)} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Pencil size={13} /> Éditer
            </button>
            <button className="crm-btn --sm --outline" onClick={() => remove(a)} aria-label="Supprimer" style={{ color: "#b91c1c" }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
