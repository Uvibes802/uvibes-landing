"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/features/offreEvenementielle.css";

interface Point { label: string; detail: string; bonus?: boolean }

// Valeurs par défaut — surchargées par les réglages éditables en admin (clés oe-*).
const DEFAULTS = {
  titre: "Vibes Découverte",
  prixAccent: "à 480 €",
  subtitle: "Le moyen le plus simple de tester Uvibes : un mois complet pour mobiliser votre collectif et mesurer l'impact, avant tout engagement annuel.",
  prix: "480 €",
  prixNote: "sans engagement annuel",
  points: [
    { label: "Jusqu'à 500 vibes", detail: "expériences interactives pour mobiliser votre collectif" },
    { label: "1 session thématique", detail: "sur le sujet de votre choix, personnalisée pour votre public" },
    { label: "3 campagnes de sondages", detail: "3 sondages personnalisés chacune, pour recueillir ce qui compte" },
    { label: "1 infographie clé en main", detail: "tout ce qu'il faut pour faciliter l'inscription de vos membres" },
    { label: "2 indicateurs d'usage", detail: "pour suivre l'engagement de votre communauté", bonus: true },
  ] as Point[],
};

// Sous-titre sur une seule ligne (wrap naturel). On colle juste
// "avant tout engagement annuel" avec des espaces insécables.
function subtitleOneLine(text: string): string {
  const glued = text.replace(/avant tout engagement annuel/gi, (m) => m.replace(/ /g, "\u00A0"));
  return glued;
}

// "label | détail | bonus" (1 par ligne) → tableau de points
function parsePoints(raw: string): Point[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
    const [label = "", detail = "", flag = ""] = line.split("|").map((s) => s.trim());
    return { label, detail, bonus: flag.toLowerCase() === "bonus" };
  });
}

export default function OffreEvenementielle() {
  const [ref, vis] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.08 });
  const [open, setOpen] = useState(false);
  const [c, setC] = useState(DEFAULTS);
  // Compteur animé du prix (count-up quand la carte s'ouvre)
  const [animPrice, setAnimPrice] = useState(0);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        setC({
          titre: s["oe-titre"] || DEFAULTS.titre,
          prixAccent: s["oe-prix-accent"] || DEFAULTS.prixAccent,
          subtitle: s["oe-subtitle"] || DEFAULTS.subtitle,
          prix: s["oe-prix"] || DEFAULTS.prix,
          prixNote: s["oe-prix-note"] || DEFAULTS.prixNote,
          points: s["oe-points"] ? parsePoints(s["oe-points"]) : DEFAULTS.points,
        });
      })
      .catch(() => {});
  }, []);

  // Count-up du chiffre à l'ouverture (0 → prix), easing cubic-out
  useEffect(() => {
    if (!open) { setAnimPrice(0); return; }
    const target = parseInt((c.prix.match(/\d[\d\s]*/)?.[0] ?? "0").replace(/\s/g, ""), 10);
    if (!target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setAnimPrice(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, c.prix]);

  // Suffixe du prix (ex. " €") conservé depuis la valeur CMS
  const prixSuffix = c.prix.replace(/\d[\d\s]*/, "").trim();

  return (
    <div
      className={`oe-section oe-compact${vis ? " oe-vis" : ""}${open ? " oe-open" : ""}`}
      ref={ref}
      id="offre-evenementielle"
    >
      {/* Fond déco */}
      <div className="oe-bg-stripe" aria-hidden="true" />

      <div className="oe-inner">
        {/* Barre compacte cliquable — le prix accroche dès l'état replié */}
        <button className="oe-bar" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span className="oe-eyebrow-pill">Offre découverte · 30 jours</span>
          <span className="oe-bar-title v-prompt">
            {c.titre}{" "}
            <span className="oe-title-accent v-serif">{c.prixAccent}</span>
          </span>
          <span className="oe-bar-arrow" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </button>

        {/* Contenu repliable */}
        <div className="oe-reveal">
          <div className="oe-reveal-inner">
            <p className="oe-subtitle">{subtitleOneLine(c.subtitle)}</p>

            {/* Prix — chiffre animé (count-up) */}
            <div className="oe-price">
              <span className="oe-price-value v-prompt">
                {animPrice.toLocaleString("fr-FR")}{prixSuffix ? ` ${prixSuffix}` : ""}
              </span>
              <span className="oe-price-note">{c.prixNote}</span>
            </div>

            {/* Ce qui est inclus — points simples (apparition échelonnée) */}
            <ul className="oe-points">
              {c.points.map((item, i) => (
                <li
                  key={item.label}
                  className={`oe-point${item.bonus ? " oe-point--bonus" : ""}`}
                  style={{ "--oe-i": i } as React.CSSProperties}
                >
                  <span className="oe-point-check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.8} />
                  </span>
                  <span className="oe-point-text">
                    <strong>{item.label}</strong>
                    {item.bonus && <span className="oe-point-bonus-tag">bonus</span>}
                    <span className="oe-point-detail"> — {item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="oe-cta-block">
              <div className="oe-ctas">
                <Link href="/devis" className="btn-brand oe-cta-primary">
                  Faire un devis →
                </Link>
                <Link href="/#contact" className="oe-cta-ghost">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>{/* oe-reveal-inner */}
        </div>{/* oe-reveal */}
      </div>
    </div>
  );
}
