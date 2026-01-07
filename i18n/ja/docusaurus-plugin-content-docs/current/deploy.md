---
sidebar_label: デプロイ
title: AI Short デプロイ：Vercel/Docker構築ガイド
description: 自分だけのAIプロンプトライブラリを構築！Vercel、DockerでAI Shortを簡単デプロイ。自動更新設定も解説。
---

# プロジェクトのデプロイ

## 設定とカスタマイズ

AI Short はオープンソースプロジェクトであり、ニーズに合わせてウェブサイトのタイトル、説明、プロンプトなどのコンテンツを自由に変更できます。以下は一般的な変更オプションと操作説明です：

- **ウェブサイトのタイトルと説明の変更**
  ウェブサイトのタイトルと説明情報を変更するには、`docusaurus.config.js` 設定ファイルを編集してください。

- **プロジェクトの使用説明と紹介の変更**
  プロジェクトの使用説明と紹介ファイルは `docs` ディレクトリにあります。そのディレクトリ内の関連ファイルを開いて、必要な変更を行ってください。

- **ホームページのプロンプトの変更**
  ホームページのプロンプトは `src/data/prompt.json` ファイルに保存されています。特定の言語（例えば中国語）のプロンプトを変更する必要がある場合は、`src/data/prompt_es.json` ファイルを直接編集できます。新しいプロンプトを追加する場合の形式は以下の通りです：

  ```json
  {
    "es": {
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
  ```

  **注意**：`id` は 500 以上に設定することをお勧めします。新しく追加されたプロンプトには専用ページやコメントセクションがありません。プロンプトに専用ページを追加する必要がある場合は、`src/data/pages/prompt` ディレクトリのテンプレートファイルをコピーして変更できます。

- **カスタムバックエンド**
  現在のプロジェクトは共有バックエンドシステムに接続されています。独自のバックエンドを構築したい場合は、`src/api` フォルダ内のインターフェース説明を参照できます。

  API モジュール構造：

  ```
  src/api/
  ├── index.ts       # 統一エクスポートエントリ
  ├── config.ts      # API URL 設定
  ├── client.ts      # Axios クライアント（認証インターセプターを含む）
  ├── auth.ts        # 認証 API（ログイン/登録/OAuth）
  ├── prompts.ts     # プロンプト CRUD + 検索 + 投票
  ├── favorites.ts   # お気に入り操作
  ├── myspace.ts     # マイデータを（コアデータソース）
  ├── comments.ts    # コメントシステム
  └── user.ts        # ユーザー情報
  ```

  **キャッシュメカニズム**：プロジェクトは `lscache` と ETag を組み合わせてスマートキャッシュを実装しています。サーバーが 304 Not Modified を返すと、ローカルキャッシュデータを直接再利用し、データ転送を削減します。

- **多言語サポートとデプロイ**
  多言語の修正が完了したら、`CodeUpdateHandler.py` スクリプトを使用してバッチ処理を行うことができます。以下のコマンドを実行してください：

  ```bash
  python CodeUpdateHandler.py
  ```

  このスクリプトは、事前設定されたルールに従って `prompt.json` ファイルを分割し、各言語バージョンのメインページと注目のプロンプトページを同期的に更新します。

## デプロイ説明

システム要件：

- [Node.js 20.0](https://nodejs.org/) 以降。
- macOS、Windows (WSL を含む)、および Linux がサポートされています。

### ローカルデプロイ

[Node.js](https://nodejs.org/) がインストールされていることを確認してください。

```shell
# インストール
yarn

# ローカル開発
yarn start

# ビルド：このコマンドは静的コンテンツを `build` ディレクトリに生成します
yarn build

# `docusaurus.config.js` ファイルの `defaultLocale` を更新し、希望する言語のビルドを実行します。
yarn build --locale zh-Hans
yarn build --locale zh-Hant
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

# 複数言語のデプロイ
yarn build --locale zh-Hans && yarn build --locale en
```

### Vercel デプロイ

下のボタンをクリックして、ChatGPT-Shortcut を Vercel プラットフォームにワンクリックでデプロイします：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**注意**：Vercel の無料版ではメモリ不足によりエラーが発生する場合があります。このような状況に遭遇した場合は、単一言語のデプロイを選択できます。具体的な操作は以下の通りです：

1. デプロイしたばかりの Vercel プロジェクトに入り、**Settings** を開きます。
2. **Build & Deployment** セクションで **Build Command** を見つけ、右側の **Override** をクリックします。
3. デプロイコマンドを変更します。例えば、中国語バージョンをデプロイする必要がある場合は `yarn build --locale zh-Hans` を使用し、ポルトガル語バージョンをデプロイする必要がある場合は `yarn build --locale pt` を使用します。

### Cloudflare Pages デプロイ

下のボタンまたはリンクをクリックして、このプロジェクトをフォークした後、説明に従って Cloudflare Pages にデプロイします：

👉 [このプロジェクトをフォーク](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

デプロイ手順：

1. [Cloudflare Pages](https://pages.cloudflare.com/) にログインし、**"Create a project"** を選択します。
2. フォークしたばかりのリポジトリをバインドします。
3. ビルドコマンドを設定します：
   - **Build command**：`yarn build --locale zh-Hans`（デプロイする言語に基づいて適切な locale を選択してください。例：ポルトガル語の場合は `yarn build --locale pt`）。
   - **Output directory**：`build`。
4. **Deploy** をクリックし、Cloudflare Pages がビルドとデプロイを完了するのを待ちます。

Cloudflare Pages は、新しいコードをプッシュするたびに自動的にビルドとデプロイをトリガーします。

### Docker デプロイ

Docker に詳しい場合は、以下のコマンドを使用して素早くデプロイできます：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

または、`docker-compose` を使用することもできます：

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 同期更新の有効化

Vercel で自分のプロジェクトをワンクリックデプロイした場合、更新が利用可能であるというプロンプトが常に表示される問題が発生する可能性があります。これは、Vercel がデフォルトでこのプロジェクトをフォークするのではなく新しいプロジェクトを作成するため、更新を正しく検出できないことが原因です。以下の手順に従って再デプロイすることをお勧めします：

1. 元のリポジトリを削除します；
2. ページ右上のフォークボタンを使用して、このプロジェクトをフォークします；
3. [Vercel 新規プロジェクトページ](https://vercel.com/new) の Import Git Repository で、フォークしたばかりのプロジェクトを再選択してデプロイします。

### 自動更新をオンにする

> Upstream Sync 実行エラーが発生した場合は、手動で Sync Fork を一度実行してください！

プロジェクトをフォークした後、GitHub の制限により、フォークしたプロジェクトの Actions ページで Workflows を手動で有効にし、Upstream Sync Action を有効にする必要があります。有効にすると、更新は毎日自動的に実行されます：

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![自動更新を有効化](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手動コード更新

手動ですぐに更新したい場合は、[GitHub のドキュメント](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) を参照して、フォークしたプロジェクトをアップストリームコードと同期する方法を確認してください。

このプロジェクトにスター/ウォッチを付けるか、著者をフォローして、新機能の更新通知をタイムリーに受け取ることができます。
