---
sidebar_label: Özel Promptlar
title: AI Short Özel Promptlar | Oluştur, Düzenle ve Paylaş
description: Kendi AI promptlarınızı oluşturun, hesabınıza kaydedin ve istediğiniz zaman çağırın. Toplulukla paylaşın veya özel tutun; verilerinizi tek tıkla dışa aktararak yedekleyin.
---

# Özel Promptlar

Giriş yaptıktan sonra kendi promptlarınızı oluşturabilir, hesabınıza kaydedip istediğiniz zaman çağırabilirsiniz. Özel promptlar "Koleksiyonum" görünümünde görüntülenir.

## Prompt Oluştur

1. Sağ üst köşedeki "Ekle" düğmesine tıklayın
2. Açılan "Prompt Oluştur" penceresinde formu doldurun:
   - **Prompt adı** (zorunlu): Promptunuza bir ad verin
   - **Prompt içeriği** (zorunlu): Promptun gövde metni
   - **Rol / Kullanım** (isteğe bağlı): Promptun ne işe yaradığının kısa açıklaması
   - **Notlar** (isteğe bağlı): Kaynak, diğer dil sürümleri veya ek açıklamalar
3. Alttaki "Bu promptu herkese açık sayfada paylaşmak istiyor musunuz?" anahtarı varsayılan olarak açıktır—kapatırsanız yalnızca size görünür
4. "Prompt Oluştur"a tıklayarak gönderin

![Prompt Oluştur penceresi](/img/docs/user-prompts-create.png)

> 💡 **Doldurma örneği**—bir "Toplantı tutanak asistanı" promptu:
> - **Prompt adı**: Toplantı tutanak asistanı
> - **Prompt içeriği**: Profesyonel bir tutanak yazarı olarak görev yapın. Aşağıdaki ham notlardan resmi bir toplantı tutanağı hazırlayın; gündem maddeleri, alınan kararlar, sorumlu kişiler ve takip eylemleri açıkça ayrılmış olsun: [toplantı notlarınız]
> - **Rol / Kullanım**: Dağınık toplantı notlarını paydaşlara gönderilebilecek resmi tutanağa dönüştürür
> - **Notlar**: Her toplantıdan hemen sonra kullanın; çıktıyı e-posta şablonuna kopyalayın

## Promptu Düzenle

Koleksiyonum görünümünde, oluşturduğunuz prompt kartına tıklayarak "Prompt Düzenle" penceresini açın:

- Ad, içerik, rol ve notları değiştirin
- Paylaşım durumunu değiştirin (genel/özel)
- "Kaydet"e tıklayarak güncelleyin

![Prompt düzenleme arayüzü](/img/docs/user-prompts-edit.png)

## Promptu Sil

Düzenleme penceresinde "Sil"e tıklayın. Silme işlemi geri alınamaz; dikkatli olun.

## Topluluğa Paylaş

Oluşturma veya düzenleme sırasında alttaki "Bu promptu herkese açık sayfada paylaşmak istiyor musunuz?" anahtarı görünürlüğü kontrol eder:

- **Açık (varsayılan)**: Prompt [Topluluk Promptları](./community) sayfasında görüntülenir; diğer kullanıcılar görebilir ve toplayabilir
- **Kapalı**: Özel prompt; yalnızca size görünür

Paylaşım durumunu istediğiniz zaman değiştirebilirsiniz.

## Yedek Dışa Aktarma

1. "Hesabım" sayfasına gidin → "Veri Yönetimi → Promptları Dışa Aktar" bölümünü bulun
2. "Verileri Dışa Aktar" düğmesine tıklayın
3. Sistem bir JSON dosyası oluşturur ve otomatik olarak indirir

Dışa aktarılan içerik şunları kapsar:

- Promptun adı, içeriği, rol/kullanım, notlar
- Oluşturma ve güncelleme zamanı
- Paylaşım durumu

Veri kaybını önlemek için düzenli olarak dışa aktarıp yedeklemeniz önerilir.

## Promptları İçe Aktar

Promptları ve koleksiyonları bir JSON dosyasından içe aktarın:

1. "Hesabım" sayfasına gidin → "Veri Yönetimi → Promptları İçe Aktar" bölümünü bulun
2. "Verileri İçe Aktar" düğmesine tıklayın
3. Bir JSON dosyası seçin
4. Sistem verileri otomatik olarak birleştirir (başlığa göre yinelenenleri kaldırır; başkasına ait ID'li promptlar otomatik olarak özel olarak ayarlanır)

### Takım İşbirliği

Takım içinde prompt paylaşımı için önerilen iş akışı:

1. **Filtreleme ve paylaşım**: Dışa aktardıktan sonra koleksiyon listesini elle silin veya paylaşmak istediğiniz promptları filtreleyin; dosyayı takım üyelerine gönderin ve içe aktarmalarını sağlayın
2. **Gizlilik koruması**: Başkasının paylaştığı promptları içe aktarmak (ID mevcut hesaba ait değilse) otomatik olarak **özel** olarak ayarlanır; üye verileri birbirini etkilemez

## İlgili Belgeler

- [Koleksiyonum](./my-collection) - Koleksiyon ve etiket yönetimi
- [Topluluk Promptları](./community) - Paylaşım ve oylama
- [Hesap Yönetimi](./account) - Giriş ve ayarlar
