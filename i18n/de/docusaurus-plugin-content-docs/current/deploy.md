# Bereitstellen

AI Short ist ein Open-Source-Projekt. Sie können den Namen und die Beschreibung der Website frei ändern.

- Um den Seitennamen zu ändern, bearbeiten Sie die Datei `docusaurus.config.js`.
- Um die Anweisungen zu ändern, gehen Sie in das Verzeichnis `docs`.
- Um die Eingabeaufforderungswörter zu ändern, finden Sie sie in `src/data/prompt.json`. Wenn Sie nur eine einzige Sprache ändern müssen, z. B. Chinesisch, können Sie `src/data/prompt_zh.json` direkt bearbeiten.
- Derzeit ist das Benutzer-Backend mit einem gemeinsamen Backend-System verbunden. Bei Bedarf können Sie Ihr eigenes Backend erstellen. Die entsprechende Schnittstelle befindet sich in der Datei `src/api.js`.

`CodeUpdateHandler.py` ist ein Skript zur Stapelverarbeitung der Bereitstellung in mehreren Sprachen. Führen Sie nach Abschluss der Änderung `python CodeUpdateHandler.py` aus, wodurch `prompt.json` gemäß den Regeln in mehrere Sprachen aufgeteilt wird und der Hauptseitencode jeder Sprache und der unabhängige Seitencode der ausgewählten Eingabeaufforderungswörter synchronisiert werden.

## Bereitstellungsanweisungen

Systemanforderungen:

- [Node.js 18.0](https://nodejs.org/) oder neuer.
- macOS, Windows (einschließlich WSL) und Linux werden unterstützt.

### Lokale Bereitstellung

Stelle sicher, dass du [Node.js](https://nodejs.org/) installiert hast.

```shell
# Installation
yarn

# Lokale Entwicklung
yarn start

# Build: Dieser Befehl generiert statische Inhalte im Verzeichnis `build`
yarn build

# Aktualisiere das `defaultLocale` in der Datei `docusaurus.config.js` und führe dann einen Build für die gewünschte Sprache durch.
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

# Bereitstellung für mehrere Sprachen
yarn build --locale zh && yarn build --locale en
```

### Vercel Bereitstellung

Klicke auf den untenstehenden Button, um ChatGPT-Shortcut mit einem Klick auf der Vercel-Plattform bereitzustellen:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Hinweis**: Die kostenlose Version von Vercel kann aufgrund unzureichendem Speicher fehlerhaft sein. In diesem Fall kannst du die Bereitstellung auf eine einzelne Sprache beschränken. Die genauen Schritte sind wie folgt:

1. Gehe zum gerade bereitgestellten Vercel-Projekt und öffne **Settings**.
2. Im Abschnitt **Build & Deployment** finde **Build Command** und klicke dann auf **Override** auf der rechten Seite.
3. Ändere den Bereitstellungsbefehl. Zum Beispiel, wenn du die chinesische Version bereitstellen möchtest, verwende `yarn build --locale zh`; für die portugiesische Version verwende `yarn build --locale pt`.

## Cloudflare Pages Bereitstellung

Klicke auf den untenstehenden Button oder Link, um dieses Projekt zu forken und folge dann den Anweisungen zur Bereitstellung auf Cloudflare Pages:

👉 [Fork dieses Projekts](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Bereitstellungsschritte:

1. Melde dich bei [Cloudflare Pages](https://pages.cloudflare.com/) an und wähle **"Create a project"**.
2. Verknüpfe das gerade geforkte Repository.
3. Konfiguriere den Build-Befehl:
   - **Build-Befehl**: `yarn build --locale zh` (wähle die entsprechende locale basierend auf der zu deployenden Sprache; für Portugiesisch verwende `yarn build --locale pt`).
   - **Ausgabeverzeichnis**: `build`.
4. Klicke auf **Deploy** und warte, bis Cloudflare Pages den Build- und Bereitstellungsprozess abgeschlossen hat.

Cloudflare Pages wird automatisch einen Build und eine Bereitstellung auslösen, jedes Mal wenn du neuen Code pusht.

### Docker-Bereitstellung

Wenn Sie mit Docker vertraut sind, können Sie schnell mit dem folgenden Befehl bereitstellen:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativ können Sie `docker-compose` verwenden:

```yml
version: "3.8"

services:
docsify:
container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: unless-stopped
```

## Synchronisierte Updates

Wenn Sie Ihr eigenes Projekt mit einem einzigen Klick auf Vercel bereitgestellt haben, kann es sein, dass Updates durchgängig angezeigt werden. Dies liegt daran, dass Vercel standardmäßig ein neues Projekt für Sie erstellt, anstatt das aktuelle Projekt zu verzweigen, wodurch die ordnungsgemäße Update-Erkennung behindert wird. Es wird empfohlen, die folgenden Schritte zur erneuten Bereitstellung durchzuführen:

1. Entfernen Sie das vorherige Repository.
2. Verwenden Sie die Schaltfläche „Fork“ in der oberen rechten Ecke der Seite, um das aktuelle Projekt zu forken.
3. Wählen Sie auf der [Vercel-Seite „Neues Projekt“](https://vercel.com/new) das kürzlich geforkte Projekt aus dem Abschnitt „Git-Repository importieren“ aus und fahren Sie mit der Bereitstellung fort.

### Automatische Updates

> Falls während der Ausführung von Upstream Sync ein Fehler auftritt, führen Sie manuell einen einzelnen Sync Fork durch.

Nachdem Sie das Projekt geforkt haben, müssen Sie aufgrund von GitHub-Einschränkungen Workflows auf der Seite „Aktionen“ Ihres geforkten Projekts manuell aktivieren und die Upstream Sync-Aktion aktivieren. Nach der Aktivierung werden täglich automatisch Updates ausgeführt.

![Automatische Updates](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Automatische Updates aktivieren](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manuelle Updates

Wenn Sie sofort manuell aktualisieren möchten, können Sie in der [GitHub-Dokumentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) nachlesen, wie Sie das gegabelte Projekt mit dem Upstream-Code synchronisieren.

Zeigen Sie Ihre Unterstützung für dieses Projekt, indem Sie ihm einen Stern geben/es folgen oder indem Sie dem Autor folgen, um über zeitnahe Benachrichtigungen zu neuen Funktionsupdates informiert zu bleiben.
