<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
<a href="./README-es.md">Español</a> |
<a href="./README-ja.md">日本語</a> |
<a href="./README-ko.md">한국어</a> |
<a href="./README-fr.md">Français</a> |
Deutsch |
<a href="./README-it.md">Italiano</a> |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Warum AiShort verwenden?

AiShort bietet eine prägnante und benutzerfreundliche Liste von KI-Anweisungen. Selbst ohne Verständnis für Prompts können Sie durch Filtern und Suchen einfach die für verschiedene Szenarien geeigneten Prompts finden, was Ihre Produktivität verbessert.

🚀 **Prompts mit einem Klick**: Mit nur einem Klick erhalten Sie eine Vielzahl von sorgfältig ausgewählten Prompts von Experten. Senden Sie sie an KI-Sprachmodelle wie ChatGPT und Sie erhalten die erwartete Ausgabe.

💻 **Produktivität steigern**: Durch die Verwendung optimierter Prompts erhalten Sie genauere und praktischere Rückmeldungen, was Ihre Arbeitseffizienz effektiv erhöht.

🌍 **Optimierung für Nicht-Englische Sprachen**: Wir bieten Übersetzungen für englische Prompts in 12 großen globalen Sprachen an und unterstützen Standardantworten in Ihrer Muttersprache, was für Nicht-Englisch-Sprecher praktisch ist, um sie zu verstehen und zu verwenden.

💾 **Prompts speichern**: Sammeln, bearbeiten und verwalten Sie Ihre Lieblings-Prompts bequem für die zukünftige Verwendung.

🌐 **Prompts teilen**: Teilen Sie Ihre Lieblings-Prompts, arbeiten Sie mit anderen zusammen und regen Sie mehr Ideen an.

🗳️ **Community-Abstimmungssystem**: Ähnlich wie Product Hunt oder Reddit, wird die Plattform von der Community betrieben. Die besten Prompts werden auf die Startseite geschoben.

📦 **Sofort einsatzbereit**: Besuchen Sie einfach https://www.aishort.top/de/ um zu starten.

Die Quelle der AiShort-Prompts umfasst Internet-Auswahl, Community-Teilungen und [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Wir werden regelmäßig aktualisieren, um Ihnen neue Prompts und Inspirationen zu bieten. Um zu verstehen, wie AiShort verwendet wird, lesen Sie bitte das [Benutzerhandbuch](https://www.aishort.top/de/docs/guides/getting-started).

Willkommen in unserer Discord-Community, um Ideen auszutauschen und Feedback zu geben.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="Chat auf Discord" />
</a>

## Browser-Erweiterung

AiShort (ChatGPT Shortcut) ist eine vielseitige Erweiterung, die mit Chrome, Edge, Firefox und anderen Chromium-basierten Browsern kompatibel ist. Diese Erweiterung bietet nicht nur die Funktionalität der Webversion von ChatGPT Shortcut, sondern fügt auch einzigartige Funktionen wie eine Seitenleiste und automatische Fensteraktivierung hinzu. Die Erweiterung kann automatisch mit ChatGPT oder benutzerdefinierten Seiten gestartet werden und kann auch manuell mit der Tastenkombination „Alt+Umschalt+S“ aktiviert werden. Hier sind die Downloadkanäle:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Zusätzlich bieten wir das Tampermonkey-Skript an - [**ChatGPT Shortcut Überall**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), sodass Benutzer passende Domänennamen anpassen und die AiShort-Seitenleiste auf jeder Website verwenden können. Aufgrund von Einschränkungen bei der Einfügung von Skriptinhalten auf der ChatGPT-Seite wird die Seitenleistenfunktion des Skripts jedoch über ein Popup auf der ChatGPT-Seite aktiviert.

## Bereitstellen

Detaillierte Schritte zum Bereitstellen über Vercel, die lokale Umgebung, Docker und zum Ändern des Projekts finden Sie im [ChatGPT Shortcut-Bereitstellungshandbuch](https://www.aishort.top/de/docs/deploy).

## Synchronisierte Updates

Wenn Sie Ihr eigenes Projekt mit einem einzigen Klick auf Vercel bereitgestellt haben, kann es zu einem Problem kommen, bei dem Updates durchgängig angezeigt werden. Dies ist auf das Standardverhalten von Vercel zurückzuführen, bei dem ein neues Projekt für Sie erstellt wird, anstatt das aktuelle Projekt zu verzweigen, wodurch die ordnungsgemäße Update-Erkennung behindert wird. Es wird empfohlen, die folgenden Schritte zur erneuten Bereitstellung auszuführen:

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
