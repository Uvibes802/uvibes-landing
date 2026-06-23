import type { Collectif } from "./collectifsData";
import { collectifs as collectifsFr } from "./collectifsData";

// Traduction créative du dataset FR — mêmes id/couleurs/affiches, copy en allemand.
const TEXT_DE: Record<string, { name: string; subtitle: string; gains: string[]; pourquoi: string[] }> = {
  culture: {
    name: "Kultur",
    subtitle: "Kinos, Theater, Live-Events",
    gains: [
      "Ein Anstieg der Besucherzahlen",
      "Ein stetiger Einblick in die Erwartungen und das Verhalten des Publikums",
    ],
    pourquoi: [
      "Du erzeugst Mundpropaganda-Empfehlungen",
      "Du vertiefst die emotionale Wirkung des Films oder der Show",
      "Du gehst auf die Bedürfnisse von Einzelbesuchern ein",
    ],
  },
  enseignement: {
    name: "Bildung",
    subtitle: "Universitäten, Business Schools, Hochschulen",
    gains: [
      "Stärkere Anziehungskraft auf zukünftige Studierende",
      "Ein stetiger Einblick in die Erwartungen und das Verhalten der Studierenden",
    ],
    pourquoi: [
      "Du schaffst echte Verbindungen zwischen Studierenden",
      "Du erleichterst ihren Einstieg ins Berufsleben",
      "Du erzeugst Mundpropaganda-Empfehlungen",
    ],
  },
  tourisme: {
    name: "Tourismus",
    subtitle: "Campingplätze, Ferienanlagen, Reiseziele",
    gains: [
      "Ein Anstieg der Besucherzahlen",
      "Ein stetiger Einblick in die Erwartungen und das Verhalten der Gäste",
    ],
    pourquoi: [
      "Du vertiefst das emotionale Erlebnis des Aufenthalts",
      "Du baust eine dauerhafte Bindung zu deinem Reiseziel auf",
      "Du gewinnst die Aufmerksamkeit von Jugendlichen und jungen Erwachsenen",
    ],
  },
  "reseaux-business": {
    name: "Geschäftsnetzwerke",
    subtitle: "Unternehmerclubs, Führungskräfte, Freiberufler, Verbände",
    gains: [
      "Eine aktivere Beteiligung deiner Mitglieder",
      "Ein laufender Einblick in die Bedürfnisse, Erwartungen und Dynamiken deines Netzwerks",
    ],
    pourquoi: [
      "Du baust Vertrauen zwischen den Mitgliedern auf",
      "Du förderst nützlichen, geschäftsorientierten Austausch",
      "Du lässt in kurzer Zeit echte berufliche Chancen entstehen",
    ],
  },
  adherents: {
    name: "Mitglieder & Versicherte",
    subtitle: "Versicherungsvereine, Genossenschaften, Verbände",
    gains: [
      "Ein echtes Zugehörigkeitsgefühl zu deiner Organisation",
      "Ein laufender Einblick in die Bedürfnisse, Erwartungen und Dynamiken deines Kollektivs",
    ],
    pourquoi: [
      "Du baust eine emotionale Bindung zu deiner Organisation auf",
      "Du erkennst und förderst das Engagement innerhalb des Kollektivs",
    ],
  },
  entreprises: {
    name: "Unternehmen & Teams",
    subtitle: "Vor-Ort-, Remote- oder Multi-Standort-Unternehmen",
    gains: [
      "Ein echtes Zugehörigkeitsgefühl zu deiner Organisation",
      "Mehr Botschafter und interne Empfehlungen",
      "Stärkeres Engagement in deinen Teams",
      "Ein laufender Einblick in die Bedürfnisse, Erwartungen und Dynamiken deiner Teams",
    ],
    pourquoi: [
      "Du erzeugst positive Erlebnisse mit Bezug zu deinem Unternehmen",
      "Du verbreitest deine Unternehmenskultur auf natürliche Weise",
      "Du organisierst kurze, nützliche Austausche, die langfristig tragbar bleiben",
    ],
  },
  seniors: {
    name: "Senioren",
    subtitle: "Rentenkassen, Verbände, lokale Gebietskörperschaften",
    gains: [
      "Ein echtes Zugehörigkeitsgefühl zu deiner Organisation",
      "Ein besseres Verständnis der Bedürfnisse und Erwartungen deiner Mitglieder",
    ],
    pourquoi: [
      "Du schaffst echte Verbindungen zwischen den Mitgliedern",
      "Du erkennst die Rolle und die Erfahrung deines Publikums an",
    ],
  },
  "echanges-pairs": {
    name: "Peer-Support",
    subtitle: "Gebietskörperschaften, Krankenhäuser, Kliniken, Verbände — isolierte Eltern, pflegende Angehörige, Menschen in Behandlung",
    gains: [
      "Die Entstehung eines Kollektivs, das es vorher nicht gab",
      "Ein laufender Einblick in die Bedürfnisse, Erwartungen und Dynamiken deines Publikums",
    ],
    pourquoi: [
      "Du erfüllst ein echtes Bedürfnis nach Austausch und gegenseitiger Unterstützung",
      "Du förderst gegenseitige Hilfe und Solidarität innerhalb des Kollektivs",
      "Du bietest kurze, zugängliche Erlebnisse, die sich leicht in den Alltag einfügen",
    ],
  },
  international: {
    name: "International",
    subtitle: "Unternehmen, öffentliche Einrichtungen, Gebietskörperschaften und internationale Organisationen",
    gains: [
      "Verbindungen und ein Kollektiv, die über Grenzen hinausgehen",
      "Ein laufender Einblick in die Bedürfnisse, Erwartungen und Dynamiken deines internationalen Publikums",
      "Stärkere interkulturelle Zusammenarbeit und Zugehörigkeitsgefühl",
    ],
    pourquoi: [
      "Du verbindest Menschen, die sonst nie die Chance gehabt hätten, miteinander zu sprechen",
      "Du bietest kurze, mehrsprachige Erlebnisse, die sich leicht in den Alltag einfügen",
    ],
  },
  sport: {
    name: "Sport",
    subtitle: "Sportvereine, Verbände und Wettbewerbsveranstalter",
    gains: [
      "Ein einprägsameres, mitreißenderes Zuschauererlebnis",
      "Eine stärkere Bindung zwischen Verein, Fans, Spielern und der lokalen Gemeinschaft",
      "Ein besseres Verständnis der Erwartungen, Gewohnheiten und Dynamiken deines Publikums",
    ],
    pourquoi: [
      "Du verstärkst die emotionale Wirkung rund um die Spiele",
      "Du bietest Austauscherlebnisse, an denen die Spieler selbst teilnehmen können",
    ],
  },
  insertion: {
    name: "Berufseinstieg",
    subtitle: "France Travail, Missions Locales, Cap Emploi, APEC, AFPA, Arbeitsvermittlungsstellen",
    gains: [
      "Entwicklung von Beziehungs- und Verhaltenskompetenzen",
      "Bessere Passung zwischen Kandidaten und einstellenden Organisationen",
      "Anerkennung von Profilen jenseits des Lebenslaufs und des klassischen Werdegangs",
    ],
    pourquoi: [
      "Du bietest ein echtes, wiederkehrendes Trainingsfeld für Soft Skills",
      "Du führst Vorstellungsgespräche, die Beziehungskompetenzen genauer einschätzen",
    ],
  },
  "lieu-de-vie": {
    name: "Wohnräume",
    subtitle: "Studentenwohnheime, Hotels, Seniorenresidenzen, soziale Vermieter, Immobilienverwalter, Wohngenossenschaften und andere Betreiber von Wohnräumen",
    gains: [
      "Größere Attraktivität und höherer wahrgenommener Wert deiner Wohnräume",
      "Ein stetiger Einblick in die Bedürfnisse, Erwartungen und Gewohnheiten der Bewohner",
    ],
    pourquoi: [
      "Du schaffst ein Zugehörigkeitsgefühl und eine dauerhafte Bindung an den Ort",
      "Du setzt konkrete Maßnahmen um, um positive, harmonische Nachbarschaftsbeziehungen zu fördern",
      "Du erfüllst einen starken Wunsch: die Stärkung des sozialen Zusammenhalts",
    ],
  },
  sante: {
    name: "Gesundheit & Pflege",
    subtitle: "Krankenhäuser, Kliniken, Pflegeheime, Gesundheitszentren, medizinisch-pädagogische Institute, Patientenverbände, Reha- und Nachsorgezentren",
    gains: [
      "Ein angenehmeres Erlebnis für Patienten und ihre Angehörigen während der Wartezeiten, ohne zusätzliche Belastung für dein Personal.",
      "Das Image einer modernen, innovativen Einrichtung, die sich um das Wohlbefinden der von ihr betreuten Menschen sorgt.",
      "Ein besseres Verständnis der Erwartungen, Gewohnheiten und Dynamiken deiner Patienten und ihrer Begleitpersonen.",
    ],
    pourquoi: [
      "Du lässt Menschen in ähnlichen Situationen miteinander sprechen und sich gegenseitig unterstützen.",
      "Du verwandelst Wartezeiten in Momente des Dialogs, des Austauschs und der menschlichen Verbindung.",
      "Du unterstützt Familienangehörige, die einen geliebten Menschen durch seine Behandlung begleiten.",
    ],
  },
};

export const collectifsDe: Collectif[] = collectifsFr.map((c) => ({
  ...c,
  ...TEXT_DE[c.id],
}));
