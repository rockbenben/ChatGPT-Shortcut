<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="./README-en.md">English</a> | <a href="./README.md">中文</a> | 日本語 | <a href="./README-ko.md">한국어</a>
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

User Manual: <https://www.aishort.top/docs/ja/guides/getting-started>

## Browser Extension

ChatGPT Shortcut は Chrome と Edge の両方と互換性があり、ウェブ版と同等の機能を提供し、定期的に更新されます。

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

## Deploy

### Deploy With Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### Installation

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build
```

## Synchronized Updates

If you have deployed your own project on Vercel with a single click, you might encounter an issue where updates are consistently indicated. This arises from Vercel's default behavior of creating a new project for you instead of forking the current project, thereby impeding proper update detection. It is recommended to follow the subsequent steps for re-deployment:

1. Remove the previous repository.
2. Utilize the "fork" button located in the upper right corner of the page to fork the current project.
3. On the [Vercel New Project page](https://vercel.com/new), select the recently forked project from the Import Git Repository section and proceed with deployment.

### Automatic Updates

> In the event of encountering an error during the execution of Upstream Sync, manually perform a single Sync Fork.

Once you have forked the project, due to GitHub restrictions, it is necessary to manually enable Workflows on the Actions page of your forked project and activate the Upstream Sync Action. Upon activation, updates will be automatically executed on a daily basis.

![Automatic Updates](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enabling Automatic Updates](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Manual Updates

If you wish to manually update immediately, you can refer to [GitHub's documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to synchronize the forked project with the upstream code.

Feel free to show support for this project by giving it a star/follow, or by following the author, to stay informed about timely notifications regarding new feature updates.
