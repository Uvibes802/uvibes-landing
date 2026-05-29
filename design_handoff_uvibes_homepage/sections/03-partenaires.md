# 03 · Partenaires — section agrandie

> Dépend de `00-tokens.md`. Données : `COPY.trustees.logos` (6 entrées `{ name, abbr }`).

## But

Avant : simple marquee de logos défilante. Maintenant : **grosse section dédiée** avec en-tête, stat « 80+ », grille de 6 cartes colorées, et marquee résiduelle en dessous.

## Layout

```
┌─────────────────────────────────────────────────┐
│ • NOS PARTENAIRES                          80+   │
│ Ils avancent                    ORGANISATIONS    │
│ avec nous.                      PARTENAIRES      │
│ Plus de 80 organisations…                        │
│ ┌────────┐ ┌────────┐ ┌────────┐  ← grid 3 col   │
│ │PART 01 │ │PART 02 │ │PART 03 │    cartes ≥220px │
│ │ UPVD   │ │Eklore. │ │  FDV   │                  │
│ └────────┘ └────────┘ └────────┘                  │
│ ┌────────┐ ┌────────┐ ┌────────┐                  │
│ │ MGEN   │ │ INSA   │ │  Mtp   │                  │
│ └────────┘ └────────┘ └────────┘                  │
│ ←──── marquee logos (opacity .8, 45s) ───────────│
└─────────────────────────────────────────────────┘
```

## Section

```css
section.partners {
  padding: 120px 0 130px;
  background: linear-gradient(180deg, var(--cream) 0%, #FFE8D0 100%);
  position: relative; overflow: hidden;
}
```
+ 2 blobs déco : `radial-gradient(closest-side, rgba(253,110,0,.25), transparent 70%)` top-right (480px, blur 28) et `rgba(255,80,140,.22)` bottom-left (520px, blur 30).

## En-tête (flex space-between, align flex-end)

- **Gauche** : eyebrow mono `• NOS PARTENAIRES` (rose, dot gradient) → `<h2>` « *Ils avancent* avec nous. » (« Ils avancent » en Instrument Serif italic avec gradient text orange→rose) → paragraphe descriptif (max 440px, `var(--ink-2)`)
- **Droite** : stat **`80+`** en `clamp(72px, 8vw, 120px)` Prompt 800 gradient text + label mono « organisations partenaires »

## Grille de cartes

```css
.partners-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
```
data-attr : `data-grid="3col"`.

### Carte (`min-height: 220px`)
- `padding: 44px 36px; border-radius: 28px;` ; `display:flex; flex-direction:column; justify-content:space-between;`
- **6 tints alternés** (cycle par index) :

| # | Background | Border | Dot |
|---|---|---|---|
| 1 | `linear-gradient(135deg,#FFF6EC,#FFE5CC)` | `rgba(253,110,0,.18)` | `var(--orange)` |
| 2 | `linear-gradient(135deg,#FFEDF3,#FFD5E3)` | `rgba(217,10,92,.18)` | `var(--rose)` |
| 3 | `linear-gradient(135deg,#FFEFD8,#FFD8B0)` | `rgba(255,150,80,.22)` | `#FF9558` |
| 4 | `linear-gradient(135deg,#FFE8EE,#FFC2D2)` | `rgba(255,77,122,.22)` | `var(--rose-light)` |
| 5 | `linear-gradient(135deg,#FFF1D6,#FFCC9A)` | `rgba(255,176,40,.25)` | `#FFB040` |
| 6 | `linear-gradient(135deg,#FFE0EC,#FFB8D4)` | `rgba(217,10,92,.2)` | `var(--rose-bright)` |

- **Header carte** : eyebrow mono `PARTENAIRE · 0X` (gauche) + dot 10px coloré avec halo `box-shadow: 0 0 0 5px <dot>22` (droite)
- **Lettermark** : `abbr` en Prompt 800, **48px**, gradient text `linear-gradient(135deg, <dot>, var(--rose))` clippé
- **Footer carte** : `name` complet (14px, `var(--ink)`, weight 600) au-dessus d'un `border-top: 1px dashed <border>`
- **Décor** : une vibration-line SVG (`width 140, height 48, amplitude 10, freq 4`, stroke = `<dot>`) en bas-droite, opacity .25
- **Hover** : `translateY(-6px)` + `box-shadow: 0 24px 50px -20px rgba(217,10,92,.25)` (transition 360ms)

## Marquee résiduelle

Sous la grille, à `opacity: .8`, vitesse 45s, logos dupliqués (`[...logos, ...logos]`). Bande secondaire de variation.

## Code de référence

`A.Trustees` dans `../prototype/direction-vibration.jsx` (lignes ~674–769).

## Vérification

- [ ] Section nettement plus grande qu'avant (en-tête + 6 cartes + marquee)
- [ ] Chaque carte a un tint différent, le cycle de 6 couleurs est respecté
- [ ] Hover des cartes fluide
- [ ] En mobile : cartes en 1 colonne (voir fiche `06`)
