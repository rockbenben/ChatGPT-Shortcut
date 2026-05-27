---
sidebar_label: SSS
title: "AI Short SSS | Kullanım, Optimizasyon, Ticari Kullanım ve Gizlilik"
description: "AiShort ücretsiz mi? Promptlar modeller arası mı? Ticari kullanım izinli mi? Bu kılavuz kullanım, optimizasyon, ticari kullanım ve veri gizliliği hakkında 13 sık sorulan soruyu yanıtlıyor."
---

# Sıkça Sorulan Sorular

## AiShort bir AI prompt üreticisi midir?

Hayır. AiShort, senaryolara göre **özenle seçilmiş ve düzenlenmiş** insan eliyle hazırlanmış bir prompt şablon kütüphanesidir; LLM kullanarak otomatik prompt üreten bir araç değildir. Her prompt elden geçirilip etiketlere göre sınıflandırılmıştır; tek tıkla kopyalayıp ChatGPT / Claude / Gemini / DeepSeek gibi herhangi bir AI sohbet aracına yapıştırabilirsiniz. "İhtiyaçtan otomatik prompt üretme" tarzı bir araç arıyorsanız PromptPerfect veya ChatGPT prompt generator gibi seçenekler farklı bir ürün kategorisidir.

## AiShort ücretsiz mi? API Key gerekli mi?

Tamamen ücretsizdir; **API Key gerekmez, kayıt da gerekmez**. Promptlara göz atmak, aramak ve kopyalamak için herhangi bir hesap açmanıza gerek yoktur.

Kayıt olduktan sonra koleksiyon yönetimi ve sürükle-bırak sıralama, özel etiketler, kişisel prompt oluşturma ve yönetme, toplulukla paylaşma ve oylama, JSON veri dışa aktarımı, cihazlar arası senkronizasyon gibi ek özellikler açılır — bunlar da ücretsizdir. Tüm kod [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut)'ta açık kaynak olarak yayınlanmıştır.

Not: AiShort yalnızca promptları sağlar; **AI modelinin kendisinin çağrılmasının ücretli olup olmadığı, kullandığınız AI hizmetine bağlıdır** (örn. ChatGPT ücretsiz/ücretli sürüm, API ücretlendirmesi vb.).

## Kaç prompt var? Hangi senaryoları kapsar?

AiShort'ta **toplam 5000+ prompt** bulunur, iki kütüphaneye ayrılmıştır:

- **Küratörlü kütüphane** —— manuel seçilmiş, 25+ senaryo etiketiyle sınıflandırılmış, 18 dile tam çevrilmiş. Etiketler: yazma yardımı, IT/programlama, makaleler/raporlar, SEO/pazarlama, iş fonksiyonları, akademisyenler/öğretmenler, eğitim/öğrenciler, dil/çeviri, psikoloji/sosyal, düşünce eğitimi, üretkenlik araçları, terminal/yorumlayıcı, tartışma/konuşma, eleştiri/değerlendirme, eğlenceli bilim, hayat ansiklopedisi, tıbbi sağlık, finansal danışman, müzik/sanat, felsefe/din, metin/kelimeler, eğlenceli oyunlar, profesyonel danışman vs.
- **[Topluluk kütüphanesi](./community)** —— büyük çoğunluğu oluşturur, kullanıcılar tarafından sürekli eklenir, popülerlik veya yeniliğe göre sıralanır ve aranabilir; küratörlüden daha ince ve geniş senaryoları kapsar.

Küratörlüde bulamadığınızda topluluk kütüphanesinde arayın.

## Hangi AI modelleri destekleniyor? Promptlar modeller arası uyumlu mu?

AiShort'taki promptlar geneldir; **prompt girişi kabul eden her AI senaryosunda çalışır** — yalnızca sohbet sayfalarında değil, Cursor gibi programlama araçlarında, API çağrılarında, AI ajanlarında da kullanılabilir. Yaygın sohbet modelleri şunlardır:

- Uluslararası: ChatGPT, Gemini, Claude, Grok
- Çin Anakarası: DeepSeek, Tongyi Qianwen, Wenxin Yiyan, Doubao, Kimi, ChatGLM, Xunfei Spark, Tencent Yuanbao
- API Platformları: OpenRouter, SiliconFlow, Groq

