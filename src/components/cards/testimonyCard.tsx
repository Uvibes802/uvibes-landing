import "@/styles/cards/testimonyCard.css";
export type TestimonyCardProps = {
  testimony: string;
  auteur_temoignage: string;
  role_et_entreprise_temoignage: string;
  id: number | string;
};
export default function TestimonyCard({
  testimony,
  auteur_temoignage,
  role_et_entreprise_temoignage,
}: TestimonyCardProps) {
  return (
    <article className="testimony-card">
      <h3>{testimony}</h3>
      <p>{auteur_temoignage}</p>
      <p>{role_et_entreprise_temoignage}</p>
    </article>
  );
}
