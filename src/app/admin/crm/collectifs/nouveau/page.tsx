"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TYPES_COLLECTIF = [
  "Entreprise", "Établissement d'enseignement", "Association",
  "Collectivité territoriale", "Fédération sportive", "Réseau professionnel",
  "Structure de santé", "Autre",
];

const TAILLES = [
  { value: "50-250", label: "50 – 250 membres" },
  { value: "250-1000", label: "250 – 1 000 membres" },
  { value: "+1000", label: "+ 1 000 membres" },
];

export default function NouveauCollectifPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nom: "", contact: "", email: "", telephone: "", ville: "",
    typeCollectif: "Entreprise", tailleCollectif: "50-250",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/collectifs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur"); return; }
      router.push(`/admin/crm/collectifs/${data.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="crm-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/crm/collectifs" className="crm-btn --outline --sm">
            <ArrowLeft size={13} /> Retour
          </Link>
          <span className="crm-topbar-title">Nouveau collectif</span>
        </div>
        <button form="new-collectif-form" type="submit" className="crm-btn --primary --sm" disabled={loading}>
          <Save size={13} /> {loading ? "Création..." : "Créer"}
        </button>
      </div>

      {error && (
        <div style={{ margin: "12px 28px 0", padding: "10px 16px", background: "rgba(217,10,92,.08)", borderRadius: 8, fontSize: 13, color: "var(--rose, #D90A5C)" }}>
          {error}
        </div>
      )}

      <div className="crm-content">
        <form id="new-collectif-form" onSubmit={handleSubmit}>
          <div className="crm-detail-card" style={{ maxWidth: 680 }}>
            <p className="crm-detail-section-title">Informations du collectif</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Nom de l'organisation *", key: "nom", required: true },
                { label: "Contact (prénom nom) *", key: "contact", required: true },
                { label: "Email *", key: "email", required: true, type: "email" },
                { label: "Téléphone", key: "telephone" },
                { label: "Ville", key: "ville" },
              ].map(({ label, key, required, type }) => (
                <div key={key} className="crm-field-row">
                  <label className="crm-field-label">{label}</label>
                  <input
                    className="crm-field-input"
                    type={type ?? "text"}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => set(key, e.target.value)}
                    required={required}
                  />
                </div>
              ))}

              <div className="crm-field-row">
                <label className="crm-field-label">Type de collectif</label>
                <select className="crm-field-select" value={form.typeCollectif} onChange={(e) => set("typeCollectif", e.target.value)}>
                  {TYPES_COLLECTIF.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="crm-field-row">
                <label className="crm-field-label">Taille estimée</label>
                <select className="crm-field-select" value={form.tailleCollectif} onChange={(e) => set("tailleCollectif", e.target.value)}>
                  {TAILLES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
