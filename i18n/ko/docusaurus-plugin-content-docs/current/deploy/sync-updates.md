---
sidebar_label: 포크 동기화 유지
title: AI Short 동기화 업데이트 | 포크가 업스트림을 자동으로 따라가기
description: AI Short 포크가 업스트림 업데이트를 자동으로 따라가도록 설정 — Vercel 배포가 업데이트를 표시하지 않는 문제를 해결하고 GitHub Actions 자동 동기화를 활성화합니다.
---

# 포크 동기화 유지

Vercel 원클릭 배포 후 "업데이트 있음" 알림이 계속 표시될 수 있습니다 — Vercel이 포크 대신 새 프로젝트를 생성하므로 업스트림 업데이트를 감지하지 못하기 때문입니다. 이를 해결하려면:

1. 기존 저장소를 삭제합니다
2. 페이지 오른쪽 상단의 **Fork** 버튼을 사용하여 이 프로젝트를 포크합니다
3. [Vercel 새 프로젝트 페이지](https://vercel.com/new)의 Import Git Repository에서 포크한 저장소를 다시 가져와 배포합니다

## 자동 업데이트 활성화

> Upstream Sync 오류가 발생하면 Sync Fork를 수동으로 한 번 실행하세요!

포크한 후 Actions 페이지에서 수동으로 Workflows를 활성화하고 Upstream Sync 액션을 한 번 실행하세요. 활성화되면 프로젝트가 매일 자동으로 동기화됩니다:

![자동 업데이트](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![자동 업데이트 활성화](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## 수동 업데이트

수동으로 즉시 업데이트하려면 [GitHub 포크 동기화 문서](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)를 참조하세요.

이 프로젝트에 스타/워치를 눌러 새 기능 알림을 받을 수 있습니다.
