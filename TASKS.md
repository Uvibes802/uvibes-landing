# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches. Mettre à jour le statut au fil de la journée.
> Une tâche = une branche Git.

---

## Statuts
- `[ ]` todo
- `[~]` in-progress
- `[x]` done

## Priorités
- 🔴 Critique — impact majeur (perf, SEO, rendu)
- 🟡 Important — à corriger rapidement
- 🟢 Amélioration — qualité et maintenabilité

---

## 🔴 Critique

- [x] **PERF-01** — Supprimer `"use client"` de `page.tsx`, migrer `fetchHomeContent` en Server Component
  - Fichiers : `src/app/page.tsx`, `src/services/home/fetchHomeContent.ts`
  - Branche : `perf/server-component-homepage`
  - Impact : SSR activé, SEO amélioré, chargement initial plus rapide

- [ ] **PERF-02** — Compresser les images lourdes (TeamUvibes.jpg 24 MB, TeamUvibesHome.jpg 5.9 MB, mockups PNG)
  - Fichiers : `public/images/TeamUvibes.jpg`, `public/images/TeamUvibesHome.jpg`, `public/images/mochupHome.png`, etc.
  - Branche : `perf/compress-images`
  - Impact : temps de chargement divisé par 10+ sur mobile

- [ ] **PERF-03** — Lazy loading des vidéos avec Intersection Observer
  - Fichiers : `src/components/cards/videoCard.tsx`, `src/components/section/WhyUvibes.tsx`
  - Branche : `perf/lazy-videos`
  - Impact : 6 vidéos autoplay ne chargent plus toutes en même temps au démarrage

- [ ] **PERF-04** — Supprimer `force-dynamic` du layout ou l'isoler aux routes qui en ont besoin
  - Fichiers : `src/app/layout.tsx`
  - Branche : `perf/remove-force-dynamic`
  - Impact : réactive le caching statique Next.js sur toutes les pages

---

## 🟡 Important

- [ ] **SEO-01** — Ajouter metadata complète (OG tags, description, canonical) sur toutes les pages
  - Fichiers : `src/app/layout.tsx`, `src/app/avantages/layout.tsx`, `src/app/features/layout.tsx`, `src/app/blog/layout.tsx`
  - Branche : `feat/seo-metadata`
  - Impact : partage réseaux sociaux, indexation Google

- [ ] **A11Y-01** — Corriger les problèmes d'accessibilité (double h1, boutons sans aria-label, alt incorrects)
  - Fichiers : `src/components/banner/heroBanner.tsx`, `src/components/menu/Menu.tsx`
  - Branche : `fix/accessibility`
  - Impact : conformité WCAG, score Lighthouse accessibilité

- [ ] **CODE-01** — Corriger la typo `videoSrcDdesktop` → `videoSrcDesktop`
  - Fichiers : `src/components/cards/videoCard.tsx`, `src/app/page.tsx` (tous les appels)
  - Branche : `fix/typo-videosrc`
  - Impact : lisibilité du code

- [ ] **CODE-02** — Renommer `mochupHome.png` → `mockupHome.png`
  - Fichiers : `public/images/mochupHome.png`, `src/app/page.tsx`
  - Branche : `fix/typo-image-filename`

- [ ] **SEC-01** — Ajouter rate limiting sur la route `/api/sendEmail`
  - Fichiers : `src/app/api/sendEmail/route.ts`
  - Branche : `fix/email-rate-limit`
  - Impact : protection anti-spam du formulaire contact

---

## 🟢 Amélioration

- [ ] **PERF-05** — Ajouter des security headers et cache headers dans `next.config.ts`
  - Fichiers : `next.config.ts`
  - Branche : `perf/next-config-headers`

- [ ] **PERF-06** — Remplacer le hook `Resize` par des CSS media queries dans les composants qui le peuvent
  - Fichiers : `src/components/cards/videoCard.tsx`, `src/components/menu/Menu.tsx`
  - Branche : `refactor/css-media-queries`
  - Impact : suppression du flash de layout (hydration mismatch)

- [ ] **PERF-07** — Ajouter `woff2` pour la police `Supreme-Bold`
  - Fichiers : `src/app/globals.css`, `public/fonts/`
  - Branche : `perf/font-woff2`

- [ ] **UX-01** — Vérifier et améliorer l'expérience formulaire contact (feedback visuel, validation)
  - Fichiers : `src/components/form/formContact.tsx`, `src/styles/form/formContact.css`
  - Branche : `feat/form-ux`

- [ ] **CODE-03** — Unifier l'architecture CSS (réduire le mélange MUI/CSS fichiers/styled-components)
  - Fichiers : `src/styles/**`
  - Branche : `refactor/css-architecture`
  - Note : tâche longue, à faire en dernier

---

## ✅ Terminé

_(les tâches complétées sont déplacées ici avec la date)_

---

## Notes

- Ne jamais travailler directement sur `main`
- Toujours faire valider par le tuteur avant de push
- Convention commits : `fix:` / `feat:` / `perf:` / `refactor:` / `style:` + description courte
