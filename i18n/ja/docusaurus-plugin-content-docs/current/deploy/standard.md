---
sidebar_label: スタンダードデプロイ
title: AI Short スタンダードデプロイ｜ローカルビルド、Vercel、Cloudflare、Docker
description: AI Short のスタンダードデプロイガイド。公式共有バックエンドを再利用し、ローカルビルド、Vercel ワンクリックデプロイ、Cloudflare Pages、Docker に対応。そのまますぐに利用できます。
---

# スタンダードデプロイ

公式共有バックエンドを再利用し、そのまま動作します。まずプロジェクトをフォークし、以下のいずれかの方法でデプロイしてください。

**要件**：[Node.js 20.0](https://nodejs.org/) 以降。macOS、Windows（WSL を含む）、または Linux。

![スタンダードデプロイの構成図：フォーク後、ローカルビルド、Vercel、Cloudflare Pages、または Docker のいずれかでデプロイでき、いずれも公式の共有バックエンド（ログイン、コレクション、コミュニティ、コメント、デバイス間同期）を再利用します。](/img/docs/standard-deploy-topology.svg)

## ローカルビルド

```shell
# 依存関係のインストール
yarn

# ローカル開発
yarn start

# ビルド：静的ファイルを build ディレクトリに出力。使用言語は scripts/i18nLocales.mjs の defaultLocale に従う
yarn build
```

> **特定言語のみビルドする場合**：`yarn build --locale <locale>` を使用します（例：`zh-Hans`、`en`、`ja` など。全ロケール一覧は `scripts/i18nLocales.mjs` を参照）。複数指定する場合は連結できます：`yarn build --locale zh-Hans && yarn build --locale en`。

## Vercel デプロイ

下のボタンをクリックして Vercel にワンクリックデプロイします：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **注意**：Vercel の無料プランではメモリ不足によりビルドが失敗する場合があります。その場合は単一言語でデプロイしてください。プロジェクトの **Settings → Build & Deployment → Build Command** で **Override** をクリックし、単一言語コマンドに変更します（中国語の場合は `yarn build --locale zh-Hans`、ポルトガル語の場合は `yarn build --locale pt` など）。

## Cloudflare Pages デプロイ

まず 👉 [このプロジェクトをフォーク](https://github.com/rockbenben/ChatGPT-Shortcut/fork) してから、以下の手順でデプロイします：

1. [Cloudflare Pages](https://pages.cloudflare.com/) にサインインし、**Create a project** を選択します
2. フォークしたリポジトリを接続します
3. ビルド設定を行います：
   - **Build command**：`yarn build --locale zh-Hans`（デプロイしたい言語の locale に変更してください。例：ポルトガル語の場合は `yarn build --locale pt`）
   - **Output directory**：`build`
4. **Deploy** をクリックし、Cloudflare Pages のビルド完了を待ちます

以降はコードをプッシュするたびに自動でビルドとデプロイがトリガーされます。

## Docker デプロイ

ワンライナーでデプロイ：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

または `docker-compose` を使用する場合：

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
