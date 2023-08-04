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

AiShort 는 간결하면서 사용하기 쉬운 AI 명령어 리스트를 제공합니다. 프롬프트에 대한 이해가 없어도, 필터링과 검색을 통해 다양한 상황에 적합한 프롬프트를 쉽게 찾을 수 있어 생산성 향상에 도움이 됩니다.

🚀 **원클릭 프롬프트**: 한 번의 클릭만으로 전문가들이 세심하게 선택한 다양한 프롬프트를 얻을 수 있습니다. 이들을 AI 언어 모델인 ChatGPT 에 보내면 예상한 출력을 얻을 수 있습니다.

💻 **생산성 향상**: 최적화된 프롬프트를 사용하면 더 정확하고 실용적인 피드백을 얻을 수 있어, 작업 효율을 효과적으로 향상시킵니다.

🌍 **비영어권 언어 최적화**: 우리는 12 개의 주요 글로벌 언어로 영어 프롬프트의 번역을 제공하며, 모국어로의 기본 응답을 지원합니다. 이는 비영어권 사용자가 이해하고 사용하는 데 편리합니다.

💾 **프롬프트 저장**: 앞으로 사용할 수 있도록 좋아하는 프롬프트를 편리하게 수집, 편집, 관리할 수 있습니다.

🌐 **프롬프트 공유**: 좋아하는 프롬프트를 공유하고, 다른 사람과 협업하고, 더 많은 아이디어를 불러일으킵니다.

🗳️ **커뮤니티 투표 시스템**: Product Hunt 이나 Reddit 과 비슷하게, 플랫폼은 커뮤니티 주도입니다. 최고의 프롬프트는 홈페이지로 밀려납니다.

📦 **사용 준비 완료**: 바로 <https://www.aishort.top/ko/>을 방문하여 사용을 시작하세요.

AiShort 프롬프트의 출처는 인터넷 선택, 커뮤니티 공유, 그리고 [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)를 포함합니다. 우리는 규칙적으로 새로운 프롬프트와 영감을 제공하기 위해 업데이트할 것입니다. AiShort 를 사용하는 방법에 대해 알아보려면, [사용자 매뉴얼](https://www.aishort.top/ko/docs/guides/getting-started)을 참조하십시오.

아이디어와 피드백을 교환하기 위해 우리의 디스코드 커뮤니티에 참여하십시오.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## 브라우저 확장

AiShort (ChatGPT Shortcut) 브라우저 확장은 Chrome 과 Edge 를 지원하며, 웹 버전과 기능이 일치하며 규칙적으로 업데이트됩니다. 확장은 ChatGPT 페이지가 로드될 때 자동으로 트리거될 수 있으며, `Alt+Shift+S` 핫키를 눌러 확장 창을 활성화할 수 있습니다.

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
