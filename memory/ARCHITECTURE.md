# ARCHITECTURE.md — Uvibes (vitrine + plateforme)

> Source de vérité de la structure du projet.
> Dernière mise à jour : 2026-06-23

---

## Stack technique

```
Navigateur → Next.js 15 App Router (uvibes.fr) → WordPress Headless (wp.uvibes.fr)  [contenu : home, blog, témoignages, partenaires, équipe]
                                                → CloudFront CDN (vidéos témoignages)
                                                → Prisma → PostgreSQL / Supabase dédiée  [devis, promos, RDV, newsletter, collectifs, plans/features, CMS contenu, admins]
                                                → Nodemailer (Gmail OAuth)  [emails devis & RDV]
```

3 briques : **(1)** site vitrine · **(2)** funnel de devis public `/devis` (formulaire → calcul → signature → PDF → email) · **(3)** dashboard admin `/admin` (CMS + devis + promos + RDV + newsletter + collectifs).

DB = **Supabase propre au projet**, distincte de celle de `bizz`. Connexion via `DATABASE_URL` (pooler) + `DIRECT_URL`.

---

## Pages & Routes

```
Public:
/                          src/app/page.tsx                 ✅ Server Component (+ JSON-LD Organization/WebSite)
/solution                  src/app/solution/page.tsx        ✅ Server Component (offres + 4ème offre Vibes Découverte)
/tarifs                    src/app/tarifs/page.tsx          ✅ PricingTable + SmallOrgCta
/blog · /blog/[slug]       src/app/blog/…                   ✅ SC + generateMetadata Yoast
/a-propos                  src/app/a-propos/page.tsx        ✅ (ex /uvibes)
/avantages · /features     redirect 301 → /solution (next.config.ts) — pages mortes, jamais servies
/rendez-vous               src/app/rendez-vous/page.tsx     (ex /rdv)
/documents/[slug]          src/app/documents/[slug]/page.tsx — CGV/DPA/SLA/PDD servies depuis la base (LegalDocument)
/devis · /devis/[id]       funnel devis + page devis/signature
/mentions-legales · /conditions-d-utilisation · /politique-de-confidentialite · /politique-cookies

i18n (11 langues) :
/{en,es,de,it,pt,ru,zh,ja,hi,ar}            accueil traduit
/{lang}/method · /about · /pricing          méthode · à propos · tarifs (blog + légales restent FR)
   → hreflang complet + x-default via buildMetadata() / hreflangFor() (src/lib/seo.ts)

Admin (🔒 iron-session — layout protégé):
/admin/login                                                login
/admin/dashboard                                            métriques + derniers devis
/admin/devis · /admin/devis/nouveau · /admin/devis/[id]     gestion devis
/admin/promos                                               codes promo
/admin/rdv                                                  réservations + disponibilités
/admin/collectifs · /admin/collectifs/[id]                  fiches (embryon CRM)
/admin/newsletter · /admin/maintenance
/admin/cms/{contenu,tarification,temoignages,equipe,partenaires}

API publiques (rate-limit sur les routes à écriture/email) :
/api/devis/creer · /api/devis/calculer · /api/devis/[id] · /api/devis/[id]/pdf · /api/devis/[id]/signer
/api/rdv/reserver (3/h) · /api/rdv/creneaux · /api/rdv/calendar · /api/rdv/reminders
/api/promo/validate · /api/newsletter · /api/sendEmail  (escapeHtml sur les emails)
/api/testimonials · /api/partners · /api/team · /api/plans · /api/settings · /api/maintenance  (fetch WP/DB côté serveur)

API admin (🔒 middleware iron-session) :
/api/admin/auth/{login,me,logout} · /api/admin/account/change-password
/api/admin/devis · /api/admin/devis/[id] · /[id]/envoyer · /[id]/facture
/api/admin/promos(/[id], /send) · /api/admin/collectifs(/[id], /export)
/api/admin/rdv/{reservations,disponibilites}(/[id], /reminder)
/api/admin/crm/{interactions,tasks}(/[id])           — embryon CRM
/api/admin/documents(/[id], /[id]/pdf) · /api/admin/upload
/api/admin/newsletter/export
/api/admin/cms/{articles,content,plans,features,team,testimonials,partners,documents}(/[id], /sync-wp)
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

## Page /a-propos (ex /uvibes)

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

## Funnel de devis (/devis)

```
DevisFormStepper   components/devis/DevisFormStepper.tsx  3 étapes : collectif → usages → coordonnées
   → POST /api/devis/creer        crée Collectif + Quote (statut BROUILLON), calcule le prix
   → redirection /devis/[id]
DevisDocument      components/devis/DevisDocument.tsx     rendu du devis
SignaturePad       components/devis/SignaturePad.tsx      signature manuscrite (canvas)
   → POST /api/devis/[id]/signer  vérifie acceptation documents + re-valide PromoCode (serveur),
                                  passe le devis à SIGNE, génère le PDF, envoie les emails
