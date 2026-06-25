# CLAUDE.md — Uvibes Site Vitrine

> Fichier lu automatiquement par Claude Code à chaque session.
> Contient tout le contexte nécessaire pour travailler efficacement sur ce projet.

---

## 🚀 Reprise du projet — à lire en premier (Claude & humains)

Tu reprends ce projet ? Lis dans cet ordre, tout est dans le repo :

| Ordre | Fichier | Pour quoi |
|---|---|---|
| 1 | **`HANDOVER.md`** | Démarrer en local, scripts, déploiement, accès à récupérer |
| 2 | **`.env.example`** | Toutes les variables d'environnement (commentées) à copier en `.env.local` |
| 3 | **`memory/ARCHITECTURE.md`** | Routes API, modèles Prisma, flux de données, design system, sécurité |
| 4 | **`memory/TASKS.md`** + **`memory/BACKLOG.md`** | Ce qui reste à faire (urgent / non urgent) |
| 5 | **`memory/CHANGELOG.md`** | Historique des changements (avec section *Impact*) |
| — | **`README.md`** | Conventions de nommage et de code |

Le reste de **ce fichier** = contexte projet détaillé (stack, structure, décisions, fichiers critiques, règles de travail). C'est la source de vérité ; les fichiers ci-dessus en sont les approfondissements.

---

## Projet

**uvibes.fr** — Next.js 15 App Router, TypeScript, MUI, WordPress headless.
Stage de développement — travail en binôme humain + Claude Code.
**Push uniquement après validation du tuteur.**

Ce n'est plus un simple site vitrine. Le projet contient désormais **3 briques** :
1. **Site vitrine** — pages marketing (home, solution, à propos, blog, légales).
2. **Funnel de devis** — `/devis` : formulaire en étapes → calcul → page devis → **signature en ligne** (acceptation documents + code promo) → **PDF** + **envoi email**.
3. **Dashboard admin** (`/admin`) — CMS (contenu, tarification, plans, features, témoignages, équipe, partenaires), gestion des **devis**, **codes promo**, **RDV**, **newsletter**, **collectifs** (embryon CRM), maintenance.

---

## Stack

| Outil | Version |
|---|---|
| Next.js | 15.3 (App Router) |
| React | 19 |
| TypeScript | 5 |
| MUI + Emotion | 7 |
| pnpm | 10.30 |
| Turbopack | dev only |
| Swiper | 11 |
| react-hook-form | 7 |
| nodemailer | 7 |
| **Prisma** | 5.22 |
| **iron-session** | 8 (auth admin) |

**CMS contenu :** WordPress headless — `${NEXT_PUBLIC_API_URL}` → `wp.uvibes.fr` (REST API v2)
**Base de données :** **PostgreSQL / Supabase dédiée** (≠ projet `bizz`) via Prisma — `DATABASE_URL` (pooler) + `DIRECT_URL`. Modèles : `Quote`, `Collectif`, `PromoCode`, `RdvReservation`, `RdvDisponibilite`, `NewsletterSubscriber`, `Plan`, `Feature`, `PlanFeature`, `Partner`, `Testimony`, `TeamMember`, `CmsContent`, `AdminUser`.

---

## Structure

