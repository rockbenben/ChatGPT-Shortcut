---
sidebar_label: Offline-Version (Firmen-Intranet)
title: AI Short Offline-Bereitstellung | Firmen-Intranet ohne externen Server
description: Die AI Short Offline-Version wurde fuer Unternehmen und Teams ohne Zugang zum externen Netzwerk entwickelt. Kein Backend-Server erforderlich, keine Registrierung noetig, Daten werden lokal im Browser gespeichert, sofort einsatzbereit.
---

# Offline-Bereitstellungsversion

**Anwendbare Szenarien**: Firmen-Intranets, Behoerdennetzwerke, Sicherheitsumgebungen, Campus-Netzwerke und andere Szenarien, in denen **der Zugang zum externen Netzwerk nicht verfuegbar oder unpraktisch** ist.

Die AI Short Offline-Version benoetigt keinen Backend-Server und keine Benutzerregistrierung. Alle Daten werden lokal im Browser gespeichert. Nach der Bereitstellung kann sie direkt von Teams im Intranet genutzt werden.

## Nutzung im Team

Die Offline-Version ist eine rein statische Website. Nach der Bereitstellung auf einem Intranet-Server muessen Teammitglieder lediglich die Intranet-Adresse im Browser oeffnen:

1. Der **Administrator** stellt die Offline-Version auf einem Intranet-Server bereit (z.B. `http://192.168.1.100:3000`)
2. **Teammitglieder** oeffnen die Adresse im Browser, um Prompts zu durchsuchen, zu suchen und zu kopieren
3. Die **Favoriten und benutzerdefinierten Prompts jeder Person werden in ihrem eigenen Browser** gespeichert, unabhaengig voneinander
4. Keine Registrierung erforderlich, keine Softwareinstallation noetig, sofort nutzbar

```
Intranet-Server (Offline-Version bereitgestellt)
   ├── Prompt-Bibliothek-Daten (von allen geteilt, aus statischem JSON)
   │
   ├── Browser von Benutzer A → localStorage (As Favoriten und benutzerdefinierte Prompts)
   ├── Browser von Benutzer B → localStorage (Bs Favoriten und benutzerdefinierte Prompts)
   └── Browser von Benutzer C → localStorage (Cs Favoriten und benutzerdefinierte Prompts)
```

:::tip Hinweis
Die Prompt-Bibliothek (kuratierte Prompts) besteht aus statischen Daten, die beim Build verpackt werden, und alle Benutzer sehen den gleichen Inhalt. Die Favoriten, benutzerdefinierten Prompts, Sortierung und Tags jedes Benutzers werden im localStorage des jeweiligen Browsers gespeichert und sind vollstaendig voneinander unabhaengig.
:::

## Unterschiede zur Online-Version

| Funktion | Online-Version | Offline-Version |
| ---- | ------ | ------ |
| Prompt-Durchsuchen/-Suche/-Filterung | ✅ | ✅ |
| Prompt-Kopieren | ✅ | ✅ |
| Favoritenverwaltung | Server-Speicherung | Lokale Browser-Speicherung |
| Benutzerdefinierte Prompts | Server-Speicherung | Lokale Browser-Speicherung |
| Meine Sammlung (Drag-Sortierung, Tags) | ✅ | ✅ |
| Mehrsprachige Unterstuetzung (18 Sprachen) | ✅ | ✅ |
| Datenimport/-export | ✅ | ✅ (Format kompatibel) |
| Prompt-Detailseiten | ✅ | ✅ (Statische Daten, keine Kommentare) |
| Benutzerregistrierung/-anmeldung | ✅ | ❌ (Kein Konto erforderlich) |
| Community-Prompt-Liste/-Abstimmung | ✅ | ❌ |
| Kommentar-Feedback | ✅ | ❌ |

## Datenspeicherung

Die Daten jedes Benutzers werden im localStorage des **eigenen Browsers** gespeichert, unabhaengig vom Server:

| Daten | Speicherschluessel | Beschreibung |
| ---- | ------ | ---- |
| Favoritenliste | `local_favorites` | Array der Favoriten-Prompt-IDs |
| Benutzerdefinierte Prompts | `local_user_prompts` | Vom Benutzer erstellte Prompt-Daten |
| Sortierreihenfolge | `local_myspace_order` | Kartensortierung in Meine Sammlung |
| Benutzerdefinierte Tags | `local_custom_tags` | Tag-Definitionen und -Zuweisungen |

:::caution Achtung
- Die lokale Browser-Speicherung hat ein Kapazitaetslimit von etwa 5 MB, was fuer den taeglichen Gebrauch vollstaendig ausreichend ist.
- Das Loeschen von Browserdaten fuehrt zum Verlust persoenlicher Daten. Es wird empfohlen, regelmaessig ueber "Einstellungen > Daten exportieren" zu sichern.
- Nach dem Wechsel des Computers oder Browsers muessen Daten neu importiert werden.
:::

## Bereitstellung

Die Offline-Version basiert auf dem `offline`-Branch. Nachdem ein Administrator die Bereitstellung abgeschlossen hat, koennen Teammitglieder sie ohne weitere Schritte nutzen.

