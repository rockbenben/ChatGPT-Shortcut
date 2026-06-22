---
sidebar_label: Prompt Kustom
title: Prompt Kustom AI Short | Buat, Edit, dan Bagikan
description: Buat prompt AI eksklusif Anda sendiri, simpan ke akun pribadi untuk diakses kapan saja. Mendukung berbagi ke komunitas atau atur sebagai pribadi, ekspor cadangan data dengan satu klik.
---

# Prompt Kustom

Setelah login, Anda dapat membuat prompt sendiri dan menyimpannya ke akun untuk diakses kapan saja. Prompt kustom akan muncul di tampilan "Koleksi Saya".

## Buat Prompt

1. Setelah login, klik tombol "**Buat Prompt**" di bagian atas halaman
2. Isi dialog "Buat Prompt":
   - **Nama Prompt** (wajib): Nama untuk prompt Anda
   - **Konten Prompt** (wajib): Isi utama prompt; teks dalam tanda kurung siku `[...]` disorot sebagai placeholder saat ditampilkan
   - **Fungsi/Penggunaan** (opsional): Deskripsi singkat apa yang dilakukan prompt
   - **Catatan** (opsional): Sumber, versi bahasa lain, atau catatan tambahan
3. Sakelar "**Apakah Anda ingin membagikan prompt ini ke halaman publik?**" di bagian bawah aktif secara default — matikan untuk menyimpan prompt sebagai pribadi
4. Klik "Buat Prompt" untuk mengirim

![Dialog Buat Prompt](/img/docs/user-prompts-create.png)

> 💡 **Contoh** — prompt "Generator Update Standup":
> - **Nama Prompt**: Generator Update Standup
> - **Konten Prompt**: Anda adalah asisten komunikasi yang ringkas. Ubah catatan berikut menjadi update standup harian dengan tiga bagian — Kemarin, Hari Ini, Hambatan. Buat setiap poin singkat dan berorientasi pada hasil: [catatan mentah saya]
> - **Fungsi/Penggunaan**: Mengubah catatan yang berantakan menjadi update standup yang rapi
> - **Catatan**: Jalankan sebelum standup pagi

## Edit Prompt

Di tampilan Koleksi Saya, klik tombol edit (pensil) pada kartu prompt yang Anda buat untuk membuka dialog "Edit Prompt". Anda dapat:

- Mengubah nama, konten, fungsi/penggunaan, dan catatan
- Beralih status berbagi (publik / pribadi)
- Klik "Simpan" untuk memperbarui

![Antarmuka Edit Prompt](/img/docs/user-prompts-edit.png)

## Hapus Prompt

Klik "Hapus" di dialog edit. Penghapusan tidak dapat dibatalkan — lanjutkan dengan hati-hati.

## Bagikan ke Komunitas

Saat membuat atau mengedit, sakelar "**Apakah Anda ingin membagikan prompt ini ke halaman publik?**" di bagian bawah mengontrol visibilitas:

- **Aktif (default)**: Prompt ditampilkan di halaman [Prompt Komunitas](./community), pengguna lain dapat melihat dan mengumpulkannya
- **Nonaktif**: Pribadi — hanya terlihat oleh Anda

Status berbagi dapat diubah kapan saja.

## Ekspor Prompt

1. Masuk ke "Akun Saya" dan temukan bagian "Manajemen Data → **Ekspor Prompt**"
2. Klik tombol "Ekspor Data"
3. Sistem menghasilkan file JSON dan mengunduhnya secara otomatis

Konten yang diekspor mencakup:

- Nama, konten, fungsi/penggunaan, dan catatan prompt
- Status berbagi
- Koleksi Anda, urutan koleksi, dan tag kustom

Ekspor secara berkala direkomendasikan untuk mencegah kehilangan data.

## Impor Prompt

Impor prompt dan koleksi dari file JSON:

1. Masuk ke "Akun Saya" dan temukan bagian "Manajemen Data → **Impor Prompt**"
2. Klik tombol "Impor Data"
3. Pilih file JSON
4. Sistem menggabungkan data secara otomatis (deduplikasi berdasarkan judul; prompt yang ID-nya milik akun lain diatur sebagai pribadi)

### Kolaborasi Tim

Alur kerja yang direkomendasikan untuk berbagi prompt dalam tim:

1. **Filter dan Bagikan**: Setelah ekspor, hapus secara manual daftar koleksi atau saring prompt yang ingin dibagikan, lalu kirim file ke anggota tim untuk diimpor
2. **Perlindungan Privasi**: Prompt yang diimpor milik orang lain (ID tidak termasuk akun saat ini) secara otomatis diatur sebagai **pribadi**, sehingga data setiap anggota tetap terpisah

## Dokumentasi Terkait

- [Koleksi Saya](./my-collection) - Manajemen koleksi dan tag
- [Prompt Komunitas](./community) - Berbagi dan voting
- [Manajemen Akun](./account) - Login dan pengaturan
