"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Items } from "../../data/menu/MenuData";
import "../../styles/menu/Menu.css";

const navItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

export default function Menu() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [rdvSysteme, setRdvSysteme] = useState<"custom" | "calendly">("custom");
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/uvibescommunication/30min");
  const navRef = useRef<HTMLElement>(null);

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
          <a
            href="https://app.uvibes.fr/welcome"
            className="v-nav-connexion"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Se connecter à la plateforme Uvibes"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            Connexion
          </a>
          {rdvSysteme === "calendly" && isClient ? (
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-ink v-nav-cta">
              On en parle ?
            </a>
          ) : (
            <Link href="/rendez-vous" className="btn-ink v-nav-cta">On en parle ?</Link>
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
            Connexion à la plateforme
          </a>
          {rdvSysteme === "calendly" && isClient ? (
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="v-sheet-cta" onClick={() => setMenuOpen(false)}>
              On en parle ?
            </a>
          ) : (
            <Link href="/rendez-vous" className="v-sheet-cta" onClick={() => setMenuOpen(false)}>On en parle ?</Link>
          )}
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
