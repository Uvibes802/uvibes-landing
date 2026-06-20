"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Feature { id: string; slug: string; nom: string; ordre: number; }
interface PlanFeature { id: string; featureId: string; valeur: boolean; feature: Feature; }
interface PlanTier { id: string; label: string; min: number; max: number | null; prixAnnuel: number; }
interface Plan { id: string; slug: string; nom: string; couleur: string; description: string; prixAnnuel: number; mention: string | null; planFeatures: PlanFeature[]; tiers: PlanTier[]; }

export default function TarificationManager({ plans: initial }: { plans: Plan[] }) {
  const [plans, setPlans] = useState(initial);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [newFeatureNom, setNewFeatureNom] = useState("");
  const [addingFeature, setAddingFeature] = useState(false);
  const [featureMsg, setFeatureMsg] = useState("");

  function updatePlan(planId: string, key: string, value: unknown) {
    setPlans((prev) => prev.map((p) => p.id === planId ? { ...p, [key]: value } : p));
  }

  function updateTierPrice(planId: string, tierId: string, prix: number) {
    setPlans((prev) => prev.map((p) => {
      if (p.id !== planId) return p;
      return { ...p, tiers: p.tiers.map((t) => t.id === tierId ? { ...t, prixAnnuel: prix } : t) };
    }));
  }

  function toggleFeature(planId: string, featureId: string) {
    setPlans((prev) => prev.map((p) => {
      if (p.id !== planId) return p;
      return {
        ...p,
        planFeatures: p.planFeatures.map((pf) =>
          pf.featureId === featureId ? { ...pf, valeur: !pf.valeur } : pf
        ),
      };
    }));
  }

  async function savePlan(plan: Plan) {
    setSaving((s) => ({ ...s, [plan.id]: true }));
    try {
      await fetch(`/api/admin/cms/plans/${plan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: plan.nom,
          description: plan.description,
          prixAnnuel: Number(plan.prixAnnuel),
          mention: plan.mention,
          features: plan.planFeatures.map((pf) => ({ featureId: pf.featureId, valeur: pf.valeur })),
          tiers: plan.tiers.map((t) => ({ id: t.id, prixAnnuel: Number(t.prixAnnuel) })),
        }),
      });
      setSaved((s) => ({ ...s, [plan.id]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [plan.id]: false })), 2000);
    } finally {
      setSaving((s) => ({ ...s, [plan.id]: false }));
    }
  }

  async function addFeature() {
    if (!newFeatureNom.trim()) return;
    setAddingFeature(true); setFeatureMsg("");
    const slug = newFeatureNom.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    try {
      const res = await fetch("/api/admin/cms/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: newFeatureNom.trim(), slug }),
      });
      const data = await res.json();
      if (!res.ok) { setFeatureMsg(data.error ?? "Erreur"); return; }
      // Ajouter la feature à chaque plan localement
      setPlans((prev) => prev.map((p) => ({
        ...p,
        planFeatures: [...p.planFeatures, { id: `tmp-${p.id}`, featureId: data.id, valeur: false, feature: data }],
      })));
      setNewFeatureNom("");
      setFeatureMsg("✓ Fonctionnalité ajoutée");
      setTimeout(() => setFeatureMsg(""), 2000);
    } finally {
      setAddingFeature(false);
    }
  }

  async function deleteFeature(featureId: string, featureNom: string) {
    if (!confirm("Supprimer la fonctionnalité \"" + featureNom + "\" de tous les plans ?")) return;
    const res = await fetch(`/api/admin/cms/features/${featureId}`, { method: "DELETE" });
    if (res.ok) {
      setPlans((prev) => prev.map((p) => ({
        ...p,
        planFeatures: p.planFeatures.filter((pf) => pf.featureId !== featureId),
      })));
    }
  }

  // Liste unique des features (depuis le premier plan)
  const allFeatures = plans[0]?.planFeatures.map((pf) => pf.feature) ?? [];

  return (
    <div>
      {/* Section gestion des fonctionnalités */}
      <div className="crm-detail-card" style={{ marginBottom: 24 }}>
        <p className="crm-detail-section-title">Gérer les fonctionnalités</p>
        <p style={{ fontSize: 12, color: "var(--crm-muted)", marginBottom: 12 }}>
          Ajoutez ou supprimez des fonctionnalités &mdash; elles s&apos;appliquent à tous les plans.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {allFeatures.map((f) => (
            <span key={f.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--crm-bg)", border: "1px solid var(--crm-border)", borderRadius: 6, fontSize: 12 }}>
              {f.nom}
              <button
                onClick={() => deleteFeature(f.id, f.nom)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--crm-muted)", lineHeight: 1, padding: 0 }}
              >
                <Trash2 size={11} />
              </button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="crm-field-input"
            style={{ flex: 1, maxWidth: 300 }}
            placeholder="Nom de la nouvelle fonctionnalité"
            value={newFeatureNom}
            onChange={(e) => setNewFeatureNom(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addFeature(); }}
          />
          <button className="crm-btn --primary --sm" onClick={addFeature} disabled={addingFeature}>
            <Plus size={13} /> {addingFeature ? "..." : "Ajouter"}
          </button>
          {featureMsg && <span style={{ fontSize: 12, color: "#16a34a" }}>{featureMsg}</span>}
        </div>
      </div>

      {/* Cards des 3 plans */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {plans.map((plan) => (
          <div key={plan.id} className="crm-detail-card" style={{ borderTop: `4px solid ${plan.couleur}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: plan.couleur }} />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{plan.nom}</h3>
            </div>

            <div className="crm-field-row">
              <label className="crm-field-label">Nom du plan</label>
              <input className="crm-field-input" value={plan.nom} onChange={(e) => updatePlan(plan.id, "nom", e.target.value)} />
            </div>

            <div className="crm-field-row">
              <label className="crm-field-label">Description</label>
              <textarea className="crm-field-textarea" style={{ minHeight: 64 }} value={plan.description} onChange={(e) => updatePlan(plan.id, "description", e.target.value)} />
            </div>

            <div className="crm-field-row">
              <label className="crm-field-label">Prix annuel HT (€) — si pas de tranches</label>
              <input type="number" className="crm-field-input" value={plan.prixAnnuel} onChange={(e) => updatePlan(plan.id, "prixAnnuel", Number(e.target.value))} />
            </div>

            {plan.tiers.length > 0 && (
              <div style={{ marginTop: 4, marginBottom: 8 }}>
                <p className="crm-detail-section-title">Tarif par tranche de membres (HT / an)</p>
                {plan.tiers.map((t) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                    <span style={{ fontSize: 12, color: "var(--crm-muted)", flex: 1 }}>{t.label}</span>
                    <input
                      type="number"
                      className="crm-field-input"
                      style={{ width: 100 }}
                      value={t.prixAnnuel}
                      onChange={(e) => updateTierPrice(plan.id, t.id, Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="crm-field-row">
              <label className="crm-field-label">Mention prix</label>
              <input className="crm-field-input" value={plan.mention ?? ""} onChange={(e) => updatePlan(plan.id, "mention", e.target.value)} />
            </div>

            <div className="crm-field-row">
              <label className="crm-field-label">Couleur accent</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="color" value={plan.couleur} onChange={(e) => updatePlan(plan.id, "couleur", e.target.value)} style={{ width: 40, height: 32, border: "none", cursor: "pointer", borderRadius: 4 }} />
                <input className="crm-field-input" value={plan.couleur} onChange={(e) => updatePlan(plan.id, "couleur", e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <p className="crm-detail-section-title">Fonctionnalités incluses</p>
              {plan.planFeatures.map((pf) => (
                <label key={pf.featureId} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 12 }}>
                  <input
                    type="checkbox"
                    checked={pf.valeur}
                    onChange={() => toggleFeature(plan.id, pf.featureId)}
                    style={{ accentColor: plan.couleur }}
                  />
                  <span style={{ color: pf.valeur ? "var(--crm-text)" : "var(--crm-muted)", textDecoration: pf.valeur ? "none" : "line-through" }}>
                    {pf.feature.nom}
                  </span>
                </label>
              ))}
            </div>

            <button
              className="crm-btn --primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
              onClick={() => savePlan(plan)}
              disabled={saving[plan.id]}
            >
              {saved[plan.id] ? "✓ Sauvé" : saving[plan.id] ? "..." : "Enregistrer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
