---
sidebar_label: Стандартное развертывание
title: Стандартное развертывание AI Short | Локальная сборка, Vercel, Cloudflare, Docker
description: Руководство по стандартному развертыванию AI Short — использует официальный общий бэкенд, поддерживает локальную сборку, развертывание на Vercel в один клик, Cloudflare Pages и Docker, работает сразу после настройки.
---

# Стандартное развертывание

Использует официальный общий бэкенд и работает сразу после настройки. Сначала сделайте форк проекта, затем выберите один из способов развертывания ниже.

**Требования**: [Node.js 20.0](https://nodejs.org/) или новее, на macOS, Windows (включая WSL) или Linux.

![Топология стандартного развёртывания: после форка разверните проект через локальную сборку, Vercel, Cloudflare Pages или Docker — все варианты используют общий официальный бэкенд (вход, коллекции, сообщество, комментарии, синхронизация между устройствами)](/img/docs/standard-deploy-topology.svg)

## Локальная сборка

```shell
# установка зависимостей
yarn

# локальная разработка
yarn start

# сборка: собирает все 18 языков блоками (за один проход не хватает памяти); результат в build/ — для одного языка см. --locale ниже
yarn build
```

> **Сборка только определённых языков**: используйте `yarn build --locale <locale>` (например, `zh-Hans`, `en`, `ja`… полный список локалей см. в `scripts/i18nLocales.mjs`). Для нескольких языков: `yarn build --locale zh-Hans && yarn build --locale en`.

## Развертывание на Vercel

Нажмите кнопку ниже для развертывания на Vercel в один клик:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Примечание**: бесплатный тарифный план Vercel может завершиться ошибкой из-за ограничений памяти. Вместо этого разверните один язык — откройте **Settings → Build & Deployment → Build Command** в вашем проекте, нажмите **Override** и задайте команду для одного языка (`yarn build --locale zh-Hans` для китайского, `yarn build --locale pt` для португальского и т. д.).

## Развертывание на Cloudflare Pages

Сначала 👉 [сделайте форк этого проекта](https://github.com/rockbenben/ChatGPT-Shortcut/fork), затем выполните развертывание:

1. Откройте [страницу создания Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) и выберите **Connect to Git**. Если попали на Create a Worker, вход в Pages — ссылка **Get started** внизу
2. Подключите только что форкнутый репозиторий
3. Настройте сборку:
   - **Build command**: `yarn build --locale zh-Hans` (замените локаль на нужный язык, например `yarn build --locale pt` для португальского)
   - **Output directory**: `build`
   - **Environment variables**: `YARN_VERSION` = `1.22.22`
4. Нажмите **Deploy** и дождитесь завершения сборки Cloudflare Pages

> **`YARN_VERSION` обязательна**: система сборки v3 у Cloudflare по умолчанию берёт Yarn 4.9.1 и больше не определяет версию по `yarn.lock`, как это делала v2. В этом репозитории lockfile формата v1 от Yarn Classic, поэтому без закрепления его возьмёт на себя Yarn 4. Node настраивать не нужно: v3 по умолчанию даёт 22.16.0 — уже выше требуемых 20.

Каждый последующий push автоматически запускает сборку и развертывание.

## Развертывание Docker

Развертывание одной командой:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Или с помощью `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
