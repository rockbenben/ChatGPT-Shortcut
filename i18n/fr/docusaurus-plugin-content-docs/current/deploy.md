---
sidebar_label: Déploiement
title: Déploiement AI Short - Vercel/Docker Facile
description: Déployez votre propre bibliothéque de prompts. Guide complet pour Vercel et Docker, incluant la configuration et les mises à jour auto.
---

# Déploiement du projet

## Configuration et personnalisation

AI Short est un projet open source qui vous permet de modifier librement le titre, la description, les prompts et d'autres contenus du site web selon vos besoins. Voici les options de modification courantes et les instructions d'opération :

- **Modifier le titre et la description du site web**
  Pour changer le titre et la description du site web, veuillez éditer le fichier de configuration `docusaurus.config.js`.

- **Modifier les instructions d'utilisation et l'introduction du projet**
  Les instructions d'utilisation et les fichiers d'introduction du projet se trouvent dans le répertoire `docs`. Ouvrez les fichiers pertinents dans ce répertoire pour effectuer les modifications nécessaires.

- **Modifier les prompts de la page d'accueil**
  Les prompts de la page d'accueil sont stockés dans le fichier `src/data/prompt.json`. Si vous devez modifier des prompts pour une langue spécifique, comme le chinois, vous pouvez éditer directement le fichier `src/data/prompt_es.json`. Lors de l'ajout d'un nouveau prompt, le format est le suivant :

  ```json
  {
    "es": {
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
  ```

  **Note** : Il est recommandé de définir l'`id` à 500 ou plus. Les prompts nouvellement ajoutés n'auront pas de page dédiée ni de section de commentaires. Si vous devez ajouter une page dédiée pour un prompt, vous pouvez copier le fichier modèle dans le répertoire `src/data/pages/prompt` pour le modifier.

- **Backend personnalisé**
  Le projet actuel est connecté à un système backend partagé. Si vous souhaitez créer votre propre backend, vous pouvez consulter les instructions de l'interface dans le dossier `src/api`.

  Structure du module API :

  ```
  src/api/
  ├── index.ts       # Entrée d'exportation unifiée
  ├── config.ts      # Configuration de l'URL de l'API
  ├── client.ts      # Client Axios (y compris les intercepteurs d'authentification)
  ├── auth.ts        # API d'authentification (Connexion/Inscription/OAuth)
  ├── prompts.ts     # CRUD de prompts + Recherche + Vote
  ├── favorites.ts   # Opérations favoris
  ├── myspace.ts     # Données de mon espace (source de données principale)
  ├── comments.ts    # Système de commentaires
  └── user.ts        # Informations utilisateur
  ```

  **Mécanisme de cache** : Le projet utilise `lscache` combiné avec des ETags pour implémenter un cache intelligent. Lorsque le serveur renvoie 304 Not Modified, les données en cache local sont directement réutilisées pour réduire la transmission de données.

- **Support multilingue et déploiement**
  Une fois les modifications multilingues terminées, vous pouvez utiliser le script `CodeUpdateHandler.py` pour le traitement par lots. Exécutez la commande suivante :

  ```bash
  python CodeUpdateHandler.py
  ```

  Ce script divisera le fichier `prompt.json` selon des règles prédéfinies et mettra à jour de manière synchrone la page principale et les pages de prompts en vedette pour chaque version linguistique.

## Deploiement hors ligne (Intranet)

Pour les intranets d'entreprise, les reseaux gouvernementaux ou les environnements sans acces au reseau externe, AI Short propose une version hors ligne dediee. Aucun serveur backend ni inscription utilisateur requis. Deployez avec une seule commande Docker :

```bash
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline
```

Pour plus de details, y compris la construction a partir du code source, l'import/export de donnees et l'utilisation en equipe, consultez le guide de la [version hors ligne](./guides/offline).

## Instructions de deploiement

Exigences système :

- [Node.js 20.0](https://nodejs.org/) ou version ultérieure.
- macOS, Windows (y compris WSL) et Linux sont pris en charge.

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
yarn build --locale zh-Hans
yarn build --locale zh-Hant
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
yarn build --locale zh-Hans && yarn build --locale en
```

### Déploiement Vercel

Cliquez sur le bouton ci-dessous pour déployer ChatGPT-Shortcut sur la plateforme Vercel en un clic :

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Note** : La version gratuite de Vercel peut signaler une erreur en raison d'une mémoire insuffisante. Si vous rencontrez cette situation, vous pouvez choisir de déployer une seule langue. Les opérations spécifiques sont les suivantes :

1. Entrez dans le projet Vercel que vous venez de déployer et ouvrez **Settings**.
2. Dans la section **Build & Deployment**, trouvez **Build Command**, puis cliquez sur **Override** à droite.
3. Modifiez la commande de déploiement. Par exemple, si vous devez déployer la version chinoise, vous pouvez utiliser `yarn build --locale zh-Hans` ; si vous devez déployer la version portugaise, utilisez `yarn build --locale pt`.

### Déploiement Cloudflare Pages

Cliquez sur le bouton ou le lien ci-dessous pour faire un Fork de ce projet, puis suivez les instructions pour déployer sur Cloudflare Pages :

👉 [Faire un Fork de ce projet](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Étapes de déploiement :

1. Connectez-vous à [Cloudflare Pages](https://pages.cloudflare.com/) et sélectionnez **"Create a project"**.
2. Liez le dépôt que vous venez de forker.
3. Configurez les commandes de build :
   - **Build command** : `yarn build --locale zh-Hans` (Choisissez la locale appropriée selon la langue à déployer, ex: pour le portuguais utilisez `yarn build --locale pt`).
   - **Output directory** : `build`.
4. Cliquez sur **Deploy** et attendez que Cloudflare Pages termine le build et le déploiement.

Cloudflare Pages déclenchera également automatiquement des builds et des déploiements chaque fois que vous pousserez du nouveau code.

### Déploiement Docker

Si vous êtes familier avec Docker, vous pouvez déployer rapidement en utilisant la commande suivante :

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativement, vous pouvez également utiliser `docker-compose` :

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Activer les mises à jour synchronisées

Si vous avez déployé votre propre projet sur Vercel en un clic, vous pourriez rencontrer un problème où il indique toujours que des mises à jour sont disponibles. Cela est dû au fait que Vercel crée un nouveau projet pour vous par défaut au lieu de forker ce projet, ce qui fait échouer la détection des mises à jour. Il est recommandé de redéployer en suivant ces étapes :

1. Supprimez le dépôt original ;
2. Utilisez le bouton fork dans le coin supérieur droit de la page pour forker ce projet ;
3. Resélectionnez le projet que vous venez de forker dans la section Import Git Repository de la [Page Nouveau Projet Vercel](https://vercel.com/new) et déployez.

### Activer la mise à jour automatique

> Si vous rencontrez une erreur d'exécution Upstream Sync, veuillez exécuter manuellement Sync Fork une fois !

Après avoir forké le projet, en raison des limitations de GitHub, vous devez activer manuellement les Workflows sur la page Actions de votre projet forké et activer l'Action Upstream Sync. Une fois activé, les mises à jour s'exécuteront automatiquement chaque jour :

![Mise à jour automatique](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activer la mise à jour automatique](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mise à jour manuelle du code

Si vous souhaitez mettre à jour manuellement immédiatement, vous pouvez consulter la [documentation GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) pour apprendre comment synchroniser un projet forké avec le code original.

Vous pouvez donner une étoile (star)/suivre (watch) à ce projet, ou suivre l'auteur pour recevoir des notifications de nouvelles mises à jour de fonctionnalités à temps.
