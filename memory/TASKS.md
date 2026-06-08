# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches actives. Historique complet dans CHANGELOG.md.
> **Branche active :** `redesign/solution-config-themes`

---

## ✅ Terminées — session 2026-06-06 (redesign contenu + 2 sections)

> Détail complet dans CHANGELOG.md. À valider visuellement par la tutrice.

- [x] **Home** — T1 eyebrow supprimé · T2 questions mockup · T3 eyebrow philosophie + harmonisation · T5 titres uniformisés · T6 « Rien de plus simple » · T7 « Six minutes » · T8 libellés étapes hors pilules · T9 titre blog
- [x] **BannerCount** — T4 vagues haut/bas · T14 « en 2026 » + rotation des mots · T15 suppr. avis
- [x] **Solution** — T11 suppr. « La solution Uvibes » · T12 eyebrows hors pilules · T13 organisation · T16-T20 textes piliers/contextes · **T21 nouvelle section soft skills**
- [x] **À propos** — **T10 nouvelle section « Pourquoi Uvibes ? »** (polaroïds + animations) + eyebrows hors pilules

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

### Audit 2026-06-08 — reste à traiter (Vagues 3 & 4)
- [ ] **C1** — Supprimer/fusionner la page `/admin` legacy (toggle maintenance, mot de passe en clair via `/api/maintenance`) qui double `/admin/crm/maintenance` — vérifier les usages avant suppression
- [ ] **S6** — Ajouter une Content-Security-Policy (attention MUI/Emotion inline, GA, next/script → tester finement)
- [ ] **P1** — Passer la homepage de `force-dynamic` à ISR (`revalidate`)
- [ ] **C2** — Unifier la source des prix : `usePricing.ts` lit WordPress, le devis/admin lit la DB (`Plan`) → double source de vérité
- [ ] **S5** — Échapper les champs utilisateur dans les emails HTML (`rdv/reserver`, `sendEmail`)
- [ ] **A2** — `/api/maintenance` : mot de passe comparé en clair sans rate-limit (lié à C1)
- [ ] **PERF-fonts** — 4 familles Google Fonts → réduire le payload

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
