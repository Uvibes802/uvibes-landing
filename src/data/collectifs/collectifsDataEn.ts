import type { Collectif } from "./collectifsData";
import { collectifs as collectifsFr } from "./collectifsData";

// Traduction créative du dataset FR — mêmes id/couleurs/affiches, copy en anglais.
const TEXT_EN: Record<string, { name: string; subtitle: string; gains: string[]; pourquoi: string[] }> = {
  culture: {
    name: "Culture",
    subtitle: "Cinemas, theatres, live events",
    gains: [
      "A boost in attendance",
      "A steady stream of insight into what audiences expect and how they behave",
    ],
    pourquoi: [
      "You spark word-of-mouth recommendations",
      "You deepen the emotional impact of the film or show",
      "You meet the needs of solo audience members",
    ],
  },
  enseignement: {
    name: "Education",
    subtitle: "Universities, business schools, top-tier colleges",
    gains: [
      "Stronger appeal to prospective students",
      "A steady stream of insight into student expectations and behavior",
    ],
    pourquoi: [
      "You build real connections between students",
      "You smooth their path into the job market",
      "You spark word-of-mouth recommendations",
    ],
  },
  tourisme: {
    name: "Tourism",
    subtitle: "Campsites, holiday resorts, tourist destinations",
    gains: [
      "A boost in attendance",
      "A steady stream of insight into guests' expectations and behavior",
    ],
    pourquoi: [
      "You deepen the emotional experience of the stay",
      "You build a lasting attachment to your destination",
      "You capture the attention of teens and younger audiences",
    ],
  },
  "reseaux-business": {
    name: "Business networks",
    subtitle: "Business clubs, executives, tradespeople, professional federations",
    gains: [
      "More active participation from your members",
      "An ongoing view of your network's needs, expectations and dynamics",
    ],
    pourquoi: [
      "You build trust between members",
      "You spark useful, business-oriented exchanges",
      "In a short time, you surface real professional opportunities",
    ],
  },
  adherents: {
    name: "Members & policyholders",
    subtitle: "Mutual insurers, co-ops, associations",
    gains: [
      "A real sense of belonging to your organization",
      "An ongoing view of your community's needs, expectations and dynamics",
    ],
    pourquoi: [
      "You build an emotional bond with your organization",
      "You recognize and fuel engagement within the community",
    ],
  },
  entreprises: {
    name: "Companies & teams",
    subtitle: "On-site, remote, or multi-site companies",
    gains: [
      "A real sense of belonging to your organization",
      "More referrals and internal ambassadors",
      "Stronger engagement across your teams",
      "An ongoing view of your teams' needs, expectations and dynamics",
    ],
    pourquoi: [
      "You generate positive experiences tied to your company",
      "You spread your company culture naturally",
      "You run short, useful exchanges that stay manageable over time",
    ],
  },
  seniors: {
    name: "Seniors",
    subtitle: "Pension funds, associations, local authorities",
    gains: [
      "A real sense of belonging to your organization",
      "A better understanding of your members' needs and expectations",
    ],
    pourquoi: [
      "You build real connections between members",
      "You recognize the role and experience of your audiences",
    ],
  },
  "echanges-pairs": {
    name: "Peer support",
    subtitle: "Local authorities, hospitals, clinics, associations — isolated parents, caregivers, people in care pathways",
    gains: [
      "The creation of a community that didn't exist before",
      "An ongoing view of your audiences' needs, expectations and dynamics",
    ],
    pourquoi: [
      "You meet a real need for sharing and peer support",
      "You encourage mutual aid and solidarity within the community",
      "You offer short, accessible experiences that fit easily into daily life",
    ],
  },
  international: {
    name: "International",
    subtitle: "Companies, public bodies, local authorities and international organizations",
    gains: [
      "Connections and a community that cross borders",
      "An ongoing view of your international audiences' needs, expectations and dynamics",
      "Stronger cross-cultural collaboration and sense of belonging",
    ],
    pourquoi: [
      "You connect people who otherwise would never have had the chance to talk",
      "You offer short, multilingual experiences that fit easily into daily life",
    ],
  },
  sport: {
    name: "Sport",
    subtitle: "Sports clubs, federations and competition organizers",
    gains: [
      "A more distinctive, engaging spectator experience",
      "A stronger bond between the club, supporters, players and the local community",
      "A better understanding of your spectators' expectations, habits and dynamics",
    ],
    pourquoi: [
      "You amplify the emotional impact felt around matches",
      "You offer exchange experiences players themselves can take part in",
    ],
  },
  insertion: {
    name: "Career support",
    subtitle: "France Travail, Missions Locales, Cap Emploi, APEC, AFPA, employment support structures",
    gains: [
      "Development of relational and behavioral skills",
      "Better matching between candidates and hiring organizations",
      "Recognition of profiles beyond the résumé and the standard career path",
    ],
    pourquoi: [
      "You offer a real, recurring training ground for soft skills",
      "You run professional interviews that assess relational skills more accurately",
    ],
  },
  "lieu-de-vie": {
    name: "Living spaces",
    subtitle: "Student housing, hotels, senior residences, social landlords, property managers, housing co-ops and other living-space operators",
    gains: [
      "Greater appeal and perceived value for your living spaces",
      "A steady stream of insight into residents' needs, expectations and habits",
    ],
    pourquoi: [
      "You build a sense of belonging and a lasting attachment to the place",
      "You put concrete actions in place to encourage positive, harmonious neighborly relations",
      "You answer a strong aspiration: strengthening social connection",
    ],
  },
  sante: {
    name: "Health & care",
    subtitle: "Hospitals, clinics, nursing homes, health centers, medical-education institutes, patient associations, rehabilitation and aftercare centers",
    gains: [
      "A more pleasant experience for patients and their loved ones during waiting times, with no extra workload for your staff.",
      "The image of a modern, innovative establishment that cares about the wellbeing of the people it serves.",
      "A better understanding of the expectations, habits and dynamics of your patients and their caregivers.",
    ],
    pourquoi: [
      "You let people going through similar situations talk and support one another.",
      "You turn waiting times into moments of dialogue, sharing and human connection.",
      "You support family caregivers accompanying a loved one through their care journey.",
    ],
  },
};

export const collectifsEn: Collectif[] = collectifsFr.map((c) => ({
  ...c,
  ...TEXT_EN[c.id],
}));
