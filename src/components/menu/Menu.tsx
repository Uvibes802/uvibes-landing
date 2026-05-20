"use client";
import Resize from "@/services/resize/resize";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import { Items } from "../../data/menu/MenuData";
import "../../styles/menu/Menu.css";

const navItems = Items.filter((item) => item.id !== 6 && item.id !== 7);

export default function Menu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isDesktop } = Resize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`site-navbar${scrolled ? " site-navbar--scrolled" : ""}`}
        aria-label="Navigation principale"
      >
        <Link href="/" className="navbar-logo" aria-label="Accueil Uvibes">
          <Image
            src={scrolled || !isDesktop ? "/images/Logo UVIBES.png" : "/images/Logo VI blanc.png"}
            alt="Uvibes"
            width={120}
            height={40}
            style={{ height: "auto", width: "auto", maxHeight: "36px" }}
            priority
          />
        </Link>

        {isDesktop && (
          <div className="navbar-links">
            {navItems.map((item) => (
              <Link key={item.id} href={item.link} className="navbar-link">
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {isDesktop && (
          <div className="navbar-actions">
            <button className="navbar-btn-contact" onClick={scrollToContact}>
              Nous contacter
            </button>
            {isClient ? (
              <PopupButton
                url="https://calendly.com/uvibescommunication/30min"
                rootElement={document.body}
                text="Prendre RDV"
                className="navbar-btn-rdv"
              />
            ) : (
              <span className="navbar-btn-rdv">Prendre RDV</span>
            )}
            <Link
              href="https://app.uvibes.fr/welcome"
              className="navbar-btn-connexion"
              aria-label="Se connecter à l'application Uvibes"
            >
              <Image
                src="/images/icone-connexion.svg"
                width={20}
                height={20}
                alt=""
              />
              <span>Se connecter</span>
            </Link>
          </div>
        )}

        {!isDesktop && (
          <button
            className="navbar-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <X size={24} color="#fd6e00" />
            ) : (
              <AlignJustify size={24} color={scrolled ? "#fd6e00" : "#fff"} />
            )}
          </button>
        )}
      </nav>

      {!isDesktop && isOpen && (
        <>
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu navigation">
          <nav className="mobile-drawer-links">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="mobile-drawer-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mobile-drawer-divider" />
            <button className="mobile-drawer-contact" onClick={scrollToContact}>
              Nous contacter
            </button>
            {isClient ? (
              <PopupButton
                url="https://calendly.com/uvibescommunication/30min"
                rootElement={document.body}
                text="Prendre RDV"
                className="mobile-drawer-rdv"
              />
            ) : null}
            <Link
              href="https://app.uvibes.fr/welcome"
              className="mobile-drawer-connexion"
              onClick={() => setIsOpen(false)}
            >
              Se connecter →
            </Link>
          </nav>
        </div>
        </>
      )}
    </>
  );
}
