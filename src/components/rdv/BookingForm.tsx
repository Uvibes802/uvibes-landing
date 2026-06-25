"use client";

import { useEffect, useState } from "react";
import Select from "@/components/shared/Select";
import "@/styles/rdv/booking.css";

const SUJETS = [
  "Découverte de la solution Uvibes",
  "Démo personnalisée",
  "Question tarifaire",
  "Partenariat",
  "Support technique",
  "Autre",
];

// Les ~12 prochains jours ouvrés (à partir de demain) → pastilles de jour.
function getNextWeekdays(count: number) {
  const out: { iso: string; dow: string; day: number; month: string }[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) {
      out.push({
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        dow: d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""),
        day: d.getDate(),
        month: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const days = getNextWeekdays(12);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [sujet, setSujet] = useState(SUJETS[0]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finalizing, setFinalizing] = useState(false); // écran de chargement animé avant le succès
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!date) { setSlots([]); setSelectedSlot(""); return; }
    setLoadingSlots(true);
    setSelectedSlot("");
    fetch(`/api/rdv/creneaux?date=${date}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [date]);

  const prettyDate = date
    ? new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    : "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) { setError("Veuillez choisir un créneau."); setStep(1); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/rdv/reserver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, heure: selectedSlot, nom, email, telephone, organisation, sujet, message }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur lors de la réservation."); return; }
      // Petit écran de finalisation animé (plus engageant) avant la confirmation
      setFinalizing(true);
      setTimeout(() => setSuccess(true), 1900);
    } catch {
      setError("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  // ── Écran de finalisation : chargement animé juste avant la confirmation ──
  if (finalizing && !success) {
    return (
      <div className="rdv-finalizing">
        <div className="rdv-final-orbit" aria-hidden="true">
          <span className="rdv-final-core" />
          <span className="rdv-final-ring rdv-final-ring--1" />
          <span className="rdv-final-ring rdv-final-ring--2" />
          <span className="rdv-final-dot rdv-final-dot--1" />
          <span className="rdv-final-dot rdv-final-dot--2" />
          <span className="rdv-final-dot rdv-final-dot--3" />
        </div>
        <p className="rdv-final-title">On réserve votre créneau…</p>
        <p className="rdv-final-sub">Encore un instant, on prépare tout&nbsp;✨</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rdv-success rdv-pop">
        {/* Confettis légers */}
        <div className="rdv-confetti" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`rdv-confetti-bit rdv-cf-${i}`} />
          ))}
        </div>

        <div className="rdv-success-check" aria-hidden="true">
          <span className="rdv-success-ring" />
          <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
            <path className="rdv-check-path" d="M12 24l8 8 16-18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="rdv-success-title">C&apos;est noté&nbsp;!</h2>
        <p className="rdv-success-text">
          Super, votre rendez-vous est réservé. On a hâte d&apos;échanger avec vous&nbsp;!
        </p>

        {/* Carte récap — date, heure, sujet */}
        <div className="rdv-success-card">
          <div className="rdv-success-row">
            <span className="rdv-success-ico" aria-hidden="true">📅</span>
            <span className="rdv-success-row-text">
              <span className="rdv-success-row-label">Date</span>
              <strong>{prettyDate}</strong>
            </span>
          </div>
          <div className="rdv-success-row">
            <span className="rdv-success-ico" aria-hidden="true">⏰</span>
            <span className="rdv-success-row-text">
              <span className="rdv-success-row-label">Heure</span>
              <strong>{selectedSlot}</strong>
            </span>
          </div>
          <div className="rdv-success-row">
            <span className="rdv-success-ico" aria-hidden="true">💬</span>
            <span className="rdv-success-row-text">
              <span className="rdv-success-row-label">Sujet</span>
              <strong>{sujet}</strong>
            </span>
          </div>
        </div>

        <p className="rdv-success-sub">
          Un email de confirmation part vers <strong>{email}</strong> — pensez à vérifier vos spams. On revient vers vous sous 24&nbsp;h.
        </p>
      </div>
    );
  }

  return (
    <div className="rdv-booking">
      {/* Progression */}
      <div className="rdv-progress" aria-hidden="true">
        <span className={`rdv-progress-step${step >= 1 ? " --on" : ""}`}>
          <span className="rdv-progress-num">1</span> Créneau
        </span>
        <span className="rdv-progress-bar"><span className={`rdv-progress-fill${step >= 2 ? " --on" : ""}`} /></span>
        <span className={`rdv-progress-step${step >= 2 ? " --on" : ""}`}>
          <span className="rdv-progress-num">2</span> Coordonnées
        </span>
      </div>

      {error && <div className="rdv-error">{error}</div>}

      {/* ── Étape 1 : créneau ─────────────────────────────────── */}
      {step === 1 && (
        <div className="rdv-panel rdv-fade" key="step1">
          <p className="rdv-step-title">Quand êtes-vous disponible&nbsp;?</p>

          <div className="rdv-days" role="listbox" aria-label="Choisir un jour">
            {days.map((d, i) => (
              <button
                key={d.iso}
                type="button"
                role="option"
                aria-selected={date === d.iso}
                className={`rdv-day${date === d.iso ? " --active" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setDate(d.iso)}
              >
                <span className="rdv-day-dow">{d.dow}</span>
                <span className="rdv-day-num">{d.day}</span>
                <span className="rdv-day-month">{d.month}</span>
              </button>
            ))}
          </div>

          {date && (
            <div className="rdv-slots-wrap rdv-fade">
              <p className="rdv-slots-label">Créneaux du {prettyDate}</p>
              {loadingSlots ? (
                <div className="rdv-slots-loading">
                  <span className="rdv-dot-pulse" /><span className="rdv-dot-pulse" /><span className="rdv-dot-pulse" />
                </div>
              ) : slots.length === 0 ? (
                <p className="rdv-empty">Aucun créneau ce jour — essayez une autre date.</p>
              ) : (
                <div className="rdv-slots">
                  {slots.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      className={`rdv-slot${selectedSlot === s ? " --selected" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="rdv-next"
            disabled={!selectedSlot}
            onClick={() => setStep(2)}
          >
            Continuer <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      {/* ── Étape 2 : coordonnées ─────────────────────────────── */}
      {step === 2 && (
        <form className="rdv-panel rdv-fade" key="step2" onSubmit={submit}>
          <button type="button" className="rdv-back" onClick={() => setStep(1)}>
            <span aria-hidden="true">←</span> Modifier le créneau
          </button>

          <div className="rdv-recap">
            <span className="rdv-recap-icon" aria-hidden="true">📅</span>
            <span className="rdv-recap-text">
              <strong>{prettyDate}</strong>
              <span className="rdv-recap-hour">{selectedSlot}</span>
            </span>
          </div>

          <p className="rdv-step-title">À qui avons-nous le plaisir de parler&nbsp;?</p>

          <div className="rdv-fields">
            <div className="rdv-field">
              <label className="rdv-label" htmlFor="rdv-nom">Nom complet *</label>
              <input id="rdv-nom" className="rdv-input" value={nom} onChange={(e) => setNom(e.target.value)} required placeholder="Marie Dupont" />
            </div>
            <div className="rdv-field">
              <label className="rdv-label" htmlFor="rdv-org">Organisation *</label>
              <input id="rdv-org" className="rdv-input" value={organisation} onChange={(e) => setOrganisation(e.target.value)} required placeholder="Nom de votre organisation" />
            </div>
            <div className="rdv-field">
              <label className="rdv-label" htmlFor="rdv-email">Email *</label>
              <input type="email" id="rdv-email" className="rdv-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="marie@example.fr" />
            </div>
            <div className="rdv-field">
              <label className="rdv-label" htmlFor="rdv-tel">Téléphone</label>
              <input type="tel" id="rdv-tel" className="rdv-input" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+33 6 00 00 00 00" />
            </div>
            <div className="rdv-field rdv-field--full">
              <label className="rdv-label" htmlFor="rdv-sujet">Sujet de l&apos;échange *</label>
              <Select
                id="rdv-sujet"
                ariaLabel="Sujet de l'échange"
                value={sujet}
                onChange={setSujet}
                options={SUJETS.map((s) => ({ value: s, label: s }))}
              />
            </div>
            <div className="rdv-field rdv-field--full">
              <label className="rdv-label" htmlFor="rdv-message">Un mot pour préparer l&apos;échange&nbsp;? (optionnel)</label>
              <textarea id="rdv-message" className="rdv-textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Précisez votre demande…" />
            </div>
          </div>

          <button type="submit" className="rdv-submit" disabled={loading}>
            {loading ? "Envoi en cours…" : <>Confirmer le rendez-vous <span aria-hidden="true">→</span></>}
          </button>
        </form>
      )}
    </div>
  );
}
