"use client";

import FetchTestimony from "@/services/testimony/testimony";
import "@/styles/testimony/testimony.css";
import TestimonyCard from "../cards/testimonyCard";
// Ajout des imports Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimony() {
  const testimonies = FetchTestimony();
  return (
    <section className="testimony-section">
    <div className="testimony">
      <h2 className="title-h2-orange" style={{ textAlign: "center" }}>Ils avancent avec nous</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{ width: "100%" }}
        loop={false}
        className="testimony-container"
      >
        {testimonies.map((testimony) => (
          <SwiperSlide key={testimony.id}>
            <TestimonyCard {...testimony} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
  );
}
