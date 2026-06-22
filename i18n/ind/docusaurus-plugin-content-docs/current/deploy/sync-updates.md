---
sidebar_label: Menjaga Fork Anda Tetap Sinkron
title: AI Short Sinkronisasi Pembaruan | Fork Otomatis Mengikuti Upstream
description: Buat fork AI Short Anda otomatis mengikuti pembaruan upstream — atasi masalah deployment Vercel yang tidak mendeteksi pembaruan, aktifkan sinkronisasi otomatis GitHub Actions.
---

# Menjaga Fork Anda Tetap Sinkron

Deployment satu klik Vercel mungkin terus menampilkan prompt "pembaruan tersedia" — karena Vercel membuat proyek baru alih-alih fork, sehingga tidak dapat mendeteksi pembaruan upstream. Untuk memperbaikinya:

1. Hapus repositori asli
2. Gunakan tombol **Fork** di kanan atas halaman untuk fork proyek ini
3. Di [halaman proyek baru Vercel](https://vercel.com/new), impor ulang repositori yang di-fork di bawah Import Git Repository dan deploy

## Aktifkan Pembaruan Otomatis

> Jika Anda menemui error Upstream Sync, jalankan Sync Fork secara manual sekali!

Setelah fork, aktifkan Workflows secara manual di halaman Actions dan jalankan Upstream Sync action sekali. Setelah diaktifkan, proyek akan otomatis disinkronkan setiap hari:

![Pembaruan otomatis](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Aktifkan pembaruan otomatis](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Pembaruan Manual

Ingin memperbarui secara manual segera? Lihat [dokumentasi fork-syncing GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Anda juga dapat memberi bintang / mengikuti proyek ini untuk mendapatkan notifikasi fitur baru.
