<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
<a href="./README-es.md">Español</a> |
日本語 |
<a href="./README-ko.md">한국어</a> |
<a href="./README-fr.md">Français</a> |
<a href="./README-de.md">Deutsch</a> |
<a href="./README-it.md">Italiano</a> |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Why use AiShort?

🚀 **プロセスの効率化**: AiShort は、使用者が業務手順を洗練する助けとなる、多様な状況に対応した適切なプロンプトの簡潔な指示リストを提示します。

💻 **生産性の向上**: 最適化されたプロンプトを利用することで、ユーザーはより正確で実用的なフィードバックを得ることができ、生産効率が向上します。

🌍 **非英語言語向けの最適化**: プロンプトは主に英語で表示されますが、中国語、日本語、韓国語など他の言語への翻訳を統合しています。さらに、現在の言語でのデフォルトの応答をサポートしており、非英語母語話者が理解し利用するのを容易にします。

🎓 **初心者に優しい**: 初心者のために、プロンプトを単純にコピーし、ChatGPT に送る前にわずかに調整するだけで、求めている出力を容易に得ることができます。

🆕 **定期的な更新**: AiShort のプロンプトは、厳選されたオンラインの選択肢、ユーザーの提出、そして[Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)から派生しています。これらは定期的に更新され、ユーザーに新鮮なプロンプトと知的刺激を提供します。

📦 **すぐに使用可能**: 以下の URL からご覧ください <https://www.aishort.top/ja/>

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

使用説明書：<https://www.aishort.top/ja/docs/guides/getting-started>

## Browser Extension

ChatGPT Shortcut は Chrome と Edge の両方と互換性があり、ウェブ版と同等の機能を提供し、定期的に更新されます。

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

## デプロイ

### Vercel を用いたデプロイ

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### インストール

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
