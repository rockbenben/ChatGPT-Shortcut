---
sidebar_label: Çevrimdışı Sürüm (Kurumsal İntranet)
title: AI Short Çevrimdışı Dağıtım | Kurumsal İntranet, Dış Sunucu Gerekmez
description: AI Short çevrimdışı sürümü, internet erişimi olmayan veya KVKK uyumluluğu nedeniyle verilerini yurt içinde tutması gereken şirketler ve kamu kurumları için tasarlanmıştır. Arka uç sunucusu, hesap kaydı gerektirmez; tüm veriler tarayıcıda yerel olarak saklanır.
---

# Çevrimdışı Dağıtım Sürümü

> **Hedef okuyucu**: Dağıtımdan sorumlu IT yöneticileri veya teknik sorumlular. Son kullanıcıların bu belgeyi okumasına gerek yoktur; yöneticinin paylaştığı intranet adresini açmaları yeterlidir.

**Kullanım senaryoları**: Şirket içi ağlar, kamu kurumu ağları, KVKK uyumluluğu kapsamında verilerin yurt içinde tutulması gereken ortamlar, finans sektörü (BDDK regülasyonları kapsamındaki bankalar ve aracı kurumlar), sağlık kuruluşları, savunma sanayii, üniversite kampüs ağları ve **internete çıkışın kısıtlı ya da yasak olduğu** diğer tüm ortamlar.

Arka uç yok, kayıt gerekmez—tüm veriler tarayıcıda yerel olarak saklanır. Dağıtımdan sonra intranet ekibiniz yalnızca tarayıcı açarak kullanmaya başlar.

## Ekibin Kullanım Şekli

Çevrimdışı sürüm tamamen statik bir web sitesidir. Intranet sunucusuna dağıtıldıktan sonra ekip üyeleri tarayıcılarıyla intranet adresine erişerek kullanabilir:

1. **Yönetici** çevrimdışı sürümü intranet sunucusuna dağıtır (örn. `http://192.168.1.100:3000`)
2. **Ekip üyeleri** bu adresi tarayıcıyla açar; promptlara göz atabilir, arayabilir ve kopyalayabilir
3. Her kişinin **koleksiyonu ve özel promptları kendi tarayıcısında** saklanır; birbirlerini etkilemez
4. Hesap kaydı gerekmez, herhangi bir yazılım kurulumu gerekmez; aç ve kullan

