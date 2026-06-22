---
sidebar_label: Deployment
title: Deploy AI Short | Pengaturan Vercel, Docker & Cloudflare
description: Ingin menghosting perpustakaan prompt AI Anda sendiri? Deploy AI Short dengan mudah menggunakan Vercel, Docker, atau Cloudflare. Termasuk tips konfigurasi dan script pembaruan otomatis.
---

# Deployment Proyek

> **Untuk siapa ini**: pengembang yang ingin meng-host sendiri atau mengkustomisasi AiShort. Pengguna biasa cukup menggunakan [aishort.top](https://www.aishort.top) — tidak perlu membaca ini.

## Pilih Model Deployment

Pilih model yang sesuai dengan kebutuhan Anda:

| Model                          | Backend                                       | Keterangan                                                                                                                                                                                |
| ------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard** (default)         | Menggunakan backend bersama resmi             | Setelah fork Anda dapat mengkustomisasi nama situs, deskripsi, prompt, dll. (lihat [Konfigurasi](./deploy/configuration)); login, favorit, komunitas, dan sinkronisasi langsung berfungsi |
| **Edisi Offline**              | Tanpa backend, data disimpan lokal di browser | Jaringan enterprise atau pemerintah yang terisolasi dari internet; tidak memerlukan akun                                                                                                  |
| **Backend self-hosted penuh**  | Backend independen milik Anda sendiri         | Ketika Anda membutuhkan sistem akun independen, kepemilikan data penuh, dan komunitas pribadi                                                                                             |

Dua model pertama dibahas dalam panduan ini. Untuk yang ketiga, karena layanan backend tidak open-source, silakan [kirim email kepada developer](mailto:qingwhat@gmail.com) dengan keterangan singkat tentang kasus penggunaan dan skala Anda untuk mendapatkan rencana deployment dan dukungan.

## Dokumentasi Deployment

Dibagi menjadi beberapa bagian berikut sesuai alur deployment, baca sesuai kebutuhan:

- **[Deployment Standard](./deploy/standard)** — menggunakan backend bersama resmi, mendukung build lokal, Vercel, Cloudflare Pages, dan Docker.
- **[Versi Offline (Intranet Perusahaan)](./deploy/offline)** — solusi offline untuk lingkungan tanpa internet seperti intranet enterprise atau jaringan pemerintah, tanpa backend dan akun.
- **[Konfigurasi dan Kustomisasi](./deploy/configuration)** — mengubah judul situs, deskripsi, prompt, serta mengintegrasikan backend kustom.
- **[Menjaga Fork Anda Tetap Sinkron](./deploy/sync-updates)** — agar fork Anda otomatis mengikuti pembaruan upstream dan tidak ketinggalan fitur.
