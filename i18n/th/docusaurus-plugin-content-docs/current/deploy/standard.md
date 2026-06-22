---
sidebar_label: การติดตั้งแบบมาตรฐาน
title: AI Short การติดตั้งแบบมาตรฐาน | Build ในเครื่อง, Vercel, Cloudflare, Docker
description: คู่มือการติดตั้ง AI Short แบบมาตรฐาน ใช้ backend ส่วนกลางของทางการร่วมกัน รองรับการ build ในเครื่อง, Vercel แบบคลิกเดียว, Cloudflare Pages และ Docker พร้อมใช้งานทันที
---

# การติดตั้งแบบมาตรฐาน

ใช้ backend ส่วนกลางของทางการร่วมกันและพร้อมใช้งานทันที Fork โปรเจกต์ก่อน จากนั้นติดตั้งด้วยวิธีใดวิธีหนึ่งด้านล่าง

**ความต้องการ**: [Node.js 20.0](https://nodejs.org/) หรือใหม่กว่า รองรับ macOS, Windows (รวมถึง WSL) และ Linux

![โครงสร้างการติดตั้งแบบมาตรฐาน: หลังจาก fork แล้ว ติดตั้งผ่านการ build ในเครื่อง, Vercel, Cloudflare Pages หรือ Docker ซึ่งทั้งหมดใช้ backend ส่วนกลางของทางการร่วมกัน (เข้าสู่ระบบ, คอลเลกชัน, ชุมชน, คอมเมนต์ และการซิงค์ข้ามอุปกรณ์)](/img/docs/standard-deploy-topology.svg)

## การ Build ในเครื่อง

```shell
# ติดตั้ง dependencies
yarn

# พัฒนาในเครื่อง
yarn start

# build: ออก static files ไปยังไดเรกทอรี build โดยใช้ defaultLocale ใน scripts/i18nLocales.mjs
yarn build
```

> **Build เฉพาะบางภาษา**: ใช้ `yarn build --locale <locale>` (เช่น `zh-Hans`, `en`, `ja`… ดูรายการ locale ทั้งหมดใน `scripts/i18nLocales.mjs`) เชื่อมหลายคำสั่ง: `yarn build --locale zh-Hans && yarn build --locale en`

## การติดตั้ง Vercel

คลิกปุ่มด้านล่างเพื่อติดตั้งบน Vercel แบบคลิกเดียว:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **หมายเหตุ**: แผนฟรีของ Vercel อาจล้มเหลวเนื่องจากข้อจำกัดด้านหน่วยความจำ ให้ติดตั้งเพียงภาษาเดียวแทน โดยไปที่ **Settings → Build & Deployment → Build Command** ของโปรเจกต์ คลิก **Override** แล้วตั้งคำสั่งภาษาเดียว (เช่น `yarn build --locale zh-Hans` สำหรับภาษาจีน หรือ `yarn build --locale pt` สำหรับโปรตุเกส)

## การติดตั้ง Cloudflare Pages

ก่อนอื่น 👉 [Fork โปรเจกต์นี้](https://github.com/rockbenben/ChatGPT-Shortcut/fork) จากนั้นติดตั้ง:

1. ลงชื่อเข้าใช้ [Cloudflare Pages](https://pages.cloudflare.com/) แล้วเลือก **Create a project**
2. เชื่อมต่อ repository ที่คุณ fork มา
3. กำหนดค่า build:
   - **Build command**: `yarn build --locale zh-Hans` (เปลี่ยน locale เป็นภาษาที่ต้องการ เช่น `yarn build --locale pt` สำหรับโปรตุเกส)
   - **Output directory**: `build`
4. คลิก **Deploy** แล้วรอให้ Cloudflare Pages build เสร็จ

ทุก push หลังจากนี้จะ trigger การ build และ deploy โดยอัตโนมัติ

## การติดตั้ง Docker

ติดตั้งด้วยคำสั่งเดียว:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

หรือใช้ `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
