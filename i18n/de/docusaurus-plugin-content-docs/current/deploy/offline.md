---
sidebar_label: Offline-Version (Unternehmens-Intranet)
title: AI Short Offline-Bereitstellung | Intranet-Lösung ohne externe Server
description: Die Offline-Version von AI Short ist für Unternehmen, Behörden und regulierte Branchen konzipiert, die keinen externen Internetzugang nutzen dürfen. Kein Backend-Server, keine Registrierung, alle Daten verbleiben lokal im Browser — DSGVO-konform und sofort einsatzbereit.
---

# Offline-Bereitstellung

> **Zielgruppe**: IT-Administratoren oder technisch Verantwortliche, die die Bereitstellung durchführen. Endanwender rufen lediglich die vom Administrator bereitgestellte Intranet-Adresse auf und müssen dieses Dokument nicht lesen.

**Einsatzszenarien**: Unternehmens-Intranets, Behördennetze, Banken und Versicherungen, regulierte Branchen mit strengen Compliance-Anforderungen (BaFin, KRITIS), Forschungs- und Bildungsnetze sowie sonstige Umgebungen, in denen der Zugriff auf das öffentliche Internet **nicht möglich oder nicht erwünscht** ist.

Kein Backend, keine Registrierung — sämtliche Daten verbleiben im Browser des jeweiligen Benutzers. Damit ist die Offline-Version besonders geeignet für **DSGVO-konforme Bereitstellungen** mit strikter Datenresidenz in Deutschland, Österreich oder der Schweiz: Es findet keinerlei Übertragung personenbezogener Daten an externe Server statt. Nach der einmaligen Bereitstellung im Intranet genügt für die Nutzung ein moderner Browser.

## Nutzung im Team

Die Offline-Version ist eine rein statische Website. Sobald sie auf einem Intranet-Server bereitgestellt ist, rufen die Teammitglieder die interne Adresse im Browser auf:

1. **Der Administrator** stellt die Offline-Version auf einem Intranet-Server bereit (z. B. `http://192.168.1.100:3000`)
2. **Teammitglieder** öffnen diese Adresse im Browser, um Prompts zu durchsuchen, zu filtern und zu kopieren
3. Sammlungen und selbst erstellte Prompts jedes Benutzers werden **ausschließlich im jeweils eigenen Browser** gespeichert und beeinflussen sich gegenseitig nicht
4. Keine Kontoanmeldung, keine Installation — einfach öffnen und verwenden

![Datenarchitektur der Offline-Version: Ein Intranet-Server stellt eine gemeinsame, schreibgeschützte Prompt-Bibliothek bereit; Sammlung, eigene Prompts, Sortierreihenfolge und Tags jedes Benutzers liegen im localStorage des jeweils eigenen Browsers — voneinander unabhängig und ohne Konto.](/img/docs/offline-architecture.svg)

:::tip[Hinweis]

Die Prompt-Bibliothek (kuratierte Prompts) wird zur Build-Zeit als statisches Datenpaket erzeugt — alle Benutzer sehen denselben Inhalt. Sammlungen, eigene Prompts, Sortierreihenfolge und Tags werden im localStorage des jeweiligen Browsers abgelegt und bleiben strikt voneinander getrennt.

:::

## Unterschiede zur Online-Version

| Funktion | Online-Version | Offline-Version |
| ---- | ------ | ------ |
| Prompts durchsuchen/filtern | ✅ | ✅ |
| Prompts kopieren | ✅ | ✅ |
| Sammlungsverwaltung | Serverseitig gespeichert | Lokal im Browser |
| Eigene Prompts | Serverseitig gespeichert | Lokal im Browser |
| Meine Sammlung (Drag-and-Drop-Sortierung, Tags) | ✅ | ✅ |
| Mehrsprachigkeit (18 Sprachen) | ✅ | ✅ |
| Datenimport/-export | ✅ | ✅ (Formate kompatibel) |
| Prompt-Detailseite | ✅ | ✅ (statische Daten, ohne Kommentare) |
| Registrierung/Anmeldung | ✅ | ❌ (kein Konto erforderlich) |
| Community-Prompts/Abstimmungen | ✅ | ❌ |
| Kommentare und Feedback | ✅ | ❌ |

## Datenspeicherung

Die Daten jedes Benutzers werden **im jeweils eigenen Browser** im localStorage abgelegt — es findet keinerlei Serverkommunikation statt:

| Daten | Speicherschlüssel | Beschreibung |
| ---- | ------ | ---- |
| Sammlungsliste | `local_favorites` | Array der gesammelten Prompt-IDs |
| Eigene Prompts | `local_user_prompts` | Vom Benutzer erstellte Prompt-Daten |
| Sortierreihenfolge | `local_myspace_order` | Kartensortierung in „Meine Sammlung" |
| Eigene Tags | `local_custom_tags` | Tag-Definitionen und Zuordnungen |

:::caution[Achtung]

- Der localStorage des Browsers ist auf etwa 5 MB begrenzt — für den normalen Betrieb ist das ausreichend.
- Das Löschen der Browserdaten führt zum Verlust der persönlichen Daten. Wir empfehlen daher, regelmäßig über „Mein Konto → Datenverwaltung → Exportieren" eine Sicherung anzulegen.
- Beim Wechsel des Geräts oder Browsers müssen die Daten neu importiert werden.

