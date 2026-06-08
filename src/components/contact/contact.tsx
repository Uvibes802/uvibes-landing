import "../../styles/contact/contact.css";
import VibrationLine from "@/components/shared/VibrationLine";
import FormContact from "../form/formContact";

export default function Contact() {
  return (
    <section className="ct-section" id="contact">
      {/* Séparateur wavy — remplace le fondu blanc */}
      <svg className="ct-wave ct-wave--top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 H1440 V30 C1320,56 1200,6 1080,30 C960,54 840,6 720,30 C600,54 480,6 360,30 C240,54 120,6 0,30 Z" />
      </svg>
      {/* Blobs identiques au hero */}
      <div className="ct-blob ct-blob--a" aria-hidden="true" />
      <div className="ct-blob ct-blob--b" aria-hidden="true" />
      <div className="ct-blob ct-blob--c" aria-hidden="true" />
      <div className="ct-blob ct-blob--d" aria-hidden="true" />

      <div className="ct-inner">
        {/* Colonne gauche */}
        <div className="ct-left">
          <p className="ct-eyebrow v-mono">Étudions votre projet</p>
          <h2 className="ct-title">
            <span className="v-prompt">Votre projet mérite</span>
            <br />
            <span className="ct-underline-wrap">
              <span className="v-serif ct-title-serif">une vraie conversation.</span>
              <span className="ct-vline-under" aria-hidden="true">
                <VibrationLine width={500} height={20} amplitude={6} freq={5} stroke="rgba(255,255,255,.6)" strokeWidth={3} speed={5} style={{ width: "100%" }} />
              </span>
            </span>
          </h2>
          <p className="ct-sub">
            Quelques lignes suffisent. On vous répond sous 48h, sans script de vente.
          </p>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="ct-right">
          {/* Sonar dans le fond, derrière la carte */}
          <div className="ct-sonar" aria-hidden="true">
            <span className="ct-ripple" style={{ animationDelay: "0s"   }} />
            <span className="ct-ripple" style={{ animationDelay: "1.1s" }} />
            <span className="ct-ripple" style={{ animationDelay: "2.2s" }} />
            <span className="ct-ripple" style={{ animationDelay: "3.3s" }} />
            <span className="ct-sonar-dot" />
          </div>
          <div className="ct-form-card">
            <FormContact />
          </div>
        </div>
      </div>
    </section>
  );
}
