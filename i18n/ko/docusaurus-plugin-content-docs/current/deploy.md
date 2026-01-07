---
sidebar_label: 프로젝트 배포
title: AI Short 배포 - Vercel/Docker 원클릭 구축
description: 나만의 AI 프롬프트 라이브러리 구축! Vercel, Docker로 AI Short를 쉽게 배포하고 자동 업데이트 설정까지 완벽 가이드.
---

# 프로젝트 배포

## 설정 및 커스터마이징

AI Short는 오픈 소스 프로젝트로, 필요에 따라 웹사이트 제목, 설명, 프롬프트 등의 콘텐츠를 자유롭게 수정할 수 있습니다. 다음은 일반적인 수정 옵션 및 조작 설명입니다.

- **웹사이트 제목 및 설명 수정**
  웹사이트의 제목과 설명 정보를 변경하려면 `docusaurus.config.js` 설정 파일을 편집하세요.

- **프로젝트 사용 설명 및 소개 수정**
  프로젝트의 사용 설명 및 소개 파일은 `docs` 디렉터리에 있습니다. 해당 디렉터리 내의 관련 파일을 열어 필요한 수정을 진행하세요.

- **홈페이지 프롬프트 수정**
  홈페이지 프롬프트는 `src/data/prompt.json` 파일에 저장됩니다. 특정 언어(예: 중국어)의 프롬프트를 수정해야 하는 경우 `src/data/prompt_es.json` 파일을 직접 편집할 수 있습니다. 새 프롬프트를 추가할 때의 형식은 다음과 같습니다.

  ```json
  {
    "es": {
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

  **주의**: `id`는 500 이상으로 설정하는 것을 권장합니다. 새로 추가된 프롬프트에는 전용 페이지와 댓글 섹션이 없습니다. 프롬프트에 전용 페이지를 추가해야 하는 경우 `src/data/pages/prompt` 디렉터리의 템플릿 파일을 복사하여 수정할 수 있습니다.

- **커스텀 백엔드**
  현재 프로젝트는 공유 백엔드 시스템에 연결되어 있습니다. 자체 백엔드를 구축하려면 `src/api` 폴더 내의 인터페이스 설명을 참조하세요.

  API 모듈 구조:

  ```
  src/api/
  ├── index.ts       # 통합 내보내기 진입점
  ├── config.ts      # API URL 설정
  ├── client.ts      # Axios 클라이언트 (인증 인터셉터 포함)
  ├── auth.ts        # 인증 API (로그인/등록/OAuth)
  ├── prompts.ts     # 프롬프트 CRUD + 검색 + 투표
  ├── favorites.ts   # 즐겨찾기 조작
  ├── myspace.ts     # 마이 스페이스 데이터 (핵심 데이터 소스)
  ├── comments.ts    # 댓글 시스템
  └── user.ts        # 사용자 정보
  ```

  **캐시 메커니즘**: 프로젝트는 `lscache`와 ETag를 결합하여 스마트 캐싱을 구현합니다. 서버가 304 Not Modified를 반환하면 로컬 캐시 데이터를 직접 재사용하여 데이터 전송을 줄입니다.

- **다국어 지원 및 배포**
  다국어 수정을 완료한 후 `CodeUpdateHandler.py` 스크립트를 사용하여 일괄 처리를 수행할 수 있습니다. 다음 명령을 실행하세요.

  ```bash
  python CodeUpdateHandler.py
  ```

  이 스크립트는 사전 설정된 규칙에 따라 `prompt.json` 파일을 분할하고 각 언어 버전의 메인 페이지와 추천 프롬프트 페이지를 동기화하여 업데이트합니다.

## 배포 설명

시스템 요구 사항:

- [Node.js 20.0](https://nodejs.org/) 이상.
- macOS, Windows (WSL 포함), Linux가 지원됩니다.

### 로컬 배포

[Node.js](https://nodejs.org/)가 설치되어 있는지 확인하세요.

```shell
# 설치
yarn

# 로컬 개발
yarn start

# 빌드: 이 명령은 `build` 디렉터리에 정적 콘텐츠를 생성합니다
yarn build

