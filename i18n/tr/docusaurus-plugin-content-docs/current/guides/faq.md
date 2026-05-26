---
sidebar_label: SSS
title: AI Short SSS | Prompt Optimizasyonu ve AI Halüsinasyonu Çözümü
description: Prompt sonuçları beklediğiniz gibi değil mi? AI yanlış bilgi mi üretiyor? Bu kılavuz, sık karşılaşılan soruları yanıtlar; promptları optimize etmeyi, AI halüsinasyonundan kaçınmayı ve verilerinizi yedeklemeyi öğretir.
---

# Sıkça Sorulan Sorular

## AiShort ücretli mi?

AiShort web sürümü **tamamen ücretsizdir**; prompta göz atmak, kopyalamak ve aramak için ödeme yapmanız hatta hesap açmanız bile gerekmez. Giriş yaptıktan sonra kullanılan gelişmiş özellikler (koleksiyon, özel promptlar, topluluk paylaşımı) de ücretsizdir.

Not: AiShort yalnızca prompt sağlar; **AI modelinin kendisinin çağrılmasının ücretli olup olmadığı, kullandığınız AI hizmetine bağlıdır** (örn. ChatGPT ücretsiz/ücretli sürüm, API ücretlendirmesi vb.).

## Hangi AI modellerini destekliyor?

AiShort'taki promptlar geneldir; **herhangi bir AI senaryosunda** kullanılabilir—sohbet arayüzleri, Cursor gibi kodlama araçları, API çağrıları, agent iş akışları vb. Yaygın seçenekler arasında:

- Uluslararası: ChatGPT, Gemini, Claude, Grok
- Çin Anakarası: DeepSeek, Tongyi Qianwen, Wenxin Yiyan, Doubao, Kimi, ChatGLM, Xunfei Spark, Tencent Yuanbao
- API Platformları: OpenRouter, SiliconFlow, Groq

Daha fazla model listesi için [Başlarken → Popüler AI Modelleri](./getting-started#popüler-ai-modelleri)'ne bakın.

## Neden İngilizce promptlar kullanmalı?

AI modelleri eğitim verilerinin büyük çoğunluğunu İngilizceden aldığı için İngilizce talimatları daha tutarlı ve isabetli yorumlar. Bu, Türk teknoloji sektöründe zaten yaygın bir tercih: belgeler, kod yorumları ve teknik terminoloji çoğunlukla İngilizce yazılır, dolayısıyla iki dilli bir iş akışı doğaldır.

Pratikte iyi sonuç veren formül: **İngilizce promptu yapıştırın + sonuna Türkçe yanıt direktifi ekleyin**. Bu yöntem hem modelin kararlılığını korur hem de çıktıyı doğrudan ekibinize ya da müşterilerinize sunulabilir hale getirir.

> 💡 Türkçe çıktı için promptun sonuna şunlardan birini ekleyin: `Türkçe yanıtla`, `respond in Turkish` veya `tüm çıktıyı Türkçe olarak ver`. Resmi bir tonda yazmasını istiyorsanız `resmi Türkçe ile yanıtla (siz formu)` ifadesini kullanın.

## Her seferinde promptu girmem gerekiyor mu?

**API çağrısı**: Promptu `system prompt` olarak ayarlayın; sonraki konuşmalarda otomatik geçerli olur.

**Web sürümü**: Konuşma değiştirmediyseniz, ChatGPT mevcut promptu hatırlar. Yanıtlar konudan sapmaya başlarsa "unuttu" demektir; promptu yeniden yapıştırmanız yeterli.

**İpucu**: Sık kullandığınız konuşmaları tarayıcı yer imlerine kaydedin, bir dahaki sefere doğrudan açın.

## Neden ilgili promptu bulamıyorum?

Ana sayfa arama kapsamı **seçilmiş prompt kütüphanesidir** (giriş yaptıktan sonra kişisel promptlarınızı da içerir); toplulukta paylaşılan promptları **içermez**.

Kısa anahtar kelimelerle ana sayfada bulamazsanız, [Topluluk Promptları](./community) sayfasında tekrar arayın—orada daha fazla kullanıcı paylaşımı bulunur.

## AI yanlış bilgi üretirse ne yapmalıyım?

AI bazen "halüsinasyon" görür; makul görünen ama aslında yanlış olan bilgiler üretir. Çözüm:

1. **Kritik bilgileri doğrulayın**: Özellikle veriler, alıntılar, kodlar
2. **Çok turlu optimizasyon**: AI'a yanıtını yeniden kontrol edip iyileştirmesini söyleyin
3. **Çapraz doğrulama**: Önemli sonuçları farklı promptlar veya modellerle doğrulayın

Uygun promptlar AI halüsinasyonlarını azaltabilir.

## Promptlarımı nasıl yedeklerim?

1. "Hesabım" sayfasına gidin → "Veri Yönetimi → Promptları Dışa Aktar" bölümünü bulun
2. "Verileri Dışa Aktar" düğmesine tıklayın
3. Sistem otomatik olarak indirilecek bir JSON dosyası oluşturur

Veri kaybını önlemek için düzenli olarak yedek almanız önerilir.

## Prompt sonuçları yeterince iyi değil mi?

1. **AI'a iyileştirme isteyin**: Kendi yanıtını puanlayıp geliştirmesini sağlayın
2. **Farklı açıdan sorun**: Aynı ihtiyacı farklı bir promptla ifade edin
3. **Topluluğa bakın**: [Topluluk Promptları](./community)'nda daha uygun bir sürüm olabilir—iyi promptlarınızı da orada paylaşabilirsiniz
4. **Geri bildirim verin**: Sorun yaşıyor veya öneriniz var mı? [Geri bildirim](/feedback)'e davet ediyoruz

## İlgili Belgeler

- [Başlarken](./getting-started) - Temel kullanım yöntemleri
- [Koleksiyonum](./my-collection) - Koleksiyon ve etiket yönetimi
- [Topluluk Promptları](./community) - Keşfet ve paylaş
