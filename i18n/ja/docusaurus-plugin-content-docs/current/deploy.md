# デプロイ

## Vercel を用いたデプロイ

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## インストール

```shell
# インストール
yarn

# ローカル開発
yarn start

# ビルド: このコマンドは `build` ディレクトリに静的な内容を生成します
yarn build
```

## 同期更新

一度 Vercel にてプロジェクトをデプロイしたのち、更新が適切に反映されない問題が発生することがあります。これは、Vercel が新たにプロジェクトを作成するデフォルトの挙動が原因で、現行プロジェクトをフォークする代わりに新たなプロジェクトを作成してしまいます。適切な更新検出を促すために、再デプロイに以下の手順を推奨します：

1. 既存のリポジトリを削除します。
2. ページ右上部に位置する "fork" ボタンを利用し、現行プロジェクトをフォークします。
3. [Vercel 新規プロジェクトページ](https://vercel.com/new)にて、Git リポジトリからインポート部分で先ほどフォークしたプロジェクトを選択し、デプロイを進行します。

### 自動更新

> アップストリーム同期の実行中にエラーに遭遇した場合は、手動で一度だけ同期フォークを行ってください。

プロジェクトをフォークした後、GitHub の制限により、フォークしたプロジェクトの Actions ページで Workflows を手動で有効にし、アップストリーム同期アクションを活性化する必要があります。活性化後、更新は日常的に自動で実行されます。

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![自動更新の有効化](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 手動更新

即座に手動で更新を行いたい場合は、[GitHub のドキュメンテーション](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)を参照し、フォークしたプロジェクトをアップストリームコードと同期させる方法を学ぶことができます。

本プロジェクトに対するサポートを示すために、星を付ける/フォローする、あるいは作者をフォローして、新機能のアップデートに関するタイムリーな通知を受け取ることができます。
