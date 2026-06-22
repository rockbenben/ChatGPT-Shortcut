---
sidebar_label: Häufig gestellte Fragen
title: "AI Short FAQ | Nutzung, Optimierung, kommerzielle Nutzung & Datenschutz"
description: "Ist AiShort kostenlos? Sind Prompts modellübergreifend? Kommerzielle Nutzung erlaubt? Dieser Leitfaden beantwortet 13 häufige Fragen zu Nutzung, Optimierung, kommerzieller Nutzung und Datenschutz."
---

# Häufig gestellte Fragen

## Ist AiShort ein KI-Prompt-Generator?

Nein. AiShort ist eine **kuratierte und manuell zusammengestellte** Prompt-Bibliothek mit szenariobasierten Vorlagen — kein Tool, das mit einem LLM automatisch Prompts erzeugt. Jeder Prompt wird ausgewählt, mit Tags versehen und lässt sich per Klick kopieren und in jedes beliebige KI-Chat-Tool einfügen (ChatGPT, Claude, Gemini, DeepSeek usw.). Wenn Sie ein Tool suchen, das „aus einer Anforderung automatisch einen Prompt generiert", sind PromptPerfect oder ChatGPT-Prompt-Generatoren eine andere Produktkategorie.

## Ist AiShort kostenlos? Brauche ich einen API-Key?

Vollständig kostenlos, **kein API-Key, keine Registrierung erforderlich**. Browsen, Suchen und Kopieren von Prompts benötigt keinerlei Konto.

Nach der Registrierung schalten Sie Erweiterungen frei wie Favoriten mit Drag-and-Drop-Sortierung, benutzerdefinierte Tags, Erstellung und Verwaltung privater Prompts, Community-Sharing mit Abstimmungen, JSON-Datenexport und geräteübergreifende Synchronisation — ebenfalls kostenlos. Der gesamte Code ist auf [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut) Open Source.

Hinweis: AiShort stellt nur die Prompts bereit. **Ob der Aufruf des KI-Modells selbst kostenpflichtig ist, hängt vom verwendeten KI-Dienst ab** (z. B. ChatGPT Kostenlos/Plus, API-Abrechnung usw.).

## Wie viele Prompts? Welche Szenarien werden abgedeckt?

AiShort beherbergt **insgesamt 5000+ Prompts**, in zwei Bibliotheken organisiert:

- **Kuratierte Bibliothek** —— handverlesen, nach 25+ Szenario-Tags klassifiziert, vollständig in 18 Sprachen übersetzt. Tags: Schreibhilfe, IT/Programmierung, Artikel/Berichte, SEO/Marketing, Unternehmensfunktionen, Akademiker/Lehrer, Bildung/Schüler, Sprache/Übersetzung, Psychologie/Soziales, Denktraining, Produktivitätswerkzeuge, Terminal/Interpreter, Debatte/Rede, Kritik/Bewertung, lustige Wissenschaft, Lebensenzyklopädie, medizinische Gesundheit, Finanzberater, Musik/Kunst, Philosophie/Religion, Text/Wörter, lustige Spiele, professioneller Berater usw.
- **[Community-Bibliothek](./community)** —— die überwiegende Mehrheit, kontinuierlich von Nutzern beigesteuert, nach Beliebtheit oder Neuheit sortierbar mit Volltextsuche; deckt feinere und breitere Szenarien ab als die kuratierte.

Was Sie in der kuratierten nicht finden, suchen Sie in der Community.

## Welche KI-Modelle werden unterstützt? Sind Prompts modellübergreifend nutzbar?

Die Prompts von AiShort sind universell und funktionieren **in jedem KI-Szenario, in dem Sie einen Prompt eingeben können** — nicht nur auf Chat-Seiten, sondern auch in Programmier-Tools wie Cursor, bei API-Aufrufen, in KI-Agenten und mehr. Gängige Chat-Modelle:

- International: ChatGPT, Gemini, Claude, Grok
- China: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, ChatGLM, iFLYTEK Spark, Tencent Yuanbao
- API-Plattformen: OpenRouter, SiliconFlow, Groq

