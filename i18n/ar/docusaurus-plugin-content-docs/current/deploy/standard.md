---
sidebar_label: النشر القياسي
title: النشر القياسي لـ AI Short | البناء المحلي و Vercel و Cloudflare و Docker
description: دليل النشر القياسي لـ AI Short، يعيد استخدام الواجهة الخلفية المشتركة الرسمية، ويدعم البناء المحلي والنشر بنقرة واحدة على Vercel و Cloudflare Pages و Docker، ويعمل فور التشغيل.
---

# النشر القياسي

يعيد استخدام الواجهة الخلفية المشتركة الرسمية ويعمل فور التشغيل. قم بعمل Fork للمشروع أولًا، ثم انشر باستخدام إحدى الطرق التالية.

**المتطلبات**: [Node.js 20.0](https://nodejs.org/) أو أحدث، على macOS أو Windows (بما في ذلك WSL) أو Linux.

![هيكلية النشر القياسي: بعد عمل Fork، انشر عبر البناء المحلي أو Vercel أو Cloudflare Pages أو Docker — وكلها تعيد استخدام الواجهة الخلفية المشتركة الرسمية (تسجيل الدخول، المفضلة، المجتمع، التعليقات، المزامنة عبر الأجهزة)](/img/docs/standard-deploy-topology.svg)

## البناء المحلي

```shell
# install dependencies
yarn

# local development
yarn start

# build: outputs static files to the build directory, using the defaultLocale in scripts/i18nLocales.mjs
yarn build
```

> **بناء لغات محددة فقط**: استخدم `yarn build --locale <locale>` (مثل `zh-Hans` أو `en` أو `ja`... راجع القائمة الكاملة في `scripts/i18nLocales.mjs`). للسلسلة: `yarn build --locale zh-Hans && yarn build --locale en`.

## نشر Vercel

انقر فوق الزر أدناه للنشر بنقرة واحدة على Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **ملاحظة**: قد يفشل الإصدار المجاني من Vercel بسبب محدودية الذاكرة. انشر لغة واحدة بدلًا من ذلك — انتقل إلى **Settings → Build & Deployment → Build Command** في المشروع، وانقر **Override**، واضبط أمر لغة واحدة (`yarn build --locale zh-Hans` للصينية، أو `yarn build --locale pt` للبرتغالية، إلخ).

## نشر Cloudflare Pages

أولًا 👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork)، ثم انشر:

1. سجّل الدخول إلى [Cloudflare Pages](https://pages.cloudflare.com/) واختر **Create a project**
2. اربط المستودع الذي قمت بعمل Fork له للتو
3. اضبط إعدادات البناء:
   - **Build command**: `yarn build --locale zh-Hans` (استبدل اللغة بالمطلوبة، مثل `yarn build --locale pt` للبرتغالية)
   - **Output directory**: `build`
4. انقر **Deploy** وانتظر حتى ينتهي Cloudflare Pages من البناء

كل push لاحق يُشغّل البناء والنشر تلقائيًا.

## نشر Docker

نشر بسطر واحد:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

أو باستخدام `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
