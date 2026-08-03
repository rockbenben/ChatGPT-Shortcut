---
sidebar_label: Install Browser Extension
title: AI Short Extension | ChatGPT/Gemini/Claude Sidebar · Chrome/Edge/Firefox
description: AiShort prompts in a browser side panel, popup or standalone window, right beside ChatGPT, Gemini and Claude. One-click install for Chrome, Edge, Firefox.
---

# Install Browser Extension

The AI Short (ChatGPT Shortcut) extension bundles 5,000+ prompts inside the extension itself and opens them as a **side panel, popup or standalone window** right beside ChatGPT, Gemini, Claude, DeepSeek and other AI chats, so you no longer have to switch back to aishort.top to copy and paste. It supports Chrome, Edge, and Firefox, and can be summoned instantly with `Alt + Shift + S`.

## Installation

### 1. App Stores (Recommended, One-Click Install)

- **Chrome**: [Chrome Web Store](https://chromewebstore.google.com/detail/ai-short-ai-prompt-shortc/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/ai-short-ai-prompt-shor/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/firefox/addon/aishort/) (aligned with the Chrome build since v4.4.0 — see [Firefox extension settings](./firefox-extension-setting) for the differences)

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
