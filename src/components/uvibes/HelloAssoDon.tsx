"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/uvibes/HelloAssoDon.css";

const HAD_TXT: Record<string, { close: string; title: string; support: string }> = {
  en: { close: "Close", title: "Donation form for the Eclat'Ens association", support: "Support the project financially" },
  es: { close: "Cerrar", title: "Formulario de donación para la asociación Eclat'Ens", support: "Apoyar el proyecto económicamente" },
  de: { close: "Schließen", title: "Spendenformular für den Verein Eclat'Ens", support: "Das Projekt finanziell unterstützen" },
  it: { close: "Chiudi", title: "Modulo di donazione per l'associazione Eclat'Ens", support: "Sostenere finanziariamente il progetto" },
  pt: { close: "Fechar", title: "Formulário de doação para a associação Eclat'Ens", support: "Apoiar financeiramente o projeto" },
  ru: { close: "Закрыть", title: "Форма пожертвования для ассоциации Eclat'Ens", support: "Поддержать проект финансово" },
  zh: { close: "关闭", title: "Eclat'Ens协会捐款表单", support: "为项目提供资金支持" },
  ja: { close: "閉じる", title: "Eclat'Ens協会への寄付フォーム", support: "プロジェクトを資金面で支援する" },
  hi: { close: "बंद करें", title: "Eclat'Ens एसोसिएशन के लिए दान फॉर्म", support: "परियोजना को आर्थिक रूप से सहयोग दें" },
  ar: { close: "إغلاق", title: "نموذج التبرع لجمعية Eclat'Ens", support: "دعم المشروع ماديًا" },
};

export default function HelloAssoDon({ locale = "fr" }: { locale?: string }) {
  const [showModal, setShowModal] = useState(false);
  const had = HAD_TXT[locale];

  // La modale est rendue via un portal sur <body> : elle échappe ainsi à tout
  // contexte d'empilement de la page (sinon une vague décorative passait par-dessus).
  const modal = (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => setShowModal(false)}
          type="button"
          aria-label={had ? had.close : "Fermer"}
        >
          ✕
        </button>
        <iframe
          id="haWidget"
          src="https://www.helloasso.com/associations/eclat-ens/formulaires/1/widget"
          title={had ? had.title : "Formulaire de don pour l'association Eclat'Ens"}
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
        {had ? had.support : "Aider financièrement le projet"}
      </button>
      {showModal && typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
