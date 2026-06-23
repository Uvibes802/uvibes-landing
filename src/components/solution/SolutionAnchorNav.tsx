"use client";

import { useEffect, useState } from "react";
import "@/styles/solution/anchorNav.css";

const linksFr = [
  { href: "#comment", label: "Processus", index: "01" },
  { href: "#themes", label: "Thématiques", index: "02" },
  { href: "#strategie", label: "Stratégie", index: "03" },
  { href: "#soft-skills", label: "Innovation", index: "04" },
  { href: "#fonctionnalites", label: "Résultats", index: "05" },
];

const linksEn = [
  { href: "#comment", label: "Process", index: "01" },
  { href: "#themes", label: "Topics", index: "02" },
  { href: "#strategie", label: "Strategy", index: "03" },
  { href: "#soft-skills", label: "Innovation", index: "04" },
  { href: "#fonctionnalites", label: "Results", index: "05" },
];

const linksEs = [
  { href: "#comment", label: "Proceso", index: "01" },
  { href: "#themes", label: "Temáticas", index: "02" },
  { href: "#strategie", label: "Estrategia", index: "03" },
  { href: "#soft-skills", label: "Innovación", index: "04" },
  { href: "#fonctionnalites", label: "Resultados", index: "05" },
];

const linksDe = [
  { href: "#comment", label: "Prozess", index: "01" },
  { href: "#themes", label: "Themen", index: "02" },
  { href: "#strategie", label: "Strategie", index: "03" },
  { href: "#soft-skills", label: "Innovation", index: "04" },
  { href: "#fonctionnalites", label: "Ergebnisse", index: "05" },
];

const linksIt = [
  { href: "#comment", label: "Processo", index: "01" },
  { href: "#themes", label: "Temi", index: "02" },
  { href: "#strategie", label: "Strategia", index: "03" },
  { href: "#soft-skills", label: "Innovazione", index: "04" },
  { href: "#fonctionnalites", label: "Risultati", index: "05" },
];

const linksPt = [
  { href: "#comment", label: "Processo", index: "01" },
  { href: "#themes", label: "Temas", index: "02" },
  { href: "#strategie", label: "Estratégia", index: "03" },
  { href: "#soft-skills", label: "Inovação", index: "04" },
  { href: "#fonctionnalites", label: "Resultados", index: "05" },
];

const linksRu = [
  { href: "#comment", label: "Процесс", index: "01" },
  { href: "#themes", label: "Темы", index: "02" },
  { href: "#strategie", label: "Стратегия", index: "03" },
  { href: "#soft-skills", label: "Инновации", index: "04" },
  { href: "#fonctionnalites", label: "Результаты", index: "05" },
];

const linksZh = [
  { href: "#comment", label: "流程", index: "01" },
  { href: "#themes", label: "主题", index: "02" },
  { href: "#strategie", label: "战略", index: "03" },
  { href: "#soft-skills", label: "创新", index: "04" },
  { href: "#fonctionnalites", label: "成果", index: "05" },
];

const linksJa = [
  { href: "#comment", label: "プロセス", index: "01" },
  { href: "#themes", label: "テーマ", index: "02" },
  { href: "#strategie", label: "戦略", index: "03" },
  { href: "#soft-skills", label: "イノベーション", index: "04" },
  { href: "#fonctionnalites", label: "成果", index: "05" },
];

const linksHi = [
  { href: "#comment", label: "प्रक्रिया", index: "01" },
  { href: "#themes", label: "विषय", index: "02" },
  { href: "#strategie", label: "रणनीति", index: "03" },
  { href: "#soft-skills", label: "नवाचार", index: "04" },
  { href: "#fonctionnalites", label: "परिणाम", index: "05" },
];

const linksAr = [
  { href: "#comment", label: "العملية", index: "01" },
  { href: "#themes", label: "المواضيع", index: "02" },
  { href: "#strategie", label: "الاستراتيجية", index: "03" },
  { href: "#soft-skills", label: "الابتكار", index: "04" },
  { href: "#fonctionnalites", label: "النتائج", index: "05" },
];

const sectionIds = linksFr.map((l) => l.href.slice(1));
const LINKS_BY_LOCALE: Record<string, typeof linksFr> = {
  en: linksEn, es: linksEs, de: linksDe, it: linksIt, pt: linksPt,
  ru: linksRu, zh: linksZh, ja: linksJa, hi: linksHi, ar: linksAr,
};

export default function SolutionAnchorNav({ locale = "fr" }: { locale?: string }) {
  const links = LINKS_BY_LOCALE[locale] ?? linksFr;
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
