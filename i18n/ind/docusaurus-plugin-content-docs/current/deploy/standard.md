---
sidebar_label: Deployment Standard
title: AI Short Deployment Standard | Build Lokal, Vercel, Cloudflare, Docker
description: Tutorial deployment standard AI Short, menggunakan backend bersama resmi, mendukung build lokal, deployment satu klik Vercel, Cloudflare Pages, dan Docker, langsung berfungsi.
---

# Deployment Standard

Menggunakan backend bersama resmi dan langsung berfungsi. Fork proyek terlebih dahulu, lalu deploy dengan salah satu metode di bawah ini.

**Persyaratan**: [Node.js 20.0](https://nodejs.org/) atau lebih baru, di macOS, Windows (termasuk WSL), atau Linux.

![Topologi deployment standard: setelah fork, deploy melalui build lokal, Vercel, Cloudflare Pages, atau Docker — semuanya menggunakan kembali backend bersama resmi (login, koleksi, komunitas, komentar, sinkronisasi lintas perangkat)](/img/docs/standard-deploy-topology.svg)

## Build Lokal

```shell
# instal dependensi
yarn

# pengembangan lokal
yarn start

# build: menghasilkan file statis ke direktori build, menggunakan defaultLocale di scripts/i18nLocales.mjs
yarn build
```

> **Build bahasa tertentu saja**: gunakan `yarn build --locale <locale>` (mis. `zh-Hans`, `en`, `ja`… lihat daftar locale lengkap di `scripts/i18nLocales.mjs`). Gabungkan beberapa: `yarn build --locale zh-Hans && yarn build --locale en`.

## Deployment Vercel

Klik tombol di bawah untuk deployment satu klik ke Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Catatan**: tier gratis Vercel mungkin gagal karena batas memori. Deploy satu bahasa saja — buka **Settings → Build & Deployment → Build Command** pada proyek, klik **Override**, dan atur perintah satu bahasa (`yarn build --locale zh-Hans` untuk bahasa Mandarin, `yarn build --locale pt` untuk bahasa Portugis, dll.).

## Deployment Cloudflare Pages

Pertama 👉 [Fork proyek ini](https://github.com/rockbenben/ChatGPT-Shortcut/fork), lalu deploy:

1. Masuk ke [Cloudflare Pages](https://pages.cloudflare.com/) dan pilih **Create a project**
2. Hubungkan repositori yang baru saja Anda fork
3. Konfigurasi build:
   - **Build command**: `yarn build --locale zh-Hans` (ganti locale sesuai bahasa yang ingin Anda deploy, mis. `yarn build --locale pt` untuk bahasa Portugis)
   - **Output directory**: `build`
4. Klik **Deploy** dan tunggu Cloudflare Pages menyelesaikan build

Setiap push setelahnya akan secara otomatis memicu build dan deploy.

## Deployment Docker

Deployment satu baris:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Atau dengan `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
