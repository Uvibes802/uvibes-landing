# Instructions Claude Code — Uvibes v2 (palette vive + nettoyage)

> **Itération suivant `CLAUDE-CODE-UPDATE.md`.** Le brief : éclaircir la palette, retirer le menu mobile en bas, supprimer une section, retravailler le hero et les témoignages, agrandir les partenaires. Les fichiers de référence à jour sont dans `/prototype/` (entrypoint `Bienvenue.html`).

---

## 1️⃣ Palette plus vive — couleurs sombres bannies

Le client veut s'éloigner des bruns/wines sombres et coller davantage à la charte graphique (orange `#FD6E00` + rose `#D90A5C`). Mets à jour tes tokens globaux :

```css
:root {
  /* Brand (inchangé) */
  --orange:        #FD6E00;
  --rose:          #D90A5C;

  /* Variations vives — NOUVEAU */
  --orange-light:  #FF9558;
  --orange-bright: #FFB07A;
  --rose-light:    #FF4D7A;
  --rose-bright:   #FF77A0;
  --coral:         #FF6B5C;
  --peach:         #FFD5B8;
  --pink-soft:     #FFDDE6;

  /* Surfaces — éclaircies */
  --cream:    #FFF6EC;   /* fond page principal (était #f3ede3) */
  --cream-2:  #FFEFE0;   /* alt section */
  --cream-3:  #FFE5CC;   /* tertiaire */
  --paper:    #FFFBF4;   /* card surface (quasi blanc chaud) */

  /* Texte — bordeaux vif, jamais brun foncé */
  --ink:     #4A1530;    /* titres / accents — bordeaux saturé */
  --ink-2:   #7A2050;    /* body */
  --ink-3:   #B0507E;    /* meta / labels */
  --ink-4:   #E0AEC4;    /* hairlines */
  --rose-deep: #B5083F;  /* emphasis */

  /* Gradients réutilisables */
  --warm-glow:      linear-gradient(135deg, #FD6E00 0%, #FF4D7A 50%, #D90A5C 100%);
  --warm-glow-soft: linear-gradient(135deg, #FFC8A8 0%, #FFADC7 100%);
  --vivid-mesh:     linear-gradient(135deg, #FFE3B0 0%, #FFC7A0 25%, #FFA0B0 55%, #FF7AA8 80%, #FF4D7A 100%);
}
```

**Règles de remplacement :**
- Toute occurrence d'un brun foncé (`#1a1715`, `#2a221d`, `#3a3128`, …) → `var(--ink)` ou supprimer
- Tout fond noir/sombre dans des sections → remplacer par `var(--cream)` ou `var(--vivid-mesh)`
- Body background : `var(--cream)` partout, jamais blanc pur

---

## 2️⃣ Suppression du menu mobile en bas

Le `FloatingMenu` (barre flottante 4 icônes en bas sur mobile) est **supprimé**. La nav du haut suffit, qu'on soit desktop ou mobile (en burger menu).

**Actions :**
- Retirer le composant `FloatingMenu` / l'élément correspondant du layout
- Retirer le `padding-bottom: 86px` du `<body>` en mobile qui réservait la place
- S'assurer que le burger menu mobile (top-right, dans la nav fixe) reste fonctionnel — c'est désormais le seul accès aux liens sur mobile

---

## 3️⃣ Suppression de la section "Avantages"

