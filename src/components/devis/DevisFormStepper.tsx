"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/devis/devis.css";

const TYPES_COLLECTIF = [
  "Entreprise", "Établissement d'enseignement", "Association",
  "Collectivité territoriale", "Réseau professionnel",
  "Établissement de santé et médico-social", "Club sportif",
  "Structure d'insertion professionnelle", "Structure d'habitat", "Autre",
];

// Tranches alignées sur les PlanTier en base (repValue = effectif envoyé à l'API
// pour que le bon tarif soit sélectionné par calculateQuote).
const TAILLES = [
  { value: "50-250", label: "50 – 250 membres", repValue: 50 },
  { value: "250-2000", label: "250 – 2 000 membres", repValue: 250 },
  { value: "2000-10000", label: "2 000 – 10 000 membres", repValue: 2000 },
  { value: "+10000", label: "+ 10 000 membres", repValue: 10000 },
];

interface PlanTierApi { label: string; min: number; max: number | null; prixAnnuel: number; }
interface PlanApi { slug: string; nom: string; prixAnnuel: number; tiers: PlanTierApi[]; }

function tierPriceFor(plan: PlanApi | undefined, n: number): number | null {
  if (!plan) return null;
  const tier = plan.tiers.find((t) => n >= t.min && (t.max === null || n < t.max));
  return tier ? tier.prixAnnuel : (plan.tiers.length ? null : plan.prixAnnuel);
}

// Prix total du contrat pour une durée donnée — même formule que calculateQuote
// (remise d'engagement : 24 mois = -8%, 36 mois = -15%), pour afficher le prix
// avant de passer à l'étape suivante.
function totalPriceFor(plan: PlanApi | undefined, n: number, mois: number): number | null {
  const base = tierPriceFor(plan, n);
  if (base == null) return null;
  const remise = mois >= 36 ? 15 : mois >= 24 ? 8 : 0;
  const dureeAns = mois / 12;
  return Math.round(base * dureeAns * (1 - remise / 100) * 100) / 100;
}

const USAGES = [
  { slug: "echanges-conversationnels", label: "Échanges conversationnels" },
  { slug: "enquetes-flash", label: "Enquêtes flash" },
  { slug: "enquetes-post-vibes", label: "Enquêtes post vibes" },
  { slug: "barometre-bien-etre", label: "Baromètre bien-être" },
  { slug: "statistiques-pilotage", label: "Statistiques et pilotage" },
  { slug: "kit-communication", label: "Kit de communication" },
  { slug: "actualites-internes", label: "Diffusion d'actualités internes" },
  { slug: "cartes-visite", label: "Échanges cartes de visite" },
  { slug: "parcours-entrainement", label: "Parcours d'entraînement" },
  { slug: "mediatheque", label: "Médiathèque" },
];

const DUREES = [
  { mois: 12, label: "12 mois", remise: "" },
  { mois: 24, label: "24 mois", remise: "−8%" },
  { mois: 36, label: "36 mois", remise: "−15%" },
];

// Ordre aligné sur la page solution : Connection, Boost (populaire), Premium,
// puis l'offre découverte (essai 30 jours, facturée au mois).
// Fonctionnalités incluses par offre (source : page Tarifs) — affichées au dépli
const PLAN_FEATURES: Record<string, string[]> = {
  "vibes-connection": [
    "Expériences interactives (1 000 vibes)", "Enquêtes flash", "Baromètre bien-être", "Statistiques & pilotage",
  ],
  "vibes-premium": [
    "Expériences interactives (1 000 vibes)", "Enquêtes flash", "Baromètre bien-être", "Statistiques & pilotage",
    "Logo de votre entreprise", "Kit de communication", "Diffusion d'actualités internes",
  ],
  "vibes-boost": [
    "Expériences interactives (1 000 vibes)", "Enquêtes flash", "Baromètre bien-être", "Statistiques & pilotage",
    "Logo de votre entreprise", "Kit de communication", "Diffusion d'actualités internes",
    "Networking (cartes de visite digitales)", "Brainstorming (enquêtes post vibes)",
    "Employer branding (invités extérieurs)", "Soft skills (parcours d'entraînement) ou médiathèque",
  ],
  "vibes-decouverte": [
    "Toutes les fonctionnalités essentielles", "Sans engagement", "Idéal pour tester en interne",
  ],
};

