# 00 · Design tokens — palette vive (SOCLE)

> **À appliquer en premier.** Toutes les autres fiches référencent ces variables. Le client veut s'éloigner des bruns/wines sombres et coller davantage à la charte (orange `#FD6E00` + rose `#D90A5C`).

## But

- Éclaircir toutes les surfaces (crème quasi-blanc chaud)
- Remplacer les textes brun foncé par un bordeaux vif lisible
- Ajouter une famille de variations vives (orange/rose clairs, corail, pêche)
- Centraliser les gradients réutilisables

## Tokens à poser au `:root`

```css
:root {
  /* ─ Brand (charte, inchangé) ─ */
  --orange:        #FD6E00;
  --rose:          #D90A5C;

  /* ─ Variations vives (NOUVEAU) ─ */
  --orange-light:  #FF9558;
  --orange-bright: #FFB07A;
  --rose-light:    #FF4D7A;
  --rose-bright:   #FF77A0;
  --coral:         #FF6B5C;
  --peach:         #FFD5B8;
  --pink-soft:     #FFDDE6;

  /* ─ Surfaces (éclaircies) ─ */
  --cream:    #FFF6EC;   /* fond principal — était #f3ede3 */
  --cream-2:  #FFEFE0;   /* section alternée */
  --cream-3:  #FFE5CC;   /* tertiaire */
  --paper:    #FFFBF4;   /* surface carte — quasi blanc chaud */

  /* ─ Texte (bordeaux vif, JAMAIS brun foncé) ─ */
  --ink:       #4A1530;  /* titres / accents */
  --ink-2:     #7A2050;  /* corps de texte */
  --ink-3:     #B0507E;  /* méta / labels */
  --ink-4:     #E0AEC4;  /* filets / hairlines */
  --rose-deep: #B5083F;  /* emphase */

  /* ─ Gradients réutilisables ─ */
  --warm-glow:      linear-gradient(135deg, #FD6E00 0%, #FF4D7A 50%, #D90A5C 100%);
  --warm-glow-soft: linear-gradient(135deg, #FFC8A8 0%, #FFADC7 100%);
  --vivid-mesh:     linear-gradient(135deg, #FFE3B0 0%, #FFC7A0 25%, #FFA0B0 55%, #FF7AA8 80%, #FF4D7A 100%);
}
```

## Règles de remplacement (à appliquer dans tout le code)

| Ancien | Nouveau |
|---|---|
| Bruns foncés `#1a1715`, `#2a221d`, `#3a3128`… | `var(--ink)` |
| Fonds noirs/sombres de section | `var(--cream)` ou `var(--vivid-mesh)` |
| Body background | `var(--cream)` (jamais blanc pur) |
| Ancien `--ink` wine sombre `#6a1340` | `#4A1530` (plus vif) |

## Note

Le `body` doit utiliser `var(--cream)` comme fond. Aucune section ne doit avoir de fond sombre — si une section a besoin de contraste, utiliser un gradient orange/rose vif (footer, banner) plutôt qu'un fond foncé.
