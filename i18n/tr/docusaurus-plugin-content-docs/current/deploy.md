---
sidebar_label: Dağıtım
title: AI Short'u Dağıtın | Vercel, Docker & Cloudflare Kurulumu
description: Kendi AI prompt kitaplığınızı barındırmak mı istiyorsunuz? AI Short'u Vercel, Docker veya Cloudflare kullanarak kolayca dağıtın. Yapılandırma ipuçları ve otomatik güncelleme scriptleri dahil.
---

# Proje Dağıtımı

## Yapılandırma ve Özelleştirme

AI Short, web sitesi başlığını, açıklamasını, promptları ve diğer içerikleri ihtiyaçlarınıza göre özgürce değiştirmenize olanak tanıyan açık kaynaklı bir projedir. Aşağıda yaygın değişiklik seçenekleri ve işlem talimatları bulunmaktadır:

- **Web Sitesi Başlığı ve Açıklamasını Değiştirin**
  Web sitesinin başlık ve açıklama bilgilerini değiştirmek için lütfen `docusaurus.config.js` yapılandırma dosyasını düzenleyin.

- **Proje Kullanım Talimatları ve Tanıtımını Değiştirin**
  Projenin kullanım talimatları ve tanıtım dosyaları `docs` dizininde bulunmaktadır. Gerekli değişiklikleri yapmak için o dizindeki ilgili dosyaları açın.

- **Ana Sayfa Promptlarını Değiştirin**
  Ana sayfa promptları `src/data/prompt.json` dosyasında saklanır. Belirli bir dil için promptları değiştirmeniz gerekiyorsa, `src/data/prompt_tr.json` dosyasını doğrudan düzenleyebilirsiniz.

  ```json
  {
    "tr": {
      "title": "özel prompt",
      "prompt": "özel prompt",
      "description": "özel açıklama",
      "remark": "özel not"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

- **Özel Backend**
  Mevcut proje paylaşılan bir backend sistemine bağlıdır. Kendi backend'inizi oluşturmak istiyorsanız, `src/api` klasöründeki arayüz talimatlarına başvurabilirsiniz.

- **Çok Dilli Destek ve Dağıtım**
  Çok dilli değişiklikleri tamamladıktan sonra, toplu işleme için `CodeUpdateHandler.py` scriptini kullanabilirsiniz:

  ```bash
  python CodeUpdateHandler.py
  ```

## Dağıtım Talimatları

Sistem Gereksinimleri:

- [Node.js 20.0](https://nodejs.org/) veya üstü.
- macOS, Windows (WSL dahil) ve Linux desteklenir.

### Yerel Dağıtım

```shell
# Kurulum
yarn

# Yerel Geliştirme
yarn start

# Build
yarn build

# Belirli dil için build
yarn build --locale tr
```

### Vercel Dağıtımı

ChatGPT-Shortcut'u Vercel platformuna tek tıkla dağıtmak için aşağıdaki düğmeye tıklayın:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

### Docker Dağıtımı

```bash
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest
```

## Senkronizasyon Güncellemelerini Etkinleştirin

Projeyi fork ettikten sonra, fork ettiğiniz projenin Actions sayfasında Workflows'u manuel olarak etkinleştirmeniz ve Upstream Sync Action'ı etkinleştirmeniz gerekir. Etkinleştirildikten sonra, güncellemeler her gün otomatik olarak yürütülecektir.

![Otomatik Güncelleme](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)
