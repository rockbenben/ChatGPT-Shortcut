---
sidebar_label: FAQ
title: "AI Short FAQ | Penggunaan, Optimasi, Komersial & Privasi"
description: "AiShort gratis? Prompt kompatibel antar model? Boleh untuk komersial? Panduan ini menjawab 13 pertanyaan umum tentang penggunaan, optimasi, komersial, dan privasi data."
---

# FAQ

## Apakah AiShort adalah generator prompt AI?

Bukan. AiShort adalah pustaka template prompt yang **dikurasi dan disusun secara manual** berdasarkan skenario, bukan alat yang memakai LLM untuk menghasilkan prompt secara otomatis. Setiap prompt sudah disaring dan dikategorikan dengan tag, tinggal salin-tempel ke ChatGPT, Claude, Gemini, DeepSeek, atau alat AI percakapan lainnya. Jika Anda mencari alat yang "menghasilkan prompt dari kebutuhan Anda secara otomatis", PromptPerfect atau ChatGPT prompt generator adalah kategori produk yang berbeda.

## Apakah AiShort gratis? Apakah perlu API Key?

Sepenuhnya gratis, **tanpa perlu API Key dan tanpa perlu mendaftar**. Menjelajahi, mencari, dan menyalin prompt tidak membutuhkan akun apa pun.

