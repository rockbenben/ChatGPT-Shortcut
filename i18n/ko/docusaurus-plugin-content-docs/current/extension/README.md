---
sidebar_label: 브라우저 확장 프로그램 설치
title: AI Short 확장 프로그램 | ChatGPT/Gemini/Claude 사이드바 · Chrome/Edge/Firefox 설치
description: ChatGPT, Gemini, Claude, Doubao 등 AI 대화 페이지의 사이드바에서 AiShort 프롬프트를 바로 불러오세요. 탭을 전환해 복사·붙여넣기할 필요가 없습니다. Chrome, Edge, Firefox에서 원클릭으로 설치할 수 있습니다.
---

# 브라우저 확장 프로그램 설치

AiShort(ChatGPT Shortcut) 확장 프로그램은 프롬프트 라이브러리를 ChatGPT, Gemini, Claude, Doubao 등 AI 대화 페이지의 사이드바에 직접 내장하여, aishort.top으로 돌아가 복사하여 붙여넣을 필요가 없습니다. Chrome, Edge, Firefox를 지원하며, `Alt + Shift + S`로 빠르게 호출할 수 있습니다.

## 📥 설치 방법

### 1. 앱 스토어 (권장, 원클릭 설치)

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/) (설치 후 한 번 [권한 설정](./firefox-extension-setting.md)이 필요합니다. 그렇지 않으면 ChatGPT에서 사이드바가 표시되지 않습니다)

### 2. 스토어 접속이 안 되시나요? 로컬 설치 패키지

다음 채널에서 다운로드한 후 해당 가이드를 참고하여 설치하세요.

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 설치 가이드: [CRX 파일](./manual-chrome-extension.md) · [ZIP 파일](./manual-chrome-extension-zip.md)

## ✅ 설치 후

`Alt + Shift + S`를 눌러 호출하거나 도구 모음 아이콘을 클릭하세요. 자세한 사용법은 [사용 가이드](./usage.md)를 참고하세요.

## 🧩 Tampermonkey 스크립트

확장 프로그램 형식 외에도 [**ChatGPT Shortcut Anywhere Tampermonkey 스크립트**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)를 제공합니다.
Tampermonkey는 사용자가 사용자 지정 스크립트를 실행하여 웹 페이지 기능을 향상시킬 수 있는 브라우저 확장 프로그램입니다.

이 스크립트를 사용하면 모든 웹사이트에서 AiShort 사이드바를 호출할 수 있습니다.
그러나 ChatGPT 공식 페이지의 스크립트 주입 제한으로 인해 해당 페이지에서 스크립트는 사이드바가 아닌 **팝업**으로 실행됩니다.

AiShort 사이드바를 활성화하면 지원되는 웹 페이지의 우측 하단에 녹색 아이콘 스위치가 표시됩니다. 이 아이콘을 클릭하여 사이드바를 켜거나 끌 수 있습니다. 현재 ChatGPT, Gemini, Claude, Doubao 등을 기본 지원합니다.

![](/img/docs/extension-sidebar.gif)
