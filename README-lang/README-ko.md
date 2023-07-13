<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
<a href="./README-es.md">Español</a> |
<a href="./README-ja.md">日本語</a> |
한국어 |
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

🚀 **프로세스 최적화**: AiShort 는 사용자가 작업 절차를 정밀화하는데 도움을 주는 명확하고 알기 쉬운 명령어 목록을 제시합니다. 이를 통해 다양한 상황에 적합한 유용한 정보를 빠르게 정렬하고 검색할 수 있습니다.

💻 **생산성 향상**: 우리의 최적화된 명령어를 활용하면 사용자는 더 정확하고 실질적인 피드백을 받을 수 있습니다. 이로써 그들의 생산 효율성을 증가시키는데 기여할 수 있습니다.

🌍 **비영어권 언어 최적화**: 명령어는 주로 영어로 표시되지만, 우리는 중국어, 일본어, 한국어 등 다양한 언어의 번역을 통합하였습니다. 또한, 현재 언어로의 기본 반응을 지원함으로써, 비영어권 사용자가 이해하고 활용하는데 도움을 줄 수 있습니다.

🎓 **초보자 친화적**: 초보자들은 단순히 명령어를 복사하고 약간 수정하여 ChatGPT 에 전송함으로써 원하는 결과를 쉽게 얻을 수 있습니다.

🆕 **정기적인 업데이트**: AiShort 의 명령어는 세밀하게 선별된 온라인 선택, 사용자 제출, 그리고 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)에서 파생되었습니다. 이들은 사용자에게 새로운 명령어와 지적 자극을 제공하기 위해 주기적으로 업데이트됩니다.

📦 **사용 준비 완료**: <https://www.aishort.top/ko/>에서 우리를 방문하세요.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

사용 지침: <https://www.aishort.top/ko/docs/guides/getting-started>

## Browser Extension

ChatGPT 단축키는 Chrome 과 Edge 모두와 호환되며, 웹 버전과 동일한 기능을 제공하며 주기적으로 업데이트를 받습니다.

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

## 배포

### Vercel 을 통한 배포

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### 설치

```shell
# 설치하기
yarn

# 로컬 개발 시작
yarn start

# 빌드: 이 명령어는 `build` 디렉토리에 정적 컨텐츠를 생성합니다.
yarn build
```

## 동기화된 업데이트

한 번의 클릭으로 Vercel 에서 자체 프로젝트를 배포했다면, 일관성 있게 업데이트가 표시되는 문제에 부딪힐 수 있습니다. 이는 Vercel 이 기본적으로 현재 프로젝트를 포크하는 대신 새 프로젝트를 생성하기 때문에 발생하며, 이로 인해 적절한 업데이트 탐지가 방해받을 수 있습니다. 재배포를 위해 아래 단계를 따르는 것이 권장됩니다:

1. 이전 저장소를 제거합니다.
2. 페이지 우측 상단에 위치한 "포크" 버튼을 이용해 현재 프로젝트를 포크합니다.
3. [Vercel New Project page](https://vercel.com/new)에서 Import Git Repository 섹션을 통해 최근에 포크한 프로젝트를 선택하고 배포를 진행합니다.

### 자동 업데이트

> Upstream Sync 실행 중 오류가 발생한 경우, 수동으로 Sync Fork 를 한 번 실행하세요.

프로젝트를 포크한 후, GitHub 의 제한으로 인해, 포크한 프로젝트의 Actions 페이지에서 Workflows 를 수동으로 활성화하고 Upstream Sync Action 을 활성화해야 합니다. 활성화 후, 업데이트는 매일 자동으로 실행됩니다.

![자동 업데이트](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![자동 업데이트 활성화](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 수동 업데이트

즉시 수동 업데이트를 원한다면, [GitHub 의 문서](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)를 참조하여 포크한 프로젝트를 업스트림 코드와 동기화하는 방법을 알아볼 수 있습니다.

이 프로젝트에 대한 지원을 보여주기 위해 별표/팔로우를 하거나, 작성자를 팔로우하여 새로운 기능 업데이트에 대한 실시간 알림을 받을 수 있습니다.