Die vollständige Modellliste finden Sie unter [Erste Schritte → Gängige KI-Modelle](./getting-started#gängige-ki-modelle).

**Modellübergreifende Verwendbarkeit**: Die meisten textbasierten Prompts funktionieren modellübergreifend — bei allgemeinen Aufgaben wie Schreiben, Übersetzen, Programmieren und Frage-Antwort liefert derselbe Prompt auf allen gängigen großen Sprachmodellen brauchbare Ergebnisse, und AiShort-Prompts sind standardmäßig nicht an ein bestimmtes Modell gebunden. Die einzige Ausnahme sind Prompts für die Bildgenerierung (Midjourney / Stable Diffusion / DALL·E), die an die jeweilige Syntax des Tools angepasst werden müssen.

## Warum sind die Prompts auf Englisch?

KI-Modelle verstehen Englisch präziser und liefern konsistentere Ausgaben. Deutsche Prompts funktionieren ebenfalls, weichen aber bei wiederholten Ausführungen desselben Prompts stärker voneinander ab. Für wichtige Szenarien empfehlen wir englische Prompts.

> 💡 Sie möchten die Antwort auf Deutsch erhalten? Hängen Sie einfach `respond in German` an das Ende des Prompts an.

## Muss ich den Prompt jedes Mal eingeben?

**API-Nutzung**: Setzen Sie den Prompt als `system prompt` — er wirkt automatisch auf alle folgenden Konversationen.

**Web-Version**: Solange Sie die Konversation nicht wechseln, merkt sich ChatGPT den aktuellen Prompt. Wenn die Antworten abzudriften beginnen, hat das Modell den Prompt „vergessen" — fügen Sie ihn einfach erneut ein.

**Tipp**: Speichern Sie häufig genutzte Konversationen als Browser-Lesezeichen, dann öffnen Sie sie beim nächsten Mal direkt.

## Wie wähle ich den richtigen Prompt?

Suchen Sie rückwärts vom gewünschten Ergebnis: Für Artikel verwenden Sie das Tag [`write`](/?tags=write) oder [`article`](/?tags=article); für Code [`code`](/?tags=code) oder [`interpreter`](/?tags=interpreter); für Übersetzungen [`language`](/?tags=language); für Rollenspiele [`games`](/?tags=games); wenn Sie die Tags nicht kennen, durchsuchen Sie direkt mit Stichwörtern. Jede Prompt-Karte zeigt ihre Beliebtheit (Anzahl der Kopiervorgänge) — häufig kopierte Prompts liefern in der Regel zuverlässigere Ergebnisse.

## Warum finde ich keinen passenden Prompt?

Die Suche auf der Startseite umfasst die **kuratierte Prompt-Bibliothek** (nach der Anmeldung auch Ihre persönlichen Prompts), aber **keine** Community-Beiträge.

Wenn Sie mit kurzen Stichwörtern auf der Startseite nichts finden, suchen Sie noch einmal auf der Seite [Community-Prompts](./community) — dort gibt es mehr von Nutzern geteilte Inhalte.

## Was tun, wenn die KI falsche Informationen ausgibt?

KI kann „halluzinieren" und Informationen ausgeben, die plausibel erscheinen, aber falsch sind. Vorgehen:

1. **Schlüsselinformationen überprüfen**: Besonders Zahlen, Zitate, Code und Ähnliches
2. **Mehrrunden-Optimierung**: Bitten Sie die KI, ihre Antwort erneut zu überprüfen und zu verbessern
3. **Kreuzvalidierung**: Verwenden Sie verschiedene Prompts oder Modelle, um wichtige Schlussfolgerungen zu überprüfen

Geeignete Prompts können KI-Halluzinationen reduzieren.

## Der Prompt funktioniert nicht gut — wie justiere ich?

Wechseln Sie nicht sofort den Prompt — justieren Sie zuerst an folgenden Stellschrauben:

1. **Die eckigen Klammern `[Platzhalter]` konkreter machen** — fügen Sie Stil, Länge, Fachgebiet, Zielgruppe und ähnliche Details hinzu
2. **KI zur Optimierung auffordern**: Bei unbefriedigenden Antworten fragen Sie nach „Bitte ändern Sie das Ergebnis hinsichtlich X" oder „Bitte schreiben Sie das im Stil Y neu" — meist liefert die KI nach ein bis zwei Iterationen ein passendes Ergebnis; Sie können die KI auch ihre eigene Antwort bewerten und verbessern lassen
3. **Modell wechseln und vergleichen**: Probieren Sie denselben Prompt auf einem anderen Modell aus (Claude / ChatGPT / Gemini / DeepSeek usw.) — verschiedene Modelle haben je eigene Stärken, und die Ergebnisse können sich deutlich unterscheiden
4. **Community ausprobieren**: Unter [Community-Prompts](./community) finden Sie möglicherweise besser passende Versionen — und Sie sind willkommen, Ihre eigenen guten Prompts dort zu teilen
5. **Feedback geben**: Probleme oder Verbesserungsvorschläge? Hinterlassen Sie [Feedback](/feedback)

## Wie sichere ich meine Prompts?

1. Gehen Sie zu „Mein Konto" → suchen Sie den Bereich „Datenverwaltung → Prompts exportieren"
2. Klicken Sie auf die Schaltfläche „Daten exportieren"
3. Das System generiert automatisch eine JSON-Datei zum Herunterladen

Wir empfehlen, regelmäßig Backups zu erstellen, um Datenverlust zu vermeiden.

## Darf ich AiShort-Prompts kommerziell nutzen?

Ja, aber die Lizenzbedingungen unterscheiden sich je nach Quelle:

1. Inhalte aus [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) stehen unter **CC0 Public Domain** und unterliegen keinerlei Einschränkungen
2. Eigene Inhalte von AiShort sowie Community-Beiträge stehen standardmäßig unter der offenen Lizenz **CC BY-SA 4.0** — kommerzielle Nutzung, Weiterverbreitung und Bearbeitung sind erlaubt, sofern die Nennung von AiShort beziehungsweise der ursprünglichen Autoren erhalten bleibt und nachgelagerte Werke dieselbe offene Lizenz erhalten
3. Die Rechte an **mit dem Prompt generierten KI-Inhalten** richten sich nach den Nutzungsbedingungen Ihres KI-Anbieters (OpenAI, Anthropic, Google usw.) — in den meisten Fällen liegen sie bei Ihnen
4. Ausgenommen sind die wenigen Prompts, in deren Karten-Beschreibung ausdrücklich „nur für den persönlichen Gebrauch" vermerkt ist

## Werden meine Daten beim Kopieren eines Prompts preisgegeben?

Nein. Die Prompts von AiShort sind als statisches JSON in den Site-Assets gebündelt, und **der Kopiervorgang selbst findet lokal in der Zwischenablage Ihres Browsers statt**.

Die **Inhalte, die Sie in die Platzhalter in eckigen Klammern eintragen, sowie die Antworten der KI** werden direkt zwischen Ihnen und der gewählten KI-Plattform (ChatGPT, Claude, Gemini, DeepSeek usw.) übertragen — AiShort sieht diese nicht.

Eine Einschränkung: Beim Kopieren wird ein **anonymes Zählereignis** an das Backend gesendet (POST `/cards/<id>/copy`), das ausschließlich der Statistik zur Beliebtheit der einzelnen Prompts dient (die auf der Karte angezeigte „Anzahl der Kopiervorgänge"). **Übertragen wird nur die Karten-ID, keine** von Ihnen eingegebenen Inhalte, keine personenbezogenen Daten und keine Verknüpfung mit einer Benutzeridentität.

**Nach der Anmeldung** werden Ihre Favoritenliste, benutzerdefinierten Prompts und Community-Beiträge zur geräteübergreifenden Synchronisation in das Backend übernommen — jederzeit als JSON exportierbar und mit einem Klick vollständig löschbar.

## Verwandte Dokumentation

- [Erste Schritte](./getting-started) - Grundlegende Nutzung
- [Meine Sammlung](./my-collection) - Sammlungs- und Tag-Verwaltung
- [Community-Prompts](./community) - Entdecken und Teilen
