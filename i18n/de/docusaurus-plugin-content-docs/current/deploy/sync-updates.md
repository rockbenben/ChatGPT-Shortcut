---
sidebar_label: Fork synchron halten
title: AI Short Synchron halten | Fork folgt automatisch dem Upstream
description: Lassen Sie Ihren AI Short Fork automatisch dem Upstream folgen — beheben Sie das Problem, dass Vercel-Bereitstellungen keine Updates anzeigen, und aktivieren Sie die automatische GitHub-Actions-Synchronisierung.
---

# Fork synchron halten

Eine Ein-Klick-Vercel-Bereitstellung zeigt möglicherweise dauerhaft eine Meldung „Update verfügbar" — weil Vercel ein neues Projekt erstellt statt eines Forks, sodass Upstream-Updates nicht erkannt werden können. Um dies zu beheben:

1. Löschen Sie das ursprüngliche Repository
2. Verwenden Sie die **Fork**-Schaltfläche oben rechts auf der Seite, um dieses Projekt zu forken
3. Wählen Sie auf der [Vercel-Seite für neue Projekte](https://vercel.com/new) das geforkte Repository unter Import Git Repository aus und stellen Sie es bereit

## Automatische Aktualisierung aktivieren

> Wenn ein Upstream Sync-Fehler auftritt, führen Sie Sync Fork einmalig manuell aus!

Nach dem Forken aktivieren Sie Workflows manuell auf der Actions-Seite und führen die Upstream Sync-Aktion einmalig aus. Sobald aktiviert, synchronisiert sich das Projekt täglich automatisch:

![Automatische Aktualisierung](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Automatische Aktualisierung aktivieren](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Manuelle Aktualisierung

Möchten Sie sofort manuell aktualisieren? Lesen Sie die [GitHub-Dokumentation zur Fork-Synchronisierung](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Sie können dieses Projekt mit einem Stern markieren / beobachten, um über neue Funktionen benachrichtigt zu werden.
