---
sidebar_label: ডিপ্লয়মেন্ট
title: ডিপ্লয়মেন্ট এবং কাস্টমাইজেশন গাইড | সহজেই AI Short কনফিগার করুন
description: শিখুন কিভাবে দ্রুত আপনার AI Short প্রজেক্ট ডিপ্লয় এবং কাস্টমাইজ করবেন। এই গাইড Vercel, Cloudflare, Docker, এবং লোকাল ডিপ্লয়মেন্ট কভার করে, সাথে কন্টেন্ট এডিট এবং অটো-আপডেট চালু করার পদ্ধতিও রয়েছে।
---

# প্রজেক্ট ডিপ্লয়মেন্ট

## কনফিগারেশন এবং কাস্টমাইজেশন

AI Short একটি ওপেন-সোর্স প্রজেক্ট, এবং আপনি সাইটের শিরোনাম, বর্ণনা, প্রম্পট এবং আরও অনেক কিছু অবাধে পরিবর্তন করতে পারেন। নিচে সাধারণ কাস্টমাইজেশন বিকল্পগুলি দেওয়া হলো:

- **সাইটের শিরোনাম এবং বর্ণনা সম্পাদনা করুন**  
    `docusaurus.config.js` ফাইলটি আপডেট করুন।

- **ব্যবহারের নির্দেশাবলী এবং ডক্স সম্পাদনা করুন**  
    সমস্ত ডকুমেন্টেশন ফাইল `docs` ডিরেক্টরিতে অবস্থিত। প্রয়োজন অনুযায়ী প্রাসঙ্গিক ফাইলটি খুলুন এবং পরিবর্তন করুন।

- **হোমপেজের প্রম্পট সম্পাদনা করুন**  
    হোমপেজের প্রম্পটগুলি `src/data/prompt.json`-এ সংরক্ষিত আছে।  
    নির্দিষ্ট ভাষার জন্য (যেমন, চাইনিজ), `src/data/prompt_zh.json` সম্পাদনা করুন।  
    একটি নতুন প্রম্পটের জন্য উদাহরণ ফরম্যাট:

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

**দ্রষ্টব্য**: নতুন প্রম্পটের জন্য `id >= 500` ব্যবহার করুন। এগুলির জন্য কোনো ডেডিকেটেড পেজ বা কমেন্ট থাকবে না।
আপনি যদি একটি ডেডিকেটেড পেজ চান, `src/data/pages/prompt` থেকে একটি টেমপ্লেট ফাইল কপি করুন এবং এটি পরিবর্তন করুন।

- **কাস্টম ব্যাকএন্ড**
    প্রজেক্টটি বর্তমানে একটি শেয়ার্ড ব্যাকএন্ডের সাথে লিঙ্ক করা আছে।
    নিজের ব্যাকএন্ড সেট আপ করতে, `src/api.js`-এ API বিবরণ দেখুন।

- **বহু-ভাষা সমর্থন**
    ভাষার ফাইলগুলি আপডেট করার পরে, ব্যাচ প্রসেসিংয়ের জন্য `CodeUpdateHandler.py` স্ক্রিপ্টটি চালান:

`bash
  python CodeUpdateHandler.py
  `

এই স্ক্রিপ্টটি `prompt.json` ফাইলটিকে বিভক্ত করবে এবং প্রতিটি ভাষার প্রধান এবং ফিচার্ড প্রম্পট পেজে আপডেটগুলি সিঙ্ক করবে।

## ডিপ্লয়মেন্ট গাইড

**সিস্টেমের প্রয়োজনীয়তা**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (WSL সহ), বা Linux

### লোকাল ডিপ্লয়মেন্ট

