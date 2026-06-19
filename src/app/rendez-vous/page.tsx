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
