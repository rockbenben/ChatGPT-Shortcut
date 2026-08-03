---
sidebar_label: ブラウザ拡張機能のインストール
title: AI Short 拡張機能 | ChatGPT/Gemini/Claude サイドバー · Chrome/Edge/Firefox インストール
description: ブラウザのサイドバー・ポップアップ・独立ウィンドウから AiShort プロンプトを直接呼び出し、ChatGPT や Gemini、Claude の横に並べて使えます。Chrome、Edge、Firefox にワンクリックでインストール。
---

# ブラウザ拡張機能のインストール

AI Short (ChatGPT Shortcut) 拡張機能は 5000 以上のプロンプトを拡張機能内にローカル同梱し、**サイドバー・ポップアップ・独立ウィンドウ**の 3 つの形式で ChatGPT、Gemini、Claude、DeepSeek などのチャットページの横に表示します。aishort.top に戻ってコピー＆ペーストする必要はありません。Chrome、Edge、Firefox に対応し、`Alt + Shift + S` ですばやく呼び出せます。

## インストール方法

### 1. アプリストア（推奨、ワンクリックインストール）

- **Chrome**: [Chrome Web Store](https://chromewebstore.google.com/detail/ai-short-ai-prompt-shortc/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/ai-short-ai-prompt-shor/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/firefox/addon/aishort/)（v4.4.0 以降は Chrome 版と同等です。差分は [Firefox 拡張機能の設定](./firefox-extension-setting) を参照）

### 2. ストアが開けない？ローカルインストールパッケージ

以下のチャンネルからダウンロードし、対応するチュートリアルに従ってインストールしてください。

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 インストールガイド：[CRX ファイル](./manual-chrome-extension) · [ZIP ファイル](./manual-chrome-extension-zip)

## インストール後

`Alt + Shift + S` で呼び出すか、ツールバーのアイコンをクリックします。詳しい使い方は[使用ガイド](./usage)をご覧ください。

## Tampermonkey スクリプト

拡張機能形式に加えて、[**ChatGPT Shortcut Anywhere Tampermonkey スクリプト**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)も提供しています。
Tampermonkey は、ユーザーがカスタムスクリプトを実行して Web ページの機能を強化できるブラウザ拡張機能です。

このスクリプトを使用すると、任意の Web サイトで AiShort サイドバーを呼び出すことができます。
ただし、ChatGPT の公式ページのスクリプト注入制限により、そのページではスクリプトはサイドバーではなく**ポップアップ**として実行されることに注意してください。

AiShort サイドバーを有効化すると、対応ページの右下に緑色のアイコンスイッチが表示されます。このアイコンをクリックすると、サイドバーのオン／オフを切り替えられます。現在、ChatGPT、Gemini、Claude、Doubao などにデフォルトで対応しています。

![](/img/docs/extension-sidebar.webp)
