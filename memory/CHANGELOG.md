# CHANGELOG — Uvibes Site Vitrine

---

## 2026-05-29 (session 3) — Animations, FeaturedArticles, /solution hero MacBook, textes

### Tâches terminées

- **ValuePillars** : 2 VibrationLines animées `100vw` derrière les cartes (positions 32%/68%), cartes opaques `#fff` sur mobile, titres `#F4621F`, pointillés animés BannerCount haut/bas
- **FeaturedArticles** : redesign magazine cover — reveal chaud au hover, fond 6 dégradés radiaux, fonts Prompt 800 + Roboto Mono, articles récents via API route (CORS fix), titre "Ce qu'on lit. Ce qu'on pense."
- **Animations globales** : `RevealObserver` dans layout (scroll reveal), hover sur teamCard/blogArticleCard/avantagesCard/orgaCard/testimonyCard, stagger avantagesHome
- **CollectifsSection** : scroll reveal (header fade-up, panel fade-up), carousel pills fix (retrait transform sur container overflow)
- **HowItWorks** : scroll reveal — header fade-up, étapes zigzag (left/bottom/right), cercles effet tampon (scale 2.2→1), connecteur scaleX draw
- **Cookie consent** : redesign complet — backdrop blur, gradient bg chaud, Prompt font, bouton pill gradient orange→rose, bottom sheet mobile
- **Hero /solution** : nouveau composant `SolutionHero` — MacBook premium (animation ouverture couvercle, keyboard, trackpad), 4 vidéos aléatoires (Isaline/Lisa/Delphine/Colette), gradient saturé 6 blobs, badge supprimé
- **SolutionTabs** : pills gradient actif orange→rose, sticky avec backdrop-filter, animation fadeIn par onglet
- **FunctOrganisation** : redesign — fond gradient chaud, titre gradient, items cards avec icônes blanches sur gradient, toggle pill, animation orgaReveal
- **OrgaCards** : header gradient subtil, icônes rectangle arrondi orange→rose, questions bubble gradient
- **CORS fix** : routes API `/api/testimonials`, `/api/featured-articles` (cache no-store), `getVideoUrl` fallback CloudFront hardcodé
- **Textes** : 10 propositions, 5 validées et appliquées (voir `note.txt`)
- **Fichiers créés** : `HOMEPAGE_CONTENT.md`, `note.txt`, `src/components/solution/SolutionHero.tsx`, `src/styles/solution/solutionHero.css`, `src/app/api/featured-articles/route.ts`, `src/app/api/testimonials/route.ts`, `src/components/shared/RevealObserver.tsx`

### Branche
`refactor/ux-simplification` — ~35 commits

### Impact
- Sections animées au scroll (rideau, zigzag, tampon) — identité Uvibes renforcée vs animations génériques
- CORS résolu sur témoignages et articles — contenu WP visible en prod sur Vercel
- Hero /solution premium avec MacBook et vidéos réelles
- note.txt : 7 textes en attente d'implémentation, 3 déjà faits

---

## 2026-05-29 (session 2) — Design v3 : animations, vibes, mockups, sonar

### Tâches terminées

