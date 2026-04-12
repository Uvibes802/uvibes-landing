"use client";
import usePricing from "@/services/pricing/usePricing";
import { Check, X } from "lucide-react";
import "../../styles/features/PricingMobile.css";
import { features, plans } from "./PricingData";

// Swiper imports
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function PricingMobile() {
  const pricingData = usePricing();

  const mergedPlans = plans.map((plan) => {
    const dynamicPrice = pricingData.find(
      (p) => p.planName === plan.name.toUpperCase()
    )?.price;
    return { ...plan, price: dynamicPrice || "-" };
  });

  return (
    <div className="pricing-mobile-container">
      <h2 className="title-h2-white" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Nos offres vibes
      </h2>
      <p className="pricing-subtitle-mobile">(offres indicatives jusqu’à 1 000 utilisateurs)</p>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1.15}
        centeredSlides={true}
        initialSlide={1}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="pricing-swiper"
      >
        {mergedPlans.map((plan, planIndex) => (
          <SwiperSlide key={planIndex}>
            <div className="pricing-card" style={{ borderColor: plan.color }}>
              <div className="pricing-card-header" style={{ backgroundColor: plan.color }}>
                <h3 className="pricing-card-title">{plan.name}</h3>
              </div>
              <div className="pricing-card-body">
                <p className="pricing-card-description">{plan.description}</p>
                <p className="pricing-card-price">{plan.price}</p>
                <p className="pricing-card-price-note">(Prix hors taxes)</p>
                
                <ul className="pricing-card-features">
                  {features.slice(2).map((feature, featureIndex) => {
                     const isAvailable = plan.values[featureIndex];
                     return (
                        <li key={featureIndex} className={`pricing-feature-item ${isAvailable ? 'available' : 'unavailable'}`}>
                            <span className="feature-icon">
                                {isAvailable ? <Check size={20} className="icon-check" /> : <X size={20} className="icon-cross" />}
                            </span>
                            <span className="feature-text">{feature.name}</span>
                        </li>
                     );
                  })}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
