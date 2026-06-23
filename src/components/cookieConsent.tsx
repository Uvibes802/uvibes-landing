"use client";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { detectLocale } from "@/lib/i18nRoutes";
import "../styles/cookie.css";

const CC_TXT: Record<string, {
  dialogAria: string; title: string; text: string; learnMore: string; accept: string; essentialOnly: string;
}> = {
  en: {
    dialogAria: "Cookie settings",
    title: "Your privacy",
    text: "We use cookies to improve your experience.",
    learnMore: "Learn more",
    accept: "Accept",
    essentialOnly: "Accept essential cookies only",
  },
  es: {
    dialogAria: "Gestión de cookies",
    title: "Tu privacidad",
    text: "Usamos cookies para mejorar tu experiencia.",
    learnMore: "Saber más",
    accept: "Aceptar",
    essentialOnly: "Aceptar solo las cookies esenciales",
  },
  de: {
    dialogAria: "Cookie-Einstellungen",
    title: "Deine Privatsphäre",
    text: "Wir verwenden Cookies, um deine Erfahrung zu verbessern.",
    learnMore: "Mehr erfahren",
    accept: "Akzeptieren",
    essentialOnly: "Nur essenzielle Cookies akzeptieren",
  },
  it: {
    dialogAria: "Impostazioni cookie",
    title: "La tua privacy",
    text: "Utilizziamo i cookie per migliorare la tua esperienza.",
    learnMore: "Scopri di più",
    accept: "Accetta",
    essentialOnly: "Accetta solo i cookie essenziali",
  },
  pt: {
    dialogAria: "Definições de cookies",
    title: "A sua privacidade",
    text: "Utilizamos cookies para melhorar a sua experiência.",
    learnMore: "Saber mais",
    accept: "Aceitar",
    essentialOnly: "Aceitar apenas cookies essenciais",
  },
  ru: {
    dialogAria: "Настройки cookie",
    title: "Ваша конфиденциальность",
    text: "Мы используем cookie-файлы, чтобы улучшить ваш опыт.",
    learnMore: "Узнать больше",
    accept: "Принять",
    essentialOnly: "Принять только необходимые",
  },
  zh: {
    dialogAria: "Cookie 设置",
    title: "您的隐私",
    text: "我们使用 Cookie 来改善您的体验。",
    learnMore: "了解更多",
    accept: "接受",
    essentialOnly: "仅接受必要的 Cookie",
  },
  ja: {
    dialogAria: "Cookieの設定",
    title: "プライバシーについて",
    text: "より良い体験のためにCookieを使用しています。",
    learnMore: "詳しく見る",
    accept: "同意する",
    essentialOnly: "必須Cookieのみ同意する",
  },
  hi: {
    dialogAria: "कुकी सेटिंग्स",
    title: "आपकी निजता",
    text: "हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं।",
    learnMore: "और जानें",
    accept: "स्वीकार करें",
    essentialOnly: "केवल आवश्यक कुकीज़ स्वीकार करें",
  },
  ar: {
    dialogAria: "إعدادات ملفات تعريف الارتباط",
    title: "خصوصيتك",
    text: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
    learnMore: "اعرف أكثر",
    accept: "موافقة",
    essentialOnly: "قبول الملفات الأساسية فقط",
  },
};

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

  const locale = detectLocale(pathname);
  const cc = CC_TXT[locale];

  return (
    <>
      <div className="cookie-backdrop" aria-hidden="true" />
      <div className="cookie-banner" role="dialog" aria-label={cc ? cc.dialogAria : "Gestion des cookies"}>
        <div className="cookie-top">
          <span className="cookie-icon" aria-hidden="true">🍪</span>
          <div>
            <p className="cookie-title">{cc ? cc.title : "Votre confidentialité"}</p>
            <p className="cookie-text">
              {cc
                ? <>{cc.text}{" "}<a href="/politique-cookies" className="cookie-link">{cc.learnMore}</a></>
                : <>Nous utilisons des cookies pour améliorer votre expérience.{" "}<a href="/politique-cookies" className="cookie-link">En savoir plus</a></>}
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button onClick={acceptCookies} className="cookie-btn cookie-btn--accept">
            {cc ? cc.accept : "Accepter"}
          </button>
          <button onClick={refuseCookies} className="cookie-btn cookie-btn--refuse">
            {cc ? cc.essentialOnly : "Accepter les cookies essentiels"}
          </button>
        </div>
      </div>
    </>
  );
}
