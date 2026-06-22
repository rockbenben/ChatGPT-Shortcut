---
sidebar_label: Standart Dağıtım
title: AI Short Standart Dağıtım | Yerel Derleme, Vercel, Cloudflare, Docker
description: AI Short standart dağıtım kılavuzu; resmi paylaşımlı backend'i yeniden kullanır ve yerel derleme, tek tıkla Vercel dağıtımı, Cloudflare Pages ve Docker'ı destekler — kutudan çıktığı gibi çalışır.
---

# Standart Dağıtım

Resmi paylaşımlı backend'i yeniden kullanır ve kutudan çıktığı gibi çalışır. Önce projeyi fork edin, ardından aşağıdaki yöntemlerden biriyle dağıtın.

**Gereksinimler**: macOS, Windows (WSL dahil) veya Linux üzerinde [Node.js 20.0](https://nodejs.org/) veya üstü.

![Standart dağıtım topolojisi: projeyi fork ettikten sonra yerel derleme, Vercel, Cloudflare Pages veya Docker ile dağıtın—hepsi resmi paylaşımlı backend'i (giriş, koleksiyonlar, topluluk, yorumlar, cihazlar arası senkronizasyon) yeniden kullanır](/img/docs/standard-deploy-topology.svg)

## Yerel Derleme

```shell
# bağımlılıkları yükle
yarn

# yerel geliştirme
yarn start

# derleme: statik dosyaları build dizinine çıkarır; scripts/i18nLocales.mjs içindeki defaultLocale kullanılır
yarn build
```

> **Yalnızca belirli dilleri derlemek için**: `yarn build --locale <locale>` kullanın (örn. `zh-Hans`, `en`, `ja`… tam locale listesi için `scripts/i18nLocales.mjs` dosyasına bakın). Birden fazlasını zincirleyin: `yarn build --locale zh-Hans && yarn build --locale en`.

## Vercel Dağıtımı

Vercel'e tek tıkla dağıtmak için aşağıdaki düğmeye tıklayın:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Not**: Vercel'in ücretsiz katmanı bellek sınırları nedeniyle başarısız olabilir. Bunun yerine tek bir dil dağıtın — projenin **Settings → Build & Deployment → Build Command** bölümüne gidin, **Override**'a tıklayın ve tek dilli bir komut belirleyin (Çince için `yarn build --locale zh-Hans`, Portekizce için `yarn build --locale pt` vb.).

## Cloudflare Pages Dağıtımı

Önce 👉 [Bu projeyi fork edin](https://github.com/rockbenben/ChatGPT-Shortcut/fork), ardından dağıtın:

1. [Cloudflare Pages](https://pages.cloudflare.com/) oturumu açın ve **Create a project** seçeneğini seçin
2. Az önce fork ettiğiniz depoyu bağlayın
3. Derlemeyi yapılandırın:
   - **Build command**: `yarn build --locale zh-Hans` (dağıtmak istediğiniz dille değiştirin, örn. Portekizce için `yarn build --locale pt`)
   - **Output directory**: `build`
4. **Deploy**'a tıklayın ve Cloudflare Pages'in derlemeyi tamamlamasını bekleyin

Bundan sonra her push otomatik olarak bir derleme ve dağıtımı tetikler.

## Docker Dağıtımı

Tek satırla dağıtım:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Ya da `docker-compose` ile:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
