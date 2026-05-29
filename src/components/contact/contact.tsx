import "../../styles/contact/contact.css";
import VibrationLine from "@/components/shared/VibrationLine";
import FormContact from "../form/formContact";

export default function Contact() {
  return (
    <section className="ct-section" id="contact">
      <div className="ct-deco-circle" aria-hidden="true" />
      <div className="ct-deco-circle-2" aria-hidden="true" />

      <div className="ct-inner">
        {/* Colonne gauche */}
        <div className="ct-left">
          <p className="ct-eyebrow v-mono">Étudions votre projet</p>
          <h2 className="ct-title">
            <span className="v-prompt">Parlons de votre</span>
            <br />
            <span className="ct-underline-wrap">
              <span className="v-serif ct-title-serif">collectif.</span>
              <span className="ct-vline-under" aria-hidden="true">
                <VibrationLine width={500} height={20} amplitude={6} freq={5} stroke="#D90A5C" strokeWidth={3} speed={5} style={{ width: "100%" }} />
              </span>
            </span>
          </h2>
          <p className="ct-sub">
            Quelques lignes suffisent. On vous répond sous 48h, sans script de vente.
          </p>

          <div className="ct-infos">
            <div className="ct-info-item">
              <span className="ct-info-label v-mono">Email</span>
              <a href="mailto:bonjour@uvibes.fr" className="ct-info-value">
                bonjour@uvibes.fr
              </a>
            </div>
            <div className="ct-info-item">
              <span className="ct-info-label v-mono">Téléphone</span>
              <a href="tel:+33411223344" className="ct-info-value">
                +33 (0)4 11 22 33 44
              </a>
            </div>
            <div className="ct-info-item">
              <span className="ct-info-label v-mono">Adresse</span>
              <span className="ct-info-value">
                Perpignan, France · Bruxelles, Belgique
              </span>
            </div>
          </div>
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
