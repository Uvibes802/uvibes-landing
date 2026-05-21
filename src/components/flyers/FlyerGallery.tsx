"use client";

import Image from "next/image";
import { useState } from "react";
import { flyerCategories, flyers, type FlyerCategory } from "@/data/flyers/flyersData";
import "@/styles/flyers/flyerGallery.css";

export default function FlyerGallery() {
  const [activeCategory, setActiveCategory] = useState<FlyerCategory | "Tous">("Tous");

  const filtered =
    activeCategory === "Tous"
      ? flyers
      : flyers.filter((f) => f.category === activeCategory);

  return (
    <section className="flyer-gallery-section">
      <div className="flyer-gallery-header">
        <h2 className="title-h2-orange">Uvibes, c&apos;est fait pour vous</h2>
        <p className="flyer-gallery-subtitle">
          Découvrez comment Uvibes s&apos;adapte à votre contexte
        </p>
      </div>

      <div className="flyer-filters">
        <button
          className={`flyer-filter-btn${activeCategory === "Tous" ? " --active" : ""}`}
          onClick={() => setActiveCategory("Tous")}
        >
          Tous
        </button>
        {flyerCategories.map((cat) => (
          <button
            key={cat}
            className={`flyer-filter-btn${activeCategory === cat ? " --active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flyer-scroll-container">
        <div className="flyer-track">
          {filtered.map((flyer) => (
            <div key={flyer.id} className="flyer-card">
              <Image
                src={flyer.src}
                alt={flyer.alt}
                width={340}
                height={480}
                className="flyer-card-image"
              />
              <span className="flyer-card-label">{flyer.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