const PLANS = [
  { slug: "vibes-connection", nom: "Vibes Connection", price: "3 980 €/an", desc: "Une expérience d'engagement collectif" },
  { slug: "vibes-boost", nom: "Vibes Boost", price: "5 980 €/an", desc: "Des outils de travail innovants", recommended: true },
  { slug: "vibes-premium", nom: "Vibes Premium", price: "4 980 €/an", desc: "Une visibilité augmentée" },
  { slug: "vibes-decouverte", nom: "Offre découverte", price: "480 €", desc: "30 jours pour tester", trial: true },
];

const STEPS = ["Votre collectif", "Vos usages", "Vos coordonnées"];

interface FormData {
  // Step 1
  typeCollectif: string;
  typePrecision: string;
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
  adresse: string;
  siret: string;
}

export default function DevisFormStepper() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [form, setForm] = useState<FormData>({
    typeCollectif: "",
    typePrecision: "",
    tailleCollectif: "50-250",
    planSlug: "vibes-boost",
    dureeContrat: 12,
    nombreUtilisateurs: TAILLES[0].repValue,
    usagesPrevus: ["echanges-conversationnels"],
    besoinsNotes: "",
    nom: "",
    contact: "",
    email: "",
    telephone: "",
    ville: "",
    adresse: "",
    siret: "",
  });

  // Offre dont les fonctionnalités sont dépliées (pour voir le contenu)
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  // Plans + tranches de tarification (prix live selon la tranche sélectionnée)
  const [apiPlans, setApiPlans] = useState<PlanApi[]>([]);
  useEffect(() => {
    fetch("/api/plans").then((r) => r.json()).then(setApiPlans).catch(() => {});
  }, []);

  const set = (key: keyof FormData, val: unknown) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const selectTaille = (t: typeof TAILLES[number]) => {
    setForm((f) => ({ ...f, tailleCollectif: t.value, nombreUtilisateurs: t.repValue }));
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
      if (form.typeCollectif === "Autre" && !form.typePrecision.trim()) errs.typePrecision = "Champ requis";
    }
    if (step === 2) {
      if (!form.nom.trim()) errs.nom = "Champ requis";
      if (!form.contact.trim()) errs.contact = "Champ requis";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Email invalide";
      if (!form.adresse.trim()) errs.adresse = "Champ requis";
      if (!form.ville.trim()) errs.ville = "Champ requis";
      if (!form.siret.trim()) errs.siret = "Champ requis";
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
      {/* Header — logo « vi » seul (dégradé, sans fond), cliquable, renvoie au site */}
      <header className="dv-header">
        <Link href="/" className="dv-header-logo" aria-label="Retour au site Uvibes">
          <Image src="/images/favicon.png" alt="Uvibes" width={40} height={35} className="dv-header-logo-img" />
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
          <h2 className="dv-card-title">Parlez-nous de votre organisation</h2>
          <p className="dv-card-sub">Ces informations nous permettront d&apos;établir une proposition commerciale adaptée à vos besoins.</p>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-type">Type d&apos;organisation *</label>
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

          {form.typeCollectif === "Autre" && (
            <div className="dv-field">
              <label className="dv-label" htmlFor="dv-type-precision">Précisez votre type d&apos;organisation *</label>
              <input
                id="dv-type-precision"
                className={`dv-input${errors.typePrecision ? " --error" : ""}`}
                type="text"
                placeholder="Ex : coopérative, fondation, club…"
                value={form.typePrecision}
                onChange={(e) => set("typePrecision", e.target.value)}
              />
              {errors.typePrecision && <p className="dv-error-msg">{errors.typePrecision}</p>}
            </div>
          )}

          <div className="dv-field">
            <label className="dv-label">Taille de votre organisation</label>
            <div className="dv-durees">
              {TAILLES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`dv-duree-btn${form.tailleCollectif === t.value ? " --active" : ""}`}
                  onClick={() => selectTaille(t)}
                >
                  <div className="dv-duree-months" style={{ fontSize: 14 }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>


          <div className="dv-field">
            <label className="dv-label">Plan souhaité</label>
            {/* Les 3 offres annuelles sur une ligne */}
            <div className="dv-plans">
              {PLANS.filter((p) => !p.trial).map((p) => {
                const open = openPlan === p.slug;
                const apiPlan = apiPlans.find((ap) => ap.slug === p.slug);
                const livePrice = tierPriceFor(apiPlan, form.nombreUtilisateurs);
                const priceLabel = livePrice != null
                  ? `${livePrice.toLocaleString("fr-FR")} €/an`
                  : p.price;
                return (
                <div
                  key={p.slug}
                  className={`dv-plan-card${form.planSlug === p.slug ? " --selected" : ""}${p.recommended ? " --recommended" : ""}${open ? " --open" : ""}`}
                  onClick={() => selectPlan(p.slug)}
                >
                  <div className="dv-plan-name">{p.nom}</div>
                  <div className="dv-plan-price" style={{ fontSize: 13 }}>{priceLabel} <span className="dv-plan-ht">HT</span></div>
                  {/* La description disparaît quand on affiche le contenu de l'offre */}
                  {!open && <div className="dv-plan-desc">{p.desc}</div>}
                  {open && (
                    <ul className="dv-plan-features">
                      {(PLAN_FEATURES[p.slug] ?? []).map((f) => (
                        <li key={f}><Check size={12} strokeWidth={3} />{f}</li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button"
                    className="dv-plan-toggle"
                    onClick={(e) => { e.stopPropagation(); setOpenPlan(open ? null : p.slug); }}
                  >
                    {open ? "Masquer le contenu" : "Voir le contenu de l'offre"}
                  </button>
                </div>
                );
              })}
            </div>
            {/* 4ème offre — découverte : bandeau pleine largeur, mis en valeur à part */}
            {PLANS.filter((p) => p.trial).map((p) => (
              <div
                key={p.slug}
                className={`dv-plan-trial${form.planSlug === p.slug ? " --selected" : ""}`}
                onClick={() => selectPlan(p.slug)}
              >
                <div className="dv-plan-trial-text">
                  <div className="dv-plan-trial-head">
                    <span className="dv-plan-name">{p.nom}</span>
                    <span className="dv-plan-trial-badge">Sans engagement</span>
                  </div>
                  <p className="dv-plan-trial-msg">
                    Le moyen idéal de convaincre en interne : testez Uvibes pendant 30&nbsp;jours,
                    puis basculez sur une formule annuelle en toute confiance.
                  </p>
                </div>
                <div className="dv-plan-trial-price">{p.price}</div>
              </div>
            ))}
          </div>

          <div className="dv-field">
            <label className="dv-label">Durée du contrat</label>
            {isTrial ? (
              <p className="dv-card-sub" style={{ margin: 0 }}>
                Offre découverte&nbsp;: <strong>1 mois</strong>, facturée 480&nbsp;€ HT. Sans engagement annuel.
              </p>
            ) : (
              <div className="dv-durees">
                {DUREES.map((d) => {
                  const apiPlan = apiPlans.find((ap) => ap.slug === form.planSlug);
                  const total = totalPriceFor(apiPlan, form.nombreUtilisateurs, d.mois);
                  return (
                    <button
                      key={d.mois}
                      type="button"
                      className={`dv-duree-btn${form.dureeContrat === d.mois ? " --active" : ""}`}
                      onClick={() => set("dureeContrat", d.mois)}
                    >
                      <div className="dv-duree-months">{d.label}</div>
                      {d.remise && <div className="dv-duree-remise">{d.remise}</div>}
                      {total != null && (
                        <div className="dv-duree-price">{total.toLocaleString("fr-FR")} € HT</div>
                      )}
                    </button>
                  );
                })}
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
              <label className="dv-label" htmlFor="dv-ville">Ville *</label>
              <input
                id="dv-ville"
                className={`dv-input${errors.ville ? " --error" : ""}`}
                type="text"
                placeholder="Paris"
                value={form.ville}
                onChange={(e) => set("ville", e.target.value)}
              />
              {errors.ville && <p className="dv-error-msg">{errors.ville}</p>}
            </div>
          </div>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-adresse">Adresse complète *</label>
            <input
              id="dv-adresse"
              className={`dv-input${errors.adresse ? " --error" : ""}`}
              type="text"
              placeholder="12 rue de l'Exemple, 75000 Paris"
              value={form.adresse}
              onChange={(e) => set("adresse", e.target.value)}
            />
            {errors.adresse && <p className="dv-error-msg">{errors.adresse}</p>}
          </div>

          <div className="dv-field">
            <label className="dv-label" htmlFor="dv-siret">Numéro SIRET *</label>
            <input
              id="dv-siret"
              className={`dv-input${errors.siret ? " --error" : ""}`}
              type="text"
              inputMode="numeric"
              placeholder="123 456 789 00012"
              value={form.siret}
              onChange={(e) => set("siret", e.target.value)}
            />
            {errors.siret && <p className="dv-error-msg">{errors.siret}</p>}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="dv-card dv-card--bare" style={{ padding: "0 44px 28px", background: "transparent", boxShadow: "none" }}>
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