# `docusaurus.config.js` 파일의 `defaultLocale`을 업데이트한 다음 원하는 언어에 대한 빌드를 수행합니다.
yarn build --locale zh-Hans
yarn build --locale zh-Hant
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# 여러 언어 배포
yarn build --locale zh-Hans && yarn build --locale en
```

### Vercel 배포

아래 버튼을 클릭하여 ChatGPT-Shortcut을 Vercel 플랫폼에 원클릭 배포하세요.

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**주의**: Vercel 무료 버전은 메모리 부족으로 인해 오류가 발생할 수 있습니다. 이러한 경우 단일 언어 배포를 선택할 수 있습니다. 구체적인 작업은 다음과 같습니다.

1. 방금 배포한 Vercel 프로젝트에 들어가 **Settings**를 엽니다.
2. **Build & Deployment** 섹션에서 **Build Command**를 찾아 오른쪽의 **Override**를 클릭합니다.
3. 배포 명령을 수정합니다. 예를 들어 중국어 버전을 배포해야 하는 경우 `yarn build --locale zh-Hans`를 사용하고, 포르투갈어 버전을 배포해야 하는 경우 `yarn build --locale pt`를 사용합니다.

### Cloudflare Pages 배포

아래 버튼이나 링크를 클릭하여 이 프로젝트를 포크한 후 설명에 따라 Cloudflare Pages에 배포하세요.

👉 [이 프로젝트 포크하기](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

배포 단계:

1. [Cloudflare Pages](https://pages.cloudflare.com/)에 로그인하고 **"Create a project"**를 선택합니다.
2. 방금 포크한 저장소를 바인딩합니다.
3. 빌드 명령을 구성합니다.
   - **Build command**: `yarn build --locale zh-Hans` (배포할 언어에 따라 적절한 locale을 선택하세요. 예: 포르투갈어의 경우 `yarn build --locale pt` 사용).
   - **Output directory**: `build`.
4. **Deploy**를 클릭하고 Cloudflare Pages가 빌드 및 배포를 완료할 때까지 기다립니다.

Cloudflare Pages는 새 코드를 푸시할 때마다 자동으로 빌드 및 배포를 트리거합니다.

### Docker 배포

Docker에 익숙하다면 다음 명령을 사용하여 빠르게 배포할 수 있습니다.

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

또는 `docker-compose`를 사용할 수도 있습니다.

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 동기화 업데이트 활성화

Vercel에서 자신의 프로젝트를 원클릭 배포한 경우 항상 업데이트가 있다는 메시지가 표시되는 문제가 발생할 수 있습니다. 이는 Vercel이 기본적으로 이 프로젝트를 포크하는 대신 새 프로젝트를 생성하여 업데이트를 올바르게 감지하지 못하기 때문입니다. 다음 단계에 따라 다시 배포하는 것을 권장합니다.

1. 기존 저장소를 삭제합니다.
2. 페이지 오른쪽 상단의 fork 버튼을 사용하여 이 프로젝트를 포크합니다.
3. [Vercel 새 프로젝트 페이지](https://vercel.com/new)의 Import Git Repository에서 방금 포크한 프로젝트를 다시 선택하여 배포합니다.

### 자동 업데이트 켜기

> Upstream Sync 실행 오류가 발생하면 수동으로 Sync Fork를 한 번 실행해 주세요!

프로젝트를 포크한 후 GitHub의 제한으로 인해 포크된 프로젝트의 Actions 페이지에서 수동으로 Workflows를 활성화하고 Upstream Sync Action을 활성화해야 합니다. 활성화하면 매일 자동으로 업데이트가 실행됩니다.

![자동 업데이트](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![자동 업데이트 활성화](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### 수동 코드 업데이트

수동으로 즉시 업데이트하려면 [GitHub 문서](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)를 참조하여 포크된 프로젝트를 업스트림 코드와 동기화하는 방법을 알아보세요.

이 프로젝트에 스타(star)/주시(watch)를 누르거나 작성자를 팔로우하여 새로운 기능 업데이트 알림을 제때 받을 수 있습니다.
