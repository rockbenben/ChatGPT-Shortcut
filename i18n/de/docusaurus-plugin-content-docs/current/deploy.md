---
sidebar_label: Bereitstellung
title: Bereitstellungs- & Anpassungsanleitung | AI Short einfach konfigurieren
description: Erfahren Sie, wie Sie Ihr AI Short-Projekt schnell bereitstellen und anpassen können. Diese Anleitung behandelt Vercel, Cloudflare, Docker und die lokale Bereitstellung sowie das Bearbeiten von Inhalten und das Aktivieren von automatischen Updates.
---

# Projektbereitstellung

## Konfiguration & Anpassung

AI Short ist ein Open-Source-Projekt, und Sie können den Titel, die Beschreibung, die Prompts und mehr der Website frei ändern. Nachfolgend finden Sie gängige Anpassungsoptionen:

- **Seitentitel und Beschreibung bearbeiten**  
    Aktualisieren Sie die Datei `docusaurus.config.js`.

- **Nutzungsanweisungen und Dokumentation bearbeiten**  
    Alle Dokumentationsdateien befinden sich im Verzeichnis `docs`. Öffnen und ändern Sie die entsprechende Datei nach Bedarf.

- **Startseiten-Prompts bearbeiten**  
    Die Prompts der Startseite sind in `src/data/prompt.json` gespeichert.  
    Für bestimmte Sprachen (z. B. Chinesisch) bearbeiten Sie `src/data/prompt_zh.json`.  
    Beispielformat für einen neuen Prompt:

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

**Hinweis**: Verwenden Sie `id >= 500` für neue Prompts. Diese werden keine eigenen Seiten oder Kommentare haben.
Wenn Sie eine eigene Seite wünschen, kopieren Sie eine Vorlagendatei aus `src/data/pages/prompt` und ändern Sie sie.

- **Benutzerdefiniertes Backend**
    Das Projekt ist derzeit mit einem gemeinsam genutzten Backend verknüpft.
    Um Ihr eigenes einzurichten, überprüfen Sie die API-Details in `src/api.js`.

- **Mehrsprachige Unterstützung**
    Nachdem Sie die Sprachdateien aktualisiert haben, führen Sie das Skript `CodeUpdateHandler.py` zur Stapelverarbeitung aus:

`bash
  python CodeUpdateHandler.py
  `

Dieses Skript teilt `prompt.json` auf und synchronisiert die Updates mit den Haupt- und vorgestellten Prompt-Seiten jeder Sprache.

## Bereitstellungsanleitung

**Systemanforderungen**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (einschließlich WSL) oder Linux

### Lokale Bereitstellung

Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) installiert haben.

```bash
# Abhängigkeiten installieren
yarn

# Lokale Entwicklung
yarn start

# Statische Dateien erstellen
yarn build

# Für mehrere Sprachen erstellen
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

# Beispiel: für zwei Sprachen erstellen
yarn build --locale zh && yarn build --locale en
```

### Vercel-Bereitstellung

Klicken Sie unten, um ChatGPT-Shortcut mit einem Klick auf Vercel bereitzustellen:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Hinweis**: Der kostenlose Vercel-Plan kann an seine Speichergrenzen stoßen. In diesem Fall stellen Sie nur eine einzelne Sprache bereit.

Schritte:

1.  Gehen Sie zu Ihrem bereitgestellten Vercel-Projekt → **Settings**.
2.  Unter **Build & Deployment** finden Sie **Build Command** → klicken Sie auf **Override**.
3.  Legen Sie den Build-Befehl fest, z.B.:

- Für Chinesisch: `yarn build --locale zh`
   - Für Portugiesisch: `yarn build --locale pt`

### Cloudflare Pages-Bereitstellung

👉 [Forken Sie das Repo](https://github.com/rockbenben/ChatGPT-Shortcut/fork) und stellen Sie es dann über Cloudflare Pages bereit:

1.  Melden Sie sich bei [Cloudflare Pages](https://pages.cloudflare.com/) an und wählen Sie **Create a project**.
2.  Verbinden Sie Ihr geforktes Repo.
3.  Konfigurieren Sie die Build-Einstellungen:

- **Build command**: `yarn build --locale zh` (oder eine andere Sprache)
   - **Output directory**: `build`

4.  Stellen Sie bereit und warten Sie, bis der Build abgeschlossen ist.

Cloudflare Pages wird automatisch neu bereitgestellt, wenn Sie neue Commits pushen.

### Docker-Bereitstellung

Mit Docker ausführen:

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

## Automatische Updates aktivieren

Wenn Sie die Ein-Klick-Bereitstellung von Vercel verwendet haben, sehen Sie möglicherweise häufig „Updates verfügbar“.
Dies liegt daran, dass Vercel ein neues Repo anstelle eines Forks erstellt, was die Synchronisierung unterbricht.

**Lösung:**

1.  Löschen Sie das alte Repo.
2.  Forken Sie dieses Projekt direkt (verwenden Sie die Fork-Schaltfläche).
3.  Stellen Sie es von Ihrem Fork aus über die [Vercel-Seite für neue Projekte](https://vercel.com/new) erneut bereit.

### Automatische Updates

> Wenn Fehler bei **Upstream Sync** auftreten, führen Sie **Sync Fork** einmal manuell aus.

Nach dem Forken müssen Sie bei GitHub die Workflows manuell aktivieren:

- Gehen Sie zu **Actions** in Ihrem Fork
- Aktivieren Sie die Workflows, insbesondere **Upstream Sync Action**.

Dadurch werden täglich Updates vom Upstream-Repo abgerufen.

### Manuelle Updates

Für sofortige Updates lesen Sie die [GitHub-Dokumentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) zum Synchronisieren von Forks.

⭐ Markieren / 👀 Beobachten Sie dieses Projekt oder folgen Sie dem Autor, um über neue Funktionen benachrichtigt zu werden.
