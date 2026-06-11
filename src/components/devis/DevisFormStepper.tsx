"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/devis/devis.css";

const TYPES_COLLECTIF = [
  "Entreprise", "Établissement d'enseignement", "Association",
  "Collectivité territoriale", "Fédération sportive", "Réseau professionnel",
  "Structure de santé", "Autre",
];

const TAILLES = [
  { value: "50-250", label: "50 – 250 membres" },
  { value: "250-1000", label: "250 – 1 000 membres" },
  { value: "1000-10000", label: "1 000 – 10 000 membres" },
  { value: "+10000", label: "+ 10 000 membres" },
];

const USAGES = [
  { slug: "echanges", label: "Échanges conversationnels" },
  { slug: "bien-etre", label: "Bien-être & engagement" },
  { slug: "networking", label: "Networking interne" },
  { slug: "brainstorming", label: "Brainstorming & enquêtes" },
  { slug: "soft-skills", label: "Soft skills & formation" },
  { slug: "communication", label: "Communication interne" },
];

const DUREES = [
  { mois: 12, label: "12 mois", remise: "" },
  { mois: 24, label: "24 mois", remise: "−8%" },
  { mois: 36, label: "36 mois", remise: "−15%" },
];

// Ordre aligné sur la page solution : Connection, Boost (populaire), Premium,
// puis l'offre découverte (essai 30 jours, facturée au mois).
const PLANS = [
  { slug: "vibes-connection", nom: "Vibes Connection", price: "3 980 €/an", desc: "Idéal pour démarrer" },
  { slug: "vibes-boost", nom: "Vibes Boost", price: "5 980 €/an", desc: "Le plus populaire", recommended: true },
  { slug: "vibes-premium", nom: "Vibes Premium", price: "4 980 €/an", desc: "Communication & visibilité" },
  { slug: "vibes-decouverte", nom: "Offre découverte", price: "480 €/mois", desc: "30 jours pour tester", trial: true },
];

const STEPS = ["Votre collectif", "Vos usages", "Vos coordonnées"];

interface FormData {
  // Step 1
  typeCollectif: string;
  tailleCollectif: string;
  planSlug: string;
  dureeContrat: number;
  nombreUtilisateurs: number;
  // Step 2
  usagesPrevus: string[];
  besoinsNotes: string;
  // Step 3
  nom: string;
  contact: string;
  email: string;
  telephone: string;
  ville: string;
}

