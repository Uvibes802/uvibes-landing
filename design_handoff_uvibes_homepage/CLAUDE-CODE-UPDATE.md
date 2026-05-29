# Instructions Claude Code — Mise à jour Uvibes (responsive + mockup + couleurs)

Voici les **3 changements** à appliquer dans le codebase Uvibes existant. Le prototype HTML mis à jour est dans `/prototype/` — utilise-le comme référence visuelle, **ne le copie pas tel quel**.

---

## 1️⃣ Adoucir le texte noir partout

Le ton « noir pur » est trop dur. Mets à jour les tokens de couleur dans la stylesheet globale (probablement `globals.css` ou `tokens.css`).

```css
/* AVANT */
--ink: #1a1715;
--ink-2: #4a4239;
--ink-3: #7a6f63;

/* APRÈS */
--ink:   #2a221d;   /* titres et accents forts — brun chaud doux */
--ink-2: #5a4f44;   /* body principal */
--ink-3: #8a7d6e;   /* meta / captions / labels secondaires */
```

**Règle d'usage :**
- `--ink` → uniquement les titres `<h1>`/`<h2>` et les CTAs sombres
- `--ink-2` → tout le body text, paragraphes, liens, item lists
- `--ink-3` → meta, dates, eyebrows en monospace, captions, breadcrumbs

Si tu trouves des `color: #000` ou `color: black` en dur dans le code, remplace-les par `var(--ink)`.

---

## 2️⃣ Rendre responsive la page d'accueil ET la page /solution

### 2.a Navbar — passer en hamburger menu sous 768px

**Comportement attendu** (cf. prototype `Bienvenue.html` et `La solution.html` à la largeur mobile) :
- Desktop (≥ 768px) : nav horizontale actuelle (logo + 4 liens + CTA)
- Mobile (< 768px) : logo + bouton hamburger 44×44 carré
- Tap hamburger → overlay plein écran qui descend (`translateY(-110%)` → `translateY(0)`, 360ms cubic-bezier(.2,.7,.2,1))
- Liens en Prompt 32px bold, séparés par des dashed-borders 1px
- Dot orange à droite du lien actif
- CTA pleine largeur en gradient orange→rose en bas
- Bouton hamburger devient un X quand ouvert (fond ink, icône paper)
- Au scroll, la nav prend un fond `rgba(243,237,227,.92)` + `backdrop-filter: blur(14px)`

### 2.b Grilles de sections — collapse 3→2→1 col

Sur tous les `grid-template-columns` de sections principales (Hero, Piliers, Enjeux, How, Videos, Avantages, Articles, Contact, Footer, Pricing, Profils, Features), applique cette logique :

```css
/* Desktop : tel quel */
/* Tablette ≤ 1024px : 3-col → 2-col */
@media (max-width: 1024px) {
  .grid-3col { grid-template-columns: 1fr 1fr; }
}
/* Mobile ≤ 768px : tout en 1-col */
@media (max-width: 768px) {
  .grid-2col, .grid-3col { grid-template-columns: 1fr; }
}
```

Et adapte :
- Padding section horizontal : `56px` desktop → `32px` tablette → `20px` mobile → `16px` < 480px
- Padding section vertical : réduit de moitié en mobile
- `letter-spacing` des h1/h2 : `-0.055em` → `-0.03em` en mobile (pour la lisibilité)
- Toutes les **chips/badges flottants** autour du mockup → `display: none` en mobile (sinon ça chevauche)
- Les rotations des cartes papier/sticky → réduire ou supprimer en mobile

### 2.c Onglets sticky de la page /solution

Garde le sticky en mobile mais :
- Active `overflow-x: auto` sur la barre
- Réduit le padding des tabs : `20px 18px` → `14px 12px`
- Masque le compteur « Section 0X / 04 » en mobile

---

## 3️⃣ Intégrer le mockup de l'app dans les Hero (home + /solution)

