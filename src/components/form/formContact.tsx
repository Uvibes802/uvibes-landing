"use client";

import type { FormData } from "@/types/form/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/form/formContact.css";

// Catégories alignées sur les Passeports d'Expérience (cf. PasseportExperience)
const CATEGORIES = [
  "Insertion professionnelle",
  "Enseignement",
  "Business",
  "Échanges entre pairs",
  "Adhérents & Sociétaires",
  "Seniors",
  "Clubs sportifs",
  "Cinémas, théâtres & lieux culturels",
  "Campings & villages vacances",
  "Entreprises & Équipes",
  "International",
];

export default function FormContact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);
    try {
      const response = await fetch("api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
      console.error("Erreur lors de l'envoi de l'email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="fc-form" onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Nom + Prénom */}
      <div className="fco-row">
        <div className="fc-field">
          <label className="fc-label" htmlFor="lastname">Nom</label>
          <input
            id="lastname"
            className={`fc-input${errors.lastname ? " --error" : ""}`}
            placeholder="Dupont"
            {...register("lastname", { required: "Requis" })}
          />
          {errors.lastname && <span className="fc-error">{errors.lastname.message}</span>}
        </div>
        <div className="fc-field">
          <label className="fc-label" htmlFor="firstname">Prénom</label>
          <input
            id="firstname"
            className={`fc-input${errors.firstname ? " --error" : ""}`}
            placeholder="Marie"
            {...register("firstname", { required: "Requis" })}
          />
          {errors.firstname && <span className="fc-error">{errors.firstname.message}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`fc-input${errors.email ? " --error" : ""}`}
          placeholder="vous@organisation.fr"
          {...register("email", { required: "Requis" })}
        />
        {errors.email && <span className="fc-error">{errors.email.message}</span>}
      </div>

      {/* Organisation */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="organisation">Organisation</label>
        <input
          id="organisation"
          className="fc-input"
          placeholder="Nom de votre structure"
          {...register("organisation")}
        />
      </div>

      {/* Message */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          className={`fc-input fc-textarea${errors.message ? " --error" : ""}`}
          placeholder="Décrivez votre collectif et vos objectifs..."
          {...register("message", { required: "Requis" })}
        />
        {errors.message && <span className="fc-error">{errors.message.message}</span>}
      </div>

      {/* Checkboxes */}
      <div className="fc-checks">
        <label className="fc-check-label">
          <input type="checkbox" required {...register("share")} />
          <span>Je souhaite partager mes informations avec Uvibes</span>
        </label>
      </div>

      {/* Newsletter — encart mis en avant + choix des catégories de contenu */}
      <div className="fc-newsletter-block">
        <label className="fc-newsletter">
          <input type="checkbox" {...register("newsletter")} />
          <span className="fc-newsletter-body">
            <span className="fc-newsletter-title">📬 Recevoir nos meilleures idées avec la newsletter</span>
            <span className="fc-newsletter-sub">
              Conseils lien social, soft skills &amp; retours d&apos;expérience de collectifs — 1 email par mois, zéro spam.
            </span>
          </span>
        </label>
        <div className="fc-newsletter-cat">
          <span className="fc-label">Quelles catégories vous intéressent&nbsp;?</span>
          <div className="fc-cat-grid">
            {CATEGORIES.map((c) => (
              <label key={c} className="fc-cat-chip">
                <input type="checkbox" value={c} {...register("categories")} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bouton */}
      <button type="submit" className="fc-submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Envoyer"}
        {!isSubmitting && <span className="fc-submit-dot" aria-hidden="true" />}
      </button>

      {submitSuccess && (
        <p className="fc-success">Message envoyé ! On revient vers vous sous 48h.</p>
      )}
      {submitError && (
        <p className="fc-error-global">Une erreur est survenue, veuillez réessayer.</p>
      )}
    </form>
  );
}