### Docker-Bereitstellung (Empfohlen)

Die einfachste Bereitstellungsmethode -- ein einziger Befehl zum Ausfuehren auf Ihrem Intranet-Server:

```bash
# Verwenden Sie das vorgefertigte Offline-Image
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Oder verwenden Sie Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Nach der Bereitstellung koennen Teammitglieder auf `http://<Server-IP>:3000` zugreifen.

Verwendung von `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Aus Quellcode bauen

Wenn Sie Prompt-Inhalte anpassen oder Konfigurationen aendern muessen:

```bash
# Offline-Branch klonen
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Abhaengigkeiten installieren
yarn

# Lokale Entwicklung
yarn start

# Einzelsprachige Version bauen (Chinesisch)
yarn build --locale zh-Hans

# Alle Sprachen bauen
yarn build
```

Das Build-Ergebnis befindet sich im Verzeichnis `build/` und kann auf jedem statischen Dateiserver bereitgestellt werden (Nginx, Apache, Caddy usw.).

### Nginx-Konfigurationsbeispiel

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

### Plattform-Bereitstellung

Bei der Bereitstellung auf Plattformen wie Vercel oder Cloudflare Pages waehlen Sie den `offline`-Branch. Alle anderen Schritte sind identisch mit der Online-Version. Siehe [Projektbereitstellung](../deploy) fuer Details.

## Datenimport und -export

### Export

Gehen Sie zu "Einstellungen > Daten exportieren", um Ihre persoenlichen Favoriten und benutzerdefinierten Prompts als JSON-Datei zu exportieren.

### Import

Folgende JSON-Dateiformate werden fuer den Import unterstuetzt:

- **Dateien aus der Offline-Version**: Stellen Favoriten, Prompts, Sortierung und Tags vollstaendig wieder her
- **Dateien aus der Online-Version**: Werden automatisch kompatibel verarbeitet
  - Benutzer-Prompts → In lokalen Speicher zusammengefuehrt (nach Titel dedupliziert)
  - Kuratierte Favoriten (card) → In lokale Favoriten zusammengefuehrt
  - Community-Favoriten (community) → Automatisch in lokale benutzerdefinierte Prompts konvertiert
  - MySpace-Sortierung → Im lokalen Speicher wiederhergestellt
  - Benutzerdefinierte Tags → Angehaengt und zusammengefuehrt (ueberschreibt vorhandene nicht)

### Migration von der Online-Version

1. Daten von der Seite "Mein Konto" der Online-Version (aishort.top) exportieren
2. Die JSON-Datei auf der Seite "Einstellungen" der Offline-Version importieren
3. Community-Favoriten werden automatisch in lokale Prompts konvertiert, kuratierte Favoriten werden normal synchronisiert

## Haeufig gestellte Fragen

### Wie nutzt das Team es nach der Bereitstellung?

Nachdem der Administrator es auf einem Intranet-Server bereitgestellt hat, teilen Sie einfach die Zugangs-URL (z.B. `http://192.168.1.100:3000`) mit den Teammitgliedern. Jeder oeffnet sie im Browser -- keine Installation, keine Registrierung erforderlich.

### Beeinflussen sich die Daten verschiedener Benutzer gegenseitig?

Nein. Die Favoriten und benutzerdefinierten Prompts jeder Person werden im localStorage des eigenen Browsers gespeichert, vollstaendig unabhaengig. Der Server hostet nur die gemeinsame Prompt-Bibliothek (schreibgeschuetzt).

### Koennen Daten verloren gehen?

Folgende Aktionen fuehren zum Verlust persoenlicher Daten:

- Loeschen von Browserdaten/Cache
- Surfen im privaten/Inkognito-Modus
- Wechsel des Computers oder Browsers

Es wird empfohlen, wichtige Daten regelmaessig ueber "Einstellungen > Daten exportieren" als JSON-Datei zu sichern.

### Koennen benutzerdefinierte Prompts im Team geteilt werden?

Ja. Eine Person exportiert die JSON-Datei, und andere Mitglieder importieren sie ueber "Einstellungen > Daten importieren". Duplikate werden beim Import automatisch entfernt.

### Wie aktualisiert man die Prompt-Bibliothek?

Die Prompt-Bibliothek besteht aus statischen Daten, die beim Build verpackt werden. Zum Aktualisieren:

1. Der Administrator holt den neuesten `offline`-Branch-Code
2. Neu bauen und bereitstellen (oder das neueste Docker-Image laden)
3. Teammitglieder aktualisieren die Browser-Seite, um neue Inhalte zu sehen (persoenliche Daten werden nicht beeinflusst)

### Ist das Datenformat der Offline-Version mit der Online-Version kompatibel?

Ja. Das exportierte JSON-Format ist identisch und kann zwischen beiden Versionen importiert werden. Die Prompt-IDs unterscheiden sich zwischen den Versionen (die Online-Version verwendet Server-IDs, die Offline-Version verwendet Zeitstempel-IDs), aber die Deduplizierung erfolgt beim Import nach Titel, sodass es keine Konflikte gibt.
