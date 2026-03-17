import { BookOpenText, MessagesSquare, SmilePlus } from "lucide-react";
import "../../styles/section/functSection.css";
import FunctCards from "../cards/functCards";
import Resize from "@/services/resize/resize";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FunctSection() {
  const { isMobile } = Resize();

  const cards = [
    {
      icone: <SmilePlus size="110%" style={{ color: "#d90a5c" }} />,
      title: "Echanges",
      subtitle: "Partager des témoignages positifs sur un nombre infini de sujets",
    },
    {
      icone: <MessagesSquare size="100%" style={{ color: "#d90a5c" }} />,
      title: "Participation",
      subtitle: "Recueillir régulièrement les avis de son collectif",
    },
    {
      icone: <BookOpenText size="100%" style={{ color: "#d90a5c" }} />,
      title: "Ressources",
      subtitle: "Accéder à une médiathèque de savoirs sur-mesure",
    },
  ];

  return (
    <section className="container-orange">
      <div className="funct-section">
        <h2 className="title-h2">Découvrir des points de vue inattendus</h2>
        <div className="funct-container">
          {isMobile ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="funct-swiper"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <FunctCards {...card} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            cards.map((card, index) => (
              <FunctCards key={index} {...card} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
