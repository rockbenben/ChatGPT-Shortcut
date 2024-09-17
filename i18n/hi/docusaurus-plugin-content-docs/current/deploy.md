# परिनियोजन

AI शॉर्ट एक ओपन सोर्स प्रोजेक्ट है, आप वेबसाइट के नाम और विवरण को स्वतंत्र रूप से संशोधित कर सकते हैं।

- पेज का नाम बदलने के लिए, `docusaurus.config.js` फ़ाइल को संपादित करें।
- निर्देशों को संशोधित करने के लिए, `docs` निर्देशिका पर जाएँ।
- प्रॉम्प्ट शब्दों को संशोधित करने के लिए, आप उन्हें `src/data/prompt.json` में पा सकते हैं। यदि आपको केवल एक ही भाषा, जैसे कि चीनी, को संशोधित करने की आवश्यकता है, तो आप सीधे `src/data/prompt_zh.json` को संपादित कर सकते हैं।
- वर्तमान में, उपयोगकर्ता बैकएंड एक सामान्य बैकएंड सिस्टम से जुड़ा हुआ है। यदि आवश्यक हो, तो आप अपना स्वयं का बैकएंड बना सकते हैं, और संबंधित इंटरफ़ेस `src/api.js` फ़ाइल में स्थित है।

`CodeUpdateHandler.py` बैच प्रोसेसिंग मल्टी-लैंग्वेज परिनियोजन के लिए एक स्क्रिप्ट है। संशोधन पूरा करने के बाद, `python CodeUpdateHandler.py` निष्पादित करें, जो `prompt.json` को नियमों के अनुसार कई भाषाओं में विभाजित करेगा, और प्रत्येक भाषा के मुख्य पृष्ठ कोड और चयनित प्रॉम्प्ट शब्दों के स्वतंत्र पृष्ठ कोड को सिंक्रनाइज़ करेगा।

## परिनियोजन

### Vercel के साथ परिनियोजन

एक क्लिक के साथ Vercel प्लेटफ़ॉर्म पर ChatGPT-Shortcut परिनियोजित करने के लिए नीचे दिए गए बटन पर क्लिक करें:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

Vercel के साथ, आप अपनी परियोजना को तेज़ी से होस्ट कर सकते हैं और स्वचालित रूप से बिल्ड और परिनियोजन को संभाल सकते हैं, जो उन उपयोगकर्ताओं के लिए उपयुक्त है जिनके पास जटिल सर्वर कॉन्फ़िगरेशन आवश्यकताएँ नहीं हैं।

### स्थानीय परिनियोजन

सुनिश्चित करें कि आपने [Node.js](https://nodejs.org/) स्थापित किया है।

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
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

# Deploy for multiple languages
yarn build --locale zh && yarn build --locale en
```

### Docker परिनियोजन

यदि आप Docker से परिचित हैं, तो आप निम्न कमांड के साथ जल्दी से परिनियोजन कर सकते हैं:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

वैकल्पिक रूप से, आप `docker-compose` का उपयोग कर सकते हैं:

```yml
version: "3.8"

services:
docsify:
container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: unless-stopped
```

## सिंक्रनाइज़ अपडेट

यदि आपने Vercel पर एक क्लिक के साथ अपना खुद का प्रोजेक्ट तैनात किया है, तो आपको एक समस्या का सामना करना पड़ सकता है जहां अपडेट लगातार संकेतित होते हैं। यह वर्सेल के डिफ़ॉल्ट व्यवहार से उत्पन्न होता है, जो वर्तमान प्रोजेक्ट को फ़ॉर्क करने के बजाय आपके लिए एक नया प्रोजेक्ट बनाता है, जिससे उचित अपडेट डिटेक्शन में बाधा आती है। पुनः परिनियोजन के लिए निम्नलिखित चरणों का पालन करने की अनुशंसा की जाती है:

1. पिछली रिपॉजिटरी को हटाएँ।

2. वर्तमान प्रोजेक्ट को फ़ॉर्क करने के लिए पृष्ठ के ऊपरी दाएँ कोने में स्थित "फ़ॉर्क" बटन का उपयोग करें।

3. [वर्सेल न्यू प्रोजेक्ट पेज](https://vercel.com/new) पर, आयात Git रिपॉजिटरी अनुभाग से हाल ही में फ़ॉर्क की गई परियोजना का चयन करें और परिनियोजन के साथ आगे बढ़ें।

### स्वचालित अपडेट

> अपस्ट्रीम सिंक के निष्पादन के दौरान किसी त्रुटि का सामना करने की स्थिति में, मैन्युअल रूप से एकल सिंक फ़ॉर्क करें।

एक बार जब आप प्रोजेक्ट को फ़ॉर्क कर लेते हैं, तो GitHub प्रतिबंधों के कारण, अपने फ़ॉर्क किए गए प्रोजेक्ट के एक्शन पेज पर वर्कफ़्लो को मैन्युअल रूप से सक्षम करना और अपस्ट्रीम सिंक एक्शन को सक्रिय करना आवश्यक है। सक्रियण पर, अपडेट स्वचालित रूप से दैनिक आधार पर निष्पादित किए जाएँगे।

![स्वचालित अपडेट](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![स्वचालित अपडेट सक्षम करना](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### मैन्युअल अपडेट

यदि आप तुरंत मैन्युअल रूप से अपडेट करना चाहते हैं, तो आप फोर्क्ड प्रोजेक्ट को अपस्ट्रीम कोड के साथ सिंक्रोनाइज़ करने का तरीका जानने के लिए [GitHub के दस्तावेज़](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) का संदर्भ ले सकते हैं।

इस प्रोजेक्ट को स्टार/फ़ॉलो देकर या लेखक को फ़ॉलो करके, नए फ़ीचर अपडेट के बारे में समय पर सूचनाओं के बारे में सूचित रहने के लिए बेझिझक समर्थन दिखाएँ।
