# TASKS — Uvibes Site Vitrine

> Tableau de bord des tâches. Mettre à jour le statut au fil de la journée.
> **Branche** = un sujet (regroupe les tâches liées) — **Commit** = une tâche terminée (committer immédiatement).

---

## Convention de numérotation

Chaque tâche a un identifiant unique : `CATÉGORIE-numéro` (ex: SEC-03, PERF-08).
Toujours incrémenter — ne jamais réutiliser un numéro existant.

| Préfixe | Catégorie                                      | Prochain numéro |
|---------|------------------------------------------------|-----------------|
| PERF    | Performance (chargement, SSR, images, cache)   | PERF-08         |
| SEC     | Sécurité (auth, rate limiting, headers, env)   | SEC-03          |
| SEO     | Référencement (metadata, OG tags, canonical)   | SEO-06          |
| A11Y    | Accessibilité (WCAG, aria, contraste)          | A11Y-02         |
| CODE    | Qualité code (typos, refactor, architecture)   | CODE-04         |
| UX      | Expérience utilisateur (formulaires, feedback) | UX-02           |
| FIX     | Corrections de bugs (erreurs, crashes)         | FIX-02          |
| UI      | Interface visuelle (responsive, animations, composants, layout) | UI-04 |
| CONTENT | Contenu (textes, images, vidéos)               | CONTENT-01      |

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

- [x] **PERF-02** — Compresser les images lourdes (TeamUvibes.jpg 24 MB, TeamUvibesHome.jpg 5.9 MB)
  - Fichiers : `public/images/TeamUvibes.jpg`, `public/images/TeamUvibesHome.jpg`, `public/images/mochupHome.png`
  - Branche : `perf/compress-images`

- [x] **PERF-03** — Lazy loading des vidéos avec Intersection Observer
  - Fichiers : `src/components/cards/videoCard.tsx`, `src/components/section/WhyUvibes.tsx`
  - Branche : `perf/lazy-videos`

- [x] **PERF-04** — Supprimer `force-dynamic` du layout
  - Fichiers : `src/app/layout.tsx`
  - Branche : `perf/remove-force-dynamic`

- [x] **SEC-02** — Sortir le mot de passe admin du code source vers `.env.local`
  - Fichiers : `src/app/api/maintenance/route.ts`, `src/app/admin/page.tsx`
  - Branche : `fix/admin-password-env`

---

## 🟡 Important

- [x] **SEO-01** — Créer le fichier central `src/lib/seo.ts`
  - Constants : URL de base, nom du site, image OG par défaut, metadata par page
  - Fichiers : `src/lib/seo.ts` (nouveau)
  - Branche : `feat/seo-metadata`

- [x] **SEO-02** — Enrichir `layout.tsx` avec les defaults SEO
  - Ajouter : `metadataBase`, `robots: index/follow`, `openGraph` par défaut, `hreflang: fr`
  - Fichiers : `src/app/layout.tsx`
  - Branche : `feat/seo-metadata`