```
prisma/
└── schema.prisma             # Schéma DB (PostgreSQL/Supabase) — voir Stack pour les modèles
src/
├── app/
│   ├── page.tsx              # Homepage — Server Component
│   ├── layout.tsx            # Layout global, metadata, GA, cookie consent
│   ├── globals.css           # Variables CSS globales
│   ├── solution/page.tsx     # Page /solution (offres incluses)
│   ├── a-propos/page.tsx     # Page À propos (ex /uvibes)
│   ├── blog/page.tsx         # Page Blog
│   ├── devis/                # Funnel devis public : page.tsx (formulaire) + [id]/ (page devis + signature)
│   ├── rendez-vous/page.tsx  # Prise de RDV
│   ├── mentions-legales/ · conditions-d-utilisation/ · politique-de-confidentialite/ · politique-cookies/
│   ├── admin/                # Dashboard (layout protégé iron-session)
│   │   ├── dashboard/ devis/ promos/ rdv/ collectifs/ newsletter/ maintenance/
│   │   └── cms/              # contenu, tarification, témoignages, équipe, partenaires
│   └── api/                  # Routes serveur (voir memory/ARCHITECTURE.md pour le détail)
│       ├── devis/            # creer, calculer, [id] (pdf, signer)
│       ├── rdv/              # reserver, creneaux, reminders
│       ├── promo/validate · newsletter · sendEmail · testimonials · featured-articles · partners · settings
│       └── admin/            # CRUD protégés : devis, promos, collectifs, rdv, cms/*, auth/*
├── components/
│   ├── devis/                # DevisFormStepper, DevisDocument, SignaturePad
│   ├── admin/                # CrmSidebar, CrudManager, *Manager (devis, promos, rdv, cms…)
│   ├── features/             # PricingTable, PricingMobile, OffreEvenementielle, PricingData.ts
│   └── flyers/FlyerGallery.tsx   # Galerie 18 flyers filtrables
├── styles/                   # CSS par composant (1 fichier = 1 composant)
├── services/                 # Fetch + logique métier
│   ├── crm/                  # calculateQuote, sendQuoteEmail, generateQuoteNumber, sendPromoEmail
│   ├── pdf/generateQuotePdf.ts   # Génération PDF devis (React → PDF)
│   ├── rdv/sendRdvReminder.ts
│   └── home/ blog/ team/ testimony/ pricing/ …
├── data/
│   ├── menu/MenuData.tsx     # Items du menu
│   └── flyers/flyersData.ts  # Données des 18 flyers par profil
├── lib/
│   ├── prisma.ts             # Client Prisma singleton
│   ├── session.ts · sessionOptions.ts   # iron-session (auth admin)
│   ├── seo.ts · rateLimit.ts · csv.ts · escapeHtml.ts · maintenanceState.ts
├── types/ · utils/
public/
├── images/flyer/ · fonts/ (Supreme, Bevellier) · videos/
```

---

## Navigation — état actuel du menu

| Label | Route | Notes |
|---|---|---|
| Accueil | `/` | |
| La solution | `/solution` | Fusion Avantages + Fonctionnement |
| À propos | `/a-propos` | Anciennement `/uvibes` |
| Blog | `/blog` | |
| Prendre RDV | `/rendez-vous` | |
| Devis | `/devis` | Funnel de devis en ligne |
| Connexion | `https://app.uvibes.fr/welcome` | Icône gradient |

**Redirections 301 actives :** `/avantages` → `/solution`, `/features` → `/solution`
**Routes renommées (301 + sitemap) :** `/uvibes`→`/a-propos`, `/rdv`→`/rendez-vous`, `/mention-legale`→`/mentions-legales`, `/conditions-dutilisation`→`/conditions-d-utilisation`.

---

## Page /solution — section offres

La section « Nos offres » affiche **4 offres** (décision Missions Falek) :

| Offre | Prix HT/an | Composant |
|---|---|---|
| Vibes Connection | **3 980 €** | `PricingTable` (colonne) |
| Vibes Premium | **4 980 €** | `PricingTable` (colonne) |
| Vibes Boost | **5 980 €** | `PricingTable` (colonne) |
| Offre événementielle | sur devis | `OffreEvenementielle` — à **intégrer dans la même section** que les 3 autres |

Matrice de fonctionnalités : voir `src/components/features/PricingData.ts` (source de vérité du tableau d'offres). Prix de référence = tableau PDF du document mission (3980/4980/5980).

---

## Plateforme — funnel devis, signature, admin

### Funnel de devis (`/devis`)
1. `DevisFormStepper` (3 étapes : collectif → usages → coordonnées) → `POST /api/devis/creer` → crée un `Quote` + `Collectif`.
2. Redirection vers `/devis/[id]` : page du devis + `DevisDocument` + `SignaturePad`.
3. Signature → `POST /api/devis/[id]/signer` : valide l'**acceptation des documents** + **revalide le code promo côté serveur** (`PromoCode`), génère le **PDF** (`generateQuotePdf`) et **envoie les emails** (`sendQuoteEmail` → client + `notifyDirectrice`).

### Codes promo
Modèle `PromoCode` (code, pourcentage, actif, expiresAt, usageMax, usageCount). Gérés dans `/admin/promos`, validés via `/api/promo/validate` et re-vérifiés à la signature. Décision : le **champ code doit être exposé dans le funnel** (pas seulement à la signature).

### Authentification admin
`iron-session` (`src/lib/session.ts`). Login `/admin/login` → `/api/admin/auth/login|me|logout`. Layout `/admin/layout.tsx` protège toutes les sous-routes.

---

## Décisions « Missions Falek » (à implémenter — voir TASKS.md)

| Sujet | Décision actée |
|---|---|
| **Prix des 3 offres** | 3 980 / 4 980 / 5 980 €/an (tableau PDF mission fait foi). Corriger les prix incohérents du `DevisFormStepper` (2990/4990/7990). |
| **4ème offre** | = l'offre événementielle existante (`OffreEvenementielle`), à présenter **dans la même section** que les 3 autres. |
| **Code réduction** | Système `PromoCode` déjà en place → l'**exposer dans le funnel** de devis. |
| **Acceptation documents** | Différenciée par offre : 3 offres annuelles = **CGV + DPA (accord traitement données) + SLA (annexe niveau de service)** ; offre événementielle = **CGV + PDD (politique de protection des données)**. Aujourd'hui un seul `termsAccepted` → à éclater. |
| **Hébergement des 4 documents** | CGV, DPA, SLA, PDD à servir (pages web). Versions de référence : « 30 mai 2026 ». |
| **Édition des documents depuis l'admin** | **Éditeur de texte stocké en base** (pas d'upload PDF) → indexable + vraiment éditable. Nouveau module CMS « documents légaux ». |
| **CRM** | Reste **dans ce repo**, sur **Prisma + Supabase dédiée** (≠ bizz). Périmètre large (contacts, pipeline, interactions, tâches, marketing, support, documents, reporting) → à **phaser**. |
| **Accessibilité / cross-browser** | Missions I & II : audit a11y (axe-devtools / Tanaguru) + compat navigateurs. |
| **Notification RDV** | Prévenir la directrice à chaque prise de RDV (`/api/rdv/reserver`). |

