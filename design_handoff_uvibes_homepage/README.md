# Handoff : Refonte page d'accueil Uvibes

## À lire d'abord

Ce dossier contient les **références de design** pour la nouvelle page d'accueil Uvibes, créées sous forme de prototype HTML/JSX dans `/prototype/`. **Ce n'est pas du code de production à copier tel quel.** Ta mission est de **recréer ces designs dans le codebase Uvibes existant** (Next.js / WordPress / quel que soit le stack actuel — repère-le et utilise ses patterns établis).

Le prototype est en React via Babel standalone uniquement pour rendre l'itération design rapide ; en prod, utilise les conventions du projet (TypeScript, CSS modules / Tailwind / styled-components selon ce qui existe déjà).

## Fidélité

**Hifi.** Les couleurs, typographies, espacements, animations sont définitifs. Reproduis pixel-perfect en respectant la charte graphique fournie (PDF d'origine dans le projet). La direction validée est **« Vibration éditoriale »** — c'est elle qu'il faut implémenter en priorité. Une seconde direction « Kinetic Vibes » est dans le prototype à titre exploratoire — ignore-la sauf demande explicite.

## Vue d'ensemble

Page d'accueil full-scroll en français, ton chaleureux et énergique. Cible : DRH, dirigeants d'asso, managers, étudiants, seniors, sportifs, mairies — toute forme de collectif. La signature graphique repose sur :

- **Gradient orange → rose** (FD6E00 → D90A5C) — uniquement sur les accents en gras et les CTAs primaires
- **Motif de vibration** (ondes sinusoïdales animées) en fil rouge graphique
- **Typo mixte** : Prompt (display/sans), Instrument Serif italique (accents éditoriaux), Roboto (texte courant), Roboto Mono (éléments techniques/eyebrows)
- **Fond crème chaud** (#f3ede3) — jamais blanc pur

## Sections (dans l'ordre, full scroll)

### 1. Nav (sticky, change de style au scroll)
- Logo Uvibes à gauche, menu central (Bienvenue, La solution, À propos, Blog), CTA `Essayer gratuitement` à droite (bouton ink avec pastille orange)
- État scrolled : fond `rgba(243,237,227,.85)` + backdrop-blur(14px) + border-bottom 1px

### 2. Hero — **animé** (section signature)
- **Background** : 4 blobs gradient radiaux (orange/rose) en blur(20–28px) qui dérivent en boucle 22–34s, ondes SVG superposées qui ondulent, grain SVG fractalNoise, grille de points en masque radial, 14 particules colorées flottantes
- **Titre H1** clamp(56px, 7.5vw, 116px), Prompt bold + mot `puissance` en Instrument Serif italique avec soulignement orange en path SVG, dernier mot `collectif.` en rose
- **Sous-titre** avec accents en gras orange et rose (« L'outil digital » + « au bon moment »)
- **CTA primaire** : gradient orange→rose, radius 999px, shadow `0 18px 40px -14px rgba(217,10,92,.5)`
- **CTA secondaire** : verre dépoli (rgba blanc 55% + blur)
- **Visuel droit** : phone mock entouré de 4 anneaux de ripple concentriques (animation 4s en boucle décalée), orbite pointillée qui tourne, EQ visualizer 6 barres animées à gauche du phone, chips flottantes (statut Léa + témoignage rose)
- **Ligne de vibration animée** SVG en bas de section
- **Compteur live** « 3 142 conversations en cours » avec point vert pulsant

### 3. Bandeau utilisateurs (fond ink)
- Compteur animé `useCountUp` (target 12480, à brancher sur l'endpoint WordPress qui sert ce chiffre)
- Phrases qui s'enchaînent : « organisations / rencontres provoquées / minutes d'écoute / vibrations partagées »
- Indicateur sync wordpress à droite

### 4. Piliers — Fédérer & Piloter
- 2 cartes côte à côte, fond paper, border 1px rgba(26,23,21,.08)
- Chacune : dot coloré + label `0X / pilier`, titre Prompt 36px avec « et » en italique serif, stat XXL coloré (orange/rose) en bas
- Petite ligne de vibration en haut à droite de chaque carte

### 5. Enjeux — **rotation automatique** (section refondue)
- Vague décorative SVG en haut et en bas pour les transitions
- Carte « réponse » à gauche dont le **fond gradient change** toutes les 3,4s en transition 800ms cubic-bezier(.2,.7,.2,1)
- Carte contient : tag « Cas 0X · {type} », indicateur dots (actif large), question en guillemets français, réponse Uvibes, stat + CTA verre dépoli
- 6 sparkles internes animés
- Grille 2×3 de chips à droite : chacune avec son propre gradient/couleur, onde animée à l'intérieur de la chip active, hover/click pour basculer manuellement
- Flèches prev/next + compteur 0X/06 dans le header
- CTA bas en gradient orange→rose

#### Les 6 cas (copy + couleur exacte) :
| # | Tag | Background | Foreground |
|---|---|---|---|
| 01 | Entreprise | `linear-gradient(135deg, #FD6E00, #ff9558)` | #fff |
| 02 | Université | `linear-gradient(135deg, #D90A5C, #ff5e9c)` | #fff |
| 03 | Association | `#1a1715` (ink) | #faf6ef (paper) |
| 04 | Sport | `linear-gradient(135deg, #FD6E00, #D90A5C)` | #fff |
| 05 | Seniors | `#faf6ef` (paper) | #1a1715 |
| 06 | Mairie | `#e2d7c1` (cream-3) | #1a1715 |

Voir `prototype/direction-vibration.jsx` (fonction `A.Enjeux`) pour les questions, réponses, et stats exacts.

### 6. Trustees — marquee infini
- Header « Ils avancent avec nous » + « + 80 organisations partenaires »
- Marquee horizontal `33.33%` translation, 50s linear infinite, mask gradient sur les bords
- Logos en texte Prompt 28px gris + dot orange séparateur (en attendant les vrais logos PNG/SVG)

### 7. Comment ça marche — 3 étapes
- Header en split : titre Prompt + CTA gradient
- Ligne ondulée pointillée rose qui relie les 3 étapes
- Cercles 100px avec n° (01/02/03), border 1.5px ink, anneau pointillé rose qui tourne (spin-slow 40s)
- Time badge cream-2 avec dot orange

### 8. Vidéos témoignages — **rotation auto**
- Section dark (fond ink)
- Grille asymétrique 3 colonnes (1.4fr 1fr 1fr) — la carte « featured » occupe 2 lignes
- Featured rotate automatiquement toutes les 3,6s
- Sous la featured : citation en Instrument Serif italique 22px
- Sous les vidéos : 3 cartes témoignages écrits (étoiles + quote + nom/role)
- Stars : SVG path noir, fill orange si actif

### 9. Avantages — grille 6 cellules
- 3×2 grid border-collapse style avec dashed borders internes
- Chaque cellule : icône Prompt orange/rose alternée, titre Prompt 22px, body, n° en haut à droite

### 10. Articles — 3 colonnes asymétriques
- Première carte 16:10, deux suivantes 4:3
- Header de carte : gradient (orange→rose / ink / cream-3) + vibration line opacity .4
- Badge catégorie en pill blanc
- Meta date + reading time en Roboto Mono
- Lien « Lire l'article » en rose avec flèche

### 11. Contact
- Forme organique gradient orange/rose 720×720 en bottom-left, opacity .9
- Split 2 cols : left = titre + email/téléphone/adresse, right = formulaire dans carte paper
- Inputs : bottom-border only 1.5px ink, font-size 16, padding vertical 12px
- 2 checkboxes consentement (1ère cochée par défaut)
- Bouton submit pleine largeur en gradient orange→rose

### 12. Footer (fond ink)
- Mot UVIBES géant (clamp 60–180px) avec point orange final
- Tagline « Activez les bonnes ondes. » en Instrument Serif italique
- Newsletter inline (input pill + bouton orange)
- 3 colonnes liens (Produit / Ressources / Légal)
- Mention « Made with love in Perpignan »

## Design tokens

```css
:root {
  /* Brand */
  --orange: #FD6E00;
  --rose:   #D90A5C;
  --gradient-brand: linear-gradient(90deg, #FD6E00, #D90A5C);

  /* Neutrals */
  --cream:   #f3ede3;   /* page background */
  --cream-2: #ebe3d4;   /* alt section */
  --cream-3: #e2d7c1;   /* tertiary surface */
  --paper:   #faf6ef;   /* card surface */
  --ink:     #1a1715;   /* text / dark sections */
  --ink-2:   #4a4239;   /* body text */
  --ink-3:   #7a6f63;   /* secondary text */
}
```

### Typographie

| Usage | Font | Poids | Notes |
|---|---|---|---|
| Display / Headings | Prompt | 700–900 | letter-spacing -1 à -6 selon taille |
| Accents éditoriaux | Instrument Serif | 400 italic | mots clés, transitions « et », « expérience », etc. |
| Body | Roboto | 400, 500, 700 | line-height 1.45–1.55 |
| Eyebrows / mono | Roboto Mono | 400, 500 | uppercase, letter-spacing 1.4–2, taille 10–13px |

Import Google Fonts :
```
Prompt:0,300..900;1,400,600 / Roboto:0,300..900;1,400,700 / Roboto+Mono:400..600 / Instrument+Serif:0;1
```

### Espacement / Radius / Shadow

- Section padding vertical : 80–140px (mobile à voir)
- Padding horizontal page : 56px desktop
- Border-radius cartes : 22–32px
- Border-radius boutons : 999px (pill)
- Shadow CTA gradient : `0 18px 40px -14px rgba(217,10,92,.5)`
- Shadow cartes : `0 12px 30px -16px rgba(0,0,0,.35)`
- Shadow grosse : `0 30px 60px -28px rgba(0,0,0,.35)`

### Animations clés (durations + easing)

| Animation | Durée | Easing | Notes |
|---|---|---|---|
| Reveal scroll | 700–900ms | `cubic-bezier(.2,.7,.2,1)` | opacity + translateY(24px) |
| Blob drift | 22–34s | `ease-in-out` | translate + scale en boucle |
| Ondes SVG | 9–14s | `linear` | `<animate>` du `d` attribute |
| Ripple anneau hero | 4s | `ease-out` | scale(.6) → scale(2.2) |
| EQ bars | 1.2–1.7s | `ease-in-out` | scaleY(.4) → scaleY(2.4) |
| Enjeux rotation | 3400ms d'attente | — | transition fond 800ms |
| Vidéo featured rotation | 3600ms | — | transform 600ms |
| Marquee logos | 50s | `linear` | translateX 0 → -33.33% |
| Pulse status dot | 1.6s | `ease-in-out` | opacity + scale |

### Niveau d'animation (à exposer en préférence utilisateur ou via prefers-reduced-motion)

3 niveaux disponibles dans le prototype : `off`, `soft`, `vibing`. **Respecter `prefers-reduced-motion: reduce`** en mappant automatiquement sur `off` (toutes les animations désactivées, pas de rotation auto).

## Données & intégrations

- **Compteur utilisateurs** : déjà récupéré depuis WordPress côté client actuel — ne pas le hardcoder, brancher sur la même source (`12 480 +` est juste un placeholder visuel)
- **Logos clients** : placeholders texte, attendre la liste finale + assets PNG/SVG
- **Vidéos témoignages** : placeholders avec initiales colorées — brancher sur les vrais MP4 quand disponibles, déclencher la lecture inline au hover (3s preview) ou en modal au clic
- **Articles** : à brancher sur l'API WordPress (categories, dates, reading time si custom field)
- **Formulaire contact** : POST sur l'endpoint actuel + consentements RGPD obligatoires

## Accessibilité

- Tous les boutons interactifs ont des `aria-label` quand iconiques (flèches prev/next dans Enjeux)
- Respecter `prefers-reduced-motion` (cf. ci-dessus)
- Contrast ratios : tous les textes sur fond crème/paper passent AA. Sur les cartes gradient (orange/rose), le texte blanc passe AA Large mais à vérifier pour body 14px (envisager un text-shadow subtil ou darken legger du gradient si besoin)
- Le carousel Enjeux doit être pausable au focus/hover, pas seulement sur clic explicite

## Responsive

Le prototype est désiné desktop-first (largeur cible 1440–1920). Pour mobile :
- Hero : passer en single column, phone mock sous le texte, réduire les particules
- Piliers : stack
- Enjeux : carte answer pleine largeur en haut, chips en grille 2 colonnes en dessous
- Vidéos : grille 2 colonnes, abandonner l'asymétrie
- Articles : stack
- Contact : stack

Garder la signature animée du hero sur mobile mais réduire le nombre d'éléments (passer à 1–2 blobs + 1 onde) pour préserver les perfs.

## Fichiers de référence

Dans `prototype/` :
- `Bienvenue.html` — entrypoint HTML, charge React + Babel + scripts
- `app.jsx` — orchestre les sections + tweaks panel (le panneau Tweaks n'a pas vocation à passer en prod)
- `shared.jsx` — copy FR (`COPY`), composants partagés (`VibrationLine`, `Logo`, `PhoneMock`, `VideoTile`, `LogosMarquee`, hooks `useRotatingFeature` / `useCountUp` / `Reveal`, `Stars`)
- `direction-vibration.jsx` — **direction à implémenter** (préfixe `A.`)
- `direction-kinetic.jsx` — direction alternative explorée, ignorer
- `tweaks-panel.jsx` — panneau de tweaks design-time, **ne pas porter en prod**

## Copy intégrale

Toute la copy FR est centralisée dans l'objet `COPY` au début de `shared.jsx`. À reprendre tel quel et exposer en i18n si une version EN est prévue.

---

*Charte graphique officielle Uvibes : voir `uploads/brand_assets-1779786529718.pdf` du projet d'origine pour les fonts (Prompt, Roboto, Montserrat — Montserrat non utilisé dans le proto, remplacé par Prompt), le logo (mark + wordmark), et le tagline « L'inattendu commence ici ».*
