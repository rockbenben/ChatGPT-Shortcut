---
sidebar_label: 구성 및 커스터마이징
title: AI Short 구성 및 커스터마이징 | 제목, 프롬프트, 커스텀 백엔드 수정
description: AI Short 커스터마이징 — 사이트 제목과 설명 수정, 홈페이지 프롬프트 추가, 커스텀 백엔드 연동. API 모듈 구조와 캐싱 메커니즘 설명 포함.
---

# 구성 및 커스터마이징

AI Short는 오픈 소스입니다 — 사이트 제목, 설명, 프롬프트 등을 자유롭게 수정할 수 있습니다.

## 사이트 제목 및 설명

`docusaurus.config.js`를 편집하세요.

## 문서 및 가이드

`docs/` 아래의 해당 파일을 편집하세요.

## 홈페이지 프롬프트

소스 데이터는 `src/data/prompt.json`에 있습니다 — 각 객체가 언어 코드(`zh` / `en` / `ja` 등)를 키로 모든 언어 버전을 저장하는 배열입니다. 프롬프트 추가 형식:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
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

편집 후 `python CodeUpdateHandler.py`를 실행하세요. 이 스크립트는 `prompt.json`을 언어별 `prompt_<locale>.json` 파일로 분할하고 각 언어의 홈페이지와 추천 프롬프트 페이지를 업데이트합니다.

![데이터 파이프라인: 마스터 prompt.json을 python CodeUpdateHandler.py로 처리하여 언어별로 분할해 로케일별 프롬프트 파일을 만들고, 각 id의 카드 JSON과 상세 페이지를 생성하며, OpenCC로 간체에서 번체 중국어로 변환합니다](/img/docs/data-pipeline.svg)

> **주의**: 기존 프롬프트나 커뮤니티 콘텐츠와 ID가 충돌하지 않도록 `id`는 500 이상으로 설정하세요. `python CodeUpdateHandler.py`를 실행하면 모든 프롬프트(새로 추가한 것 포함)에 대해 카드 데이터와 상세 페이지가 자동으로 생성되므로 페이지 파일을 수동으로 만들 필요가 없습니다. 다만 커스텀 프롬프트는 기본적으로 추천 메타 설명과 댓글 데이터가 없습니다.

## 커스텀 백엔드

기본적으로 프로젝트는 공유 백엔드에 연결됩니다(로그인, 즐겨찾기, 커뮤니티, 댓글, 크로스 디바이스 동기화 모두 이에 의존합니다). `src/api`에는 참조용으로 전체 인터페이스 계약이 문서화되어 있습니다. 백엔드 서비스 자체는 오픈 소스가 아닙니다. **독립 백엔드를 갖춘 완전 자체 호스팅 배포**가 필요하면 [배포 모델 선택](../deploy#배포-모델-선택)을 참조하세요.

API 모듈 구조:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

캐싱: API 데이터는 `lscache`와 ETag를 통해 지능적으로 캐시됩니다 — 서버가 304 Not Modified를 반환하면 로컬 캐시를 재사용하여 데이터 전송을 줄입니다.
