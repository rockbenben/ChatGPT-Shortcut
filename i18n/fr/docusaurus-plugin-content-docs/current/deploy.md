# Déployer

AI Short est un projet open source, vous pouvez modifier librement le nom et la description du site Web.

- Pour modifier le nom de la page, modifiez le fichier `docusaurus.config.js`.
- Pour modifier les instructions, accédez au répertoire `docs`.
- Pour modifier les mots d'invite, vous pouvez les trouver dans `src/data/prompt.json`. Si vous n'avez besoin de modifier qu'une seule langue, comme le chinois, vous pouvez directement modifier `src/data/prompt_zh.json`.
- Actuellement, le backend utilisateur est connecté à un système backend commun. Si nécessaire, vous pouvez créer votre propre backend, et l'interface correspondante se trouve dans le fichier `src/api.js`.

`CodeUpdateHandler.py` est un script pour le traitement par lots du déploiement multilingue. Une fois la modification terminée, exécutez `python CodeUpdateHandler.py`, qui divisera `prompt.json` en plusieurs langues selon les règles, et synchronisera le code de la page principale de chaque langue et le code de la page indépendante des mots d'invite sélectionnés.

## Instructions de déploiement

Exigences système :

- [Node.js 18.0](https://nodejs.org/) ou version ultérieure.
- macOS, Windows (y compris WSL) et Linux sont supportés.

### Déploiement local

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/).

```shell
# Installation
yarn

# Développement local
yarn start

# Build : Cette commande génère du contenu statique dans le répertoire `build`
yarn build

# Mettez à jour le `defaultLocale` dans le fichier `docusaurus.config.js`, puis effectuez un build pour la langue souhaitée.
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# Déploiement pour plusieurs langues
yarn build --locale zh && yarn build --locale en
```

### Déploiement sur Vercel

Cliquez sur le bouton ci-dessous pour déployer ChatGPT-Shortcut sur la plateforme Vercel en un seul clic :

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Remarque** : La version gratuite de Vercel peut rencontrer des erreurs dues à un manque de mémoire. Dans ce cas, vous pouvez opter pour un déploiement en une seule langue. Voici les étapes à suivre :

1. Accédez au projet Vercel que vous venez de déployer et ouvrez **Settings**.
2. Dans la section **Build & Deployment**, trouvez **Build Command**, puis cliquez sur **Override** à droite.
3. Modifiez la commande de déploiement. Par exemple, pour déployer la version chinoise, utilisez `yarn build --locale zh`; pour la version portugaise, utilisez `yarn build --locale pt`.

## Déploiement sur Cloudflare Pages

Cliquez sur le bouton ou le lien ci-dessous pour fork ce projet, puis suivez les instructions pour le déployer sur Cloudflare Pages :

👉 [Fork ce projet](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Étapes de déploiement :

1. Connectez-vous à [Cloudflare Pages](https://pages.cloudflare.com/) et sélectionnez **"Create a project"**.
2. Liez le dépôt que vous venez de forker.
3. Configurez la commande de construction :
   - **Build command** : `yarn build --locale zh` (choisissez le locale approprié en fonction de la langue à déployer, par exemple : pour le portugais, utilisez `yarn build --locale pt`).
   - **Output directory** : `build`.
4. Cliquez sur **Déployer**, puis attendez que Cloudflare Pages termine la construction et le déploiement.

Cloudflare Pages déclenchera également automatiquement un build et un déploiement chaque fois que vous pousserez de nouveaux codes.

### Déploiement Docker

Si vous connaissez Docker, vous pouvez effectuer un déploiement rapide avec la commande suivante :

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Vous pouvez également utiliser `docker-compose` :

```yml
version : "3.8"

services :
docsify :
container_name : chatgpt-shortcut
image : ghcr.io/rockbenben/chatgpt-shortcut:latest
ports :
- "3000:3000"
restart : unless-stopped
```

## Mises à jour synchronisées

Si vous avez déployé votre propre projet sur Vercel en un seul clic, vous pouvez rencontrer un problème où les mises à jour sont systématiquement indiquées. Cela découle du comportement par défaut de Vercel qui consiste à créer un nouveau projet pour vous au lieu de dupliquer le projet actuel, ce qui empêche la détection correcte des mises à jour. Il est recommandé de suivre les étapes suivantes pour le redéploiement :

1. Supprimez le référentiel précédent.
2. Utilisez le bouton « fork » situé dans le coin supérieur droit de la page pour forker le projet actuel.
3. Sur la page [Vercel New Project](https://vercel.com/new), sélectionnez le projet récemment forké dans la section Import Git Repository et procédez au déploiement.

### Mises à jour automatiques

> En cas d'erreur lors de l'exécution de la synchronisation en amont, effectuez manuellement un seul fork de synchronisation.

Une fois le projet forké, en raison des restrictions de GitHub, il est nécessaire d'activer manuellement les workflows sur la page Actions de votre projet forké et d'activer l'action de synchronisation en amont. Une fois l'activation effectuée, les mises à jour seront automatiquement exécutées quotidiennement.

![Mises à jour automatiques](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activation des mises à jour automatiques](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mises à jour manuelles

Si vous souhaitez effectuer une mise à jour manuelle immédiatement, vous pouvez vous référer à la [documentation de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) pour savoir comment synchroniser le projet forké avec le code en amont.

N'hésitez pas à montrer votre soutien à ce projet en lui attribuant une étoile/en le suivant, ou en suivant l'auteur, pour rester informé des notifications en temps opportun concernant les nouvelles mises à jour de fonctionnalités.
