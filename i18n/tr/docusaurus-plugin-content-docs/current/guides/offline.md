---
sidebar_label: Çevrimdışı Sürüm (Kurumsal Intranet)
title: AI Short Çevrimdışı Dağıtım | Kurumsal Intranette Harici Sunucu Gerekmez
description: AI Short çevrimdışı sürümü, dış ağa erişemeyen kuruluşlar ve ekipler için özel olarak tasarlanmıştır. Backend sunucusu gerekmez, kayıt gerekmez, veriler tarayıcıda yerel olarak saklanır, anında kullanıma hazır.
---

# Çevrimdışı Dağıtım Sürümü

**Uygun senaryolar**: Kurumsal intranet, devlet ağları, gizli ortamlar, kampüs ağları ve **dış ağa erişimin mümkün olmadığı veya elverişsiz olduğu** diğer senaryolar.

AI Short çevrimdışı sürümü backend sunucusu ve kullanıcı kaydı gerektirmez, tüm veriler tarayıcıda yerel olarak saklanır. Dağıtımdan sonra ekip doğrudan intranette kullanabilir.

## Ekip Kullanım Yöntemi

Çevrimdışı sürüm tamamen statik bir web sitesidir, intranet sunucusuna dağıtıldıktan sonra ekip üyeleri tarayıcılarından o intranet adresine giderek kullanabilirler:

1. **Yönetici** çevrimdışı sürümü intranet sunucusuna dağıtır (örneğin `http://192.168.1.100:3000`)
2. **Ekip üyeleri** tarayıcıdan o adrese gider, promptları tarayabilir, arayabilir ve kopyalayabilir
3. Her kişinin **favorileri ve özel promptları kendi tarayıcısında saklanır**, birbirini etkilemez
4. Hesap kaydı gerekmez, herhangi bir yazılım yüklemeye gerek yok, açın ve kullanın

```
Intranet sunucusu (çevrimdışı sürüm dağıtımı)
   ├── Prompt kütüphanesi verileri (herkes için paylaşılan, statik JSON'dan)
   │
   ├── Kullanıcı A'nın tarayıcısı → localStorage (A'nın favorileri ve özel promptları)
   ├── Kullanıcı B'nın tarayıcısı → localStorage (B'nin favorileri ve özel promptları)
   └── Kullanıcı C'nin tarayıcısı → localStorage (C'nin favorileri ve özel promptları)
```

:::tip İpucu
Prompt kütüphanesi içeriği (seçilmiş promptlar) build zamanında paketlenen statik veridir, tüm kullanıcılar aynı içeriği görür. Her kullanıcının favorileri, özel promptları, sıralaması ve etiketleri kendi tarayıcısının localStorage'ında saklanır, birbirinden bağımsızdır.
:::

## Çevrimiçi Sürümle Farklar

| Özellik | Çevrimiçi Sürüm | Çevrimdışı Sürüm |
| ---- | ------ | ------ |
| Prompt tarama/arama/filtreleme | ✅ | ✅ |
| Prompt kopyalama | ✅ | ✅ |
| Favori yönetimi | Sunucu depolama | Tarayıcı yerel depolama |
| Özel promptlar | Sunucu depolama | Tarayıcı yerel depolama |
| Koleksiyonum (sürükle-bırak, etiketler) | ✅ | ✅ |
| Çok dilli destek (18 dil) | ✅ | ✅ |
| Veri içe/dışa aktarma | ✅ | ✅ (format uyumlu) |
| Prompt detay sayfası | ✅ | ✅ (statik veri, yorum yok) |
| Kullanıcı kaydı/girişi | ✅ | ❌ (hesap gerekmez) |
| Topluluk prompt listesi/oylama | ✅ | ❌ |
| Yorum geri bildirimi | ✅ | ❌ |

## Veri Depolama

Her kullanıcının verileri **kendi tarayıcısının** localStorage'ında saklanır, sunucuyla ilgisi yoktur:

| Veri | Depolama anahtarı | Açıklama |
| ---- | ------ | ---- |
| Favori listesi | `local_favorites` | Favori prompt ID dizisi |
| Özel promptlar | `local_user_prompts` | Kullanıcının oluşturduğu prompt verileri |
| Sıralama düzeni | `local_myspace_order` | Koleksiyonum'daki kart sırası |
| Özel etiketler | `local_custom_tags` | Etiket tanımları ve atama ilişkileri |

:::caution Dikkat
- Tarayıcı yerel depolamanın yaklaşık 5MB kapasite sınırı vardır, günlük kullanım için tamamen yeterlidir.
- Tarayıcı verilerini temizlemek kişisel verilerin kaybolmasına neden olur, düzenli olarak "Ayarlar > Veri Dışa Aktar" yoluyla yedekleme yapılması önerilir.
- Bilgisayar veya tarayıcı değiştirdikten sonra verileri yeniden içe aktarmak gerekir.
:::

## Dağıtım

Çevrimdışı sürüm `offline` dalına dayanmaktadır. Yönetici dağıtımı bir kez tamamladıktan sonra, ekip üyelerinin herhangi bir işlem yapmasına gerek yoktur.

