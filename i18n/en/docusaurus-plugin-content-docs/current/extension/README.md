---
sidebar_label: Install Browser Extension
title: AI Short Extension | ChatGPT/Gemini/Claude Sidebar · Chrome/Edge/Firefox
description: AiShort prompts inside the sidebar of ChatGPT, Gemini, Claude, Doubao — no tab-switching or copy-pasting. One-click install for Chrome, Edge, Firefox.
---

# Install Browser Extension

The AiShort (ChatGPT Shortcut) extension embeds the prompt library directly into the sidebar of AI chat pages like ChatGPT, Gemini, Claude, and Doubao, so you no longer have to switch back to aishort.top to copy and paste. It supports Chrome, Edge, and Firefox, and can be summoned instantly with `Alt + Shift + S`.

## Installation

### 1. App Stores (Recommended, One-Click Install)

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/) (after install, you'll need a one-time [permission setup](./firefox-extension-setting), otherwise the sidebar won't appear on ChatGPT)

### 2. Store Blocked? Manual Install Package

Download from one of the sources below, then follow the matching guide to install:

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 Install guides: [CRX file](./manual-chrome-extension) · [ZIP file](./manual-chrome-extension-zip)

## After Installing

Press `Alt + Shift + S` to invoke, or click the toolbar icon. See the [usage guide](./usage) for details.

## Tampermonkey Script

In addition to the extension, we also provide the [**ChatGPT Shortcut Anywhere Tampermonkey Script**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere).
Tampermonkey is a browser extension that allows users to run custom scripts to enhance web page functions.

With this script, you can invoke the AiShort sidebar on any website.
However, due to ChatGPT official page restrictions on script injection, the script will run as a **popup** rather than a sidebar on that page.

Once the AiShort sidebar is enabled, you'll see a green icon toggle in the bottom-right corner of supported pages. Click it to open or close the sidebar. ChatGPT, Gemini, Claude, and Doubao are supported by default.

![](/img/docs/extension-sidebar.webp)
