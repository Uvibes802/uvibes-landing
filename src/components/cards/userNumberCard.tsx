"use client";

import FetchCitation from "@/services/citation/citation";
import { useEffect, useRef, useState } from "react";
import "../../styles/cards/userNumberCard.css";

function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started || target === 0) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic — démarre vite, ralentit à la fin
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return value;
}

export default function UserNumberCard() {
  const { userNumber, userNumberTitle } = FetchCitation();
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Extraire la valeur numérique — regex qui s'arrête sur le dernier chiffre (pas les espaces suivants)
  const numericMatch = userNumber?.match(/\d(?:[\s\d]*\d)?|\d/);
  const targetNumber = numericMatch
    ? parseInt(numericMatch[0].replace(/\s/g, ""), 10)
    : 0;

  // Reconstruire la string avec le compteur animé
  const matchIndex = numericMatch && userNumber ? userNumber.search(/\d/) : -1;
  const prefix = matchIndex >= 0 ? userNumber!.slice(0, matchIndex) : "";
  const suffix = numericMatch && userNumber
    ? userNumber.slice(matchIndex + numericMatch[0].length)
    : "";

  const animatedValue = useCountUp(targetNumber, 2200, visible);

  // Formater le nombre avec espace comme séparateur de milliers (ex: 3 500)
  const formattedValue = animatedValue.toLocaleString("fr-FR");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayNumber = targetNumber > 0
    ? `${prefix}${formattedValue}${suffix}`
    : userNumber;

  return (
    <div className="user-number-wrapper" ref={wrapperRef}>
      <article className="user-number-card-container">
        <div className="user-number-card">
          <h2>{userNumberTitle}</h2>
          <p className="user-number">{displayNumber}</p>
        </div>
      </article>
    </div>
  );
}
