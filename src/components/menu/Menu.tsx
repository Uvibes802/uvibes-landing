"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PopupButton } from "react-calendly";
import { Items } from "../../data/menu/MenuData";
import "../../styles/menu/Menu.css";

const navItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

export default function Menu() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0, instant: true });
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isFirstPosition = useRef(true);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("uvibes-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const activeItem = navItems.find((item) => item.link === pathname);
  const indicatorColor = activeItem?.color ?? "var(--mainColor)";

  const updateIndicator = useCallback(() => {
    const activeIndex = navItems.findIndex((item) => item.link === pathname);
    const el = activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (el) {
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
        instant: isFirstPosition.current,
      });
      isFirstPosition.current = false;
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0, instant: false }));
    }
  }, [pathname]);

  // useLayoutEffect = synchrone après mutations DOM → refs garanties peuplées
  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
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

      {/* Logo — VI mark sur mobile (pilule bas), logo complet sur desktop (navbar) */}
      <Link href="/" className="bottom-menu-logo" aria-label="Retour à l'accueil Uvibes">
        <Image
          src="/images/Logo VI blanc.png"
          alt="Uvibes"
          width={26}
          height={26}
          className="menu-logo-mark"
          style={{ height: "26px", width: "auto", objectFit: "contain" }}
        />
        <Image
          src="/images/Logo UVIBES.png"
          alt="Uvibes"
          width={160}
          height={40}
          className="menu-logo-full"
          style={{ height: "36px", width: "auto", objectFit: "contain" }}
        />
      </Link>

      {/* Pilule de navigation centrale */}
      <nav className="bottom-menu-nav" aria-label="Navigation principale">
        <div
          className="bottom-menu-indicator"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.opacity,
            background: indicatorColor,
            transition: indicator.instant
              ? "opacity 0.18s ease"
              : "left 0.3s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.18s ease, background 0.3s ease",
          }}
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
