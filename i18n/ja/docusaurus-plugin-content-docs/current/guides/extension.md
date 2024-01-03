# ブラウザ拡張

AiShort（ChatGPT ショートカット）拡張機能は、Chrome、Edge、Firefox、および他の Chromium ベースのブラウザと互換性があります。この拡張機能は、ウェブバージョンの ChatGPT の機能に加えて、サイドバーやウィンドウの自動アクティベーションなどのユニークな機能も備えています。この拡張機能は、ChatGPT またはカスタムページと一緒に自動的に起動し、`Alt+Shift+S`キーで手動でアクティベートすることもサポートしています。以下はダウンロードチャネルです：

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

さらに、私たちは GreaseMonkey スクリプトである「[ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)」も提供しており、ユーザーはドメインをカスタマイズし、任意のウェブサイトで AiShort サイドバーを使用できます。ただし、ChatGPT ページのスクリプトコンテンツの注入制限のため、スクリプトのサイドバー機能は ChatGPT ページではポップアップとしてアクティベートされます。

## 言語オプション

ChatGPT Shortcut は 13 の主要な言語をサポートしており、拡張機能の言語はブラウザの環境に応じて自動的に設定されます。拡張機能内の ChatGPT ビルトインページとサイドバーの言語もこの設定に従います。サードパーティのウェブサイトの権限警告をトリガーしないようにするために、インラインページでの言語の直接変更は避けてください。

![](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## 表示設定

### AiShort サイドバー

AiShort サイドバーを有効にすると、特定のウェブページを訪れるとサイドバーが自動的にアクティベートされます。また、ページの右下にある緑のアイコンをクリックして手動でアクティベートすることもできます。現在、ChatGPT、Bard、Claude、文心一言をサポートしています。

![](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

他のウェブサイトでも AiShort サイドバーを使用したい場合は、「[ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)」スクリプトをインストールしてください。ただし、機能の重複や潜在的な競合を避けるため、ChatGPT Shortcut Anywhere スクリプトはデフォルトでサポートされているウェブサイトでは動作しません。

### 組み込みホームページ

組み込みホームページ機能を有効にすると、ChatGPT ウェブバージョンの左上に組み込みホームボタンが表示されます。クリックすると、AiShort ページが ChatGPT アプリケーションインターフェースを代替します。

![](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## 独立ウィンドウモード

独立ウィンドウモードを有効にすると、拡張機能のインターフェースが独立したウィンドウとして常に表示され、マルチタスク操作が容易になります。拡張機能の設定で自動的にアクティベートするウェブサイトを設定することができます。ブラウザがこれらのウェブサイトにアクセスすると、AiShort ウィンドウが自動的にアクティベートされます。

![](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### 自動的にアクティベートするウェブサイト

拡張機能の設定で、AiShort 独立ウィンドウを自動的にアクティベートするウェブサイトを指定できます。

![](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### ショートカットキーでアクティベート

`Alt+Shift+S`キーを使用して、ポップアップモードまたは独立ウィンドウモードにかかわらず、AiShort ウィンドウを直接アクティベートできます。

## ログインの問題

### ChatGPT インラインページの制限

ChatGPT に

は、インラインページに対する多くの制限があります。その中には、Google アカウントを使用したログインのサポートが含まれていないこともあります。ユーザーはアカウントとパスワードを使用してログインするしかありません。Google アカウントで作成されたアカウントの場合、パスワードを忘れた場合には「パスワードを忘れました」機能を使用して設定できます。

### コンテンツのブロックの表示

アカウントとパスワードでログインした後、ページに「このコンテンツはブロックされています」と表示される場合があります。この場合、ページをシンプルにリフレッシュするだけで問題が解決し、通常のログイン後の状態に戻ります。

## Firefox の設定

Firefox ブラウザの設定は比較的複雑ですが、以下は主要な 2 つの設定手順です：

### 1. 拡張機能のピン留めとアクセス設定

まず、Firefox ツールバーで「ChatGPT Shortcut 拡張機能を固定」（Pin to Toolbar）を選択し、次に拡張機能センターに移動し、ChatGPT Shortcut 拡張機能のエントリを選択し、「オプション」（Options）を選択して拡張機能の設定画面にアクセスします。具体的な手順は次の画像に示されています：

![Firefox settings](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. 拡張機能の許可

次に、拡張機能が ChatGPT、Bard などのウェブサイトで正常に動作することを確認するために、これらのウェブサイトで拡張機能アイコンを右クリックし、「Always allow on ***」を選択して拡張機能にコンテンツの変更とサイドバーの追加の権限を付与する必要があります。

![Firefox Extension Permission](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)
