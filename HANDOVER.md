# HANDOVER — Reprise du projet Uvibes

Guide pour reprendre le projet **uvibes.fr** (site vitrine + funnel de devis + dashboard admin).
À lire en premier. Pour le détail technique, voir les docs référencées en bas.

---

## 1. C'est quoi ?

Application **Next.js 15 (App Router) / React 19 / TypeScript** en 3 briques :

1. **Site vitrine** — pages marketing (accueil, solution, à propos, blog, pages légales), multilingue (FR + 10 langues sous `/en`, `/es`, …).
2. **Funnel de devis** (`/devis`) — formulaire en étapes → calcul → page devis → signature en ligne → PDF + email.
3. **Dashboard admin** (`/admin`) — CMS (contenu, offres, témoignages, équipe, partenaires), devis, codes promo, RDV, newsletter, collectifs (CRM embryon), maintenance.

Contenu éditorial : **WordPress headless** (API REST). Données applicatives : **PostgreSQL/Supabase** via **Prisma**.

---

## 2. Démarrer en local

Prérequis : **Node 20+**, **pnpm 10+**.

```bash
pnpm install                 # installe les deps (+ prisma generate en postinstall)
cp .env.example .env.local   # puis remplir les valeurs (voir .env.example, tout est commenté)
pnpm prisma generate         # (déjà fait par postinstall, mais sans risque)
pnpm dev                     # http://localhost:3000  (Turbopack)
```

Si la DB est neuve, appliquer le schéma :
```bash
# DIRECT_URL est souvent injoignable en local → on pousse sur le pooler :
DATABASE_URL="$DBURL" DIRECT_URL="$DBURL" npx prisma db push --skip-generate
# (DBURL = la valeur de DATABASE_URL, le pooler)
```

---

## 3. Scripts utiles (`package.json`)

| Commande | Rôle |
|---|---|
| `pnpm dev` | Serveur de dev (Turbopack) |
| `pnpm build` | Build prod (`prisma generate` + `next build`) |
| `pnpm start` | Sert le build prod |
| `pnpm lint` | ESLint |
| `pnpm db:studio` | Prisma Studio (explorer la DB) |
| `pnpm db:seed` | Seed de la DB |
| `pnpm format` | Prettier |

> ⚠️ **Ne jamais lancer `pnpm build` pendant que `pnpm dev` tourne** : ils partagent le dossier `.next` et le build prod corrompt le serveur dev (il renvoie alors des 500). Pour vérifier un build sans casser le dev, utiliser un port séparé : `PORT=3001 pnpm start` après un build fait à part.

---

## 4. Variables d'environnement

Toutes décrites dans **`.env.example`** (copier en `.env.local`). Résumé :

- **CMS / URLs** : `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CLOUDFRONT_URL`
- **Analytics** : `NEXT_PUBLIC_GOOGLE_ANALYTICS` (GA4, optionnel — voir §6)
- **Base de données** (Prisma) : `DATABASE_URL` (pooler), `DIRECT_URL` (direct)
- **Auth admin** : `IRON_SESSION_SECRET` (le mot de passe admin est en base, table `AdminUser`, bcrypt)
- **Cron** : `CRON_SECRET`
- **Email (Brevo SMTP)** : `SMTP_HOST/PORT/USER/PASS`, `MAIL_FROM`, `NOTIFY_EMAIL`
- **Newsletter (Brevo API)** : `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID` (optionnel)

**Obsolètes (ne plus utiliser, retirés du code)** : `EMAIL_USER`, `GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN` (ancien Gmail OAuth → remplacé par Brevo), `ADMIN_PASSWORD` (auth en base désormais).

⚠️ La base Supabase est **dédiée à Uvibes** (différente du projet `bizz`) — ne jamais pointer ailleurs.

---

## 5. Déploiement

- Hébergé sur **Vercel** (fork `fvlekk/uvibes-sitevitrine`, branche `main` → prod).
- Reporter **toutes** les variables de `.env.local` dans les *Environment Variables* Vercel.
- Crons définis dans `vercel.json` (ex. rappels RDV `/api/rdv/reminders` à 08:00) — protégés par `CRON_SECRET`.
- Migration prévue à terme vers **OVH** (hébergement + emails webmail OVH/SMTP) — voir mémoire projet.

---

## 6. Google Analytics — état

- **GA4 + Consent Mode v2** branché dans `src/app/layout.tsx`.
- Le script GA ne se charge **que si** `NEXT_PUBLIC_GOOGLE_ANALYTICS` est défini.
- Consentement **refusé par défaut** (`analytics_storage: denied`), **accordé** quand l'utilisateur accepte le bandeau cookies (`src/components/cookieConsent.tsx`).
- Les `page_view` des navigations client (App Router) sont renvoyés par `src/components/analytics/GARouteTracker.tsx`.
- Pour vérifier : ouvrir le site, accepter les cookies, et regarder le *Realtime* dans GA4 (ou l'onglet Réseau → requêtes `google-analytics.com/g/collect`).

---

## 7. Architecture (où trouver quoi)

```
src/app/            pages (App Router) + /api (routes serveur) + /admin (dashboard) + /devis
src/components/     composants UI, regroupés par domaine (section, devis, admin, features…)
src/styles/         1 fichier CSS par composant
src/services/       logique métier & fetch (crm, pdf, rdv, home, blog…)
src/lib/            prisma, session (iron-session), mailer (Brevo), brevo (API), seo, helpers
prisma/schema.prisma  modèles DB (Quote, Collectif, PromoCode, Rdv*, Plan, Feature, AdminUser…)
```

Conventions : kebab-case pour CSS/assets, PascalCase pour composants/types, camelCase pour hooks/services, pas de `any`. Détail dans `README.md`.

**Docs de référence (dans le repo)** :
- `memory/ARCHITECTURE.md` — routes API, modèles, flux de données, design system, sécurité.
- `memory/TASKS.md` — tâches en cours et statuts.
- `memory/CHANGELOG.md` — historique détaillé des changements (avec section *Impact*).
- `memory/BACKLOG.md` — tâches non urgentes (typos, refactors cosmétiques, perfs mineures).
- `CLAUDE.md` — **point d'entrée auto-lu par Claude Code** : index de reprise (en tête) + contexte projet complet (stack, structure, décisions, fichiers critiques, règles). Si tu utilises Claude Code, il le lit tout seul à chaque session.

---

## 8. Travaux en cours / à faire (extrait)

- **Médias en attente** : vidéo reel 9:16 + podcast à coller dans `REEL_SRC` / `PODCAST_SRC` (`src/components/solution/SolutionSoftSkills.tsx`).
- **Affiches Santé** dédiées (placeholders « aidant » en attendant) — `src/data/collectifs/collectifsData.ts`.
- **Brevo** : vérifier l'authentification du domaine (SPF/DKIM/DMARC) côté OVH/Entri puis renseigner `BREVO_API_KEY` + `BREVO_NEWSLETTER_LIST_ID`.
- Liste complète et à jour : **`memory/TASKS.md`** et **`memory/BACKLOG.md`**.

---

## 9. Règles de travail (héritées)

- Jamais committer/pusher directement sur `main` ; brancher (`feat/…`, `fix/…`) et faire une PR.
- Commits en français : `feat:` / `fix:` / `perf:` / `refactor:` / `style:`.
- Pour tout changement UI : vérifier visuellement (desktop 1280px + mobile 390px) avant de valider.
- Avant livraison : `pnpm lint` + `pnpm build` doivent passer sans erreur ; console navigateur sans erreur.
