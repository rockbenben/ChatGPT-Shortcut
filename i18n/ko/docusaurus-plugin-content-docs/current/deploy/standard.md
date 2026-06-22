---
sidebar_label: Standard 배포
title: AI Short Standard 배포 | 로컬 빌드, Vercel, Cloudflare, Docker
description: AI Short Standard 배포 가이드. 공식 공유 백엔드를 재사용하며 로컬 빌드, Vercel 원클릭 배포, Cloudflare Pages, Docker를 지원해 바로 사용할 수 있습니다.
---

# Standard 배포

공식 공유 백엔드를 재사용하며 바로 사용할 수 있습니다. 먼저 프로젝트를 포크한 후 아래 방법 중 하나로 배포하세요.

**시스템 요구 사항**: [Node.js 20.0](https://nodejs.org/) 이상, macOS, Windows(WSL 포함), 또는 Linux.

![Standard 배포 토폴로지: 포크 후 로컬 빌드, Vercel, Cloudflare Pages 또는 Docker로 배포하며, 모두 공식 공유 백엔드(로그인·즐겨찾기·커뮤니티·댓글·기기 간 동기화)를 재사용합니다](/img/docs/standard-deploy-topology.svg)

## 로컬 빌드

```shell
# 의존성 설치
yarn

# 로컬 개발
yarn start

# 빌드: 정적 파일을 build 디렉터리에 출력합니다. scripts/i18nLocales.mjs의 defaultLocale을 사용합니다
yarn build
```

> **특정 언어만 빌드하려면**: `yarn build --locale <locale>`을 사용하세요 (예: `zh-Hans`, `en`, `ja`… 전체 로케일 목록은 `scripts/i18nLocales.mjs`를 참조). 여러 언어를 연결할 수 있습니다: `yarn build --locale zh-Hans && yarn build --locale en`.

## Vercel 배포

아래 버튼을 클릭하여 Vercel에 원클릭 배포하세요:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **주의**: Vercel 무료 플랜은 메모리 제한으로 인해 실패할 수 있습니다. 대신 단일 언어를 배포하세요 — 프로젝트의 **Settings → Build & Deployment → Build Command**로 이동하여 **Override**를 클릭하고 단일 언어 명령을 설정하세요 (중국어는 `yarn build --locale zh-Hans`, 포르투갈어는 `yarn build --locale pt` 등).

## Cloudflare Pages 배포

먼저 👉 [이 프로젝트 포크하기](https://github.com/rockbenben/ChatGPT-Shortcut/fork), 그런 다음 배포하세요:

1. [Cloudflare Pages](https://pages.cloudflare.com/)에 로그인하고 **Create a project**를 선택합니다
2. 방금 포크한 저장소를 연결합니다
3. 빌드를 구성합니다:
   - **Build command**: `yarn build --locale zh-Hans` (배포할 언어에 맞게 로케일을 변경하세요, 예: 포르투갈어는 `yarn build --locale pt`)
   - **Output directory**: `build`
4. **Deploy**를 클릭하고 Cloudflare Pages 빌드가 완료될 때까지 기다립니다

이후 모든 푸시는 자동으로 빌드 및 배포를 트리거합니다.

## Docker 배포

원라인 배포:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

또는 `docker-compose`를 사용할 수도 있습니다:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
