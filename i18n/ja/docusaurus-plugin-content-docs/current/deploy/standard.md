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

# ビルド：18 言語すべてを分割ビルド（一括だと OOM）。出力は build/ ——1 言語だけなら下の --locale を参照
yarn build
```

> **特定言語のみビルドする場合**：`yarn build --locale <locale>` を使用します（例：`zh-Hans`、`en`、`ja` など。全ロケール一覧は `scripts/i18nLocales.mjs` を参照）。複数指定する場合は連結できます：`yarn build --locale zh-Hans && yarn build --locale en`。

## Vercel デプロイ

下のボタンをクリックして Vercel にワンクリックデプロイします：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **注意**：Vercel の無料プランではメモリ不足によりビルドが失敗する場合があります。その場合は単一言語でデプロイしてください。プロジェクトの **Settings → Build & Deployment → Build Command** で **Override** をクリックし、単一言語コマンドに変更します（中国語の場合は `yarn build --locale zh-Hans`、ポルトガル語の場合は `yarn build --locale pt` など）。

## Cloudflare Pages デプロイ

まず 👉 [このプロジェクトをフォーク](https://github.com/rockbenben/ChatGPT-Shortcut/fork) してから、以下の手順でデプロイします：

1. [Pages 作成ページ](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) を開き、**Connect to Git** を選択します。Create a Worker の画面に着いた場合、Pages の入口は下部の **Get started** です
2. フォークしたリポジトリを接続します
3. ビルド設定を行います：
   - **Build command**：`yarn build --locale zh-Hans`（デプロイしたい言語の locale に変更してください。例：ポルトガル語の場合は `yarn build --locale pt`）
   - **Output directory**：`build`
   - **Environment variables**：`YARN_VERSION` = `1.22.22`
4. **Deploy** をクリックし、Cloudflare Pages のビルド完了を待ちます

> **`YARN_VERSION` は省略できません**：Cloudflare の v3 ビルドシステムは Yarn 4.9.1 が既定で、v2 のように `yarn.lock` からバージョンを推定しなくなりました。本リポジトリは Yarn Classic の v1 lockfile なので、固定しないと Yarn 4 が処理します。Node は設定不要です —— v3 の既定は 22.16.0 で、本プロジェクトが要求する 20 以上を満たしています。

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
