# 01 · Nav + suppression du menu mobile en bas

> Dépend de `00-tokens.md`.

## But

Le client ne veut **pas** de menu flottant en bas sur mobile. La nav du haut (avec burger menu sur petit écran) suffit dans tous les cas.

## Actions

1. **Supprimer le composant `FloatingMenu`** (la barre flottante de 4 icônes ancrée en bas de l'écran sur mobile) — le retirer du layout / JSX racine.
2. **Retirer la réserve d'espace** qu'il occupait :
   ```css
   /* À SUPPRIMER */
   @media (max-width: 768px) {
     body { padding-bottom: 86px; }
   }
   /* Remplacer par */
   @media (max-width: 768px) {
     body { padding-bottom: 0; }
   }
   ```
3. **Conserver et vérifier le burger menu** dans la nav fixe (top-right) — c'est désormais le **seul** accès aux liens de navigation sur mobile. Il doit ouvrir un panneau avec tous les liens.

## Nav — rappel du comportement attendu

- Nav `position: fixed; top: 0;` pleine largeur, fond translucide qui se densifie au scroll (`scrolled` state)
- Desktop : logo à gauche + liens inline + CTA à droite
- Mobile (`max-width: 768px`) : logo à gauche + **bouton burger** à droite qui toggle un panneau de liens
- Padding mobile : `12px 16px`

## Vérification

- [ ] Plus aucune barre en bas de l'écran sur mobile
- [ ] Le burger menu ouvre/ferme correctement le panneau de liens
- [ ] Aucun espace blanc résiduel en bas de page (ancien `padding-bottom`)
