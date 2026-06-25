# BACKLOG — Tâches non urgentes

> Tâches identifiées mais non prioritaires.
> À faire quand les tâches importantes sont terminées.
> Ajouter ici toute petite tâche trouvée en cours de route.

- [ ] **MEDIA-01** — Logos partenaires `public/images/partners/upc.png` et `ffhb.png` renvoient 400 via `/_next/image` (console home, carrousel partenaires) — le dossier `public/images/partners/` n'existe même pas en local, donc probablement des entrées DB (`Partner`) sans fichier réellement uploadé. Réencoder/uploader les PNG manquants ou retirer ces entrées depuis l'admin.

---

## Qualité du code

- [ ] **PERF-07** — Ajouter `woff2` pour la police `Supreme-Bold`
  - Fichiers : `src/app/globals.css`, `public/fonts/`

- [ ] **CODE-03** — Unifier l'architecture CSS (réduire le mélange MUI/CSS/styled-components)
  - Fichiers : `src/styles/**`
  - Note : tâche longue, à faire en dernier

---

## Intégration WordPress (textes codés en dur → à migrer)

- [ ] **CONTENT-02** — Migrer le texte hero homepage vers WordPress
  - Actuellement codé en dur dans `src/components/banner/HeroContent.tsx`
  - Texte : "ACTIVEZ LA PUISSANCE DE VOTRE COLLECTIF" + sous-titre + paragraphes
  - À faire quand le contenu est validé par le tuteur

---

## SEO

- [ ] **CONTENT-01** — Créer une image OG dédiée 1200×630px pour le partage social
  - Concept : logo Uvibes centré sur fond dégradé orange→rose (`#fd6e00` → `#f62570`)
  - Outil suggéré : Canva ou Figma
  - Destination : `public/images/og-image.png`
  - Ensuite : mettre à jour `src/lib/seo.ts` (une seule ligne à changer)

---

## Résolu (2026-06-23)

- [x] **CODE-01 / CODE-02** — Typos `videoSrcDdesktop` et `mochupHome.png` : déjà disparues du code (entrées périmées).
- [x] **PERF-06** — Hook `Resize` supprimé : il n'était utilisé que par `AvantagesPageClient`, retiré avec les pages mortes `/avantages` + `/features` (301 → /solution). Plus aucun usage du hook dans le projet.

---
