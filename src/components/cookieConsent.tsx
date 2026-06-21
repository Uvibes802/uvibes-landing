"use client";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "../styles/cookie.css";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      // Restore consent if already accepted
      if (typeof window !== "undefined" && window.gtag && GA_ID) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
        // Config is optional here if already in layout, but safe to re-run or rely on layout's config picking up the updated consent
        console.log("Google Analytics consent restored: granted");
      }
    }
  }, [GA_ID]);

  // Permet de rouvrir le bandeau depuis le lien "Gérer les cookies" du footer,
  // même si un choix a déjà été enregistré (changement d'avis possible).
  useEffect(() => {
    const reopen = () => setShowBanner(true);
    window.addEventListener("uvibes:manage-cookies", reopen);
    return () => window.removeEventListener("uvibes:manage-cookies", reopen);
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365 });
    setShowBanner(false);
    
    if (typeof window !== "undefined" && window.gtag && GA_ID) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
      // Force a new config signal to ensure the page view is registered with the new consent
      window.gtag("config", GA_ID, {
         page_path: window.location.pathname
      });
      console.log("Cookie consent accepted: GA granted");
    }
  };

  const refuseCookies = () => {
    Cookies.set("cookie-consent", "refused", { expires: 365 });
    setShowBanner(false);
    
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
      console.log("Cookie consent refused: GA denied");
    }
  };

  // Pas de bandeau cookies sur l'admin / le funnel devis (auto-masquage, comme le Menu)
  if (pathname.startsWith("/admin") || pathname.startsWith("/devis")) return null;
  if (!showBanner) return null;

  const locale: "fr" | "en" = pathname.startsWith("/en") ? "en" : "fr";

  return (
    <>
      <div className="cookie-backdrop" aria-hidden="true" />
      <div className="cookie-banner" role="dialog" aria-label={locale === "en" ? "Cookie settings" : "Gestion des cookies"}>
        <div className="cookie-top">
          <span className="cookie-icon" aria-hidden="true">🍪</span>
          <div>
            <p className="cookie-title">{locale === "en" ? "Your privacy" : "Votre confidentialité"}</p>
            <p className="cookie-text">
              {locale === "en"
                ? <>We use cookies to improve your experience.{" "}<a href="/politique-cookies" className="cookie-link">Learn more</a></>
                : <>Nous utilisons des cookies pour améliorer votre expérience.{" "}<a href="/politique-cookies" className="cookie-link">En savoir plus</a></>}
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button onClick={acceptCookies} className="cookie-btn cookie-btn--accept">
            {locale === "en" ? "Accept" : "Accepter"}
          </button>
          <button onClick={refuseCookies} className="cookie-btn cookie-btn--refuse">
            {locale === "en" ? "Decline" : "Refuser"}
          </button>
        </div>
      </div>
    </>
  );
}