### Docker Dağıtımı (Önerilen)

En basit dağıtım yöntemi, tek bir komutla intranet sunucusunda çalıştırılabilir:

```bash
# Önceden oluşturulmuş çevrimdışı sürüm imajını kullanın
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Veya Docker Hub kullanın
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Dağıtımdan sonra ekip üyeleri `http://<Sunucu IP>:3000` adresine giderek kullanabilir.

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

### Kaynak Koddan Derleme

Prompt içeriğini özelleştirmeniz veya yapılandırmayı değiştirmeniz gerekiyorsa:

```bash
# Offline dalını klonlayın
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Bağımlılıkları yükleyin
yarn

# Yerel geliştirme
yarn start

# Tek dilli sürüm derleyin (Çince)
yarn build --locale zh-Hans

# Tüm dilleri derleyin
yarn build
```

Derleme çıktısı `build/` dizinindedir, herhangi bir statik dosya sunucusuna (Nginx, Apache, Caddy vb.) dağıtılabilir.

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

Vercel, Cloudflare Pages ve diğer platformlara dağıtırken `offline` dalını seçin, diğer adımlar çevrimiçi sürümle aynıdır, ayrıntılar için [Proje Dağıtımı](../deploy)'na bakın.

## Veri İçe-Dışa Aktarma

### Dışa Aktarma

"Ayarlar > Veri Dışa Aktar"a gidin, kişisel favorileri ve özel promptları JSON dosyası olarak dışa aktarın.

### İçe Aktarma

Aşağıdaki formatlardaki JSON dosyalarının içe aktarılmasını destekler:

- **Çevrimdışı sürümden dışa aktarılan dosya**: Favoriler, promptlar, sıralama ve etiketler tamamen geri yüklenir
- **Çevrimiçi sürümden dışa aktarılan dosya**: Otomatik olarak uyumlu
  - Kullanıcı promptları → Yerele birleştir (başlığa göre tekrar kaldırma)
  - Seçilmiş favoriler (card) → Yerel favorilere birleştir
  - Topluluk favorileri (community) → Otomatik olarak yerel özel promptlara dönüştür
  - MySpace sıralaması → Yerel olarak geri yükle
  - Özel etiketler → Ekle ve birleştir (mevcut olanları geçersiz kılmaz)

### Çevrimiçi Sürümden Göç

1. Çevrimiçi sürümde (aishort.top) "Hesabım" sayfasından verileri dışa aktarın
2. Çevrimdışı sürümün "Ayarlar" sayfasında o JSON dosyasını içe aktarın
3. Topluluk favorileri otomatik olarak yerel promptlara dönüştürülecek, seçilmiş favoriler normal şekilde senkronize olacaktır

## Sıkça Sorulan Sorular

### Dağıtımdan sonra ekip nasıl kullanır?

Yönetici intranet sunucusuna dağıtıktan sonra, ekip üyelerine erişim adresini (örneğin `http://192.168.1.100:3000`) bildirin. Herkes tarayıcıdan açar, yükleme gerekmez, kayıt gerekmez.

### Herkesin verileri birbirini etkiler mi?

Hayır. Herkesin favorileri ve özel promptları kendi tarayıcısının localStorage'ında saklanır, tamamen bağımsızdır. Sunucuda yalnızca paylaşılan prompt kütüphanesi (salt okunur) bulunur.

### Veriler kaybolabilir mi?

Aşağıdaki işlemler kişisel verilerin kaybolmasına neden olabilir:

- Tarayıcı verilerini/önbelleği temizleme
- Gizli/incognito mod kullanma
- Bilgisayar veya tarayıcı değiştirme

Önemli verilerin düzenli olarak "Ayarlar > Veri Dışa Aktar" yoluyla JSON dosyası olarak yedeklenmesi önerilir.

### Ekip arasında özel promptlar paylaşılabilir mi?

Evet. Bir kişi JSON dosyasını dışa aktarır, ardından diğer üyeler "Ayarlar > Veri İçe Aktar"da içe aktarır. İçe aktarma sırasında otomatik olarak tekrarlar kaldırılır.

### Prompt kütüphanesi nasıl güncellenir?

Prompt kütüphanesi build zamanında paketlenen statik veridir. Güncelleme yöntemi:

1. Yönetici en son `offline` dalı kodunu çeker
2. Yeniden derleyip dağıtır (veya en son Docker imajını çeker)
3. Ekip üyeleri tarayıcı sayfasını yenilediklerinde yeni içeriği göreceklerdir (kişisel veriler etkilenmez)

### Çevrimdışı sürümün veri formatı çevrimiçi sürümle uyumlu mu?

Uyumludur. Dışa aktarılan JSON formatı aynıdır, iki sürüm arasında karşılıklı içe/dışa aktarma yapılabilir. Prompt ID'leri iki sürümde farklıdır (çevrimiçi sunucu ID'si, çevrimdışı zaman damgası ID'si kullanır), ancak içe aktarırken başlığa göre tekrar kaldırılır, çakışma olmaz.
