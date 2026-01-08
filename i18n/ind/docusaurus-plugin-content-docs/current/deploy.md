---
sidebar_label: Deployment
title: Deploy AI Short | Pengaturan Vercel, Docker & Cloudflare
description: Ingin menghosting perpustakaan prompt AI Anda sendiri? Deploy AI Short dengan mudah menggunakan Vercel, Docker, atau Cloudflare. Termasuk tips konfigurasi dan script pembaruan otomatis.
---

# Deployment Proyek

## Konfigurasi dan Kustomisasi

AI Short adalah proyek open source yang memungkinkan Anda memodifikasi judul website, deskripsi, prompt, dan konten lainnya secara bebas sesuai kebutuhan. Berikut adalah opsi modifikasi umum dan petunjuk operasi:

- **Modifikasi Judul dan Deskripsi Website**
  Untuk mengubah informasi judul dan deskripsi website, silakan edit file konfigurasi `docusaurus.config.js`.

- **Modifikasi Petunjuk Penggunaan dan Pengantar Proyek**
  File petunjuk penggunaan dan pengantar proyek terletak di direktori `docs`. Buka file yang relevan di direktori tersebut untuk melakukan modifikasi yang diperlukan.

- **Modifikasi Prompt Halaman Utama**
  Prompt halaman utama disimpan dalam file `src/data/prompt.json`. Jika Anda perlu memodifikasi prompt untuk bahasa tertentu, Anda dapat langsung mengedit file `src/data/prompt_ind.json`.

  ```json
  {
    "ind": {
      "title": "prompt kustom",
      "prompt": "prompt kustom",
      "description": "deskripsi kustom",
      "remark": "catatan kustom"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

- **Backend Kustom**
  Proyek saat ini terhubung ke sistem backend bersama. Jika Anda ingin membangun backend sendiri, Anda dapat merujuk ke petunjuk antarmuka di folder `src/api`.

- **Dukungan Multi-bahasa dan Deployment**
  Setelah menyelesaikan modifikasi multi-bahasa, Anda dapat menggunakan script `CodeUpdateHandler.py` untuk pemrosesan batch:

  ```bash
  python CodeUpdateHandler.py
  ```

## Petunjuk Deployment

Persyaratan Sistem:

- [Node.js 20.0](https://nodejs.org/) atau lebih baru.
- Mendukung macOS, Windows (termasuk WSL), dan Linux.

### Deployment Lokal

```shell
# Instalasi
yarn

# Pengembangan Lokal
yarn start

# Build
yarn build

# Build untuk bahasa tertentu
yarn build --locale ind
```

### Deployment Vercel

Klik tombol di bawah untuk men-deploy ChatGPT-Shortcut ke platform Vercel dengan satu klik:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

### Deployment Docker

```bash
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest
```

## Aktifkan Sinkronisasi Pembaruan

Setelah fork proyek, Anda perlu mengaktifkan Workflows secara manual di halaman Actions proyek yang di-fork dan mengaktifkan Upstream Sync Action. Setelah diaktifkan, pembaruan akan dijalankan secara otomatis setiap hari.

![Pembaruan Otomatis](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)
