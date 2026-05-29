"use client";
import usePricing from "@/services/pricing/usePricing";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";
import PricingMobile from "./PricingMobile";

const booleanFeatures = features.slice(2);

export default function PricingTable() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const pricingData = usePricing();

  const mergedPlans = plans.map((plan) => {
    const dynamicPrice = pricingData.find(
      (p) => p.planName === plan.name.toUpperCase()
    )?.price;
    return { ...plan, price: dynamicPrice || "Sur devis" };
  });

  useEffect(() => {
    setRootElement(document.getElementById("root") || document.body);
  }, []);

  return (
    <div className="pricing-wrapper">
      {/* Mobile — composant existant inchangé */}
      <div className="pricing-mobile-only">
        <PricingMobile />
      </div>

      {/* Desktop — 3 cartes */}
      <div className="pricing-desktop-only">
        <h2 className="pricing-cards-title">Nos offres Vibes</h2>
        <p className="pricing-cards-note">Offre indicative jusqu&apos;à 1 000 utilisateurs</p>

        <div className="pricing-cards-grid">
          {mergedPlans.map((plan, planIndex) => {
            const isHighlighted = planIndex === 2;
            return (
              <div
                key={plan.name}
                className={`pricing-card${isHighlighted ? " pricing-card--highlighted" : ""}`}
                style={{ "--plan-color": plan.color } as React.CSSProperties}
              >
                {isHighlighted && (
                  <span className="pricing-card-badge">Complet</span>
                )}
                <div className="pricing-card-header">
                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <p className="pricing-card-desc">{plan.description}</p>
                </div>

                <div className="pricing-card-price">
                  <span className="pricing-card-price-value">{plan.price}</span>
                  <span className="pricing-card-price-label">HT / an</span>
                </div>

                <ul className="pricing-card-features">
                  {booleanFeatures.map((feature, i) => (
                    <li
                      key={i}
                      className={`pricing-card-feature${plan.values[i] ? "" : " pricing-card-feature--off"}`}
                    >
                      {plan.values[i]
                        ? <Check size={14} className="pricing-icon-check" />
                        : <X size={14} className="pricing-icon-cross" />
                      }
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pricing-cards-cta">
          <p className="pricing-cards-cta-text">
            Vous avez des besoins spécifiques ou êtes une structure de moins de 250 personnes ?
          </p>
          <div className="pricing-cta-buttons">
            {rootElement && (
              <PopupButton
                url="https://calendly.com/uvibescommunication/30min"
                rootElement={rootElement}
                text="Prendre RDV"
                className="btn-cta secondary"
              />
            )}
            <Link href="/#contact" className="btn-cta primary">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
