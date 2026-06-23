import type { Collectif } from "./collectifsData";
import { collectifs as collectifsFr } from "./collectifsData";

// Traduction créative du dataset FR — mêmes id/couleurs/affiches, copy en espagnol.
const TEXT_ES: Record<string, { name: string; subtitle: string; gains: string[]; pourquoi: string[] }> = {
  culture: {
    name: "Cultura",
    subtitle: "Cines, teatros, eventos en vivo",
    gains: [
      "Un aumento de la afluencia de público",
      "Un flujo constante de información sobre las expectativas y comportamientos del público",
    ],
    pourquoi: [
      "Generas recomendaciones de boca en boca",
      "Profundizas el impacto emocional de la película o el espectáculo",
      "Respondes a las necesidades de los espectadores que vienen solos",
    ],
  },
  enseignement: {
    name: "Educación",
    subtitle: "Universidades, escuelas de negocio, centros de formación superior",
    gains: [
      "Mayor atractivo ante los futuros estudiantes",
      "Un flujo constante de información sobre las expectativas y el comportamiento de los estudiantes",
    ],
    pourquoi: [
      "Creas vínculos reales entre los estudiantes",
      "Facilitas su entrada al mundo profesional",
      "Generas recomendaciones de boca en boca",
    ],
  },
  tourisme: {
    name: "Turismo",
    subtitle: "Campings, complejos vacacionales, destinos turísticos",
    gains: [
      "Un aumento de la afluencia",
      "Un flujo constante de información sobre las expectativas y el comportamiento de los visitantes",
    ],
    pourquoi: [
      "Profundizas la experiencia emocional de la estancia",
      "Construyes un vínculo duradero con tu destino",
      "Captas la atención del público adolescente y joven",
    ],
  },
  "reseaux-business": {
    name: "Redes profesionales",
    subtitle: "Clubes de empresarios, directivos, profesionales liberales, federaciones",
    gains: [
      "Una participación más activa de tus miembros",
      "Una visión continua de las necesidades, expectativas y dinámicas de tu red",
    ],
    pourquoi: [
      "Generas confianza entre los miembros",
      "Impulsas intercambios útiles y orientados al negocio",
      "Haces emerger oportunidades profesionales reales en poco tiempo",
    ],
  },
  adherents: {
    name: "Socios y mutualistas",
    subtitle: "Mutuas, cooperativas, asociaciones",
    gains: [
      "Un verdadero sentido de pertenencia a tu organización",
      "Una visión continua de las necesidades, expectativas y dinámicas de tu colectivo",
    ],
    pourquoi: [
      "Creas un vínculo emocional con tu organización",
      "Reconoces y alimentas el compromiso dentro del colectivo",
    ],
  },
  entreprises: {
    name: "Empresas y equipos",
    subtitle: "Empresas presenciales, remotas o multisede",
    gains: [
      "Un verdadero sentido de pertenencia a tu organización",
      "Más embajadores y recomendaciones internas",
      "Un compromiso más fuerte en tus equipos",
      "Una visión continua de las necesidades, expectativas y dinámicas de tus equipos",
    ],
    pourquoi: [
      "Generas experiencias positivas asociadas a tu empresa",
      "Difundes tu cultura empresarial de forma natural",
      "Organizas intercambios breves y útiles, sostenibles en el tiempo",
    ],
  },
  seniors: {
    name: "Personas mayores",
    subtitle: "Mutuas de pensiones, asociaciones, administraciones locales",
    gains: [
      "Un verdadero sentido de pertenencia a tu organización",
      "Una mejor comprensión de las necesidades y expectativas de tus miembros",
    ],
    pourquoi: [
      "Creas vínculos reales entre los miembros",
      "Reconoces el papel y la experiencia de tu público",
    ],
  },
  "echanges-pairs": {
    name: "Apoyo entre pares",
    subtitle: "Administraciones, hospitales, clínicas, asociaciones — padres aislados, cuidadores, personas en proceso de atención",
    gains: [
      "La creación de un colectivo que antes no existía",
      "Una visión continua de las necesidades, expectativas y dinámicas de tu público",
    ],
    pourquoi: [
      "Respondes a una necesidad real de compartir y apoyarse entre pares",
      "Fomentas la ayuda mutua y la solidaridad dentro del colectivo",
      "Ofreces experiencias breves y accesibles, fáciles de integrar en el día a día",
    ],
  },
  international: {
    name: "Internacional",
    subtitle: "Empresas, organismos públicos, administraciones y organizaciones internacionales",
    gains: [
      "Vínculos y un colectivo que traspasan fronteras",
      "Una visión continua de las necesidades, expectativas y dinámicas de tu público internacional",
      "Una colaboración intercultural y un sentido de pertenencia más fuertes",
    ],
    pourquoi: [
      "Conectas a personas que de otro modo nunca habrían tenido la oportunidad de hablar",
      "Ofreces experiencias breves y multilingües, fáciles de integrar en el día a día",
    ],
  },
  sport: {
    name: "Deporte",
    subtitle: "Clubes deportivos, federaciones y organizadores de competiciones",
    gains: [
      "Una experiencia de espectador más distintiva y atractiva",
      "Un vínculo más fuerte entre el club, los aficionados, los jugadores y la comunidad local",
      "Una mejor comprensión de las expectativas, hábitos y dinámicas de tu público",
    ],
    pourquoi: [
      "Amplificas el impacto emocional que rodea a los partidos",
      "Ofreces experiencias de intercambio en las que los propios jugadores pueden participar",
    ],
  },
  insertion: {
    name: "Inserción laboral",
    subtitle: "France Travail, misiones locales, Cap Emploi, APEC, AFPA, estructuras de apoyo al empleo",
    gains: [
      "Desarrollo de competencias relacionales y de comportamiento",
      "Mejor compatibilidad entre candidatos y organizaciones que contratan",
      "Reconocimiento de perfiles más allá del currículum y la trayectoria estándar",
    ],
    pourquoi: [
      "Ofreces un verdadero terreno de entrenamiento recurrente para las soft skills",
      "Realizas entrevistas profesionales que evalúan con más precisión las competencias relacionales",
    ],
  },
  "lieu-de-vie": {
    name: "Espacios de vida",
    subtitle: "Residencias de estudiantes, hoteles, residencias de mayores, propietarios sociales, gestores inmobiliarios, cooperativas de vivienda y otros operadores de espacios de vida",
    gains: [
      "Mayor atractivo y valor percibido de tus espacios de vida",
      "Un flujo constante de información sobre las necesidades, expectativas y hábitos de los residentes",
    ],
    pourquoi: [
      "Construyes un sentido de pertenencia y un vínculo duradero con el lugar",
      "Pones en marcha acciones concretas para fomentar relaciones de vecindad positivas y armoniosas",
      "Respondes a una aspiración fuerte: reforzar el vínculo social",
    ],
  },
  sante: {
    name: "Salud y cuidados",
    subtitle: "Hospitales, clínicas, residencias, centros de salud, institutos médico-educativos, asociaciones de pacientes, centros de rehabilitación y convalecencia",
    gains: [
      "Una experiencia más agradable para los pacientes y sus allegados durante los tiempos de espera, sin carga adicional para tu personal.",
      "La imagen de un establecimiento moderno e innovador que se preocupa por el bienestar de las personas a las que atiende.",
      "Una mejor comprensión de las expectativas, hábitos y dinámicas de tus pacientes y de quienes los acompañan.",
    ],
    pourquoi: [
      "Permites que personas que viven situaciones similares hablen y se apoyen mutuamente.",
      "Conviertes los tiempos de espera en momentos de diálogo, intercambio y conexión humana.",
      "Acompañas a los cuidadores familiares que sostienen a un ser querido a lo largo de su proceso de atención.",
    ],
  },
};

export const collectifsEs: Collectif[] = collectifsFr.map((c) => ({
  ...c,
  ...TEXT_ES[c.id],
}));
