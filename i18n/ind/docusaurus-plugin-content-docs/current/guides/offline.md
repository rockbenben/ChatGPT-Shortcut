---
sidebar_label: Versi Offline (Intranet Perusahaan)
title: AI Short Deployment Offline | Tanpa Server Eksternal untuk Intranet Perusahaan
description: Versi offline AI Short dirancang khusus untuk perusahaan dan tim yang tidak dapat mengakses jaringan eksternal. Tidak perlu server backend, tidak perlu registrasi, data disimpan secara lokal di browser, siap pakai langsung.
---

# Versi Deployment Offline

**Skenario yang cocok**: Intranet perusahaan, jaringan pemerintah, lingkungan rahasia, jaringan kampus, dan skenario lainnya di mana **tidak dapat atau tidak nyaman mengakses jaringan eksternal**.

Versi offline AI Short tidak memerlukan server backend dan registrasi pengguna, semua data disimpan secara lokal di browser. Setelah deployment, tim dapat langsung menggunakan di intranet.

## Cara Penggunaan Tim

Versi offline adalah website statis murni, setelah di-deploy ke server intranet, anggota tim cukup membuka browser dan mengakses alamat intranet tersebut untuk menggunakan:

1. **Admin** men-deploy versi offline ke server intranet (misalnya `http://192.168.1.100:3000`)
2. **Anggota tim** membuka browser ke alamat tersebut, dapat menjelajahi, mencari, dan menyalin prompt
3. **Koleksi dan prompt kustom** setiap orang disimpan di browser masing-masing, tidak saling mempengaruhi
4. Tidak perlu registrasi akun, tidak perlu menginstal software apa pun, buka dan gunakan

```
Server intranet (deploy versi offline)
   ├── Data perpustakaan prompt (dibagikan untuk semua, dari JSON statis)
   │
   ├── Browser Pengguna A → localStorage (koleksi dan prompt kustom A)
   ├── Browser Pengguna B → localStorage (koleksi dan prompt kustom B)
   └── Browser Pengguna C → localStorage (koleksi dan prompt kustom C)
```

:::tip Tips
Konten perpustakaan prompt (prompt pilihan) adalah data statis yang dikemas saat build, semua pengguna melihat konten yang sama. Koleksi, prompt kustom, urutan, dan tag setiap pengguna disimpan di localStorage browser masing-masing, saling independen.
:::

## Perbedaan dengan Versi Online

| Fitur | Versi Online | Versi Offline |
| ---- | ------ | ------ |
| Jelajahi/cari/filter prompt | ✅ | ✅ |
| Salin prompt | ✅ | ✅ |
| Manajemen koleksi | Penyimpanan server | Penyimpanan lokal browser |
| Prompt kustom | Penyimpanan server | Penyimpanan lokal browser |
| Koleksi Saya (seret-lepas, tag) | ✅ | ✅ |
| Dukungan multi-bahasa (18 bahasa) | ✅ | ✅ |
| Impor/ekspor data | ✅ | ✅ (format kompatibel) |
| Halaman detail prompt | ✅ | ✅ (data statis, tanpa komentar) |
| Registrasi/login pengguna | ✅ | ❌ (tidak perlu akun) |
| Daftar prompt komunitas/voting | ✅ | ❌ |
| Komentar umpan balik | ✅ | ❌ |

## Penyimpanan Data

Data setiap pengguna disimpan di localStorage **browser masing-masing**, tidak terkait dengan server:

| Data | Kunci penyimpanan | Deskripsi |
| ---- | ------ | ---- |
| Daftar koleksi | `local_favorites` | Array ID prompt yang dikumpulkan |
| Prompt kustom | `local_user_prompts` | Data prompt yang dibuat pengguna |
| Urutan pengurutan | `local_myspace_order` | Urutan kartu di Koleksi Saya |
| Tag kustom | `local_custom_tags` | Definisi tag dan hubungan penugasan |

:::caution Perhatian
- localStorage browser memiliki batas kapasitas sekitar 5MB, sepenuhnya cukup untuk penggunaan harian.
- Menghapus data browser akan menyebabkan data pribadi hilang, disarankan untuk membuat cadangan secara berkala melalui "Pengaturan > Ekspor Data".
- Setelah mengganti komputer atau browser, data perlu diimpor ulang.
:::

