# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches actives. Historique complet dans CHANGELOG.md.
> **Branche active :** `style/redesign-premium-v3`

---

## Convention de numérotation

| Préfixe | Catégorie | Prochain numéro |
|---------|-----------|-----------------|
| PERF    | Performance | PERF-08 |
| SEC     | Sécurité    | SEC-03  |
| SEO     | Référencement | SEO-06 |
| A11Y    | Accessibilité | A11Y-02 |
| CODE    | Qualité code  | CODE-07 |
| UX      | Expérience utilisateur | UX-02 |
| FIX     | Corrections de bugs | FIX-07 |
| UI      | Interface visuelle | UI-66 |
| CONTENT | Contenu | CONTENT-03 |
| FEAT    | Fonctionnalité | FEAT-02 |

---

## 🔴 En attente de validation tutrice

- [ ] **Vérifier /blog en prod** — articles WordPress s'affichent correctement
- [ ] **Vérifier CORS CloudFront** — vidéos témoignages visibles en prod

---

## 🟡 Prochaines tâches identifiées

- [ ] **MacBook vidéos paysage** — ajouter dans `VIDEOS` de `ConversationIntro.tsx` quand disponibles
- [ ] **PERF** — 3 vidéos uvibes autoPlay sans lazy-loading → optimiser (IntersectionObserver)
- [ ] **PERF-06** — Remplacer hook `Resize` dans `AvantagesPageClient` par CSS media queries
- [ ] **PERF-07** — Ajouter woff2 pour `Supreme-Bold`
- [ ] **CODE-02** — Renommer `mochupHome.png` → `mockupHome.png`

---

## ✅ Résumé des grandes sessions (détails dans CHANGELOG.md)

| Session | Branche | Contenu |
|---------|---------|---------|
| 2026-05-18 | perf/*, fix/* | PERF, SEC, SEO, A11Y — infrastructure |
| 2026-05-19→21 | feat/seo, refactor/ux | SEO complet, refonte UX homepage |
| 2026-05-22→27 | refactor/ux-simplification | CollectifsSection, animations, design v2/v3 |
| 2026-05-28→29 | refactor/ux-simplification | Refonte UI globale, hero, sections, mockups |
| 2026-06-02 | style/polish-global-v2 | Polish global, blog, solution, uvibes |
| 2026-06-03→04 | style/redesign-premium-v3 | Redesign premium macOS complet, glassmorphism, gradients, CRM, newsletter |