Daha fazla model listesi için [Başlarken → Popüler AI Modelleri](./getting-started#popüler-ai-modelleri) sayfasına bakın.

**Modeller arası uyumluluk**: Metin tabanlı promptların büyük çoğunluğu modeller arası uyumludur — yazma, çeviri, programlama, soru-cevap gibi genel görevlerde aynı prompt başlıca büyük dil modellerinde etkili sonuçlar verir; AiShort'taki her prompt varsayılan olarak belirli bir modele bağlı değildir. Ancak **performans farkları olabilir**: yazma için Claude genellikle daha incelikli, ChatGPT-5 talimatlara daha sıkı bağlı kalır; programlama için GPT-5, Gemini Pro ve DeepSeek farklı güçlü yönlere sahiptir; yoğun akıl yürütme gerektiren sorularda Claude Opus / Gemini Deep Thinking / o-serisi genellikle daha tutarlıdır. Görsel üretim promptları (Midjourney / Stable Diffusion / DALL·E) ise uyumlu değildir; her birinin kendi sözdizimine göre ayarlanması gerekir.

## Promptlar neden İngilizce yazılmış?

AI modelleri İngilizceyi daha doğru anlar ve çıktı daha tutarlı olur. Türkçe promptlar da kullanılabilir, ancak aynı Türkçe promptu birden çok kez çalıştırdığınızda sonuçlardaki tutarsızlık daha belirgin olur. Önemli senaryolar için İngilizce kullanmanız önerilir.

Pratikte iyi sonuç veren formül: **İngilizce promptu yapıştırın + sonuna Türkçe yanıt direktifi ekleyin**. Bu yöntem hem modelin kararlılığını korur hem de çıktıyı doğrudan ekibinize ya da müşterilerinize sunulabilir hale getirir.

> 💡 Türkçe yanıt istiyor musunuz? Promptun sonuna `respond in Turkish` veya `Türkçe yanıtla` ekleyin. Resmi bir tonda yazmasını istiyorsanız `resmi Türkçe ile yanıtla (siz formu)` ifadesini kullanın.

## Her seferinde prompt girmem gerekiyor mu?

**API çağrısı**: Promptu `system prompt` olarak ayarlayın; sonraki konuşmalarda otomatik geçerli olur.

**Web sürümü**: Konuşma değiştirmediyseniz, ChatGPT mevcut promptu hatırlar. Yanıtlar konudan sapmaya başlarsa "unuttu" demektir; promptu yeniden yapıştırmanız yeterli.

**İpucu**: Sık kullandığınız konuşmaları tarayıcı yer imlerine kaydedin, bir dahaki sefere doğrudan açın.

## Doğru promptu nasıl seçerim?

İstediğiniz çıktıdan geriye doğru gidin: makale yazmak için [`write`](/?tags=write) veya [`article`](/?tags=article) etiketlerini; kod yazmak için [`code`](/?tags=code) veya [`interpreter`](/?tags=interpreter) etiketlerini; çeviri için [`language`](/?tags=language); rol yapma için [`games`](/?tags=games) etiketlerini kullanın; etiketleri bilmiyorsanız doğrudan anahtar kelimeyle arayın. Her prompt kartı popülerliği (kopyalama sayısı) gösterir; daha sık kopyalananlar genellikle daha tutarlı sonuç verir.

## Neden ilgili bir prompt bulamıyorum?

Ana sayfa arama kapsamı **özenle seçilmiş prompt kütüphanesidir** (giriş yaptıktan sonra kişisel promptlarınızı da içerir); toplulukta paylaşılan promptları **içermez**.

Ana sayfada kısa anahtar kelimelerle bulamıyorsanız, [Topluluk Promptları](./community) sayfasında tekrar arayın — orada daha fazla kullanıcı paylaşımı bulunur.

## AI yanlış bilgi verirse ne yapmalıyım?

AI bazen "halüsinasyon" görür; makul görünen ama aslında yanlış olan bilgiler üretir. Çözüm:

1. **Kritik bilgileri doğrulayın**: Özellikle veriler, alıntılar, kodlar
2. **Çok turlu optimizasyon**: AI'a yanıtını yeniden kontrol edip iyileştirmesini söyleyin
3. **Çapraz doğrulama**: Önemli sonuçları farklı promptlar veya modellerle doğrulayın

Uygun promptlar AI halüsinasyonlarını azaltabilir.

## Prompt iyi çalışmıyor — nasıl ayarlarım?

Promptu hemen değiştirmek yerine önce şu yönlerden ayarlama yapın:

1. **Köşeli parantezdeki `[yer tutucuları]` daha somut hale getirin** — stil, uzunluk, alan, hedef okuyucu profili gibi ayrıntılar ekleyin
2. **AI'dan iyileştirme isteyin**: Memnun olmadığınız yanıtlar için "lütfen daha X biçimde değiştir" veya "lütfen Y stilinde yeniden yaz" gibi takip soruları sorun; AI genellikle bir iki turda hedefe yaklaşır. AI'a kendi yanıtını puanlayıp geliştirmesini de söyleyebilirsiniz
3. **Modeller arasında karşılaştırma yapın**: Aynı prompt Claude Sonnet / ChatGPT / Gemini / DeepSeek üzerinde bazen çok farklı sonuç verir — yazma için Claude genellikle daha incelikli, programlama için GPT-5 / DeepSeek daha tutarlıdır
4. **Topluluğa bakın**: [Topluluk Promptları](./community) içinde daha uygun bir sürüm bulabilirsiniz — iyi promptlarınızı da orada paylaşabilirsiniz
5. **Geri bildirim verin**: Sorun yaşıyor veya öneriniz var mı? [Geri bildirim](/feedback) sayfasına bekleriz

## Promptlarımı nasıl yedeklerim?

1. "Hesabım" sayfasına gidin → "Veri Yönetimi → Promptları Dışa Aktar" bölümünü bulun
2. "Verileri Dışa Aktar" düğmesine tıklayın
3. Sistem otomatik olarak indirilecek bir JSON dosyası oluşturur

Veri kaybını önlemek için düzenli olarak yedek almanız önerilir.

## AiShort promptlarını ticari projelerde kullanabilir miyim?

Evet, ancak lisans durumuna göre değişir:

1. [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)'tan gelen içerikler **CC0 (Kamu Malı)** lisansına tabidir ve herhangi bir kısıtlama yoktur
2. AiShort'un kendi içerikleri ve topluluk katkıları varsayılan olarak **CC BY-SA 4.0** açık lisansını kullanır — ticari kullanım, yeniden dağıtım ve uyarlama serbesttir; AiShort / orijinal yazar atfının korunması ve türev çalışmaların aynı açıklıkta yayınlanması gereklidir
3. **Promptla ürettiğiniz AI çıktısının** telif hakkı, kullandığınız AI sağlayıcısının (OpenAI / Anthropic / Google vb.) kullanım koşullarına göre belirlenir; çoğu durumda size aittir
4. Prompt kartı açıklamasında açıkça "yalnızca kişisel kullanım" olarak işaretlenmiş çok az sayıdaki istisna bunun dışındadır

## Prompt kopyalamak verilerimi sızdırır mı?

Hayır. AiShort'taki promptlar statik JSON olarak site varlıklarına paketlenmiştir; **kopyalama işleminin kendisi tarayıcınızdaki yerel panoda gerçekleşir**.

Köşeli parantezdeki yer tutucuları **doldurduğunuz somut içerikler ve AI'ın size verdiği yanıtlar** — bunların tamamı doğrudan sizinle seçtiğiniz AI platformu (ChatGPT / Claude / Gemini / DeepSeek vb.) arasında iletilir; AiShort bunları göremez.

Şunu da belirtmek gerekir: Kopyalama sırasında arka uca **anonim bir sayım olayı** gönderilir (POST `/cards/<id>/copy`); bu yalnızca her promptun popülerliğini ölçmek için kullanılır (kartın üzerinde gösterilen "kopyalama sayısı"). **Yalnızca kart ID'si iletilir; doldurduğunuz içerik iletilmez**, kişisel bilgi içermez ve kullanıcı kimliğiyle ilişkilendirilmez.

**Hesabınıza giriş yaptıktan sonra** koleksiyon listeleriniz, özel promptlarınız ve topluluk katkılarınız cihazlar arası senkronizasyon için arka uca aktarılır; istediğiniz zaman JSON olarak dışa aktarabilir ve tüm verilerinizi tek tıkla silebilirsiniz.

## İlgili Belgeler

- [Başlarken](./getting-started) - Temel kullanım yöntemleri
- [Koleksiyonum](./my-collection) - Koleksiyon ve etiket yönetimi
- [Topluluk Promptları](./community) - Keşfet ve paylaş
