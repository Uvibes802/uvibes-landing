# Rapport de stage — Plateforme Uvibes

> Développement web full-stack — site vitrine, funnel de devis et dashboard d'administration (CRM)
> Projet **uvibes.fr**, porté par l'association **Éclat'ENS**.
> Document technique — version de travail (à compléter / ajuster).

---

## 1. Contexte et objectifs

### 1.1 Le projet Uvibes
Uvibes est une **innovation socio-digitale** qui active les conversations positives au sein des collectifs (entreprises, associations, établissements d'enseignement, fédérations, collectivités) pour renforcer le **lien social**, le **bien-être** et l'**engagement**. Le service repose sur des échanges vidéo courts (6 à 20 minutes), guidés par des questions, complétés par des sondages, des outils de pilotage et un parcours de montée en compétences relationnelles (soft skills).

Le projet est **porté par une association à but non lucratif** (Éclat'ENS) : les bénéfices sont réinvestis dans le projet ou dans d'autres initiatives solidaires. Cette dimension a été un fil conducteur des choix éditoriaux et stratégiques (positionnement, ton, pages de don).

### 1.2 Périmètre du stage
Le travail ne s'est pas limité à un « site vitrine » : la plateforme s'est structurée en **trois briques applicatives** :

1. **Site vitrine** — pages marketing (accueil, solution, à propos, blog, pages légales).
2. **Funnel de devis** — `/devis` : formulaire multi-étapes → calcul tarifaire → page de devis → **signature électronique** (acceptation différenciée des documents contractuels + code promo) → **génération PDF** + **envoi par email**.
3. **Dashboard d'administration / CRM** — `/admin` : gestion de contenu (CMS), des devis, des codes promo, des rendez-vous, de la newsletter, des collectifs, et le **cœur d'activité commerciale** (pipeline, interactions, tâches/relances).

### 1.3 Objectifs principaux
- Élever la **qualité de design** et la cohérence de l'ensemble (sortir des patterns génériques).
- Construire des **fonctionnalités métier réelles** (devis, signature, facturation, CRM).
- Définir et implémenter une **stratégie d'acquisition** (flow client) cohérente.
- Mener des **audits** (accessibilité, compatibilité navigateurs, sécurité, cohérence/scaling) et corriger.
- **Éliminer la dépendance à WordPress** au profit d'une source de vérité unique.

---

## 2. Architecture technique

### 2.1 Stack
| Brique | Technologie |
|---|---|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript 5** |
| UI | **MUI 7 + Emotion**, CSS modulaire (1 composant = 1 fichier CSS), polices `next/font` (Supreme, Prompt, Instrument Serif, Roboto Mono) |
| Base de données | **PostgreSQL / Supabase** dédiée, via **Prisma 5** |
| Auth admin | **iron-session 8** (cookie chiffré) |
| Emails | **nodemailer** (OAuth2 Gmail) |
| PDF | **@react-pdf/renderer** (génération serveur) |
| Éditeur riche | react-quill-new (CMS blog) |
| Dev | Turbopack, pnpm |

### 2.2 Modèle de données (Prisma)
Le schéma couvre l'ensemble du domaine métier :
- **Commercial** : `Collectif` (contact/prospect), `Quote` (devis), `PromoCode`, et — ajoutés pendant le stage — `Interaction` (journal d'échanges) et `Task` (tâches/relances).
- **Catalogue** : `Plan`, `Feature`, `PlanFeature` (matrice offres × fonctionnalités).
- **Contenu** : `Article` (blog, ex-WordPress), `LegalDocument` (documents contractuels éditables), `CmsContent` (clé/valeur éditoriale), `Partner`, `Testimony`, `TeamMember`.
- **RDV & marketing** : `RdvReservation`, `RdvDisponibilite`, `NewsletterSubscriber`.
- **Système** : `AdminUser`.

**Point d'architecture notable** : la base Supabase dédiée est devenue la **source de vérité unique** du contenu (voir §6), ce qui supprime la double source de vérité historique (WordPress vs. base) et les incohérences associées.

### 2.3 Rendu, cache et protection
- **ISR (Incremental Static Regeneration)** : les pages publiques (`/`, `/a-propos`, `/blog`, `/blog/[slug]`, `/documents/[slug]`) sont mises en cache et régénérées au plus une fois par minute (`revalidate = 60`), avec **`revalidatePath`** déclenché à chaque sauvegarde admin → contenu frais sans rebuild, charge base réduite.
- **Refactor du layout racine** pour permettre l'ISR : suppression de la lecture de `headers()` ; le menu et le bandeau cookies s'auto-masquent sur `/admin` et `/devis` via `usePathname`.
- **Middleware** : protège `/admin/*` et `/api/admin/*` (hors `/auth/`) par vérification de session iron-session ; injecte le `pathname` dans les en-têtes.
- **En-têtes de sécurité** : HSTS + CSP en `report-only` (à passer bloquante après monitoring).

### 2.4 Organisation du code
```
prisma/         schéma + seed idempotent + contenu légal
src/app/        routes (pages + API), App Router
src/components/ devis/ · admin/ · features/ · section/ · solution/ · …
src/services/   logique métier (crm/, pdf/, blog/, home/, rdv/…)
src/lib/        prisma, session, seo, legalDocs, ics, sanitizeHtml…
src/styles/     1 fichier CSS par composant
scripts/        outils d'exploitation (seed, db-push, imports, create-admin)
```

---

## 3. Travaux réalisés — Design & UX

L'un des axes forts du stage a été de **faire passer l'interface d'un rendu « correct » à un rendu premium et cohérent**, en éliminant les marqueurs de design génériques.

### 3.1 Cohérence typographique (correctif de fond)
Diagnostic : le `body` ne définissait **aucune `font-family` de base**. Les éléments non `<p>`/`<h*>` (labels, boutons, `<span>` — très présents sur le funnel de devis) tombaient donc sur le **serif par défaut du navigateur** (effet « Times/Georgia »). Correction à la racine : police Uvibes (Supreme) appliquée sur `body`, ce qui **rétablit la cohérence sur tout le site**, en particulier la page de devis.

### 3.2 Hero et identité
- **Animation des questions** flottant autour du mockup de l'application (mouvement doux, désactivé sous `prefers-reduced-motion`), et repositionnement pour mieux les ancrer au visuel — le hero passe de statique à vivant.

### 3.3 Sections de la page Solution
- **Thématiques** : suppression du filet d'accent latéral et **mise en couleur des questions à la couleur de chaque carte** (lecture plus cohérente).
- **Offres** : refonte complète (voir §5.1, dimension stratégique).
- **4ème offre (découverte)** : remplacement d'un « tableau » générique par une présentation en **points** avec prix mis en avant.
- **Section « Petite structure ? »** : réécriture du texte générique pour ancrer le positionnement associatif/non lucratif.

### 3.4 Page À propos
- **Section Don redessinée** et **déplacée juste avant le footer**, intégrée de façon *seamless* sur le dégradé de marque : logo Éclat'ENS **agrandi** dans une carte blanche, titre fort, double CTA (don / partenaire). Remplace l'ancienne section « Rejoignez l'aventure » jugée redondante.

### 3.5 Blog
- Harmonisation des titres (puce d'accroche, **retours à la ligne sur la ponctuation**) et préparation de l'affichage responsive des cartes d'articles.

### 3.6 Document PDF du devis (redesign)
Le PDF a été **entièrement repensé** pour être professionnel et **valorisant** :
- bloc **Émetteur ↔ Destinataire** (absent auparavant) ;
- carte d'offre (membres / engagement / durée) ;
- **fonctionnalités incluses** en grille ;
- **décomposition du prix reconstruite** (brut → remise volume/engagement → code promo → HT/TVA/TTC) avec une accroche de valeur **« ≈ X € / membre / mois »** ;
- documents contractuels acceptés + signature + mentions ;
- passage du bloc tarifaire d'un **plum quasi-noir à un rose vif de marque** (rendu plus lumineux). Un devis non signé tient sur une page ; le devis signé déborde proprement avec la signature.

### 3.7 Travail éditorial transverse
Uniformisation des textes : correction de « qu'Uvibes » → « que Uvibes » (nom propre), retrait progressif des tirets cadratins jugés superflus, harmonisation des sauts de ligne sur la ponctuation, réécriture de contenus génériques.

---

## 4. Audits et leur importance

Les audits ne sont pas un « bonus » : ils conditionnent la **conformité légale**, l'**inclusivité** et la **robustesse** du produit. Quatre familles ont été menées.

### 4.1 Accessibilité (a11y) — pourquoi & comment
**Pourquoi** : l'accessibilité numérique est une obligation (RGAA / directive européenne) et un enjeu d'inclusion ; elle améliore aussi le SEO et l'ergonomie pour tous.
**Comment** : audit automatisé via le moteur **axe-core** injecté avec Playwright sur les pages clés.
**Résultats / corrections** : rôles ARIA invalides corrigés (`<article role="button">` → `<div>`), libellés accessibles ajoutés sur tous les champs de formulaire (RDV, funnel devis — y compris `input[type=date]` et `<select>`), `role="img"` sur les éléments décoratifs porteurs de sens. La logique d'animation respecte `prefers-reduced-motion`.

### 4.2 Compatibilité navigateurs
**Pourquoi** : garantir un rendu et un fonctionnement homogènes (Chrome, Firefox, Safari, Edge).
**Constat clé** : certaines erreurs « Failed to fetch » provenaient d'une **extension navigateur** cassant `window.fetch` côté client — et non du code. La réponse a été de **rendre les actions critiques immunisées** (déconnexion par formulaire natif + redirection serveur ; navigations « dures » plutôt que fetch). À poursuivre jusqu'à validation complète.

### 4.3 Sécurité
**Pourquoi** : la plateforme manipule des données personnelles (contacts, devis, RDV) et des accès admin.
**Corrections** : rotation du mot de passe admin par défaut (qui était public dans le seed), suppression de tout mot de passe en dur (génération aléatoire / variable d'environnement), **écran de changement de mot de passe**, échappement HTML systématique des champs utilisateur dans les emails, rate-limiting sur les routes publiques, en-têtes HSTS + CSP report-only, vérification que les secrets ne sont pas suivis par git.

### 4.4 Cohérence & scaling
**Pourquoi** : éviter la dette technique et les incohérences de données à mesure que le contenu grandit.
**Actions** : élimination de la double source de vérité (WordPress → base), activation de l'ISR, seed **idempotent** (ne réécrase pas les modifications faites en admin), scripts d'exploitation reproductibles.

---

## 5. Stratégie commerciale et flow client

Au-delà de l'implémentation, une **réflexion stratégique** a guidé la structure de l'offre et le parcours d'acquisition.

### 5.1 Refonte des offres (mise en avant orientée conversion)
- **Inversion Premium ↔ Boost** : l'offre **Vibes Boost** (tout inclus) est repositionnée **au centre**, en **« la plus populaire »** avec le style mis en avant — l'offre la plus complète devient l'ancre de décision (effet de point focal).
- **Nettoyage des cartes** : suppression des lignes « Objectif » et « Prix hors taxes » redondantes (le prix et la promesse sont déjà dans l'en-tête). Ce nettoyage a aussi **corrigé un décalage d'index** entre la liste des fonctionnalités et les valeurs des plans.
- **Convergence vers le devis** : les **trois offres** pointent désormais vers le funnel **« Faire un devis »** — un seul objectif de conversion, sans dispersion.

### 5.2 La 4ème offre comme « hook » d'acquisition
L'**offre découverte (essai 30 jours, 480 € / mois, sans engagement annuel)** est pensée comme la **porte d'entrée** : engagement faible, prix lisible dès la barre repliée, présentation en points, CTA « Faire un devis ». Stratégiquement, c'est l'offre qui doit **faire entrer le plus de prospects** dans le tunnel, avant montée en gamme vers les offres annuelles.

### 5.3 Tunnel complet acquisition → contractualisation
Le parcours forme une chaîne cohérente et **outillée de bout en bout** :
```
Visite → Offres (CTA devis) / Hook découverte
      → Funnel /devis (collectif → usages → coordonnées)
      → Calcul tarifaire (remises volume/durée automatiques)
      → Email du devis au client (lien direct vers la signature)
      → Page devis + signature électronique
        (acceptation différenciée des documents selon l'offre + code promo revalidé serveur)
      → PDF généré + emails (client + directrice)
      → Côté admin : suivi, relances, envoi/renvoi à une adresse au choix,
        génération de la FACTURE et téléchargement Devis / Facture / Contrat.
```

### 5.4 Différenciation contractuelle par offre
Décision métier implémentée : l'acceptation des documents est **différenciée** —
- offres annuelles : **CGV + DPA + SLA** ;
- offre découverte / essai 30 jours : **CGV (essai) + PDD**.
Deux **CGV distinctes** coexistent (une pour les offres, préavis 3 mois, le Prestataire étant sous-traitant RGPD avec DPA ; une pour l'essai, préavis 8 jours, le Prestataire étant responsable de traitement), toutes deux **éditables depuis l'admin** et servies en pages web indexables.

---

## 6. Élimination de WordPress (source de vérité unique)

Historiquement, le contenu venait de WordPress *et* de la base, avec des valeurs en dur incohérentes. Le contenu a été **migré vers la base Prisma/Supabase** :
- **Équipe**, **partenaires**, **citation/compteur** → base + routes dédiées, lecture sans WordPress.
- **Blog** : modèle `Article`, import des articles (HTML fidèle, image, catégorie, auteur, SEO), pages publiques sur la base, **éditeur riche** + sanitisation HTML serveur à l'écriture.
- **Impact** : plus aucun appel à WordPress pour afficher le site ; contenu 100 % éditable depuis l'admin ; robustesse accrue (fin des dépendances CORS/extension/latence WP). Reste à rapatrier les **fichiers images** (équipe/partenaires/blog) sur un stockage objet (S3 / Supabase Storage).

---

## 7. Fonctionnalités créées (synthèse)

| Domaine | Réalisation |
|---|---|
| **CRM — cœur commercial** | Modèles `Interaction` + `Task` ; **journal des échanges** et **tâches/relances** par collectif ; **pipeline** (kanban par statut) ; **page tâches globale** (en retard / à venir / terminées) ; **dashboard enrichi** (relances à traiter + répartition pipeline). |
| **Devis** | Calcul tarifaire (remises auto), funnel en 3 étapes, **offre découverte** intégrée (durée fixe 1 mois), **email du devis au client à la création**, **envoi admin vers une adresse au choix**. |
| **Signature & documents** | Signature électronique, acceptation **différenciée** des documents, **PDF devis** redesigné, **PDF facture** généré depuis un devis, **téléchargement** devis / facture / contrat. |
| **Documents légaux** | 5 documents éditables (CGV offres, **CGV essai**, DPA, SLA, PDD) + mapping par offre. |
| **RDV** | **Notification immédiate** à la directrice à chaque prise de RDV + **fichier `.ics` joint** (ajout en 1 clic à Apple Calendar / Google / Outlook — réponse pragmatique au besoin de synchronisation d'agenda). Destinataire configurable. |
| **CMS / Admin** | **4ème offre éditable** (titre, prix, sous-titre, points) ; éditeur CMS en textarea pour les champs longs ; **upload d'images** depuis l'ordinateur (en plus de l'URL) pour équipe/partenaires. |
| **Sécurité / scaling** | ISR, headers, rotation secret admin, changement de mot de passe, seed idempotent. |

---

## 8. Orchestration de l'IA (méthodologie)

Le développement a été mené en **binôme humain + assistant IA** (Claude Code). Au-delà de l'outil, une **méthode** a été appliquée pour garantir un travail propre, vérifiable et traçable — c'est un apport méthodologique du stage.

### 8.1 Principes
- **Tâches petites et ciblées** : jamais de réécriture massive en aveugle ; chaque modification est explicable en quelques lignes et respecte le style du fichier existant.
- **Plan de travail explicite** : suivi par liste de tâches (todo) tenue à jour, une tâche en cours à la fois.
- **Commits atomiques** : un commit = une tâche terminée, message conventionnel (`feat:` / `fix:` / `style:` …) en français, pour un historique lisible et réversible.
- **Build-gating** : `pnpm build` (typecheck + lint) **avant chaque commit** ; aucun commit sur une base qui ne compile pas.
- **Vérification visuelle systématique** : pour tout changement UI, **capture d'écran via Playwright** (desktop + mobile, états ouverts/fermés) — on ne déclare pas « terminé » sans avoir vu le rendu. Les PDF sont prévisualisés via leur route `inline`.
- **Mémoire de projet** : conventions, décisions et pièges consignés (fichiers de mémoire, CLAUDE.md, CHANGELOG, TASKS, BACKLOG) pour ne pas reperdre le contexte.

### 8.2 Bonnes pratiques spécifiques
- **Idempotence des scripts** (seed qui ne clobbere pas les données admin, `db push` via le pooler quand le `DIRECT_URL` est injoignable en local).
- **Vérification bout-en-bout** des features sensibles : ex. création réelle d'une interaction/tâche puis contrôle de leur remontée sur le dashboard ; test des routes de calcul de devis et d'inscription newsletter ; connexion admin réelle pour prévisualiser facture et pages protégées.
- **Décisions tracées et arbitrages explicites** : lorsqu'une consigne était ambiguë (ex. deux CGV contradictoires, emplacement exact d'un texte), le choix est documenté plutôt que deviné silencieusement.
- **Séparation des responsabilités** : logique métier dans `services/`, présentation dans `components/`, accès données via le singleton Prisma, contenu éditorial en base.

### 8.3 Garde-fous
- Travail sur **branche dédiée** (jamais `main` directement), push **uniquement** après validation, sur le **fork** personnel.
- Respect d'un **feeling artisanal** demandé par le tuteur : code lisible, commenté dans le style existant, pas d'over-engineering.

---

## 9. Bilan et perspectives

### 9.1 Acquis
La plateforme est passée d'un site vitrine à un **outil commercial complet** : acquisition (offres + hook découverte), contractualisation (devis → signature → PDF → facture), suivi (CRM : pipeline, interactions, relances), le tout sur une **source de vérité unique** et avec une **identité visuelle premium et cohérente**.

### 9.2 Reste à faire / pistes
- **Stockage objet** (S3 / Supabase Storage) pour les images uploadées et les médias encore hébergés sur WP (prérequis : accès AWS) — l'upload local actuel est prêt à être migré.
- **Synchronisation calendrier avancée** : au-delà du `.ics`, une intégration Google Calendar / CalDAV iCloud bidirectionnelle si le besoin se confirme.
- **CSP bloquante** (après période de monitoring report-only) et **politique de rétention RGPD** formalisée.
- **Module support / SAV** (tickets) si le volume client le justifie.
- **Commentaires avec profil LinkedIn** (anti-spam B2B) — à évaluer (friction vs. crédibilité, implication RGPD).
- Poursuite des **audits a11y / cross-browser** jusqu'à conformité complète.
- Finalisation du **sweep typographique** (tirets cadratins) et arbitrage sur l'usage des italiques de marque.

---

*Document généré dans le cadre du stage — à enrichir / ajuster selon les retours.*