নিশ্চিত করুন আপনার [Node.js](https://nodejs.org/) ইনস্টল করা আছে।

```bash
# নির্ভরতা ইনস্টল করুন
yarn

# লোকাল ডেভেলপমেন্ট
yarn start

# স্ট্যাটিক ফাইল বিল্ড করুন
yarn build

# একাধিক লোকেলর জন্য বিল্ড করুন
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

# উদাহরণ: দুটি ভাষার জন্য বিল্ড করুন
yarn build --locale zh && yarn build --locale en
```

### Vercel ডিপ্লয়মেন্ট

এক ক্লিকে ChatGPT-Shortcut Vercel-এ ডিপ্লয় করতে নিচে ক্লিক করুন:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**দ্রষ্টব্য**: বিনামূল্যে Vercel প্ল্যানে মেমরি শেষ হয়ে যেতে পারে। সেক্ষেত্রে, শুধুমাত্র একটি ভাষা ডিপ্লয় করুন।

পদক্ষেপ:

1.  আপনার ডিপ্লয় করা Vercel প্রজেক্টে যান → **Settings**।
2.  **Build & Deployment** এর অধীনে, **Build Command** খুঁজুন → **Override** ক্লিক করুন।
3.  বিল্ড কমান্ড সেট করুন, যেমন:

- চাইনিজ এর জন্য: `yarn build --locale zh`
   - পর্তুগিজ এর জন্য: `yarn build --locale pt`

### Cloudflare Pages ডিপ্লয়মেন্ট

👉 [রেপোটি ফর্ক করুন](https://github.com/rockbenben/ChatGPT-Shortcut/fork), তারপর Cloudflare Pages এর মাধ্যমে ডিপ্লয় করুন:

1.  [Cloudflare Pages](https://pages.cloudflare.com/)-এ লগ ইন করুন, **Create a project** নির্বাচন করুন।
2.  আপনার ফর্ক করা রেপোটি সংযোগ করুন।
3.  বিল্ড সেটিংস কনফিগার করুন:

- **Build command**: `yarn build --locale zh` (বা অন্য কোনো ভাষা)
   - **Output directory**: `build`

4.  ডিপ্লয় করুন এবং বিল্ড শেষ হওয়ার জন্য অপেক্ষা করুন।

আপনি নতুন কমিট পুশ করলে Cloudflare Pages স্বয়ংক্রিয়ভাবে পুনরায় ডিপ্লয় করবে।

### Docker ডিপ্লয়মেন্ট

Docker দিয়ে চালান:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

অথবা `docker-compose` দিয়ে:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## অটো-আপডেট সক্ষম করুন

আপনি যদি এক-ক্লিকে Vercel ডিপ্লয়মেন্ট ব্যবহার করে থাকেন, তাহলে আপনি প্রায়শই "আপডেট উপলব্ধ" দেখতে পারেন।
এর কারণ হল Vercel একটি ফর্কের পরিবর্তে একটি নতুন রেপো তৈরি করে, যা সিঙ্ক ব্রেক করে।

**সমাধান:**

1.  পুরানো রেপোটি মুছে ফেলুন।
2.  সরাসরি এই প্রজেক্টটি ফর্ক করুন (ফর্ক বোতামটি ব্যবহার করুন)।
3.  আপনার ফর্ক থেকে [Vercel নতুন প্রজেক্ট পেজ](https://vercel.com/new) এর মাধ্যমে পুনরায় ডিপ্লয় করুন।

### স্বয়ংক্রিয় আপডেট

> যদি আপনি **Upstream Sync** এর সাথে ত্রুটি দেখতে পান, তাহলে একবার ম্যানুয়ালি **Sync Fork** চালান।

ফর্ক করার পরে, GitHub আপনাকে ম্যানুয়ালি ওয়ার্কফ্লো সক্ষম করতে বলবে:

- আপনার ফর্কের **Actions**-এ যান
- ওয়ার্কফ্লো সক্ষম করুন, বিশেষ করে **Upstream Sync Action**।

এটি আপস্ট্রিম আপডেটগুলি পুল করার জন্য প্রতিদিন চলবে।

### ম্যানুয়াল আপডেট

তাৎক্ষণিক আপডেটের জন্য, ফর্ক সিঙ্ক করার বিষয়ে [GitHub ডক্স](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) দেখুন।

⭐ এই প্রজেক্টটিকে স্টার / 👀 ওয়াচ করুন বা নতুন ফিচার সম্পর্কে বিজ্ঞপ্তি পেতে লেখককে অনুসরণ করুন।
