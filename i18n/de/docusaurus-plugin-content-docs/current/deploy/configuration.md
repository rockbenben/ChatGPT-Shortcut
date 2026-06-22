---
sidebar_label: Konfiguration und Anpassung
title: AI Short Konfiguration und Anpassung | Titel, Prompts und benutzerdefiniertes Backend ändern
description: AI Short anpassen — Site-Titel und Beschreibung ändern, Startseiten-Prompts hinzufügen, ein benutzerdefiniertes Backend anbinden, inklusive Erläuterung der API-Modulstruktur und des Caching-Mechanismus.
---

# Konfiguration und Anpassung

AI Short ist Open Source — Sie können den Site-Titel, die Beschreibung, Prompts und vieles mehr frei anpassen.

## Site-Titel und -Beschreibung

Bearbeiten Sie `docusaurus.config.js`.

## Dokumentation und Anleitungen

Bearbeiten Sie die entsprechenden Dateien unter `docs/`.

## Startseiten-Prompts

Die Quelldaten befinden sich in `src/data/prompt.json` — ein Array, bei dem jedes Objekt alle Sprachversionen nach Sprachcode (`zh` / `en` / `ja` usw.) gespeichert hat. Das Format zum Hinzufügen eines Prompts:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
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

Nach dem Bearbeiten führen Sie `python CodeUpdateHandler.py` aus. Das Skript teilt `prompt.json` in sprachspezifische `prompt_<locale>.json`-Dateien auf und aktualisiert die Startseite und die kuratierten Prompt-Seiten jeder Sprache.

![Datenpipeline: Die zentrale prompt.json wird von python CodeUpdateHandler.py verarbeitet — nach Sprache in sprachspezifische Prompt-Dateien aufgeteilt, wobei für jede ID die Karten-JSON und die Detailseite generiert werden, mit OpenCC-Konvertierung von vereinfachtem zu traditionellem Chinesisch.](/img/docs/data-pipeline.svg)

> **Hinweis**: Setzen Sie `id` auf 500 oder höher, um ID-Kollisionen mit bestehenden Prompts oder Community-Inhalten zu vermeiden. Beim Ausführen von `python CodeUpdateHandler.py` werden für jeden Prompt (auch die neu hinzugefügten) automatisch die Kartendaten und die Detailseite generiert — Sie müssen keine Seitendateien manuell anlegen; benutzerdefinierte Prompts haben standardmäßig lediglich keine kuratierte Meta-Beschreibung und keine Kommentardaten.

## Benutzerdefiniertes Backend

Standardmäßig verbindet sich das Projekt mit einem gemeinsamen Backend (Login, Favoriten, Community, Kommentare und geräteübergreifende Synchronisierung hängen davon ab), und `src/api` dokumentiert den vollständigen Schnittstellenvertrag als Referenz. Der Backend-Dienst selbst ist nicht Open Source; für eine **vollständig selbst gehostete Bereitstellung mit eigenem Backend** siehe [Bereitstellungsmodell wählen](../deploy#bereitstellungsmodell-wählen) oben.

API-Modulstruktur:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Caching: API-Daten werden intelligent über `lscache` und ETag zwischengespeichert — wenn der Server 304 Not Modified zurückgibt, wird der lokale Cache wiederverwendet, um die Datenübertragung zu reduzieren.
