"use client";

import { ArrowLeft, Send, Save } from "lucide-react";
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

const DUREES = [
  { mois: 12, label: "12 mois" },
  { mois: 24, label: "24 mois (−8%)" },
  { mois: 36, label: "36 mois (−15%)" },
];

interface Collectif { id: string; nom: string; email: string; contact: string; }
interface Plan { slug: string; nom: string; prixAnnuel: number; }

interface Props {
  collectifs: Collectif[];
  plans: Plan[];
}

export default function AdminDevisForm({ collectifs, plans }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Sélection collectif existant ou nouveau
  const [mode, setMode] = useState<"existant" | "nouveau">("existant");
  const [collectifId, setCollectifId] = useState(collectifs[0]?.id ?? "");

  // Nouveau collectif
  const [nom, setNom] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [ville, setVille] = useState("");
  const [typeCollectif, setTypeCollectif] = useState("Entreprise");
  const [tailleCollectif, setTailleCollectif] = useState("50-250");

  // Devis
  const [planSlug, setPlanSlug] = useState(plans[0]?.slug ?? "");
  const [nombreUtilisateurs, setNombreUtilisateurs] = useState(100);
  const [dureeContrat, setDureeContrat] = useState(12);
  const [remiseManuelle, setRemiseManuelle] = useState(0);

  async function submit(envoyerMaintenant: boolean) {
    setLoading(true); setMsg(""); setError("");
    try {
      const body =
        mode === "existant"
          ? { collectifId, planSlug, nombreUtilisateurs, dureeContrat, remiseManuelle, envoyerMaintenant }
          : {
              nomNouveauCollectif: nom,
              contactNouveauCollectif: contact,
              emailNouveauCollectif: email,
              telephoneNouveauCollectif: telephone,
              villeNouveauCollectif: ville,
              typeCollectif,
              tailleCollectif,
              planSlug,
              nombreUtilisateurs,
              dureeContrat,
              remiseManuelle,
              envoyerMaintenant,
            };

      const res = await fetch("/api/admin/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur"); return; }
      setMsg(envoyerMaintenant ? `✓ Devis ${data.numero} créé et envoyé` : `✓ Devis ${data.numero} créé en brouillon`);
      setTimeout(() => router.push(`/admin/devis/${data.id}`), 1200);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="crm-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/devis" className="crm-btn --outline --sm">
            <ArrowLeft size={13} /> Retour
          </Link>
          <span className="crm-topbar-title">Nouveau devis</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="crm-btn --outline --sm" onClick={() => submit(false)} disabled={loading}>
            <Save size={13} /> Brouillon
          </button>
          <button className="crm-btn --primary --sm" onClick={() => submit(true)} disabled={loading}>
            <Send size={13} /> {loading ? "Création..." : "Créer & Envoyer"}
          </button>
        </div>
      </div>

      {msg && <div style={{ margin: "12px 28px 0", padding: "10px 16px", background: "rgba(22,163,74,.1)", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>{msg}</div>}
      {error && <div style={{ margin: "12px 28px 0", padding: "10px 16px", background: "rgba(217,10,92,.08)", borderRadius: 8, fontSize: 13, color: "var(--rose, #D90A5C)" }}>{error}</div>}

      <div className="crm-content">
        <div className="crm-detail-grid">

          {/* Colonne gauche : collectif */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Collectif</p>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button
                  className={`crm-btn --sm ${mode === "existant" ? "--primary" : "--outline"}`}
                  onClick={() => setMode("existant")}
                >
                  Collectif existant
                </button>
                <button
                  className={`crm-btn --sm ${mode === "nouveau" ? "--primary" : "--outline"}`}
                  onClick={() => setMode("nouveau")}
                >
                  Nouveau collectif
                </button>
              </div>

              {mode === "existant" ? (
                <div className="crm-field-row">
                  <label className="crm-field-label">Sélectionner *</label>
                  <select className="crm-field-select" value={collectifId} onChange={(e) => setCollectifId(e.target.value)}>
                    {collectifs.length === 0 && <option value="">Aucun collectif</option>}
                    {collectifs.map((c) => (
                      <option key={c.id} value={c.id}>{c.nom} — {c.email}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: "Nom organisation *", val: nom, set: setNom },
                    { label: "Contact *", val: contact, set: setContact },
                    { label: "Email *", val: email, set: setEmail },
                    { label: "Téléphone", val: telephone, set: setTelephone },
                    { label: "Ville", val: ville, set: setVille },
                  ].map(({ label, val, set: setter }) => (
                    <div key={label} className="crm-field-row">
                      <label className="crm-field-label">{label}</label>
                      <input className="crm-field-input" value={val} onChange={(e) => setter(e.target.value)} />
                    </div>
                  ))}

                  <div className="crm-field-row">
                    <label className="crm-field-label">Type</label>
                    <select className="crm-field-select" value={typeCollectif} onChange={(e) => setTypeCollectif(e.target.value)}>
                      {TYPES_COLLECTIF.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="crm-field-row">
                    <label className="crm-field-label">Taille</label>
                    <select className="crm-field-select" value={tailleCollectif} onChange={(e) => setTailleCollectif(e.target.value)}>
                      {TAILLES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite : devis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="crm-detail-card">
              <p className="crm-detail-section-title">Paramètres du devis</p>

              <div className="crm-field-row">
                <label className="crm-field-label">Plan *</label>
                <select className="crm-field-select" value={planSlug} onChange={(e) => setPlanSlug(e.target.value)}>
                  {plans.length === 0 && <option value="">Aucun plan actif</option>}
                  {plans.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.nom} — {p.prixAnnuel.toLocaleString("fr-FR")} €/an
                    </option>
                  ))}
                </select>
              </div>

              <div className="crm-field-row">
                <label className="crm-field-label">Nombre d&apos;utilisateurs *</label>
                <input
                  type="number" min={10} max={10000}
                  className="crm-field-input"
                  value={nombreUtilisateurs}
                  onChange={(e) => setNombreUtilisateurs(Number(e.target.value))}
                />
              </div>

              <div className="crm-field-row">
                <label className="crm-field-label">Durée du contrat *</label>
                <select className="crm-field-select" value={dureeContrat} onChange={(e) => setDureeContrat(Number(e.target.value))}>
                  {DUREES.map((d) => <option key={d.mois} value={d.mois}>{d.label}</option>)}
                </select>
              </div>

              <div className="crm-field-row">
                <label className="crm-field-label">Remise supplémentaire (%)</label>
                <input
                  type="number" min={0} max={50} step={1}
                  className="crm-field-input"
                  value={remiseManuelle}
                  onChange={(e) => setRemiseManuelle(Number(e.target.value))}
                />
                <span style={{ fontSize: 11, color: "var(--crm-muted)", marginTop: 4 }}>
                  S&apos;ajoute à la remise automatique selon durée
                </span>
              </div>
            </div>

            <div className="crm-detail-card" style={{ background: "rgba(253,110,0,.04)", borderColor: "rgba(253,110,0,.2)" }}>
              <p className="crm-detail-section-title">Actions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="crm-btn --primary" style={{ justifyContent: "center" }} onClick={() => submit(true)} disabled={loading}>
                  <Send size={14} /> {loading ? "Création..." : "Créer et envoyer au client"}
                </button>
                <button className="crm-btn --outline" style={{ justifyContent: "center" }} onClick={() => submit(false)} disabled={loading}>
                  <Save size={14} /> Créer en brouillon (sans envoyer)
                </button>
              </div>
              <p style={{ fontSize: 11, color: "var(--crm-muted)", marginTop: 12 }}>
                &ldquo;Envoyer&rdquo; envoie un email au client avec le lien de signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