- [x] **SEO-03** — Convertir les 4 pages en Server Components + metadata par page
  - Supprimer `"use client"` de chaque page, extraire l'interactif si nécessaire
  - Exporter `metadata` (title, description, canonical, OG) sur chaque page
  - Corrige le double H1 au passage (cause : hydratation client re-rendant HeroBanner)
  - Pages : `avantages/page.tsx`, `features/page.tsx`, `uvibes/page.tsx`, `blog/page.tsx`
  - Nouveau composant : `AvantagesPageClient.tsx` (seul avantages avait besoin d'extraction)
  - Branche : `feat/seo-metadata`

- [x] **SEO-04** — Ajouter les données structurées JSON-LD
  - Créer composant `src/components/JsonLd.tsx` réutilisable
  - `Organization` sur `/uvibes`, `SoftwareApplication` sur `/features`, `BreadcrumbList` sur pages internes
  - Fichiers : `src/components/JsonLd.tsx` (nouveau), pages concernées
  - Branche : `feat/seo-metadata`

- [x] **SEO-05** — Améliorer les ancres du blog
  - Remplacer les `"Lire la suite"` génériques par `"Lire l'article : [titre]"`
  - Fichiers : composant listing articles du blog
  - Branche : `feat/seo-metadata`

- [x] **A11Y-01** — Corriger les problèmes d'accessibilité (boutons sans aria-label, alt incorrects)
  - ~~Double h1 heroBanner~~ ✅ corrigé 2026-05-18
  - ~~Menu.tsx : role/tabIndex/onKeyDown, aria-label boutons, aria-label nav~~ ✅ corrigé 2026-05-19
  - Branche : `fix/accessibility`

- [x] **SEC-01** — Ajouter rate limiting sur `/api/sendEmail` (5 req/min par IP)
  - Fichiers : `src/app/api/sendEmail/route.ts`
  - Branche : `fix/email-rate-limit`

---

## 🟡 Important

- [x] **UI-01** — Polish global CSS : padding responsive, line-height, text-wrap sur titres
  - Fichiers : `src/app/globals.css`
  - Branche : `style/ui-polish`

- [x] **UI-02** — Polish typographie : Supreme-Bold sur titres, letter-spacing H1, tabular-nums
  - Fichiers : `src/app/globals.css`, `src/styles/cards/userNumberCard.css`
  - Branche : `style/ui-polish`

- [x] **UI-03** — Audit UI/UX complet + corrections cohérence visuelle phase 1

---

## 🟡 Important — UX Simplification (branche `refactor/ux-simplification`)

- [x] **UX-02** — Alléger la homepage : retrait FunctSection, InspirationSection, 4 VideoCards, composant Uvibes
  - Branche : `refactor/ux-simplification`

- [x] **UX-03** — Reconfigurer le menu : "Uvibes" → "À propos", supprimer item RDV mort, fusionner Avantages+Fonctionnement → "La solution"
  - Branche : `refactor/ux-simplification`

- [x] **UI-04** — Supprimer waves canvas hero — retour au gradient d'origine
  - Branche : `style/ui-polish`

- [x] **UX-04** — Fusion Avantages + Fonctionnement → page `/solution` avec 3 onglets + galerie flyers
  - Fichiers : `src/app/solution/page.tsx`, `src/components/solution/SolutionTabs.tsx`, `src/components/flyers/FlyerGallery.tsx`, `src/data/flyers/flyersData.ts`
  - Redirections : `/avantages` → `/solution`, `/features` → `/solution`
  - Branche : `refactor/ux-simplification`

- [x] **UX-05** — Restructurer la homepage pour qu'Uvibes soit compris dès les premières secondes
  - WhyUvibes réécrit : Problème → Solution, nouveau titre, texte clair
  - HowItWorks créé : 3 étapes 01/02/03 avec couleurs orange/cyan/vert
  - Branche : `refactor/ux-simplification`

- [x] **UX-06** — Mots clés colorés dans les paragraphes (palette 5 couleurs Uvibes)
  - 9 mots clés dans WhyUvibes, coloration séquentielle au scroll (0.18s entre chaque)
  - Supreme-Bold appliqué simultanément à la couleur
  - Classes `.kw` réutilisables dans globals.css
  - Branche : `refactor/ux-simplification`
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-22

- [x] **UI-05** — Redesign onglet "Pour qui ?" : pills ticker + panneau détail collectifs
  - 11 collectifs avec flyers et contenu "Ce que vous y gagnez / Pourquoi ça fonctionne"
  - Branche : `refactor/ux-simplification`

- [x] **UI-06** — Section AvantagesHome sur la homepage
  - 3 cartes (Entreprises 93% / Enseignement 41% / Collectifs 38%)
  - Branche : `refactor/ux-simplification`

- [x] **FIX-02** — try/catch sur tous les services fetch WordPress (11 fichiers)
  - Fallbacks statiques pour témoignages et compteur utilisateurs
  - Bug sanitize `createElement("p")` corrigé dans citation.ts
  - Branche : `refactor/ux-simplification`

- [x] **CODE-04** — Refactoring : élimination duplications
  - 6 services blog → 1 hook `useBlogArticles(tagSlug)`
  - `sanitizePlainText()` centralisée dans sanitize.ts (team.ts + usePricing.ts migrés)
  - Composant `blogEducationArticle.tsx` inutilisé supprimé
  - `.gitignore` mis à jour (screenshots, .playwright-mcp, audit files)
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-27

- [x] **UI-07** — Déplacer CollectifsSection dans la homepage (remplace Enjeux), supprimer onglet "Pour qui?" dans SolutionTabs
  - `src/app/page.tsx` : `<Enjeux />` → `<CollectifsSection showCta={true} />`
  - `src/components/solution/SolutionTabs.tsx` : onglet "Pour qui?" supprimé, défaut → "comment"
  - Branche : `refactor/ux-simplification`

- [x] **CONTENT-01** — Homepage renommée "Bienvenue" + témoignages → "Ils aiment l'expérience" + étoiles ★★★★★
  - `src/app/page.tsx` : export metadata `title: "Bienvenue | Uvibes"`
  - `src/components/testimony/testimony.tsx` : titre + bloc étoiles ajouté
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-28 (Design v2)

- [x] **UI-08** — Design system v2 : palette vivid, tokens `--ink-*`, `--cream`, `--paper` dans globals.css
  - Remplacement de tous les `#333`, `#666`, `#1a1a1a` par tokens dans 12 fichiers CSS
  - Branche : `refactor/ux-simplification`

- [x] **UI-09** — Hero gradient vivid sur toutes les pages (heroBanner.css)
  - Default, blog, uvibes, features : dégradés orange/rose chauds distincts par page
  - Branche : `refactor/ux-simplification`

- [x] **UI-10** — ConversationIntro : section éditoriale "Et si les conversations clés arrivaient enfin ?"
  - Nouveau composant + CSS, inséré après HomeHero sur la homepage
  - Branche : `refactor/ux-simplification`

- [x] **UI-11** — VideoSection témoignages : 3 cartes magazine asymétriques (gradient / blanc chaud / pêche)
  - Remplace carrousel Swiper, palette v2
  - Branche : `refactor/ux-simplification`

- [x] **UI-12** — FloatingMenu supprimé de toutes les pages, AdvantagesGrid retiré de la homepage
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-29 (UI Refonte globale)

- [x] **UI-13** — Navbar `<Menu />` réintégrée dans `layout.tsx` (avait disparu lors refactoring)
  - `heroBanner.css` : `hero-banner-header-top { display: none }`, padding adapté nav fixe
  - Branche : `refactor/ux-simplification`

- [x] **UI-14** — Hero homepage : gradient plus saturé, 16 blobs, titres en blanc, "puissance" jaune `#FFE456`, "collectif." rose, saut de ligne après "Activez la"
  - Badge "utilisateurs actifs" supprimé
  - Layout responsive : h1 → mockup → sous-titre+CTAs (via `hero-after` grid row 2)
  - Padding texte augmenté `clamp(2.5rem, 7vw, 6rem)`
  - Branche : `refactor/ux-simplification`

- [x] **UI-15** — AppMockup : chips masquées en mobile, mockup agrandi (340px → 280px mobile)
  - Branche : `refactor/ux-simplification`

- [x] **UI-16** — Contact : redesign complet (fond `#f7f1ea`, titre serif italic gradient, infos contact, card formulaire)
  - Formulaire : inputs underline-only, bouton pill gradient `#ff6a00 → #ff007a`, champ Organisation ajouté
  - Branche : `refactor/ux-simplification`

- [x] **UI-17** — Footer : suppression newsletter, gradient `#ff6a00 → #e6007e`, layout brand + nav colonnes
  - Branche : `refactor/ux-simplification`

- [x] **UI-18** — PartnerCarousel : simplification — juste label + marquee logos (64px hauteur)
  - Suppression grille 6 cartes partenaires
  - Branche : `refactor/ux-simplification`

- [x] **UI-19** — VideoSection : tiles avec photos CloudFront + vidéos CloudFront (play au featured)
  - Testimonials : style unifié (même card pour les 3, accent `--t-accent`)
  - `FetchTestimony()` branché, `per_page=100`, `loop={true}` Swiper
  - Branche : `refactor/ux-simplification`

- [x] **UI-20** — BannerCount : score 4.9/5 ajouté avec `useCountUp`, étoile partielle SVG gradient, suppression "live · wordpress"
  - Branche : `refactor/ux-simplification`

- [x] **UI-21** — CollectifsSection : header redesigné (eyebrow dot + titre serif gradient), pills gradient actif, panel hero solide + sparkles, checkmarks SVG "pourquoi"
  - Branche : `refactor/ux-simplification`

- [x] **UI-22** — ConversationIntro : refonte éditoriale avec phone mockup iPhone
  - Titre pleine largeur avec couleurs vives par ligne (orange/rose/bleu/cyan/vert/gradient)
  - Vidéo `Isaline-desktop.mp4` dans phone mockup iPhone (Dynamic Island supprimé)
  - Rotation supprimée — une seule vidéo fixe
  - Layout : phone gauche + texte droite, paragraphes 4 colonnes
  - `overflow: clip`, `padding-right: 0.15em` sur "enfin ?" pour éviter coupure
  - Branche : `refactor/ux-simplification`

- [x] **UI-23** — ValuePillars : redesign complet selon specs
  - Fonts Bricolage Grotesque 800 + DM Sans (Google Fonts)
  - Card 1 fond `#FFF0EA` + border-left 4px `#F4621F` ; Card 2 fond `#FFF0F5` + border-left 4px `#E8196A`
  - Watermark "01"/"02" absolu opacity 0.08, stat 42px, hr séparateur
  - Hover `translateY(-4px)`
  - Branche : `refactor/ux-simplification`

- [x] **UI-24** — Titres sections : `var(--ink)` → `var(--orange)` sur tous les h2 de section
  - HowItWorks : nouveau fond gradient `#FFF1D6 → #FFAAD0` + blobs, titres blancs
  - Menu hamburger : fond `rgba(250,246,239,.7)` + rose fermé, gradient ouvert
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-29 (Design v3 — Animations & vibes)

- [x] **UI-25** — ValuePillars : redesign cartes soft glass (`rgba(255,255,255,.72)` + `backdrop-filter`), zéro noir, titres en couleur accent, corps `#7a5a4a`, H2 gradient
  - Branche : `refactor/ux-simplification`

- [x] **UI-26** — CollectifsSection : lignes VibrationLine pleine largeur (`100vw`) derrière carte, 8 particules (dots/anneaux), pills pleine largeur full-bleed
  - Branche : `refactor/ux-simplification`

- [x] **UI-27** — Menu mobile : FAB logo VI dans bouton gradient, disparaît à l'ouverture, bug fermeture corrigé (`window.innerWidth <= 768` guard)
  - CTA renommé "On en parle ?" partout
  - Branche : `refactor/ux-simplification`

- [x] **UI-28** — Éléments flottants ajoutés sur toutes les sections : BannerCount, FeaturedArticles, PartnerCarousel, Contact, Footer (CSS `::before`/`::after` + `@keyframes`)
  - Branche : `refactor/ux-simplification`

- [x] **UI-29** — VibrationLine ajoutée dans : BannerCount (3 lignes blanches), HowItWorks (2 lignes blanches), CollectifsSection (6 lignes pleine largeur)
  - Branche : `refactor/ux-simplification`

- [x] **UI-30** — VideoSection : une carte unique rotative (auto-rotate 5.5s), 24 étoiles ★ animées, noms en rose, titre "aiment" gradient
  - Stars ★ grandes (`clamp(18→28px)`) + moyennes + dots + anneaux
  - Branche : `refactor/ux-simplification`

- [x] **UI-31** — ConversationIntro : vidéo aléatoire parmi les disponibles (Isaline seule pour l'instant, MacBook prêt pour ajout vidéos paysage), sonar contact
  - MacBook moderne avec animation d'ouverture `rotateX(82→0deg)`, clavier grille, notch caméra
  - VideoSection uniquement Isaline (portrait/phone) — vidéos paysage MacBook à ajouter
  - Branche : `refactor/ux-simplification`

- [x] **UI-32** — Contact : animation sonar/ripple (4 cercles expansifs orange, point central pulsant)
  - Branche : `refactor/ux-simplification`

---

## 🟡 Important — Session 2026-05-29 (session 3)

- [x] **UI-33** — FeaturedArticles magazine cover redesign + gradients + fonts
- [x] **UI-34** — Animations scroll-reveal globales : CollectifsSection (rideau), HowItWorks (zigzag+tampon)
- [x] **UI-35** — Hero /solution : MacBook premium, 4 vidéos aléatoires, SolutionHero composant
- [x] **UI-36** — SolutionTabs : pills gradient, sticky, animation fadeIn
- [x] **UI-37** — FunctOrganisation + OrgaCard : redesign complet fond gradient
- [x] **UI-38** — Cookie consent : redesign complet (backdrop, gradient, Prompt, pills)
- [x] **FIX-03** — CORS fix : routes API testimonials + featured-articles côté serveur
- [x] **CONTENT-02** — note.txt : 10 propositions texte (3 appliquées, 7 en attente)
- [x] **CODE-05** — /simplify : useIntersectionOnce hook + CSS vars valuePillars + c-color parent collectifs

---

## ⚠️ À régler (prochaine session)

- [ ] **MacBook vidéos paysage** : ajouter dans `VIDEOS` de `ConversationIntro.tsx` quand dispo

---

## 🟡 Important — Session 2026-06-02 (style/polish-global-v2)

- [x] **UI-39** — Textes [1] revert ConversationIntro, [5] hero sous-titre appliqué
- [x] **UI-40** — Espacement inter-sections unifié `clamp(3rem,5vw,5rem)`, backgrounds `--paper` seamless
- [x] **UI-41** — Contact : gradient hero identique (4 blobs amber/orange/rose/magenta), formulaire glassmorphism, titre mis à jour, email/tél supprimés
- [x] **UI-42** — CollectifsSection : pills statiques redesignées (border orange, active gradient), flyers ancrés au bas de la carte colorée, centré
- [x] **UI-43** — VideoSection : carte blanche macOS, guillemet décoratif, barre gradient haut, zéro étoiles/rose
- [x] **UI-44** — Footer : logo VI blanc.png (URL encodée), `ft-logo` CSS
- [x] **UI-45** — Hero chips rapprochées du mockup, style unifié font Supreme
- [x] **UI-46** — BannerCount : "organisations" retiré, label "Déjà actifs sur Uvibes"
- [x] **FIX-04** — Partners : filtre URL locales `/images/partners/` invalides, fallback FALLBACK, remotePatterns CloudFront
- [x] **FIX-05** — Blog AllArticle : redesign complet cards macOS + pills filtre + null check featured_image
- [x] **UI-47** — Page /solution : SolutionVideoProof (3 vidéos CloudFront : étudiante/entreprise/retraitée)
- [x] **UI-48** — Page /uvibes : redesign complet (hero gradient, stats, éthique cards, portage, CTA)
- [x] **UI-49** — Page /blog : hero vivid + AllArticle premium
- [x] **UI-50** — SolutionProofBar : gradient vivid (plus sombre), SolutionForWho : paper + orange, SolutionAnchorNav : paper + orange, SolutionThemes + SolutionHowItWorks : paper
- [x] **CODE-06** — Transitions seamless : `margin-top: -1px` sur toutes sections --paper adjacentes
- [ ] Vérifier que /blog affiche bien les articles en prod
- [ ] Vérifier CORS CloudFront pour les vidéos en prod

---

## 🟢 Amélioration

- [x] **PERF-05** — Ajouter les security headers dans `next.config.ts`
  - Fichiers : `next.config.ts`
  - Branche : `perf/next-config-headers`

- [ ] **PERF-06** — Remplacer le hook `Resize` par des CSS media queries *(déplacé dans BACKLOG.md)*
- [ ] **PERF-07** — Ajouter `woff2` pour `Supreme-Bold` *(déplacé dans BACKLOG.md)*

- [x] **FIX-01** — Rendre `sanitizeText` compatible SSR (DOMPurify ne fonctionne pas côté serveur)
  - Fichiers : `src/services/blog/sanitize.ts`
  - Branche : `perf/next-config-headers`

- [x] **UX-01** — Améliorer l'expérience formulaire contact (feedback visuel, validation)
  - Fichiers : `src/components/form/formContact.tsx`, `src/styles/form/formContact.css`
  - Branche : `feat/form-ux`

- [ ] **CODE-03** — Unifier l'architecture CSS *(déplacé dans BACKLOG.md)*

---

## ✅ Terminé

- **PERF-01** ✅ 2026-05-18 — Migrer homepage en Server Component
- **PERF-05** ✅ 2026-05-18 — Security headers dans next.config.ts
- **PERF-02** ✅ 2026-05-18 — Compression images (-84% TeamUvibes, -74% mockups)
- **PERF-03** ✅ 2026-05-18 — Lazy loading vidéos avec Intersection Observer
- **PERF-04** ✅ 2026-05-18 — Retrait force-dynamic du layout (pages statiques réactivées)
- **SEC-01** ✅ 2026-05-18 — Rate limiting sur /api/sendEmail
- **SEC-02** ✅ 2026-05-18 — Mot de passe admin sorti du code source
- **FIX-01** ✅ 2026-05-18 — sanitizeText compatible SSR
- **A11Y-01** ✅ 2026-05-19 — Accessibilité Menu.tsx complétée (+ double h1 heroBanner le 2026-05-18)
- **SEO-01** ✅ 2026-05-19 — Fichier central `src/lib/seo.ts` (constantes + helper buildMetadata)
- **SEO-02** ✅ 2026-05-19 — Defaults SEO dans layout.tsx (metadataBase, robots, OG, hreflang)
- **SEO-03** ✅ 2026-05-19 — 4 pages converties en Server Components + metadata + double H1 corrigé
- **SEO-04** ✅ 2026-05-19 — JSON-LD (Organization, SoftwareApplication, BreadcrumbList)
- **SEO-05** ✅ 2026-05-19 — Ancres blog "Lire la suite" → "Lire l'article : [titre]" (7 fichiers)
- **UX-01** ✅ 2026-05-19 — Formulaire contact : erreurs sous chaque champ, état envoi, gestion erreur réseau
- **UI-01** ✅ 2026-05-19 — padding responsive clamp(), line-height 1.1, text-wrap balance sur titres
- **UI-02** ✅ 2026-05-19 — Supreme-Bold sur h1/h2/h3, letter-spacing -0.02em H1, text-wrap pretty paragraphes, tabular-nums chiffres
- **UI-03** ✅ 2026-05-20 — Audit UI/UX + corrections cohérence visuelle phase 1 (typographie, bouton, ombres)

---

## Notes

- Ne jamais travailler directement sur `main`
- Toujours faire valider par le tuteur avant de push
- Convention commits : `fix:` / `feat:` / `perf:` / `refactor:` / `style:` + description courte
