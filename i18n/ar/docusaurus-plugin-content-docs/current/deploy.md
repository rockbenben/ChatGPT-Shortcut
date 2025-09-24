---
sidebar_label: النشر
title: دليل النشر والتخصيص | قم بإعداد AI Short بسهولة
description: تعلم كيفية نشر وتخصيص مشروع AI Short الخاص بك بسرعة. يغطي هذا الدليل Vercel و Cloudflare و Docker والنشر المحلي، بالإضافة إلى كيفية تحرير المحتوى وتمكين التحديثات التلقائية.
---

# نشر المشروع

## الإعداد والتخصيص

AI Short هو مشروع مفتوح المصدر، ويمكنك تعديل عنوان الموقع ووصفه والموجهات وغيرها بحرية. فيما يلي خيارات التخصيص الشائعة:

- **تعديل عنوان الموقع ووصفه**  
    قم بتحديث ملف `docusaurus.config.js`.

- **تعديل تعليمات الاستخدام والمستندات**  
    جميع ملفات التوثيق موجودة في مجلد `docs`. افتح وعدّل الملف المطلوب حسب الحاجة.

- **تعديل موجهات الصفحة الرئيسية**  
    يتم تخزين موجهات الصفحة الرئيسية في `src/data/prompt.json`.  
    للغات معينة (مثل الصينية)، قم بتعديل `src/data/prompt_zh.json`.  
    مثال على تنسيق موجه جديد:

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

**ملاحظة**: استخدم `id >= 500` للموجهات الجديدة. لن تحتوي هذه الموجهات على صفحات مخصصة أو تعليقات.
إذا كنت تريد صفحة مخصصة، انسخ ملف قالب من `src/data/pages/prompt` وقم بتعديله.

- **خلفية مخصصة**
    المشروع مرتبط حاليًا بخلفية مشتركة.
    لإعداد الخلفية الخاصة بك، تحقق من تفاصيل واجهة برمجة التطبيقات (API) في `src/api.js`.

- **دعم متعدد اللغات**
    بعد تحديث ملفات اللغة، قم بتشغيل البرنامج النصي `CodeUpdateHandler.py` للمعالجة الدفعية:

`bash
  python CodeUpdateHandler.py
  `

سيقوم هذا البرنامج النصي بتقسيم `prompt.json` ومزامنة التحديثات مع صفحات الموجهات الرئيسية والمميزة لكل لغة.

## دليل النشر

**متطلبات النظام**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (بما في ذلك WSL), أو Linux

### النشر المحلي

تأكد من أن [Node.js](https://nodejs.org/) مثبت لديك.

```bash
# تثبيت الاعتماديات
yarn

# التطوير المحلي
yarn start

# بناء الملفات الثابتة
yarn build

# بناء للغات متعددة
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

# مثال: بناء للغتين
yarn build --locale zh && yarn build --locale en
```

### النشر على Vercel

انقر أدناه لنشر ChatGPT-Shortcut على Vercel بنقرة واحدة:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**ملاحظة**: قد تنفد الذاكرة في خطة Vercel المجانية. في هذه الحالة، قم بنشر لغة واحدة فقط.

الخطوات:

1.  اذهب إلى مشروعك المنشور على Vercel ← **Settings**.
2.  تحت **Build & Deployment**، ابحث عن **Build Command** ← انقر **Override**.
3.  قم بتعيين أمر البناء، على سبيل المثال:

- للصينية: `yarn build --locale zh`
     - للبرتغالية: `yarn build --locale pt`

### النشر على Cloudflare Pages

👉 [تفرع من المستودع](https://github.com/rockbenben/ChatGPT-Shortcut/fork)، ثم قم بالنشر عبر Cloudflare Pages:

1.  سجل الدخول إلى [Cloudflare Pages](https://pages.cloudflare.com/)، واختر **Create a project**.
2.  قم بتوصيل المستودع الذي تفرعت منه.
3.  قم بتكوين إعدادات البناء:

- **Build command**: `yarn build --locale zh` (أو لغة أخرى)
     - **Output directory**: `build`

4.  انشر وانتظر حتى ينتهي البناء.

ستقوم Cloudflare Pages بإعادة النشر تلقائيًا عند دفعك لتغييرات جديدة.

### النشر باستخدام Docker

التشغيل باستخدام Docker:

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

## تمكين التحديث التلقائي

إذا استخدمت النشر بنقرة واحدة على Vercel، فقد ترى "التحديثات متوفرة" بشكل متكرر.
هذا لأن Vercel ينشئ مستودعًا جديدًا بدلاً من تفرع، مما يقطع المزامنة.

**الحل:**

1. احذف المستودع القديم.
2. تفرع من هذا المشروع مباشرة (استخدم زر fork).
3. أعد النشر من التفرع الخاص بك عبر [صفحة مشروع Vercel الجديدة](https://vercel.com/new).

### التحديثات التلقائية

> إذا رأيت أخطاء في **Upstream Sync**، قم بتشغيل **Sync Fork** يدويًا مرة واحدة.

بعد التفرع، يتطلب GitHub منك تمكين مسارات العمل يدويًا:

- اذهب إلى **Actions** في التفرع الخاص بك
- قم بتمكين مسارات العمل، خاصة **Upstream Sync Action**.

سيتم تشغيل هذا يوميًا لسحب التحديثات من المصدر.

### التحديثات اليدوية

للتحديثات الفورية، تحقق من [وثائق GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) حول مزامنة التفرعات.

⭐ قم بتمييز / 👀 مراقبة هذا المشروع أو تابع المؤلف ليتم إعلامك بالميزات الجديدة.
