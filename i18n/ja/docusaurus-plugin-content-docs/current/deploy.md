---
sidebar_label: デプロイ
title: デプロイ & カスタマイズガイド | AI Shortを簡単に設定
description: AI Shortプロジェクトを迅速にデプロイし、カスタマイズする方法を学びます。このガイドでは、Vercel、Cloudflare、Docker、ローカルでのデプロイに加え、コンテンツの編集方法や自動更新の有効化について説明します。
---

# プロジェクトのデプロイ

## 設定とカスタマイズ

AI Short はオープンソースプロジェクトであり、サイトのタイトル、説明、プロンプトなどを自由に変更できます。以下は一般的なカスタマイズオプションです：

- **サイトのタイトルと説明を編集する**  
    `docusaurus.config.js`ファイルを更新します。

- **使用方法とドキュメントを編集する**  
    すべてのドキュメントファイルは`docs`ディレクトリにあります。必要に応じて関連ファイルを開いて変更してください。

- **ホームページのプロンプトを編集する**  
    ホームページのプロンプトは`src/data/prompt.json`に保存されています。  
    特定の言語（例：中国語）の場合は、`src/data/prompt_zh.json`を編集します。  
    新しいプロンプトのフォーマット例：

`json
  {
    "zh": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  `

**注**：新しいプロンプトには`id >= 500`を使用してください。これらには専用ページやコメントはありません。
専用ページが必要な場合は、`src/data/pages/prompt`からテンプレートファイルをコピーして変更してください。

- **カスタムバックエンド**
    プロジェクトは現在、共有バックエンドにリンクされています。
    独自のバックエンドを設定するには、`src/api.js`で API の詳細を確認してください。

- **多言語対応**
    言語ファイルを更新した後、`CodeUpdateHandler.py`スクリプトを実行して一括処理します：

`bash
  python CodeUpdateHandler.py
  `

このスクリプトは`prompt.json`を分割し、各言語のメインおよび特集プロンプトページに更新を同期します。

## デプロイガイド

**システム要件**：

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (WSL を含む), または Linux

### ローカルでのデプロイ

[Node.js](https://nodejs.org/)がインストールされていることを確認してください。

```bash
# 依存関係をインストール
yarn

# ローカル開発
yarn start

# 静的ファイルをビルド
yarn build

# 複数ロケール用にビルド
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# 例：2つの言語でビルド
yarn build --locale zh && yarn build --locale en
```

### Vercel でのデプロイ

下のボタンをクリックして、ワンクリックで ChatGPT-Shortcut を Vercel にデプロイします：

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**注**：無料の Vercel プランではメモリが不足する可能性があります。その場合は、単一言語のみをデプロイしてください。

手順：

1.  デプロイした Vercel プロジェクトに移動 → **Settings**。
2.  **Build & Deployment**で**Build Command**を見つけ → **Override**をクリック。
3.  ビルドコマンドを設定します。例：

- 中国語の場合：`yarn build --locale zh`
     - ポルトガル語の場合：`yarn build --locale pt`

### Cloudflare Pages でのデプロイ

👉 [リポジトリをフォーク](https://github.com/rockbenben/ChatGPT-Shortcut/fork)し、Cloudflare Pages 経由でデプロイします：

1.  [Cloudflare Pages](https://pages.cloudflare.com/)にログインし、**Create a project**を選択します。
2.  フォークしたリポジトリを接続します。
3.  ビルド設定を構成します：

- **Build command**: `yarn build --locale zh`（または他の言語）
     - **Output directory**: `build`

4.  デプロイし、ビルドが完了するのを待ちます。

新しいコミットをプッシュすると、Cloudflare Pages は自動的に再デプロイします。

### Docker でのデプロイ

Docker で実行：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

または`docker-compose`を使用：

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 自動更新を有効にする

ワンクリックで Vercel にデプロイした場合、「更新が利用可能です」と頻繁に表示されることがあります。
これは、Vercel がフォークではなく新しいリポジトリを作成するため、同期が壊れるためです。

**修正方法：**

1. 古いリポジトリを削除します。
2. このプロジェクトを直接フォークします（フォークボタンを使用）。
3. [Vercel の新しいプロジェクトページ](https://vercel.com/new)からフォークを再デプロイします。

### 自動更新

> **Upstream Sync**でエラーが表示される場合は、**Sync Fork**を一度手動で実行してください。

フォーク後、GitHub では手動でワークフローを有効にする必要があります：

- フォークしたリポジトリの**Actions**に移動します
- ワークフロー、特に**Upstream Sync Action**を有効にします。

これにより、毎日上流の更新がプルされます。

### 手動更新

即時更新については、フォークの同期に関する[GitHub ドキュメント](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)を確認してください。

⭐ このプロジェクトにスターを付けるか、👀 ウォッチするか、作者をフォローして新機能の通知を受け取りましょう。
