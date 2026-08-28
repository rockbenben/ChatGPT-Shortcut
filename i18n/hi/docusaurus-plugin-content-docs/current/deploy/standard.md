---
sidebar_label: Standard तैनाती
title: AI Short Standard तैनाती | स्थानीय बिल्ड, Vercel, Cloudflare, Docker
description: AI Short Standard तैनाती गाइड, आधिकारिक साझा बैकएंड का पुनः उपयोग करती है, स्थानीय बिल्ड, Vercel एक-क्लिक तैनाती, Cloudflare Pages और Docker का समर्थन, तुरंत काम करती है।
---

# Standard तैनाती

आधिकारिक साझा बैकएंड का पुनः उपयोग करती है और तुरंत काम करती है। पहले प्रोजेक्ट को Fork करें, फिर नीचे दी गई किसी एक विधि से तैनात करें।

**आवश्यकताएँ**: [Node.js 20.0](https://nodejs.org/) या उससे ऊपर का संस्करण, macOS, Windows (WSL सहित), या Linux पर।

![Standard तैनाती टोपोलॉजी: Fork करने के बाद स्थानीय बिल्ड, Vercel, Cloudflare Pages या Docker के माध्यम से तैनात करें — सभी आधिकारिक साझा बैकएंड का पुनः उपयोग करते हैं (लॉगिन, पसंदीदा, समुदाय, टिप्पणियाँ, क्रॉस-डिवाइस सिंक)](/img/docs/standard-deploy-topology.svg)

## स्थानीय बिल्ड

```shell
# डिपेंडेंसी इंस्टॉल करें
yarn

# स्थानीय विकास
yarn start

# build: सभी 18 भाषाएँ खंडों में बनाता है (एक ही बार में मेमोरी खत्म हो जाती है); आउटपुट build/ में — केवल एक भाषा के लिए नीचे --locale देखें
yarn build
```

> **केवल विशिष्ट भाषाएँ बिल्ड करें**: `yarn build --locale <locale>` का उपयोग करें (जैसे `zh-Hans`, `en`, `ja`… पूरी locale सूची `scripts/i18nLocales.mjs` में देखें)। कई को जोड़ें: `yarn build --locale zh-Hans && yarn build --locale en`।

## Vercel तैनाती

Vercel पर एक क्लिक में तैनात करने के लिए नीचे दिए गए बटन पर क्लिक करें:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **नोट**: Vercel का मुफ़्त टियर मेमोरी सीमा के कारण विफल हो सकता है। इसके बजाय एकल भाषा तैनात करें — प्रोजेक्ट की **Settings → Build & Deployment → Build Command** पर जाएँ, **Override** क्लिक करें और एकल-भाषा कमांड सेट करें (चीनी के लिए `yarn build --locale zh-Hans`, पुर्तगाली के लिए `yarn build --locale pt`, आदि)।

## Cloudflare Pages तैनाती

पहले 👉 [इस प्रोजेक्ट को Fork करें](https://github.com/rockbenben/ChatGPT-Shortcut/fork), फिर तैनात करें:

1. [Pages निर्माण पेज](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages) खोलें और **Connect to Git** चुनें। अगर Create a Worker पेज खुले, तो Pages का प्रवेश नीचे दिए **Get started** लिंक से है
2. आपने जो रिपॉजिटरी Fork की है उसे कनेक्ट करें
3. बिल्ड कॉन्फ़िगर करें:
   - **Build command**: `yarn build --locale zh-Hans` (जो भाषा तैनात करनी हो उसके अनुसार locale बदलें, जैसे पुर्तगाली के लिए `yarn build --locale pt`)
   - **Output directory**: `build`
   - **Environment variables**: `YARN_VERSION` = `1.22.22`
4. **Deploy** क्लिक करें और Cloudflare Pages के बिल्ड पूरा होने की प्रतीक्षा करें

> **`YARN_VERSION` ज़रूरी है**: Cloudflare का v3 बिल्ड सिस्टम डिफ़ॉल्ट रूप से Yarn 4.9.1 लेता है और v2 की तरह `yarn.lock` से वर्ज़न नहीं पहचानता। इस रिपॉज़िटरी में Yarn Classic का v1 lockfile है, इसलिए पिन किए बिना Yarn 4 संभाल लेगा। Node सेट करने की ज़रूरत नहीं: v3 डिफ़ॉल्ट 22.16.0 है, जो आवश्यक 20 से पहले ही ऊपर है।

इसके बाद हर push पर स्वचालित रूप से बिल्ड और तैनाती ट्रिगर होती है।

## Docker तैनाती

एक लाइन में तैनाती:

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
