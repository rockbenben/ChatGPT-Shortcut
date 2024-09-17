# デプロイ

AI Short はオープンソース プロジェクトです。Web サイトの名前と説明を自由に変更できます。

- ページ名を変更するには、`docusaurus.config.js` ファイルを編集します。

- 手順を変更するには、`docs` ディレクトリに移動します。

- プロンプトの単語を変更するには、`src/data/prompt.json` で見つけることができます。中国語など、1 つの言語のみを変更する必要がある場合は、`src/data/prompt_zh.json` を直接編集できます。

- 現在、ユーザー バックエンドは共通のバックエンド システムに接続されています。必要に応じて、独自のバックエンドを構築できます。関連するインターフェイスは `src/api.js` ファイルにあります。

`CodeUpdateHandler.py` は、多言語展開をバッチ処理するためのスクリプトです。変更が完了したら、`python CodeUpdateHandler.py` を実行します。これにより、`prompt.json` がルールに従って複数の言語に分割され、各言語のメイン ページ コードと選択したプロンプト ワードの独立ページ コードが同期されます。

## デプロイ

### Vercel でデプロイ

以下のボタンをクリックすると、ChatGPT-Shortcut がワンクリックで Vercel プラットフォームにデプロイされます：

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

Vercel を使用すると、プロジェクトをすばやくホストし、ビルドとデプロイを自動的に処理できるため、複雑なサーバー構成要件がないユーザーに適しています。

### ローカル デプロイメント

[Node.js](https://nodejs.org/) がインストールされていることを確認してください。

```shell
# インストール
yarn

# ローカル開発
yarn start

# ビルド: このコマンドは、`build` ディレクトリに静的コンテンツを生成します
yarn build

# `docusaurus.config.js` ファイル内の `defaultLocale` を更新し、目的の言語でビルドを実行します。
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

# 複数の言語にデプロイ
yarn build --locale zh && yarn build --locale en
```

### Docker デプロイ

Docker に精通している場合は、次のコマンドで簡単にデプロイできます：

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

または、`docker-compose` を使用することもできます：

```yml
version: "3.8"

services:
docsify:
container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: unused-stopped
```

## 同期更新

Vercel に独自のプロジェクトを 1 回のクリックでデプロイした場合、更新が一貫して表示される問題が発生する可能性があります。これは、現在のプロジェクトをフォークするのではなく、新しいプロジェクトを作成するという Vercel のデフォルトの動作によって発生し、適切な更新検出が妨げられます。再デプロイには、次の手順に従うことをお勧めします：

1. 以前のリポジトリを削除します。
2. ページの右上隅にある「フォーク」ボタンを使用して、現在のプロジェクトをフォークします。

3. [Vercel の新規プロジェクト ページ](https://vercel.com/new) で、[Git リポジトリのインポート] セクションから最近フォークしたプロジェクトを選択し、デプロイを続行します。

### 自動更新

> Upstream Sync の実行中にエラーが発生した場合は、手動で 1 回の Sync Fork を実行します。

プロジェクトをフォークしたら、GitHub の制限により、フォークしたプロジェクトの [アクション] ページでワークフローを手動で有効にし、Upstream Sync アクションをアクティブ化する必要があります。アクティブ化すると、更新は毎日自動的に実行されます。

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![自動更新の有効化](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手動更新

すぐに手動で更新したい場合は、[GitHub のドキュメント](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)を参照して、フォークしたプロジェクトをアップストリーム コードと同期する方法を確認してください。

このプロジェクトにスター/フォローを付けたり、作者をフォローしたりして、新機能の更新に関する通知をタイムリーに受け取るなど、このプロジェクトへのサポートを表明してください。
