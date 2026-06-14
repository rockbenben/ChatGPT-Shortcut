---
sidebar_label: النشر (Deployment)
title: دليل نشر AI Short - Vercel و Docker
description: انشر AI Short بسهولة مع Vercel و Docker و Cloudflare. دليل خطوة بخطوة للإعداد والتحديث التلقائي.
---

# نشر المشروع

## التكوين والتخصيص

AI Short هو مشروع مفتوح المصدر، يسمح لك بتعديل عنوان الموقع، الوصف، والمطالبات وفقًا لاحتياجاتك. فيما يلي خيارات التعديل الشائعة والتعليمات:

- **تعديل عنوان الموقع والوصف**
  لتغيير عنوان الموقع والوصف، يرجى تحرير ملف التكوين `docusaurus.config.js`.

- **تعديل تعليمات المشروع والمقدمة**
  توجد تعليمات استخدام المشروع وملفات المقدمة في دليل `docs`. افتح الملفات ذات الصلة في هذا الدليل لإضافة التغييرات اللازمة.

- **تعديل مطالبات الصفحة الرئيسية**
  يتم تخزين مطالبات الصفحة الرئيسية في ملف `src/data/prompt.json`. إذا كنت بحاجة إلى تعديل المطالبات ل لغة معينة (مثل العربية)، يمكنك تحرير الملف `src/data/prompt_ar.json` مباشرة. عند إضافة مطالبات جديدة، يكون التنسيق كما يلي:

  ```json
  {
    "ar": {
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

  **ملاحظة**: يوصى بتعيين `id` فوق 500. لن يكون للمطالبات الجديدة صفحتها المخصصة وقسم التعليقات. إذا كنت بحاجة إلى إضافة صفحة مخصصة لمطالبة، يمكنك نسخ وتعديل ملف القالب في دليل `src/data/pages/prompt`.

- **واجهة خلفية مخصصة**
  المشروع الحالي متصل بنظام واجهة خلفية مشترك. إذا كنت ترغب في إعداد الواجهة الخلفية الخاصة بك، يرجى الرجوع إلى تعليمات الواجهة في مجلد `src/api`.

  هيكل وحدة API:

  ```
  src/api/
  ├── index.ts       # إدخال تصدير موحد
  ├── config.ts      # تكوين عنوان URL لـ API
  ├── client.ts      # عميل Axios (مع معترض المصادقة)
  ├── auth.ts        # واجهة برمجة تطبيقات المصادقة (تسجيل الدخول/التسجيل/OAuth)
  ├── prompts.ts     # CRUD للمطالبات + البحث + التصويت
  ├── favorites.ts   # العمليات المفضلة
  ├── myspace.ts     # بيانات مساحتي (مصدر البيانات الأساسي)
  ├── comments.ts    # نظام التعليقات
  └── user.ts        # معلومات المستخدم
  ```

  **آلية التخزين المؤقت**: يستخدم المشروع `lscache` جنبًا إلى جنب مع ETag للتخزين المؤقت الذكي. عندما يرجع الخادم 304 Not Modified، يتم إعادة استخدام بيانات التخزين المؤقت المحلي مباشرة، مما يقلل من نقل البيانات.

- **دعم وتعدد اللغات والنشر**
  بعد إكمال تعديلات اللغات المتعددة، يمكنك استخدام البرنامج النصي `CodeUpdateHandler.py` للمعالجة المجمعة. قم بتشغيل الأمر التالي:

  ```bash
  python CodeUpdateHandler.py
  ```

  سيقوم هذا البرنامج النصي بتقسيم ملف `prompt.json` وفقًا للقواعد المحددة مسبقًا ومزامنة تحديثات الصفحة الرئيسية وصفحات المطالبات المميزة لكل إصدار لغة.

## النشر غير المتصل (الشبكة الداخلية للمؤسسات)

إذا كنت بحاجة للنشر في شبكة داخلية للمؤسسة أو شبكة حكومية بدون وصول للشبكة الخارجية، يوفر AI Short نسخة مخصصة غير متصلة. لا حاجة لخادم خلفي أو تسجيل، جميع البيانات مخزنة محليًا في المتصفح.

انشر النسخة غير المتصلة باستخدام Docker بأمر واحد:

```bash
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline
```

انظر الدليل التفصيلي وخيارات التكوين في [دليل النشر غير المتصل](./guides/offline).

## تعليمات النشر

متطلبات النظام:

- [Node.js 20.0](https://nodejs.org/) أو إصدار أحدث.
- يدعم macOS، Windows (بما في ذلك WSL)، و Linux.

### النشر المحلي

تأكد من أنك قمت بتثبيت [Node.js](https://nodejs.org/).

```shell
# التثبيت
yarn

