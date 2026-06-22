---
sidebar_label: अपने Fork को सिंक में रखें
title: AI Short सिंक अपडेट | Fork अपस्ट्रीम के साथ स्वचालित रूप से अपडेट
description: अपने AI Short fork को अपस्ट्रीम अपडेट के साथ स्वचालित रूप से सिंक रखें — Vercel तैनाती में अपडेट न दिखने की समस्या हल करें, GitHub Actions स्वचालित सिंक सक्षम करें।
---

# अपने Fork को सिंक में रखें

एक क्लिक Vercel तैनाती में "अपडेट उपलब्ध है" का संकेत बना रह सकता है — क्योंकि Vercel Fork के बजाय एक नया प्रोजेक्ट बनाता है, इसलिए वह अपस्ट्रीम अपडेट का पता नहीं लगा पाता। इसे ठीक करने के लिए:

1. मूल रिपॉजिटरी हटाएँ
2. पेज के ऊपरी दाईं ओर **Fork** बटन का उपयोग करके इस प्रोजेक्ट को Fork करें
3. [Vercel नए-प्रोजेक्ट पेज](https://vercel.com/new) पर Import Git Repository में Fork किए गए रिपॉजिटरी को फिर से इम्पोर्ट करें और तैनात करें

## स्वचालित अपडेट सक्षम करें

> यदि आपको Upstream Sync त्रुटि आती है, तो एक बार Sync Fork मैन्युअल रूप से चलाएँ!

Fork करने के बाद, Actions पेज पर Workflows को मैन्युअल रूप से सक्षम करें और Upstream Sync action एक बार चलाएँ। एक बार सक्षम होने पर, प्रोजेक्ट हर दिन स्वचालित रूप से सिंक होता है:

![Auto-update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enable auto-update](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## मैन्युअल अपडेट

तुरंत हाथ से अपडेट करना चाहते हैं? [GitHub fork-syncing डॉक्स](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) देखें।

आप इस प्रोजेक्ट को star/watch भी कर सकते हैं ताकि नई सुविधाओं की सूचनाएँ मिलती रहें।
