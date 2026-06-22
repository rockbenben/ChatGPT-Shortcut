---
sidebar_label: স্ট্যান্ডার্ড ডিপ্লয়মেন্ট
title: AI Short স্ট্যান্ডার্ড ডিপ্লয়মেন্ট | লোকাল বিল্ড, Vercel, Cloudflare, Docker
description: AI Short স্ট্যান্ডার্ড ডিপ্লয়মেন্ট গাইড, অফিসিয়াল শেয়ার্ড ব্যাকএন্ড পুনরায় ব্যবহার করে, লোকাল বিল্ড, Vercel এক-ক্লিক ডিপ্লয়, Cloudflare Pages এবং Docker সমর্থন করে, ইনস্টল করেই ব্যবহার শুরু করা যায়।
---

# স্ট্যান্ডার্ড ডিপ্লয়মেন্ট

অফিসিয়াল শেয়ার্ড ব্যাকএন্ড পুনরায় ব্যবহার করে এবং সরাসরি কাজ করে। প্রথমে প্রজেক্টটি Fork করুন, তারপর নিচের যেকোনো একটি পদ্ধতিতে ডিপ্লয় করুন।

**প্রয়োজনীয়তা**: [Node.js 20.0](https://nodejs.org/) বা উচ্চতর সংস্করণ, macOS, Windows (WSL সহ), বা Linux-এ।

![স্ট্যান্ডার্ড ডিপ্লয়মেন্ট টপোলজি: Fork করার পরে লোকাল বিল্ড, Vercel, Cloudflare Pages বা Docker-এর মাধ্যমে ডিপ্লয় করুন — সবই অফিসিয়াল শেয়ার্ড ব্যাকএন্ড পুনরায় ব্যবহার করে (লগইন, সংগ্রহ, কমিউনিটি, মন্তব্য, ক্রস-ডিভাইস সিঙ্ক)।](/img/docs/standard-deploy-topology.svg)

## লোকাল বিল্ড

```shell
# ডিপেন্ডেন্সি ইনস্টল করুন
yarn

# লোকাল ডেভেলপমেন্ট
yarn start

# বিল্ড: build ডিরেক্টরিতে স্ট্যাটিক ফাইল আউটপুট করে, scripts/i18nLocales.mjs-এ defaultLocale ব্যবহার করে
yarn build
```

> **শুধুমাত্র নির্দিষ্ট ভাষা বিল্ড করুন**: `yarn build --locale <locale>` ব্যবহার করুন (যেমন `zh-Hans`, `en`, `ja`… সম্পূর্ণ locale তালিকার জন্য `scripts/i18nLocales.mjs` দেখুন)। একাধিক চেইন করুন: `yarn build --locale zh-Hans && yarn build --locale en`।

## Vercel ডিপ্লয়মেন্ট

Vercel-এ এক ক্লিকে ডিপ্লয় করতে নিচের বাটনে ক্লিক করুন:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **নোট**: মেমোরি সীমার কারণে Vercel-এর বিনামূল্যের স্তর ব্যর্থ হতে পারে। পরিবর্তে একটি একক ভাষা ডিপ্লয় করুন — প্রজেক্টের **Settings → Build & Deployment → Build Command**-এ যান, **Override** ক্লিক করুন, এবং একটি একক-ভাষার কমান্ড সেট করুন (চীনা ভাষার জন্য `yarn build --locale zh-Hans`, পর্তুগিজের জন্য `yarn build --locale pt` ইত্যাদি)।

## Cloudflare Pages ডিপ্লয়মেন্ট

প্রথমে 👉 [এই প্রজেক্টটি Fork করুন](https://github.com/rockbenben/ChatGPT-Shortcut/fork), তারপর ডিপ্লয় করুন:

1. [Cloudflare Pages](https://pages.cloudflare.com/)-এ সাইন ইন করুন এবং **Create a project** বেছে নিন
2. আপনি যে রিপোজিটরিটি এইমাত্র Fork করেছেন সেটি সংযুক্ত করুন
3. বিল্ড কনফিগার করুন:
   - **Build command**: `yarn build --locale zh-Hans` (আপনি যে ভাষায় ডিপ্লয় করতে চান সেই locale দিয়ে প্রতিস্থাপন করুন, যেমন পর্তুগিজের জন্য `yarn build --locale pt`)
   - **Output directory**: `build`
4. **Deploy** ক্লিক করুন এবং Cloudflare Pages বিল্ড শেষ করার জন্য অপেক্ষা করুন

পরবর্তীতে প্রতিটি push স্বয়ংক্রিয়ভাবে একটি বিল্ড এবং ডিপ্লয় ট্রিগার করবে।

## Docker ডিপ্লয়মেন্ট

এক-লাইনে ডিপ্লয়মেন্ট:

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
