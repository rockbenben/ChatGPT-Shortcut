---
sidebar_label: Distribuzione Standard
title: AI Short Distribuzione Standard | Build locale, Vercel, Cloudflare, Docker
description: Guida alla distribuzione standard di AI Short, che riutilizza il backend condiviso ufficiale, con supporto per build locale, deploy con un clic su Vercel, Cloudflare Pages e Docker, pronta all'uso.
---

# Distribuzione Standard

Riutilizza il backend condiviso ufficiale e funziona immediatamente. Prima fai il fork del progetto, poi distribuisci con uno dei metodi seguenti.

**Requisiti**: [Node.js 20.0](https://nodejs.org/) o successivo, su macOS, Windows (incluso WSL) o Linux.

![Topologia di distribuzione standard: dopo il fork, distribuisci tramite build locale, Vercel, Cloudflare Pages o Docker — tutti riutilizzano il backend condiviso ufficiale (accesso, collezioni, community, commenti, sincronizzazione cross-device)](/img/docs/standard-deploy-topology.svg)

## Build Locale

```shell
# installa le dipendenze
yarn

# sviluppo locale
yarn start

# build: genera i file statici nella directory build, usando il defaultLocale in scripts/i18nLocales.mjs
yarn build
```

> **Build solo per lingue specifiche**: usa `yarn build --locale <locale>` (es. `zh-Hans`, `en`, `ja`… vedi l'elenco completo dei locale in `scripts/i18nLocales.mjs`). Concatena più build: `yarn build --locale zh-Hans && yarn build --locale en`.

## Distribuzione su Vercel

Clicca il pulsante qui sotto per distribuire su Vercel con un clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Nota**: il piano gratuito di Vercel potrebbe fallire a causa dei limiti di memoria. In tal caso distribuisci una sola lingua — vai nelle **Settings → Build & Deployment → Build Command** del progetto, clicca su **Override** e imposta un comando per una singola lingua (`yarn build --locale zh-Hans` per il cinese, `yarn build --locale pt` per il portoghese, ecc.).

## Distribuzione su Cloudflare Pages

Prima 👉 [Fai il fork di questo progetto](https://github.com/rockbenben/ChatGPT-Shortcut/fork), poi distribuisci:

1. Accedi a [Cloudflare Pages](https://pages.cloudflare.com/) e scegli **Create a project**
2. Collega il repository che hai appena forkato
3. Configura la build:
   - **Build command**: `yarn build --locale zh-Hans` (sostituisci il locale con la lingua che vuoi distribuire, es. `yarn build --locale pt` per il portoghese)
   - **Output directory**: `build`
4. Clicca su **Deploy** e attendi che Cloudflare Pages completi la build

Ogni push successivo attiva automaticamente una build e una distribuzione.

## Distribuzione Docker

Distribuzione con un solo comando:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Oppure con `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
