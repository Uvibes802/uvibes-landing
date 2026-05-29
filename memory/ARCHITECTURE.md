# ARCHITECTURE.md — Uvibes Site Vitrine

> Lu par Claude Code. Source de vérité de la structure du projet.
> **Mettre à jour immédiatement après chaque changement structurel.**
> Dernière mise à jour : 2026-05-29

---

## Stack technique

```
Navigateur → Next.js 15 App Router (uvibes.fr) → WordPress Headless (wp.uvibes.fr)
```

---

## Pages & Routes

```
/                             src/app/page.tsx                ✅ Server Component (PERF-01)
/avantages                    src/app/avantages/page.tsx       ✅ Server Component (SEO-03)
/features                     src/app/features/page.tsx        ✅ Server Component (SEO-03)
/blog                         src/app/blog/page.tsx            ✅ Server Component (SEO-03)
/blog/[slug]                  src/app/blog/[slug]/page.tsx     ✅ Server Component + generateMetadata Yoast
/uvibes                       src/app/uvibes/page.tsx          ✅ Server Component (SEO-03)
/admin                        src/app/admin/page.tsx           ✅ mot de passe via .env.local (SEC-02)
/mention-legale               src/app/mention-legale/page.tsx
/conditions-dutilisation      src/app/conditions-dutilisation/page.tsx
/politique-de-confidentialite src/app/politique-de-confidentialite/page.tsx
/politique-cookies            src/app/politique-cookies/page.tsx

API:
/api/sendEmail                src/app/api/sendEmail/route.ts        ✅ rate limiting 5 req/min (SEC-01)
/api/maintenance              src/app/api/maintenance/route.ts
/api/testimonials             src/app/api/testimonials/route.ts     ✅ fetch WP côté serveur (CORS fix)
/api/featured-articles        src/app/api/featured-articles/route.ts ✅ fetch WP tag homepage-article (CORS fix, cache no-store)

Fichiers spéciaux:
src/app/layout.tsx            ✅ force-dynamic retiré, SEO defaults, Menu + RevealObserver global
src/app/globals.css           Variables CSS globales
src/app/sitemap.ts            Sitemap XML
src/app/robots.ts             Robots.txt
```

---

## Composants par page

### Homepage (/)
```
HomeHero             components/banner/HomeHero.tsx          "use client" — 16 blobs, AppMockup, chips
ConversationIntro    components/section/ConversationIntro.tsx "use client" — philosophie, mockup phone/mac, vidéo aléatoire
  → PhoneMockup      (inline) — portrait videos (Isaline)
  → MacMockup        (inline) — landscape videos (à venir), animation ouverture rotateX
  → 14 particules CSS flottantes
BannerCount          components/section/BannerCount.tsx      "use client" — compteur, score 4.9/5, 3 VibrationLines
ValuePillars         components/section/ValuePillars.tsx     "use client" — 2 cartes glass, IntersectionObserver
CollectifsSection    components/collectifs/CollectifsSection.tsx "use client" — 11 collectifs, pills ticker full-bleed, 6 VibrationLines pleine largeur, 8 particules
PartnerCarousel      components/carousel/PartnerCarousel.tsx "use client" — marquee logos, titre gradient 38px
HowItWorks           components/section/HowItWorks.tsx       "use client" — zigzag scroll reveal, tampon cercles, connecteur draw
VideoSection         components/section/VideoSection.tsx     "use client" — 1 témoignage rotatif (5.5s), 24 étoiles ★ animées
FeaturedArticles     components/section/FeaturedArticles.tsx "use client" — magazine cover reveal, fetch /api/featured-articles
Contact              components/contact/contact.tsx          sonar ripple animation (4 cercles), server
Footer               components/footer/Footer.tsx
```

### Avantages (/avantages)
```
HeroBanner                                       Server Component — rendu une fois (H1 unique)
JsonLd (BreadcrumbList)                          JSON-LD SEO
AvantagesPageClient  components/avantages/       "use client" — Resize + vidéo + Calendly
  AvantagesContent / AvantagesContentDesktop     (selon isMobile)
  video natif                                    ⚠️ pas next/image
  PopupButton (react-calendly)
PartnerBanner        components/banner/           "use client" (dépendance MUI styled)
AppointmentSection   components/section/          "use client"
FloatingMenu / Footer
```

### Features (/features)
```
HeroBanner
JsonLd (SoftwareApplication + BreadcrumbList)    JSON-LD SEO
FunctOrganisation    components/funct/            "use client" (useState)
FeaturesCard         components/cards/            "use client"
PricingTable         components/features/         "use client"
PartnerBanner        components/banner/           "use client"
AppointmentSection / FloatingMenu / Footer
```

### Blog (/blog)
```
HeroBanner
JsonLd (BreadcrumbList)                          JSON-LD SEO
AllArticle           components/blog/             "use client" (useRouter + useState)
  → utilise useBlogArticles(slug) × 6            services/blog/useBlogArticles.ts (hook générique)
  Slugs: entreprise-article, education-article, science-et-societe,
         personnes-sensibles-aux-échanges, uvibes-article, experiences-inattendues
FloatingMenu / Footer
```

