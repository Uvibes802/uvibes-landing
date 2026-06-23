import type { Collectif } from "./collectifsData";
import { collectifs as collectifsFr } from "./collectifsData";

// Traduction créative du dataset FR — mêmes id/couleurs/affiches, copy en portugais.
const TEXT_PT: Record<string, { name: string; subtitle: string; gains: string[]; pourquoi: string[] }> = {
  culture: {
    name: "Cultura",
    subtitle: "Cinemas, teatros, eventos em direto",
    gains: [
      "Um aumento da afluência",
      "Um fluxo constante de informação sobre as expectativas e o comportamento do público",
    ],
    pourquoi: [
      "Geras recomendações por word-of-mouth",
      "Aprofundas o impacto emocional do filme ou do espetáculo",
      "Respondes às necessidades dos espectadores que vêm sozinhos",
    ],
  },
  enseignement: {
    name: "Educação",
    subtitle: "Universidades, escolas de negócios, instituições de ensino superior",
    gains: [
      "Maior atratividade junto dos futuros estudantes",
      "Um fluxo constante de informação sobre as expectativas e o comportamento dos estudantes",
    ],
    pourquoi: [
      "Crias ligações reais entre os estudantes",
      "Facilitas a sua entrada no mercado de trabalho",
      "Geras recomendações por word-of-mouth",
    ],
  },
  tourisme: {
    name: "Turismo",
    subtitle: "Campings, aldeamentos turísticos, destinos turísticos",
    gains: [
      "Um aumento da afluência",
      "Um fluxo constante de informação sobre as expectativas e o comportamento dos visitantes",
    ],
    pourquoi: [
      "Aprofundas a experiência emocional da estadia",
      "Constróis uma ligação duradoura com o teu destino",
      "Captas a atenção do público adolescente e jovem",
    ],
  },
  "reseaux-business": {
    name: "Redes profissionais",
    subtitle: "Clubes de empresários, executivos, profissionais liberais, federações",
    gains: [
      "Uma participação mais ativa dos teus membros",
      "Uma visão contínua das necessidades, expectativas e dinâmicas da tua rede",
    ],
    pourquoi: [
      "Crias confiança entre os membros",
      "Promoves trocas úteis e orientadas para os negócios",
      "Fazes surgir verdadeiras oportunidades profissionais em pouco tempo",
    ],
  },
  adherents: {
    name: "Associados e mutualistas",
    subtitle: "Mútuas, cooperativas, associações",
    gains: [
      "Um verdadeiro sentido de pertença à tua organização",
      "Uma visão contínua das necessidades, expectativas e dinâmicas do teu coletivo",
    ],
    pourquoi: [
      "Crias um vínculo emocional com a tua organização",
      "Reconheces e alimentas o compromisso dentro do coletivo",
    ],
  },
  entreprises: {
    name: "Empresas e equipas",
    subtitle: "Empresas presenciais, remotas ou multissite",
    gains: [
      "Um verdadeiro sentido de pertença à tua organização",
      "Mais embaixadores e recomendações internas",
      "Um compromisso mais forte nas tuas equipas",
      "Uma visão contínua das necessidades, expectativas e dinâmicas das tuas equipas",
    ],
    pourquoi: [
      "Geras experiências positivas associadas à tua empresa",
      "Difundes a tua cultura empresarial de forma natural",
      "Organizas trocas breves e úteis, sustentáveis ao longo do tempo",
    ],
  },
  seniors: {
    name: "Seniores",
    subtitle: "Caixas de pensões, associações, autoridades locais",
    gains: [
      "Um verdadeiro sentido de pertença à tua organização",
      "Uma melhor compreensão das necessidades e expectativas dos teus membros",
    ],
    pourquoi: [
      "Crias ligações reais entre os membros",
      "Reconheces o papel e a experiência do teu público",
    ],
  },
  "echanges-pairs": {
    name: "Apoio entre pares",
    subtitle: "Autoridades locais, hospitais, clínicas, associações — pais isolados, cuidadores, pessoas em percurso de cuidados",
    gains: [
      "A criação de um coletivo que antes não existia",
      "Uma visão contínua das necessidades, expectativas e dinâmicas do teu público",
    ],
    pourquoi: [
      "Respondes a uma verdadeira necessidade de partilha e apoio mútuo",
      "Promoves a ajuda mútua e a solidariedade dentro do coletivo",
      "Ofereces experiências breves e acessíveis, fáceis de integrar no dia a dia",
    ],
  },
  international: {
    name: "Internacional",
    subtitle: "Empresas, organismos públicos, autoridades locais e organizações internacionais",
    gains: [
      "Ligações e um coletivo que atravessam fronteiras",
      "Uma visão contínua das necessidades, expectativas e dinâmicas do teu público internacional",
      "Uma colaboração intercultural e um sentido de pertença mais fortes",
    ],
    pourquoi: [
      "Ligas pessoas que de outra forma nunca teriam tido a oportunidade de falar",
      "Ofereces experiências breves e multilingues, fáceis de integrar no dia a dia",
    ],
  },
  sport: {
    name: "Desporto",
    subtitle: "Clubes desportivos, federações e organizadores de competições",
    gains: [
      "Uma experiência de espectador mais distintiva e envolvente",
      "Um vínculo mais forte entre o clube, os adeptos, os jogadores e a comunidade local",
      "Uma melhor compreensão das expectativas, hábitos e dinâmicas do teu público",
    ],
    pourquoi: [
      "Amplificas o impacto emocional em torno dos jogos",
      "Ofereces experiências de troca em que os próprios jogadores podem participar",
    ],
  },
  insertion: {
    name: "Inserção profissional",
    subtitle: "France Travail, missões locais, Cap Emploi, APEC, AFPA, estruturas de apoio ao emprego",
    gains: [
      "Desenvolvimento de competências relacionais e comportamentais",
      "Melhor compatibilidade entre candidatos e organizações que contratam",
      "Reconhecimento de perfis além do currículo e do percurso padrão",
    ],
    pourquoi: [
      "Ofereces um verdadeiro terreno de treino recorrente para as soft skills",
      "Realizas entrevistas profissionais que avaliam com mais precisão as competências relacionais",
    ],
  },
  "lieu-de-vie": {
    name: "Espaços de vida",
    subtitle: "Residências de estudantes, hotéis, residências para seniores, senhorios sociais, gestores imobiliários, cooperativas de habitação e outros operadores de espaços de vida",
    gains: [
      "Maior atratividade e valor percebido dos teus espaços de vida",
      "Um fluxo constante de informação sobre as necessidades, expectativas e hábitos dos residentes",
    ],
    pourquoi: [
      "Constróis um sentido de pertença e um vínculo duradouro com o local",
      "Implementas ações concretas para promover relações de vizinhança positivas e harmoniosas",
      "Respondes a uma forte aspiração: reforçar o vínculo social",
    ],
  },
  sante: {
    name: "Saúde e cuidados",
    subtitle: "Hospitais, clínicas, lares, centros de saúde, institutos médico-educativos, associações de pacientes, centros de reabilitação e convalescença",
    gains: [
      "Uma experiência mais agradável para os pacientes e os seus familiares durante os tempos de espera, sem carga adicional para a tua equipa.",
      "A imagem de uma instituição moderna e inovadora que se preocupa com o bem-estar das pessoas que acompanha.",
      "Uma melhor compreensão das expectativas, hábitos e dinâmicas dos teus pacientes e de quem os acompanha.",
    ],
    pourquoi: [
      "Permites que pessoas que vivem situações semelhantes falem e se apoiem mutuamente.",
      "Transformas os tempos de espera em momentos de diálogo, partilha e ligação humana.",
      "Acompanhas os cuidadores familiares que apoiam um ente querido ao longo do seu percurso de cuidados.",
    ],
  },
};

export const collectifsPt: Collectif[] = collectifsFr.map((c) => ({
  ...c,
  ...TEXT_PT[c.id],
}));
