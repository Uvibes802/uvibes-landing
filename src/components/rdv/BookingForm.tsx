"use client";

import { useEffect, useState } from "react";
import "@/styles/rdv/booking.css";

const SUJETS = [
  "Découverte de la solution Uvibes",
  "Démo personnalisée",
  "Question tarifaire",
  "Partenariat",
  "Support technique",
  "Autre",
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function BookingForm() {
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) { setError("Veuillez choisir un créneau horaire."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/rdv/reserver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, heure: selectedSlot, nom, email, telephone, organisation, sujet, message }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur lors de la réservation."); return; }
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rdv-success">
        <div className="rdv-success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(22,163,74,.1)" />
            <path d="M14 24l8 8 12-14" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="rdv-success-title">Demande envoyée !</h2>
        <p className="rdv-success-text">
          Votre rendez-vous du{" "}
          <strong>{new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</strong>{" "}
          à <strong>{selectedSlot}</strong> a bien été enregistré.
        </p>
        <p className="rdv-success-sub">
          Un email de confirmation vous sera envoyé à <strong>{email}</strong>.<br />
          Nous confirmons dans les 24h.
        </p>
        <div className="rdv-success-badge">
          <span>🗓</span> Rendez-vous en attente de confirmation
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="rdv-error">{error}</div>}

      <div className="rdv-grid">
        {/* Colonne gauche : date + créneau */}
        <div className="rdv-card">
          <p className="rdv-card-title">Choisir une date</p>

          <div className="rdv-field">
            <label className="rdv-label">Date *</label>
            <input
              type="date"
              className="rdv-input"
              value={date}
              min={getMinDate()}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {date && (
            <div className="rdv-field">
              <label className="rdv-label">Créneaux disponibles *</label>
              {loadingSlots ? (
                <p style={{ fontSize: 13, color: "var(--ink-muted, #6b5c75)" }}>Chargement...</p>
              ) : slots.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--secondaryColor)" }}>Aucun créneau disponible ce jour.</p>
              ) : (
                <div className="rdv-slots">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`rdv-slot${selectedSlot === s ? " --selected" : ""}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Colonne droite : infos */}
        <div className="rdv-card">
          <p className="rdv-card-title">Vos informations</p>

          <div className="rdv-field">
            <label className="rdv-label">Nom complet *</label>
            <input className="rdv-input" value={nom} onChange={(e) => setNom(e.target.value)} required placeholder="Marie Dupont" />
          </div>

          <div className="rdv-field">
            <label className="rdv-label">Email *</label>
            <input type="email" className="rdv-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="marie@example.fr" />
          </div>

          <div className="rdv-field">
            <label className="rdv-label">Téléphone</label>
            <input type="tel" className="rdv-input" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+33 6 00 00 00 00" />
          </div>

          <div className="rdv-field">
            <label className="rdv-label">Organisation</label>
            <input className="rdv-input" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Nom de votre collectif" />
          </div>

          <div className="rdv-field">
            <label className="rdv-label">Sujet *</label>
            <select className="rdv-select" value={sujet} onChange={(e) => setSujet(e.target.value)} required>
              {SUJETS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="rdv-field">
            <label className="rdv-label">Message (optionnel)</label>
            <textarea className="rdv-textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Précisez votre demande..." />
          </div>
        </div>
      </div>

      <button type="submit" className="rdv-submit" disabled={loading || !selectedSlot}>
        {loading ? "Envoi en cours..." : "Confirmer le rendez-vous →"}
      </button>
    </form>
  );
}
