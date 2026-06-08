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
      <div className="rdv-container">
        <div className="rdv-header">
          <span className="rdv-eyebrow">· Rendez-vous ·</span>
          <h1 className="rdv-title">
            On en parle ?
          </h1>
          <p className="rdv-subtitle">
            Choisissez un créneau disponible. Nous confirmons dans les 24h.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
