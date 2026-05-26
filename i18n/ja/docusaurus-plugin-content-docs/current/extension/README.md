---
sidebar_label: ブラウザ拡張機能のインストール
title: AI Short 拡張機能 | ChatGPT/Gemini/Claude サイドバー · Chrome/Edge/Firefox インストール
description: ChatGPT、Gemini、Claude、Doubao などの AI チャットページのサイドバーから直接 AiShort プロンプトを呼び出せます。タブを切り替えてコピー＆ペーストする必要はありません。Chrome、Edge、Firefox にワンクリックでインストール。
---

# ブラウザ拡張機能のインストール

AiShort (ChatGPT Shortcut) 拡張機能は、プロンプトライブラリを ChatGPT、Gemini、Claude、Doubao などの AI チャットページのサイドバーに直接埋め込みます。aishort.top に戻ってコピー＆ペーストする必要はありません。Chrome、Edge、Firefox に対応し、`Alt + Shift + S` ですばやく呼び出せます。

## 📥 インストール方法

### 1. アプリストア（推奨、ワンクリックインストール）

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)（インストール後に一度[権限設定](./firefox-extension-setting.md)が必要です。設定しないと ChatGPT 上でサイドバーが表示されません）

### 2. ストアが開けない？ローカルインストールパッケージ

以下のチャンネルからダウンロードし、対応するチュートリアルに従ってインストールしてください。

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 インストールガイド：[CRX ファイル](./manual-chrome-extension.md) · [ZIP ファイル](./manual-chrome-extension-zip.md)

## ✅ インストール後

`Alt + Shift + S` で呼び出すか、ツールバーのアイコンをクリックします。詳しい使い方は[使用ガイド](./usage.md)をご覧ください。

## 🧩 Tampermonkey スクリプト

拡張機能形式に加えて、[**ChatGPT Shortcut Anywhere Tampermonkey スクリプト**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)も提供しています。
Tampermonkey は、ユーザーがカスタムスクリプトを実行して Web ページの機能を強化できるブラウザ拡張機能です。

このスクリプトを使用すると、任意の Web サイトで AiShort サイドバーを呼び出すことができます。
ただし、ChatGPT の公式ページのスクリプト注入制限により、そのページではスクリプトはサイドバーではなく**ポップアップ**として実行されることに注意してください。

AiShort サイドバーを有効化すると、対応ページの右下に緑色のアイコンスイッチが表示されます。このアイコンをクリックすると、サイドバーのオン／オフを切り替えられます。現在、ChatGPT、Gemini、Claude、Doubao などにデフォルトで対応しています。

![](/img/docs/extension-sidebar.gif)
