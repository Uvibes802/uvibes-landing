"use client";

import { useState } from "react";

interface Feature { id: string; slug: string; nom: string; ordre: number; }
interface PlanFeature { id: string; featureId: string; valeur: boolean; feature: Feature; }
interface Plan { id: string; slug: string; nom: string; couleur: string; description: string; prixAnnuel: number; mention: string | null; planFeatures: PlanFeature[]; }

export default function TarificationManager({ plans: initial }: { plans: Plan[] }) {
  const [plans, setPlans] = useState(initial);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function updatePlan(planId: string, key: string, value: unknown) {
    setPlans((prev) => prev.map((p) => p.id === planId ? { ...p, [key]: value } : p));
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
        }),
      });
      setSaved((s) => ({ ...s, [plan.id]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [plan.id]: false })), 2000);
    } finally {
      setSaving((s) => ({ ...s, [plan.id]: false }));
    }
  }

  return (
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
            <label className="crm-field-label">Prix annuel HT (€)</label>
            <input type="number" className="crm-field-input" value={plan.prixAnnuel} onChange={(e) => updatePlan(plan.id, "prixAnnuel", Number(e.target.value))} />
          </div>

          <div className="crm-field-row">
            <label className="crm-field-label">Mention prix</label>
            <input className="crm-field-input" value={plan.mention ?? ""} onChange={(e) => updatePlan(plan.id, "mention", e.target.value)} />
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
  );
}
