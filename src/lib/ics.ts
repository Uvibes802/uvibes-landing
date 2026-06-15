// Génère un fichier .ics (iCalendar) pour un rendez-vous.
// Joint aux emails, il permet d'ajouter le RDV en 1 clic à un agenda
// (Apple Calendar, Google Agenda, Outlook…) — solution simple de « sync calendrier ».

interface IcsInput {
  uid: string;
  date: string;   // "2026-06-15"
  heure: string;  // "14:00"
  dureeMinutes?: number;
  titre: string;
  description?: string;
  lieu?: string;
}

// "14:00" -> { h: 14, m: 0 }
function parseHeure(heure: string) {
  const [h, m] = heure.split(":").map((n) => parseInt(n, 10));
  return { h: h || 0, m: m || 0 };
}

// Format iCal en heure locale flottante : YYYYMMDDTHHMMSS
function fmtLocal(date: string, h: number, m: number) {
  const [y, mo, d] = date.split("-");
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}${mo}${d}T${pad(h)}${pad(m)}00`;
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

// Lignes d'un VEVENT (sans l'enveloppe VCALENDAR) — réutilisé pour 1 ou N événements.
function vevent(input: IcsInput): string[] {
  const { h, m } = parseHeure(input.heure);
  const duree = input.dureeMinutes ?? 30;
  const endMinutesTotal = h * 60 + m + duree;
  const endH = Math.floor(endMinutesTotal / 60) % 24;
  const endM = endMinutesTotal % 60;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VEVENT",
    `UID:${input.uid}@uvibes.fr`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${fmtLocal(input.date, h, m)}`,
    `DTEND:${fmtLocal(input.date, endH, endM)}`,
    `SUMMARY:${escapeIcs(input.titre)}`,
    input.description ? `DESCRIPTION:${escapeIcs(input.description)}` : "",
    input.lieu ? `LOCATION:${escapeIcs(input.lieu)}` : "",
    "END:VEVENT",
  ].filter(Boolean);
}

// Un seul événement (fichier .ics joint aux emails).
export function buildIcsEvent(input: IcsInput): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Uvibes//RDV//FR",
    "METHOD:PUBLISH",
    ...vevent(input),
    "END:VCALENDAR",
  ].join("\r\n");
}

// Calendrier complet (flux d'abonnement : tous les RDV dans l'agenda de la directrice).
export function buildIcsCalendar(events: IcsInput[]): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Uvibes//RDV//FR",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Rendez-vous Uvibes",
    "X-WR-TIMEZONE:Europe/Paris",
    ...events.flatMap((e) => vevent(e)),
    "END:VCALENDAR",
  ].join("\r\n");
}
