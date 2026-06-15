"use client";

import Link from "next/link";
import { useState } from "react";

export interface PipeCard {
  id: string;
  nom: string;
  contact: string;
  ville?: string | null;
  statut: string;
  ca: number;
  devisCount: number;
}

// Colonnes du pipeline commercial (ordre = cycle de vente)
const COLONNES: { statut: string; label: string; couleur: string }[] = [
  { statut: "PROSPECT", label: "Prospect", couleur: "#9ca3af" },
  { statut: "QUALIFICATION", label: "Qualification", couleur: "#00AFDD" },
  { statut: "DEVIS_ENVOYE", label: "Devis envoyé", couleur: "#FD6E00" },
  { statut: "NEGOCIATION", label: "Négociation", couleur: "#E6007E" },
  { statut: "CLIENT", label: "Client", couleur: "#16a34a" },
  { statut: "PERDU", label: "Perdu", couleur: "#dc2626" },
];

export default function PipelineBoard({ initial }: { initial: PipeCard[] }) {
  const [cards, setCards] = useState<PipeCard[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  // Déplace un collectif vers une colonne (statut) — mise à jour optimiste + PATCH serveur.
  async function moveTo(id: string, statut: string) {
    const card = cards.find((c) => c.id === id);
    if (!card || card.statut === statut) return;
    const prevStatut = card.statut;
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, statut } : c)));
    try {
      const res = await fetch(`/api/admin/collectifs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // En cas d'échec, on revient à l'état précédent
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, statut: prevStatut } : c)));
    }
  }

  return (
    <div className="crm-pipeline">
      {COLONNES.map((col) => {
        const items = cards.filter((c) => c.statut === col.statut);
        return (
          <div
            key={col.statut}
            className={`crm-pipe-col${overCol === col.statut ? " crm-pipe-col--over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              if (overCol !== col.statut) setOverCol(col.statut);
            }}
            onDragLeave={(e) => {
              // ne réinitialise que si on quitte vraiment la colonne (pas un enfant)
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setOverCol((o) => (o === col.statut ? null : o));
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragId) moveTo(dragId, col.statut);
              setDragId(null);
              setOverCol(null);
            }}
          >
            <div className="crm-pipe-col-head" style={{ borderTopColor: col.couleur }}>
              <span className="crm-pipe-col-title">{col.label}</span>
              <span className="crm-pipe-col-count">{items.length}</span>
            </div>
            <div className="crm-pipe-col-body">
              {items.length === 0 && <p className="crm-pipe-empty">Déposez ici</p>}
              {items.map((c) => (
                <div
                  key={c.id}
                  className={`crm-pipe-card${dragId === c.id ? " crm-pipe-card--dragging" : ""}`}
                  draggable
                  onDragStart={(e) => {
                    setDragId(c.id);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverCol(null);
                  }}
                >
                  <Link href={`/admin/collectifs/${c.id}`} className="crm-pipe-card-nom" draggable={false}>
                    {c.nom}
                  </Link>
                  <span className="crm-pipe-card-sub">{c.contact}{c.ville ? ` · ${c.ville}` : ""}</span>
                  {c.devisCount > 0 && (
                    <span className="crm-pipe-card-ca">{c.ca.toLocaleString("fr-FR")} € · {c.devisCount} devis</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
