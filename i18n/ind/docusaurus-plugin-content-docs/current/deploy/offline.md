---
sidebar_label: Versi Offline (Intranet Perusahaan)
title: Deploy Offline AI Short | Intranet Perusahaan Tanpa Server Eksternal
description: Versi offline AI Short dirancang untuk perusahaan dan tim yang tidak dapat mengakses internet eksternal. Tanpa server backend, tanpa registrasi akun, data tersimpan lokal di browser, siap pakai langsung.
---

# Versi Deploy Offline

> **Pembaca yang dituju**: administrator IT atau penanggung jawab teknis yang melakukan deployment. Pengguna biasa cukup mengakses alamat intranet yang sudah disiapkan administrator dan tidak perlu membaca dokumen ini.

**Skenario yang sesuai**: intranet perusahaan, jaringan pemerintah, lingkungan rahasia, jaringan kampus, instansi pemerintah, perbankan, BUMN dengan kebutuhan data residency, serta lingkungan lain yang **tidak dapat atau tidak diizinkan mengakses internet eksternal**.

Tanpa backend, tanpa registrasi — semua data tersimpan lokal di browser. Setelah di-deploy, tim intranet cukup membuka browser untuk langsung menggunakannya.

## Cara Penggunaan Tim

Versi offline adalah situs statis murni. Setelah di-deploy ke server intranet, anggota tim dapat menggunakannya dengan mengakses alamat intranet melalui browser:

1. **Administrator** men-deploy versi offline ke server intranet (misalnya `http://192.168.1.100:3000`)
2. **Anggota tim** membuka alamat tersebut di browser untuk menjelajah, mencari, dan menyalin prompt
3. **Koleksi dan prompt kustom setiap orang tersimpan di browser masing-masing**, tidak saling memengaruhi
4. Tanpa perlu mendaftar akun, tanpa perlu menginstal software apa pun, buka dan langsung pakai

![Arsitektur data versi offline: satu server intranet menyimpan perpustakaan prompt bersama yang read-only; koleksi, prompt, urutan, dan tag setiap pengguna tersimpan di localStorage browser masing-masing — independen, tanpa akun](/img/docs/offline-architecture.svg)

:::tip[Tips]

Perpustakaan prompt (prompt pilihan) adalah data statis yang dipaket saat build, semua pengguna melihat konten yang sama. Koleksi, prompt kustom, urutan, dan tag setiap pengguna tersimpan di localStorage browser masing-masing, terpisah satu sama lain.

:::

## Perbedaan dengan Versi Online

| Fitur | Versi Online | Versi Offline |
| ---- | ------ | ------ |
| Jelajah/cari/filter prompt | ✅ | ✅ |
| Salin prompt | ✅ | ✅ |
| Manajemen koleksi | Tersimpan di server | Tersimpan lokal di browser |
| Prompt kustom | Tersimpan di server | Tersimpan lokal di browser |
| Koleksi Saya (seret-lepas, tag) | ✅ | ✅ |
| Dukungan multi-bahasa (18 bahasa) | ✅ | ✅ |
| Impor/ekspor data | ✅ | ✅ (format kompatibel) |
| Halaman detail prompt | ✅ | ✅ (data statis, tanpa komentar) |
| Registrasi/login pengguna | ✅ | ❌ (tanpa akun) |
| Daftar/voting prompt komunitas | ✅ | ❌ |
| Komentar umpan balik | ✅ | ❌ |

## Penyimpanan Data

Data setiap pengguna tersimpan di localStorage **browser masing-masing**, tidak berhubungan dengan server:

| Data | Kunci Penyimpanan | Keterangan |
| ---- | ------ | ---- |
| Daftar koleksi | `local_favorites` | Array ID prompt yang dikoleksi |
| Prompt kustom | `local_user_prompts` | Data prompt yang dibuat pengguna |
| Urutan tampilan | `local_myspace_order` | Urutan kartu di Koleksi Saya |
| Tag kustom | `local_custom_tags` | Definisi tag dan relasi penugasan |

:::caution[Perhatian]

- Penyimpanan lokal browser memiliki batas kapasitas sekitar 5MB, cukup untuk penggunaan harian.
- Membersihkan data browser akan menghapus data pribadi — disarankan mencadangkan secara berkala melalui "Akun Saya → Manajemen Data → Ekspor".
- Setelah berganti komputer atau browser, perlu mengimpor ulang data.

