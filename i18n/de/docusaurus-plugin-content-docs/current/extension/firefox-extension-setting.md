---
sidebar_label: Firefox-Erweiterungseinstellungen
title: Firefox Config - Native Seitenleiste & Kürzel
description: AI Short unter Firefox einrichten. Seit v4.4.0 identisch zur Chrome-Version, mit nativer Seitenleiste ohne Berechtigung pro Website und Alt+Shift+D.
---

# Firefox-Erweiterungseinstellungen

Seit v4.4.0 entspricht die Firefox-Version der Chrome-Version: dieselben drei Anzeigemodi — **Seitenleiste, Popup und eigenes Fenster** — mit der Prompt-Bibliothek direkt in der Erweiterung.

Die Erweiterung fordert nur die Berechtigung `storage` an. Sie liest und verändert die von Ihnen besuchten Seiten nicht, daher ist **keine Freigabe pro Website mehr nötig**.

> Ältere Versionen (v4.3 und früher) haben die Seitenleiste per Content Script in die ChatGPT-Seite eingefügt; dafür musste man mit der rechten Maustaste auf das Symbol klicken und „Auf \*\*\* immer erlauben" wählen. Dieser Mechanismus wurde entfernt — nach dem Update entfällt dieser Schritt.

## Tastenkürzel

- `Alt + Shift + S`: öffnet die Erweiterung im aktuellen Anzeigemodus
- `Alt + Shift + D`: blendet die native Firefox-Seitenleiste ein oder aus

Anpassen unter `about:addons` → Zahnradsymbol → „Erweiterungs-Tastenkombinationen verwalten".

## Einstellungsseite

Heften Sie AI Short an die Firefox-Symbolleiste und öffnen Sie die „Optionen" auf der Erweiterungsseite, um Sprache, Anzeigemodus und Dunkelmodus zu ändern.

Was die einzelnen Optionen bewirken, steht in der [Bedienungsanleitung](./usage).
