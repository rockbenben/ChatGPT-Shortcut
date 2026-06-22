---
sidebar_label: कॉन्फ़िगरेशन और अनुकूलन
title: AI Short कॉन्फ़िगरेशन और अनुकूलन | शीर्षक, प्रॉम्प्ट, कस्टम बैकएंड संशोधित करें
description: AI Short को कस्टमाइज़ करें — साइट का शीर्षक और विवरण बदलें, होमपेज प्रॉम्प्ट जोड़ें, कस्टम बैकएंड से जुड़ें, साथ ही API मॉड्यूल संरचना और कैशिंग तंत्र की व्याख्या।
---

# कॉन्फ़िगरेशन और अनुकूलन

AI Short ओपन-सोर्स है — आप साइट शीर्षक, विवरण, प्रॉम्प्ट और बहुत कुछ स्वतंत्र रूप से संशोधित कर सकते हैं।

## साइट का शीर्षक और विवरण

`docusaurus.config.js` संपादित करें।

## डॉक्स और गाइड

`docs/` के अंतर्गत संबंधित फ़ाइलें संपादित करें।

## होमपेज प्रॉम्प्ट

स्रोत डेटा `src/data/prompt.json` में है — एक array जिसमें प्रत्येक ऑब्जेक्ट सभी भाषा संस्करणों को भाषा कोड (`zh` / `en` / `ja`, आदि) द्वारा key के रूप में संग्रहीत करता है। प्रॉम्प्ट जोड़ने का प्रारूप:

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

संपादन के बाद `python CodeUpdateHandler.py` चलाएँ। यह स्क्रिप्ट `prompt.json` को प्रति-भाषा `prompt_<locale>.json` फ़ाइलों में विभाजित करती है और प्रत्येक भाषा के होमपेज व क्यूरेटेड प्रॉम्प्ट पेजों को अपडेट करती है।

![डेटा पाइपलाइन: मास्टर prompt.json को python CodeUpdateHandler.py द्वारा संसाधित किया जाता है — भाषा के अनुसार प्रति-locale प्रॉम्प्ट फ़ाइलों में विभाजित कर, प्रत्येक id के कार्ड JSON और विवरण पेज जनरेट करते हुए, OpenCC सरलीकृत-से-पारंपरिक चीनी रूपांतरण के साथ।](/img/docs/data-pipeline.svg)

> **नोट**: मौजूदा प्रॉम्प्ट या समुदाय सामग्री की ID से टकराव से बचने के लिए `id` को 500 या उससे ऊपर सेट करें। `python CodeUpdateHandler.py` चलाने पर हर प्रॉम्प्ट (नए सहित) के लिए कार्ड डेटा और विवरण पेज स्वतः जनरेट हो जाते हैं, किसी पेज फ़ाइल को मैन्युअल रूप से बनाने की ज़रूरत नहीं; कस्टम प्रॉम्प्ट में डिफ़ॉल्ट रूप से क्यूरेटेड मेटा विवरण और कमेंट डेटा नहीं होता।

## कस्टम बैकएंड

डिफ़ॉल्ट रूप से प्रोजेक्ट एक साझा बैकएंड से जुड़ा है (लॉगिन, पसंदीदा, समुदाय, टिप्पणियाँ और क्रॉस-डिवाइस सिंक सभी इसी पर निर्भर हैं), और `src/api` संदर्भ के लिए पूर्ण इंटरफ़ेस अनुबंध का दस्तावेज़ीकरण करता है। बैकएंड सेवा स्वयं ओपन-सोर्स नहीं है; **अपने स्वयं के बैकएंड के साथ पूरी तरह स्व-होस्टेड तैनाती** के लिए, [तैनाती मॉडल चुनें](../deploy#तैनाती-मॉडल-चुनें) देखें।

API मॉड्यूल संरचना:

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

कैशिंग: API डेटा `lscache` और ETag के माध्यम से बुद्धिमानी से कैश होता है — जब सर्वर 304 Not Modified लौटाता है, तो डेटा ट्रांसफर कम करने के लिए स्थानीय कैश पुनः उपयोग किया जाता है।