:::

## Deployment

Versi offline berbasis branch `offline`. Setelah administrator menyelesaikan deployment sekali, anggota tim dapat langsung menggunakannya tanpa operasi apa pun.

### Deployment Docker (Direkomendasikan)

Cara deployment paling sederhana, satu baris perintah cukup untuk menjalankan di server intranet:

```bash
# Menggunakan image versi offline pre-built
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Atau menggunakan Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Setelah deployment, anggota tim mengakses `http://<IP-server>:3000` untuk langsung menggunakannya.

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

### Build dari Source Code

Jika ingin mengkustomisasi konten prompt atau mengubah konfigurasi:

```bash
# Clone branch versi offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instalasi dependensi
yarn

# Pengembangan lokal
yarn start

# Build versi satu bahasa (Bahasa Indonesia)
yarn build --locale ind

# Build semua bahasa
yarn build
```

Hasil build berada di direktori `build/`, dapat di-deploy ke server file statis mana pun (Nginx, Apache, Caddy, dll.).

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

Saat deploy ke platform seperti Vercel, Cloudflare Pages, dll., cukup pilih branch `offline`. Langkah lainnya sama dengan versi online, lihat selengkapnya di [Deployment Proyek](../deploy).

## Impor dan Ekspor Data

### Ekspor

Masuk ke "Akun Saya → Manajemen Data → Ekspor", ekspor koleksi pribadi dan prompt kustom sebagai file JSON.

### Impor

Mendukung impor file JSON dengan format berikut:

- **File ekspor dari versi offline**: pemulihan penuh koleksi, prompt, urutan, dan tag
- **File ekspor dari versi online**: ditangani otomatis dengan kompatibilitas
  - Prompt pengguna → digabungkan ke lokal (deduplikasi berdasarkan judul)
  - Koleksi pilihan (card) → digabungkan ke koleksi lokal
  - Koleksi komunitas (community) → otomatis dikonversi menjadi prompt kustom lokal
  - Urutan MySpace → dipulihkan ke lokal
  - Tag kustom → digabungkan dengan menambahkan (tidak menimpa yang sudah ada)

### Migrasi dari Versi Online

1. Ekspor data di halaman "Akun Saya" versi online (aishort.top)
2. Impor file JSON tersebut di "Akun Saya → Manajemen Data" versi offline
3. Koleksi komunitas otomatis dikonversi menjadi prompt lokal, koleksi pilihan tersinkron normal

## Pertanyaan Umum

### Bagaimana tim menggunakannya setelah di-deploy?

Setelah administrator men-deploy ke server intranet, cukup beritahukan alamat akses (misalnya `http://192.168.1.100:3000`) kepada anggota tim. Setiap orang membuka melalui browser, tanpa perlu instalasi, tanpa perlu registrasi.

### Apakah data setiap orang saling memengaruhi?

Tidak. Koleksi dan prompt kustom setiap orang tersimpan di localStorage browser masing-masing, sepenuhnya independen. Di server hanya ada perpustakaan prompt bersama (read-only).

### Apakah data bisa hilang?

Operasi berikut dapat menyebabkan data pribadi hilang:

- Membersihkan data/cache browser
- Menggunakan mode privat/incognito untuk browsing
- Berganti komputer atau browser

Disarankan mencadangkan data penting secara berkala sebagai file JSON melalui "Akun Saya → Manajemen Data → Ekspor".

### Bisakah berbagi prompt kustom antar anggota tim?

Bisa. Satu orang mengekspor file JSON, kemudian anggota lain mengimpornya di "Akun Saya → Manajemen Data → Impor", deduplikasi berjalan otomatis.

### Bagaimana cara memperbarui perpustakaan prompt?

Perpustakaan prompt adalah data statis yang dipaket saat build. Cara pembaruan:

1. Administrator menarik kode branch `offline` terbaru
2. Build ulang dan deploy (atau tarik image Docker terbaru)
3. Anggota tim cukup me-refresh browser untuk melihat konten baru (data pribadi tidak terpengaruh)

### Apakah format data versi offline kompatibel dengan versi online?

Kompatibel. Format JSON yang diekspor identik, dapat diimpor timbal-balik antara kedua versi. ID prompt berbeda (versi online menggunakan ID server, versi offline menggunakan ID timestamp), tetapi impor melakukan deduplikasi berdasarkan judul sehingga tidak akan terjadi konflik.
