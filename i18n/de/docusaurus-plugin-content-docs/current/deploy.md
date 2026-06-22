---
sidebar_label: Bereitstellung
title: AI Short Bereitstellung - Vercel & Docker
description: Einfache Bereitstellung Ihrer Prompt-Bibliothek. Anleitungen für Vercel, Docker und automatische Updates.
---

# Projektbereitstellung

> **Für wen ist das gedacht**: Entwickler, die AiShort selbst hosten oder anpassen möchten. Normale Nutzer können einfach [aishort.top](https://www.aishort.top) verwenden — dieser Abschnitt ist für Sie nicht relevant.

## Bereitstellungsmodell wählen

Wählen Sie das Modell, das Ihren Anforderungen entspricht:

| Modell                            | Backend                                          | Hinweise                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard** (Standard)           | Nutzt das offizielle gemeinsame Backend          | Nach dem Forken können Sie Sitename, Beschreibung, Prompts usw. anpassen (siehe [Konfiguration](./deploy/configuration)); Login, Favoriten, Community und Synchronisierung funktionieren sofort |
| **Offline-Edition**               | Kein Backend, Daten lokal im Browser gespeichert | Für abgeschirmte Unternehmens- oder Behördennetzwerke; kein Konto erforderlich                                                                                                                    |
| **Vollständig selbst gehostetes Backend** | Eigenes unabhängiges Backend              | Wenn Sie ein unabhängiges Kontosystem, vollständige Datenkontrolle und eine private Community benötigen                                                                                           |

Die ersten beiden werden in diesem Leitfaden behandelt. Für das dritte Modell ist der Backend-Dienst nicht Open Source — bitte [schreiben Sie dem Entwickler eine E-Mail](mailto:qingwhat@gmail.com) mit einer kurzen Beschreibung Ihres Anwendungsfalls und der erwarteten Größenordnung, um einen Bereitstellungsplan und Unterstützung zu erhalten.

## Bereitstellungsdokumentation

Aufgeteilt nach Bereitstellungsablauf in die folgenden Abschnitte — lesen Sie nach Bedarf:

- **[Standard-Bereitstellung](./deploy/standard)** — Nutzt das offizielle gemeinsame Backend, unterstützt lokalen Build, Vercel, Cloudflare Pages und Docker.
- **[Offline-Bereitstellung](./deploy/offline)** — Offline-Lösung für abgeschirmte Unternehmens- oder Behördennetzwerke, ohne Backend und ohne Konto.
- **[Konfiguration und Anpassung](./deploy/configuration)** — Ändern von Site-Titel, Beschreibung und Prompts sowie Anbindung eines benutzerdefinierten Backends.
- **[Fork synchron halten](./deploy/sync-updates)** — Lassen Sie Ihren Fork automatisch dem Upstream folgen, um nicht zurückzufallen.
