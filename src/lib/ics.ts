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

// Pliage des lignes (RFC 5545) : une ligne de contenu > 75 octets doit être coupée,
// les lignes de continuation commençant par une espace. Sans ça, Apple Calendar
// tronque/ignore les longues DESCRIPTION → le RDV ne se synchronise pas correctement.
function foldLine(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  let out = "";
  let current = "";
  let bytes = 0;
  for (const ch of line) {
    const chBytes = enc.encode(ch).length;
    // 74 octets max par segment (1 octet réservé à l'espace de continuation)
    if (bytes + chBytes > 74) {
      out += (out ? "\r\n " : "") + current;
      current = ch;
      bytes = chBytes;
    } else {
      current += ch;
      bytes += chBytes;
    }
  }
  out += (out ? "\r\n " : "") + current;
  return out;
}

// Assemble les lignes ICS : on plie chaque ligne puis on joint en CRLF.
function assemble(lines: string[]): string {
  return lines.map(foldLine).join("\r\n");
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
  return assemble([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Uvibes//RDV//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevent(input),
    "END:VCALENDAR",
  ]);
}

// Calendrier complet (flux d'abonnement : tous les RDV dans l'agenda de la directrice).
// REFRESH-INTERVAL / X-PUBLISHED-TTL : indiquent à Apple/Google de re-télécharger
// le flux toutes les heures → les nouveaux RDV apparaissent automatiquement.
export function buildIcsCalendar(events: IcsInput[]): string {
  return assemble([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Uvibes//RDV//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Rendez-vous Uvibes",
    "X-WR-TIMEZONE:Europe/Paris",
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
    ...events.flatMap((e) => vevent(e)),
    "END:VCALENDAR",
  ]);
}