:::

## Bereitstellung

Die Offline-Version basiert auf dem Branch `offline`. Nach der einmaligen Bereitstellung durch den Administrator können die Teammitglieder die Anwendung ohne weitere Vorbereitung nutzen.

### Docker-Bereitstellung (empfohlen)

Die einfachste Variante — eine einzige Zeile genügt, um die Anwendung auf einem Intranet-Server zu starten:

```bash
# Vorgefertigtes Offline-Image verwenden
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Alternativ über Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Anschließend rufen die Teammitglieder `http://<Server-IP>:3000` auf.

Mit `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build aus dem Quellcode

Falls Sie Prompt-Inhalte anpassen oder die Konfiguration verändern möchten:

```bash
# Offline-Branch klonen
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Abhängigkeiten installieren
yarn

# Lokale Entwicklung
yarn start

# Build für eine einzelne Sprache (z. B. Deutsch)
yarn build --locale de

# Build für alle Sprachen
yarn build
```

Die Build-Artefakte liegen anschließend im Verzeichnis `build/` und können auf einem beliebigen statischen Webserver (Nginx, Apache, Caddy usw.) bereitgestellt werden.

### Beispiel-Konfiguration für Nginx

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Bereitstellung über Plattformen

Für Vercel, Cloudflare Pages und vergleichbare Plattformen wählen Sie einfach den Branch `offline` aus. Die übrigen Schritte entsprechen der Online-Version — Details siehe [Projektbereitstellung](../deploy).

## Datenimport und -export

### Export

Öffnen Sie „Mein Konto → Datenverwaltung → Exportieren", um persönliche Sammlungen und eigene Prompts als JSON-Datei zu sichern.

### Import

Es werden JSON-Dateien in den folgenden Formaten unterstützt:

- **Exporte aus der Offline-Version**: vollständige Wiederherstellung von Sammlung, Prompts, Sortierung und Tags
- **Exporte aus der Online-Version**: werden automatisch kompatibel verarbeitet
  - Eigene Prompts → werden lokal zusammengeführt (Deduplizierung anhand des Titels)
  - Kuratierte Sammlung (card) → wird mit der lokalen Sammlung zusammengeführt
  - Community-Sammlung (community) → wird automatisch in lokale, eigene Prompts überführt
  - MySpace-Sortierung → wird lokal wiederhergestellt
  - Eigene Tags → werden ergänzend zusammengeführt (vorhandene Tags bleiben erhalten)

### Migration aus der Online-Version

1. Exportieren Sie Ihre Daten in der Online-Version (aishort.top) unter „Mein Konto"
2. Importieren Sie die JSON-Datei in der Offline-Version unter „Mein Konto → Datenverwaltung → Importieren"
3. Community-Sammlungen werden automatisch in lokale Prompts überführt, kuratierte Sammlungen werden regulär übernommen

## Häufige Fragen

### Wie nutzt das Team die Anwendung nach der Bereitstellung?

Nach der Bereitstellung auf dem Intranet-Server teilen Sie den Teammitgliedern lediglich die Zugriffsadresse mit (z. B. `http://192.168.1.100:3000`). Jeder öffnet diese im Browser — ohne Installation und ohne Registrierung.

### Beeinflussen sich die Daten der einzelnen Benutzer gegenseitig?

Nein. Sammlung und eigene Prompts jedes Benutzers liegen im localStorage des jeweils eigenen Browsers und sind vollständig voneinander getrennt. Auf dem Server befindet sich ausschließlich die gemeinsam genutzte Prompt-Bibliothek (Read-only).

### Können Daten verloren gehen?

Folgende Aktionen führen zum Verlust der persönlichen Daten:

- Löschen der Browserdaten bzw. des Caches
- Nutzung im Privat- oder Inkognito-Modus
- Wechsel des Geräts oder Browsers

Wir empfehlen, wichtige Daten regelmäßig über „Mein Konto → Datenverwaltung → Exportieren" als JSON-Datei zu sichern.

### Lassen sich eigene Prompts im Team austauschen?

Ja. Eine Person exportiert die JSON-Datei, die übrigen Teammitglieder importieren sie unter „Mein Konto → Datenverwaltung → Importieren". Die Deduplizierung erfolgt automatisch.

### Wie wird die Prompt-Bibliothek aktualisiert?

Die Prompt-Bibliothek ist zum Build-Zeitpunkt fest verankert. Zur Aktualisierung:

1. Der Administrator ruft den aktuellen Stand des Branches `offline` ab
2. Anschließend wird die Anwendung neu gebaut und bereitgestellt (oder das aktuelle Docker-Image gezogen)
3. Die Teammitglieder sehen die neuen Inhalte nach einem Browser-Refresh — persönliche Daten bleiben unverändert erhalten

### Sind die Datenformate von Offline- und Online-Version kompatibel?

Ja. Die exportierten JSON-Dateien folgen demselben Format und können zwischen beiden Varianten ausgetauscht werden. Die Prompt-IDs unterscheiden sich (Online: Server-IDs, Offline: Zeitstempel-IDs), beim Import erfolgt die Deduplizierung jedoch über den Titel — es kommt also nicht zu Konflikten.
