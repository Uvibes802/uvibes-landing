import { BookOpenText, MessagesSquare, SmilePlus } from "lucide-react";
import "../../styles/section/functSection.css";
import FunctCards from "../cards/functCards";

export default function FunctSection() {
  return (
    <section className="container-orange">
    <div className="funct-section">
      <h2 className="title-h2">Découvrir des points de vue inattendus</h2>
      <div className="funct-container">
        <FunctCards
          icone={
            <SmilePlus size="110%" style={{ color: "#d90a5c" }} />
          }
          title={"Echanges"}
          subtitle={
            "Partager des témoignages positifs sur un nombre infini de sujets"
          }
        />
        <FunctCards
          icone={
            <MessagesSquare size="100%" style={{ color: "#d90a5c" }} />
          }
          title={"Participation"}
          subtitle={"Recueillir régulièrement les avis de son collectif"}
        />
        <FunctCards
          icone={
            <BookOpenText size="100%" style={{ color: "#d90a5c" }} />
          }
          title={"Ressources"}
          subtitle={"Accéder à une médiathèque de savoirs sur-mesure "}
        />
      </div>
    </div>
    </section>
  );
}
