// Petit utilitaire pour générer un CSV propre (échappement des guillemets/virgules).
function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // Si la valeur contient un séparateur, un guillemet ou un saut de ligne → on entoure de guillemets
  if (/[",\n;]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(escapeCell).join(",")];
  for (const row of rows) {
    lines.push(row.map(escapeCell).join(","));
  }
  // BOM UTF-8 pour qu'Excel ouvre correctement les accents
  return "﻿" + lines.join("\n");
}
