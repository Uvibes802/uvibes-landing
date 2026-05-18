# CHANGELOG — Uvibes Site Vitrine

> Journal des changements. Une entrée par jour de travail.
> Format : date → tâches terminées → fichiers modifiés → décisions prises.

---

## 2026-05-19 — Mise en place méthodologie

### Ajouté
- `CONTEXT.md` — fichier de contexte pour les sessions Claude
- `TASKS.md` — tableau de bord de toutes les tâches identifiées
- `CHANGELOG.md` — ce fichier

### Audit réalisé
Audit complet du projet identifiant :
- 4 problèmes critiques (performance, SSR, images, vidéos)
- 5 problèmes importants (SEO, accessibilité, sécurité, typos, CSS)
- 5 améliorations (config, fonts, refactors)

### Décisions prises
- Workflow : une tâche = une branche Git, push uniquement après validation tuteur
- Ne jamais travailler directement sur `main`
- Tester localement avec `pnpm dev` + `pnpm build` avant chaque review tuteur

---

## 2026-05-18 — PERF-01 : migration homepage en Server Component

### Tâches terminées
- [PERF-01] Migrer `page.tsx` en Server Component

### Fichiers modifiés
- `src/app/page.tsx` — supprimé `"use client"`, `useState`, `useEffect` ; fonction rendue `async` ; fetch direct via `fetchHomeContent()`
- `src/components/banner/HeroContent.tsx` — nouveau composant `"use client"` qui applique `sanitizeText` côté client
- `src/components/carousel/PartnerCarousel.tsx` — ajout `"use client"` (manquant)
- `src/components/form/formContact.tsx` — ajout `"use client"` (manquant)
- `src/components/section/FeaturedArticles.tsx` — ajout `"use client"` (manquant)
- `src/services/citation/citation.ts` — ajout `"use client"` (manquant)
- `src/services/testimony/testimony.ts` — ajout `"use client"` (manquant)
- `src/components/cards/videoCard.tsx` — ajout `"use client"` (manquant, utilise hook Resize)
- `src/components/section/functSection.tsx` — ajout `"use client"` (manquant, utilise hook Resize)
- `src/components/cards/userNumberCard.tsx` — ajout `"use client"` (manquant, utilise FetchCitation)
- `src/components/section/inspirationSection.tsx` — ajout `"use client"` (manquant, utilise FetchCitation)
- `src/components/testimony/testimony.tsx` — ajout `"use client"` (manquant, utilise FetchTestimony)

### Décision technique
- `sanitizeText` utilise `DOMPurify` et `document.createElement` (APIs browser uniquement) → impossible côté serveur
- Solution : composant wrapper `HeroContent.tsx` en `"use client"` qui reçoit le contenu brut du serveur et sanitise côté client
- Tous les composants qui manquaient de `"use client"` alors qu'ils utilisent des hooks ont été corrigés au passage
