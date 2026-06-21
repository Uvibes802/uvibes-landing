# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches actives. Historique complet dans CHANGELOG.md.
> **Branche active :** `feat/missions-falek`

---

## 🌍 i18n (traduction multilingue) — version anglaise live, voir CHANGELOG 2026-06-21

**Décision prise** (sans bloquer sur le tuteur, vu l'urgence fin de stage) : routing parallèle `/en/...` (pas de restructuration `[locale]`, zéro risque pour les routes FR existantes), composants partagés avec prop `locale?: "fr" | "en"` (défaut `"fr"` → aucun appel existant cassé), traduction créative (pas littérale) faite par Claude. 4 pages prioritaires livrées et vérifiées Playwright : `/en` (accueil), `/en/method`, `/en/pricing`, `/en/about`. Switcher de langue FR⇄EN dans le menu (desktop pill + lien mobile), `<html lang>` dynamique, hreflang croisés (metadata + sitemap.xml).

**Hors scope (limitation assumée, à trancher avec le tuteur si besoin) :**
- Contenu CMS admin (témoignages, articles de blog, tranches de tarification par taille, libellés équipe hors les 3 catégories par défaut) reste en français — nécessiterait un champ EN par contenu en base, pas juste une traduction de code.
- Funnel `/devis` (signature, CGV/DPA/SLA/PDD) volontairement non traduit — processus légal/contractuel français, risqué à traduire sans validation juridique.
- Pages légales (mentions, CGU, confidentialité, cookies) et `/blog` non traduits — liés en `/en` à la version FR pour l'instant.
- Widget de don HelloAsso (iframe tiers) reste en français.

**Reste à faire si on veut élargir :** légal EN (au moins confidentialité/CGU), blog EN (dépend du CMS), funnel devis EN si le tuteur valide la traduction des documents contractuels.

---

## 🗂️ Session 2026-06-18 — Gros lot demandes tutrice

> Détail + Impact dans CHANGELOG 2026-06-18. Build OK, vérif visuelle Playwright (solution, passeport, collectifs, commentaires).

- [x] GA : fix `page_view` sur navigation (`GARouteTracker`) + rapport (maintenance OK local / réserve Vercel)
- [x] Lot textes (piloter, passeport, contact, tarifs, offres, smallorg, thèmes, FeaturesCard/Résultats, hero méthode, Processus, soft skills)
- [x] Commentaires : cercle d'initiales + texte polaroïd retirés
- [x] Affiches dédiées par thème (WebP) + catégorie « Lieu de vie » (12 secteurs)
- [x] Cartes Passeport : grille côte à côte + affiche diplôme/carte + carte « Attestation lieu de vie »
- [x] Soft skills : vidéo+podcast (01), vidéo polaroïd (02)
- [x] Newsletter : catégories repliées tant que la case n'est pas cochée
- [x] Méthode : nav à 4 onglets (Processus/Thématiques/Soft skills/Résultats)
- [x] Devis PDF : tout-en-un (devis + documents légaux de l'offre annexés)
- [x] Animations : glow pulsé doux sur les italiques (`.v-serif`)
- [ ] **À fournir tutrice :** clip vidéo « des mecs qui font un vibe » (soft skills 02, placeholder = `lisa-et-celine.mp4`) ; URLs CloudFront reel 9:16 + podcast (soft skills 01)
- [ ] **Prod :** ajouter `NEXT_PUBLIC_GOOGLE_ANALYTICS` dans Vercel + redéployer ; envisager état maintenance en DB (FS non persistant sur Vercel)
- [ ] **Pré-existant (hors lot) :** `/images/partners/*.png` en 400 en local (logos partenaires manquants)

---

## 🗂️ Session 2026-06-16 — Demandes tuteur (11 lots)

> Grosse liste découpée en lots, attaqués un par un (« tout dans l'ordre »).

- [x] **Lot 1 — Devis logique/admin** : remises = codes promo uniquement (suppression remises auto + manuelle), indicateur remise (liste + détail), prix HT personnalisé (assos). Voir CHANGELOG 2026-06-16.
- [x] **Lot 1b — Doublons & upload** : vérifié — **aucun doublon restant** (DB 12 partenaires / 3 témoignages / 8 équipe, seed idempotent, sync-wp fait `deleteMany` avant réinsertion, APIs publiques lisent la DB seule). Upload OK (route robuste, `public/uploads/` inscriptible + gitignoré). Rien à corriger côté code.
- [x] **Lot 2 — Offre découverte (4e offre)** : renommée « Vibes Découverte » (CMS), titre agrandi, carte lumineuse + cadre blanc 4px, note de gauche supprimée (boutons à droite), plus aérée. Voir CHANGELOG 2026-06-16. *(nom réeditable en CMS — alternatives proposées : L'Avant-Première, Coup de Foudre)*
- [x] **Lot 3 — Heros harmonisés** : hero tarifs passé en `min-height:55vh` centré + titre `clamp(44px,7vw,92px)` (façon Méthode). Les autres heros marketing (méthode 55vh/104, à propos 55vh/88, blog 55vh/96) étaient déjà harmonisés ; legal reste volontairement compact (page juridique). Accueil non touché.
- [x] **Lot 4 — Titres noirs → couleurs vives** : audit complet. Le site utilise déjà des couleurs vives pour quasi tous les titres (orange #FD6E00, rose #D90A5C, blanc sur dégradés). Seul vrai titre noir marketing = `.rdv-title` « On en parle ? » → passé en dégradé orange→rose. Laissés : `#111` (micro-pastilles 9px, non-titres), `#1a0a06` (contenu d'article blog, lecture longue), `--ink` magenta (couleur brand de texte, pas noir). *Si la tutrice trouve le magenta `--ink` trop sombre, on peut l'éclaircir globalement en 1 ligne.*
- [x] **Lot 5 — Redesign devis + tunnel** (1er passage, CSS only `devis.css`) : fond `.dv-page` saturé (orange→pink→magenta→violet) ; titres noirs `#1a0a06` → dégradé brand (dv-card-title, dv-doc-numero, dv-plan-summary-name, dv-sign-title) ou rose solide (dv-plan-name, step-label, durée) ; polices prompt déjà en place. Bug corrigé : masque « île » (creux ∝ hauteur) mordait le titre sur les cartes longues mobile → masque désactivé < 640px (coins arrondis classiques). *Ouvert à itération visuelle tutrice.*
- [x] **Lot 6 — Page À propos** (polish visuel ciblé, tutrice : « ne pas toucher hero ni footer, bosser surtout sections 2 & 3 ») : page déjà vive/moderne (titres `--orange`/rose/dégradé, aucun noir). Section 2 (`WhyName`) : légendes manuscrites « Colette »/« Delphine » dans l'espace blanc des polaroïds (look complet). Section 3 (`.uv-intro`) : vidéo Delphine encadrée en **cadre photo blanc** + ombre brand (cohérent motif polaroïde). Mobile OK.
- [x] **Lot 7 — Témoignages** : photo polaroïde dans `VideoSection` (`.vs-polaroid`). Desktop : absolue, tiltée à droite. Mobile : en flux entre le titre et les étoiles. Image `TeamUvibesHome.jpg` (remplaçable), légende « Vos collectifs, vivants ».
- [x] **Lot 8 — Newsletter** : titre « 📬 Recevoir nos meilleures idées avec la newsletter » en dégradé vif (plus noir) ; `<select>` mono → **puces multi-catégories** (`categories[]`), propagé dans `FormData` + email (`sendEmail`).
- [x] **Lot 9 — Admin équipe** : la gestion dynamique des catégories existait déjà dans `EquipeManager` (ajout/renommage/suppression, stockées en CMS `team-categories` — la catégorie « Architectes du code » existe déjà). **Chaînon manquant corrigé** : `TeamSection` public hardcodait les onglets → rendus dynamiques (fetch `team-categories` via `/api/settings`, fallback sur les 3). ⚠️ À signaler tutrice : 3 membres réels (Sofia Ait-Taleb CEO, Lucas Bernard CTO, Amina Chouaib) sont rangés dans des catégories fantômes `Direction`/`Tech`/`Commercial` (seed) → invisibles ; à réaffecter à une vraie catégorie ou supprimer (décision tutrice).
- [x] **Lot 10 — Menu « on en parle »** : le CTA `.v-sheet-cta` (menu mobile, un `<Link>`) n'avait pas `text-decoration: none` → texte souligné. Ajouté. Plus de soulignement.
- [x] **Lot 11 — Vérifier Google Analytics** : OK. GA4 (`G-9B…`), Consent Mode (`denied` par défaut → `granted` au clic Accepter, persisté 365j, restauré au retour), banner masqué sur /admin & /devis. Live : `gtag.js` chargé, `window.gtag` ok, `dataLayer` peuplé. Bémol mineur non corrigé (fichier critique layout.tsx) : 3 `console.log` de debug en prod (layout.tsx + cookieConsent.tsx) — à retirer sur feu vert tutrice.

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
- [x] **A11Y-02 — Audit accessibilité (pages publiques)** : audit axe-core sur 8 pages → **0 violation** (`/`, `/solution`, `/a-propos`, `/blog`, `/documents/[slug]`, `/devis`, `/devis/[id]`, `/rendez-vous`). Corrigé : rôles ARIA, labels de formulaires, landmarks `<main>`, `<h1>`, ordre des titres, contrastes WCAG AA. Détail dans CHANGELOG (2026-06-10).
  - [ ] Reste : pages **admin** `/admin/*` + article `/blog/[slug]` (contenu WP) — non bloquant.
- [x] **FIX-07 — Compatibilité navigateurs** : autoprefixer (build Next) confirmé ajoutant les préfixes Safari (`-webkit-backdrop-filter`…) ; features CSS modernes supportées evergreen. Aucune correction source nécessaire.

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

- [ ] **BUG CRITIQUE — Formulaire de contact ne part pas** : `/api/sendEmail` renvoie 500. Cause confirmée par test direct nodemailer : `EAUTH invalid_grant: Bad Request` → le `GOOGLE_REFRESH_TOKEN` (OAuth2 Gmail) est expiré ou révoqué. Ce n'est pas un bug de code — il faut régénérer un refresh token côté Google Cloud Console (compte du propriétaire de `EMAIL_USER`) et l'ajouter dans `.env.local` + Vercel. Vérifier aussi que l'écran de consentement OAuth est en mode **Production** (pas Testing) sinon le token expire à nouveau après 7 jours.
- [ ] **Vérifier /blog en prod** — articles WordPress s'affichent correctement
- [ ] **Vérifier CORS CloudFront** — vidéos témoignages visibles en prod

---

## 🟡 Prochaines tâches identifiées

- [ ] **BUG hero accueil** — texte dupliqué (« Elles se créent. » apparaît deux fois). Cause : la valeur CMS `hero-sub` contient déjà les deux phrases complètes (« Les bonnes conversations ne s'improvisent pas. Elles se créent. »), mais `HomeHero.tsx` affiche `hero-sub` + `<br/>` + `hero-sub-2` (qui retombe sur le défaut « Elles se créent. ») → la 2e phrase s'affiche deux fois. Fix simple : soit nettoyer la valeur CMS `hero-sub` (ne garder que la 1ère phrase), soit retirer l'affichage forcé de `hero-sub-2` dans le code. À trancher avec la tutrice (impacte le contenu éditable en admin).
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