## Deployment

Versi offline berbasis branch `offline`. Setelah admin menyelesaikan deployment sekali, anggota tim tidak perlu melakukan tindakan apa pun.

### Deployment Docker (Direkomendasikan)

Metode deployment paling sederhana, satu baris perintah dapat menjalankan di server intranet:

```bash
# Gunakan image versi offline yang sudah di-build
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Atau gunakan Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Setelah deployment, anggota tim mengakses `http://<IP server>:3000` untuk menggunakan.

Menggunakan `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build dari Kode Sumber

Jika perlu menyesuaikan konten prompt atau mengubah konfigurasi:

```bash
# Clone branch offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instal dependensi
yarn

# Pengembangan lokal
yarn start

# Build versi satu bahasa (Cina)
yarn build --locale zh-Hans

# Build semua bahasa
yarn build
```

Hasil build ada di direktori `build/`, dapat di-deploy ke server file statis apa pun (Nginx, Apache, Caddy, dll.).

### Contoh Konfigurasi Nginx

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

### Deployment Platform

Saat men-deploy di Vercel, Cloudflare Pages dan platform lainnya, pilih branch `offline`, langkah lainnya sama dengan versi online, lihat detail di [Deployment Proyek](../deploy).

## Impor-Ekspor Data

### Ekspor

Masuk ke "Pengaturan > Ekspor Data", ekspor koleksi pribadi dan prompt kustom sebagai file JSON.

### Impor

Mendukung impor file JSON dengan format berikut:

- **File ekspor dari versi offline**: Pulihkan sepenuhnya koleksi, prompt, urutan, dan tag
- **File ekspor dari versi online**: Kompatibel secara otomatis
  - Prompt pengguna → Gabung ke lokal (deduplikasi berdasarkan judul)
  - Koleksi pilihan (card) → Gabung ke koleksi lokal
  - Koleksi komunitas (community) → Otomatis dikonversi menjadi prompt kustom lokal
  - Urutan MySpace → Pulihkan ke lokal
  - Tag kustom → Tambah dan gabung (tidak menimpa yang ada)

### Migrasi dari Versi Online

1. Ekspor data dari halaman "Akun Saya" di versi online (aishort.top)
2. Impor file JSON tersebut di halaman "Pengaturan" versi offline
3. Koleksi komunitas akan otomatis dikonversi menjadi prompt lokal, koleksi pilihan disinkronkan secara normal

## Pertanyaan Umum

### Setelah deployment, bagaimana tim menggunakannya?

Setelah admin men-deploy ke server intranet, beritahu anggota tim alamat akses (misalnya `http://192.168.1.100:3000`). Setiap orang buka browser, tidak perlu menginstal, tidak perlu registrasi.

### Apakah data setiap orang akan saling mempengaruhi?

Tidak. Koleksi dan prompt kustom setiap orang disimpan di localStorage browser masing-masing, sepenuhnya independen. Di server hanya ada perpustakaan prompt bersama (hanya-baca).

### Apakah data bisa hilang?

Operasi berikut dapat menyebabkan data pribadi hilang:

- Menghapus data/cache browser
- Menggunakan mode pribadi/incognito
- Mengganti komputer atau browser

Disarankan untuk membuat cadangan data penting secara berkala melalui "Pengaturan > Ekspor Data" sebagai file JSON.

### Bisakah prompt kustom dibagikan antar tim?

Bisa. Satu orang mengekspor file JSON, lalu anggota lain mengimpor di "Pengaturan > Impor Data". Saat mengimpor, deduplikasi otomatis dilakukan.

### Bagaimana cara memperbarui perpustakaan prompt?

Perpustakaan prompt adalah data statis yang dikemas saat build. Cara memperbarui:

1. Admin pull kode branch `offline` terbaru
2. Build ulang dan deploy (atau pull image Docker terbaru)
3. Anggota tim me-refresh halaman browser untuk melihat konten baru (data pribadi tidak terpengaruh)

### Apakah format data versi offline kompatibel dengan versi online?

Kompatibel. Format JSON yang diekspor sama, dapat diimpor-ekspor antar kedua versi. ID prompt berbeda di kedua versi (online menggunakan ID server, offline menggunakan ID timestamp), tetapi saat mengimpor dideduplikasi berdasarkan judul, tidak ada konflik.
