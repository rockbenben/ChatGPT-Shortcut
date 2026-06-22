---
sidebar_label: Chrome CRX Install Guide
title: Chrome CRX Install - Manual Developer Mode Setup
description: Manually install the AI Short extension via a CRX file. Enable developer mode and drag to install. Includes solutions for common issues.
---

# Chrome CRX Extension Local Installation Guide

> This guide assumes you've already downloaded and extracted the CRX package from the [installation page](./README.md) (the .crx file is inside the extracted folder).
>
> ⚠️ **Two common pitfalls**:
> 1. You must drag the **`.crx` file** (the one inside the extracted folder) into the extensions page — not the zip package itself
> 2. You must **drag it in** — do NOT click "Load unpacked" (that button is for the zip version)

## Enable Developer Mode

Open Chrome's "Manage Extensions" page and turn on "Developer mode".

Copy the following address, paste it into the browser address bar, and press Enter. Turn on "Developer mode" in the top right corner of the page.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## Install Extension

Install the ChatGPT Shortcut extension (Note ⚠️: drag in the .crx file — do NOT click "Load unpacked").

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

After successful installation, check the [Plugin Usage Tutorial](./usage).

## Installation Issues?

1. Windows users: Have you unzipped the downloaded installation package (instead of just double-clicking it open)?

2. Is "Developer mode" enabled? If not, see step 2 above.

3. Did you drag the .crx file into the "Extensions" page? Note ⚠️: do not click "Load unpacked" — you must drag the .crx file in.

4. Browser refuses to install .crx files? Try the zip version instead! [Click here for the zip installation tutorial](./manual-chrome-extension-zip).