Setelah mendaftar, Anda dapat membuka fitur tambahan seperti koleksi dengan pengurutan seret-lepas, tag kustom, pembuatan dan pengelolaan prompt pribadi, berbagi dan voting komunitas, ekspor data JSON, serta sinkronisasi lintas perangkat — semuanya tetap gratis. Seluruh kode bersifat open source di [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Catatan: AiShort hanya menyediakan prompt, **apakah pemakaian model AI itu sendiri berbayar ditentukan oleh layanan AI yang Anda pakai** (misalnya versi gratis/berbayar ChatGPT, penagihan API, dll.).

## Berapa banyak prompt? Skenario apa saja yang dicakup?

AiShort menampung **total 5000+ prompt**, terbagi dalam dua pustaka:

- **Pustaka kurasi** —— dipilih manual, dikelompokkan dengan 25+ tag skenario, diterjemahkan lengkap ke 18 bahasa. Tag: bantuan menulis, IT/pemrograman, artikel/laporan, SEO/pemasaran, fungsi bisnis, akademisi/pengajar, pendidikan/pelajar, bahasa/terjemahan, psikologi/sosial, pelatihan pikiran, alat produktivitas, terminal/interpreter, debat/pidato, ulasan/kritik, sains menarik, ensiklopedia kehidupan, kesehatan medis, penasihat keuangan, musik/seni, filosofi/agama, teks/kata, permainan menyenangkan, penasihat profesional, dll.
- **[Pustaka komunitas](./community)** —— mayoritas, dikontribusikan terus oleh pengguna, dapat diurutkan berdasarkan popularitas atau terbaru dengan pencarian; mencakup skenario yang lebih rinci dan luas daripada kurasi.

Jika tidak menemukan yang cocok di kurasi, cari di komunitas.

## Model AI apa saja yang didukung? Apakah prompt kompatibel antar model?

Prompt AiShort bersifat universal, **dapat digunakan di skenario AI mana pun yang menerima input prompt** — bukan hanya halaman percakapan, tapi juga alat coding seperti Cursor, panggilan API, AI agent, dan lain-lain. Berikut model percakapan yang umum digunakan:

- Internasional: ChatGPT, Gemini, Claude, Grok
- Tiongkok Daratan: DeepSeek, Tongyi Qianwen, ERNIE Bot, Doubao, Kimi, ChatGLM, Xinghuo, Tencent Yuanbao
- Platform API: OpenRouter, SiliconFlow, Groq

Untuk daftar model selengkapnya, lihat [Memulai → Model AI Populer](./getting-started#model-ai-populer).

**Kompatibilitas antar model**: sebagian besar prompt teks bersifat universal — tugas umum seperti penulisan, terjemahan, pemrograman, dan tanya jawab dapat dijalankan dengan prompt yang sama di model bahasa besar populer, dan setiap prompt AiShort secara default tidak terikat ke satu model tertentu. Namun **performanya berbeda-beda**: untuk penulisan, Claude biasanya lebih detail dan ChatGPT-5 lebih disiplin mengikuti instruksi; untuk pemrograman, GPT-5, Gemini Pro, dan DeepSeek punya keunggulan masing-masing; untuk tugas penalaran berat, Claude Opus, Gemini Deep Thinking, dan seri o biasanya lebih stabil. Untuk prompt gambar (Midjourney, Stable Diffusion, DALL·E) tidak bersifat universal — perlu disesuaikan dengan sintaks masing-masing.

## Mengapa prompt ditulis dalam bahasa Inggris?

Model AI memahami bahasa Inggris dengan lebih akurat dan menghasilkan output yang lebih stabil. Prompt dalam Bahasa Indonesia juga bisa dipakai, tetapi jika prompt yang sama dijalankan berulang kali dalam Bahasa Indonesia, hasilnya cenderung bervariasi cukup signifikan. Untuk skenario penting, disarankan memakai bahasa Inggris.

> 💡 Ingin balasan dalam Bahasa Indonesia? Tambahkan kalimat seperti `respond in Indonesian` di akhir prompt.

## Apakah saya harus memasukkan prompt setiap kali?

**Penggunaan API**: atur prompt sebagai `system prompt`, percakapan selanjutnya akan otomatis berlaku.

**Versi Web**: selama tidak berganti percakapan, ChatGPT akan mengingat prompt saat ini. Jika balasan mulai menyimpang dari harapan, berarti AI sudah "lupa", tinggal tempelkan kembali prompt sekali lagi.

**Tips**: simpan percakapan yang sering Anda pakai sebagai bookmark browser, buka langsung di lain waktu.

## Bagaimana memilih prompt yang tepat?

Cari secara terbalik dari output yang Anda inginkan: untuk menulis artikel pakai tag [`write`](/?tags=write) atau [`article`](/?tags=article); untuk menulis kode pakai [`code`](/?tags=code) atau [`interpreter`](/?tags=interpreter); untuk terjemahan pakai [`language`](/?tags=language); untuk bermain peran pakai [`games`](/?tags=games); jika tidak familier dengan tag, langsung saja pakai pencarian kata kunci. Setiap kartu prompt menampilkan popularitas (jumlah salinan) — prompt yang sering disalin biasanya berkualitas lebih stabil.

## Mengapa saya tidak menemukan prompt terkait?

Ruang lingkup pencarian beranda adalah **pustaka prompt pilihan** (setelah login juga mencakup prompt pribadi Anda), **tidak termasuk** prompt yang dibagikan oleh komunitas.

Jika kata kunci pendek tidak menemukan hasil di beranda, buka halaman [Prompt Komunitas](./community) dan cari lagi di sana — terdapat lebih banyak konten yang dibagikan pengguna.

## Apa yang harus dilakukan jika AI memberikan informasi yang salah?

AI terkadang menghasilkan "halusinasi", mengeluarkan informasi yang tampak masuk akal tetapi sebenarnya salah. Cara menangani:

1. **Verifikasi informasi penting**: terutama data, kutipan, kode, dan lain-lain
2. **Optimasi multi-putaran**: minta AI memeriksa dan mengoptimalkan jawabannya kembali
3. **Verifikasi silang**: gunakan prompt atau model berbeda untuk memverifikasi kesimpulan penting

Prompt yang tepat dapat mengurangi terjadinya halusinasi AI.

## Prompt tidak bekerja dengan baik — bagaimana menyesuaikannya?

Jangan langsung mengganti prompt, coba sesuaikan dari beberapa arah berikut:

1. **Buat isi tanda kurung `[placeholder]` lebih spesifik** — tambahkan detail seperti gaya, panjang, bidang, profil pembaca, dan lainnya
2. **Minta AI mengoptimalkan**: untuk jawaban yang kurang memuaskan, tindak lanjuti dengan "tolong buat lebih X" atau "tolong tulis ulang dengan gaya Y"; biasanya setelah satu-dua iterasi, AI sudah mendekati target. Anda juga bisa meminta AI menilai jawabannya sendiri lalu memperbaikinya
3. **Bandingkan antar model**: prompt yang sama bisa memberikan hasil sangat berbeda di Claude Sonnet, ChatGPT, Gemini, dan DeepSeek — untuk penulisan, Claude biasanya lebih detail; untuk pemrograman, GPT-5 dan DeepSeek lebih stabil
4. **Coba komunitas**: di [Prompt Komunitas](./community) mungkin ada versi yang lebih cocok — kami juga menyambut prompt bagus Anda untuk dibagikan di sana
5. **Saran umpan balik**: menemui masalah atau punya saran perbaikan? Kirimkan [umpan balik](/feedback) Anda

## Bagaimana cara mencadangkan prompt saya?

1. Masuk ke "Akun Saya" → temukan kolom "Manajemen Data → Ekspor Prompt"
2. Klik tombol "Ekspor Data"
3. Sistem akan otomatis menghasilkan file JSON untuk diunduh

Disarankan mencadangkan secara berkala untuk mencegah kehilangan data.

## Bisakah saya menggunakan prompt AiShort untuk proyek komersial?

Bisa, tetapi tergantung lisensinya:

1. Konten dari [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) memakai lisensi **CC0 (Domain Publik)**, tanpa batasan apa pun
2. Konten yang dibuat AiShort sendiri dan kontribusi komunitas secara default memakai lisensi terbuka **CC BY-SA 4.0** — penggunaan komersial, redistribusi, dan adaptasi diizinkan, dengan syarat tetap mencantumkan kredit AiShort / penulis asli dan tetap membuka turunannya
3. **Konten AI yang Anda hasilkan dengan prompt** hak ciptanya mengikuti ketentuan penyedia AI yang Anda pakai (OpenAI, Anthropic, Google, dll.), pada umumnya menjadi milik Anda
4. Kecuali sedikit kartu prompt yang dengan jelas menandai "hanya untuk penggunaan pribadi"

## Apakah menyalin prompt mengungkapkan data saya?

Tidak. Prompt AiShort dikemas sebagai aset statis JSON di dalam situs, dan **aksi salin itu sendiri terjadi secara lokal di clipboard browser Anda**.

**Konten yang Anda isikan ke placeholder dalam kurung siku, serta balasan AI** — semuanya dikirim langsung antara Anda dan platform AI yang Anda pilih (ChatGPT, Claude, Gemini, DeepSeek, dll.), AiShort tidak dapat melihatnya.

Yang perlu diketahui: saat menyalin, browser mengirim **event hitungan anonim** ke backend (POST `/cards/<id>/copy`) hanya untuk menghitung popularitas tiap prompt (angka "jumlah salinan" di kartu). **Yang dikirim hanya ID kartu, tidak termasuk** konten yang Anda isikan, tanpa informasi pribadi, dan tidak terkait dengan identitas pengguna.

**Setelah Anda login**, daftar koleksi, prompt kustom, dan kontribusi komunitas barulah disinkronkan ke backend untuk sinkronisasi lintas perangkat — dan kapan saja Anda bisa mengekspornya sebagai JSON atau menghapus seluruh data dengan satu klik.

## Dokumentasi Terkait

- [Memulai](./getting-started) - Metode penggunaan dasar
- [Koleksi Saya](./my-collection) - Manajemen koleksi dan tag
- [Prompt Komunitas](./community) - Temukan dan bagikan
