---
sidebar_label: Yapılandırma ve Özelleştirme
title: AI Short Yapılandırma ve Özelleştirme | Başlığı, Promptları Değiştirin, Özel Backend
description: AI Short'u özelleştirin — site başlığını ve açıklamasını değiştirin, ana sayfaya prompt ekleyin ve özel bir backend'e bağlanın; API modül yapısı ve önbellekleme mekanizması açıklamaları dahil.
---

# Yapılandırma ve Özelleştirme

AI Short açık kaynaklıdır — site başlığını, açıklamasını, promptları ve daha fazlasını özgürce değiştirebilirsiniz.

## Site başlığı ve açıklaması

`docusaurus.config.js` dosyasını düzenleyin.

## Belgeler ve kılavuzlar

`docs/` altındaki ilgili dosyaları düzenleyin.

## Ana sayfa promptları

Kaynak veriler `src/data/prompt.json` dosyasında bulunur — her nesne tüm dil sürümlerini dil koduna göre (`zh` / `en` / `ja` vb.) anahtarlayan bir dizi. Prompt ekleme biçimi:

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

Düzenledikten sonra `python CodeUpdateHandler.py` komutunu çalıştırın. Script, `prompt.json` dosyasını dile göre `prompt_<locale>.json` dosyalarına böler ve her dilin ana sayfasını ve öne çıkan prompt sayfalarını günceller.

![Veri hattı: ana prompt.json dosyası python CodeUpdateHandler.py ile işlenir — dile göre dil bazlı prompt dosyalarına bölünür, her id için kart JSON'u ve detay sayfası oluşturulur ve OpenCC ile Basitleştirilmiş Çince'den Geleneksel Çince'ye dönüştürme yapılır](/img/docs/data-pipeline.svg)

> **Not**: Mevcut promptların veya topluluk içeriğinin ID'leriyle çakışmaması için `id` değerini 500 veya üstüne ayarlamanız önerilir. `python CodeUpdateHandler.py` komutunu çalıştırmak, her prompt için (yeni eklenenler dahil) kart verisini ve detay sayfasını otomatik olarak oluşturur; sayfa dosyasını elle oluşturmanıza gerek yoktur. Özel promptların yalnızca varsayılan olarak özenle hazırlanmış meta açıklaması ve yorum verisi bulunmaz.

## Özel backend

Proje varsayılan olarak paylaşımlı bir backend'e bağlanır (giriş, favoriler, topluluk, yorumlar ve cihazlar arası senkronizasyon hepsi buna bağlıdır); `src/api` tam arayüz sözleşmesini referans olarak belgeler. Backend hizmetinin kendisi açık kaynak değildir; **kendi backend'iyle tamamen kendi kendine barındırılan bir dağıtım** için [Dağıtım Modeli Seçin](../deploy#dağıtım-modeli-seçin) bölümüne bakın.

API modül yapısı:

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

Önbellekleme: API verileri `lscache` ve ETag aracılığıyla akıllıca önbelleğe alınır — sunucu 304 Not Modified döndürdüğünde veri aktarımını azaltmak için yerel önbellek yeniden kullanılır.
