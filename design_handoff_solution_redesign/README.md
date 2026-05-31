# Handoff — Page `/solution` (redesign scroll narratif)

## Comment lire ce document
Ce dossier décrit **à l'identique** la maquette HTML (`La solution.html` + `solution.jsx` + `solution-sections.jsx`, jointes en référence) pour que tu la recrées dans le projet **Next.js 15 / TypeScript / CSS modules**.

- Les fichiers HTML/JSX joints sont des **références de design**, pas du code à copier tel quel. Recrée-les avec les conventions du repo (1 composant + 1 fichier CSS dans `src/styles/`, fonts Supreme/Prompt/Instrument, `lucide-react`).
- Fidélité : **hi-fi** — couleurs, typo, espacements et états sont définitifs. Reproduis au pixel.
- Toutes les valeurs ci-dessous sont **exactes** (extraites de la maquette). Quand une valeur ressemble à `rgba(106,19,64,…)`, c'est de l'**ink à faible opacité** — tu peux la remplacer par `rgba(74,21,48,…)` (ton `--ink` réel) si tu préfères, l'effet est identique.

---

## 1 · Structure de la page (ordre du DOM)

```
<SolutionNav/>              (fixe, existant)
<main>
  <SolutionHero/>          1. existant — ajustements mineurs
  <SolutionProofBar/>      2. NOUVEAU — bande sombre
  <SolutionAnchorNav/>     —  NOUVEAU — nav d'ancrage sticky (scroll-spy)
  <SolutionForWho/>        3. id="pour-qui"        (remplace AvantagesHome)
  <SolutionHowItWorks/>    4. id="comment"         (remplace FunctOrganisation)
  <SolutionThemes/>        5. id="themes"          (NOUVEAU)
  <FeaturesCard/>          6. id="fonctionnalites" (refonte)
  <PricingTable/>          7. id="offres"          (refonte)
  <PartnerBanner/>         8. existant — garder
  <AppointmentSection/>    8. existant — garder
</main>
<Footer/>                  existant
```
Chaque section ancrée porte `id` + `scroll-margin-top: 70px`.
Plus de `SolutionTabs` : tout est en scroll linéaire.

---

## 2 · Design tokens (utilise tes globals)

| Rôle | Token | Valeur |
|---|---|---|
| Accent 1 | `--orange` / `--mainColor` | `#FD6E00` |
| Accent 2 | `--rose` / `--secondaryColor` | `#D90A5C` |
| Accent 3 | `--blueUvibes` | `#00AFDD` |
| Texte principal | `--ink` | `#4A1530` |
| Texte corps | `--ink-2` | mid |
| Texte secondaire | `--ink-3` | muted |
| Texte ténu / labels | `--ink-4` | clair |
| Fond crème (sections A) | `--cream` | crème |
| Fond cassé (sections B) | `--paper` | blanc cassé |
| Dégradé marque | `--gradient-brand` | `linear-gradient(135deg,#FD6E00,#D90A5C)` |

**Tokens locaux à ajouter** (`solution.css` ou variables de page) :
```css
--sol-dark: linear-gradient(135deg,#3a0a22 0%, var(--ink) 55%, #5a1038 100%); /* ProofBar + carte Premium (160deg) */
--sol-step-rail: linear-gradient(to bottom, var(--orange), var(--rose));
--sol-card-shadow: 0 14px 34px -22px rgba(74,21,48,.22), 0 0 0 1px rgba(74,21,48,.06);
--sol-card-shadow-hover: 0 30px 60px -26px rgba(74,21,48,.45);
--sol-divider-dashed: 1px dashed rgba(74,21,48,.16);
--ease: cubic-bezier(.2,.7,.2,1);
```

