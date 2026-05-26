---
sidebar_label: Chrome CRX Kurulum Kılavuzu
title: AI Short Chrome CRX Kurulumu | Geliştirici Modunda Manuel Kurulum
description: AI Short uzantısını CRX dosyası aracılığıyla manuel olarak kurun; geliştirici modunu açtıktan sonra sürükleyip bırakarak kurun. Sık karşılaşılan sorunların çözümlerini içerir.
---

# Chrome CRX Uzantısı Yerel Kurulum Kılavuzu

> Bu kılavuz, CRX kurulum paketini [kurulum sayfasından](./README.md) indirip açtığınızı varsayar (.crx dosyası açılan klasörün içindedir).
>
> ⚠️ **İki yaygın hata**:
> 1. Uzantı sayfasına sürüklemeniz gereken şey **`.crx` dosyasıdır** (açılan klasörden); zip kurulum paketinin kendisi değil
> 2. **Sürüklemeniz** gerekir—"Paketlenmemiş öğe yükle" düğmesine tıklamayın (o, zip sürümü içindir)

## Geliştirici Modunu Etkinleştirin

Chrome'un "Uzantıları Yönet" sayfasını açın ve "Geliştirici modu"nu etkinleştirin.

Aşağıdaki adresi kopyalayıp tarayıcı adres çubuğuna yapıştırın, Enter'a basarak açın. Sayfanın sağ üst köşesinde "Geliştirici modu"nu açın.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## Uzantıyı Kurun

ChatGPT Shortcut uzantısını kurun (Not ⚠️: .crx dosyasını sürüklemeniz gerekir; "Paketlenmemiş öğe yükle"ye tıklamayın)

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

Başarılı kurulumdan sonra [Plugin Kullanım Öğreticisi](./usage.md)'ni inceleyin.

## Kurulum Sırasında Sorun mu Var?

1. Windows kullanıcıları: İndirilen kurulum paketini açtınız mı (çift tıklamak yerine)?

2. "Geliştirici modu" etkin mi? Değilse, ikinci adıma bakın.

3. crx dosyasını "Uzantılar" sayfasına sürüklediniz mi? Not ⚠️: "Paketlenmemiş öğe yükle"ye tıklamayın; crx dosyasını sürüklemeniz gerekir.

4. Tarayıcı crx dosyalarını yüklemeye izin vermiyor mu? zip dosyasını yüklemeyi deneyin! [zip kurulum öğreticisi için tıklayın](./manual-chrome-extension-zip.md).
