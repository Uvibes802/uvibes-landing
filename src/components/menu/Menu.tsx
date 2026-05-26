"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PopupButton } from "react-calendly";
import { Items } from "../../data/menu/MenuData";
import "../../styles/menu/Menu.css";

const navItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

export default function Menu() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile au changement de route
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Ferme le menu si clic en dehors
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <nav
      ref={menuRef}
      className={`v-nav${scrolled ? " --scrolled" : ""}${menuOpen ? " --open" : ""}`}
      aria-label="Navigation principale"
    >
      {/* Logo */}
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

      {/* Liens centraux — desktop */}
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

      {/* CTA + hamburger — droite */}
      <div className="v-nav-right">
        {isClient && (
          <PopupButton
            url="https://calendly.com/uvibescommunication/30min"
            rootElement={document.body}
            text="Essayer gratuitement"
            className="btn-ink v-nav-cta"
          />
        )}
        <button
          className="v-nav-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menu mobile déroulant */}
      <div className="v-nav-mobile-panel" aria-hidden={!menuOpen}>
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`v-nav-mobile-link${pathname === item.link ? " --active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {isClient && (
            <li>
              <PopupButton
                url="https://calendly.com/uvibescommunication/30min"
                rootElement={document.body}
                text="Essayer gratuitement"
                className="btn-brand v-nav-mobile-cta"
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
