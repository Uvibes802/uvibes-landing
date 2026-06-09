# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches actives. Historique complet dans CHANGELOG.md.
> **Branche active :** `feat/dashboard-audit-polish`

---

## 🎯 Missions Falek (doc tuteur) — feuille de route

> Décisions actées (voir `CLAUDE.md` § Décisions Missions Falek). À traiter par phases.
> Prochain numéro : **FEAT-02**.

### Phase 1 — Devis (le plus cadré) · branche `feat/missions-falek` ✅
- [x] **FEAT-02 — Prix des 3 offres** : alignés sur **3 980 / 4 980 / 5 980 €/an** (`PricingData.ts` source statique, `PricingTable` ne lit plus WP, `DevisFormStepper`, `Plan.prixAnnuel` en base via seed).
- [x] **FEAT-03 — 4ème offre dans la section offres** : `OffreEvenementielle` rendue **dans** la section `#offres` de `PricingTable`, sous les 3 cartes.
- [x] **FEAT-04 — Code réduction dans le funnel** : déjà en place (champ promo dans `DevisDocument`, `/api/promo/validate`, re-validation à la signature). Confirmé.
- [x] **FEAT-05 — Acceptation différenciée des documents** : une case par document requis selon l'offre (annuel = CGV+DPA+SLA, événementiel = CGV+PDD), toutes obligatoires, re-validation serveur, stockage `Quote.acceptedDocs`. Règle partagée `src/lib/legalDocs.ts`.

### Phase 2 — Documents légaux + admin · branche `feat/missions-falek` ✅
- [x] **FEAT-06 — Héberger les 4 documents** : pages **`/documents/[slug]`** (cgv, dpa, sla, pdd), version « 30 mai 2026 », rendu markdown-léger.
- [x] **FEAT-07 — Édition des documents depuis l'admin** : modèle `LegalDocument`, module `/admin/cms/documents` (`LegalDocsManager`), API PUT protégée. Contenu en base, éditable.

### Phase 3 — RDV ✅
- [x] **FEAT-08 — Notification prise de RDV** : déjà en place — `/api/rdv/reserver` envoie la confirmation client **et** notifie l'admin (`process.env.EMAIL_USER`). Confirmé.

### Phase 4 — Qualité (missions I & II)
- [x] **A11Y (nouvelles UI)** : labels liés (`htmlFor`/wrapping `<label>`), hiérarchie h1→h2→h3 sur `/documents/*`, boutons `aria-expanded`, liens explicites.
- [ ] **A11Y-02 — Audit accessibilité global** : passer axe-devtools / Tanaguru sur l'ensemble des pages + corriger (reste à faire).
- [ ] **FIX-07 — Compatibilité navigateurs** : tester Chrome/Firefox/Safari/Edge + mobile, corriger les écarts (reste à faire).

### Phase 5 — CRM (gros périmètre — à cadrer/phaser) · reste dans ce repo (Prisma + Supabase dédiée)
- [ ] **FEAT-09 — Cadrage CRM** : prioriser les modules du doc (contacts/entreprises, pipeline commercial, interactions, tâches/relances, marketing, support, documents, reporting). Définir le MVP avant de coder.

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
| A11Y    | Accessibilité | A11Y-03 |
| CODE    | Qualité code  | CODE-07 |
| UX      | Expérience utilisateur | UX-02 |
| FIX     | Corrections de bugs | FIX-08 |
| UI      | Interface visuelle | UI-66 |
| CONTENT | Contenu | CONTENT-03 |
| FEAT    | Fonctionnalité | FEAT-10 |

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

### Audit 2026-06-08 — avancement
- [x] **C1** — Page `/admin` legacy supprimée + dashboard déplacé `/admin/crm/*` → `/admin/*` (commits du 08/06)
- [x] **Renommage routes** — /a-propos, /mentions-legales, /conditions-d-utilisation, /rendez-vous (301 + sitemap)
- [ ] **S5** — Échapper les champs utilisateur dans les emails HTML (`rdv/reserver`, `sendEmail`)
- [ ] **S6** — Ajouter une Content-Security-Policy (report-only d'abord ; attention MUI/Emotion inline, GA, next/script)
- [ ] **P1** — Passer la homepage de `force-dynamic` à ISR (`revalidate`) — **arbitrage fraîcheur à valider avec la tutrice**
- [ ] **C2** — Unifier la source des prix : `usePricing.ts` lit WordPress, le devis/admin lit la DB (`Plan`) → double source de vérité
- [ ] **A2** — `/api/maintenance` : mot de passe comparé en clair sans rate-limit
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
