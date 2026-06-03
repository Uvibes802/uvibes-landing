# ARCHITECTURE.md — Uvibes Site Vitrine

> Source de vérité de la structure du projet.
> Dernière mise à jour : 2026-06-04

---

## Stack technique

```
Navigateur → Next.js 15 App Router (uvibes.fr) → WordPress Headless (wp.uvibes.fr)
                                                → CloudFront CDN (vidéos)
                                                → Prisma + DB (newsletter, devis, RDV)
```

---

## Pages & Routes

```
/                     src/app/page.tsx                ✅ Server Component
/solution             src/app/solution/page.tsx        ✅ Server Component
/blog                 src/app/blog/page.tsx            ✅ Server Component
/blog/[slug]          src/app/blog/[slug]/page.tsx     ✅ Server Component + generateMetadata Yoast
/uvibes               src/app/uvibes/page.tsx          ✅ Server Component
/avantages            src/app/avantages/page.tsx       ✅ redirect 301 → /solution (next.config.ts)
/features             src/app/features/page.tsx        ✅ redirect 301 → /solution (next.config.ts)
/rdv                  src/app/rdv/page.tsx
/devis                src/app/devis/page.tsx
/mention-legale       src/app/mention-legale/page.tsx
/conditions-dutilisation
/politique-de-confidentialite
/politique-cookies

Admin:
/admin                src/app/admin/page.tsx           🔒 mot de passe .env.local
/admin/crm/*          src/app/admin/crm/               ✅ CRM complet

API:
/api/sendEmail        rate limiting 5 req/min
/api/newsletter       POST inscription / DELETE désinscription
/api/testimonials     fetch WP côté serveur (CORS fix)
/api/featured-articles fetch WP tag homepage-article (CORS fix)
/api/rdv/reserver     confirmation RDV
/api/crm/*            routes CRM (devis, collectifs, partenaires, témoignages, tarification)
```

---

## Homepage (/) — ordre des sections

```
HomeHero             components/banner/HomeHero.tsx          "use client" — gradient vivid, 16 blobs, AppMockup
  section-fade--bottom                                        fondu vers paper
ConversationIntro    components/section/ConversationIntro.tsx "use client" — philosophie, phone mockup, vidéo
BannerCount          components/section/BannerCount.tsx      "use client" — compteur, score 4.9/5, VibLines
  section-fade--top + section-fade--bottom
ValuePillars         components/section/ValuePillars.tsx     "use client" — 2 cartes glass gradient
CollectifsSection    components/collectifs/CollectifsSection.tsx "use client" — 11 collectifs, pills
PartnerCarousel      components/carousel/PartnerCarousel.tsx "use client" — marquee logos
HowItWorks           components/section/HowItWorks.tsx       "use client" — 3 étapes, zigzag scroll reveal
VideoSection         components/section/VideoSection.tsx     "use client" — témoignage rotatif vivid
  section-fade--top + section-fade--bottom
FeaturedArticles     components/section/FeaturedArticles.tsx "use client" — articles récents
Contact              components/contact/contact.tsx          gradient vivid, section-fade--top
Footer               components/footer/Footer.tsx
```

---

## Page /solution

```
SolutionHero         components/solution/SolutionHero.tsx    "use client" — AppScreen, 14 particules, blobs
SolutionVideoProof   components/solution/SolutionVideoProof.tsx — 3 vidéos CloudFront
SolutionForWho       components/solution/SolutionForWho.tsx  — 3 cards stats
FeaturesCard         components/cards/FeaturesCard.tsx       "use client" — rangées narratives
FunctOrganisation    components/funct/functOrganisation.tsx  "use client" — toggle accordéon
SolutionThemes       components/solution/SolutionThemes.tsx  — grille thématiques
SolutionHowItWorks   components/solution/SolutionHowItWorks.tsx — steps avec rail
PricingTable         components/features/PricingTable.tsx    "use client" — 3 offres glass
```

---

## Page /uvibes

