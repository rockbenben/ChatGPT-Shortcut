---
sidebar_label: Despliegue Estándar
title: Despliegue Estándar de AI Short | Construcción local, Vercel, Cloudflare, Docker
description: Guía de despliegue estándar de AI Short, reutilizando el backend compartido oficial, con soporte para construcción local, despliegue en Vercel con un clic, Cloudflare Pages y Docker, listo para usar.
---

# Despliegue Estándar

Reutiliza el backend compartido oficial y funciona de inmediato. Primero haz un fork del proyecto y luego despliega con uno de los métodos siguientes.

**Requisitos**: [Node.js 20.0](https://nodejs.org/) o superior, en macOS, Windows (incluyendo WSL) o Linux.

![Topología del despliegue estándar: tras hacer el fork, despliega mediante construcción local, Vercel, Cloudflare Pages o Docker — todas las opciones reutilizan el backend compartido oficial (inicio de sesión, favoritos, comunidad, comentarios y sincronización entre dispositivos).](/img/docs/standard-deploy-topology.svg)

## Construcción Local

```shell
# instalar dependencias
yarn

# desarrollo local
yarn start

# construcción: genera archivos estáticos en el directorio build, usando el defaultLocale en scripts/i18nLocales.mjs
yarn build
```

> **Construir solo idiomas específicos**: usa `yarn build --locale <locale>` (p. ej. `zh-Hans`, `en`, `ja`… consulta la lista completa de locales en `scripts/i18nLocales.mjs`). Encadena varios: `yarn build --locale zh-Hans && yarn build --locale en`.

## Despliegue en Vercel

Haz clic en el botón de abajo para desplegar en Vercel con un solo clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Nota**: El plan gratuito de Vercel puede fallar por límites de memoria. Despliega un solo idioma en su lugar — ve a **Settings → Build & Deployment → Build Command** del proyecto, haz clic en **Override** y establece un comando de un solo idioma (`yarn build --locale zh-Hans` para chino, `yarn build --locale pt` para portugués, etc.).

## Despliegue en Cloudflare Pages

Primero 👉 [Haz un fork de este proyecto](https://github.com/rockbenben/ChatGPT-Shortcut/fork), luego despliega:

1. Inicia sesión en [Cloudflare Pages](https://pages.cloudflare.com/) y elige **Create a project**
2. Conecta el repositorio que acabas de forkear
3. Configura la construcción:
   - **Build command**: `yarn build --locale zh-Hans` (cambia el locale por el idioma que quieras desplegar, p. ej. `yarn build --locale pt` para portugués)
   - **Output directory**: `build`
4. Haz clic en **Deploy** y espera a que Cloudflare Pages termine de construir

Cada push posterior activa automáticamente una construcción y un despliegue.

## Despliegue con Docker

Despliegue en una sola línea:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

O con `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
