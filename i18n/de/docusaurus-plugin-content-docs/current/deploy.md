---
sidebar_label: Bereitstellung
title: AI Short Bereitstellung - Vercel & Docker
description: Einfache Bereitstellung Ihrer Prompt-Bibliothek. Anleitungen für Vercel, Docker und automatische Updates.
---

# Projektbereitstellung

## Konfiguration und Anpassung

AI Short ist ein Open-Source-Projekt, das es Ihnen ermöglicht, den Website-Titel, die Beschreibung, Prompts und andere Inhalte frei nach Ihren Bedürfnissen zu ändern. Im Folgenden finden Sie gängige Änderungsoptionen und Bedienungsanleitungen:

- **Website-Titel und -Beschreibung ändern**
  Um den Titel und die Beschreibung der Website zu ändern, bearbeiten Sie bitte die Konfigurationsdatei `docusaurus.config.js`.

- **Projektnutzungsanweisungen und -einführung ändern**
  Die Nutzungsanweisungen und Einführungsdateien des Projekts befinden sich im Verzeichnis `docs`. Öffnen Sie die entsprechenden Dateien in diesem Verzeichnis, um notwendige Änderungen vorzunehmen.

- **Startseiten-Prompts ändern**
  Startseiten-Prompts werden in der Datei `src/data/prompt.json` gespeichert. Wenn Sie Prompts für eine bestimmte Sprache, wie z.B. Chinesisch, ändern müssen, können Sie die Datei `src/data/prompt_es.json` direkt bearbeiten. Beim Hinzufügen eines neuen Prompts ist das Format wie folgt:

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

  **Hinweis**: Es wird empfohlen, die `id` auf 500 oder höher zu setzen. Neu hinzugefügte Prompts haben keine eigene Seite und keinen Kommentarbereich. Wenn Sie eine eigene Seite für einen Prompt hinzufügen müssen, können Sie die Vorlagendatei im Verzeichnis `src/data/pages/prompt` kopieren, um sie zu ändern.

- **Benutzerdefiniertes Backend**
  Das aktuelle Projekt ist mit einem gemeinsamen Backend-System verbunden. Wenn Sie Ihr eigenes Backend erstellen möchten, können Sie die Schnittstellenbeschreibungen im Ordner `src/api` konsultieren.

  API-Modulstruktur:

  ```
  src/api/
  ├── index.ts       # Einheitlicher Export-Eingang
  ├── config.ts      # API-URL-Konfiguration
  ├── client.ts      # Axios-Client (einschließlich Authentifizierungs-Interzeptoren)
  ├── auth.ts        # Authentifizierungs-API (Login/Registrierung/OAuth)
  ├── prompts.ts     # Prompt-CRUD + Suche + Abstimmung
  ├── favorites.ts   # Favoriten-Operationen
  ├── myspace.ts     # Mein Bereich-Daten (Kern-Datenquelle)
  ├── comments.ts    # Kommentarsystem
  └── user.ts        # Benutzerinformationen
  ```

  **Cache-Mechanismus**: Das Projekt verwendet `lscache` in Kombination mit ETags, um intelligentes Caching zu implementieren. Wenn der Server 304 Not Modified zurückgibt, werden lokale Cache-Daten direkt wiederverwendet, um die Datenübertragung zu reduzieren.

- **Mehrsprachige Unterstützung und Bereitstellung**
  Nach Abschluss der mehrsprachigen Änderungen können Sie das Skript `CodeUpdateHandler.py` für die Stapelverarbeitung verwenden. Führen Sie den folgenden Befehl aus:

  ```bash
  python CodeUpdateHandler.py
  ```

  Dieses Skript teilt die Datei `prompt.json` gemäß voreingestellten Regeln auf und aktualisiert synchron die Hauptseite und die vorgestellten Prompt-Seiten für jede Sprachversion.

## Offline-Bereitstellung (Intranet)

Fuer Firmen-Intranets, Behoerdennetzwerke oder Umgebungen ohne externen Netzwerkzugang bietet AI Short eine spezielle Offline-Version. Kein Backend-Server oder Benutzerregistrierung erforderlich. Bereitstellung mit einem einzigen Docker-Befehl:

```bash
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline
```

Fuer vollstaendige Details einschliesslich Quellcode-Builds, Datenimport/-export und Teamnutzung, siehe den Leitfaden zur [Offline-Version](./guides/offline).

## Bereitstellungsanweisungen

Systemanforderungen:

- [Node.js 20.0](https://nodejs.org/) oder später.
- macOS, Windows (einschließlich WSL) und Linux werden unterstützt.

### Lokale Bereitstellung

Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) installiert haben.

