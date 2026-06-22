---
sidebar_label: Dağıtım
title: AI Short'u Dağıtın | Vercel, Docker & Cloudflare Kurulumu
description: Kendi AI prompt kitaplığınızı barındırmak mı istiyorsunuz? AI Short'u Vercel, Docker veya Cloudflare kullanarak kolayca dağıtın. Yapılandırma ipuçları ve otomatik güncelleme scriptleri dahil.
---

# Proje Dağıtımı

> **Bu kimin için**: AiShort'u kendi sunucusunda barındırmak veya özelleştirmek isteyen geliştiriciler için. Sıradan kullanıcılar [aishort.top](https://www.aishort.top) adresini doğrudan kullanabilir — bu belgeyi okumaları gerekmez.

## Dağıtım Modeli Seçin

İhtiyacınıza uygun modeli seçin:

| Model                          | Backend                                      | Notlar                                                                                                                                                                              |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standart** (varsayılan)      | Resmi paylaşımlı backend'i yeniden kullanır | Fork ettikten sonra site adı, açıklama, promptlar vb. özelleştirilebilir (bkz. [Yapılandırma](./deploy/configuration)); giriş, favoriler, topluluk ve senkronizasyon hazır çalışır |
| **Çevrimdışı Sürüm**           | Backend yok, veriler tarayıcıda yerel olarak saklanır | Hava boşluklu kurumsal veya devlet ağları; hesap gerekmez                                                                                                                          |
| **Tamamen kendi kendine barındırılan backend** | Kendi bağımsız backend'iniz        | Bağımsız hesap sistemi, tam veri sahipliği ve özel topluluk gerektiğinde                                                                                                            |

İlk iki seçenek bu kılavuzda ele alınmaktadır. Üçüncüsü için backend hizmetinin kaynak kodu kamuya açık olmadığından, kullanım senaryonuz ve ölçeğiniz hakkında kısa bir not içeren bir e-posta ile [geliştiriciyle iletişime geçin](mailto:qingwhat@gmail.com); bir dağıtım planı ve destek alın.

## Dağıtım Belgeleri

Dağıtım sürecine göre aşağıdaki bölümlere ayrılmıştır; ihtiyacınıza göre inceleyin:

- **[Standart Dağıtım](./deploy/standard)** — Resmi paylaşımlı backend'i yeniden kullanır; yerel derleme, Vercel, Cloudflare Pages ve Docker olmak üzere dört yöntemi destekler.
- **[Çevrimdışı Sürüm (Kurumsal İntranet)](./deploy/offline)** — Kurumsal veya devlet intranetleri gibi hava boşluklu ortamlar için çevrimdışı çözüm; backend ve hesap gerekmez.
- **[Yapılandırma ve Özelleştirme](./deploy/configuration)** — Site başlığını, açıklamasını ve promptları değiştirin ve özel bir backend'e bağlanın.
- **[Senkronize Güncellemeleri Etkinleştirin](./deploy/sync-updates)** — Fork'unuzun yukarı akışı otomatik olarak takip etmesini sağlayın, böylece özellikleriniz geride kalmaz.
