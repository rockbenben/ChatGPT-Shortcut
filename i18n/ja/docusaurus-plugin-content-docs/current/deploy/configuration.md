---
sidebar_label: 設定とカスタマイズ
title: AI Short 設定とカスタマイズ｜タイトル・プロンプトの変更、カスタムバックエンド
description: AI Short をカスタマイズ。サイトタイトルと説明の変更、ホームページプロンプトの追加、カスタムバックエンドの接続。API モジュール構造とキャッシュ機構の解説付き。
---

# 設定とカスタマイズ

AI Short はオープンソースです。サイトタイトル・説明・プロンプトなどを自由に変更できます。

## サイトタイトルと説明

`docusaurus.config.js` を編集してください。

## ドキュメントとガイド

`docs/` 配下の対応ファイルを編集してください。

## ホームページのプロンプト

ソースデータは `src/data/prompt.json` にあります。配列形式で、各オブジェクトが言語コード（`zh` / `en` / `ja` など）をキーとして全言語版を保持しています。プロンプト追加時のフォーマット：

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
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

編集後、`python CodeUpdateHandler.py` を実行してください。このスクリプトは `prompt.json` を言語ごとの `prompt_<locale>.json` ファイルに分割し、各言語のホームページおよびキュレーテッドプロンプトページを更新します。

![データパイプライン：マスターの prompt.json を python CodeUpdateHandler.py で処理し、言語ごとの prompt ファイルに分割して各 id のカード JSON と詳細ページを生成、OpenCC による簡体字から繁体字への変換も行う](/img/docs/data-pipeline.svg)

> **注意**：既存のプロンプトやコミュニティコンテンツとの ID 衝突を避けるため、`id` は 500 以上に設定してください。`python CodeUpdateHandler.py` を実行すると、新しく追加したものを含むすべてのプロンプトについてカードデータと詳細ページが自動生成され、手動でページファイルを作成する必要はありません。カスタムプロンプトはデフォルトでは厳選メタディスクリプションとコメントデータを持ちません。

## カスタムバックエンド

デフォルトでは共有バックエンドに接続します（ログイン・お気に入り・コミュニティ・コメント・クロスデバイス同期はすべてこれに依存します）。`src/api` にインターフェース仕様が完全にドキュメント化されており参照できます。バックエンドサービス自体はオープンソースではありません。**独自バックエンドを持つ完全セルフホスト型デプロイ**については、[デプロイメントモデルの選択](../deploy#デプロイメントモデルの選択)を参照してください。

API モジュール構造：

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

キャッシュ：API データは `lscache` と ETag を組み合わせてスマートキャッシュされます。サーバーが 304 Not Modified を返すとローカルキャッシュを再利用し、データ転送量を削減します。
