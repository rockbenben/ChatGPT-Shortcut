---
sidebar_label: التكوين والتخصيص
title: تكوين وتخصيص AI Short | تعديل العنوان والمطالبات وواجهة خلفية مخصصة
description: خصّص AI Short — عدّل عنوان الموقع ووصفه، وأضِف مطالبات إلى الصفحة الرئيسية، واربطه بواجهة خلفية مخصصة، مع شرح هيكل وحدات API وآلية التخزين المؤقت.
---

# التكوين والتخصيص

AI Short مفتوح المصدر — يمكنك تعديل عنوان الموقع والوصف والمطالبات وأكثر بحرية.

## عنوان الموقع والوصف

حرّر ملف `docusaurus.config.js`.

## التوثيق والأدلة

حرّر الملفات المقابلة تحت `docs/`.

## مطالبات الصفحة الرئيسية

بيانات المصدر موجودة في `src/data/prompt.json` — مصفوفة يخزّن كل كائن فيها جميع نسخ اللغات مفتاحةً بكود اللغة (`zh` / `en` / `ja`، إلخ). تنسيق إضافة مطالبة:

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

بعد التحرير، شغّل `python CodeUpdateHandler.py`. يقوم السكريبت بتقسيم `prompt.json` إلى ملفات `prompt_<locale>.json` لكل لغة وتحديث الصفحة الرئيسية وصفحات المطالبات المميزة لكل لغة.

![خط أنابيب البيانات: يعالج `python CodeUpdateHandler.py` ملف `prompt.json` الرئيسي — يقسمه حسب اللغة إلى ملفات مطالبات لكل لغة، ويولّد بيانات بطاقة JSON وصفحة تفاصيل لكل معرّف، مع تحويل OpenCC من الصينية المبسّطة إلى التقليدية](/img/docs/data-pipeline.svg)

> **ملاحظة**: يُنصح بضبط `id` على 500 أو أعلى لتفادي تعارض المعرّفات مع المطالبات الحالية أو محتوى المجتمع. يقوم تشغيل `python CodeUpdateHandler.py` تلقائياً بتوليد بيانات البطاقة وصفحة التفاصيل لكل مطالبة (بما في ذلك الجديدة)، دون الحاجة إلى إنشاء ملف صفحة يدوياً؛ غير أن المطالبات المخصّصة تفتقر افتراضياً إلى وصف ميتا منتقى وبيانات تعليقات.

## واجهة خلفية مخصصة

يتصل المشروع افتراضيًا بواجهة خلفية مشتركة (تسجيل الدخول والمفضلة والمجتمع والتعليقات والمزامنة بين الأجهزة تعتمد عليها جميعًا)، ويوثّق `src/api` عقد الواجهة الكامل كمرجع. خدمة الواجهة الخلفية نفسها ليست مفتوحة المصدر؛ للنشر **المستضاف ذاتيًا بالكامل مع واجهة خلفية خاصة**، راجع [اختيار نموذج النشر](../deploy#اختيار-نموذج-النشر).

هيكل وحدة API:

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

التخزين المؤقت: يُخزَّن بيانات API بذكاء عبر `lscache` مع ETag — عندما يُرجع الخادم 304 Not Modified، يُعاد استخدام التخزين المؤقت المحلي لتقليل نقل البيانات.
