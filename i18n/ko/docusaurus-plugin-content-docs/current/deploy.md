# 배포

## Vercel 을 통한 배포

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## 설치

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