Tu trouveras le fichier image dans `prototype/assets/mockup-home.webp` (640×960px, fond transparent, 44 Ko). Place-le dans `public/` (ou ton dossier d'assets statiques) puis crée un composant `AppMockup` réutilisable.

### Spécifications du composant

Le composant doit afficher l'image avec **5 couches d'effets** par-dessus :

1. **Halo gradient** en arrière-plan (z-index 0)
   ```css
   background: radial-gradient(closest-side, rgba(253,110,0,.32), rgba(217,10,92,.18) 60%, transparent 80%);
   filter: blur(28px);
   animation: halo-pulse 5s ease-in-out infinite;
   ```
   Keyframes : scale(1) → scale(1.08) à 50% puis retour.

2. **Anneaux de vibration** (4 cercles concentriques, z-index 1)
   - Position centrée derrière l'image
   - Taille 75% du conteneur
   - Border 1.5px alternant orange/rose
   - Animation : `scale(.55)` → `scale(2.1)`, durée 4s, infinite
   - Décalage de 1s entre chaque anneau pour effet d'onde

3. **L'image** elle-même (z-index 2)
   - Width responsive : `460px` desktop, `280px` mobile
   - `filter: drop-shadow(0 30px 50px rgba(26,23,21,.18))`
   - Animation de flottement : `translateY(0)` → `translateY(-10px)` à 50%, durée 7s, infinite

4. **Chips flottantes** autour (z-index 3, **desktop uniquement, masquées en mobile**)

   - **À gauche, à mi-hauteur** : pill blanc avec dot vert pulsant + texte mono "3 142 conversations live"
   - **En haut à droite** : badge gradient orange→rose, rotated 4deg : "+ 17 VIBES" + "Bonjour Thomas 👋"
   - **En bas à droite** : carte paper rotated -3deg avec eyebrow rose "EN COURS · 04:59" + citation italique Instrument Serif "« Un personnage de film qui t'inspire ? »"

5. **Hook `useReducedMotion`** : si l'utilisateur a `prefers-reduced-motion: reduce`, désactive toutes les animations (`animation: none`).

### Utilisation dans la home

Remplace le hero visuel actuel (mockup placeholder à droite) par `<AppMockup />`. Le composant gère son propre layout en flexbox centré ; donne-lui juste `max-width` via son parent grid.

### Utilisation dans /solution

Idem dans le hero. **Important** : le hero de /solution est sur fond crème désormais (plus de fond sombre `var(--ink)`). Si ton code actuel a un hero dark, repasse-le sur fond `var(--cream)` avec 3 blobs gradient radiaux orange/rose qui drift (animation 24s/30s/32s ease-in-out infinite, opacity entre .28 et .45).

---

## Prompt suggéré pour Claude Code

> Lis `design_handoff_uvibes_homepage/CLAUDE-CODE-UPDATE.md` et applique les 3 modifications décrites (tokens couleur adoucis, responsive + nav hamburger sous 768px, composant AppMockup avec halo/ripples/chips). Le mockup PNG est à copier de `design_handoff_uvibes_homepage/prototype/assets/mockup-home.webp` vers `public/`. Touche aux deux pages : `/` (Bienvenue) et `/solution`. Avant de coder, recense les composants existants à modifier et propose-moi le plan section par section.

---

## Fichiers de référence dans /prototype/

- `Bienvenue.html` + `app.jsx` + `direction-vibration.jsx` — home complète avec nav responsive
- `La solution.html` + `solution.jsx` — page /solution avec nav responsive et onglets sticky
- `shared.jsx` — contient les hooks `useResponsive`, le composant `AppMockup`, et les utilities `Reveal`, `VibrationLine`, etc.
- `assets/mockup-home.webp` — l'image à copier dans `public/` du codebase

## Tokens design rappel rapide

```css
--orange: #FD6E00;
--rose:   #D90A5C;
--gradient-brand: linear-gradient(90deg, #FD6E00, #D90A5C);
--cream:   #f3ede3;
--cream-2: #ebe3d4;
--cream-3: #e2d7c1;
--paper:   #faf6ef;
--ink:     #2a221d;
--ink-2:   #5a4f44;
--ink-3:   #8a7d6e;
```

Breakpoints : 480 / 768 / 1024 / desktop.
