---
sidebar_label: Standard Deployment
title: AI Short Standard Deployment | Local Build, Vercel, Cloudflare, Docker
description: AI Short standard deployment guide — reuse the official shared backend with local build, one-click Vercel, Cloudflare Pages, and Docker, working out of the box.
---

# Standard Deployment

Reuses the official shared backend and works out of the box. Fork the project first, then deploy with one of the methods below.

**Requirements**: [Node.js 20.0](https://nodejs.org/) or higher, on macOS, Windows (including WSL), or Linux.

![Standard deployment topology: after forking, deploy via local build, Vercel, Cloudflare Pages or Docker — all reuse the official shared backend (login, favorites, community, comments, cross-device sync)](/img/docs/standard-deploy-topology.svg)

## Local Build

```shell
# install dependencies
yarn

# local development
yarn start

# build: builds all 18 locales in chunks (a single pass runs out of memory); output goes to build/ — see --locale below for just one language
yarn build
```

> **Build specific languages only**: use `yarn build --locale <locale>` (e.g. `zh-Hans`, `en`, `ja`… see the full locale list in `scripts/i18nLocales.mjs`). Chain multiple: `yarn build --locale zh-Hans && yarn build --locale en`.

## Vercel Deployment

Click the button below for one-click deployment to Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Note**: Vercel's free tier may fail due to memory limits. Deploy a single language instead — go to the project's **Settings → Build & Deployment → Build Command**, click **Override**, and set a single-language command (`yarn build --locale zh-Hans` for Chinese, `yarn build --locale pt` for Portuguese, etc.).

## Cloudflare Pages Deployment

First 👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork), then deploy:

1. Open the [Pages creation page](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) and choose **Connect to Git**. If you land on Create a Worker instead, the Pages entry is the **Get started** link at the bottom
2. Connect the repository you just forked
3. Configure the build:
   - **Build command**: `yarn build --locale zh-Hans` (swap the locale for the language you want to deploy, e.g. `yarn build --locale pt` for Portuguese)
   - **Output directory**: `build`
   - **Environment variables**: `YARN_VERSION` = `1.22.22`
4. Click **Deploy** and wait for Cloudflare Pages to finish building

> **`YARN_VERSION` is required**: Cloudflare's v3 build system defaults to Yarn 4.9.1 and no longer infers the version from `yarn.lock` the way v2 did. This repository ships a Yarn Classic v1 lockfile, so without pinning it, Yarn 4 takes over. Node needs no setting — v3 defaults to 22.16.0, already above the 20 this project requires.

Every push afterwards automatically triggers a build and deploy.

## Docker Deployment

One-line deployment:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Or with `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
