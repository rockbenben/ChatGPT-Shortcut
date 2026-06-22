---
sidebar_label: Implantação Padrão
title: Implantação Padrão do AI Short | Build Local, Vercel, Cloudflare, Docker
description: Tutorial de implantação padrão do AI Short, reutilizando o backend compartilhado oficial, com suporte a build local, deploy com um clique na Vercel, Cloudflare Pages e Docker, pronto para usar.
---

# Implantação Padrão

Reutiliza o backend compartilhado oficial e funciona imediatamente. Primeiro faça o fork do projeto e, em seguida, implante com um dos métodos abaixo.

**Requisitos**: [Node.js 20.0](https://nodejs.org/) ou superior, no macOS, Windows (incluindo WSL) ou Linux.

![Topologia de implantação padrão: após o fork, implante via build local, Vercel, Cloudflare Pages ou Docker — todos reutilizam o backend compartilhado oficial (login, favoritos, comunidade, comentários, sincronização entre dispositivos).](/img/docs/standard-deploy-topology.svg)

## Build Local

```shell
# instalar dependências
yarn

# desenvolvimento local
yarn start

# build: gera arquivos estáticos no diretório build, usando o defaultLocale em scripts/i18nLocales.mjs
yarn build
```

> **Build apenas de idiomas específicos**: use `yarn build --locale <locale>` (ex.: `zh-Hans`, `en`, `ja`… veja a lista completa de locales em `scripts/i18nLocales.mjs`). Encadeie múltiplos: `yarn build --locale zh-Hans && yarn build --locale en`.

## Implantação Vercel

Clique no botão abaixo para implantar na Vercel com um clique:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Nota**: O plano gratuito da Vercel pode falhar devido a limites de memória. Implante um único idioma — acesse **Settings → Build & Deployment → Build Command** no projeto, clique em **Override** e defina um comando de idioma único (`yarn build --locale zh-Hans` para Chinês, `yarn build --locale pt` para Português, etc.).

## Implantação Cloudflare Pages

Primeiro 👉 [Faça um fork deste projeto](https://github.com/rockbenben/ChatGPT-Shortcut/fork) e depois implante:

1. Entre no [Cloudflare Pages](https://pages.cloudflare.com/) e selecione **Create a project**
2. Conecte o repositório que você acabou de fazer o fork
3. Configure o build:
   - **Build command**: `yarn build --locale zh-Hans` (troque o locale pelo idioma que deseja implantar, ex.: `yarn build --locale pt` para Português)
   - **Output directory**: `build`
4. Clique em **Deploy** e aguarde o Cloudflare Pages concluir o build

Cada push posterior aciona automaticamente um novo build e implantação.

## Implantação Docker

Implantação em uma linha:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Ou com `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
