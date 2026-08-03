---
sidebar_label: Firefox Extension Settings
title: AI Short on Firefox - Native Sidebar & Shortcuts
description: Firefox setup guide for AI Short - aligned with the Chrome build since v4.4.0, a native sidebar that needs no per-site permission, Alt+Shift+D to toggle.
---

# Firefox Extension Settings

Since v4.4.0 the Firefox build matches the Chrome one: the same **side panel, popup and standalone window** display modes, with the prompt library bundled inside the extension.

The extension only requests the `storage` permission — it neither reads nor modifies the pages you visit, so **no per-site authorization is needed**.

> Older builds (v4.3 and earlier) injected the sidebar into the ChatGPT page with a content script, so you had to right-click the icon and choose "Always allow on \*\*\*". That mechanism is gone; after upgrading you can skip this step.

## Shortcuts

- `Alt + Shift + S` — open the extension in the current display mode
- `Alt + Shift + D` — toggle the native Firefox sidebar

Customize them under `about:addons` → gear icon → "Manage Extension Shortcuts".

## Settings Page

Pin AI Short to the Firefox toolbar, then open its "Options" from the Extensions page to switch language, display mode and dark mode.

See the [usage guide](./usage) for what each setting does.