La section **« Tout ce dont vous avez besoin, rien de superflu »** (grille 3×2 d'avantages avec icônes symboliques) est **supprimée**. Trop de contenu redondant avec les Piliers.

Dans le prototype, c'était le composant `A.Advantages` — il est retiré de l'ordre des sections dans `app.jsx`. À supprimer aussi dans ton codebase.

**Ordre final des sections** (full scroll) :
1. Nav fixe
2. Hero
3. Banner compteur live
4. Pillars (2 cartes)
5. Collectifs (« Pour qui ? » avec ticker pills + panel détail)
6. **Partners** (refondu — voir §5)
7. How (3 étapes)
8. **Videos + Testimonials** (refondu — voir §6)
9. Articles
10. Contact
11. Footer

---

## 4️⃣ Hero — visible dès l'arrivée + gradient plus riche

**Problème résolu :** sur écran desktop l'utilisateur devait scroller pour voir le titre. **Solution :** la section hero remplit toute la hauteur viewport et centre verticalement son contenu.

```css
section.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 96px 56px 60px;  /* desktop */
  overflow: hidden;
}
```

**Background — passer à 7 blobs gradient saturés** (au lieu de 5 plus pâles) :

```css
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(135deg,
    #FFF1D6 0%, #FFD8B0 18%, #FFB8A8 38%,
    #FF98B8 58%, #FF77A8 78%, #FF5894 100%);
}
```

Puis 7 cercles `radial-gradient` en absolute, blur 22–32px, animés en boucle 22–34s (`blob-drift-a/b/c/d` keyframes — voir prototype). Couleurs des blobs : `rgba(255,176,40,.95)`, `rgba(253,110,0,.85)`, `rgba(255,80,140,.85)`, `rgba(217,10,92,.8)`, `rgba(255,200,90,.85)`, `rgba(255,120,180,.75)`, `rgba(255,160,80,.7)`.

Ajouter par-dessus :
- 14 **particules** colorées flottantes avec `box-shadow` lumineuse (`0 0 12px <color>aa`)
- 3 **ondes SVG** animées (gradient stroke orange→rose, durations 9/11/14s)
- Grain SVG `feTurbulence` opacity .12
- Grille de points masquée par une ellipse radiale (centre 60%/40%)

---

## 5️⃣ Section Partenaires — agrandie et restructurée

Avant : simple marquee infinie de logos. Maintenant : **grosse section dédiée** avec :

### Layout
```
┌─────────────────────────────────────────────────────┐
│ • NOS PARTENAIRES                            80+    │
│                                                     │
│ Ils avancent                  ORGANISATIONS         │
│ avec nous.                    PARTENAIRES           │
│                                                     │
│ Plus de 80 organisations…                           │
│                                                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│ │ PART 01 │ │ PART 02 │ │ PART 03 │   ← 3 col grid  │
│ │  UPVD   │ │ Eklore. │ │   FDV   │   cartes 220px  │
│ │  Univ.  │ │ Eklore  │ │ Fête... │                 │
│ └─────────┘ └─────────┘ └─────────┘                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│ │  MGEN   │ │  INSA   │ │   Mtp   │                 │
│ └─────────┘ └─────────┘ └─────────┘                 │
│                                                     │
│ ←─── marquee logos défilante en bas (opacity .8) ───│
└─────────────────────────────────────────────────────┘
```

### Carte partenaire (200×220 min)
- `padding: 44px 36px; border-radius: 28px;`
- 6 **tints alternés** : chaque carte un fond `linear-gradient(135deg, …)` différent (voir tableau ci-dessous) + border 1.5px assorti
- Header : eyebrow mono `PARTENAIRE · 0X` à gauche + dot coloré à droite (avec halo `0 0 0 5px <dot>22`)
- Lettermark : taille **48px Prompt bold**, gradient text `linear-gradient(135deg, <dot>, var(--rose))` clipped
- Footer carte : nom complet sur dashed border-top
- Décor : `VibrationLine` opacity .25 dans le coin bas-droit
- Hover : `translateY(-6px)` + shadow `0 24px 50px -20px rgba(217,10,92,.25)`

### Tints (cycle de 6, à appliquer par index)
| # | Background gradient | Border | Dot |
|---|---|---|---|
| 1 | `#FFF6EC → #FFE5CC` | `rgba(253,110,0,.18)` | `#FD6E00` |
| 2 | `#FFEDF3 → #FFD5E3` | `rgba(217,10,92,.18)` | `#D90A5C` |
| 3 | `#FFEFD8 → #FFD8B0` | `rgba(255,150,80,.22)` | `#FF9558` |
| 4 | `#FFE8EE → #FFC2D2` | `rgba(255,77,122,.22)` | `#FF4D7A` |
| 5 | `#FFF1D6 → #FFCC9A` | `rgba(255,176,40,.25)` | `#FFB040` |
| 6 | `#FFE0EC → #FFB8D4` | `rgba(217,10,92,.2)`  | `#FF77A0` |

### Background de section
`linear-gradient(180deg, #FFF6EC 0%, #FFE8D0 100%)` + 2 blobs gradient orange/rose en `radial-gradient` blur 28–30px, opacités .22–.25.

### Marquee résiduelle
Conservée sous la grille à opacity .8, vitesse 45s — sert de bande secondaire de variation.

---

## 6️⃣ Témoignages — cartes magazine asymétriques

Avant : 3 cartes identiques au verre dépoli avec texte sobre. Maintenant : **3 cartes asymétriques en thèmes contrastés**, design "magazine".

### Structure
```
┌────────────────┐ ┌──────────┐ ┌──────────┐
│ ★★★★★ 5.0      │ │★★★★★ 5.0 │ │★★★★★ 5.0 │
│                │ │          │ │          │
│ « Uvibes a... »│ │ « Ce qui │ │ « Nos    │
│                │ │  m'a... »│ │ adhérents│
│ Italic 24px    │ │ Italic   │ │ italic   │
│ Instrument S.  │ │ 19px     │ │ 19px     │
│                │ │          │ │          │
│ ╔══╗           │ │ ╔══╗     │ │ ╔══╗     │
│ ║MC║ Marie-Cl. │ │ ║JL║ Pr. │ │ ║IR║ Isa.│
│ ╚══╝ DRH ind.  │ │ ╚══╝ Uni.│ │ ╚══╝ Asso│
└────────────────┘ └──────────┘ └──────────┘
   FEATURED          standard      offset +20px
   gradient          blanc         peach/pink
```

- Grid: `grid-template-columns: 1.2fr 1fr 1fr; gap: 22px;`
- **Carte 1 (featured)** : `background: linear-gradient(150deg, #FFB040 0%, #FD6E00 50%, #FF4D7A 100%)`, foreground `#fff`. 8 sparkles animés (`@keyframes t-spark`). Shadow `0 30px 60px -24px rgba(217,10,92,.4)`. Quote en 24px italique.
- **Carte 2** : `background: linear-gradient(150deg, #FFFBF4 0%, #FFEDF3 100%)`, foreground `var(--ink)`. Border `1.5px rgba(217,10,92,.18)`. Quote en 19px italique. `transform: translateY(20px)` pour rythme asymétrique.
- **Carte 3** : `background: linear-gradient(150deg, #FFE3B0 0%, #FFC1C1 50%, #FFA0D0 100%)`, foreground `var(--ink)`. Quote en 19px italique.

### Éléments communs à chaque carte
- `padding: 32px 30px 28px; border-radius: 28px;`
- **Big quote glyph** : `"` en Instrument Serif italic 180px en top-right, opacity .12 (.20 sur la featured), `position: absolute; top: -20px; right: 16px;`, pointer-events:none
- **Pill étoiles** en haut-gauche : pill `padding 5px 10px; border-radius: 999px;` avec fond `rgba(255,255,255,.7)` (ou `.2` sur featured), 5 étoiles SVG remplies en `#FFE56B` (featured) ou `var(--orange)` (autres), suivies de "5.0" en Mono 10px
- **Quote** : `<p>` en Instrument Serif italic, marginTop 22px, flexGrow 1
- **Auteur footer** :
  - Hairline `1px dashed rgba(217,10,92,.2)` au-dessus
  - Avatar circulaire 48px avec initiales (2 lettres)
    - Featured : fond blanc, texte rose
    - Autres : fond gradient `linear-gradient(135deg, var(--orange), var(--rose))`, texte blanc
    - Shadow `0 8px 16px -8px rgba(0,0,0,.2)`
  - Nom : Prompt bold 15px
  - Rôle : Roboto Mono 10px, opacity .7 (.85 sur featured)

### Keyframes sparkles
```css
@keyframes t-spark {
  0%, 100% { opacity: 0; transform: translateY(0); }
  50%      { opacity: 1; transform: translateY(-8px); }
}
```
8 spans dispersés en `position: absolute` avec delays 0.4s × index.

---

## 7️⃣ Responsive — uniformiser

Le client a remonté un manque de cohérence en responsive. Standardise les breakpoints :

```css
/* 1280px : padding section réduit à 40px */
@media (max-width: 1280px) {
  section { padding-inline: 40px; }
}

/* 1024px : grilles 3-col deviennent 2-col, titres réduits */
@media (max-width: 1024px) {
  section { padding-inline: 32px; padding-block: 80px; }
  [data-grid="2col"], [data-grid="3col"] { grid-template-columns: 1fr 1fr; }
  h1 { font-size: clamp(48px, 8vw, 84px); }
  h2 { font-size: clamp(36px, 5.5vw, 60px); }
}

/* 768px : tout en une colonne, nav compacte */
@media (max-width: 768px) {
  section { padding-inline: 20px; padding-block: 60px; }
  nav { padding: 12px 16px; }
  [data-grid="2col"], [data-grid="3col"], [data-grid="auto"] {
    grid-template-columns: 1fr; gap: 18px;
  }
  h1 { font-size: clamp(40px, 11vw, 68px); letter-spacing: -0.03em; line-height: 1; }
  h2 { font-size: clamp(32px, 8vw, 52px); letter-spacing: -0.025em; line-height: 1.02; }
  h3 { font-size: 22px; }
  body { padding-bottom: 0; }  /* plus de FloatingMenu */
}

/* 480px : ultra-compact */
@media (max-width: 480px) {
  section { padding-inline: 16px; padding-block: 52px; }
  h1 { font-size: 44px; }
  h2 { font-size: 32px; }
  .roboto-mono { font-size: 11px; }
}
```

**Cohérences à vérifier sur mobile :**
- Tous les `clamp()` de typo respectent les nouveaux min
- Aucune section ne déborde horizontalement (`overflow-x: hidden` sur body en filet de sécurité)
- Les cartes Partenaires passent en 1 colonne propre
- Les 3 cartes Témoignages stack verticalement, la 2e perd son `translateY(20px)`

---

## Récap — checklist d'implémentation

- [ ] Mettre à jour les tokens CSS (palette vive + suppression brun foncé)
- [ ] Supprimer `FloatingMenu` + son `padding-bottom: 86px`
- [ ] Supprimer la section `Advantages`
- [ ] Hero : `min-height: 100vh` + flex centré + 7 blobs gradient + particules `box-shadow`
- [ ] Partenaires : grid 3 cartes avec tints alternés + stat 80+ + marquee dessous
- [ ] Témoignages : 3 cartes asymétriques (featured gradient, blanche, peach/pink)
- [ ] Breakpoints harmonisés (1280 / 1024 / 768 / 480)
- [ ] Vérifier que tous les anciens `#1a1715` / browns ne traînent pas

Le proto de référence dans `/prototype/Bienvenue.html` est la source de vérité visuelle. La direction validée reste **`A` (Vibration éditoriale)** — `direction-vibration.jsx` + `home-extras.jsx`.
