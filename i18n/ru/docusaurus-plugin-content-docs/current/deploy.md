---
sidebar_label: Развертывание
title: Руководство по развертыванию и настройке | Простая конфигурация AI Short
description: Узнайте, как быстро развернуть и настроить ваш проект AI Short. Это руководство охватывает Vercel, Cloudflare, Docker и локальное развертывание, а также редактирование контента и включение автообновлений.
---

# Развертывание проекта

## Конфигурация и настройка

AI Short — это проект с открытым исходным кодом, и вы можете свободно изменять заголовок сайта, описание, подсказки и многое другое. Ниже приведены общие параметры настройки:

- **Изменить заголовок и описание сайта**  
    Обновите файл `docusaurus.config.js`.

- **Изменить инструкции по использованию и документацию**  
    Все файлы документации находятся в каталоге `docs`. Откройте и измените соответствующий файл по мере необходимости.

- **Изменить подсказки на главной странице**  
    Подсказки на главной странице хранятся в `src/data/prompt.json`.  
    Для определенных языков (например, китайского) отредактируйте `src/data/prompt_zh.json`.  
    Пример формата для новой подсказки:

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

**Примечание**: Используйте `id >= 500` для новых подсказок. У них не будет выделенных страниц или комментариев.
Если вам нужна выделенная страница, скопируйте файл шаблона из `src/data/pages/prompt` и измените его.

- **Пользовательский бэкенд**
    В настоящее время проект связан с общим бэкендом.
    Чтобы настроить свой собственный, проверьте детали API в `src/api.js`.

- **Поддержка нескольких языков**
    После обновления языковых файлов запустите скрипт `CodeUpdateHandler.py` для пакетной обработки:

`bash
  python CodeUpdateHandler.py
  `

Этот скрипт разделит `prompt.json` и синхронизирует обновления с основными и избранными страницами подсказок для каждого языка.

## Руководство по развертыванию

**Системные требования**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (включая WSL) или Linux

### Локальное развертывание

Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).

```bash
# Установить зависимости
yarn

# Локальная разработка
yarn start

# Собрать статические файлы
yarn build

# Собрать для нескольких языков
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

# Пример: сборка для двух языков
yarn build --locale zh && yarn build --locale en
```

### Развертывание на Vercel

Нажмите ниже, чтобы развернуть ChatGPT-Shortcut на Vercel в один клик:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Примечание**: Бесплатный тарифный план Vercel может исчерпать память. В этом случае развертывайте только один язык.

Шаги:

1.  Перейдите в ваш развернутый проект Vercel → **Settings**.
2.  В разделе **Build & Deployment** найдите **Build Command** → нажмите **Override**.
3.  Установите команду сборки, например:

- Для китайского: `yarn build --locale zh`
     - Для португальского: `yarn build --locale pt`

### Развертывание на Cloudflare Pages

👉 [Сделайте форк репозитория](https://github.com/rockbenben/ChatGPT-Shortcut/fork), затем разверните через Cloudflare Pages:

1.  Войдите в [Cloudflare Pages](https://pages.cloudflare.com/), выберите **Create a project**.
2.  Подключите свой форкнутый репозиторий.
3.  Настройте параметры сборки:

- **Build command**: `yarn build --locale zh` (или другой язык)
     - **Output directory**: `build`

4.  Разверните и дождитесь завершения сборки.

Cloudflare Pages будет автоматически выполнять повторное развертывание при отправке новых коммитов.

### Развертывание с помощью Docker

Запуск с помощью Docker:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Или с `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Включение автообновления

Если вы использовали развертывание Vercel в один клик, вы можете часто видеть сообщение «доступны обновления».
Это происходит потому, что Vercel создает новый репозиторий вместо форка, что нарушает синхронизацию.

**Исправление:**

1. Удалите старый репозиторий.
2. Сделайте форк этого проекта напрямую (используйте кнопку fork).
3. Повторно разверните из своего форка через [страницу нового проекта Vercel](https://vercel.com/new).

### Автоматические обновления

> Если вы видите ошибки с **Upstream Sync**, выполните **Sync Fork** вручную один раз.

После создания форка GitHub требует, чтобы вы вручную включили рабочие процессы:

- Перейдите в **Actions** в вашем форке
- Включите рабочие процессы, особенно **Upstream Sync Action**.

Это будет выполняться ежедневно для получения обновлений из основного репозитория.

### Ручные обновления

Для немедленных обновлений ознакомьтесь с [документацией GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) по синхронизации форков.

⭐ Отметьте / 👀 Следите за этим проектом или подпишитесь на автора, чтобы получать уведомления о новых функциях.
