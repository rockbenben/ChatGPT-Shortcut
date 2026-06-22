---
sidebar_label: 同期更新をオンにする
title: AI Short 同期更新｜フォークをアップストリームに自動追従
description: AI Short のフォークをアップストリームの更新に自動追従させます。Vercel デプロイで更新が通知されない問題を解決し、GitHub Actions の自動同期をオンにします。
---

# 同期更新をオンにする

Vercel でワンクリックデプロイを行った場合、「更新あり」のプロンプトが常に表示される問題が発生することがあります。これは Vercel がフォークではなく新規プロジェクトを作成するため、アップストリームの更新を検出できないことが原因です。修正手順：

1. 元のリポジトリを削除します
2. ページ右上の **Fork** ボタンを使ってこのプロジェクトをフォークします
3. [Vercel 新規プロジェクトページ](https://vercel.com/new) の Import Git Repository でフォークしたリポジトリを再インポートしてデプロイします

## 自動更新をオンにする

> Upstream Sync 実行エラーが発生した場合は、手動で Sync Fork を一度実行してください！

フォーク後、Actions ページで Workflows を手動で有効にし、Upstream Sync アクションを一度実行してください。有効にすると、プロジェクトは毎日自動的に同期されます：

![自動更新](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![自動更新を有効化](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## 手動更新

すぐに手動で更新したい場合は、[GitHub のフォーク同期ドキュメント](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)を参照してください。

このプロジェクトにスター／ウォッチを付けると、新機能の通知を受け取ることができます。
