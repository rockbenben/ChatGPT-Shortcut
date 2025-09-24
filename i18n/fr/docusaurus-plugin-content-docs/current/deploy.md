---
sidebar_label: Déploiement
title: Guide de Déploiement & Personnalisation | Configurez AI Short Facilement
description: Apprenez à déployer et personnaliser rapidement votre projet AI Short. Ce guide couvre Vercel, Cloudflare, Docker, et le déploiement local, ainsi que la modification du contenu et l'activation des mises à jour automatiques.
---

# Déploiement du Projet

## Configuration & Personnalisation

AI Short est un projet open-source, et vous pouvez librement modifier le titre du site, sa description, les prompts, et plus encore. Voici les options de personnalisation courantes :

- **Modifier le titre et la description du site**  
    Mettez à jour le fichier `docusaurus.config.js`.

- **Modifier les instructions d'utilisation et la documentation**  
    Tous les fichiers de documentation se trouvent dans le répertoire `docs`. Ouvrez et modifiez le fichier pertinent selon vos besoins.

- **Modifier les prompts de la page d'accueil**  
    Les prompts de la page d'accueil sont stockés dans `src/data/prompt.json`.  
    Pour des langues spécifiques (par exemple, le chinois), modifiez `src/data/prompt_zh.json`.  
    Format d'exemple pour un nouveau prompt :

`json
  {
    "zh": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  `

**Remarque** : Utilisez `id >= 500` pour les nouveaux prompts. Ceux-ci n'auront pas de pages dédiées ni de commentaires.
Si vous voulez une page dédiée, copiez un fichier de modèle depuis `src/data/pages/prompt` et modifiez-le.

- **Backend personnalisé**
    Le projet est actuellement lié à un backend partagé.
    Pour configurer le vôtre, consultez les détails de l'API dans `src/api.js`.

- **Support multilingue**
    Après avoir mis à jour les fichiers de langue, exécutez le script `CodeUpdateHandler.py` pour un traitement par lot :

`bash
  python CodeUpdateHandler.py
  `

Ce script divisera `prompt.json` et synchronisera les mises à jour avec les pages de prompts principales et en vedette de chaque langue.

## Guide de Déploiement

**Prérequis système**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (y compris WSL), ou Linux

### Déploiement Local

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/).

```bash
# Installer les dépendances
yarn

# Développement local
yarn start

# Construire les fichiers statiques
yarn build

# Construire pour plusieurs langues
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

# Exemple : construire pour deux langues
yarn build --locale zh && yarn build --locale en
```

### Déploiement sur Vercel

Cliquez ci-dessous pour déployer ChatGPT-Shortcut sur Vercel en un clic :

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Remarque** : Le plan gratuit de Vercel peut manquer de mémoire. Dans ce cas, ne déployez qu'une seule langue.

Étapes :

1.  Allez sur votre projet Vercel déployé → **Settings**.
2.  Sous **Build & Deployment**, trouvez **Build Command** → cliquez sur **Override**.
3.  Définissez la commande de construction, par ex. :

- Pour le chinois : `yarn build --locale zh`
   - Pour le portugais : `yarn build --locale pt`

### Déploiement sur Cloudflare Pages

👉 [Forkez le dépôt](https://github.com/rockbenben/ChatGPT-Shortcut/fork), puis déployez via Cloudflare Pages :

1.  Connectez-vous à [Cloudflare Pages](https://pages.cloudflare.com/), choisissez **Create a project**.
2.  Connectez votre dépôt forké.
3.  Configurez les paramètres de construction :

- **Build command**: `yarn build --locale zh` (ou une autre langue)
   - **Output directory**: `build`

4.  Déployez et attendez la fin de la construction.

Cloudflare Pages se redéploiera automatiquement lorsque vous pousserez de nouveaux commits.

### Déploiement avec Docker

Exécuter avec Docker :

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Ou avec `docker-compose` :

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Activer la Mise à Jour Automatique

Si vous avez utilisé le déploiement en un clic de Vercel, vous pourriez voir souvent "mises à jour disponibles".
C'est parce que Vercel crée un nouveau dépôt au lieu d'un fork, ce qui rompt la synchronisation.

**Correctif :**

1.  Supprimez l'ancien dépôt.
2.  Forkez ce projet directement (utilisez le bouton fork).
3.  Redéployez depuis votre fork via la [nouvelle page de projet Vercel](https://vercel.com/new).

### Mises à Jour Automatiques

> Si vous voyez des erreurs avec **Upstream Sync**, exécutez **Sync Fork** manuellement une fois.

Après avoir forké, GitHub vous demande d'activer manuellement les workflows :

- Allez dans **Actions** dans votre fork
- Activez les workflows, en particulier **Upstream Sync Action**.

Cela s'exécutera quotidiennement pour récupérer les mises à jour en amont.

### Mises à Jour Manuelles

Pour des mises à jour immédiates, consultez la [documentation de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sur la synchronisation des forks.

⭐ Mettez une étoile / 👀 Suivez ce projet ou suivez l'auteur pour être notifié des nouvelles fonctionnalités.
