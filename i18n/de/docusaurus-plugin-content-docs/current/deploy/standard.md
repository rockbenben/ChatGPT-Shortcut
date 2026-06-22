---
sidebar_label: Standard-Bereitstellung
title: AI Short Standard-Bereitstellung | Lokaler Build, Vercel, Cloudflare, Docker
description: Anleitung zur Standard-Bereitstellung von AI Short — nutzt das offizielle gemeinsame Backend, unterstützt lokalen Build, Ein-Klick-Deployment auf Vercel, Cloudflare Pages und Docker, sofort einsatzbereit.
---

# Standard-Bereitstellung

Nutzt das offizielle gemeinsame Backend und funktioniert sofort nach dem Forken. Forken Sie das Projekt zuerst und stellen Sie es dann mit einer der folgenden Methoden bereit.

**Voraussetzungen**: [Node.js 20.0](https://nodejs.org/) oder höher, auf macOS, Windows (einschließlich WSL) oder Linux.

![Topologie der Standard-Bereitstellung: Nach dem Forken erfolgt die Bereitstellung per lokalem Build, über Vercel, Cloudflare Pages oder Docker — alle nutzen dasselbe offizielle gemeinsame Backend (Anmeldung, Sammlungen, Community, Kommentare, geräteübergreifende Synchronisierung).](/img/docs/standard-deploy-topology.svg)

## Lokaler Build

```shell
# Abhängigkeiten installieren
yarn

# Lokale Entwicklung
yarn start

# Build: Gibt statische Dateien in das Build-Verzeichnis aus, verwendet das defaultLocale in scripts/i18nLocales.mjs
yarn build
```

> **Nur bestimmte Sprachen bauen**: Verwenden Sie `yarn build --locale <locale>` (z. B. `zh-Hans`, `en`, `ja` … die vollständige Locale-Liste finden Sie in `scripts/i18nLocales.mjs`). Mehrere kombinieren: `yarn build --locale zh-Hans && yarn build --locale en`.

## Vercel-Bereitstellung

Klicken Sie auf die Schaltfläche unten für eine Ein-Klick-Bereitstellung auf Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Hinweis**: Das kostenlose Kontingent von Vercel kann aufgrund von Speicherlimits fehlschlagen. Stellen Sie stattdessen eine einzelne Sprache bereit — gehen Sie zu den **Einstellungen → Build & Deployment → Build Command** des Projekts, klicken Sie auf **Override** und setzen Sie einen einzelsprachigen Befehl (`yarn build --locale zh-Hans` für Chinesisch, `yarn build --locale pt` für Portugiesisch usw.).

## Cloudflare Pages Bereitstellung

Zuerst 👉 [Dieses Projekt forken](https://github.com/rockbenben/ChatGPT-Shortcut/fork), dann bereitstellen:

1. Melden Sie sich bei [Cloudflare Pages](https://pages.cloudflare.com/) an und wählen Sie **Create a project**
2. Verbinden Sie das Repository, das Sie gerade geforkt haben
3. Konfigurieren Sie den Build:
   - **Build command**: `yarn build --locale zh-Hans` (ersetzen Sie das Locale durch die gewünschte Sprache, z. B. `yarn build --locale pt` für Portugiesisch)
   - **Output directory**: `build`
4. Klicken Sie auf **Deploy** und warten Sie, bis Cloudflare Pages den Build abgeschlossen hat

Jeder spätere Push löst automatisch einen Build und eine Bereitstellung aus.

## Docker-Bereitstellung

Einzeilige Bereitstellung:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Oder mit `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
