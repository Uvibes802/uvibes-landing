"use client";

import { useEffect, useState } from "react";
import "@/styles/solution/anchorNav.css";

const linksFr = [
  { href: "#comment", label: "Processus", index: "01" },
  { href: "#themes", label: "Thématiques", index: "02" },
  { href: "#strategie", label: "Stratégie", index: "03" },
  { href: "#soft-skills", label: "Soft skills", index: "04" },
  { href: "#fonctionnalites", label: "Résultats", index: "05" },
];

const linksEn = [
  { href: "#comment", label: "Process", index: "01" },
  { href: "#themes", label: "Topics", index: "02" },
  { href: "#strategie", label: "Strategy", index: "03" },
  { href: "#soft-skills", label: "Soft skills", index: "04" },
  { href: "#fonctionnalites", label: "Results", index: "05" },
];

const sectionIds = linksFr.map((l) => l.href.slice(1));

export default function SolutionAnchorNav({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const links = locale === "en" ? linksEn : linksFr;
  const [pinned, setPinned] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Épinglage de la barre au scroll
  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className={`anchor-nav${pinned ? " anchor-nav--pinned" : ""}`}>
      <div className="anchor-nav__row">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`anchor-nav__link${activeId === link.href.slice(1) ? " anchor-nav__link--active" : ""}`}
            onClick={(e) => handleClick(e, link.href)}
          >
            <span className="anchor-nav__index v-mono">{link.index}</span>
            <span className="anchor-nav__label">{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
