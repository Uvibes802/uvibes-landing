import type { BenefitsItemProps } from "@/types/section/BeneficesItemProps";
import "../../styles/section/benefitsHomeItem.css";

export function BenefitsHomeItem({ icon, title }: BenefitsItemProps) {
  return (
    <article className="benefices-home-item-container">
      <div className="benefices-home-item-icon icon-size">{icon}</div>
      <h3 className="text-white">{title}</h3>
    </article>
  );
}
