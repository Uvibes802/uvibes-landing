# 02 · Hero — plein écran + gradient riche

> Dépend de `00-tokens.md`.

## But

1. **Visible dès l'arrivée** : sur desktop l'utilisateur devait scroller pour voir le titre. Le hero doit remplir toute la hauteur viewport et centrer son contenu verticalement.
2. **Gradient plus riche** : passer de 5 blobs pâles à **7 blobs saturés** + particules lumineuses + ondes SVG.

## Conteneur de section

```css
section.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* centre le contenu verticalement */
  padding: 96px 56px 60px;   /* desktop */
  overflow: hidden;
}
```

## Background — fond mesh + 7 blobs

Fond de base :
```css
.hero-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: linear-gradient(135deg,
    #FFF1D6 0%, #FFD8B0 18%, #FFB8A8 38%,
    #FF98B8 58%, #FF77A8 78%, #FF5894 100%);
}
```

7 cercles `radial-gradient` en `position:absolute`, `border-radius:50%`, blur 22–32px, animés en boucle (keyframes ci-dessous). Couleurs / positions :

| # | Taille | Position | Couleur centre | Anim |
|---|---|---|---|---|
| 1 | 900 | top:-260 right:-240 | `rgba(255,176,40,.95)` | drift-a 22s |
| 2 | 820 | top:60 right:80 | `rgba(253,110,0,.85)` | drift-b 26s |
| 3 | 720 | top:180 left:-180 | `rgba(255,80,140,.85)` | drift-c 30s |
| 4 | 560 | bottom:-140 left:30% | `rgba(217,10,92,.8)` | drift-d 34s |
| 5 | 600 | top:40% left:42% | `rgba(255,200,90,.85)` | drift-a 28s reverse |
| 6 | 420 | top:-80 left:30% | `rgba(255,120,180,.75)` | drift-c 24s |
| 7 | 380 | bottom:100 right:200 | `rgba(255,160,80,.7)` | drift-b 32s reverse |

Chaque blob : `background: radial-gradient(closest-side, <couleur>, transparent 70%); filter: blur(Npx);`

## Keyframes

```css
@keyframes blob-drift-a { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-40px,30px) scale(1.08) } }
@keyframes blob-drift-b { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(50px,-20px) scale(.92) } }
@keyframes blob-drift-c { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(60px,40px) scale(1.12) } }
@keyframes blob-drift-d { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-30px,-50px) scale(1.05) } }
@keyframes particle-0 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-40px) } }
@keyframes particle-1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(20px,-30px) } }
@keyframes particle-2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-15px,25px) } }
```

## Calques par-dessus les blobs (dans le même conteneur bg)

- **Grain** : `<svg>` plein cadre avec `<filter><feTurbulence baseFrequency="1.6"/></filter>`, opacity .12, `mix-blend-mode: multiply`
- **Grille de points** : `background-image: radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px); background-size: 28px 28px;` opacity .4, masquée par `radial-gradient(ellipse at 60% 40%, #000 30%, transparent 70%)`
- **3 ondes SVG** animées (`viewBox 0 0 1600 600`, preserveAspectRatio none) : stroke gradient orange→rose, durées 9s / 11s / 14s, `<animate>` sur l'attribut `d`
- **14 particules** : petits cercles colorés (`#FD6E00 #D90A5C #FFB040 #FF5894 #FF9558`), `border-radius:999`, `box-shadow: 0 0 12px <couleur>aa`, opacity .55, animation `particle-{i%3}` 10–20s, delay `i*0.4s`

## Contenu (z-index:1, au-dessus du bg)

Inchangé par rapport à l'existant — eyebrow + badge "live", `<h1>` en deux colonnes (`1.35fr 1fr`, `data-grid="2col"`) avec le mockup app à droite, CTA, avatars. Le `<h1>` :
```css
h1 { font-family: Prompt; font-weight: 700;
     font-size: clamp(56px, 7.5vw, 116px); line-height: .92; letter-spacing: -3px; }
```

## Code de référence

Voir `A.Hero` dans `../prototype/direction-vibration.jsx` (lignes ~105–360) pour le JSX complet exact.

## Vérification

- [ ] Sur un écran desktop standard, le titre `<h1>` est entièrement visible sans scroller
- [ ] Le fond est nettement plus saturé/coloré qu'avant (orange→rose vif)
- [ ] Les blobs et particules s'animent en douceur
- [ ] `prefers-reduced-motion` / mode anim off → animations coupées
