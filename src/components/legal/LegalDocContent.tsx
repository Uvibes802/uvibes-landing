// Rendu d'un document contractuel stocké en base (format markdown-léger).
// Conventions : `## ` → titre d'article · `### ` → sous-article · `- ` → puce · ligne vide = paragraphe.
// Aucun HTML brut n'est injecté : le texte est rendu via des éléments React (sûr pour l'utilisateur).

export default function LegalDocContent({ contenu }: { contenu: string }) {
  const blocks = contenu.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return <h3 key={i}>{block.slice(4)}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={i}>{block.slice(3)}</h2>;
        }

        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </>
  );
}