export default function DevisFormStepper() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [form, setForm] = useState<FormData>({
    typeCollectif: "",
    tailleCollectif: "50-250",
    planSlug: "vibes-boost",
    dureeContrat: 12,
    nombreUtilisateurs: 100,
    usagesPrevus: ["echanges"],
    besoinsNotes: "",
    nom: "",
    contact: "",
    email: "",
    telephone: "",
    ville: "",
  });

  const set = (key: keyof FormData, val: unknown) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleUsage = (slug: string) => {
    const curr = form.usagesPrevus;
    set("usagesPrevus", curr.includes(slug) ? curr.filter((s) => s !== slug) : [...curr, slug]);
  };

  // L'offre découverte est facturée au mois (durée fixe = 1 mois).
  const isTrial = form.planSlug === "vibes-decouverte";
  const selectPlan = (slug: string) => {
    setForm((f) => ({
      ...f,
      planSlug: slug,
      dureeContrat: slug === "vibes-decouverte" ? 1 : f.dureeContrat === 1 ? 12 : f.dureeContrat,
    }));
  };

  function validateStep(): boolean {
    const errs: typeof errors = {};
    if (step === 0) {
      if (!form.typeCollectif) errs.typeCollectif = "Champ requis";
    }
    if (step === 2) {
      if (!form.nom.trim()) errs.nom = "Champ requis";
      if (!form.contact.trim()) errs.contact = "Champ requis";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Email invalide";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleNext() {
    if (!validateStep()) return;
    if (step < 2) { setStep((s) => s + 1); return; }

    // Submit
    setLoading(true);
    try {
      const res = await fetch("/api/devis/creer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/devis/${data.id}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur réseau";
      alert("Erreur : " + msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dv-page">
      {/* Header */}
      <header className="dv-header">
        <span className="dv-header-brand">Uvibes</span>
        <Link href="/" className="dv-header-back">
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </header>

      <main>
      <h1 className="dv-sr-only">Demande de devis Uvibes</h1>

      {/* Stepper */}
      <div className="dv-stepper">
        {STEPS.map((label, i) => (
          <div key={i} className="dv-step" style={{ flex: i < STEPS.length - 1 ? "1" : "unset" }}>
            <div
              className={`dv-step ${i < step ? "dv-step--done" : i === step ? "dv-step--active" : "dv-step--pending"}`}
              style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
            >
              <div className="dv-step-circle">
                {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span className="dv-step-label">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`dv-step-line${i < step ? " --done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* Étape 0 — Votre collectif */}
      {step === 0 && (
        <div className="dv-card">
          <h2 className="dv-card-title">Parlez-nous de votre collectif</h2>
          <p className="dv-card-sub">Ces informations nous permettront de vous proposer l&apos;offre la plus adaptée.</p>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-type">Type de collectif *</label>
            <select
              id="dv-type"
              className={`dv-select${errors.typeCollectif ? " --error" : ""}`}
              value={form.typeCollectif}
              onChange={(e) => set("typeCollectif", e.target.value)}
            >
              <option value="">Sélectionnez...</option>
              {TYPES_COLLECTIF.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.typeCollectif && <p className="dv-error-msg">{errors.typeCollectif}</p>}
          </div>

          <div className="dv-field">
            <label className="dv-label">Taille de votre organisation</label>
            <div className="dv-durees">
              {TAILLES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`dv-duree-btn${form.tailleCollectif === t.value ? " --active" : ""}`}
                  onClick={() => set("tailleCollectif", t.value)}
                >
                  <div className="dv-duree-months" style={{ fontSize: 14 }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-users">Nombre d&apos;utilisateurs estimé</label>
            <div className="dv-slider-value">{form.nombreUtilisateurs}</div>
            <input
              id="dv-users"
              type="range" min={10} max={2000} step={10}
              className="dv-slider"
              value={form.nombreUtilisateurs}
              onChange={(e) => set("nombreUtilisateurs", Number(e.target.value))}
            />
            <div className="dv-slider-hint">10 à 2 000 utilisateurs</div>
          </div>

          <div className="dv-field">
            <label className="dv-label">Plan souhaité</label>
            <div className="dv-plans">
              {PLANS.map((p) => (
                <div
                  key={p.slug}
                  className={`dv-plan-card${form.planSlug === p.slug ? " --selected" : ""}${p.recommended ? " --recommended" : ""}`}
                  onClick={() => selectPlan(p.slug)}
                >
                  <div className="dv-plan-name">{p.nom}</div>
                  <div className="dv-plan-price" style={{ fontSize: 13 }}>{p.price}</div>
                  <div className="dv-plan-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dv-field">
            <label className="dv-label">Durée du contrat</label>
            {isTrial ? (
              <p className="dv-card-sub" style={{ margin: 0 }}>
                Offre découverte&nbsp;: <strong>1 mois</strong>, facturée 480&nbsp;€ HT. Sans engagement annuel.
              </p>
            ) : (
              <div className="dv-durees">
                {DUREES.map((d) => (
                  <button
                    key={d.mois}
                    type="button"
                    className={`dv-duree-btn${form.dureeContrat === d.mois ? " --active" : ""}`}
                    onClick={() => set("dureeContrat", d.mois)}
                  >
                    <div className="dv-duree-months">{d.label}</div>
                    {d.remise && <div className="dv-duree-remise">{d.remise}</div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Étape 1 — Vos usages */}
      {step === 1 && (
        <div className="dv-card">
          <h2 className="dv-card-title">Vos usages souhaités</h2>
          <p className="dv-card-sub">Quelles fonctionnalités vous intéressent le plus ?</p>

          <div className="dv-field">
            <label className="dv-label">Fonctionnalités souhaitées</label>
            <div className="dv-checks">
              {USAGES.map((u) => (
                <label key={u.slug} className="dv-check-item">
                  <input
                    type="checkbox"
                    checked={form.usagesPrevus.includes(u.slug)}
                    onChange={() => toggleUsage(u.slug)}
                  />
                  <span>{u.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-notes">Autres besoins ou questions (optionnel)</label>
            <textarea
              id="dv-notes"
              className="dv-textarea"
              placeholder="Décrivez vos besoins spécifiques..."
              value={form.besoinsNotes}
              onChange={(e) => set("besoinsNotes", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Étape 2 — Vos coordonnées */}
      {step === 2 && (
        <div className="dv-card">
          <h2 className="dv-card-title">Vos coordonnées</h2>
          <p className="dv-card-sub">Ces informations figureront sur votre devis.</p>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-nom">Nom de l&apos;organisation *</label>
            <input
              id="dv-nom"
              className={`dv-input${errors.nom ? " --error" : ""}`}
              type="text"
              placeholder="Ex : Université Paris-Dauphine"
              value={form.nom}
              onChange={(e) => set("nom", e.target.value)}
            />
            {errors.nom && <p className="dv-error-msg">{errors.nom}</p>}
          </div>

          <div className="dv-row-2">
            <div className="dv-field">
              <label className="dv-label" htmlFor="dv-contact">Prénom & Nom du contact *</label>
              <input
                id="dv-contact"
                className={`dv-input${errors.contact ? " --error" : ""}`}
                type="text"
                placeholder="Marie Dupont"
                value={form.contact}
                onChange={(e) => set("contact", e.target.value)}
              />
              {errors.contact && <p className="dv-error-msg">{errors.contact}</p>}
            </div>

            <div className="dv-field">
              <label className="dv-label" htmlFor="dv-email">Email *</label>
              <input
                id="dv-email"
                className={`dv-input${errors.email ? " --error" : ""}`}
                type="email"
                placeholder="marie@organisation.fr"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {errors.email && <p className="dv-error-msg">{errors.email}</p>}
            </div>
          </div>

          <div className="dv-row-2">
            <div className="dv-field">
              <label className="dv-label" htmlFor="dv-tel">Téléphone (optionnel)</label>
              <input
                id="dv-tel"
                className="dv-input"
                type="tel"
                placeholder="06 12 34 56 78"
                value={form.telephone}
                onChange={(e) => set("telephone", e.target.value)}
              />
            </div>

            <div className="dv-field">
              <label className="dv-label" htmlFor="dv-ville">Ville (optionnel)</label>
              <input
                id="dv-ville"
                className="dv-input"
                type="text"
                placeholder="Paris"
                value={form.ville}
                onChange={(e) => set("ville", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="dv-card" style={{ padding: "0 44px 28px", background: "transparent", boxShadow: "none" }}>
        <div className="dv-actions">
          {step > 0 && (
            <button type="button" className="dv-btn-back" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={14} /> Retour
            </button>
          )}
          <button
            type="button"
            className="dv-btn-next"
            onClick={handleNext}
            disabled={loading}
          >
            {loading
              ? "Génération en cours..."
              : step < 2
              ? (<>Suivant <ArrowRight size={16} /></>)
              : (<>Obtenir mon devis <ArrowRight size={16} /></>)
            }
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}