### Typographie (mapping vers tes fonts)
| Usage maquette | Dans le repo | Réglages |
|---|---|---|
| `.prompt-display` (titres + chiffres) | `--font-prompt` / `.v-prompt`, **800** | `letter-spacing:-0.04em` (jusqu'à `-0.055em` sur très grands titres), `line-height:.9–.95` |
| Accent serif italique | `--font-instrument` / `.v-serif`, **400 italic** | `letter-spacing:-0.02em` + texte en dégradé (voir « SerifAccent ») |
| Eyebrow / labels / tags / sources | `.v-mono` (Roboto Mono) | `text-transform:uppercase`, `letter-spacing` 1.2–2px |
| Corps de texte | `--text-font` (Supreme-Light), gras `--text-font-bold` | `line-height:1.45–1.55` |

### Icônes (`lucide-react`)
`Compass`, `Clock`, `Eye`, `BookOpen` (étapes) · `Sparkles`, `GraduationCap`, `Lightbulb`, `Calendar`, `Gamepad2`, `MessageSquare` (thématiques) · `Check`, `X`, `ArrowRight` (UI). Stroke par défaut `1.9`, `Check` à `2.6`.

### Responsive (breakpoints existants)
- **≤1024px** : grilles 3 col → 2 col ; padding horizontal section `32px`.
- **≤768px** : toutes les grilles → 1 col ; padding section `60px 20px` ; header sticky de HowItWorks redevient statique ; cercles vidéo `max 76vw`.
- **≤480px** : padding horizontal `16px`.

---

## 3 · Patterns partagés (à factoriser)

### `SectionHead` (en-tête de section)
- Wrapper : `text-align:left` par défaut, ou **center** (`max-width:820px; margin:0 auto`).
- **Eyebrow** : `.v-mono` `12px`, `letter-spacing:2px`, uppercase, `color:var(--rose)`, `display:inline-flex; gap:10px; align-items:center`. Pastille en tête : `8×8px`, `border-radius:50%`, `background:<dot>`, `box-shadow:0 0 0 4px rgba(253,110,0,.16)` (orange) ou `rgba(217,10,92,.16)` (rose).
- **H2** : `.v-prompt` 800, `font-size:clamp(38px,4.8vw,72px)`, `line-height:.95`, `margin-top:18px`.
- **Sous-titre** : `18px`, `line-height:1.55`, `color:var(--ink-3)`, `margin-top:18px`, `max-width:600px` (820 si centré).

### `SerifAccent` (mot/segment en serif dégradé)
```css
font-family: var(--font-instrument); font-style: italic; font-weight: 400;
letter-spacing: -0.02em;
background: linear-gradient(90deg, var(--orange), var(--rose));
-webkit-background-clip: text; background-clip: text; color: transparent;
```

### `CheckChip` (puce bénéfice)
`22×22px` cercle, `background:rgba(<accent>,.14)`, contenant `<Check size={13} stroke=<accent> strokeWidth={2.6}/>`.

### Apparition au scroll (« Reveal »)
`opacity:0→1` + `translateY(24px→0)`, `transition:900ms var(--ease)` (réglage « vibing » ; « soft » = 700ms ; « off » = aucune). Déclenché en entrée de viewport (IntersectionObserver `threshold:.08`, `rootMargin:0 0 -40px 0`). Stagger : `delay = index × 70–120ms`. En React → hook `useInView` ou `framer-motion`.

### Boutons
- Base `.btn` : `inline-flex; gap:10px; padding:14px 22px; border-radius:999px; font-weight:600; font-size:14px; transition:all 280ms var(--ease)`.
- `.btn-brand` / gradient : `background:linear-gradient(90deg,var(--orange),var(--rose)); color:#fff; box-shadow:0 16px 40px -16px rgba(217,10,92,.5)`; hover `translateY(-1px)`.
- Secondaire (hero) : fond `rgba(250,246,239,.7)`, `border:1.5px solid var(--ink)`, `backdrop-filter:blur(8px)`, `color:var(--ink)`.

---

## 4 · Détail des sections

### 4.1 `SolutionHero` (ajustements)
- Section : `padding:140px 56px 80px`, `background:var(--cream)`, `overflow:hidden`, `position:relative`.
- Grille : `grid-template-columns:1.3fr 1fr; gap:50px; align-items:center` (→ 1 col ≤768).
- **Eyebrow pill** : `inline-flex; gap:10px; padding:6px 14px; border-radius:999px; background:rgba(250,246,239,.7); backdrop-filter:blur(8px); border:1px solid rgba(74,21,48,.1)`. Pastille `8px` orange + `box-shadow:0 0 0 4px rgba(253,110,0,.18)`. Texte `.v-mono 11px ls2 uppercase ink-3` = « La solution Uvibes ».
- **H1** : `.v-prompt clamp(56px,8vw,132px)`, `line-height:.9`. 3 lignes : « La solution » / « pour votre » / « **collectif.** » (3e ligne en `SerifAccent`, soulignée par un trait SVG dessiné optionnel).
- **Sous-titre** : `19px lh1.55 ink-3 max-width:540px margin-top:28px` = « Découvrez comment Uvibes s'adapte à votre contexte et choisissez l'offre qui vous correspond. »
- **CTAs** (`margin-top:32px; gap:14px`) : `Explorer la solution` (gradient, `padding:16px 24px`, lien `#pour-qui` + icône flèche) · `Voir les offres` (secondaire outline, lien `#offres`).
- **Micro-stats** (`margin-top:46px; display:flex; gap:36px; flex-wrap`) : chaque item `display:flex; align-items:baseline; gap:10px` → valeur `.v-prompt 34px` (couleur **orange**, item #2 **rose**) + label `.v-mono 11px ls1.2 ink-4 uppercase`. Contenu : `3 500 · membres` / `11 · collectifs` / `4.9/5 · satisfaction`.
- **Colonne droite** : mockup app existant (image + halo). Garde ton composant mockup/vidéo actuel.
- **Décor marque** (optionnel) : ligne sinusoïdale « vibration » (SVG path sinus) en haut (orange, `opacity:.42`) et bas (rose, `opacity:.32`) + 2 blobs radiaux flous animés. Purement décoratif.

### 4.2 `SolutionProofBar` (NOUVEAU)
- Section : `background:var(--sol-dark)`, `color:#fff`, `padding:clamp(48px,6vw,84px) 56px`, `overflow:hidden`, `position:relative`.
- Grille : 3 colonnes, `gap:0`. Chaque colonne `padding:8px clamp(20px,3vw,48px)`, et **séparateur** `border-left:1px solid rgba(255,255,255,.14)` sur les colonnes 2 & 3.
- **Chiffre** : `.v-prompt clamp(46px,6vw,82px) lh1`, texte en dégradé `linear-gradient(120deg, var(--orange), #ff5e8e)` (background-clip:text).
- **Label** : `17px lh1.45`, `color:rgba(255,255,255,.78)`, `margin-top:18px`, `max-width:320px`.
- **Source** : `.v-mono 11px ls1.4 uppercase`, `color:rgba(255,255,255,.42)`, `margin-top:16px`.
- Contenu :
  - `93 %` — des salariés non engagés en France — *Gallup, 2025*
  - `41 %` — des étudiants présentent des symptômes dépressifs — *Université Bordeaux, 2024*
  - `−38 %` — de risque de démence avec une vie sociale active — *Rush University, 2025*
- Mobile : empile en 1 col, retire les `border-left`.

### 4.3 `SolutionAnchorNav` (NOUVEAU — scroll-spy)
- Placé juste après la ProofBar. `position:sticky; top:0; z-index:40`.
- État **épinglé** (au scroll) : `background:rgba(243,237,227,.94); backdrop-filter:blur(14px); border-bottom:1px solid rgba(74,21,48,.08)`. Non épinglé : fond `--cream`, bordure transparente. `transition:all 300ms ease`.
- Rangée : `display:flex; padding:0 56px; gap:4px; overflow-x:auto` (masquer la scrollbar).
- **Lien** : `padding:16px`, `white-space:nowrap`. Index `.v-mono 11px ls1.2 opacity:.7` + label `14.5px weight:500`. Actif → `color:var(--ink)` (inactif `--ink-4`) + barre `3px` orange `border-radius:3px` (`left:12px;right:12px;bottom:0`).
- Liens : `01 Pour qui` (`#pour-qui`) · `02 Comment ça marche` (`#comment`) · `03 Thématiques` (`#themes`) · `04 Fonctionnalités` (`#fonctionnalites`) · `05 Nos offres` (`#offres`).
- **Scroll-spy** : IntersectionObserver sur les sections, `rootMargin:"-45% 0px -50% 0px"`. Clic = scroll fluide avec offset `-56px`.

### 4.4 `SolutionForWho` (id="pour-qui") — fond `--cream`
- `SectionHead` **centré** : eyebrow « Pour qui ? » (dot orange) · titre « Uvibes s'adapte / à votre `contexte.` » (serif) · sous-titre « Des résultats concrets, mesurés — quel que soit votre collectif. ». `margin-bottom:48px`.
- Grille : 3 col `gap:24px; align-items:stretch`.
- **Carte** (`flex-column; height:100%`) : `background:var(--paper); border-radius:22px; border-top:4px solid <accent>; padding:30px 28px 32px`. Ombre `--sol-card-shadow`. **Hover** : `translateY(-6px)` + ombre `0 30px 60px -26px rgba(<accent>,.5)`, `transition:460ms var(--ease)`. Glow radial top-right `200×200px rgba(<accent>,.14)`.
  - **Badge** : `.v-mono 11px ls1.6 uppercase`, `color:<accent>`, `padding:6px 12px; border-radius:999px; border:1px solid <accent>; background:rgba(<accent>,.14)`, aligné à gauche.
  - **Intro** : `16px lh1.5 ink-2 margin-top:20px`.
  - **Séparateur** : `margin-top:24px; padding-top:22px; border-top:var(--sol-divider-dashed)`.
  - **Grande stat** : `.v-prompt clamp(50px,5.4vw,78px) lh.9; color:<accent>`. Desc `13.5px lh1.4 ink-3 margin-top:10px`. Source `.v-mono 10.5px ls1.2 ink-4 uppercase`.
  - **Bénéfices** : `ul margin-top:26px; gap:16px`. Item `flex; gap:12px` → `CheckChip(<accent>)` + titre `.v-prompt 700 15px ink` + desc `13.5px lh1.45 ink-3`.
- Cartes & contenu :
  | # | Accent | Badge | Intro | Stat | Bénéfices (titre — desc) |
  |---|---|---|---|---|---|
  | 1 | `--orange` | Entreprises | Stimule le bien-être individuel pour renforcer la performance collective. | **93 %** · des salariés non engagés ou activement désengagés · Gallup, 2025 | Performance — Stimuler la réflexion et susciter l'adhésion collective · Lien d'appartenance — Renforcer le lien affectif entre l'entreprise et ses équipes · RSE — Satisfaire le besoin relationnel et alléger la gestion émotionnelle |
  | 2 | `--rose` | Enseignement | Améliore la sociabilité des apprenants et renforce le lien de la communauté. | **41 %** · des étudiants présentent des symptômes dépressifs · Université Bordeaux, 2024 | Santé mentale — Échanges bienveillants, élimination du cyberharcèlement · Soft skills — Premier espace d'entraînement aux compétences interpersonnelles · Appartenance — Renforcer le lien alumni, initier des mentorats enrichissants |
  | 3 | `--blueUvibes` | Collectifs | Une nouvelle respiration pour les organisations du prendre soin. | **−38 %** · de risque de démence grâce à une vie sociale active · Rush University, 2025 | Lien social — Rompre l'isolement et stimuler les capacités cognitives · Épanouissement — Renforcer la confiance en soi et en son entourage · Transmission — Créer des communautés d'entraide entre pairs |

### 4.5 `SolutionHowItWorks` (id="comment") — fond `--paper`
- Grille : `grid-template-columns:1fr 1.25fr; gap:clamp(36px,6vw,80px); align-items:start` (→ 1 col ≤768).
- **Colonne gauche** (`position:sticky; top:96px` ; statique en mobile) : `SectionHead` eyebrow « Configuration » (dot orange) · titre « Comment ça marche / pour votre `organisation ?` » (serif) · sous-titre « Vous gardez le contrôle. Nous fournissons la plateforme, vous définissez le contenu. ». Puis label `.v-mono 12px ls1.6 ink-4 uppercase margin-top:30px` = « Vous définissez : ».
- **Colonne droite** : 4 `StepRow`. Chaque rangée `grid-template-columns:72px 1fr; gap:clamp(18px,3vw,40px); padding-bottom:44px` (0 sur la dernière).
  - **Rail** : conteneur centré. Trait vertical `absolute; top:64px; bottom:-44px; width:2px; background:var(--sol-step-rail); opacity:.5` (absent sur la dernière étape). Pastille `64×64px; border-radius:50%; background:var(--gradient-brand); color:#fff; display:grid; place-items:center; box-shadow:0 16px 34px -16px rgba(217,10,92,.5)` contenant l'icône lucide `26px` blanche.
  - **Contenu** : filigrane numéro `.v-prompt clamp(70px,9vw,116px); color:var(--ink); opacity:.07; position:absolute; top:-22px; left:-6px; z-index:0`. Au-dessus : `.v-mono 11px ls1.6 rose uppercase` = « Étape 0X » · H3 `.v-prompt 700 clamp(22px,2.4vw,30px) lh1.12 ink max-width:560px margin-top:10px` · body `16px lh1.55 ink-3 max-width:600px margin-top:12px` · **tag** `inline-flex; gap:8px; padding:8px 14px; border-radius:999px; background:var(--cream-2); border:1px solid rgba(74,21,48,.1); margin-top:16px` (pastille 6px orange + `.v-mono 11.5px ls.6 ink-2`).
- Étapes :
  | N | Icône | Titre | Description | Tag |
  |---|---|---|---|---|
  | 01 | `Compass` | Les thématiques de votre collectif | Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées. | 200+ sujets en bibliothèque |
  | 02 | `Clock` | Le moment et la durée des échanges | Matin (7h–9h), pause déjeuner (12h–14h) ou après-midi (15h–17h). Chaque échange dure entre 6 et 20 minutes. | Pic d'engagement : après-midi |
  | 03 | `Eye` | Les sujets sur lesquels obtenir la vision de votre collectif | Satisfaction et bien-être, perception des initiatives, idées d'amélioration, attentes non exprimées. | Tableaux de bord temps réel |
  | 04 | `BookOpen` | Les ressources explorées par votre collectif | Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus. | Inclus dans tous les plans |

### 4.6 `SolutionThemes` (id="themes") — fond `--cream`
- `SectionHead` centré : eyebrow « Thématiques » · titre « 6 univers de conversation / pour votre `collectif.` » (serif). `margin-bottom:48px`.
- Grille : 3 col `gap:20px` (→ 2 col ≤1024 → 1 col ≤768), `align-items:stretch`.
- **Carte** (`flex-column; height:100%`) : `background:var(--paper); border-radius:18px; padding:26px; border:1px solid rgba(74,21,48,.09)`. Ombre repos `0 4px 14px -10px rgba(74,21,48,.18)` ; hover `0 24px 48px -26px rgba(217,10,92,.3)` + `translateY(-4px)`, `transition:420ms var(--ease)`.
  - **Tuile icône** : `46×46px; border-radius:13px; display:grid; place-items:center; background:linear-gradient(135deg,rgba(253,110,0,.14),rgba(217,10,92,.14)); color:var(--rose)`. Icône lucide `23px` rose. **Hover** : `scale(1.08) rotate(-3deg)`.
  - **Titre** : `.v-prompt 700 21px ink margin-top:18px`.
  - **Desc** : `14.5px lh1.5 ink-3 margin-top:8px`.
  - **Question** (`margin-top:auto`) : `padding-top:16px; border-top:var(--sol-divider-dashed)`, texte `.v-serif italic 17px lh1.35 rose`, entre guillemets `« … »`.
- Contenu :
  | Icône | Titre | Desc | Question |
  |---|---|---|---|
  | `Sparkles` | Réflexions & loisirs | Aspirations individuelles, séries TV, modèles de réussite. | Quel personnage de film t'inspire ? |
  | `GraduationCap` | Expertise & formation | Réflexions autour de sujets professionnels et pédagogiques. | Comment vois-tu le management du futur ? |
  | `Lightbulb` | Astuces & bons plans | Partage d'expériences et conseils pratiques. | Des recettes de saison à partager ? |
  | `Calendar` | Événements & actualités | Octobre rose, cultures locales, Tour de France. | La tradition préférée de votre territoire ? |
  | `Gamepad2` | Jeux & mises en situation | Challenges en équipe et jeux de rôle. | Trouvez 6 métiers commençant par M |
  | `MessageSquare` | Débats | Mettre en commun différents points de vue. | Bienfaits et limites du progrès |

### 4.7 `FeaturesCard` (id="fonctionnalites") — alternance
- **Bloc intro** : `background:var(--paper); padding:clamp(70px,8vw,100px) 56px clamp(20px,3vw,40px); text-align:center`. `SectionHead` centré : eyebrow « Fonctionnalités » · titre « Ce qu'Uvibes change, / `concrètement.` » (serif) · sous-titre « Trois regards sur une même expérience — pour votre collectif, pour vous, pour chacun. ».
- **3 `FeatureRow`** alternées. Rangée : `padding:clamp(54px,6vw,86px) 56px; overflow:hidden; position:relative`. Fond : index pair → `--paper`, impair → `--cream`. **Filigrane numéro** `.v-prompt clamp(120px,18vw,260px); color:var(--ink); opacity:.05; position:absolute; top:10px`, `left:24px` (pair) / `right:24px` (impair).
  - Grille : `grid-template-columns:1.05fr .95fr; gap:clamp(36px,6vw,80px); align-items:center`. **L'ordre s'inverse** une rangée sur deux (texte à droite sur l'index impair). → 1 col ≤768.
  - **Texte** : eyebrow `.v-mono 12px ls2 <accent> uppercase` + pastille 8px `<accent>` · H3 `.v-prompt clamp(32px,3.6vw,52px) lh1.02 ls-0.03em margin-top:16px` · bullets `ul margin-top:24px; gap:14px`, item `flex; gap:12px; 16px lh1.5 ink-2 max-width:480px` + `CheckChip(<accent>)`.
  - **Média (cercle)** : `340×340px` (`max:76vw`), `border-radius:50%`, fond rayé `repeating-linear-gradient(135deg, rgba(<accent>,.1) 0 14px, transparent 14px 28px)` sur `radial-gradient(circle at 50% 38%, rgba(255,255,255,.7), var(--cream-2))`, `border:1.5px solid rgba(<accent>,.32)`, `box-shadow:0 30px 60px -28px rgba(<accent>,.4)`. 3 anneaux concentriques animés (`scale .7→1.25`, fade, `4.5s`, stagger `1.3s`). Légende `.v-mono` « vidéo · placeholder » + `.v-prompt 19 ink-2`. → **Remplace par ta vraie vidéo circulaire** (`featuresData.ts`).
  - Accent par index : 0 = `--orange`, 1 = `--rose`, 2 = `--orange`.
- Contenu (titres depuis `featuresData.ts`, bullets ré-écrites — à valider) :
  | N | Eyebrow | Titre | Bullets |
  |---|---|---|---|
  | 01 | Pour votre collectif | Un voyage conversationnel | Des échanges vidéo one-to-one, guidés par des questions adaptées à chaque thématique. · 200+ sujets prêts à l'emploi — ou les vôtres, en quelques clics. · Des rencontres courtes, de 6 à 20 minutes, qui s'intègrent dans la journée. |
  | 02 | Pour vous | Une connaissance approfondie de votre organisation | Des tableaux de bord en temps réel : satisfaction, bien-être, engagement. · La perception des initiatives collectives, mesurée à la source. · Les attentes et besoins non exprimés, enfin rendus visibles. |
  | 03 | Pour tous | Un parcours d'entraînement aux compétences relationnelles | Un premier espace d'entraînement aux compétences interpersonnelles. · Des échanges bienveillants qui renforcent la confiance en soi. · Une habitude qui se cultive, échange après échange. |

### 4.8 `PricingTable` (id="offres") — fond `--cream`
- `SectionHead` centré : eyebrow « Tarification » · titre « Nos offres `Vibes.` » (serif) · sous-titre « Choisissez le plan adapté à votre collectif. Tous les plans incluent les expériences interactives. ». `margin-bottom:52px`.
- Grille : 3 col `gap:22px; align-items:stretch; max-width:1140px; margin:0 auto` (→ empile ≤768).
- **Carte** (`flex-column; height:100%; border-radius:24px; padding:32px 28px`) :
  - *Standard* (Connection, Boost) : `background:var(--paper); border:1px solid rgba(74,21,48,.09); box-shadow:0 16px 38px -24px rgba(74,21,48,.22)`.
  - *Mise en avant* (Premium) : `background:linear-gradient(160deg,#3a0a22,var(--ink) 70%); color:#fff; border:1px solid rgba(255,255,255,.12); box-shadow:0 40px 80px -32px rgba(217,10,92,.55); transform:translateY(-14px)`. Liseré haut `4px` `var(--gradient-brand)`. Glow radial top-right.
  - **Header** : carré accent `12×12px; border-radius:4px` (orange / `#FFE456` / rose) + **badge** `.v-mono 10px ls1.4 uppercase; padding:5px 11px; border-radius:999px` (Premium = gradient orange→rose, `#fff` ; standard = `background:var(--cream-2); color:ink-3; border:1px`).
  - **Nom** : `.v-prompt 34px`. **Desc** : `14.5px lh1.5; min-height:64px`.
  - **Prix** : `margin-top:18px; padding-top:18px; border-top` (Premium `1px solid rgba(255,255,255,.14)`, standard `var(--sol-divider-dashed)`). « **Sur devis** » `.v-prompt 30px 800` + `.v-mono 11px ls1 uppercase` « · adapté à votre taille ». *(Brancher le prix dynamique API si dispo.)*
  - **CTA** : bouton gradient pleine largeur `padding:15px 18px` + `<ArrowRight 16/>`.
  - **Label liste** : `.v-mono 11px ls1 uppercase margin-top:22px` → si héritage : « Tout {Connection|Premium}, et : » (Premium en `#FFE456`, Boost en rose) ; sinon « Ce qui est inclus ».
  - **Liste** (`ul margin-top:12px; gap:11px; flex-grow:1`) : item `flex; gap:10px; 13.5px lh1.4`. Inclus → `<Check>` (Premium `#FFE456`, standard `#16a34a`, strokeWidth 2.6), texte `ink-2` (ou variantes blanches). Exclu → `<X>` gris, texte `line-through` `ink-4`. Items **nouveaux** au palier (héritage) en **gras 600**.
- **Liste des 11 fonctionnalités** (ordre) & inclusion :
  | # | Fonctionnalité | Connection | Premium | Boost |
  |---|---|:--:|:--:|:--:|
  | 1 | Expériences interactives (1 000 vibes) | ✓ | ✓ | ✓ |
  | 2 | Sondages | ✓ | ✓ | ✓ |
  | 3 | Baromètre bien-être | ✓ | ✓ | ✓ |
  | 4 | Statistiques & pilotage | ✓ | ✓ | ✓ |
  | 5 | Logo de votre entreprise | ✕ | ✓ | ✓ |
  | 6 | Kit de communication | ✕ | ✓ | ✓ |
  | 7 | Actualités internes | ✕ | ✕ | ✓ |
  | 8 | Networking — cartes de visite digitales | ✕ | ✕ | ✓ |
  | 9 | Brainstorming — enquêtes post vibes | ✕ | ✕ | ✓ |
  | 10 | Employer branding — invités extérieurs | ✕ | ✕ | ✓ |
  | 11 | Soft skills — parcours ou médiathèque | ✕ | ✕ | ✓ |
- Plans : **Vibes Connection** (accent orange, CTA « Démarrer », pas de badge) · **Vibes Premium** (accent `#FFE456`, badge « Le plus populaire », carte sombre, CTA « Choisir Premium ») · **Vibes Boost** (accent rose, badge « Tout inclus », CTA « Contacter l'équipe »). Accroches :
  - Connection : « Favorisez les interactions et suivez l'état d'esprit de votre collectif. »
  - Premium : « Renforcez la visibilité de votre marque et l'efficacité de votre communication interne. »
  - Boost : « Boostez la dynamique de votre collectif avec des outils de travail innovants. »

### 4.9 `PartnerBanner` + `AppointmentSection` + `Footer`
Inchangés — garde l'existant. (Dans la maquette : marquee de logos partenaires sur `--cream-2`, carte CTA « Étudions votre projet » avec encart Calendly, footer crème.)

---

## 5 · Interactions & comportements
- **Scroll-spy** : surligne l'ancre dont la section croise la bande `-45%/-50%` du viewport.
- **Hover cartes** : `translateY` + élévation d'ombre (ForWho −6px, Themes −4px), `transition:420–460ms var(--ease)`. Tuiles icône Themes : `scale(1.08) rotate(-3deg)`.
- **Reveal** : entrée en viewport, stagger par index (voir §3).
- **Nav fixe** : passe en fond `rgba(243,237,227,.92)` + blur dès `scrollY>30`.
- **Liens d'ancrage** : scroll fluide, offset `-56px`.

## 6 · Fichiers de référence joints
- `La solution.html` — page hôte (tokens `:root`, fonts, classes `.btn*`, ordre de montage).
- `solution-sections.jsx` — **les 6 sections** (ProofBar, ForWho, HowItWorks, Themes, Features, Pricing) + helpers `Icon`, `SectionHead`, `SerifAccent`. **C'est la source de vérité des valeurs.**
- `solution.jsx` — orchestrateur : Nav, Hero, AnchorNav (scroll-spy), Partners, CTA, Footer.

> Note : la maquette est en React/Babel mono-fichier avec styles inline. Reporte les valeurs dans tes **CSS modules** (`src/styles/solution/*.css`) et découpe en composants TSX selon ton arborescence habituelle.
