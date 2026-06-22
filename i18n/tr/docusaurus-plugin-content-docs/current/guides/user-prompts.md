---
sidebar_label: Özel Promptlar
title: AI Short Özel Promptlar | Oluştur, Düzenle ve Paylaş
description: Kendi AI promptlarınızı oluşturun, hesabınıza kaydedin ve istediğiniz zaman çağırın. Toplulukla paylaşın veya özel tutun; verilerinizi tek tıkla dışa aktararak yedekleyin.
---

# Özel Promptlar

Giriş yaptıktan sonra kendi promptlarınızı oluşturabilir, hesabınıza kaydedip istediğiniz zaman hızlıca erişebilirsiniz. Özel promptlar "Koleksiyonum" görünümünde görüntülenir.

## Prompt Oluştur

1. Giriş yaptıktan sonra sayfanın üstündeki "**Prompt Oluştur**" düğmesine tıklayın
2. "Prompt Oluştur" iletişim kutusunu doldurun:
   - **Prompt Adı** (zorunlu): Prompt için bir ad
   - **Prompt İçeriği** (zorunlu): Promptun gövdesi; köşeli parantez `[...]` yer tutucuları, görüntülenirken yer tutucu olarak vurgulanır
   - **İşlev/Kullanım** (isteğe bağlı): Promptun ne yaptığının kısa açıklaması
   - **Notlar** (isteğe bağlı): Kaynak, diğer dil sürümleri veya ek notlar
3. Alttaki "Bu prompt'u genel sayfada paylaşmak ister misiniz?" anahtarı varsayılan olarak açıktır — promptu özel tutmak için kapatın
4. Göndermek için "Prompt Oluştur"a tıklayın

![Prompt Oluştur penceresi](/img/docs/user-prompts-create.png)

> 💡 **Örnek** — bir "Standup Güncelleme Oluşturucu" promptu:
> - **Prompt Adı**: Standup Güncelleme Oluşturucu
> - **Prompt İçeriği**: Sen özlü bir iletişim asistanısın. Aşağıdaki notları üç bölümlü günlük standup güncellemesine dönüştür — Dün, Bugün, Engeller. Her maddeyi kısa ve sonuç odaklı tut: [ham notlarım]
> - **İşlev/Kullanım**: Dağınık notları temiz bir standup güncellemesine dönüştürür
> - **Notlar**: Sabah standup'ından önce çalıştırın

## Promptu Düzenle

Koleksiyonum görünümünde, oluşturduğunuz prompt kartındaki düzenle (kalem) düğmesine tıklayarak "Prompt Düzenle" iletişim kutusunu açın. Şunları yapabilirsiniz:

- Ad, içerik, kullanım ve notları değiştirin
- Paylaşım durumunu değiştirin (genel / özel)
- Güncellemek için "Kaydet"e tıklayın

![Prompt düzenleme arayüzü](/img/docs/user-prompts-edit.png)

## Promptu Sil

Düzenleme iletişim kutusunda "Sil"e tıklayın. Silme işlemi geri alınamaz — dikkatli olun.

## Topluluğa Paylaş

Oluştururken veya düzenlerken, alttaki "Bu prompt'u genel sayfada paylaşmak ister misiniz?" anahtarı görünürlüğü kontrol eder:

- **Açık (varsayılan)**: Prompt [Topluluk Promptları](./community) sayfasında görünür; diğer kullanıcılar görebilir ve toplayabilir
- **Kapalı**: Özel — yalnızca size görünür

Paylaşım durumu istediğiniz zaman değiştirilebilir.

## Promptları Dışa Aktar

1. "Hesabım" sayfasına gidin ve "Veri Yönetimi → Promptları Dışa Aktar" bölümünü bulun
2. "Verileri Dışa Aktar" düğmesine tıklayın
3. Sistem bir JSON dosyası oluşturur ve otomatik olarak indirir

Dışa aktarılan içerik şunları kapsar:

- Prompt adı, içeriği, kullanımı ve notları
- Paylaşım durumu
- Koleksiyonlarınız, koleksiyon sıralamanız ve özel etiketleriniz

Veri kaybını önlemek için düzenli dışa aktarma önerilir.

## Promptları İçe Aktar

Bir JSON dosyasından promptları ve koleksiyonları içe aktarın:

1. "Hesabım" sayfasına gidin ve "Veri Yönetimi → Promptları İçe Aktar" bölümünü bulun
2. "Verileri İçe Aktar" düğmesine tıklayın
3. Bir JSON dosyası seçin
4. Sistem verileri otomatik olarak birleştirir (başlığa göre yinelenenleri kaldırır; ID'si başka bir hesaba ait promptlar özel olarak ayarlanır)

### Takım İşbirliği

Takım içinde prompt paylaşımı için önerilen iş akışı:

1. **Filtreleme ve paylaşım**: Dışa aktardıktan sonra koleksiyon listenizi elle silin veya paylaşmak istediğiniz promptları filtreleyin, ardından dosyayı takım üyelerine içe aktarmaları için gönderin
2. **Gizlilik koruması**: Başkasına ait (ID mevcut hesaba ait olmayan) içe aktarılan promptlar otomatik olarak **özel** olarak ayarlanır; böylece her üyenin verileri ayrı kalır

## İlgili Belgeler

- [Koleksiyonum](./my-collection) - Koleksiyon ve etiket yönetimi
- [Topluluk Promptları](./community) - Paylaşım ve oylama
- [Hesap Yönetimi](./account) - Giriş ve ayarlar
