---
sidebar_label: Konfigurasi dan Kustomisasi
title: AI Short Konfigurasi dan Kustomisasi | Ubah Judul, Prompt, Backend Kustom
description: Kustomisasi AI Short — ubah judul dan deskripsi situs, tambahkan prompt halaman utama, integrasikan backend kustom, termasuk struktur modul API dan mekanisme caching.
---

# Konfigurasi dan Kustomisasi

AI Short bersifat open source — Anda dapat dengan bebas memodifikasi judul situs, deskripsi, prompt, dan lainnya.

## Judul dan deskripsi situs

Edit `docusaurus.config.js`.

## Dokumentasi dan panduan

Edit file yang bersangkutan di bawah `docs/`.

## Prompt halaman utama

Data sumber berada di `src/data/prompt.json` — sebuah array di mana setiap objek menyimpan semua versi bahasa dengan kunci kode bahasa (`zh` / `en` / `ja`, dll.). Format untuk menambahkan prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

Setelah mengedit, jalankan `python CodeUpdateHandler.py`. Script ini memecah `prompt.json` menjadi file `prompt_<locale>.json` per bahasa dan memperbarui halaman utama serta halaman prompt pilihan setiap bahasa.

![Alur data: master prompt.json diproses oleh python CodeUpdateHandler.py — dipecah per bahasa menjadi file prompt per-locale, menghasilkan JSON kartu dan halaman detail untuk setiap id, dengan konversi OpenCC dari Tionghoa Sederhana ke Tradisional](/img/docs/data-pipeline.svg)

> **Catatan**: disarankan mengatur `id` ke 500 atau lebih tinggi untuk menghindari benturan ID dengan prompt yang sudah ada atau konten komunitas. Menjalankan `python CodeUpdateHandler.py` akan otomatis menghasilkan data kartu dan halaman detail untuk setiap prompt (termasuk yang baru), tanpa perlu membuat file halaman secara manual; prompt kustom secara default tidak memiliki meta deskripsi pilihan dan data komentar.

## Backend kustom

Secara default proyek terhubung ke backend bersama (login, favorit, komunitas, komentar, dan sinkronisasi lintas perangkat semuanya bergantung padanya), dan `src/api` mendokumentasikan kontrak antarmuka lengkap sebagai referensi. Layanan backend itu sendiri tidak open-source; untuk **deployment self-hosted penuh dengan backend sendiri**, lihat [Pilih Model Deployment](../deploy#pilih-model-deployment) di atas.

Struktur modul API:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Caching: data API di-cache secara cerdas melalui `lscache` ditambah ETag — ketika server mengembalikan 304 Not Modified, cache lokal digunakan kembali untuk mengurangi transfer data.