calculateQuote     services/crm/calculateQuote.ts         logique de prix (utilisateurs × durée × remise)
generateQuoteNumber services/crm/generateQuoteNumber.ts   numéro unique
generateQuotePdf   services/pdf/generateQuotePdf.tsx       PDF (React → PDF) + annexes documents légaux
sendQuoteEmail     services/crm/sendQuoteEmail.ts          email client + notifyDirectrice (nodemailer)
```

✅ Fait (Missions Falek) : champ **code promo** exposé · **acceptation différenciée des documents** (CGV+DPA+SLA pour les 3 offres annuelles, CGV+PDD pour Vibes Découverte — voir `requiredDocsForPlan` dans `lib/legalDocs`) · prix corrigés (3980/4980/5980).

---

## Dashboard admin (/admin/*)

```
Layout   : app/admin/layout.tsx (iron-session) + components/admin/CrmSidebar.tsx (glass)
Auth     : /admin/login → /api/admin/auth/* (iron-session)
Dashboard: métriques glass, tableau derniers devis
Devis    : liste, détail (DevisDetailClient), AdminDevisForm, PDF, envoi
Promos   : PromoManager (CRUD PromoCode + envoi email)
RDV      : RdvManager (réservations + disponibilités + relance)
Collectifs: CollectifFicheClient (embryon CRM)
Newsletter: NewsletterManager (table abonnés, filtres, export CSV)
CMS      : CmsContentManager, TarificationManager, EquipeManager, CrudManager (témoignages/partenaires/…)
            + SyncWpButton (synchro WordPress)
Maintenance: MaintenanceToggle
```

✅ Fait : module CMS **« documents légaux »** (éditeur texte en base — `LegalDocument`, servis en `/documents/[slug]` + annexés au PDF). Embryon **CRM** en place : `crm/interactions`, `crm/tasks`. À phaser ensuite : pipeline, marketing, support, reporting.

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

Prisma → PostgreSQL / Supabase dédiée (modèles schema.prisma):
  Quote                  → devis (statut, prix, signature, promo, PDF, envoi)
  Collectif              → organisation rattachée au devis (embryon CRM)
  PromoCode              → codes réduction (pourcentage, usage, expiration)
  RdvReservation / RdvDisponibilite → /api/rdv/*
  NewsletterSubscriber   → /api/newsletter
  Plan / Feature / PlanFeature → offres (source DB, en parallèle de PricingData.ts → à unifier)
  Partner / Testimony / TeamMember / CmsContent → CMS (synchro WP possible)
  AdminUser              → auth admin (iron-session)
```

---

## Variables d'environnement

```
NEXT_PUBLIC_API_URL              URL WordPress
NEXT_PUBLIC_CLOUDFRONT_URL       CDN vidéos (fallback hardcodé)
NEXT_PUBLIC_GOOGLE_ANALYTICS     ID GA4
DATABASE_URL                     Prisma — Supabase pooler (port 6543)
DIRECT_URL                       Prisma — connexion directe (migrations ; injoignable en local → db push sur le pooler)
IRON_SESSION_SECRET              iron-session (≥ 32 car. ; obligatoire en prod, sinon l'app refuse de démarrer)
NEXT_PUBLIC_SITE_URL             URL de base pour sitemap/robots/hreflang (défaut https://uvibes.fr)
EMAIL_USER / GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN   Nodemailer (Gmail OAuth)
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

## Sécurité (résumé)

- Middleware (`src/middleware.ts`) protège `/admin/*` (hors login) et `/api/admin/*` (hors `/auth/*`).
- **Timeout d'inactivité 2 h** (`IDLE_TIMEOUT_MS`), plafond cookie 1 j ; iron-session chiffré `httpOnly`+`secure`+`sameSite=lax` ; mots de passe bcrypt.
- Headers (`next.config.ts`) : X-Frame-Options, nosniff, HSTS, Referrer/Permissions-Policy, **CSP en report-only** (à basculer bloquant).
- Rate-limit : login, RDV, newsletter, promo, devis, contact. `escapeHtml` sur les emails.
- SEO/GEO : `public/llms.txt`, JSON-LD Organization/WebSite sur l'accueil, hreflang + x-default.

---

## Points d'attention (BACKLOG)

- **Upload admin** (`/api/admin/upload`) écrit sur disque local → **KO en serverless (Vercel, FS read-only)** ; seul le collage d'URL marche. Cible : Supabase Storage / S3.
- Hook `Resize` → remplacer par CSS media queries (PERF-06)
- `Supreme-Bold` n'a pas de woff2 (PERF-07)
- Typo fichier `mochupHome.png` → renommer `mockupHome.png` (CODE-02)
- Logos partenaires `upc.png`/`ffhb.png` → 400 (MEDIA-01)
- 3 vidéos uvibes chargent toutes en `autoPlay` sans lazy-loading → optimiser (PERF)