- **ValuePillars** : cartes glass (`backdrop-filter: blur(12px)`), fond `rgba(255,255,255,.72)`, zéro texte noir (tons chauds `#7a5a4a`), titres en couleur accent, H2 gradient, animations fade-up au scroll, stat pop
- **CollectifsSection** : 6 lignes VibrationLine pleine largeur (`100vw`, full-bleed) derrière la carte avec `left: 50%; transform: translateX(-50%)`; 8 particules orange/rose/bleu; pills carousel full-bleed; déco gauche/droite (anneaux, dots, croix animés)
- **VideoSection** : une seule carte rotative (auto 5.5s), 24 étoiles ★ animées (`28px` max), noms en rose, étoiles header supprimées (doublon)
- **HowItWorks** : roadmap verticale mobile (ligne gradient orange→rose→bleu, cercles comme nœuds), titres colorés ("Trois" orange, "étapes." gradient), mots-clés gradient dans les étapes, blend background avec VideoSection (`#ffc8d8` au joint)
- **ConversationIntro** : vidéo aléatoire (pool = Isaline pour l'instant), MacBook moderne (animation ouverture `rotateX`, notch caméra, clavier grille, trackpad), infrastructure portrait/paysage prête pour futures vidéos
- **Contact** : animation sonar — 4 ripples orange expansifs (`scale .4→2.4`, 4s, décalés 1s), point central pulsant
- **Menu mobile** : FAB disparaît à l'ouverture, logo VI dans bouton, bug fermeture corrigé, CTA "On en parle ?"
- **Éléments flottants globaux** : BannerCount (anneau tournant + blob, `@keyframes bcSpin/bcFloat`), FeaturedArticles (blobs), PartnerCarousel (anneau + blob), Contact (anneau tournant + blob), Footer (grand anneau tournant 30s + blob)
- **VibrationLines** : ajoutées dans BannerCount (3 lignes blanches), HowItWorks (2 lignes blanches), CollectifsSection (6 lignes couleur sur fond crème)
- **Btn "On en parle ?"** : gradient orange→rose, shadow colorée, hover translateY
- **PartnerCarousel** titre : `clamp(22→38px)` bold 800 gradient (vs 12px mono avant)

### Fichiers clés modifiés
- `src/components/section/ValuePillars.tsx` + `valuePillars.css`
- `src/components/section/ConversationIntro.tsx` + `conversationIntro.css`
- `src/components/section/VideoSection.tsx` + `videoSection.css`
- `src/components/section/HowItWorks.tsx` + `howItWorks.css`
- `src/components/section/BannerCount.tsx` + `bannerCount.css`
- `src/components/contact/contact.tsx` + `contact.css`
- `src/components/collectifs/CollectifsSection.tsx` + `collectifsSection.css`
- `src/styles/carousel/PartnerCarousel.css`
- `src/styles/footer/footer.css`
- `src/styles/section/featuredArticles.css`
- `src/app/globals.css` — `.btn-ink` gradient

### Impact
- Cohérence visuelle : les animations "vibration" (lignes ondulées) remplacent les cercles génériques → identité Uvibes renforcée
- Sections vivantes sans JS runtime lourd (VibrationLine = SMIL SVG pur)
- MacBook mockup prêt pour les vidéos paysage à venir

---

## 2026-05-29 — Refonte UI globale homepage : hero, sections, mockup, piliers

### Tâches terminées

- **Navbar** : `<Menu />` réintégré dans `layout.tsx` (avait disparu). Logo dans `heroBanner` caché car nav fixe le prend en charge. Padding contenu hero adapté `calc(var(--nav-height) + Xrem)`.

- **Hero homepage** :
  - Gradient de fond plus saturé : `#FD6E00 → #FF6030 → #FF70A8 → #D90A5C`
  - 16 blobs animés (a→p), opacités fortes, grain overlay `mix-blend-mode: overlay`
  - Titres en blanc, "puissance" en `#FFE456`, "collectif." en rose
  - Badge "utilisateurs actifs" supprimé
  - Layout responsive : `hero-after` (sous-titre + CTAs + social proof) passe en row 2 sur desktop, row 3 sur mobile (après le mockup)
  - Padding horizontal augmenté `clamp(2.5rem, 7vw, 6rem)`
  - Saut de ligne après "Activez la" pour isoler "puissance" sur sa propre ligne

- **AppMockup** : chips masquées en mobile (`display: none` < 768px), mockup agrandi 280→340px à 768px, 220→280px à 480px.

- **Contact section** : redesign complet
  - Fond `#f7f1ea`, titre "Parlons de votre / *collectif.*" avec serif italic gradient rose→magenta
  - Eyebrow avec dot gradient, infos contact avec séparateurs dashed
  - Formulaire underline-only : inputs `border-bottom: 1.5px`, bouton pill gradient `#ff6a00 → #ff007a`, champ Organisation ajouté, type `FormData` mis à jour

- **Footer** : newsletter supprimée, layout `brand + nav-colonnes` côte à côte, gradient `#ff6a00 → #e6007e` conservé

- **PartnerCarousel** : grille 6 cartes supprimée — juste label mono centré + marquee logos 64px

- **VideoSection** :
  - Tiles : vidéos CloudFront via `getVideoUrl()` — 6 vidéos (Isaline, Lisa, Delphine, Colette, Nadine, Pierre)
  - Photo de fond dans les tiles non-featured, vidéo play au featured
  - Testimonials WordPress (`FetchTestimony()`, `per_page=100`, `loop=true`)
  - Style unifié : même card pour les 3 témoignages, accent `--t-accent` par couleur
  - Fond section : `linear-gradient(160deg, #ffeadc → #ffbbd0)` + 2 blobs

- **BannerCount** :
  - Score 4.9/5 ajouté : `useCountUp(49, 1800)` avec `(rawScore/10).toFixed(1)`
  - 4 étoiles ★ + 1 étoile SVG gradient 90% (représente 0.9)
  - "live · wordpress" supprimé
  - Layout : main counter | séparateur | score 4.9/5

- **CollectifsSection** :
  - Header : eyebrow "Pour qui ?" avec dot gradient, titre `clamp(40px, 5vw, 76px)` avec *collectif* en serif gradient
  - Pills : active = `linear-gradient(135deg, orange, rose)` + scale 1.04 + shadow
  - Panel hero : gradient solide couleur collectif + texte blanc + 10 sparkles animés
  - Panel body : checkmarks SVG pour "Pourquoi ça fonctionne", labels roboto-mono
  - 2 blobs déco `::before`/`::after` sur la section

- **ConversationIntro — refonte éditoriale** :
  - Titre pleine largeur, couleurs par ligne : orange / rose / bleu `#00AFDD` / vert `#78c751` / gradient rose→orange pour "enfin ?"
  - Phone mockup iPhone minimaliste (sans Dynamic Island) : `border-radius: 50px`, boutons latéraux via `::before`/`::after`, animation float `-1deg`
  - Vidéo `Isaline-desktop.mp4` fixe (rotation supprimée après retour utilisateur)
  - `overflow: clip` + `padding-right: 0.15em` → "?" plus coupé
  - Layout : phone gauche (`auto`) + texte droite (`1fr`), 4 paragraphes `gap: 1.25rem`

- **ValuePillars — redesign selon specs** :
  - Fonts : Bricolage Grotesque 800 (titres/stats), DM Sans 15px (corps)
  - Section fond `#FEF6EE`, cards individuelles `#FFF0EA` / `#FFF0F5`
  - Border-left 4px `#F4621F` / `#E8196A`, `border-radius: 20px`, `padding: 32px`
  - Watermark "01"/"02" opacity 0.08 absolu top-right
  - `<hr>` separator avant stat, stat 42px bold
  - Hover `translateY(-4px)` + `box-shadow: 0 12px 32px rgba(0,0,0,.1)`

- **Titres sections** : `var(--ink)` → `var(--orange)` sur tous les h2 principaux
  - HowItWorks : fond gradient `#FFF1D6 → #FFAAD0` + 2 blobs, titres blancs
  - Menu hamburger : redesign — fermé = fond `rgba(250,246,239,.7)` + rose + `border-radius: 12px`, ouvert = gradient orange→rose

- **Menu nav** : item "Accueil" → "Bienvenue"

### Fichiers clés modifiés
- `src/app/layout.tsx` — ajout `<Menu />`
- `src/components/banner/HomeHero.tsx` — hero blobs, titres, layout
- `src/styles/banner/homeHero.css` — gradient, blobs a→p, textes blancs
- `src/styles/shared/appMockup.css` — chips mobile, taille
- `src/components/contact/contact.tsx` + `src/styles/contact/contact.css`
- `src/components/form/formContact.tsx` + `src/styles/form/formContact.css`
- `src/components/footer/Footer.tsx` + `src/styles/footer/footer.css`
- `src/components/carousel/PartnerCarousel.tsx` + `src/styles/carousel/PartnerCarousel.css`
- `src/components/section/VideoSection.tsx` + `src/styles/section/videoSection.css`
- `src/components/section/BannerCount.tsx` + `src/styles/section/bannerCount.css`
- `src/components/collectifs/CollectifsSection.tsx` + `src/styles/collectifs/collectifsSection.css`
- `src/components/section/ConversationIntro.tsx` + `src/styles/section/conversationIntro.css`
- `src/components/section/ValuePillars.tsx` + `src/styles/section/valuePillars.css`
- `src/components/section/HowItWorks.tsx` + `src/styles/section/howItWorks.css`
- `src/styles/menu/Menu.css`
- `src/data/menu/MenuData.tsx`
- `src/types/form/form.ts`
- `src/services/blog/article.ts` — `per_page=100`

### Branche
`refactor/ux-simplification`

### Impact
- **Identité visuelle cohérente** : palette orange/rose/vivid cohérente sur toutes les sections, tokens v2 utilisés partout
- **Hero plus impactant** : 16 blobs + gradient saturé + titres blancs = ambiance premium vs fond crème générique
- **Vidéos CloudFront intégrées** : `getVideoUrl()` branché, vidéos réelles dans VideoSection et ConversationIntro
- **Score 4.9/5 animé** : renforce la social proof dans la barre de compteur
- **Piliers redesignés** : cards avec fond teinté + border accent + watermark = look éditorial, fini le look "SaaS générique"

---

## 2026-05-28 — Design system v2 : palette vivid + ConversationIntro + refonte témoignages

### Tâches terminées
- **Design tokens v2** : palette warm/vivid complète dans `globals.css`
  - Nouveaux tokens : `--ink` (#4A1530), `--ink-2/3/4`, `--cream/paper`, `--orange-light`, `--rose-light`, `--coral`, `--peach`, `--warm-glow`, `--vivid-mesh`
  - Remplacement systématique des `#666`, `#333`, `#1a1a1a` par les tokens `--ink-*` dans 12 fichiers CSS
- **Hero gradient vivid** : toutes les pages inner (heroBanner.css)
  - Default : orange→rose chaud (`#FFF1D6 → #FF5894`)
  - Blog : orange/pêche (`#FFF1D6 → #FF6E6E`)
  - Uvibes : rose/pêche doux (`#FFF6EC → #FF77A0`)
  - Features : crème/rose (`#FFF1D6 → #FFB8C0`)
- **HomeHero v2** : 6 blobs animés, particules avec glow, palette orange/rose
- **ConversationIntro** : nouvelle section éditoriale après le hero
  - Texte "Et si les conversations clés arrivaient enfin ?" avec mots en gras orange/rose alternés
  - 2 colonnes sur desktop, 1 colonne mobile
- **VideoSection témoignages** : 3 cartes magazine asymétriques
  - Carte 0 : gradient orange→rose, texte blanc
  - Carte 1 : fond blanc chaud avec bordure rose, décalée de +20px
  - Carte 2 : fond pêche/rose doux
  - Glyph guillemets décoratif 180px, pill étoiles, avatar initiales
- **FloatingMenu** supprimé de toutes les pages (6 pages nettoyées)
- **AdvantagesGrid** retiré de la homepage (simplifié)

### Fichiers créés
- `src/components/section/ConversationIntro.tsx`
- `src/styles/section/conversationIntro.css`

### Fichiers modifiés (palette)
- `src/app/globals.css` — tokens v2
- `src/styles/banner/heroBanner.css` — gradients vivid par page
- `src/styles/banner/homeHero.css` — blobs v2
- `src/styles/section/videoSection.css` — cartes magazine
- `src/styles/solution/solutionTabs.css` — tokens ink/rose
- `src/styles/features/PricingTable.css` — tokens ink/*
- `src/styles/features/PricingMobile.css` — tokens ink/*
- `src/styles/collectifs/collectifsSection.css` — tokens ink
- `src/styles/section/avantagesHome.css` — tokens ink/*
- `src/styles/cards/avantagesCard.css` — token ink
- `src/styles/flyers/flyerGallery.css` — tokens ink-2 + border rose
- `src/styles/blog/blogSection.css` — token ink
- `src/styles/cards/teamCard.css` — token ink-2

### Branche
`refactor/ux-simplification`

### Impact
- **Cohérence visuelle** : le site utilise maintenant un système de couleurs cohérent sur toutes les pages — plus de gris neutres froids (#333, #666) qui cassaient l'ambiance warm/vivid
- **Éditorial** : ConversationIntro pose immédiatement la philosophie produit juste après le hero
- **Témoignages** : la section VideoSection remplace l'ancien carrousel Swiper par des cartes magazine asymétriques plus modernes et mémorables
- **Héros intérieurs** : chaque page a maintenant un gradient unique qui identifie visuellement la section (orange pour blog, rose pour À propos, etc.)

---

## 2026-05-22 — Page /solution redesignée + section AvantagesHome + fix fetch

### Tâches terminées
- **Page /solution — onglet "Pour qui ?"** : FlyerGallery remplacée par CollectifsSection
  - 11 collectifs (Culture, Enseignement, Tourisme, Réseaux Business, Adhérents, Entreprises, Seniors, Échanges entre pairs, International, Sport, Insertion Pro)
  - Ticker horizontal de pills rondes cliquables (boucle infinie, pause au hover)
  - Panneau détail en dessous : hero coloré avec flyers en cascade + deux colonnes texte
- **Page /solution — onglet "Comment ça marche"** : contenu Avantages ajouté (3 accordéons Entreprise / Enseignement / Collectif avec stats réelles)
- **Homepage** : nouvelle section `AvantagesHome` après HowItWorks
  - 3 cartes fond clair (Entreprises, Enseignement, Collectifs)
  - Grande stat chiffrée (93% / 41% / 38%) avec source, 3 bénéfices par organisation
  - Bouton CTA "Découvrir la solution"
- **Titres** : PartnerCarousel → "Ils avancent avec nous", Testimony → "Ils nous font confiance"
- **Fix fetch WordPress** : try/catch sur tous les services (article, citation, featuredArticles, fetchPartners, fetchHomeContent, 6 services blog)
- **Fix sanitize citation** : bug `createElement("p")` corrigé → DOMPurify direct
- **Fallbacks** : données statiques pour témoignages et compteur utilisateurs (3 500)
- **OrgaCard** : dégradé orange/rose sur les bulles retiré → fond blanc avec bordure gauche
- **FunctOrganisation** : fond orange teinté retiré → cartes blanches avec bordure

### Branche
`refactor/ux-simplification` — 12 commits

### Fichiers créés
- `src/components/collectifs/CollectifsSection.tsx`
- `src/data/collectifs/collectifsData.ts`
- `src/styles/collectifs/collectifsSection.css`
- `src/components/section/AvantagesHome.tsx`
- `src/styles/section/avantagesHome.css`

### Impact
- **Clarté produit** : les décideurs (DRH, chefs de projet) voient immédiatement les bénéfices chiffrés dès la homepage
- **Robustesse** : le site ne crashe plus si WordPress est inaccessible — fallbacks sur toutes les données dynamiques
- **UX /solution** : navigation par collectif fluide et mémorable (pills animées + panneau détail)

---

## 2026-05-21 — UX-05 + UX-06 + redesign sections homepage

### Tâches terminées
- [UX-05] WhyUvibes réécrit Problème→Solution + HowItWorks 3 étapes
- [UX-06] Mots clés colorés séquentiellement au scroll (5 couleurs palette Uvibes, Supreme-Bold simultané)
- Redesign témoignages : fond blanc, grande citation, guillemets orange/rose
- Redesign bénéfices : cartes blanches avec bordure colorée + descriptions
- Titres : "Ils nous font confiance" (partenaires), "Ils avancent avec nous" (témoignages)
- Fix responsive Swiper témoignages (débordement tablet corrigé)
- Flyers PNG de test déplacés dans .audit/

### Commits
2 commits sur `refactor/ux-simplification`

### Fichiers créés
- `src/components/section/HowItWorks.tsx`
- `src/styles/section/howItWorks.css`

### Fichiers modifiés
- `src/components/section/WhyUvibes.tsx` — nouveau texte + IntersectionObserver séquentiel
- `src/app/globals.css` — classes `.kw` 5 couleurs réutilisables
- `src/app/page.tsx` — ajout HowItWorks + titres VideoCards améliorés
- `src/components/testimony/testimony.tsx` — fond blanc, fix height Swiper
- `src/styles/testimony/testimony.css` — `.testimony-section` blanc
- `src/styles/cards/testimonyCard.css` — grande citation, guillemets colorés
- `src/components/section/BenefitsHomeSection.tsx` — `.benefits-section`
- `src/data/benefits/benefitsData.tsx` — descriptions + couleurs par bénéfice
- `src/types/section/BeneficesItemProps.ts` — +description +color
- `src/components/section/benefitsHomeItem.tsx` — affiche description
- `src/styles/section/BenefitsHomeSection.css` / `benefitsHomeItem.css` — redesign

### Impact
- **Clarté produit** : WhyUvibes explique maintenant le problème puis la solution — un visiteur comprend Uvibes en 30 secondes
- **Identité visuelle** : 5 couleurs de la palette utilisées activement sur la page au lieu du seul dégradé orange-rose
- **Rythme de lecture** : les mots clés se colorent un par un et deviennent gras — guide l'œil dans le texte
- **Cohérence sections** : témoignages et bénéfices ne sont plus deux blocs sombres identiques collés — la page respire

---

## 2026-05-21 — UX-02 à UX-04 + UI-04 : simplification UX complète

### Tâches terminées
- [UI-04] Suppression waves canvas hero — retour gradient d'origine
- [UX-02] Allègement homepage : 16 → 10 sections
- [UX-03] Menu reconfiguré : "Uvibes" → "À propos", fusion items nav
- [UX-04] Nouvelle page /solution avec 3 onglets + galerie 18 flyers

### Branche
`refactor/ux-simplification` — 3 commits + `style/ui-polish` — 1 commit

### Fichiers créés
- `src/app/solution/page.tsx` — nouvelle page /solution (Server Component)
- `src/components/solution/SolutionTabs.tsx` — 3 onglets (Pour qui / Comment / Nos offres)
- `src/components/flyers/FlyerGallery.tsx` — galerie scrollable avec filtres par catégorie
- `src/data/flyers/flyersData.ts` — données des 18 flyers
- `src/styles/solution/solutionTabs.css` — styles onglets
- `src/styles/flyers/flyerGallery.css` — styles galerie
- `public/images/flyer/` — 18 flyers renommés en noms sémantiques

### Fichiers modifiés
- `src/app/page.tsx` — 7 sections retirées (FunctSection, InspirationSection, 4 VideoCards, Uvibes)
- `src/data/menu/MenuData.tsx` — "Uvibes" → "À propos", "Avantages"+"Fonctionnement" → "La solution"
- `src/lib/seo.ts` — ajout config SEO pour /solution
- `next.config.ts` — redirections 301 /avantages et /features → /solution
- `src/components/banner/heroBanner.tsx` + `heroBanner.css` — waves supprimées

### Décisions techniques
- FlyerGallery en "use client" (useState pour les filtres) — les 18 flyers sont filtrables par catégorie (Étudiant / Professionnel / Sport / Aidants / Associations / Loisirs)
- SolutionTabs charge les sous-composants conditionnellement avec `{activeTab === X && <Composant />}` — pas de bundle inutile
- Redirections 301 dans next.config.ts : SEO-friendly, les anciens liens externes continuent de fonctionner
- Waves canvas retirées car visuellement trop agitées — retour au gradient sombre sobre

### Impact
- **Navigation** : 5 items menu → 4 (Accueil / La solution / À propos / Blog + RDV). Plus lisible, moins de friction
- **Homepage** : 16 sections → 10, scroll réduit de ~40%, plus de répétitions avec les pages internes
- **Flyers** : 18 visuels com intégrés dans une galerie interactive — le visiteur se reconnaît immédiatement dans un profil
- **SEO** : redirections 301 préservent le jus de lien des anciennes URLs /avantages et /features

---

## 2026-05-20 — UI-03 : audit UI/UX et corrections cohérence visuelle phase 1

### Tâches terminées
- [UI-03] Audit complet homepage + corrections des 5 problèmes prioritaires identifiés

### Branche
`style/ui-polish` — commit sur branche existante

### Fichiers modifiés
- `src/styles/cards/userNumberCard.css` — Supreme-Bold, font-weight 700, letter-spacing -0.01em
- `src/styles/section/inspirationSection.css` — Supreme-Bold, letter-spacing -0.01em, line-height 1.1
- `src/app/globals.css` — letter-spacing -0.01em sur .title-h2-orange et .title-h2-white
- `src/styles/button/styledButton.tsx` — 3 corrections : syntax `var(--button-font)`, `text-transform: none`, hover `translateY(-3px)`
- `src/styles/button/styledWhiteButton.tsx` — syntax `padding: var(--spacing-ref)`, `text-transform: none`
- `src/styles/section/whyUvibes.css` — box-shadow `18px #00afdd` → `5px rgba(0,175,221,0.55)` (desktop et mobile)
- `src/components/cards/videoCard.tsx` — box-shadow inline `18px #00AFDD` → `5px rgba(0,175,221,0.55)`

### Décisions techniques

**Pourquoi cibler ces 5 problèmes précis :**
- Roboto sur les H2 = fracture de l'identité de marque (Uvibes = Supreme partout)
- `letter-spacing: 1px` sur des grands titres = légèrement "desserré" — contraire de la solidité visuelle voulue. `-0.01em` resserre imperceptiblement mais juste
- `text-transform: uppercase` MUI = signature template immédiatement reconnaissable. `text-transform: none` redonne de la voix humaine au bouton
- `translateY(-20px)` hover = layout shift de 20px, brutal. `-3px` = feedback élégant sans déstabiliser la page
- `box-shadow 0 0 0 18px #00afdd` = anneau de 18px plein opacité qui "crie" plus fort que le contenu vidéo. `5px rgba(0.55)` = même signal de marque, discret

**Ce qui n'a PAS été changé et pourquoi :**
- `--spacing-letter: 1px` dans `:root` non modifié — utilisé aussi dans cookie.css, contact.css (petits textes où 1px peut être intentionnel). Correction ciblée sur les H2 seulement.
- Background des VideoCards non modifié — l'alternance gradient/blanc est naturellement assurée par la structure existante des composants

### Impact
- **Cohérence marque** : zero Roboto dans les titres — tout le site parle avec la même voix typographique Supreme
- **Qualité perçue** : le bouton principal n'est plus reconnaissable comme "MUI template générique" — il semble intentionnel
- **Ergonomie hover** : les boutons ont un feedback subtil au lieu d'un saut agressif qui désorienterait l'utilisateur
- **Compositions vidéo** : l'anneau bleu encadre sans dominer — le contenu vidéo reprend sa place comme sujet principal

> Journal des changements. Une entrée par jour de travail.
> Format : date → tâches terminées → fichiers modifiés → décisions prises.

---

## 2026-05-19 — UI-01 + UI-02 : polish global CSS et typographie

### Tâches terminées
- [UI-01] Padding responsive, line-height et text-wrap sur titres
- [UI-02] Supreme-Bold sur titres, letter-spacing H1, text-wrap paragraphes, tabular-nums chiffres

### Branche
`style/ui-polish` — 2 commits propres

### Fichiers modifiés
- `src/app/globals.css` — 4 changements ciblés
- `src/styles/cards/userNumberCard.css` — tabular-nums sur `.user-number`

### Décisions techniques
- `--section-padding-h: clamp(1.25rem, 5vw, 4rem)` : responsive sans toucher aucun composant (toutes les sections utilisent déjà la variable)
- `line-height: 1` → `1.1` sur tous les `.title-h*` : plus d'air entre les lignes sans casser les proportions
- `text-wrap: balance` sur `h1/h2/h3` : équilibre les titres qui wrappaient sur 1 mot seul
- `text-wrap: pretty` sur `p` : évite les orphelins en fin de paragraphe
- Supreme-Bold (`--text-font-bold`) sur les titres au lieu de Roboto (`--title-font`) : police de marque Uvibes partout
- `letter-spacing: -0.02em` uniquement sur `.title-h1` : resserre le grand titre hero (standard pour les très grands titres)
- `font-variant-numeric: tabular-nums` sur `.user-number` : stabilise les chiffres qui sautaient visuellement

### Impact
- **Textes non collés aux bords** : sur mobile 390px le padding passe à ~20px, sur desktop 1440px à 64px — automatiquement
- **Cohérence typographique** : Supreme-Bold sur tous les titres = identité visuelle Uvibes affirmée, plus de Roboto générique
- **Lisibilité** : les titres respirent mieux (line-height 1.1 vs 1), les paragraphes ne laissent plus de mots seuls en fin de ligne

### Outils installés cette session
- **Playwright MCP** : serveur MCP configuré dans `.claude/settings.json` — permet à Claude de prendre des screenshots du site local pour vérifier les changements visuellement. Nécessite un redémarrage de Claude Code pour s'activer.

---

## 2026-05-19 — UX-01 : amélioration formulaire contact

### Tâches terminées
- [UX-01] Feedback visuel, validation et gestion d'erreur sur le formulaire contact

### Fichiers modifiés
- `src/components/form/formContact.tsx` — refonte complète de la gestion des états
- `src/styles/form/formContact.css` — ajout `.form-error` et `.form-success`
- `src/types/button/button.ts` — ajout prop `disabled`
- `src/components/button/Button.tsx` — passage de `disabled` au StyledButton

### Décisions techniques
- Messages d'erreur déplacés sous chaque champ concerné (avant : groupés en bas du formulaire)
- `finally` sur le fetch pour toujours libérer le bouton même en cas d'erreur réseau
- Suppression du `setTimeout(1000)` arbitraire qui retardait l'affichage du succès sans raison
- Couleur erreur : `var(--secondaryColor)` (rose Uvibes) — cohérent avec la charte
- Couleur succès : vert standard `#2e7d32` — convention universelle

### Impact
- **Utilisateur** : sait immédiatement quel champ est manquant, sans chercher en bas du formulaire
- **Fiabilité** : si le serveur est en panne ou le réseau coupé, un message d'erreur s'affiche — avant, l'utilisateur pensait que son message était parti
- **Double envoi** : le bouton est désactivé pendant l'envoi, impossible de soumettre deux fois
- **Clarté** : le bouton affiche "Envoi en cours..." — l'utilisateur sait que quelque chose se passe

---

## 2026-05-19 — SEO-01 à SEO-05 : audit SEO complet implémenté

### Tâches terminées
- [SEO-01] Fichier central `src/lib/seo.ts`
- [SEO-02] Enrichissement `layout.tsx` avec defaults SEO
- [SEO-03] Conversion des 4 pages en Server Components + metadata par page + fix double H1
- [SEO-04] Données structurées JSON-LD
- [SEO-05] Ancres blog "Lire la suite" → "Lire l'article : [titre]"

### Fichiers créés
- `src/lib/seo.ts` — constantes SITE_URL, SITE_NAME, PAGE_SEO par page, helper `buildMetadata()`
- `src/components/JsonLd.tsx` — composant réutilisable pour injecter du JSON-LD
- `src/components/avantages/AvantagesPageClient.tsx` — extraction du code interactif d'avantages

### Fichiers modifiés
- `src/app/layout.tsx` — metadataBase, robots, openGraph defaults, hreflang fr, title template
- `src/app/avantages/page.tsx` — Server Component, metadata, BreadcrumbList JSON-LD
- `src/app/features/page.tsx` — Server Component, metadata, SoftwareApplication + BreadcrumbList JSON-LD
- `src/app/uvibes/page.tsx` — Server Component, metadata, Organization JSON-LD
- `src/app/blog/page.tsx` — Server Component, metadata, BreadcrumbList JSON-LD
- `src/styles/page/uvibes.css` — classe `.uvibes-team-image` responsive (remplace hook Resize)
- `src/components/blog/allArticle.tsx` — ajout "use client" (était implicite via page parente)
- `src/components/funct/functOrganisation.tsx` — ajout "use client"
- `src/components/uvibes/HelloAssoDon.tsx` — ajout "use client"
- `src/components/banner/partnerBanner.tsx` — ajout "use client" (dépendance MUI styled via PartnerGroup)
- `src/components/cards/blog*.tsx` (×5) + `allArticle.tsx` + `FeaturedArticles.tsx` — ancres descriptives

### Décisions techniques
- `title: { absolute: title }` dans `buildMetadata()` pour éviter le double `| Uvibes` du template
- Pages converties en Server Components → HeroBanner rendu une seule fois côté serveur → double H1 corrigé
- `if (!mounted) return null` conservé dans AvantagesPageClient uniquement (Calendly a besoin du DOM)
- `"use client"` ajouté sur les composants enfants qui en avaient besoin mais l'héritaient de leur page parente
- Image OG temporaire : `uvibes-section.png` (voir BACKLOG.md CONTENT-01 pour la version finale)
- Pas de Twitter Cards — Uvibes n'est pas sur Twitter, les OG tags couvrent LinkedIn/WhatsApp/Discord

### Résultat build
Toutes les pages en `○ Static` — pré-générées au build, zéro rendu dynamique inutile.

### Impact
- **Google voit maintenant** : un title et une meta description optimisés sur chaque page (avant : "Bienvenue sur Uvibes" partout)
- **Partage social** : LinkedIn, WhatsApp, Discord affichent désormais un aperçu enrichi avec titre, description et image quand on partage un lien Uvibes (avant : aucun aperçu)
- **Double H1 corrigé** : chaque page a un seul H1 clair — Google ne sera plus confus sur le sujet principal de la page
- **Canonical** : Google sait quelle URL est la référence, réduit le risque de contenu dupliqué
- **JSON-LD** : Google comprend qu'Uvibes est une Organization et une SoftwareApplication — ouvre la possibilité d'afficher des rich snippets dans les résultats (étoiles, fil d'Ariane, infos enrichies)
- **Ancres blog** : "Lire l'article : [titre]" au lieu de "Lire la suite" — chaque lien est descriptif, Google comprend où il mène

---

## 2026-05-19 — Planification audit SEO complet (SEO-01 à SEO-05)

### Audit réalisé
Analyse complète du SEO technique basée sur rapport d'audit externe + lecture du code.

### Problèmes identifiés
- Double H1 sur toutes les pages secondaires : causé par le pattern `"use client"` + hook `Resize` avec `mounted` — Next.js render côté serveur + re-render à l'hydratation
- Zéro OG tags, zéro canonical, zéro JSON-LD
- Titles et meta descriptions non optimisés pour les mots-clés
- Pages `avantages`, `features`, `uvibes`, `blog` sont `"use client"` → impossible d'exporter `metadata`
- Blog : ancres "Lire la suite" génériques

### Décisions techniques
- Pas de correction isolée du H1 — elle est incluse dans la conversion Server Component (SEO-03)
- Pas de Twitter Cards : Uvibes n'est pas sur Twitter, les OG tags couvrent LinkedIn/WhatsApp/Discord/Slack
- Image OG temporaire : `uvibes-section.png` (en attendant une vraie image 1200×630 — voir BACKLOG.md CONTENT-01)
- Tous les changements SEO sur une seule branche `feat/seo-metadata` — une PR propre
- Aucun risque côté WordPress : le fetch se fait juste plus tôt (serveur vs navigateur), l'API ne change pas
- Blog : URLs `/blog/354-2` non touchées — redirections 301 à gérer côté WordPress si nécessaire

### Tâches créées
- SEO-01 : fichier central `src/lib/seo.ts`
- SEO-02 : enrichir `layout.tsx`
- SEO-03 : convertir 4 pages en Server Components + metadata + fix double H1
- SEO-04 : JSON-LD (Organization, SoftwareApplication, BreadcrumbList)
- SEO-05 : ancres blog "Lire la suite" → "Lire l'article : [titre]"

---

## 2026-05-19 — A11Y-01 : accessibilité Menu.tsx terminée

### Tâches terminées
- [A11Y-01] Corriger les problèmes d'accessibilité restants dans Menu.tsx

### Fichiers modifiés
- `src/components/menu/Menu.tsx` — 3 corrections :
  - `megaphone-container` : ajout `role="button"`, `tabIndex={0}`, `onKeyDown` → navigable au clavier
  - Image mégaphone : `alt=""` (le texte visible "Nous Contacter" suffit pour les lecteurs d'écran)
  - `StyledFloatButton` : ajout `aria-label` dynamique ("Ouvrir/Fermer le menu")
  - `<nav>` : ajout `aria-label="Navigation principale"`

### Décisions techniques
- `alt=""` est correct ici (image décorative) car le texte adjacent "Nous Contacter" porte l'information
- `aria-label` dynamique sur le bouton hamburger : change selon `isOpen` pour refléter l'état réel
- `onKeyDown` sur le div mégaphone : uniquement `Enter` — cohérent avec le bouton existant

### Impact
- **Lecteurs d'écran** : le menu est maintenant navigable au clavier — les utilisateurs qui n'utilisent pas de souris peuvent ouvrir/fermer le menu et accéder à "Nous Contacter"
- **Score accessibilité** : les outils comme Lighthouse ou axe ne signalent plus ces éléments interactifs comme non accessibles
- **WCAG** : le site respecte mieux les critères WCAG 2.1 niveau AA, standard exigé dans certains appels d'offres publics (cible associations/collectivités)

---

## 2026-05-18 — FIX-01 + A11Y-01 : corrections

### Tâches terminées
- [FIX-01] Rendre `sanitizeText` compatible SSR
- [A11Y-01] Supprimer le double h1 dans heroBanner (partiel)

### Fichiers modifiés
- `src/services/blog/sanitize.ts` — garde `typeof window === "undefined"` : regex côté serveur, DOMPurify côté client
- `src/components/banner/heroBanner.tsx` — suppression du `<h1 className="visually-hidden">` redondant

### Décisions techniques
- DOMPurify requiert `document` et `window` — inexistants côté serveur. Plutôt que changer de librairie, on détecte l'environnement et on adapte le traitement.
- Le h1 visually-hidden et le h1 visible affichaient le même contenu — le h1 visible suffit pour le SEO et les lecteurs d'écran.

### Impact
- **Stabilité SSR** : plus d'erreur serveur si `sanitizeText` est appelé côté serveur — le site ne crashe plus dans ce cas
- **SEO** : un seul H1 par page sur la homepage — Google identifie correctement le sujet principal sans ambiguïté

---

## 2026-05-18 — PERF-04 : retrait force-dynamic

### Tâches terminées
- [PERF-04] Retirer `force-dynamic` du layout global

### Fichiers modifiés
- `src/app/layout.tsx` — suppression de `export const dynamic = "force-dynamic"`

### Résultat
Avant : toutes les pages en `ƒ Dynamic` (re-générées à chaque requête)
Après : toutes les pages en `○ Static` sauf `/api/` et `/blog/[slug]`

### Décision technique
`force-dynamic` sur le layout global désactivait le cache sur tout le site sans raison valable.
Les routes qui ont besoin d'être dynamiques (`/api/`, `/blog/[slug]`) le sont naturellement sans avoir besoin de cette directive globale.

### Impact
- **Temps de réponse** : les pages sont maintenant servies depuis le cache Next.js au lieu d'être regénérées à chaque requête — réduction drastique du TTFB (Time To First Byte)
- **Coût serveur** : moins de calcul côté serveur à chaque visite
- **SEO** : Google favorise les sites rapides — un TTFB bas est un signal positif pour le classement

---

## 2026-05-18 — PERF-02 + PERF-03 : images et vidéos

### Tâches terminées
- [PERF-02] Compression des images lourdes
- [PERF-03] Lazy loading des vidéos avec Intersection Observer

### Résultats de compression

| Image                 |  Avant  |  Après  |   Gain   |
|-----------------------|---------|---------|----------|
| TeamUvibes.jpg        | 24.0 MB |  3.9 MB | **-84%** |
| TeamUvibesHome.jpg    |  5.9 MB |  3.1 MB | **-47%** |
| avatarTeamTest.png    |  2.3 MB | 598 KB  | **-74%** |
| mochupHome.png        |  1.2 MB | 349 KB  | **-72%** |
| mockupFeature.png     |  1.2 MB | 304 KB  | **-74%** |
| uvibes-section.png    |  1.0 MB | 271 KB  | **-74%** |
| MockupAvantage.png    | 832 KB  | 304 KB  | **-63%** |
| mockupBlog.png        | 535 KB  | 158 KB  | **-71%** |
| Logo UVIBES.png       | 357 KB  | 130 KB  | **-64%** |
| justine.jpg           | 414 KB  | 154 KB  | **-63%** |
| Visuel-feature.png    | 444 KB  |  86 KB  | **-81%** |
| featureVisuel.PNG     | 444 KB  |  86 KB  | **-81%** |
| image1Features.png    | 228 KB  |  59 KB  | **-74%** |
| **TOTAL**             | **~37 MB** | **~9 MB** | **-75%** |

### Fichiers modifiés
- `public/images/` — 13 images compressées
- `scripts/compress-images.mjs` — script de compression one-shot (sharp)
- `src/components/cards/videoCard.tsx` — ajout Intersection Observer, vidéos chargées uniquement quand visibles

### Décisions techniques
- Compression en gardant le même format et nom de fichier — aucune référence à mettre à jour dans le code
- `rootMargin: "200px"` sur l'observer — commence à charger 200px avant que la vidéo soit visible pour éviter un blanc au scroll
- `observer.disconnect()` après le premier déclenchement — plus besoin d'observer une fois la vidéo chargée

### Impact
- **Poids total** : ~37 MB → ~9 MB (-75%) — la page charge 4× moins de données images
- **LCP (Largest Contentful Paint)** : les images lourdes ne bloquent plus le rendu initial — amélioration directe du score Lighthouse
- **Bande passante mobile** : les utilisateurs sur réseau lent ou mobile voient la page bien plus rapidement
- **Vidéos** : les 6 vidéos autoplay ne sont plus chargées au démarrage — seules celles visibles à l'écran se chargent, économie significative sur la homepage

---

## 2026-05-18 — PERF-05 : security headers

### Tâches terminées
- [PERF-05] Security headers dans next.config.ts

### Fichiers modifiés
- `next.config.ts` — ajout bloc `headers()` avec X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

### Décisions techniques
- Headers appliqués sur toutes les routes `/(.*)`
- Pas de CSP pour l'instant — nécessite un inventaire complet des scripts/domaines externes (GA, WP, fonts) pour ne pas tout casser

### Impact
- **Clickjacking** : `X-Frame-Options: DENY` empêche d'intégrer le site dans un iframe malveillant
- **MIME sniffing** : `X-Content-Type-Options` empêche le navigateur d'interpréter des fichiers dans un format non déclaré (vecteur d'attaque XSS)
- **Vie privée** : `Referrer-Policy` limite les informations transmises aux sites externes lors d'un clic sur un lien sortant
- **Confiance** : un outil comme securityheaders.com affiche maintenant un meilleur score — critère de confiance pour les RH et DSI qui évaluent des outils SaaS

---

## 2026-05-18 — SEC-02 + SEC-01 : sécurisation

### Tâches terminées
- [SEC-02] Mot de passe admin sorti du code source
- [SEC-01] Rate limiting sur l'API sendEmail

### Fichiers modifiés
- `src/app/api/maintenance/route.ts` — `ADMIN_PASSWORD` lu depuis `process.env.ADMIN_PASSWORD`
- `src/app/admin/page.tsx` — suppression vérification locale hardcodée, validation uniquement côté API
- `.env.local` — ajout `ADMIN_PASSWORD`
- `src/app/api/sendEmail/route.ts` — rate limiter en mémoire (5 req/min par IP, retourne 429)

### Décisions techniques
- Rate limiting en mémoire (Map) — suffisant pour un site vitrine, zéro nouvelle dépendance. Si multi-instances à terme, migrer vers Redis (Upstash).
- Vérification mot de passe côté client supprimée — le code JS du bundle est lisible par n'importe qui, seul le serveur doit valider.

### Impact
- **Mot de passe admin** : avant, n'importe qui pouvant lire le code source (GitHub, bundle JS) pouvait trouver le mot de passe — maintenant il est uniquement dans `.env.local`, inaccessible publiquement
- **Spam formulaire** : un bot ne peut plus envoyer plus de 5 emails par minute depuis la même IP — protège la boîte mail et évite les abus de l'API Gmail

---

## 2026-05-18 — Mise en place méthodologie

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

### Impact
- **SEO majeur** : le contenu de la homepage (titre, description) est maintenant dans le HTML initial envoyé par le serveur — Google le lit immédiatement sans attendre l'exécution du JavaScript
- **Performance** : suppression de `useState` + `useEffect` + fetch côté client → le navigateur reçoit une page déjà remplie, pas une page vide qui se remplit après coup
- **Hydratation** : plus d'erreurs de mismatch SSR/client sur la homepage
