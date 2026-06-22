---
sidebar_label: Senkronize Güncellemeleri Etkinleştirin
title: AI Short Senkronize Güncellemeler | Fork Yukarı Akışı Otomatik Takip Eder
description: AI Short fork'unuzun yukarı akış güncellemelerini otomatik olarak takip etmesini sağlayın — Vercel dağıtımının güncelleme bildirmemesi sorununu çözün ve GitHub Actions otomatik senkronizasyonunu etkinleştirin.
---

# Senkronize Güncellemeleri Etkinleştirin

Tek tıkla Vercel dağıtımı, "güncelleme mevcut" uyarısını göstermeye devam edebilir — çünkü Vercel bir fork değil yeni bir proje oluşturur ve bu nedenle yukarı akış güncellemelerini algılayamaz. Bunu düzeltmek için:

1. Orijinal depoyu silin
2. Sayfanın sağ üst köşesindeki **Fork** düğmesini kullanarak bu projeyi fork edin
3. [Vercel yeni proje sayfasında](https://vercel.com/new), Import Git Repository altından fork ettiğiniz depoyu yeniden içe aktarın ve dağıtın

## Otomatik Güncellemeyi Etkinleştirin

> Upstream Sync hatasıyla karşılaşırsanız Sync Fork'u bir kez manuel olarak çalıştırın!

Fork ettikten sonra Actions sayfasında Workflows'u manuel olarak etkinleştirin ve Upstream Sync action'ını bir kez çalıştırın. Etkinleştirildikten sonra proje her gün otomatik olarak senkronize edilir:

![Otomatik güncelleme](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Otomatik güncellemeyi etkinleştir](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Manuel Güncelleme

Hemen elle güncellemek mi istiyorsunuz? [GitHub fork senkronizasyon belgelerine](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) bakın.

Bu projeyi yıldızlayabilir / takip edebilirsiniz; böylece yeni özelliklerden haberdar olursunuz.
