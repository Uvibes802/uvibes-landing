"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/uvibes/HelloAssoDon.css";

export default function HelloAssoDon({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [showModal, setShowModal] = useState(false);

  // La modale est rendue via un portal sur <body> : elle échappe ainsi à tout
  // contexte d'empilement de la page (sinon une vague décorative passait par-dessus).
  const modal = (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => setShowModal(false)}
          type="button"
          aria-label={locale === "en" ? "Close" : "Fermer"}
        >
          ✕
        </button>
        <iframe
          id="haWidget"
          src="https://www.helloasso.com/associations/eclat-ens/formulaires/1/widget"
          title={locale === "en" ? "Donation form for the Eclat'Ens association" : "Formulaire de don pour l'association Eclat'Ens"}
          frameBorder="0"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        className="uvibes-contact-button"
        onClick={() => setShowModal(true)}
        type="button"
      >
        {locale === "en" ? "Support the project financially" : "Aider financièrement le projet"}
      </button>
      {showModal && typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
