# 06 · Responsive global — harmonisation

> Dépend de `00-tokens.md`. Passe finale après les refontes de sections.

## But

Le client a signalé un manque de cohérence visuelle en responsive. On standardise les breakpoints sur **4 paliers** : 1280 / 1024 / 768 / 480.

## Breakpoints

```css
/* 1280px — padding latéral réduit */
@media (max-width: 1280px) {
  main section { padding-left: 40px; padding-right: 40px; }
}

/* 1024px — grilles 3-col → 2-col, titres réduits */
@media (max-width: 1024px) {
  main section { padding-left: 32px; padding-right: 32px; padding-top: 80px; padding-bottom: 80px; }
  [data-grid="2col"], [data-grid="3col"] { grid-template-columns: 1fr 1fr; }
  h1 { font-size: clamp(48px, 8vw, 84px); }
  h2 { font-size: clamp(36px, 5.5vw, 60px); }
}

/* 768px — tout en 1 colonne, nav compacte */
@media (max-width: 768px) {
  main section { padding-left: 20px; padding-right: 20px; padding-top: 60px; padding-bottom: 60px; }
  nav { padding: 12px 16px; }
  [data-grid="2col"], [data-grid="3col"], [data-grid="auto"] { grid-template-columns: 1fr; gap: 18px; }
  [data-grid-rows="span"] { grid-row: auto; }          /* annule les span d'autoflow (grille vidéo) */
  [data-hide-mobile="true"], .hide-mobile { display: none; }
  h1 { font-size: clamp(40px, 11vw, 68px); letter-spacing: -0.03em; line-height: 1; }
  h2 { font-size: clamp(32px, 8vw, 52px); letter-spacing: -0.025em; line-height: 1.02; }
  h3 { font-size: 22px; }
  body { padding-bottom: 0; }   /* plus de FloatingMenu (voir fiche 01) */
}

/* 480px — ultra-compact */
@media (max-width: 480px) {
  main section { padding-left: 16px; padding-right: 16px; padding-top: 52px; padding-bottom: 52px; }
  h1 { font-size: 44px; }
  h2 { font-size: 32px; }
  .roboto-mono { font-size: 11px; }
}
```

## Convention de data-attributes

Pour que ces règles s'appliquent, taguer les grilles dans le JSX :
- `data-grid="2col"` / `data-grid="3col"` / `data-grid="auto"` sur tout conteneur en `display:grid` multi-colonnes
- `data-grid-rows="span"` sur les éléments qui utilisent `grid-row: span N` (grille vidéo featured) — pour les remettre en flux normal sur mobile
- `data-hide-mobile="true"` ou classe `.hide-mobile` sur les éléments purement décoratifs à masquer < 768px (visualizer EQ, chips flottants, etc.)

## Cohérences à vérifier section par section

- [ ] **Hero** : titre lisible, mockup app passe sous le texte ou se réduit, chips déco masqués
- [ ] **Partenaires** : 6 cartes en 1 colonne propre, en-tête + stat 80+ stackés
- [ ] **Témoignages** : 3 cartes stackées, la carte du milieu perd son `translateY(20px)`
- [ ] **Grille vidéo** : la carte featured ne garde pas son `grid-row: span 2`
- [ ] Aucune section ne déborde horizontalement → filet de sécurité `body { overflow-x: hidden; }`
- [ ] Tous les `clamp()` de typo respectent les nouveaux minimums
- [ ] Plus de menu flottant en bas (fiche `01`)