---

## Variables CSS clés (src/app/globals.css)

```css
--mainColor: #fd6e00       /* Orange */
--secondaryColor: #d90a5c  /* Rose */
--blueUvibes: #00AFDD      /* Bleu */
--bckgColor: #f8f9fa       /* Fond */
--gradientColor: linear-gradient(90deg, #fd6e00 0%, #f62570 100%)
--section-padding-v: 4.5rem
--section-padding-h: 2rem (clamp responsive)
--border-radius: 8px
--text-font: "Supreme-Light"
--text-font-bold: "Supreme-Bold"
```

---

## Style de travail

Le tuteur veut garder un feeling artisanal dans le code.
Cela signifie concrètement :

- Faire des changements petits et ciblés — jamais réécrire un fichier entier
- Expliquer chaque modification en 2-3 lignes simples avant de la faire
- Conserver le style et les conventions déjà présentes dans le fichier
- Pas de code over-engineered — la solution la plus simple qui fonctionne
- Je dois comprendre chaque ligne avant de l'accepter — si ce n'est pas clair, tu m'expliques
- Ne jamais générer 200 lignes d'un coup — on avance étape par étape
- Les commentaires dans le code restent dans le même style que l'existant
- **Chaque tâche doit être complète et vérifiée avant de la déclarer terminée** — relire le fichier modifié, vérifier qu'il ne manque rien, ne pas attendre que le tuteur signale un oubli

---

## Règles de travail

### Git
- Jamais travailler sur `main` directement
- Convention branches : `fix/nom`, `feat/nom`, `perf/nom`, `refactor/nom`
- Convention commits : `fix:` / `feat:` / `perf:` / `refactor:` / `style:` + description courte en français
- **Branche = un sujet / une PR** (ex: `feat/seo-metadata` regroupe toutes les tâches SEO liées)
- **Commit = une tâche terminée** — committer immédiatement dès qu'une tâche est `[x]`, sans attendre la suivante

### Code
- Toujours utiliser `<Image>` de next/image, jamais `<img>` brut
- `"use client"` uniquement si vraiment nécessaire (hooks, event handlers)
- Préférer CSS media queries au hook `Resize` pour le responsive
- Chaque composant a son fichier CSS dans `src/styles/` — pas de styles inline sauf exception

### Playwright MCP — vérification visuelle UI
Un serveur MCP Playwright est configuré dans `.claude/settings.json`.
**Règle : pour tout changement UI/CSS, prendre un screenshot avant et après avec Playwright.**
- URL locale : `http://localhost:3000` (nécessite `pnpm dev` lancé)
- Viewports à tester : desktop 1280px et mobile 390px
- Ne pas déclarer un changement UI terminé sans avoir vu le screenshot

### Tests avant push
1. `pnpm dev` → screenshot Playwright desktop + mobile (voir règle ci-dessus)
2. Vérifier la console navigateur (F12) — zéro erreur
3. `pnpm build` → doit compiler sans erreur
4. Mettre à jour TASKS.md + CHANGELOG.md

