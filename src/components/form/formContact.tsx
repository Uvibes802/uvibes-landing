"use client";

import type { FormData } from "@/types/form/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/form/formContact.css";

// Catégories alignées sur les Passeports d'Expérience (cf. PasseportExperience)
const CATEGORIES_FR = [
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

const CATEGORIES_EN = [
  "Career support",
  "Education",
  "Business",
  "Peer support",
  "Members & policyholders",
  "Seniors",
  "Sports clubs",
  "Cinemas, theatres & cultural venues",
  "Campsites & holiday resorts",
  "Companies & teams",
  "International",
];

export default function FormContact({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const CATEGORIES = locale === "en" ? CATEGORIES_EN : CATEGORIES_FR;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // Les catégories ne s'affichent que si la newsletter est cochée → formulaire plus court
  const wantsNewsletter = watch("newsletter");

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
          <label className="fc-label" htmlFor="lastname">{locale === "en" ? "Last name" : "Nom"}</label>
          <input
            id="lastname"
            className={`fc-input${errors.lastname ? " --error" : ""}`}
            placeholder={locale === "en" ? "Smith" : "Dupont"}
            {...register("lastname", { required: locale === "en" ? "Required" : "Requis" })}
          />
          {errors.lastname && <span className="fc-error">{errors.lastname.message}</span>}
        </div>
        <div className="fc-field">
          <label className="fc-label" htmlFor="firstname">{locale === "en" ? "First name" : "Prénom"}</label>
          <input
            id="firstname"
            className={`fc-input${errors.firstname ? " --error" : ""}`}
            placeholder={locale === "en" ? "Mary" : "Marie"}
            {...register("firstname", { required: locale === "en" ? "Required" : "Requis" })}
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
          placeholder={locale === "en" ? "you@organization.com" : "vous@organisation.fr"}
          {...register("email", { required: locale === "en" ? "Required" : "Requis" })}
        />
        {errors.email && <span className="fc-error">{errors.email.message}</span>}
      </div>

      {/* Organisation */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="organisation">{locale === "en" ? "Organization" : "Organisation"}</label>
        <input
          id="organisation"
          className="fc-input"
          placeholder={locale === "en" ? "Your organization's name" : "Nom de votre structure"}
          {...register("organisation")}
        />
      </div>

      {/* Message */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          className={`fc-input fc-textarea${errors.message ? " --error" : ""}`}
          placeholder={locale === "en" ? "Tell us about your community and your goals..." : "Décrivez votre collectif et vos objectifs..."}
          {...register("message", { required: locale === "en" ? "Required" : "Requis" })}
        />
        {errors.message && <span className="fc-error">{errors.message.message}</span>}
      </div>

      {/* Checkboxes */}
      <div className="fc-checks">
        <label className="fc-check-label">
          <input type="checkbox" required {...register("share")} />
          <span>{locale === "en" ? "I agree to share my information with Uvibes and be contacted back." : "Je souhaite partager mes informations avec Uvibes et être recontacté.e"}</span>
        </label>
      </div>

      {/* Newsletter — encart mis en avant + choix des catégories de contenu */}
      <div className="fc-newsletter-block">
        <label className="fc-newsletter">
          <input type="checkbox" {...register("newsletter")} />
          <span className="fc-newsletter-body">
            <span className="fc-newsletter-title">{locale === "en" ? "📬 Get our best ideas in our newsletter" : "📬 Recevoir nos meilleures idées avec la newsletter"}</span>
            <span className="fc-newsletter-sub">
              {locale === "en"
                ? "News relevant to your organization, real user stories, soft-skills tips — 1 email a month, zero spam."
                : <>Actualités intéressant votre organisation, retours d&apos;expérience d&apos;utilisateurs, astuces soft skills – 1 email par mois, zéro spam.</>}
            </span>
          </span>
        </label>
        {wantsNewsletter && (
          <div className="fc-newsletter-cat">
            <span className="fc-label">{locale === "en" ? "Which topics interest you?" : "Quelles catégories vous intéressent ?"}</span>
            <div className="fc-cat-grid">
              {CATEGORIES.map((c) => (
                <label key={c} className="fc-cat-chip">
                  <input type="checkbox" value={c} {...register("categories")} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bouton */}
      <button type="submit" className="fc-submit" disabled={isSubmitting}>
        {isSubmitting ? (locale === "en" ? "Sending…" : "Envoi en cours…") : (locale === "en" ? "Send" : "Envoyer")}
        {!isSubmitting && <span className="fc-submit-dot" aria-hidden="true" />}
      </button>

      {submitSuccess && (
        <p className="fc-success">{locale === "en" ? "Message sent! We'll get back to you within 48h." : "Message envoyé ! On revient vers vous sous 48h."}</p>
      )}
      {submitError && (
        <p className="fc-error-global">{locale === "en" ? "Something went wrong, please try again." : "Une erreur est survenue, veuillez réessayer."}</p>
      )}
    </form>
  );
}
