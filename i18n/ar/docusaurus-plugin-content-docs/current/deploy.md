# نشر

AI Short هو مشروع مفتوح المصدر، يمكنك تعديل اسم ووصف الموقع بحرية.

- لتغيير اسم الصفحة، قم بتعديل ملف `docusaurus.config.js`.
- لتعديل التعليمات، انتقل إلى دليل `docs`.
- لتعديل كلمات المطالبة، يمكنك العثور عليها في `src/data/prompt.json`. إذا كنت بحاجة فقط إلى تعديل لغة واحدة، مثل الصينية، يمكنك تعديل `src/data/prompt_zh.json` مباشرةً.
- حاليًا، يتم توصيل واجهة المستخدم الخلفية بنظام واجهة خلفية مشترك. إذا لزم الأمر، يمكنك إنشاء واجهة خلفية خاصة بك، وتوجد الواجهة ذات الصلة في ملف `src/api.js`.

`CodeUpdateHandler.py` هو نص برمجي لمعالجة النشر متعدد اللغات على دفعات. بعد الانتهاء من التعديل، قم بتنفيذ `python CodeUpdateHandler.py`، والذي سيقسم `prompt.json` إلى لغات متعددة وفقًا للقواعد، ومزامنة كود الصفحة الرئيسية لكل لغة وكود الصفحة المستقلة لكلمات المطالبة المحددة.

## تعليمات النشر

**متطلبات النظام**:

- [Node.js 18.0](https://nodejs.org/) أو إصدار أحدث.
- أنظمة التشغيل macOS وWindows (بما في ذلك WSL) وLinux مدعومة.

### النشر المحلي

تأكد من أنك قد قمت بتثبيت [Node.js](https://nodejs.org/).

```shell
# التثبيت
yarn

# التطوير المحلي
yarn start

# البناء: هذا الأمر ينشئ المحتوى الثابت في دليل `build`
yarn build

# تحديث `defaultLocale` في ملف `docusaurus.config.js`، ثم قم بإجراء بناء للغة المطلوبة.
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

# النشر لعدة لغات
yarn build --locale zh && yarn build --locale en
```

### نشر على Vercel

انقر على الزر أدناه لنقل ChatGPT-Shortcut إلى منصة Vercel بنقرة واحدة:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**ملاحظة**: قد يواجه الإصدار المجاني من Vercel أخطاء بسبب نقص الذاكرة. في هذه الحالة، يمكنك اختيار نشر نسخة بلغة واحدة. الخطوات المحددة هي كما يلي:

1. انتقل إلى المشروع الذي تم نشره على Vercel وافتح **الإعدادات**.
2. في قسم **Build & Deployment**، ابحث عن **Build Command**، ثم انقر على **Override** على اليمين.
3. عدل أمر النشر. على سبيل المثال، إذا كنت بحاجة إلى نشر النسخة الصينية، استخدم `yarn build --locale zh`؛ وإذا كنت بحاجة إلى نشر النسخة البرتغالية، استخدم `yarn build --locale pt`.

## نشر على Cloudflare Pages

انقر على الزر أو الرابط أدناه لعمل **Fork** لهذا المشروع، ثم اتبع التعليمات للنشر على Cloudflare Pages:

👉 [Fork هذا المشروع](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

خطوات النشر:

1. قم بتسجيل الدخول إلى [Cloudflare Pages](https://pages.cloudflare.com/)، ثم اختر **"Create a project"**.
2. قم بربط المستودع الذي قمت بعمل Fork له.
3. قم بتكوين أمر البناء:
   - **Build command**: `yarn build --locale zh` (اختر locale المناسب بناءً على اللغة التي ترغب في نشرها؛ على سبيل المثال، استخدم `yarn build --locale pt` للغة البرتغالية).
   - **Output directory**: `build`.
4. انقر على **نشر** وانتظر حتى تنتهي Cloudflare Pages من البناء والنشر.

سيقوم Cloudflare Pages أيضًا تلقائيًا ببدء عملية البناء والنشر في كل مرة تقوم فيها بدفع أكواد جديدة.

### نشر Docker

إذا كنت على دراية بـ Docker، فيمكنك النشر بسرعة باستخدام الأمر التالي:

```shell
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

بدلاً من ذلك، يمكنك استخدام `docker-compose`:

```yml
version: "3.8"

services:
chatgpt-shortcut:
Container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: except-stopped
```

## التحديثات المتزامنة

إذا قمت بنشر مشروعك الخاص على Vercel بنقرة واحدة، فقد تواجه مشكلة حيث تتم الإشارة إلى التحديثات باستمرار. ينشأ هذا من سلوك Vercel الافتراضي المتمثل في إنشاء مشروع جديد لك بدلاً من تقسيم المشروع الحالي، مما يعوق اكتشاف التحديث بشكل صحيح. يوصى باتباع الخطوات التالية لإعادة النشر:

1. إزالة المستودع السابق.

2. استخدام زر "التقسيم" الموجود في الزاوية اليمنى العليا من الصفحة لتقسيم المشروع الحالي.

3. في [صفحة مشروع Vercel الجديد](https://vercel.com/new)، حدد المشروع الذي تم تقسيمه مؤخرًا من قسم استيراد مستودع Git واستمر في النشر.

### التحديثات التلقائية

> في حالة مواجهة خطأ أثناء تنفيذ Upstream Sync، قم يدويًا بإجراء Sync Fork واحد.

بمجرد تقسيم المشروع، نظرًا لقيود GitHub، من الضروري تمكين سير العمل يدويًا في صفحة Actions الخاصة بمشروعك الذي تم تقسيمه وتنشيط Upstream Sync Action. عند التنشيط، سيتم تنفيذ التحديثات تلقائيًا على أساس يومي.

![التحديثات التلقائية](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![تمكين التحديثات التلقائية](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### التحديثات اليدوية

إذا كنت ترغب في التحديث يدويًا على الفور، يمكنك الرجوع إلى [وثائق GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) لمعرفة كيفية مزامنة المشروع المتشعب مع الكود الأصلي.

لا تتردد في إظهار دعمك لهذا المشروع من خلال منحه نجمة/متابعة، أو متابعة المؤلف، للبقاء على اطلاع على الإشعارات في الوقت المناسب بخصوص تحديثات الميزات الجديدة.