### /solution (nouvelle page)
```
SolutionHero         components/solution/SolutionHero.tsx  "use client" — MacBook premium, 4 vidéos aléatoires, gradient saturé 6 blobs
SolutionTabs         components/solution/SolutionTabs.tsx  "use client" — 3 onglets pills gradient sticky
  Comment ça marche ?→ FunctOrganisation + FeaturesCard
  Avantages          → AvantagesHome + AvantagesContent
  Nos offres         → PricingTable
PartnerBanner / AppointmentSection / Footer
```

### Composants partagés nouveaux (session 3)
```
RevealObserver       components/shared/RevealObserver.tsx  "use client" — IntersectionObserver global sur .v-reveal
GradientVibrationLine components/shared/GradientVibrationLine.tsx — SVG SMIL animé, dégradé linéaire
```

### Blog Article (/blog/[slug]) ✅ Server Component
```
ArticleContent       components/blog/article.tsx
generateMetadata()   Yoast SEO depuis WP API (title, description, canonical, OG)
```

### Uvibes (/uvibes)
```
HeroBanner
JsonLd (Organization)                            JSON-LD SEO
TeamSection          components/section/TeamSection.tsx
HelloAssoDon         components/uvibes/HelloAssoDon.tsx  "use client" (useState)
Image TeamUvibes.jpg ✅ compressée 24MB → 3.9MB, hauteur responsive via CSS (.uvibes-team-image)
AppointmentSection / FloatingMenu / Footer
```

### Layout global (toutes les pages)
```
CookieConsent        components/cookieConsent.tsx
MaintenanceWrapper   components/maintenance/MaintenanceWrapper.tsx
Google Analytics 4   Script next/script
Roboto               next/font/google
SEO defaults         lib/seo.ts → metadataBase, robots, openGraph, hreflang fr
```

---

## Fichiers SEO centralisés

```
src/lib/seo.ts              Source unique : SITE_URL, SITE_NAME, PAGE_SEO par page, buildMetadata()
src/components/JsonLd.tsx   Composant réutilisable pour injecter du JSON-LD dans le <head>
```

---

## Flux de données

### WordPress API
```
fetchHomeContent()     tags: title-homepage, subtitle-homepage → Homepage HeroBanner
fetchPartners()        tag: partner-logo                       → PartnerCarousel
FetchTestimony()       tag: temoignage                        → Testimony
fetchPostsByTagSlug()  tag: (catégorie)                       → Blog cards (×5 catégories)
featuredArticles()     featured posts                         → FeaturedArticles
useTeamByTag()         tag: (slug)                            → TeamSection
WP REST API            post slug                              → blog/[slug] page + metadata Yoast
```

### Données statiques
```
data/menu/MenuData.tsx          → Menu.tsx
data/benefits/benefitsData.tsx  → BenefitsHomeSection.tsx
data/features/featuresData.tsx  → FunctSection.tsx
data/maintenance.json           → lib/maintenanceState.ts → layout.tsx
components/features/PricingData.ts → PricingTable.tsx
```

### Formulaire Contact
```
formContact.tsx → POST /api/sendEmail → nodemailer → Gmail OAuth2
Variables: EMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
```

---

## Services & Hooks

```
services/resize/resize.ts          ⚠️ Hook Resize — encore utilisé dans AvantagesPageClient
                                   À remplacer progressivement par CSS media queries (BACKLOG PERF-06)
services/home/fetchHomeContent.ts  Fetch WP titre/description homepage
services/home/fetchPartners.ts     Fetch logos partenaires
services/blog/article.ts           fetchPostsByTagSlug, fetchFeaturedImageByPostSlug
services/blog/sanitize.ts          Nettoyage HTML WP — compatible SSR (FIX-01)
services/blog/getExcerpt.ts        Résumé article
services/blog/featuredArticles.ts  Articles mis en avant
services/blog/blog*.ts (×5)        Articles par catégorie
services/testimony/testimony.ts    FetchTestimony hook
services/team/team.ts              useTeamByTag hook
services/pricing/usePricing.ts     Données pricing
utils/videoUrl.ts                  URL vidéo
lib/maintenanceState.ts            Lit/écrit data/maintenance.json
lib/seo.ts                         Constantes SEO + helper buildMetadata()
```

---

## Variables d'environnement

```
NEXT_PUBLIC_API_URL              URL WordPress
NEXT_PUBLIC_GOOGLE_ANALYTICS     ID GA4
ADMIN_PASSWORD                   Mot de passe page admin (SEC-02)
EMAIL_USER                       Gmail expéditeur
GOOGLE_CLIENT_ID                 OAuth2 Google
GOOGLE_CLIENT_SECRET             OAuth2 Google
GOOGLE_REFRESH_TOKEN             OAuth2 Google
```

---

## Images importantes

```
public/images/TeamUvibes.jpg      ✅ compressée 24MB → 3.9MB (PERF-02)
public/images/TeamUvibesHome.jpg  ✅ compressée 5.9MB → 3.1MB (PERF-02)
public/images/mochupHome.png      ⚠️ typo dans le nom — à renommer mockupHome.png (BACKLOG CODE-02)
public/images/uvibes-section.png  Image OG par défaut (temporaire — voir BACKLOG CONTENT-01)
public/images/mockupFeature.png
public/images/MockupAvantage.png
public/images/mockupBlog.png
```

---

## Règle de mise à jour

Mettre à jour memory/ARCHITECTURE.md après chaque :
- Nouveau composant créé/supprimé
- Nouvelle page/route ajoutée
- Flux de données modifié
- Variable env ajoutée
- Problème résolu → retirer le ⚠️
