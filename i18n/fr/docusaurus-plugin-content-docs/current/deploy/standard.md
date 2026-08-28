---
sidebar_label: Déploiement standard
title: Déploiement standard AI Short | Build local, Vercel, Cloudflare, Docker
description: Tutoriel de déploiement standard d'AI Short, réutilisant le backend partagé officiel, avec build local, déploiement Vercel en un clic, Cloudflare Pages et Docker, prêt à l'emploi.
---

# Déploiement standard

Réutilise le backend partagé officiel et fonctionne immédiatement. Commencez par forker le projet, puis déployez avec l'une des méthodes ci-dessous.

**Prérequis** : [Node.js 20.0](https://nodejs.org/) ou version supérieure, sous macOS, Windows (y compris WSL) ou Linux.

![Topologie du déploiement standard : après avoir forké, déployez via build local, Vercel, Cloudflare Pages ou Docker — tous réutilisent le backend partagé officiel (connexion, favoris, communauté, commentaires, synchronisation entre appareils).](/img/docs/standard-deploy-topology.svg)

## Build local

```shell
# installer les dépendances
yarn

# développement local
yarn start

# build : compile les 18 langues par blocs (un seul passage épuise la mémoire) ; sortie dans build/ — pour une seule langue, voir --locale ci-dessous
yarn build
```

> **Compiler uniquement certaines langues** : utilisez `yarn build --locale <locale>` (par ex. `zh-Hans`, `en`, `ja`… voir la liste complète des locales dans `scripts/i18nLocales.mjs`). Pour en enchaîner plusieurs : `yarn build --locale zh-Hans && yarn build --locale en`.

## Déploiement Vercel

Cliquez sur le bouton ci-dessous pour un déploiement en un clic sur Vercel :

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Remarque** : la version gratuite de Vercel peut échouer en raison de limites de mémoire. Déployez alors une seule langue : dans le projet, allez dans **Settings → Build & Deployment → Build Command**, cliquez sur **Override** et saisissez une commande mono-langue (`yarn build --locale zh-Hans` pour le chinois, `yarn build --locale pt` pour le portugais, etc.).

## Déploiement Cloudflare Pages

Commencez par 👉 [forker ce projet](https://github.com/rockbenben/ChatGPT-Shortcut/fork), puis déployez :

1. Ouvrez la [page de création Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) et choisissez **Connect to Git**. Si vous arrivez sur Create a Worker, l'entrée Pages est le lien **Get started** en bas
2. Associez le dépôt que vous venez de forker
3. Configurez le build :
   - **Build command** : `yarn build --locale zh-Hans` (remplacez la locale par la langue à déployer, par ex. `yarn build --locale pt` pour le portugais)
   - **Output directory** : `build`
   - **Environment variables**: `YARN_VERSION` = `1.22.22`
4. Cliquez sur **Deploy** et attendez que Cloudflare Pages termine le build

> **`YARN_VERSION` est indispensable** : le système de build v3 de Cloudflare utilise Yarn 4.9.1 par défaut et ne déduit plus la version depuis `yarn.lock` comme le faisait v2. Ce dépôt fournit un lockfile v1 de Yarn Classic ; sans l'épingler, Yarn 4 prend la main. Node n'a pas besoin d'être configuré : v3 utilise 22.16.0 par défaut, déjà au-dessus du 20 requis.

Chaque push ultérieur déclenche automatiquement un build et un déploiement.

## Déploiement Docker

Déploiement en une seule ligne :

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
