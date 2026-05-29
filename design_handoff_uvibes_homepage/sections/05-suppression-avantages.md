# 05 · Suppression de la section « Avantages »

> Indépendante des autres fiches.

## But

Supprimer la section **« Transformez le quotidien / Tout ce dont vous avez besoin, rien de superflu »** (grille 3×2 d'avantages avec icônes). Jugée redondante avec les Piliers — le client a demandé de la retirer.

## Action

- Dans le prototype c'était le composant `A.Advantages`. Il est **retiré de l'ordre des sections** dans `app.jsx`.
- Supprimer le composant ET son appel dans ton codebase.
- Supprimer aussi les données associées si elles ne servent qu'à cette section (`COPY.advantages` dans `shared.jsx`).

## Ordre final des sections (après suppression)

1. Nav (fixe)
2. Hero
3. Banner (compteur live)
4. Pillars
5. Collectifs / Enjeux
6. **Partenaires** → fiche `03`
7. How (3 étapes)
8. **Videos + Témoignages** → fiche `04`
9. Articles
10. Contact
11. Footer

## Vérification

- [ ] La section « Tout ce dont vous avez besoin » n'apparaît plus
- [ ] Pas d'espacement double / section vide à sa place
- [ ] On passe directement de « How » aux témoignages
