# ブラウザ拡張機能

AiShort（ChatGPT Shortcut）は、Chrome、Edge、その他の Chromium ベースのブラウザ用の拡張機能です。ウェブ版と同様の機能を提供するだけでなく、サイドバーや自動アクティベーションウィンドウなど、いくつかの追加機能も備えています。この拡張機能は、ChatGPT や指定されたカスタムページがロードされると自動的に起動することができ、また `Alt+Shift+S` キーで手動でアクティベートすることもできます。

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

Chrome や Edge 以外のブラウザを使用している場合、または最新機能を体験したい場合は、開発版の拡張機能を試すことができます。ダウンロードアドレス：[開発版拡張機能のダウンロード](https://github.com/rockbenben/ChatGPT-Shortcut/releases)。また、Chrome 系ではないブラウザのユーザーは、[ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) の油猴スクリプトをインストールして、ChatGPT Shortcut のサイドバー機能を使用することができます。

## 言語オプション

ChatGPT Shortcut は 13 種類の主要言語をサポートしており、拡張機能の言語はブラウザの環境に応じて自動的に設定されます。拡張機能内の ChatGPT 内蔵ページやサイドバーの言語もこの設定に従います。埋め込みページで直接言語を変更すると、第三者サイトのアクセス権限警告が発生する可能性があるため、注意してください。

![](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## 表示設定

### AiShort サイドバー

AiShort サイドバーを有効にすると、特定のウェブページを訪れる際にサイドバーが自動的にアクティブになります。また、ページ右下隅の緑色アイコンをクリックすることで手動でアクティブにすることもできます。現在、ChatGPT、Bard、Claude、文心一言にサイドバーが表示されます。他のウェブサイトで AiShort サイドバーを使用したい場合は、[ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) スクリプトをインストールしてください。

![](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

### 組み込みホームページ

組み込みホームページ機能を有効にすると、ChatGPT ウェブ版の左上隅に内蔵ホームページボタンが表示されます。このボタンをクリックすると、AiShort ページが ChatGPT アプリのインターフェースを置き換えます。

![](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## 独立ウィンドウモード

独立ウィンドウモードを有効にすると、拡張機能のインターフェースが独立したウィンドウとして持続的に表示され、マルチタスク操作が容易になります。ブラウザが特定のサイトを訪れると、AiShort ウィンドウが自動的にアクティブになるように、拡張設定で自動アクティベーションサイトを設定することができます。

![](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### 自動アクティベーションサイト

拡張機能の設定で、AiShort 独立ウィンドウを自動的にアクティブにするウェブサイトを指定できます。

![](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### ホットキーによるアクティベーション

`Alt+Shift+S` のホットキーを使用して、AiShort ウィンドウを直接アクティブにすること

ができます。これはポップアップモードと独立ウィンドウモードの両方で使用できます。
