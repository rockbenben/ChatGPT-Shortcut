---
sidebar_label: Benutzerdefinierte Prompts
title: AI Short Benutzerdefinierte Prompts | Erstellen, Bearbeiten und Teilen
description: Erstellen Sie exklusive KI-Prompts, speichern Sie sie in Ihrem Konto und rufen Sie sie jederzeit ab. Mit der Community teilen oder privat setzen — Backup-Daten mit einem Klick exportieren.
---

# Benutzerdefinierte Prompts

Nach der Anmeldung können Sie eigene Prompts erstellen, in Ihrem Konto speichern und jederzeit schnell darauf zugreifen. Benutzerdefinierte Prompts erscheinen in der Ansicht „Meine Sammlung".

## Prompt erstellen

1. Klicken Sie nach der Anmeldung oben auf der Seite auf die Schaltfläche „**Prompt erstellen**"
2. Füllen Sie den Dialog „Prompt erstellen" aus:
   - **Prompt-Name** (Pflichtfeld): Ein Name für den Prompt
   - **Prompt-Inhalt** (Pflichtfeld): Der eigentliche Prompt-Text; Text in eckigen Klammern `[...]` wird bei der Anzeige als Platzhalter hervorgehoben
   - **Verwendung** (optional): Eine kurze Beschreibung, was der Prompt leistet
   - **Anmerkungen** (optional): Quelle, andere Sprachversionen oder ergänzende Hinweise
3. Der Schalter „Möchten Sie diesen Prompt auf der öffentlichen Seite teilen?" unten ist standardmäßig aktiviert — deaktivieren Sie ihn, um den Prompt privat zu halten
4. Klicken Sie auf „Prompt erstellen", um zu speichern

![Prompt-erstellen-Dialog](/img/docs/user-prompts-create.png)

> 💡 **Beispiel** — ein Prompt „Standup-Update-Generator":
> - **Prompt-Name**: Standup-Update-Generator
> - **Prompt-Inhalt**: Du bist ein präziser Kommunikationsassistent. Wandle die folgenden Notizen in ein tägliches Standup-Update mit drei Abschnitten um — Gestern, Heute, Blockaden. Halte jeden Punkt kurz und ergebnisorientiert: [meine rohen Notizen]
> - **Verwendung**: Verwandelt unstrukturierte Notizen in ein sauberes Standup-Update
> - **Anmerkungen**: Vor dem Morgen-Standup ausführen

## Prompt bearbeiten

Klicken Sie in der Ansicht „Meine Sammlung" auf einer von Ihnen erstellten Prompt-Karte auf die Bearbeiten-Schaltfläche (Stift), um den Dialog „Prompt bearbeiten" zu öffnen. Sie können:

- Name, Inhalt, Verwendung und Anmerkungen ändern
- Den Teilungsstatus umschalten (öffentlich / privat)
- Auf „Speichern" klicken, um zu aktualisieren

![Prompt-Bearbeitungsoberfläche](/img/docs/user-prompts-edit.png)

## Prompt löschen

Klicken Sie im Bearbeitungsdialog auf „Löschen". Die Löschung kann nicht rückgängig gemacht werden — gehen Sie vorsichtig vor.

## Mit der Community teilen

Beim Erstellen oder Bearbeiten steuert der Schalter „Möchten Sie diesen Prompt auf der öffentlichen Seite teilen?" die Sichtbarkeit:

- **Aktiviert (Standard)**: Der Prompt erscheint auf der Seite [Community-Prompts](./community), andere Nutzer können ihn sehen und sammeln
- **Deaktiviert**: Privat — nur für Sie sichtbar

Der Teilungsstatus kann jederzeit geändert werden.

## Prompts exportieren

1. Gehen Sie zu „Mein Konto" und suchen Sie den Bereich „Datenverwaltung → Prompts exportieren"
2. Klicken Sie auf die Schaltfläche „Daten exportieren"
3. Das System generiert eine JSON-Datei und lädt sie automatisch herunter

Der Exportinhalt umfasst:

- Prompt-Name, -Inhalt, -Verwendung und -Anmerkungen
- Teilungsstatus
- Ihre Sammlungen, die Sammlungsreihenfolge und benutzerdefinierte Tags

Regelmäßige Exporte werden empfohlen, um Datenverlust zu vermeiden.

## Prompts importieren

Importieren Sie Prompts und Sammlungen aus einer JSON-Datei:

1. Gehen Sie zu „Mein Konto" und suchen Sie den Bereich „Datenverwaltung → Prompts importieren"
2. Klicken Sie auf die Schaltfläche „Daten importieren"
3. Wählen Sie eine JSON-Datei aus
4. Das System führt die Daten automatisch zusammen (Deduplizierung nach Titel; Prompts, deren IDs einem anderen Konto gehören, werden auf privat gesetzt)

### Team-Zusammenarbeit

Empfohlener Workflow zum Teilen von Prompts im Team:

1. **Filtern und Teilen**: Nach dem Export manuell die Sammlungsliste entfernen oder nur die zu teilenden Prompts herausfiltern, dann die Datei zum Import an Teammitglieder senden
2. **Datenschutz**: Importierte Prompts anderer Personen (deren IDs nicht zum aktuellen Konto gehören) werden automatisch auf **privat** gesetzt — so bleiben die Daten der einzelnen Teammitglieder klar voneinander getrennt

## Verwandte Dokumentation

- [Meine Sammlung](./my-collection) - Sammlungs- und Tag-Verwaltung
- [Community-Prompts](./community) - Teilen und Abstimmen
- [Kontoverwaltung](./account) - Anmeldung und Einstellungen
