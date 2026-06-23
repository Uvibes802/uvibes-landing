import type { Collectif } from "./collectifsData";
import { collectifs as collectifsFr } from "./collectifsData";

// Traduction créative du dataset FR — mêmes id/couleurs/affiches, copy en italien.
const TEXT_IT: Record<string, { name: string; subtitle: string; gains: string[]; pourquoi: string[] }> = {
  culture: {
    name: "Cultura",
    subtitle: "Cinema, teatri, eventi dal vivo",
    gains: [
      "Un aumento dell'affluenza",
      "Un flusso costante di informazioni sulle aspettative e i comportamenti del pubblico",
    ],
    pourquoi: [
      "Generi raccomandazioni dal passaparola",
      "Approfondisci l'impatto emotivo del film o dello spettacolo",
      "Rispondi alle esigenze degli spettatori che vengono da soli",
    ],
  },
  enseignement: {
    name: "Istruzione",
    subtitle: "Università, business school, istituti di formazione superiore",
    gains: [
      "Maggiore attrattività verso i futuri studenti",
      "Un flusso costante di informazioni sulle aspettative e i comportamenti degli studenti",
    ],
    pourquoi: [
      "Crei legami reali tra gli studenti",
      "Faciliti il loro ingresso nel mondo del lavoro",
      "Generi raccomandazioni dal passaparola",
    ],
  },
  tourisme: {
    name: "Turismo",
    subtitle: "Campeggi, villaggi vacanze, destinazioni turistiche",
    gains: [
      "Un aumento dell'affluenza",
      "Un flusso costante di informazioni sulle aspettative e i comportamenti dei visitatori",
    ],
    pourquoi: [
      "Approfondisci l'esperienza emotiva del soggiorno",
      "Costruisci un legame duraturo con la tua destinazione",
      "Catturi l'attenzione del pubblico adolescente e giovane",
    ],
  },
  "reseaux-business": {
    name: "Reti professionali",
    subtitle: "Club di imprenditori, dirigenti, liberi professionisti, federazioni",
    gains: [
      "Una partecipazione più attiva dei tuoi membri",
      "Una visione continua dei bisogni, delle aspettative e delle dinamiche della tua rete",
    ],
    pourquoi: [
      "Crei fiducia tra i membri",
      "Favorisci scambi utili e orientati al business",
      "Fai emergere vere opportunità professionali in poco tempo",
    ],
  },
  adherents: {
    name: "Soci e mutualisti",
    subtitle: "Mutue, cooperative, associazioni",
    gains: [
      "Un vero senso di appartenenza alla tua organizzazione",
      "Una visione continua dei bisogni, delle aspettative e delle dinamiche della tua comunità",
    ],
    pourquoi: [
      "Crei un legame emotivo con la tua organizzazione",
      "Riconosci e alimenti il coinvolgimento all'interno della comunità",
    ],
  },
  entreprises: {
    name: "Aziende e team",
    subtitle: "Aziende in presenza, da remoto o multisede",
    gains: [
      "Un vero senso di appartenenza alla tua organizzazione",
      "Più ambasciatori e raccomandazioni interne",
      "Un coinvolgimento più forte nei tuoi team",
      "Una visione continua dei bisogni, delle aspettative e delle dinamiche dei tuoi team",
    ],
    pourquoi: [
      "Generi esperienze positive legate alla tua azienda",
      "Diffondi la tua cultura aziendale in modo naturale",
      "Organizzi scambi brevi e utili, sostenibili nel tempo",
    ],
  },
  seniors: {
    name: "Senior",
    subtitle: "Casse pensionistiche, associazioni, enti locali",
    gains: [
      "Un vero senso di appartenenza alla tua organizzazione",
      "Una migliore comprensione dei bisogni e delle aspettative dei tuoi membri",
    ],
    pourquoi: [
      "Crei legami reali tra i membri",
      "Riconosci il ruolo e l'esperienza del tuo pubblico",
    ],
  },
  "echanges-pairs": {
    name: "Supporto tra pari",
    subtitle: "Enti locali, ospedali, cliniche, associazioni — genitori isolati, caregiver, persone in percorso di cura",
    gains: [
      "La creazione di una comunità che prima non esisteva",
      "Una visione continua dei bisogni, delle aspettative e delle dinamiche del tuo pubblico",
    ],
    pourquoi: [
      "Rispondi a un vero bisogno di condivisione e supporto reciproco",
      "Favorisci il mutuo aiuto e la solidarietà all'interno della comunità",
      "Offri esperienze brevi e accessibili, facili da integrare nella vita quotidiana",
    ],
  },
  international: {
    name: "Internazionale",
    subtitle: "Aziende, enti pubblici, autorità locali e organizzazioni internazionali",
    gains: [
      "Legami e una comunità che attraversano i confini",
      "Una visione continua dei bisogni, delle aspettative e delle dinamiche del tuo pubblico internazionale",
      "Una collaborazione interculturale e un senso di appartenenza più forti",
    ],
    pourquoi: [
      "Connetti persone che altrimenti non avrebbero mai avuto l'opportunità di parlarsi",
      "Offri esperienze brevi e multilingue, facili da integrare nella vita quotidiana",
    ],
  },
  sport: {
    name: "Sport",
    subtitle: "Club sportivi, federazioni e organizzatori di competizioni",
    gains: [
      "Un'esperienza per gli spettatori più distintiva e coinvolgente",
      "Un legame più forte tra il club, i tifosi, i giocatori e la comunità locale",
      "Una migliore comprensione delle aspettative, delle abitudini e delle dinamiche del tuo pubblico",
    ],
    pourquoi: [
      "Amplifichi l'impatto emotivo intorno alle partite",
      "Offri esperienze di scambio a cui i giocatori stessi possono partecipare",
    ],
  },
  insertion: {
    name: "Inserimento lavorativo",
    subtitle: "France Travail, missioni locali, Cap Emploi, APEC, AFPA, strutture di supporto all'impiego",
    gains: [
      "Sviluppo di competenze relazionali e comportamentali",
      "Migliore compatibilità tra candidati e organizzazioni che assumono",
      "Riconoscimento dei profili al di là del curriculum e del percorso standard",
    ],
    pourquoi: [
      "Offri un vero terreno di allenamento ricorrente per le soft skill",
      "Conduci colloqui professionali che valutano con maggiore precisione le competenze relazionali",
    ],
  },
  "lieu-de-vie": {
    name: "Spazi abitativi",
    subtitle: "Residenze per studenti, hotel, residenze per anziani, proprietari sociali, gestori immobiliari, cooperative abitative e altri operatori di spazi abitativi",
    gains: [
      "Maggiore attrattività e valore percepito dei tuoi spazi abitativi",
      "Un flusso costante di informazioni sui bisogni, le aspettative e le abitudini dei residenti",
    ],
    pourquoi: [
      "Costruisci un senso di appartenenza e un legame duraturo con il luogo",
      "Metti in atto azioni concrete per favorire relazioni di vicinato positive e armoniose",
      "Rispondi a un'aspirazione forte: rafforzare il legame sociale",
    ],
  },
  sante: {
    name: "Salute e cura",
    subtitle: "Ospedali, cliniche, case di riposo, centri sanitari, istituti medico-educativi, associazioni di pazienti, centri di riabilitazione e convalescenza",
    gains: [
      "Un'esperienza più piacevole per i pazienti e i loro cari durante i tempi di attesa, senza carico aggiuntivo per il tuo personale.",
      "L'immagine di una struttura moderna e innovativa che si preoccupa del benessere delle persone che assiste.",
      "Una migliore comprensione delle aspettative, delle abitudini e delle dinamiche dei tuoi pazienti e di chi li accompagna.",
    ],
    pourquoi: [
      "Permetti a persone che vivono situazioni simili di parlare e sostenersi a vicenda.",
      "Trasformi i tempi di attesa in momenti di dialogo, condivisione e connessione umana.",
      "Accompagni i caregiver familiari che sostengono una persona cara nel suo percorso di cura.",
    ],
  },
};

export const collectifsIt: Collectif[] = collectifsFr.map((c) => ({
  ...c,
  ...TEXT_IT[c.id],
}));