```shell
# Installation
yarn

# Lokale Entwicklung
yarn start

# Build: Dieser Befehl generiert statischen Inhalt im Verzeichnis `build`
yarn build

# Aktualisieren Sie das `defaultLocale` in der Datei `docusaurus.config.js` und führen Sie dann einen Build für die gewünschte Sprache durch.
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

# Bereitstellung für mehrere Sprachen
yarn build --locale zh-Hans && yarn build --locale en
```

### Vercel-Bereitstellung

Klicken Sie auf die Schaltfläche unten, um ChatGPT-Shortcut mit einem Klick auf der Vercel-Plattform bereitzustellen:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Hinweis**: Die kostenlose Version von Vercel kann aufgrund unzureichenden Speichers einen Fehler melden. Wenn Sie auf diese Situation stoßen, können Sie eine Bereitstellung in einer einzelnen Sprache wählen. Die spezifischen Operationen sind wie folgt:

1. Betreten Sie das Vercel-Projekt, das Sie gerade bereitgestellt haben, und öffnen Sie **Settings**.
2. Finden Sie im Abschnitt **Build & Deployment** den **Build Command** und klicken Sie rechts auf **Override**.
3. Ändern Sie den Bereitstellungsbefehl. Wenn Sie beispielsweise die chinesische Version bereitstellen müssen, können Sie `yarn build --locale zh-Hans` verwenden; wenn Sie die portugiesische Version bereitstellen müssen, verwenden Sie `yarn build --locale pt`.

### Cloudflare Pages Bereitstellung

Klicken Sie auf die Schaltfläche oder den Link unten, um dieses Projekt zu forken, und folgen Sie dann den Anweisungen zur Bereitstellung auf Cloudflare Pages:

👉 [Dieses Projekt forken](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Bereitstellungsschritte:

1. Melden Sie sich bei [Cloudflare Pages](https://pages.cloudflare.com/) an und wählen Sie **"Create a project"**.
2. Binden Sie das Repository, das Sie gerade geforkt haben.
3. Konfigurieren Sie die Build-Befehle:
   - **Build command**: `yarn build --locale zh-Hans` (Wählen Sie das entsprechende Locale basierend auf der bereitzustellenden Sprache, z.B. für Portugiesisch verwenden Sie `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Klicken Sie auf **Deploy** und warten Sie, bis Cloudflare Pages den Build und die Bereitstellung abgeschlossen hat.

Cloudflare Pages löst auch automatisch Builds und Bereitstellungen aus, wann immer Sie neuen Code pushen.

### Docker-Bereitstellung

Wenn Sie mit Docker vertraut sind, können Sie mit folgendem Befehl schnell bereitstellen:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativ können Sie auch `docker-compose` verwenden:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Synchronisierte Updates aktivieren

Wenn Sie Ihr eigenes Projekt auf Vercel mit einem Klick bereitgestellt haben, kann es vorkommen, dass immer angezeigt wird, dass Updates verfügbar sind. Dies liegt daran, dass Vercel standardmäßig ein neues Projekt für Sie erstellt, anstatt dieses Projekt zu forken, was dazu führt, dass die Update-Erkennung fehlschlägt. Es wird empfohlen, gemäß den folgenden Schritten neu bereitzustellen:

1. Löschen Sie das ursprüngliche Repository;
2. Verwenden Sie die Fork-Schaltfläche in der oberen rechten Ecke der Seite, um dieses Projekt zu forken;
3. Wählen Sie das Projekt, das Sie gerade geforkt haben, im Abschnitt Import Git Repository der [Vercel Neues Projekt Seite](https://vercel.com/new) erneut aus und stellen Sie es bereit.

### Automatische Aktualisierung einschalten

> Wenn ein Upstream Sync-Ausführungsfehler auftritt, führen Sie bitte einmalig Sync Fork manuell aus!

Nach dem Forken des Projekts müssen Sie aufgrund von GitHub-Beschränkungen die Workflows manuell auf der Actions-Seite Ihres geforkten Projekts aktivieren und die Upstream Sync Action aktivieren. Sobald aktiviert, werden Updates jeden Tag automatisch ausgeführt:

![Automatische Aktualisierung](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Automatische Aktualisierung aktivieren](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manuelle Code-Aktualisierung

Wenn Sie sofort manuell aktualisieren möchten, können Sie die [GitHub-Dokumentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) konsultieren, um zu erfahren, wie Sie ein geforktes Projekt mit dem ursprünglichen Code synchronisieren.

Sie können dieses Projekt mit einem Stern (star) versehen/beobachten (watch) oder dem Autor folgen, um rechtzeitig Benachrichtigungen über neue Funktionsupdates zu erhalten.
