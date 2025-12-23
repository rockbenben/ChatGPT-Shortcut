---
sidebar_label: Chrome CRX インストールガイド
title: Chrome手動インストール：CRXファイル版導入ガイド
description: 開発者モードを使ってCRXファイルを簡単インストール。ドラッグ＆ドロップで導入する手順と、よくあるトラブルの解決策を紹介。
---

# Chrome CRX 拡張機能ローカルインストールガイド

## CRX インストールパッケージのダウンロード

ChatGPT Shortcut crx インストールパッケージ（ChatGPT_Shortcut-crx-3.x.x.zip）をダウンロードし、解凍します（crx ファイルは解凍したフォルダの中にあります）。

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **国内ダウンロード**: [Alist クラウドドライブ](https://alist.newzone.top:9003/apps/ChatGPT%20Shortcut%20Extension)；[藍奏雲](https://wwva.lanzouq.com/b01lsc9vi), パスワード: 1qow

![](https://img.newzone.top/2024-08-12-21-47-10.png?imageMogr2/format/webp)

## 開発者モードを有効にする

Chrome の「拡張機能を管理」ページを開き、「デベロッパーモード」をオンにします。

以下のアドレスをコピーしてブラウザのアドレスバーに貼り付け、Enter キーを押して開きます。ページの右上隅にある「デベロッパーモード」をオンにします。

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## 拡張機能をインストール

ChatGPT Shortcut 拡張機能をインストールします（注意 ⚠️：.crx ファイルをドラッグする必要があります。【パッケージ化されていない拡張機能を読み込む】をクリックしないでください）

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

インストールが成功したら、[プラグイン使用チュートリアル](./usage.md)を確認できます。

## インストールに問題がありますか？

1. Windows ユーザー：ダウンロードしたインストールパッケージを解凍しましたか（ダブルクリックして開くのではなく）？

2. 「デベロッパーモード」はオンになっていますか？オンになっていない場合は、ステップ 2 の操作を参照してください。

3. crx ファイルを「拡張機能」ページにドラッグしましたか？注意 ⚠️：【パッケージ化されていない拡張機能を読み込む】をクリックしないでください。crx ファイルをドラッグする必要があります。

4. ブラウザが crx ファイルのインストールを許可していませんか？zip ファイルのインストールを試してください！[zip インストールチュートリアルを表示するにはここをクリック](./manual-chrome-extension-zip.md)。
