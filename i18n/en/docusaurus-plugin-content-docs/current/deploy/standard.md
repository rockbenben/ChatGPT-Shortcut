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

# build: outputs static files to the build directory, using the defaultLocale in scripts/i18nLocales.mjs
yarn build
```

> **Build specific languages only**: use `yarn build --locale <locale>` (e.g. `zh-Hans`, `en`, `ja`… see the full locale list in `scripts/i18nLocales.mjs`). Chain multiple: `yarn build --locale zh-Hans && yarn build --locale en`.

## Vercel Deployment

Click the button below for one-click deployment to Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Note**: Vercel's free tier may fail due to memory limits. Deploy a single language instead — go to the project's **Settings → Build & Deployment → Build Command**, click **Override**, and set a single-language command (`yarn build --locale zh-Hans` for Chinese, `yarn build --locale pt` for Portuguese, etc.).

## Cloudflare Pages Deployment

First 👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork), then deploy:

1. Sign in to [Cloudflare Pages](https://pages.cloudflare.com/) and choose **Create a project**
2. Connect the repository you just forked
3. Configure the build:
   - **Build command**: `yarn build --locale zh-Hans` (swap the locale for the language you want to deploy, e.g. `yarn build --locale pt` for Portuguese)
   - **Output directory**: `build`
4. Click **Deploy** and wait for Cloudflare Pages to finish building

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
