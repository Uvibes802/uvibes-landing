"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Items } from "../../data/menu/MenuData";
import { SUPPORTED_LOCALES, LOCALE_LABELS, detectLocale, getLocaleSwitchHref } from "../../lib/i18nRoutes";
import "../../styles/menu/Menu.css";

const baseNavItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

// Libellés + liens des pages traduites par langue — les ids 1 à 5 correspondent à baseNavItems.
const EN_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Home", link: "/en" },
  2: { label: "Method", link: "/en/method" },
  3: { label: "Pricing", link: "/en/pricing" },
  4: { label: "About", link: "/en/about" },
  5: { label: "Blog", link: "/blog" },
};
const ES_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Inicio", link: "/es" },
  2: { label: "Método", link: "/es/method" },
  3: { label: "Precios", link: "/es/pricing" },
  4: { label: "Sobre nosotros", link: "/es/about" },
  5: { label: "Blog", link: "/blog" },
};
const DE_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Startseite", link: "/de" },
  2: { label: "Methode", link: "/de/method" },
  3: { label: "Preise", link: "/de/pricing" },
  4: { label: "Über uns", link: "/de/about" },
  5: { label: "Blog", link: "/blog" },
};
const IT_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Home", link: "/it" },
  2: { label: "Metodo", link: "/it/method" },
  3: { label: "Prezzi", link: "/it/pricing" },
  4: { label: "Chi siamo", link: "/it/about" },
  5: { label: "Blog", link: "/blog" },
};
const PT_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Início", link: "/pt" },
  2: { label: "Método", link: "/pt/method" },
  3: { label: "Preços", link: "/pt/pricing" },
  4: { label: "Sobre nós", link: "/pt/about" },
  5: { label: "Blog", link: "/blog" },
};
const RU_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "Главная", link: "/ru" },
  2: { label: "Метод", link: "/ru/method" },
  3: { label: "Цены", link: "/ru/pricing" },
  4: { label: "О нас", link: "/ru/about" },
  5: { label: "Блог", link: "/blog" },
};
const ZH_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "首页", link: "/zh" },
  2: { label: "方法", link: "/zh/method" },
  3: { label: "价格", link: "/zh/pricing" },
  4: { label: "关于我们", link: "/zh/about" },
  5: { label: "博客", link: "/blog" },
};
const JA_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "ホーム", link: "/ja" },
  2: { label: "メソッド", link: "/ja/method" },
  3: { label: "料金", link: "/ja/pricing" },
  4: { label: "私たちについて", link: "/ja/about" },
  5: { label: "ブログ", link: "/blog" },
};
const HI_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "होम", link: "/hi" },
  2: { label: "तरीका", link: "/hi/method" },
  3: { label: "मूल्य", link: "/hi/pricing" },
  4: { label: "हमारे बारे में", link: "/hi/about" },
  5: { label: "ब्लॉग", link: "/blog" },
};
const AR_NAV: Record<number, { label: string; link: string }> = {
  1: { label: "الرئيسية", link: "/ar" },
  2: { label: "الطريقة", link: "/ar/method" },
  3: { label: "الأسعار", link: "/ar/pricing" },
  4: { label: "من نحن", link: "/ar/about" },
  5: { label: "المدونة", link: "/blog" },
};
const NAV_BY_LOCALE: Record<string, Record<number, { label: string; link: string }>> = {
  en: EN_NAV, es: ES_NAV, de: DE_NAV, it: IT_NAV, pt: PT_NAV, ru: RU_NAV, zh: ZH_NAV, ja: JA_NAV, hi: HI_NAV, ar: AR_NAV,
};

const MENU_TXT: Record<string, { login: string; loginMobile: string; talk: string; loginAria: string }> = {
  en: { login: "Log in", loginMobile: "Log in to the platform", talk: "Let's talk", loginAria: "Log in to the Uvibes platform" },
  es: { login: "Conectarse", loginMobile: "Conectarse a la plataforma", talk: "Hablemos", loginAria: "Iniciar sesión en la plataforma Uvibes" },
  de: { login: "Anmelden", loginMobile: "Zur Plattform anmelden", talk: "Sprechen wir", loginAria: "Bei der Uvibes-Plattform anmelden" },
  it: { login: "Accedi", loginMobile: "Accedi alla piattaforma", talk: "Parliamone", loginAria: "Accedi alla piattaforma Uvibes" },
  pt: { login: "Entrar", loginMobile: "Entrar na plataforma", talk: "Vamos falar", loginAria: "Entrar na plataforma Uvibes" },
  ru: { login: "Войти", loginMobile: "Войти в платформу", talk: "Поговорим", loginAria: "Войти в платформу Uvibes" },
  zh: { login: "登录", loginMobile: "登录平台", talk: "聊一聊", loginAria: "登录 Uvibes 平台" },
  ja: { login: "ログイン", loginMobile: "プラットフォームにログイン", talk: "話しましょう", loginAria: "Uvibesプラットフォームにログイン" },
  hi: { login: "लॉग इन करें", loginMobile: "प्लेटफ़ॉर्म में लॉग इन करें", talk: "बात करें", loginAria: "Uvibes प्लेटफ़ॉर्म में लॉग इन करें" },
  ar: { login: "تسجيل الدخول", loginMobile: "تسجيل الدخول إلى المنصة", talk: "لنتحدث", loginAria: "تسجيل الدخول إلى منصة Uvibes" },
};
const LOCALE_NAME: Record<string, string> = {
  fr: "Français", en: "English", es: "Español", de: "Deutsch", it: "Italiano", pt: "Português",
  ru: "Русский", zh: "中文", ja: "日本語", hi: "हिन्दी", ar: "العربية",
};

