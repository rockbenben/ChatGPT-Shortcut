---
sidebar_label: Benutzerdefinierte Prompts
title: AI Short Benutzerdefinierte Prompts | Erstellen, Bearbeiten und Teilen
description: Erstellen Sie exklusive KI-Prompts, speichern Sie sie in Ihrem Konto und rufen Sie sie jederzeit ab. Mit der Community teilen oder privat setzen — Backup-Daten mit einem Klick exportieren.
---

# Benutzerdefinierte Prompts

Nach der Anmeldung können Sie eigene Prompts erstellen, in Ihrem Konto speichern und jederzeit abrufen. Benutzerdefinierte Prompts erscheinen in der Ansicht „Meine Sammlung".

## Prompt erstellen

1. Klicken Sie oben rechts auf die Schaltfläche "Hinzufügen"
2. Füllen Sie im Popup "Prompt erstellen" das Formular aus:
   - **Prompt-Name** (Pflichtfeld): Geben Sie dem Prompt einen Namen
   - **Prompt-Inhalt** (Pflichtfeld): Der eigentliche Prompt-Text
   - **Zweck/Verwendung** (optional): Kurzbeschreibung, was der Prompt leistet
   - **Bemerkungen** (optional): Quelle, andere Sprachversionen oder Zusatzinformationen
3. Der Schalter unten „Möchten Sie diesen Prompt auf der öffentlichen Seite teilen?" ist standardmäßig aktiviert — deaktivieren Sie ihn, um den Prompt privat zu halten
4. Klicken Sie auf "Prompt erstellen", um zu speichern

![Prompt-erstellen-Popup](/img/docs/user-prompts-create.png)

> 💡 **Beispiel** — ein Prompt „Meeting-Protokoll-Assistent":
> - **Prompt-Name**: Meeting-Protokoll-Assistent
> - **Prompt-Inhalt**: Sie sind ein professioneller Protokollant für Geschäftsmeetings. Erstellen Sie auf Basis der folgenden Notizen ein strukturiertes Besprechungsprotokoll mit den Abschnitten Teilnehmer, Tagesordnung, Beschlüsse und nächste Schritte (mit Verantwortlichen und Fristen): [Meeting-Notizen]
> - **Zweck/Verwendung**: Unstrukturierte Mitschriften in ein professionelles Sitzungsprotokoll überführen
> - **Bemerkungen**: Nach jedem Jour fixe oder Projektmeeting einsetzen

## Prompt bearbeiten

Klicken Sie in der Ansicht Meine Sammlung auf eine von Ihnen erstellte Prompt-Karte, um das Fenster "Prompt bearbeiten" zu öffnen. Sie können:

- Name, Inhalt, Zweck und Bemerkungen ändern
- Teilungsstatus umschalten (Öffentlich/Privat)
- Auf "Speichern" klicken, um zu aktualisieren

![Prompt-Bearbeitungsoberfläche](/img/docs/user-prompts-edit.png)

## Prompt löschen

Klicken Sie im Bearbeitungsfenster auf "Löschen". Die Löschung kann nicht rückgängig gemacht werden — gehen Sie vorsichtig vor.

## Mit der Community teilen

Beim Erstellen oder Bearbeiten steuert der Schalter „Möchten Sie diesen Prompt auf der öffentlichen Seite teilen?" die Sichtbarkeit:

- **Aktiviert (Standard)**: Der Prompt erscheint auf der Seite [Community-Prompts](./community), andere Nutzer können ihn sehen und sammeln
- **Deaktiviert**: Privater Prompt, nur für Sie sichtbar

Der Teilungsstatus kann jederzeit geändert werden.

## Backup exportieren

1. Gehen Sie zu „Mein Konto" → finden Sie den Bereich „Datenverwaltung → Prompts exportieren"
2. Klicken Sie auf die Schaltfläche "Daten exportieren"
3. Das System generiert eine JSON-Datei und lädt sie automatisch herunter

Der Exportinhalt umfasst:

- Name, Inhalt, Zweck/Verwendung und Bemerkungen der Prompts
- Erstellungs- und Aktualisierungszeit
- Teilungsstatus

Es wird empfohlen, regelmäßig zu exportieren, um Datenverlust zu vermeiden.

## Prompts importieren

Importieren Sie Prompts und Sammlung aus einer JSON-Datei:

1. Gehen Sie zu „Mein Konto" → finden Sie den Bereich „Datenverwaltung → Prompts importieren"
2. Klicken Sie auf die Schaltfläche "Daten importieren"
3. Wählen Sie eine JSON-Datei aus
4. Das System führt die Daten automatisch zusammen (Deduplizierung nach Titel; Prompts mit fremder ID werden automatisch auf privat gesetzt)

### Team-Zusammenarbeit

Empfohlener Workflow zum Teilen von Prompts im Team:

1. **Filtern und Teilen**: Nach dem Export manuell die Sammlungsliste entfernen oder nur die zu teilenden Prompts auswählen, dann die Datei zum Import an Teammitglieder senden
2. **Datenschutz**: Importierte Prompts anderer Personen (deren IDs nicht zum aktuellen Konto gehören) werden automatisch auf **privat** gesetzt — so bleiben die Daten der einzelnen Teammitglieder klar voneinander getrennt

## Verwandte Dokumentation

- [Meine Sammlung](./my-collection) - Sammlungs- und Tag-Verwaltung
- [Community-Prompts](./community) - Teilen und Abstimmen
- [Kontoverwaltung](./account) - Anmeldung und Einstellungen