```
Hero gradient (4 blobs rose/pêche, particules lignes + ronds animés CSS-only)
Intro ("La naissance de l'idée") — stats cards glass
TeamSection          components/section/TeamSection.tsx      "use client" — Swiper, 3 onglets WP
Photo équipe         public/images/TeamUvibes.jpg (compressée 3.9MB)
Vidéos témoignages   3 vidéos CloudFront (Isaline/Lisa/Delphine) — autoplay grid
Éthique              3 cards glass
Portage Éclatens     card glass
CTA Rejoindre        gradient orange→rose
```

---

## Pages légales (4 pages)

```
Toutes : legal-hero (gradient orange→rose) + legal-content-card (glass)
Components: src/components/legal/{mention,confidentialite,conditionsUtilisation,cookies}.tsx
```

---

## CRM (/admin/crm/*)

```
Layout   : CrmShell + CrmSidebar (glass backdrop-filter)
Dashboard: métriques glass, tableau derniers devis
Devis    : liste, détail, document PDF, signature
Collectifs, Partenaires, Témoignages, Équipe, Tarification
Newsletter: NewsletterManager (table abonnés, filtres, export CSV)
Maintenance: mode maintenance
```

---

## Composants partagés

```
RevealObserver     components/shared/RevealObserver.tsx  — IntersectionObserver global .v-reveal
VibrationLine      components/shared/VibrationLine.tsx   — SVG SMIL animé
GradientVibrationLine — variante avec dégradé linéaire
AppMockup          components/shared/AppMockup.tsx       — mockup iPhone homepage
section-fade       globals.css .section-fade--top/bottom — fondus vivid↔paper
```

---

## Hook partagé

```
useIntersectionOnce  hooks/useIntersectionOnce.ts — IntersectionObserver générique
useBlogArticles      services/blog/useBlogArticles.ts — fetch articles par tag (remplace 6 services dupliqués)
```

---

## Flux de données

```
WordPress API (wp.uvibes.fr):
  fetchHomeContent()     → titre/desc homepage
  fetchPartners()        → logos partenaires
  FetchTestimony()       → témoignages
  useBlogArticles(slug)  → articles par catégorie (6 catégories)
  WP REST API /blog/[slug] → article + metadata Yoast

CloudFront CDN:
  getVideoUrl(file)      → src/utils/videoUrl.ts → NEXT_PUBLIC_CLOUDFRONT_URL || fallback
  Vidéos : Isaline, Lisa, Delphine, Colette, Nadine, Pierre

Prisma (SQLite/PostgreSQL):
  NewsletterSubscriber   → /api/newsletter
  Devis, Collectif, RDV  → /api/crm/*
```

---

## Variables d'environnement

```
NEXT_PUBLIC_API_URL              URL WordPress
NEXT_PUBLIC_CLOUDFRONT_URL       CDN vidéos (fallback hardcodé)
NEXT_PUBLIC_GOOGLE_ANALYTICS     ID GA4
ADMIN_PASSWORD                   Page admin
EMAIL_USER / GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN
DATABASE_URL                     Prisma
```

---

## Design system

```
Fonts : Supreme-Light (body), Supreme-Bold (titres), Prompt (Google), Instrument Serif (accents titres),
        Roboto / Roboto Mono (Google), Bricolage Grotesque + DM Sans (ValuePillars)
Couleurs principales :
  --orange: #FD6E00   --rose: #D90A5C   --paper: #FFFBF4
Gradient vivid (hero/banner/contact/footer) :
  linear-gradient(135deg, #FD6E00 → #FF8530 → #FFB870 → #FF88B8 → #E6007E → #D90A5C)
Glassmorphism : background rgba(255,255,255,.75-.92) + backdrop-filter: blur(16-20px)
section-fade : fondu 120px en haut/bas des sections vivid vers --paper
```

---

## Points d'attention (BACKLOG)

- Hook `Resize` dans `AvantagesPageClient` → remplacer par CSS media queries (PERF-06)
- `Supreme-Bold` n'a pas de woff2 (PERF-07)
- Typo fichier `mochupHome.png` → renommer `mockupHome.png` (CODE-02)
- 3 vidéos uvibes chargent toutes en `autoPlay` sans lazy-loading → optimiser (PERF)
