---
sidebar_label: Prompt Kustom
title: Prompt Kustom AI Short | Buat, Edit, dan Bagikan
description: Buat prompt AI eksklusif Anda sendiri, simpan ke akun pribadi untuk diakses kapan saja. Mendukung berbagi ke komunitas atau atur sebagai pribadi, ekspor cadangan data dengan satu klik.
---

# Prompt Kustom

Setelah login, Anda dapat membuat prompt sendiri, menyimpannya ke akun untuk dipanggil kapan saja. Prompt kustom akan muncul di tampilan "Koleksi Saya".

## Buat Prompt

1. Klik tombol "Tambah" di kanan atas halaman
2. Isi formulir di jendela "Buat Prompt" yang muncul:
   - **Nama Prompt** (wajib): Beri nama untuk prompt Anda
   - **Isi Prompt** (wajib): Konten utama prompt
   - **Tujuan/Kegunaan** (opsional): Deskripsi singkat apa yang dapat dilakukan prompt
   - **Catatan** (opsional): Sumber, versi bahasa lain, atau penjelasan tambahan
3. Sakelar "Apakah Anda bersedia membagikan prompt ini ke halaman publik?" di bagian bawah secara default aktif — matikan jika hanya untuk diri sendiri
4. Klik "Buat Prompt" untuk mengirim

![Popup Buat Prompt](/img/docs/user-prompts-create.png)

> 💡 **Contoh pengisian** — prompt "Asisten Notulen Rapat":
> - **Nama Prompt**: Asisten Notulen Rapat
> - **Isi Prompt**: Anda adalah notulis profesional. Susun notulen rapat yang rapi berdasarkan transkrip berikut: rangkum poin pembahasan, daftar keputusan yang diambil, dan tuliskan action items lengkap dengan PIC dan tenggat waktunya. Gunakan format bullet points yang ringkas. Transkrip: [tempelkan transkrip atau catatan rapat]
> - **Tujuan/Kegunaan**: Mengubah catatan rapat yang berantakan menjadi notulen terstruktur dengan action items yang jelas
> - **Catatan**: Cocok untuk rapat tim mingguan, sprint review, atau diskusi proyek

## Edit Prompt

Di tampilan Koleksi Saya, klik kartu prompt yang Anda buat untuk membuka jendela "Edit Prompt", Anda dapat:

- Ubah nama, isi, tujuan, dan catatan
- Beralih status berbagi (Publik/Pribadi)
- Klik "Simpan" untuk memperbarui

![Antarmuka Edit Prompt](/img/docs/user-prompts-edit.png)

## Hapus Prompt

Klik "Hapus" di jendela edit. Penghapusan tidak dapat dipulihkan, harap berhati-hati.

## Bagikan ke Komunitas

Saat membuat atau mengedit, sakelar "Apakah Anda bersedia membagikan prompt ini ke halaman publik?" di bagian bawah mengontrol visibilitas:

- **Aktif (default)**: Prompt ditampilkan di halaman [Prompt Komunitas](./community), pengguna lain dapat melihat dan mengumpulkannya
- **Nonaktif**: Prompt pribadi, hanya terlihat oleh diri sendiri

Status berbagi dapat diubah kapan saja.

## Ekspor Cadangan

1. Masuk ke "Akun Saya" → temukan kolom "Manajemen Data → Ekspor Prompt"
2. Klik tombol "Ekspor Data"
3. Sistem menghasilkan file JSON dan otomatis mengunduhnya

Konten yang diekspor mencakup:

- Nama, isi, tujuan/kegunaan, dan catatan prompt
- Waktu pembuatan dan pembaruan
- Status berbagi

Disarankan untuk mengekspor cadangan secara berkala untuk mencegah kehilangan data.

## Impor Prompt

Impor prompt dan koleksi dari file JSON:

1. Masuk ke "Akun Saya" → temukan kolom "Manajemen Data → Impor Prompt"
2. Klik tombol "Impor Data"
3. Pilih file JSON
4. Sistem otomatis menggabungkan data (deduplikasi berdasarkan judul; prompt dengan ID pengguna lain otomatis diatur sebagai pribadi)

### Kolaborasi Tim

Alur kerja yang direkomendasikan untuk berbagi prompt dalam tim:

1. **Filter dan Bagikan**: Setelah ekspor, hapus secara manual daftar koleksi atau filter prompt yang ingin dibagikan, kirim file ke anggota tim untuk diimpor
2. **Perlindungan Privasi**: Mengimpor prompt yang dibagikan orang lain (ID tidak termasuk akun saat ini) akan otomatis diatur sebagai **pribadi**, data antar anggota tidak saling mengganggu

## Dokumentasi Terkait

- [Koleksi Saya](./my-collection) - Manajemen koleksi dan tag
- [Prompt Komunitas](./community) - Berbagi dan voting
- [Manajemen Akun](./account) - Login dan pengaturan