export default function Menu() {
  const pathname = usePathname();
  // Rendu une seule fois dans le layout racine (FR + EN + ES…) → la langue se déduit du chemin
  const locale = detectLocale(pathname);
  const navItems = locale !== "fr"
    ? baseNavItems.map((item) => ({ ...item, ...NAV_BY_LOCALE[locale][item.id] }))
    : baseNavItems;
  const mt = locale !== "fr" ? MENU_TXT[locale] : undefined;
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [rdvSysteme, setRdvSysteme] = useState<"custom" | "calendly">("custom");
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/uvibescommunication/30min");
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (s["rdv-systeme"]) setRdvSysteme(s["rdv-systeme"] as "custom" | "calendly");
        if (s["rdv-calendly-url"]) setCalendlyUrl(s["rdv-calendly-url"]);
      })
      .catch(() => {});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme au changement de route
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Verrouille le scroll body quand le sheet est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Ferme le menu desktop si clic en dehors (desktop uniquement)
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return; // le backdrop gère la fermeture en mobile
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Ferme le sélecteur de langue si clic en dehors
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  // Jamais de navbar publique sur l'admin / l'espace devis client
  // (garde-fou côté client : le root layout ne se re-rend pas en navigation SPA)
  if (pathname.startsWith("/admin") || pathname.startsWith("/devis")) return null;

  return (
    <>
      {/* ── Navbar desktop ─────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`v-nav${scrolled ? " --scrolled" : ""}`}
        aria-label="Navigation principale"
      >
        <Link href="/" className="v-nav-logo" aria-label="Accueil Uvibes">
          <Image
            src="/images/Logo VI blanc.png"
            alt="Uvibes"
            width={32}
            height={32}
            className="v-nav-logo-mark"
            style={{ height: "28px", width: "auto" }}
          />
          <Image
            src="/images/Logo UVIBES.png"
            alt="Uvibes"
            width={120}
            height={32}
            className="v-nav-logo-full"
            style={{ height: "28px", width: "auto" }}
          />
        </Link>

        <ul className="v-nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`v-nav-link${pathname === item.link ? " --active" : ""}`}
              >
                {item.label}
                {pathname === item.link && (
                  <span className="v-nav-underline" aria-hidden="true" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="v-nav-right">
          <div className="v-nav-lang-wrap" ref={langRef}>
            <button
              type="button"
              className="v-nav-lang"
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Changer de langue"
              aria-expanded={langOpen}
            >
              {LOCALE_LABELS[locale]}
            </button>
            {langOpen && (
              <div className="v-nav-lang-menu" role="menu">
                {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
                  <Link
                    key={l}
                    href={getLocaleSwitchHref(pathname, locale, l)}
                    className="v-nav-lang-option"
                    onClick={() => setLangOpen(false)}
                  >
                    {LOCALE_NAME[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a
            href="https://app.uvibes.fr/welcome"
            className="v-nav-connexion"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mt ? mt.loginAria : "Se connecter à la plateforme Uvibes"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            {mt ? mt.login : "Connexion"}
          </a>
          {rdvSysteme === "calendly" && isClient ? (
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-ink v-nav-cta">
              {mt ? mt.talk : "On en parle ?"}
            </a>
          ) : (
            <Link href="/rendez-vous" className="btn-ink v-nav-cta">{mt ? mt.talk : "On en parle ?"}</Link>
          )}
        </div>
      </nav>

      {/* ── Mobile : FAB + bottom sheet ────────────────────────── */}
      <div className="v-mobile" aria-hidden={!isClient}>

        {/* Backdrop */}
        <div
          className={`v-mob-backdrop${menuOpen ? " --in" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Bottom sheet */}
        <div
          className={`v-sheet${menuOpen ? " --open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <div className="v-sheet-handle" aria-hidden="true" />

          <ul className="v-sheet-links" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`v-sheet-link${pathname === item.link ? " --active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  {pathname === item.link && (
                    <span className="v-sheet-dot" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="https://app.uvibes.fr/welcome"
            className="v-sheet-connexion"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            {mt ? mt.loginMobile : "Connexion à la plateforme"}
          </a>
          {rdvSysteme === "calendly" && isClient ? (
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="v-sheet-cta" onClick={() => setMenuOpen(false)}>
              {mt ? mt.talk : "On en parle ?"}
            </a>
          ) : (
            <Link href="/rendez-vous" className="v-sheet-cta" onClick={() => setMenuOpen(false)}>{mt ? mt.talk : "On en parle ?"}</Link>
          )}
          <div className="v-sheet-lang-list">
            {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
              <Link
                key={l}
                href={getLocaleSwitchHref(pathname, locale, l)}
                className="v-sheet-lang"
                onClick={() => setMenuOpen(false)}
              >
                {LOCALE_NAME[l]}
              </Link>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          className={`v-fab${menuOpen ? " --open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          {/* Logo VI (fermé) */}
          <Image
            src="/images/Logo VI blanc.png"
            alt="Menu"
            width={28}
            height={28}
            className="v-fab-icon v-fab-icon--grid"
            style={{ height: "24px", width: "auto" }}
          />
          {/* Icône X (ouvert) */}
          <svg className="v-fab-icon v-fab-icon--close" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
