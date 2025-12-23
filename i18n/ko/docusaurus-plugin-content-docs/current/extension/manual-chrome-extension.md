---
sidebar_label: Chrome CRX 설치 가이드
title: Chrome 수동 설치 - CRX 파일 버전 도입 가이드
description: 개발자 모드로 CRX 파일 간편 설치. 드래그 앤 드롭 설치 절차와 자주 발생하는 문제의 해결책을 소개합니다.
---

# Chrome CRX 확장 프로그램 로컬 설치 가이드

## CRX 설치 패키지 다운로드

ChatGPT Shortcut crx 설치 패키지(ChatGPT_Shortcut-crx-3.x.x.zip)를 다운로드하고 압축을 풉니다(crx 파일은 압축을 푼 폴더 안에 있습니다).

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)
- **중국 다운로드**: [Alist 클라우드 드라이브](https://alist.newzone.top:9003/apps/ChatGPT%20Shortcut%20Extension); [Lanzou Cloud](https://wwva.lanzouq.com/b01lsc9vi), 비밀번호: 1qow

![](https://img.newzone.top/2024-08-12-21-47-10.png?imageMogr2/format/webp)

## 개발자 모드 활성화

Chrome의 "확장 프로그램 관리" 페이지를 열고 "개발자 모드"를 켭니다.

다음 주소를 복사하여 브라우저 주소 표시줄에 붙여넣고 Enter 키를 눌러 엽니다. 페이지 오른쪽 상단에서 "개발자 모드"를 켭니다.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## 확장 프로그램 설치

ChatGPT Shortcut 확장 프로그램 설치 (주의 ⚠️: .crx 파일을 드래그해야 합니다. [압축해제된 확장 프로그램을 로드합니다]를 클릭하지 마세요)

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

설치 성공 후 [플러그인 사용 튜토리얼](./usage.md)을 확인할 수 있습니다.

## 설치에 문제가 있나요?

1. Windows 사용자: 다운로드한 설치 패키지의 압축을 풀었습니까(더블 클릭하여 여는 대신)?

2. "개발자 모드"가 켜져 있습니까? 켜져 있지 않다면 2단계 작업을 참조하세요.

3. crx 파일을 "확장 프로그램" 페이지로 드래그했습니까? 주의 ⚠️: [압축해제된 확장 프로그램을 로드합니다]를 클릭하지 말고 crx 파일을 드래그해야 합니다.

4. 브라우저가 crx 파일 설치를 허용하지 않나요? zip 파일 설치를 시도해 보세요! [zip 설치 튜토리얼을 보려면 여기를 클릭하세요](./manual-chrome-extension-zip.md).
