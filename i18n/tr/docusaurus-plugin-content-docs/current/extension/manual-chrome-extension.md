---
sidebar_label: Chrome CRX Kurulum Kılavuzu
title: Chrome CRX Kurulumu - Manuel Geliştirici Modu Kurulumu
description: CRX dosyası aracılığıyla AI Short uzantısını manuel olarak kurun. Geliştirici modunu etkinleştirin ve sürükleyerek kurun. Yaygın sorunlar için çözümler içerir.
---

# Chrome CRX Uzantısı Yerel Kurulum Kılavuzu

## CRX Paketini İndirin

ChatGPT Shortcut crx kurulum paketini (ChatGPT_Shortcut-crx-3.x.x.zip) indirin ve açın (crx dosyası açılan klasördedir).

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

![](https://img.newzone.top/2024-08-12-21-47-10.png?imageMogr2/format/webp)

## Geliştirici Modunu Etkinleştirin

Chrome'un "Uzantıları Yönet" sayfasını açın ve "Geliştirici modu"nu açın.

Aşağıdaki adresi kopyalayın ve tarayıcı adres çubuğuna yapıştırın, ardından açmak için Enter'a basın. Sayfanın sağ üst köşesinde "Geliştirici modu"nu açın.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## Uzantıyı Kurun

ChatGPT Shortcut uzantısını kurun (Not ⚠️: .crx dosyasını sürükleyerek içine bırakmanız gerekir, "Paketlenmemiş öğe yükle"ye tıklamayın)

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

Başarılı kurulumdan sonra, [Plugin Kullanım Öğreticisi](./usage.md)'ni kontrol edin.

## Kurulum Sorunları mı?

1. Windows kullanıcıları: İndirilen kurulum paketini açtınız mı (çift tıklayarak açmak yerine)?

2. "Geliştirici modu" etkin mi? Değilse, adım 2'ye bakın.

3. crx dosyasını "Uzantılar" sayfasına sürüklediniz mi? Not ⚠️: "Paketlenmemiş öğe yükle"ye tıklamayın, crx dosyasını sürüklemeniz gerekir.

4. Tarayıcı crx dosyalarını yüklemeye izin vermiyor mu? zip dosyasını yüklemeyi deneyin! [zip kurulum öğreticisi için tıklayın](./manual-chrome-extension-zip.md).
