import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/contact/contact.css";
import FormContact from "../form/formContact";

export default function Contact() {
  return (
    <section className="ct-section" id="contact">
      {/* Blobs décoratifs */}
      <div className="ct-blob ct-blob--a" aria-hidden="true" />
      <div className="ct-blob ct-blob--b" aria-hidden="true" />

      <div className="ct-inner">
        {/* Colonne gauche : accroche */}
        <div className="ct-left">
          <p className="v-mono ct-eyebrow">Contact</p>
          <h2 className="ct-title v-prompt">
            Étudions<br />
            votre <span className="v-serif">projet.</span>
          </h2>
          <p className="ct-sub">
            Parlez-nous de votre collectif et de vos objectifs. On vous répond sous 24h.
          </p>

          <div className="ct-promises">
            <div className="ct-promise">
              <span className="ct-promise-dot" aria-hidden="true" />
              <span>Réponse sous 24h</span>
            </div>
            <div className="ct-promise">
              <span className="ct-promise-dot" aria-hidden="true" />
              <span>Démo personnalisée gratuite</span>
            </div>
            <div className="ct-promise">
              <span className="ct-promise-dot" aria-hidden="true" />
              <span>Sans engagement</span>
            </div>
          </div>

          <div className="ct-wave" aria-hidden="true">
            <VibrationLine width={340} height={60} amplitude={20} freq={4} stroke="var(--orange)" strokeWidth={1.2} speed={18} />
          </div>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="ct-right">
          <div className="ct-form-card">
            <FormContact />
          </div>
        </div>
      </div>
    </section>
  );
}
