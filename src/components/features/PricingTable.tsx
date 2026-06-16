"use client";
import usePricing from "@/services/pricing/usePricing";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";
import PricingMobile from "./PricingMobile";

export default function PricingTable() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const pricingData = usePricing();

  const mergedPlans = plans.map((plan) => {
    const dynamicPrice = pricingData.find(
      (p) => p.planName === plan.name.toUpperCase()
    )?.price;
    return { ...plan, price: dynamicPrice || "-" }; 
  });

  useEffect(() => {
    setRootElement(document.getElementById("root") || document.body);
  }, []);

  const renderFeatureName = (name: string) => {
    const parts = name.split(/(\(.*?\))/g);
    return parts.map((part, i) =>
      part.startsWith("(") && part.endsWith(")") ? (
        <span key={i} className="non-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="pricing-container">
      <PricingMobile />
      <h2 className="pricing-title-desktop">Nos offres vibes</h2>
      <div className="pricing-top-section">
        <div className="cta-buttons">
          {rootElement && (
            <PopupButton
              url="https://calendly.com/uvibescommunication/30min"
              rootElement={rootElement}
              text="Prendre RDV"
              className="btn-cta secondary"
            />
          )}
          <Link href="/#contact" className="btn-cta primary">
            NOUS CONTACTER
          </Link>
        </div>
      </div>
      <div className="pricing-table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th className="feature-header">
                <p className="blue-note">
                  Offre indicative jusqu&apos;à <br />
                  <span>1 000 utilisateurs</span>
                </p>
              </th>
              {mergedPlans.map((plan, index) => (
                <th
                  key={index}
                  className="plan-header"
                  style={{ color: plan.color }}
                >
                  <div className="plan-title-container">
                    <span className="plan-name">{plan.name}</span>
                    <p className="plan-description-header">{plan.description}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Prix Row */}
            <tr className="row-price">
              <td className="feature-name">
                Prix hors taxes
              </td>
              {mergedPlans.map((plan, index) => (
                <td key={index} className="plan-price">
                  {plan.price}
                </td>
              ))}
            </tr>
            {/* Boolean Features */}
            {features.slice(2).map((feature, featureIndex) => (
              <tr
                key={featureIndex}
                className={featureIndex % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="feature-name">{renderFeatureName(feature.name)}</td>
                {mergedPlans.map((plan, planIndex) => (
                  <td key={planIndex} className="plan-value">
                    {plan.values[featureIndex] ? (
                      <Check className="icon-check" size={24} />
                    ) : (
                      <X className="icon-cross" size={24} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pricing-cta-banner">
        <div className="cta-content">
          <h3 style={{textAlign: "center"}}>Vous avez des besoins spécifiques ou êtes une structure de moins de 250 personnes ? Parlons-en ensemble.</h3>
          <div className="cta-buttons">
            {rootElement && (
                <PopupButton
                    url="https://calendly.com/uvibescommunication/30min"
                    rootElement={rootElement}
                    text="Prendre RDV"
                    className="btn-cta secondary"
                />
            )}
            <Link href="/#contact" className="btn-cta primary">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
