"use client";

import type { FormData } from "@/types/form/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/form/formContact.css";
import Button from "../button/Button";
import Input from "../input/Input";

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
    <form className="form-contact" onSubmit={handleSubmit(onSubmitHandler)}>
      <fieldset>
        <Input
          label="Nom"
          type="text"
          placeholder="Nom"
          htmlFor="lastname"
          {...register("lastname", { required: "Le nom est requis" })}
        />
        {errors.lastname && (
          <p className="form-error">{errors.lastname.message}</p>
        )}
        <Input
          label="Prénom"
          type="text"
          placeholder="Prénom"
          htmlFor="firstname"
          {...register("firstname", { required: "Le prénom est requis" })}
        />
        {errors.firstname && (
          <p className="form-error">{errors.firstname.message}</p>
        )}
      </fieldset>
      <Input
        label="Email"
        htmlFor="email"
        type="email"
        placeholder="Email"
        {...register("email", { required: "L'email est requis" })}
      />
      {errors.email && (
        <p className="form-error">{errors.email.message}</p>
      )}
      <Input
        label="Message"
        type="textarea"
        placeholder="Votre message"
        htmlFor="message"
        {...register("message", { required: "Le message est requis" })}
      />
      {errors.message && (
        <p className="form-error">{errors.message.message}</p>
      )}
      <div className="checkbox-container">
        <label className="checkbox-label">
          Je souhaite partager mes informations avec Uvibes
          <input required type="checkbox" {...register("share")} />
        </label>
        <label className="checkbox-label">
          Je m&apos;inscris à la newsletter Uvibes
          <input type="checkbox" {...register("newsletter")} />
        </label>
      </div>
      <div className="button-container">
        <Button
          title={isSubmitting ? "Envoi en cours..." : "Envoyer"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
      {submitSuccess && (
        <p className="form-success">Message envoyé avec succès !</p>
      )}
      {submitError && (
        <p className="form-error">
          Une erreur est survenue, veuillez réessayer.
        </p>
      )}
    </form>
  );
}
