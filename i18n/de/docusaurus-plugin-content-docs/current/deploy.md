# Bereitstellung

## Bereitstellung mit Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Installation

```shell
# Installation
yarn

# Lokale Entwicklung
yarn start

# Build: Dieser Befehl generiert statischen Inhalt im Verzeichnis "build"
yarn build
```

## Synchronisierte Updates

Wenn Sie Ihr eigenes Projekt mit einem einzigen Klick auf Vercel bereitgestellt haben, kann es vorkommen, dass Updates konsistent angezeigt werden. Dies liegt an Vercels Standardverhalten, ein neues Projekt für Sie zu erstellen, anstatt das aktuelle Projekt zu forken, was eine ordnungsgemäße Erkennung von Updates behindert. Es wird empfohlen, die folgenden Schritte für die erneute Bereitstellung zu befolgen:

1. Entfernen Sie das vorherige Repository.
2. Verwenden Sie die Schaltfläche "Fork" in der oberen rechten Ecke der Seite, um das aktuelle Projekt zu forken.
3. Wählen Sie auf der [Vercel-New-Project-Seite](https://vercel.com/new) das kürzlich geforkte Projekt im Abschnitt "Import Git Repository" aus und fahren Sie mit der Bereitstellung fort.

### Automatische Updates

> Wenn bei der Ausführung von Upstream Sync ein Fehler auftritt, führen Sie manuell eine einzelne Sync Fork aus.

Sobald Sie das Projekt geforkt haben, ist es aufgrund von GitHub-Einschränkungen erforderlich, Workflows manuell auf der Actions-Seite Ihres geforkten Projekts zu aktivieren und die Upstream-Sync-Aktion zu aktivieren. Nach der Aktivierung werden Updates automatisch täglich durchgeführt.

![Automatische Updates](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Aktivieren der automatischen Updates](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manuelle Updates

Wenn Sie sofort ein manuelles Update durchführen möchten, können Sie sich in der [Dokumentation von GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) darüber informieren, wie Sie das geforkte Projekt mit dem Upstream-Code synchronisieren.

Zeigen Sie gerne Ihre Unterstützung für dieses Projekt, indem Sie ihm einen Stern/Follow geben oder dem Autor folgen, um rechtzeitig über neue Funktionsupdates informiert zu werden.
