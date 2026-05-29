# 04 · Témoignages — cartes magazine asymétriques

> Dépend de `00-tokens.md`. Données : `COPY.testimonials` (3 entrées `{ quote, name, role, stars }`).

## Contexte

Cette section (composant `A.Videos`, titre **« Ils aiment l'expérience »**) contient deux blocs :
1. Une grille vidéo asymétrique (inchangée)
2. **La rangée de témoignages écrits** « Paroles de membres » — c'est CE bloc qui est restylé.

La section a un fond gradient : `linear-gradient(160deg, #ffeadc 0%, #ffd0e0 50%, #ffbbd0 100%)`.

## But

Remplacer les 3 cartes identiques en verre dépoli par **3 cartes magazine asymétriques** en thèmes contrastés.

## En-tête du bloc

Flex space-between : eyebrow mono `• PAROLES DE MEMBRES` (rose + dot gradient) à gauche, `312 avis vérifiés` (mono, `var(--ink-2)`) à droite.

## Grille

```css
.testi-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 22px; align-items: stretch; }
```
data-attr : `data-grid="3col"`. Les 3 cartes ont des **thèmes différents** (cycle par index) :

| # | Background | Texte | Border | Étoile | Note |
|---|---|---|---|---|---|
| 0 (featured) | `linear-gradient(150deg,#FFB040 0%,#FD6E00 50%,#FF4D7A 100%)` | `#fff` | aucune | `#FFE56B` | quote 24px + sparkles + shadow forte |
| 1 | `linear-gradient(150deg,#FFFBF4 0%,#FFEDF3 100%)` | `var(--ink)` | `1.5px rgba(217,10,92,.18)` | `var(--orange)` | `translateY(20px)` (rythme) |
| 2 | `linear-gradient(150deg,#FFE3B0 0%,#FFC1C1 50%,#FFA0D0 100%)` | `var(--ink)` | `1.5px rgba(217,10,92,.12)` | `var(--orange)` | — |

## Carte

- `position: relative; padding: 32px 30px 28px; border-radius: 28px; height: 100%;` `display:flex; flex-direction:column;`
- **Shadow** : featured `0 30px 60px -24px rgba(217,10,92,.4)` ; autres `0 18px 40px -22px rgba(217,10,92,.18)`
- **Gros guillemet déco** : caractère `"` en Instrument Serif italic **180px**, `position:absolute; top:-20px; right:16px;` opacity .12 (.20 sur featured), `pointer-events:none`
- **Sparkles (featured uniquement)** : 8 spans `position:absolute`, cercles 3–5px blancs `rgba(255,255,255,.65)`, animation `t-spark 5s` avec delay `j*0.4s`, positions dispersées (`left:(j*71+8)%`, `top:(j*47+20)%`)
- **Pill étoiles** (haut-gauche, `align-self:flex-start`) : `padding:5px 10px; border-radius:999px;` fond `rgba(255,255,255,.2)` (featured) ou `.7`, backdrop-blur 6px, 5 étoiles SVG remplies + « 5.0 » en mono 10px
- **Quote** : `<p>` Instrument Serif italic, `font-size: 24px` (featured) / `19px`, `line-height:1.35`, `margin-top:22px`, `flex-grow:1`, format `« … »`
- **Auteur** (footer carte) : border-top (`solid rgba(255,255,255,.25)` sur featured, sinon `dashed rgba(217,10,92,.2)`), flex avec :
  - **Avatar** 48px rond, initiales (2 lettres) en Prompt 700 16px. Featured → fond blanc/texte rose ; autres → fond `linear-gradient(135deg,var(--orange),var(--rose))`/texte blanc. Shadow `0 8px 16px -8px rgba(0,0,0,.2)`
  - **Nom** Prompt 700 15px + **rôle** mono 10px (opacity .7, .85 sur featured)

## Keyframes

```css
@keyframes t-spark { 0%,100% { opacity: 0; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-8px) } }
```

## Code de référence

Bloc « written testimonials row » dans `A.Videos`, `../prototype/direction-vibration.jsx` (lignes ~873–960).

## Vérification

- [ ] 3 cartes visuellement distinctes (1 gradient vedette, 1 claire, 1 pêche/rose)
- [ ] La carte du milieu est décalée de 20px vers le bas (rythme asymétrique)
- [ ] Gros guillemet déco en fond de chaque carte
- [ ] Sparkles animés sur la carte vedette uniquement
- [ ] Avatars initiales corrects
- [ ] En mobile : stack 1 colonne, la carte du milieu perd son `translateY` (voir fiche `06`)
