---
sidebar_label: 배포
title: 배포 및 사용자 정의 가이드 | AI Short 쉽게 구성하기
description: AI Short 프로젝트를 빠르게 배포하고 사용자 정의하는 방법을 알아보세요. 이 가이드는 Vercel, Cloudflare, Docker 및 로컬 배포 방법과 콘텐츠 편집, 자동 업데이트 활성화 방법을 다룹니다.
---

# 프로젝트 배포

## 구성 및 사용자 정의

AI Short는 오픈 소스 프로젝트이며, 사이트 제목, 설명, 프롬프트 등을 자유롭게 수정할 수 있습니다. 다음은 일반적인 사용자 정의 옵션입니다:

- **사이트 제목 및 설명 편집**  
    `docusaurus.config.js` 파일을 업데이트하세요.

- **사용법 및 문서 편집**  
    모든 문서 파일은 `docs` 디렉토리에 있습니다. 필요에 따라 관련 파일을 열고 수정하세요.

- **홈페이지 프롬프트 편집**  
    홈페이지 프롬프트는 `src/data/prompt.json`에 저장됩니다.  
    특정 언어(예: 중국어)의 경우 `src/data/prompt_zh.json`을 편집하세요.  
    새 프롬프트의 예시 형식:

`json
  {
    "zh": {
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
  `

**참고**: 새 프롬프트에는 `id >= 500`을 사용하세요. 이러한 프롬프트는 전용 페이지나 댓글이 없습니다.
전용 페이지를 원한다면 `src/data/pages/prompt`에서 템플릿 파일을 복사하여 수정하세요.

- **사용자 정의 백엔드**
    이 프로젝트는 현재 공유 백엔드에 연결되어 있습니다.
    자신만의 백엔드를 설정하려면 `src/api.js`에서 API 세부 정보를 확인하세요.

- **다국어 지원**
    언어 파일을 업데이트한 후, `CodeUpdateHandler.py` 스크립트를 실행하여 일괄 처리하세요:

`bash
  python CodeUpdateHandler.py
  `

이 스크립트는 `prompt.json`을 분할하고 각 언어의 메인 및 주요 프롬프트 페이지에 업데이트를 동기화합니다.

## 배포 가이드

**시스템 요구 사항**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (WSL 포함), 또는 Linux

### 로컬 배포

[Node.js](https://nodejs.org/)가 설치되어 있는지 확인하세요.

```bash
# 종속성 설치
yarn

# 로컬 개발
yarn start

# 정적 파일 빌드
yarn build

# 여러 로케일로 빌드
yarn build --locale zh
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

# 예: 두 가지 언어로 빌드
yarn build --locale zh && yarn build --locale en
```

### Vercel 배포

아래를 클릭하여 원클릭으로 ChatGPT-Shortcut을 Vercel에 배포하세요:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**참고**: 무료 Vercel 플랜은 메모리가 부족할 수 있습니다. 이 경우 단일 언어만 배포하세요.

단계:

1.  배포된 Vercel 프로젝트로 이동 → **Settings**.
2.  **Build & Deployment** 아래에서 **Build Command** 찾기 → **Override** 클릭.
3.  빌드 명령을 설정하세요. 예:

- 중국어: `yarn build --locale zh`
   - 포르투갈어: `yarn build --locale pt`

### Cloudflare Pages 배포

👉 [리포지토리 포크하기](https://github.com/rockbenben/ChatGPT-Shortcut/fork), 그런 다음 Cloudflare Pages를 통해 배포하세요:

1.  [Cloudflare Pages](https://pages.cloudflare.com/)에 로그인하여 **Create a project**를 선택하세요.
2.  포크한 리포지토리를 연결하세요.
3.  빌드 설정을 구성하세요:

- **Build command**: `yarn build --locale zh` (또는 다른 언어)
   - **Output directory**: `build`

4.  배포하고 빌드가 완료될 때까지 기다리세요.

새 커밋을 푸시하면 Cloudflare Pages가 자동으로 다시 배포됩니다.

### Docker 배포

Docker로 실행:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

또는 `docker-compose` 사용:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 자동 업데이트 활성화

원클릭 Vercel 배포를 사용한 경우 "업데이트 가능"이라는 메시지를 자주 볼 수 있습니다.
이는 Vercel이 포크 대신 새 리포지토리를 생성하여 동기화가 끊어지기 때문입니다.

**해결책:**

1.  기존 리포지토리를 삭제하세요.
2.  이 프로젝트를 직접 포크하세요(포크 버튼 사용).
3.  [Vercel 새 프로젝트 페이지](https://vercel.com/new)를 통해 포크에서 다시 배포하세요.

### 자동 업데이트

> **Upstream Sync**에 오류가 표시되면 **Sync Fork**를 수동으로 한 번 실행하세요.

포크한 후에는 GitHub에서 워크플로를 수동으로 활성화해야 합니다:

- 포크한 리포지토리의 **Actions**로 이동하세요
- 워크플로, 특히 **Upstream Sync Action**을 활성화하세요.

이는 매일 실행되어 업스트림 업데이트를 가져옵니다.

### 수동 업데이트

즉각적인 업데이트를 원하시면 포크 동기화에 대한 [GitHub 문서](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)를 확인하세요.

⭐ 이 프로젝트에 별을 주거나 / 👀 지켜보거나 작성자를 팔로우하여 새로운 기능에 대한 알림을 받으세요.