![Çevrimdışı sürüm veri mimarisi: tek bir intranet sunucusu, herkesle paylaşılan salt okunur bir prompt kütüphanesini barındırır; her kullanıcının koleksiyonu, promptları, sıralaması ve etiketleri kendi tarayıcısının localStorage'ında bağımsız olarak saklanır—hesap gerektirmez](/img/docs/offline-architecture.svg)

:::tip[İpucu]

Prompt kütüphanesi (seçilmiş promptlar), derleme aşamasında paketlenen statik bir veridir; tüm kullanıcılar aynı içeriği görür. Her kullanıcının koleksiyonu, özel promptları, sıralaması ve etiketleri kendi tarayıcısının localStorage'ında saklanır ve birbirinden bağımsızdır.

:::

## Çevrimiçi Sürümle Farkları

| Özellik | Çevrimiçi Sürüm | Çevrimdışı Sürüm |
| ---- | ------ | ------ |
| Prompt göz atma/arama/filtreleme | ✅ | ✅ |
| Prompt kopyalama | ✅ | ✅ |
| Koleksiyon yönetimi | Sunucu depolaması | Tarayıcı yerel depolaması |
| Özel promptlar | Sunucu depolaması | Tarayıcı yerel depolaması |
| Koleksiyonum (sürükle-bırak sıralama, etiketler) | ✅ | ✅ |
| Çoklu dil desteği (18 dil) | ✅ | ✅ |
| Veri içe/dışa aktarma | ✅ | ✅ (formatlar birbirine uyumlu) |
| Prompt detay sayfası | ✅ | ✅ (statik veri, yorum yok) |
| Kullanıcı kaydı/girişi | ✅ | ❌ (hesap gerektirmez) |
| Topluluk prompt listesi/oylama | ✅ | ❌ |
| Yorum ve geri bildirim | ✅ | ❌ |

## Veri Depolama

Her kullanıcının verisi **kendi tarayıcısının** localStorage'ında saklanır, sunucuyla ilgisi yoktur:

| Veri | Depolama Anahtarı | Açıklama |
| ---- | ------ | ---- |
| Koleksiyon listesi | `local_favorites` | Koleksiyona eklenen prompt ID dizisi |
| Özel promptlar | `local_user_prompts` | Kullanıcının oluşturduğu prompt verileri |
| Sıralama düzeni | `local_myspace_order` | Koleksiyonum'daki kart sıralaması |
| Özel etiketler | `local_custom_tags` | Etiket tanımları ve atamaları |

:::caution[Dikkat]

- Tarayıcı yerel deposunun kapasitesi yaklaşık 5MB ile sınırlıdır; günlük kullanım için yeterlidir.
- Tarayıcı verilerini temizlemek kişisel verilerin kaybolmasına yol açar—düzenli olarak "Hesabım → Veri Yönetimi → Dışa Aktar" yoluyla yedek almanız önerilir.
- Bilgisayar veya tarayıcı değişikliğinde verileri yeniden içe aktarmanız gerekir.

:::

## Dağıtım

Çevrimdışı sürüm `offline` dalına dayalıdır. Yönetici dağıtımı bir kez tamamladıktan sonra ekip üyelerinin herhangi bir işlem yapmasına gerek kalmaz.

### Docker ile Dağıtım (Önerilen)

En basit dağıtım yöntemidir; tek bir komutla intranet sunucusunda çalıştırabilirsiniz:

```bash
# Önceden derlenmiş çevrimdışı sürüm imajını kullanın
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Veya Docker Hub üzerinden
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Dağıtımdan sonra ekip üyeleri `http://<sunucu-IP>:3000` adresine erişerek kullanabilir.

`docker-compose` kullanımı:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Kaynak Kodundan Derleme

Prompt içeriğini özelleştirmek veya yapılandırmayı değiştirmek istiyorsanız:

```bash
# Çevrimdışı sürüm dalını klonlayın
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Bağımlılıkları yükleyin
yarn

# Yerel geliştirme
yarn start

# Tek dilli sürüm derleyin (Türkçe)
yarn build --locale tr

# Tüm dilleri derleyin
yarn build
```

Derleme çıktısı `build/` dizinindedir ve herhangi bir statik dosya sunucusuna (Nginx, Apache, Caddy vb.) dağıtılabilir.

### Nginx Yapılandırma Örneği

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Platform Dağıtımı

Vercel, Cloudflare Pages gibi platformlarda dağıtım yaparken `offline` dalını seçmeniz yeterlidir; diğer adımlar çevrimiçi sürümle aynıdır, ayrıntılar için [Proje Dağıtımı](../deploy) belgesine bakın.

## Veri İçe/Dışa Aktarma

### Dışa Aktarma

"Hesabım → Veri Yönetimi → Dışa Aktar" bölümüne girip kişisel koleksiyonunuzu ve özel promptlarınızı JSON dosyası olarak dışa aktarın.

### İçe Aktarma

Aşağıdaki formatlardaki JSON dosyalarının içe aktarılması desteklenir:

- **Çevrimdışı sürümden dışa aktarılan dosyalar**: Koleksiyon, promptlar, sıralama ve etiketler tam olarak geri yüklenir
- **Çevrimiçi sürümden dışa aktarılan dosyalar**: Otomatik uyumluluk işlemi uygulanır
  - Kullanıcı promptları → Yerele birleştirilir (başlığa göre tekrarlar elenir)
  - Seçilmiş koleksiyon (card) → Yerel koleksiyona birleştirilir
  - Topluluk koleksiyonu (community) → Otomatik olarak yerel özel promptlara dönüştürülür
  - MySpace sıralaması → Yerele geri yüklenir
  - Özel etiketler → Eklenerek birleştirilir (mevcutların üzerine yazılmaz)

### Çevrimiçi Sürümden Geçiş

1. Çevrimiçi sürümün (aishort.top) "Hesabım" sayfasından verileri dışa aktarın
2. Çevrimdışı sürümün "Hesabım → Veri Yönetimi → İçe Aktar" bölümünde bu JSON dosyasını içe aktarın
3. Topluluk koleksiyonu otomatik olarak yerel promptlara dönüştürülür; seçilmiş koleksiyon normal şekilde senkronize edilir

## Sıkça Sorulan Sorular

### Dağıtımdan sonra ekip nasıl kullanır?

Yönetici intranet sunucusuna dağıttıktan sonra erişim adresini (örn. `http://192.168.1.100:3000`) ekip üyelerine iletmesi yeterlidir. Her kişi tarayıcıyla açar; kurulum gerektirmez, kayıt gerektirmez.

### Kullanıcıların verileri birbirini etkiler mi?

Hayır. Her kullanıcının koleksiyonu ve özel promptları kendi tarayıcısının localStorage'ında saklanır ve tamamen bağımsızdır. Sunucuda yalnızca paylaşılan prompt kütüphanesi (salt okunur) bulunur.

### Veriler kaybolur mu?

Aşağıdaki işlemler kişisel verilerin kaybolmasına yol açar:

- Tarayıcı verilerini/önbelleğini temizlemek
- Gizli/InPrivate modunda gezinmek
- Bilgisayar veya tarayıcı değiştirmek

Önemli verilerin düzenli olarak "Hesabım → Veri Yönetimi → Dışa Aktar" yoluyla JSON dosyası olarak yedeklenmesi önerilir.

### Özel promptlar ekipler arasında paylaşılabilir mi?

Evet. Bir kişi JSON dosyasını dışa aktardıktan sonra diğer üyeler "Hesabım → Veri Yönetimi → İçe Aktar" bölümünden içe aktarabilir; tekrarlar otomatik olarak elenir.

### Prompt kütüphanesi nasıl güncellenir?

Prompt kütüphanesi, derleme aşamasında paketlenen statik bir veridir. Güncelleme yöntemi:

1. Yönetici en güncel `offline` dalı kodunu çeker
2. Yeniden derleyip dağıtır (veya en güncel Docker imajını çeker)
3. Ekip üyeleri tarayıcıyı yenileyerek yeni içeriği görebilir (kişisel veriler etkilenmez)

### Çevrimdışı sürümün veri formatı çevrimiçi sürümle uyumlu mu?

Uyumludur. Dışa aktarılan JSON formatı aynıdır; iki sürüm arasında karşılıklı içe aktarılabilir. Prompt ID'leri farklıdır (çevrimiçi sürüm sunucu ID'si, çevrimdışı sürüm zaman damgalı ID kullanır) ancak içe aktarma başlığa göre tekrarları eler, çakışma olmaz.

### KVKK uyumluluğu açısından çevrimdışı sürüm ne avantaj sağlar?

Çevrimdışı sürüm, KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında veri yerelliği ve veri minimizasyonu ilkelerine doğal olarak uyumlu bir mimariye sahiptir:

- **Veri yurt dışına çıkmaz**: Tüm kişisel veriler (koleksiyon, özel promptlar, etiketler) yalnızca kullanıcının kendi cihazında, kurumunuzun intranet sınırları içinde kalır
- **Açık rıza ve hesap gerekmez**: Hesap kaydı bulunmadığından kişisel veri toplama yükümlülüğü en aza iner
- **Veri sorumlusu kurum içindedir**: Sunucu sizin kontrolünüzde olduğundan VERBİS bildirimi ve veri işleme envanteri yönetimi kolaylaşır
- **Finans sektörü için BDDK uyumu**: BDDK'nın bulut bilişim ve dış hizmet alımı düzenlemeleri kapsamındaki bankalar ve aracı kurumlar, üçüncü taraf sunucu bağımlılığı olmadan AI Short'u kendi veri merkezlerinde çalıştırabilir
