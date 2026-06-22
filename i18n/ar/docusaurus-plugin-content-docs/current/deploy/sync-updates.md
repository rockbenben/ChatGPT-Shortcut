---
sidebar_label: مزامنة Fork مع المصدر
title: مزامنة تحديثات AI Short | Fork يتابع المصدر تلقائيًا
description: اجعل Fork الخاص بـ AI Short يتابع تحديثات المصدر تلقائيًا — حل لمشكلة عدم ظهور التحديثات في نشر Vercel، وتفعيل المزامنة التلقائية عبر GitHub Actions.
---

# مزامنة Fork مع المصدر

قد يظل النشر بنقرة واحدة على Vercel يعرض تنبيه "تحديث متاح" — لأن Vercel يُنشئ مشروعًا جديدًا بدلًا من Fork، فلا يستطيع اكتشاف التحديثات الأصلية. لإصلاح ذلك:

1. احذف المستودع الأصلي
2. استخدم زر **Fork** في أعلى يمين الصفحة لعمل Fork لهذا المشروع
3. في [صفحة مشروع Vercel الجديد](https://vercel.com/new)، أعد استيراد المستودع المُفرَّع ضمن Import Git Repository وانشره

## تفعيل التحديث التلقائي

> إذا واجهت خطأ Upstream Sync، شغّل Sync Fork يدويًا مرة واحدة!

بعد عمل Fork، فعّل Workflows يدويًا من صفحة Actions وشغّل Upstream Sync Action مرة واحدة. بعد التفعيل، يتزامن المشروع تلقائيًا كل يوم:

![Auto-update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enable auto-update](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## التحديث اليدوي

هل تريد التحديث فورًا يدويًا؟ راجع [توثيق GitHub لمزامنة Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

يمكنك وضع نجمة / متابعة هذا المشروع لتلقّي إشعارات بالميزات الجديدة.
