---
sidebar_label: FAQ
title: FAQ AI Short | Optimasi Prompt & Penanganan Halusinasi AI
description: Hasil prompt kurang ideal? Bagaimana jika AI memberikan informasi palsu? Panduan ini menjawab pertanyaan umum, mengajarkan cara mengoptimalkan prompt, menghindari halusinasi AI, dan mencadangkan data.
---

# FAQ

## Apakah AiShort berbayar?

Versi web AiShort **sepenuhnya gratis**, menjelajah, menyalin, dan mencari prompt semuanya tidak memerlukan biaya, bahkan tidak perlu mendaftar akun. Fitur lanjutan setelah login (koleksi, prompt kustom, berbagi komunitas) juga gratis.

Catatan: AiShort hanya menyediakan prompt, **apakah memanggil model AI itu sendiri berbayar ditentukan oleh layanan AI yang Anda gunakan** (misalnya versi gratis/berbayar ChatGPT, penagihan API, dll.).

## Model AI apa saja yang didukung?

Prompt AiShort bersifat universal — dapat digunakan di **skenario AI mana pun yang menerima input prompt**: bukan hanya halaman percakapan, tapi juga tool coding seperti Cursor, panggilan API, AI agent, dll. Berikut model percakapan yang umum digunakan:

- Internasional: ChatGPT, Gemini, Claude, Grok
- Lokal Indonesia: Sahabat AI, Kata.ai
- Tiongkok Daratan: DeepSeek, Tongyi Qianwen, ERNIE Bot, Doubao, Kimi, ChatGLM, Xinghuo, Tencent Yuanbao
- Platform API: OpenRouter, SiliconFlow, Groq

Untuk daftar model selengkapnya, lihat [Memulai → Model AI Populer](./getting-started#model-ai-populer).

## Mengapa prompt menggunakan bahasa Inggris?

Sebagian besar pekerja teknologi dan kreatif di Indonesia sudah terbiasa bekerja bilingual — dokumentasi, tooling, dan kode umumnya berbahasa Inggris. Model AI juga memiliki pemahaman bahasa Inggris yang lebih akurat dan output yang lebih konsisten dibandingkan bahasa lain. Menjalankan prompt yang sama dalam Bahasa Indonesia berulang kali kadang menghasilkan variasi yang cukup signifikan, sementara prompt bahasa Inggris cenderung lebih stabil.

Pola yang biasanya bekerja paling lancar: **prompt dalam bahasa Inggris + minta jawaban dalam Bahasa Indonesia**.

> 💡 Ingin balasan dalam Bahasa Indonesia? Tambahkan salah satu instruksi berikut di akhir prompt:
> - `respond in Indonesian` (versi Inggris, paling reliable)
> - `balas dalam Bahasa Indonesia` (versi lokal, juga dipahami model utama)

## Apakah saya perlu memasukkan prompt setiap kali?

**Penggunaan API**: Atur prompt sebagai `system prompt`, percakapan selanjutnya akan otomatis berlaku.

**Versi Web**: Jika tidak berganti percakapan, ChatGPT akan mengingat prompt saat ini. Jika balasan mulai menyimpang dari harapan, berarti AI sudah "lupa", tempelkan kembali prompt sekali.

**Tips**: Simpan percakapan yang sering digunakan sebagai bookmark browser, buka langsung di lain waktu.

## Mengapa saya tidak dapat menemukan prompt terkait?

Ruang lingkup pencarian beranda adalah **perpustakaan prompt pilihan** (termasuk prompt pribadi Anda setelah login), **tidak termasuk** prompt yang dibagikan komunitas.

Jika menggunakan kata kunci pendek tidak menemukan hasil di beranda, buka halaman [Prompt Komunitas](./community) dan cari di sana — terdapat lebih banyak konten yang dibagikan pengguna.

## Apa yang harus dilakukan jika AI mengeluarkan informasi palsu?

AI terkadang menghasilkan "halusinasi", mengeluarkan informasi yang tampak masuk akal tetapi sebenarnya salah. Cara menangani:

1. **Verifikasi Informasi Penting**: Terutama data, kutipan, kode, dll.
2. **Optimasi Multi-putaran**: Biarkan AI memeriksa dan mengoptimalkan jawaban lagi
3. **Verifikasi Silang**: Gunakan prompt atau model berbeda untuk memverifikasi kesimpulan penting

Prompt yang tepat dapat mengurangi terjadinya halusinasi AI.

## Bagaimana cara mencadangkan prompt saya?

1. Masuk ke "Akun Saya" → temukan kolom "Manajemen Data → Ekspor Prompt"
2. Klik tombol "Ekspor Data"
3. Sistem otomatis menghasilkan file JSON untuk diunduh

Disarankan mencadangkan secara berkala untuk mencegah kehilangan data.

## Hasil prompt kurang ideal?

1. **Minta AI Mengoptimalkan**: Biarkan AI menilai dan memperbaiki jawabannya sendiri
2. **Ubah Sudut Pandang**: Gunakan prompt berbeda untuk mengekspresikan kebutuhan yang sama
3. **Coba Komunitas**: Di [Prompt Komunitas](./community) mungkin ada versi yang lebih cocok — kami juga menyambut prompt bagus Anda untuk dibagikan di sana
4. **Saran Umpan Balik**: Menemui masalah atau punya saran perbaikan? Kirimkan [umpan balik](/feedback) Anda

## Dokumentasi Terkait

- [Memulai](./getting-started) - Metode penggunaan dasar
- [Koleksi Saya](./my-collection) - Manajemen koleksi dan tag
- [Prompt Komunitas](./community) - Temukan dan bagikan
