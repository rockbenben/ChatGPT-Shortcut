---
sidebar_label: डिप्लॉयमेंट
title: डिप्लॉयमेंट और कस्टमाइज़ेशन गाइड | AI Short को आसानी से कॉन्फ़िगर करें
description: जानें कि अपने AI Short प्रोजेक्ट को तेज़ी से कैसे डिप्लॉय और कस्टमाइज़ करें। यह गाइड Vercel, Cloudflare, Docker, और लोकल डिप्लॉयमेंट को कवर करता है, साथ ही कंटेंट को एडिट करने और ऑटो-अपडेट्स को सक्षम करने का तरीका भी बताता है।
---

# प्रोजेक्ट डिप्लॉयमेंट

## कॉन्फ़िगरेशन और कस्टमाइज़ेशन

AI Short एक ओपन-सोर्स प्रोजेक्ट है, और आप साइट का शीर्षक, विवरण, प्रॉम्प्ट्स और बहुत कुछ स्वतंत्र रूप से संशोधित कर सकते हैं। नीचे सामान्य कस्टमाइज़ेशन विकल्प दिए गए हैं:

- **साइट का शीर्षक और विवरण संपादित करें**  
    `docusaurus.config.js` फ़ाइल को अपडेट करें।

- **उपयोग निर्देश और डॉक्स संपादित करें**  
    सभी दस्तावेज़ीकरण फ़ाइलें `docs` डायरेक्टरी में स्थित हैं। आवश्यकतानुसार संबंधित फ़ाइल को खोलें और संशोधित करें।

- **होमपेज प्रॉम्प्ट्स संपादित करें**  
    होमपेज प्रॉम्प्ट्स `src/data/prompt.json` में संग्रहीत हैं।  
    विशिष्ट भाषाओं (जैसे, चीनी) के लिए, `src/data/prompt_zh.json` संपादित करें।  
    एक नए प्रॉम्प्ट के लिए उदाहरण प्रारूप:

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

**ध्यान दें**: नए प्रॉम्प्ट्स के लिए `id >= 500` का उपयोग करें। इनके लिए समर्पित पेज या टिप्पणियाँ नहीं होंगी।
यदि आप एक समर्पित पेज चाहते हैं, तो `src/data/pages/prompt` से एक टेम्प्लेट फ़ाइल कॉपी करें और उसे संशोधित करें।

- **कस्टम बैकएंड**
    प्रोजेक्ट वर्तमान में एक साझा बैकएंड से जुड़ा हुआ है।
    अपना खुद का सेट अप करने के लिए, `src/api.js` में API विवरण देखें।

- **बहु-भाषा समर्थन**
    भाषा फ़ाइलों को अपडेट करने के बाद, बैच प्रोसेसिंग के लिए `CodeUpdateHandler.py` स्क्रिप्ट चलाएँ:

`bash
  python CodeUpdateHandler.py
  `

यह स्क्रिप्ट `prompt.json` को विभाजित करेगी और प्रत्येक भाषा के मुख्य और विशेष रुप से प्रदर्शित प्रॉम्प्ट पेजों पर अपडेट सिंक करेगी।

## डिप्लॉयमेंट गाइड

**सिस्टम आवश्यकताएँ**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (WSL सहित), या Linux

### लोकल डिप्लॉयमेंट

सुनिश्चित करें कि आपके पास [Node.js](https://nodejs.org/) स्थापित है।

```bash
# निर्भरताएँ स्थापित करें
yarn

# लोकल डेवलपमेंट
yarn start

# स्टैटिक फ़ाइलें बनाएँ
yarn build

# कई लोकेल के लिए बनाएँ
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

# उदाहरण: दो भाषाओं के लिए बनाएँ
yarn build --locale zh && yarn build --locale en
```

### Vercel डिप्लॉयमेंट

ChatGPT-Shortcut को एक क्लिक में Vercel पर डिप्लॉय करने के लिए नीचे क्लिक करें:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**ध्यान दें**: मुफ्त Vercel योजना में मेमोरी खत्म हो सकती है। उस स्थिति में, केवल एक भाषा डिप्लॉय करें।

चरण:

1.  अपने डिप्लॉय किए गए Vercel प्रोजेक्ट पर जाएँ → **Settings**।
2.  **Build & Deployment** के तहत, **Build Command** खोजें → **Override** पर क्लिक करें।
3.  बिल्ड कमांड सेट करें, जैसे:

- चीनी के लिए: `yarn build --locale zh`
   - पुर्तगाली के लिए: `yarn build --locale pt`

### Cloudflare Pages डिप्लॉयमेंट

👉 [रिपॉजिटरी को फोर्क करें](https://github.com/rockbenben/ChatGPT-Shortcut/fork), फिर Cloudflare Pages के माध्यम से डिप्लॉय करें:

1.  [Cloudflare Pages](https://pages.cloudflare.com/) में लॉग इन करें, **Create a project** चुनें।
2.  अपनी फोर्क की गई रिपॉजिटरी को कनेक्ट करें।
3.  बिल्ड सेटिंग्स कॉन्फ़िगर करें:

- **Build command**: `yarn build --locale zh` (या कोई अन्य भाषा)
   - **Output directory**: `build`

4.  डिप्लॉय करें और बिल्ड खत्म होने की प्रतीक्षा करें।

जब आप नए कमिट्स पुश करेंगे तो Cloudflare Pages स्वचालित रूप से फिर से डिप्लॉय हो जाएगा।

### Docker डिप्लॉयमेंट

Docker के साथ चलाएँ:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

या `docker-compose` के साथ:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## ऑटो-अपडेट सक्षम करें

यदि आपने एक-क्लिक Vercel डिप्लॉयमेंट का उपयोग किया है, तो आपको अक्सर "अपडेट उपलब्ध" दिखाई दे सकता है।
ऐसा इसलिए है क्योंकि Vercel एक फोर्क के बजाय एक नया रिपॉजिटरी बनाता है, जिससे सिंक टूट जाता है।

**सुधार:**

1.  पुरानी रिपॉजिटरी को हटा दें।
2.  इस प्रोजेक्ट को सीधे फोर्क करें (फोर्क बटन का उपयोग करें)।
3.  अपने फोर्क से [Vercel का नया प्रोजेक्ट पेज](https://vercel.com/new) के माध्यम से फिर से डिप्लॉय करें।

### स्वचालित अपडेट

> यदि आपको **Upstream Sync** के साथ त्रुटियाँ दिखाई देती हैं, तो **Sync Fork** को एक बार मैन्युअल रूप से चलाएँ।

फोर्क करने के बाद, GitHub को आपको वर्कफ़्लो को मैन्युअल रूप से सक्षम करने की आवश्यकता होती है:

- अपने फोर्क में **Actions** पर जाएँ
- वर्कफ़्लो सक्षम करें, विशेष रूप से **Upstream Sync Action**।

यह अपस्ट्रीम अपडेट्स को खींचने के लिए दैनिक रूप से चलेगा।

### मैनुअल अपडेट

तत्काल अपडेट के लिए, फोर्क्स को सिंक करने पर [GitHub डॉक्स](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) देखें।

⭐ इस प्रोजेक्ट को स्टार करें / 👀 देखें या नई सुविधाओं के बारे में सूचित होने के लिए लेखक का अनुसरण करें।
