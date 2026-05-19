"use client";

import { useState } from "react";
import "../../styles/uvibes/HelloAssoDon.css";

export default function HelloAssoDon() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="uvibes-contact-button"
        onClick={() => setShowModal(true)}
        type="button"
      >
        Aider financièrement le projet
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              type="button"
            >
              ✕
            </button>
            <iframe
              id="haWidget"
              src="https://www.helloasso.com/associations/eclat-ens/formulaires/1/widget"
              title="Formulaire de don pour l'association Eclat'Ens"
              frameBorder="0"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
