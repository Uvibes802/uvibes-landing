type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  // On échappe « < » en < : empêche qu'un éventuel "</script>" dans les
  // données ne casse la balise (défense en profondeur, même si les données sont internes).
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
