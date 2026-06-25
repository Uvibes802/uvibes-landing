import type { Metadata } from "next";
import BookingForm from "@/components/rdv/BookingForm";
import "@/styles/rdv/booking.css";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Uvibes",
  description: "Réservez un créneau avec l'équipe Uvibes pour une démo ou une question.",
  robots: { index: true },
};

export default function RdvPage() {
  return (
    <div className="rdv-page">
      {/* Fond immersif — dégradé saturé + blobs animés (esprit hero) */}
      <div className="rdv-page-backdrop" aria-hidden="true">
        <span className="rdv-pblob rdv-pblob-1" />
        <span className="rdv-pblob rdv-pblob-2" />
        <span className="rdv-pblob rdv-pblob-3" />
        <span className="rdv-pblob rdv-pblob-4" />
        <span className="rdv-pblob rdv-pblob-5" />
        <span className="rdv-pblob rdv-pblob-6" />
        {/* Éléments flottants : anneaux, pastilles et croix qui dérivent doucement */}
        <span className="rdv-float rdv-float-ring rdv-f1" />
        <span className="rdv-float rdv-float-ring rdv-f2" />
        <span className="rdv-float rdv-float-dot rdv-f3" />
        <span className="rdv-float rdv-float-dot rdv-f4" />
        <span className="rdv-float rdv-float-ring rdv-f5" />
        <span className="rdv-float rdv-float-dot rdv-f6" />
        <span className="rdv-float rdv-float-plus rdv-f7" />
        <span className="rdv-float rdv-float-plus rdv-f8" />
      </div>
      <main className="rdv-container">
        <div className="rdv-header">
          <span className="rdv-eyebrow">· Rendez-vous ·</span>
          <h1 className="rdv-title">
            Parlons de votre projet
          </h1>
          <p className="rdv-subtitle">
            Choisissez le créneau qui vous convient et indiquez les informations utiles à l&apos;organisation de notre échange.
          </p>
        </div>
        <BookingForm />
      </main>
    </div>
  );
}