# التطوير المحلي
yarn start

# البناء: ينشئ هذا الأمر محتوى ثابتًا في دليل `build`
yarn build

# قم بتحديث `defaultLocale` في ملف `scripts/i18nLocales.mjs`، ثم قم بالبناء للغة المطلوبة.
yarn build --locale zh-Hans
yarn build --locale zh-Hant
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

# النشر لعدة لغات
yarn build --locale zh-Hans && yarn build --locale en
```

### نشر Vercel

انقر فوق الزر أدناه لنشر ChatGPT-Shortcut بنقرة واحدة على منصة Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**ملاحظة**: قد يفشل الإصدار المجاني من Vercel بسبب عدم كفاية الذاكرة. إذا واجهت هذا الموقف، يمكنك اختيار نشر لغة واحدة. العمليات المحددة هي كما يلي:

1. أدخل مشروع Vercel المنشور حديثًا وافتح **الإعدادات**.
2. في قسم **البناء والنشر**، ابحث عن **أمر البناء**، وانقر فوق **تجاوز** على اليمين.
3. قم بتعديل أمر النشر. على سبيل المثال، إذا كنت بحاجة إلى نشر النسخة الصينية، استخدم `yarn build --locale zh-Hans`؛ إذا كنت بحاجة إلى نشر النسخة العربية، استخدم `yarn build --locale ar`.

### نشر Cloudflare Pages

انقر فوق الزر أو الرابط أدناه، قم بعمل Fork لهذا المشروع، واتبع التعليمات لنشره على Cloudflare Pages:

👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

خطوات النشر:

1. قم بتسجيل الدخول إلى [Cloudflare Pages](https://pages.cloudflare.com/)، واختر **"Create a project"**.
2. اربط المستودع الذي قمت بعمل Fork له للتو.
3. تكوين أمر البناء:
   - **Build command**: `yarn build --locale zh-Hans` (اختر اللغة المناسبة للنشر، على سبيل المثال: استخدم `yarn build --locale ar` للعربية).
   - **Output directory**: `build`.
4. انقر فوق **Deploy**، وانتظر حتى يكمل Cloudflare Pages البناء والنشر.

سيقوم Cloudflare Pages تلقائيًا بتشغيل البناء والنشر في كل مرة تدفع فيها كودًا جديدًا.

### نشر Docker

إذا كنت معتادًا على Docker، يمكنك النشر بسرعة باستخدام الأوامر التالية:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

أو، يمكنك استخدام `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## تمكين التحديثات التلقائية

إذا قمت بنشر مشروعك على Vercel بنقرة واحدة، فقد تواجه مشكلة حيث يشير دائمًا إلى توفر تحديثات. هذا لأن Vercel ينشئ مشروعًا جديدًا لك افتراضيًا، بدلاً من عمل fork لهذا المشروع، مما يمنع الكشف الصحيح عن التحديثات. يوصى بإعادة النشر باتباع الخطوات التالية:

1. احذف المستودع الأصلي؛
2. استخدم زر fork في الزاوية العلوية اليمنى من الصفحة لعمل fork لهذا المشروع؛
3. في [صفحة مشروع Vercel الجديد](https://vercel.com/new)، حدد المشروع الذي قمت بعمل fork له للتو مرة أخرى في قسم Import Git Repository وقم بنشره.

### تشغيل التحديثات التلقائية

> إذا واجهت خطأ تنفيذ Upstream Sync، يرجى تنفيذ Sync Fork يدويًا مرة واحدة!

بعد عمل fork للمشروع، بسبب قيود GitHub، تحتاج إلى تمكين Workflows يدويًا في صفحة Actions لمشروعك الذي تم عمل fork له، وتمكين Upstream Sync Action. بمجرد التمكين، سيتم تنفيذ التحديثات تلقائيًا كل يوم:

![التحديث التلقائي](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![تمكين التحديثات التلقائية](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### تحديث الكود يدويًا

إذا كنت ترغب في التحديث يدويًا على الفور، يمكنك التحقق من [وثائق GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) لمعرفة كيفية مزامنة المشروع الذي تم عمل fork له مع كود المنبع.

يمكنك وضع نجمة/مراقبة هذا المشروع، أو متابعة المؤلف لتلقي إشعارات تحديث الميزات الجديدة في الوقت المناسب.
