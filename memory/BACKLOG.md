# BACKLOG — Tâches non urgentes

> Tâches identifiées mais non prioritaires.
> À faire quand les tâches importantes sont terminées.
> Ajouter ici toute petite tâche trouvée en cours de route.

- [ ] **MEDIA-01** — Logos partenaires `public/images/partners/upc.png` et `ffhb.png` renvoient 400 via `/_next/image` (console home, carrousel partenaires) — le dossier `public/images/partners/` n'existe même pas en local, donc probablement des entrées DB (`Partner`) sans fichier réellement uploadé. Réencoder/uploader les PNG manquants ou retirer ces entrées depuis l'admin.

---

## Qualité du code

- [ ] **PERF-07** — Ajouter `woff2` pour la police `Supreme-Bold`
  - Fichiers : `src/app/globals.css`, `public/fonts/`

- [ ] **CODE-03** — Unifier l'architecture CSS (réduire le mélange MUI/CSS/styled-components)
  - Fichiers : `src/styles/**`
  - Note : tâche longue, à faire en dernier

---

## Intégration WordPress (textes codés en dur → à migrer)

- [ ] **CONTENT-02** — Migrer le texte hero homepage vers WordPress
  - Actuellement codé en dur dans `src/components/banner/HeroContent.tsx`
  - Texte : "ACTIVEZ LA PUISSANCE DE VOTRE COLLECTIF" + sous-titre + paragraphes
  - À faire quand le contenu est validé par le tuteur

---

## SEO

- [ ] **CONTENT-01** — Créer une image OG dédiée 1200×630px pour le partage social
  - Concept : logo Uvibes centré sur fond dégradé orange→rose (`#fd6e00` → `#f62570`)
  - Outil suggéré : Canva ou Figma
  - Destination : `public/images/og-image.png`
  - Ensuite : mettre à jour `src/lib/seo.ts` (une seule ligne à changer)

---

## Sécurité / hygiène dépôt (audit 2026-06-25, migration vers org)

- [ ] **SEC-01** 🔴 — **Tokens GitHub en clair dans `.git/config`** (remotes `origin` et `fork`, `ghp_…` / `gho_…`). Non poussés (le `.git/` reste local) mais à risque si partage du config / capture d'écran. → Révoquer ces tokens sur GitHub et passer à un *credential helper* (ou token en variable d'env), jamais dans l'URL du remote.
- [ ] **SEC-02** — **`origin` était mal configuré** (fetch = org `u-vibes`, push = fork `fvlekk`). Corrigé le 2026-06-25 (`set-url --push` vers l'org). À garder en tête : vérifier `git remote -v` avant tout push.
- [ ] **CLEAN-01** — **`.audit/` (23 Mo, 55 screenshots Playwright) suivi par git** alors qu'il est dans `.gitignore` : committé avant l'ajout de la règle. Dé-suivi via `git rm -r --cached .audit` le 2026-06-25 (commit sur `dev`). Note : les fichiers restent dans l'**historique** — purge complète (poids du repo) = `git filter-repo`, à faire seulement si nécessaire et en équipe.
- [ ] **PROCESS-01** — Workflow d'équipe : privilégier **branche feature → Pull Request → review** plutôt que push direct sur `dev`. Aussi : `feat/missions-falek` suit `fork/…`, `dev` suit `origin/…` (org) → travailler sur `dev` pour éviter la confusion de remotes.

### Vérifié OK lors de l'audit (aucune fuite)
- Aucun `.env` suivi ni dans l'historique ; `.env.example` sans vraies valeurs.
- Aucun secret en dur dans le code (`ghp_`, `sk_`, `xkeysib-`, clés privées, URL DB avec mot de passe).
- `.mcp.json` sans token ; aucun fichier `.pem`/`.key`/cert suivi.
- Fichiers perso (`Attestation Lou.png`, captures locales, `public/uploads/`) bien gitignorés → non poussés.

---

## Résolu (2026-06-23)

- [x] **CODE-01 / CODE-02** — Typos `videoSrcDdesktop` et `mochupHome.png` : déjà disparues du code (entrées périmées).
- [x] **PERF-06** — Hook `Resize` supprimé : il n'était utilisé que par `AvantagesPageClient`, retiré avec les pages mortes `/avantages` + `/features` (301 → /solution). Plus aucun usage du hook dans le projet.

---
