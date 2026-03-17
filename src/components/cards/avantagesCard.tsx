import type { AvantagesCardProps } from "@/types/avantages/avantagesCard";
import "../../styles/cards/avantagesCard.css";

export default function AvantagesCard({
  icone,
  title,
  stats,
  content,
}: AvantagesCardProps) {
  return (
    <article className="avantages-card-container">
      <div className="avantages-card-title">
        {icone} <h5>{title}</h5>
      </div>
      <div>
        <p>{stats}</p>
        <p>{content}</p>
      </div>
    </article>
  );
}
