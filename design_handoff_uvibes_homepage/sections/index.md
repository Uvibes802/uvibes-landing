# Sections Uvibes — intégration modulaire

> 🎯 **Pour une reproduction À L'IDENTIQUE (code source verbatim, toutes les animations) → utilise plutôt `../HOMEPAGE-SPEC.md`.**
> Les fiches ci-dessous sont des résumés de design (utiles pour comprendre l'intention). `HOMEPAGE-SPEC.md` contient le code réel complet — c'est lui qu'il faut donner à Claude Code si le rendu doit être exact.

---


Chaque section est une **fiche autonome**. Tu peux les donner à Claude Code une par une, dans n'importe quel ordre — sauf `00-tokens` qui est le socle commun (à appliquer en premier, les autres fiches s'y réfèrent).

| Fiche | Section | Type de changement |
|---|---|---|
| `00-tokens.md` | **Design tokens** | 🟡 Socle — palette vive, à faire en premier |
| `01-nav.md` | **Nav + menu mobile** | 🔴 Suppression du menu flottant en bas |
| `02-hero.md` | **Hero** | 🟢 Refonte — plein écran + gradient riche |
| `03-partenaires.md` | **Partenaires** | 🟢 Refonte — grille agrandie |
| `04-temoignages.md` | **Témoignages** | 🟢 Refonte — cartes magazine |
| `05-suppression-avantages.md` | **Section Avantages** | 🔴 Suppression complète |
| `06-responsive.md` | **Responsive global** | 🟡 Harmonisation breakpoints |

**Légende :** 🟡 socle/global · 🟢 refonte d'une section · 🔴 suppression

Chaque fiche contient : le **but**, les **tokens requis**, le **code de référence** (JSX du prototype), et les **notes d'intégration**. Le rendu de référence est dans `../prototype/Bienvenue.html`.

---

## Ordre recommandé

1. `00-tokens.md` (obligatoire en premier)
2. `01-nav.md` + `05-suppression-avantages.md` (nettoyage rapide)
3. `02-hero.md` → `03-partenaires.md` → `04-temoignages.md` (les 3 grosses refontes, indépendantes entre elles)
4. `06-responsive.md` (passe finale, vérifie la cohérence)