### CHANGELOG — règle d'impact
Chaque entrée CHANGELOG doit inclure une section **Impact** qui explique ce que le changement apporte concrètement :
- Pour le SEO : ce que Google voit maintenant qu'il ne voyait pas avant
- Pour les perfs : gain mesuré (taille, temps, score)
- Pour la sécurité : ce qui était vulnérable et comment c'est corrigé
- Pour l'UX : ce que l'utilisateur ressent différemment
Ne pas écrire "améliore le SEO" — écrire *pourquoi* et *comment* concrètement.

---

## Points d'attention — NE PAS OUBLIER

- **Double source de vérité des prix/offres** : `usePricing.ts` lit WordPress, le devis/admin lit la DB (`Plan`), et `PricingData.ts` / `DevisFormStepper` ont des valeurs en dur **incohérentes** (3980/4980/5980 vs 2990/4990/7990) → à unifier (TASKS C2 + Missions Falek).
- **DB Supabase dédiée** (≠ bizz) : ne jamais pointer vers une autre base. En local, `DIRECT_URL` peut être injoignable → appliquer le schéma via `db push` sur le pooler.
- Hook `Resize` dans `src/services/resize/resize.ts` → encore utilisé dans `AvantagesPageClient` → **remplacer par media queries** (BACKLOG PERF-06)
- Typo prop : `videoSrcDdesktop` (double d) dans `videoCard.tsx` → **à corriger** (BACKLOG CODE-01)
- Typo fichier : `mochupHome.png` → **à corriger en** `mockupHome.png` (BACKLOG CODE-02)
- `Supreme-Bold` n'a pas de woff2 déclaré → sous-optimal (BACKLOG PERF-07)
- Emails HTML : échapper les champs utilisateur (`escapeHtml`) dans `rdv/reserver` et `sendEmail` (TASKS S5)

---

## Fichiers critiques

| Fichier | Rôle |
|---|---|
| `prisma/schema.prisma` | Schéma DB (Quote, PromoCode, Collectif, Rdv*, Plan, Feature…) |
| `src/lib/prisma.ts` | Client Prisma singleton |
| `src/lib/session.ts` / `sessionOptions.ts` | Auth admin (iron-session) |
| `src/app/layout.tsx` | Layout global, metadata, GA, cookie consent |
| `src/app/page.tsx` | Homepage — Server Component |
| `src/app/globals.css` | Toutes les variables CSS |
| `src/app/solution/page.tsx` | Page La solution (offres + 4ème offre) |
| `src/app/admin/layout.tsx` | Layout admin protégé + `CrmSidebar` |
| `src/components/devis/DevisFormStepper.tsx` | Funnel devis (3 étapes) |
| `src/components/devis/SignaturePad.tsx` | Signature en ligne du devis |
| `src/app/api/devis/[id]/signer/route.ts` | Signature : acceptation docs + promo + PDF + email |
| `src/app/api/devis/creer/route.ts` | Création devis + collectif |
| `src/services/crm/calculateQuote.ts` | Calcul du prix du devis |
| `src/services/pdf/generateQuotePdf.ts` | Génération PDF du devis |
| `src/services/crm/sendQuoteEmail.ts` | Emails devis (client + directrice) |
| `src/components/features/PricingData.ts` | Données du tableau d'offres |
| `src/components/features/OffreEvenementielle.tsx` | 4ème offre (événementielle) |
| `src/lib/seo.ts` | Constantes SEO + helper buildMetadata() |
| `src/services/home/fetchHomeContent.ts` | Fetch WP pour titre/desc homepage |
| `src/components/menu/Menu.tsx` | Navbar desktop + bottom nav mobile |
| `src/components/flyers/FlyerGallery.tsx` | Galerie 18 flyers filtrables |
| `src/lib/maintenanceState.ts` | Mode maintenance |
| `src/data/menu/MenuData.tsx` | Items du menu |
| `src/data/flyers/flyersData.ts` | Données des 18 flyers |

---

## Suivi des tâches

Voir `memory/TASKS.md` pour la liste complète avec statuts.
Voir `memory/CHANGELOG.md` pour l'historique des changements.
Voir `memory/BACKLOG.md` pour les tâches non urgentes.
Voir `memory/ARCHITECTURE.md` pour l'architecture détaillée (routes API, modèles, flux).

### Règle : triage automatique des tâches

Quand tu identifies une nouvelle tâche en cours de travail :
- Si elle est **critique ou importante** (perf, SEO, sécurité, bug visible) → l'ajouter dans `memory/TASKS.md`
- Si elle est **non urgente** (typo, refactor cosmétique, amélioration mineure) → l'ajouter dans `memory/BACKLOG.md`

Ne jamais bloquer le travail en cours pour une tâche backlog — juste la noter et continuer.
