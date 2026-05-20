"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PopupButton } from "react-calendly";
import { Items } from "../../data/menu/MenuData";
import "../../styles/menu/Menu.css";

const navItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

export default function Menu() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("uvibes-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const updateIndicator = useCallback(() => {
    const activeIndex = navItems.findIndex((item) => item.link === pathname);
    const el = activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("uvibes-theme", next ? "dark" : "light");
  };

  return (
    <div className="bottom-menu-wrapper">

      {/* Carré gauche — logo mark Uvibes */}
      <Link href="/" className="bottom-menu-logo" aria-label="Retour à l'accueil Uvibes">
        <Image
          src="/images/Logo VI blanc.png"
          alt="Uvibes"
          width={26}
          height={26}
          style={{ height: "26px", width: "auto", objectFit: "contain" }}
        />
      </Link>

      {/* Pilule de navigation centrale */}
      <nav className="bottom-menu-nav" aria-label="Navigation principale">
        <div
          className="bottom-menu-indicator"
          style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
        />
        {navItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`bottom-menu-item${pathname === item.link ? " --active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
        <div className="bottom-menu-divider" />
        {isClient ? (
          <PopupButton
            url="https://calendly.com/uvibescommunication/30min"
            rootElement={document.body}
            text="Prendre RDV"
            className="bottom-menu-rdv"
          />
        ) : null}
      </nav>

      {/* Carré droit — dark mode toggle */}
      <button
        className="bottom-menu-theme"
        onClick={toggleDark}
        aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>

    </div>
  );
}
