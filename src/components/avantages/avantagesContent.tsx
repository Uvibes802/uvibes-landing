import {
  Brain,
  Building,
  CircleGauge,
  DotIcon,
  Handshake,
  Home,
  School,
  Smile,
  UsersIcon
} from "lucide-react";
import "../../styles/avantages/avantagesContent.css";
import { DropdownButton } from "../button/DropdownButton";
import AvantagesCard from "../cards/avantagesCard";
import LastAvantagesCard from "../cards/LastAvantagesCard";
export default function AvantagesContent() {
  return (
    <div className="avantage-button-container">
      <DropdownButton
        title="Entreprise"
        subtitle="Dans le monde du travail, Uvibes stimule le bien-être individuel pour renforcer la performance collective"
        icon={<Building size={60} />}
      >
        <AvantagesCard
          icone={
            <CircleGauge style={{ color: "var(--secondaryColor)" }} size={50} />
          }
          title="Performance : améliorer sa prise de décision et renforcer l’engagement"
          stats="42% des employés admettent ne faire que le strict minimum (Etude 2023 Observatoire 
						de la société et de la consommation)."
          content="Uvibes stimule la réflexion, offre une meilleure connaissance de son collectif et suscite l’adhésion collective"
        />
        <AvantagesCard
          icone={<UsersIcon size={50} style={{ color: "var(--mainColor)" }} />}
          title="Lien d’appartenance : créer une culture commune"
          stats="Pour 62 % des dirigeants et salariés, la culture d’entreprise est le principal frein à la transformation (Rapport The digital culture challenge)."
          content="Uvibes renforce le lien affectif qui relie l’entreprise à ses équipes"
        />
        <LastAvantagesCard
          icone={
            <Handshake size={50} style={{ color: "var(--secondaryColor)" }} />
          }
          title="RSE : augmenter le bien-être individuel et collectif"
          stats={
            <ul>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Satisfaire le besoin relationnel de ses collaborateurs
                </li>
              </div>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Alléger les managers de la gestion émotionnelle de leurs
                  équipes
                </li>
              </div>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Favoriser une intégration rapide et harmonieuse des nouveaux
                  arrivants
                </li>
              </div>
            </ul>
          }
        />
      </DropdownButton>
      <DropdownButton
        title="Etablissement d'enseignement"
        subtitle="Dans la sphère éducative, Uvibes améliore la sociabilité des apprenants "
        icon={<School size={80} />}
      >
        <AvantagesCard
          icone={
            <UsersIcon style={{ color: "var(--secondaryColor)" }} size={50} />
          }
          title="Santé mentale : soutenir le bien-être des jeunes"
          stats="41% des étudiants présentent des symptômes dépressifs contre 26% avant le COVID (Etude Université Bordeaux, 2024)."
          content="Uvibes encourage des échanges bienveillants entre élèves de tous horizons. 
          Il élimine les facteurs de cyberharcèlement et de dévalorisation de soi."
        />
        <AvantagesCard
          icone={<Brain size={50} style={{ color: "var(--mainColor)" }} />}
          title="Soft skills : développer les savoir-agir relationnels"
          stats="62 % des managers sont prêts à recruter un  collaborateur sur la base de ses soft skills, même si ses compétences  techniques ne correspondent pas entièrement au poste"
          content="Uvibes est le premier service qui offre un espace d'entraînement continu et de valorisation des compétences interpersonnelles."
        />
        <LastAvantagesCard
          icone={
            <Handshake size={50} style={{ color: "var(--secondaryColor)" }} />
          }
          title="Appartenance : renforcer le lien avec ses apprenants"
          stats={
            <ul>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Booster leur participation et disposer d’informations inédites
                </li>
              </div>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Répondre à leur envie d’échanges gamifiés et bienveillants 
                </li>
              </div>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Faire vivre son réseau alumni
                </li>
              </div>
              <div className="last-avantages-card-content">
                <DotIcon size={24} style={{ color: "var(--secondaryColor)" }} />
                <li className="last-avantages-list">
                  Initier des mentorats enrichissants
                </li>
              </div>
            </ul>
          }
        />
      </DropdownButton>
      <DropdownButton
        title="Collectif"
        subtitle="Dans la sphère du prendre soin, Uvibes est une nouvelle respiration "
        icon={<Handshake size={80} />}
      >
        <AvantagesCard
          icone={
            <UsersIcon style={{ color: "var(--secondaryColor)" }} size={50} />
          }
          title="Lien social : rompre l’isolement et stimuler les capacités cognitives"
          stats="Entretenir une vie sociale dynamique réduit de 38% le risque de démence (Rush University, 2025)"
          content="Uvibes nous redonne l’envie et la facilité de discuter"
        />
        <AvantagesCard
          icone={<Smile size={50} style={{ color: "var(--mainColor)" }} />}
          title="Epanouissement : révéler chacun et cultiver le vivre-ensemble"
          stats="Parler à des inconnus augmente l’estime de soi et transforme notre perception de l’autre (Etude 2014 Epley et Shroeder)"
          content="En mettant en avant l’unicité de chacun, Uvibes renforce la confiance en soi et en son entourage"
        />
        <AvantagesCard
          icone={<Home style={{ color: "var(--secondaryColor)" }} size={50} />}
          title="Transmission : créer des communautés d’entraide"
          stats="Partager une expérience commune, c’est mieux comprendre ce qu’on vit"
          content="Uvibes valorise les savoirs issus de l'expérience et permet de créer des échanges entre pairs"
        />
      </DropdownButton>
    </div>
  );
}
