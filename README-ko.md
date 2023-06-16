<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="./README-en.md">English</a> | <a href="./README.md">中文</a> | <a href="./README-ja.md">日本語</a> | 한국어
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Why use AiShort?

🚀 **프로세스 최적화**: AiShort 는 사용자가 작업 절차를 정밀화하는데 도움을 주는 명확하고 알기 쉬운 명령어 목록을 제시합니다. 이를 통해 다양한 상황에 적합한 유용한 정보를 빠르게 정렬하고 검색할 수 있습니다.

💻 **생산성 향상**: 우리의 최적화된 명령어를 활용하면 사용자는 더 정확하고 실질적인 피드백을 받을 수 있습니다. 이로써 그들의 생산 효율성을 증가시키는데 기여할 수 있습니다.

🌍 **비영어권 언어 최적화**: 명령어는 주로 영어로 표시되지만, 우리는 중국어, 일본어, 한국어 등 다양한 언어의 번역을 통합하였습니다. 또한, 현재 언어로의 기본 반응을 지원함으로써, 비영어권 사용자가 이해하고 활용하는데 도움을 줄 수 있습니다.

🎓 **초보자 친화적**: 초보자들은 단순히 명령어를 복사하고 약간 수정하여 ChatGPT 에 전송함으로써 원하는 결과를 쉽게 얻을 수 있습니다.

🆕 **정기적인 업데이트**: AiShort 의 명령어는 세밀하게 선별된 온라인 선택, 사용자 제출, 그리고 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)에서 파생되었습니다. 이들은 사용자에게 새로운 명령어와 지적 자극을 제공하기 위해 주기적으로 업데이트됩니다.

📦 **사용 준비 완료**: <https://www.aishort.top/ko/>에서 우리를 방문하세요.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

User Manual: <https://www.aishort.top/docs/ko/guides/getting-started>

## Browser Extension

ChatGPT 단축키는 Chrome 과 Edge 모두와 호환되며, 웹 버전과 동일한 기능을 제공하며 주기적으로 업데이트를 받습니다.

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
