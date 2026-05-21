import type { BenefitsItemProps } from "@/types/section/BeneficesItemProps";
import "../../styles/section/benefitsHomeItem.css";

export function BenefitsHomeItem({ icon, title, description, color }: BenefitsItemProps) {
  return (
    <article className="benefices-home-item-container" style={{ borderTopColor: color }}>
      <div className="benefices-home-item-icon icon-size">{icon}</div>
      <h3 className="benefices-item-title">{title}</h3>
      <p className="benefices-item-desc text-regular">{description}</p>
    </article>
  );
}
