---
sidebar_label: การติดตั้ง
title: ติดตั้ง AI Short | การตั้งค่า Vercel, Docker & Cloudflare
description: ต้องการโฮสต์ไลบรารี prompt AI ของคุณเอง? ติดตั้ง AI Short ได้อย่างง่ายดายโดยใช้ Vercel, Docker หรือ Cloudflare รวมถึงเคล็ดลับการกำหนดค่าและสคริปต์อัปเดตอัตโนมัติ
---

# การติดตั้งโปรเจกต์

## การกำหนดค่าและการปรับแต่ง

AI Short เป็นโปรเจกต์โอเพ่นซอร์สที่ให้คุณปรับเปลี่ยนชื่อเว็บไซต์ คำอธิบาย prompt และเนื้อหาอื่นๆ ได้อย่างอิสระตามความต้องการ ด้านล่างคือตัวเลือกการปรับเปลี่ยนทั่วไปและคำแนะนำการใช้งาน:

- **แก้ไขชื่อและคำอธิบายเว็บไซต์**
  หากต้องการเปลี่ยนข้อมูลชื่อและคำอธิบายของเว็บไซต์ กรุณาแก้ไขไฟล์การกำหนดค่า `docusaurus.config.js`

- **แก้ไขคำแนะนำการใช้งานและคำนำโปรเจกต์**
  ไฟล์คำแนะนำการใช้งานและคำนำโปรเจกต์อยู่ในไดเรกทอรี `docs` เปิดไฟล์ที่เกี่ยวข้องในไดเรกทอรีนั้นเพื่อทำการแก้ไขที่จำเป็น

- **แก้ไข Prompt หน้าแรก**
  Prompt หน้าแรกถูกจัดเก็บในไฟล์ `src/data/prompt.json` หากคุณต้องการแก้ไข prompt สำหรับภาษาเฉพาะ คุณสามารถแก้ไขไฟล์ `src/data/prompt_th.json` ได้โดยตรง

  ```json
  {
    "th": {
      "title": "prompt ที่กำหนดเอง",
      "prompt": "prompt ที่กำหนดเอง",
      "description": "คำอธิบายที่กำหนดเอง",
      "remark": "หมายเหตุที่กำหนดเอง"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

- **Backend ที่กำหนดเอง**
  โปรเจกต์ปัจจุบันเชื่อมต่อกับระบบ backend ที่ใช้ร่วมกัน หากคุณต้องการสร้าง backend ของคุณเอง คุณสามารถอ้างอิงคำแนะนำอินเทอร์เฟซในโฟลเดอร์ `src/api`

- **การรองรับหลายภาษาและการติดตั้ง**
  หลังจากเสร็จสิ้นการแก้ไขหลายภาษา คุณสามารถใช้สคริปต์ `CodeUpdateHandler.py` สำหรับการประมวลผลแบบกลุ่ม:

  ```bash
  python CodeUpdateHandler.py
  ```

## คำแนะนำการติดตั้ง

ความต้องการของระบบ:

- [Node.js 20.0](https://nodejs.org/) หรือใหม่กว่า
- รองรับ macOS, Windows (รวมถึง WSL) และ Linux

### การติดตั้งในเครื่อง

```shell
# การติดตั้ง
yarn

# การพัฒนาในเครื่อง
yarn start

# Build
yarn build

# Build สำหรับภาษาเฉพาะ
yarn build --locale th
```

### การติดตั้ง Vercel

คลิกปุ่มด้านล่างเพื่อติดตั้ง ChatGPT-Shortcut บนแพลตฟอร์ม Vercel ด้วยคลิกเดียว:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

### การติดตั้ง Docker

```bash
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest
```

## เปิดใช้งานการซิงค์อัปเดต

หลังจาก fork โปรเจกต์ คุณต้องเปิดใช้งาน Workflows ด้วยตนเองในหน้า Actions ของโปรเจกต์ที่ fork และเปิดใช้งาน Upstream Sync Action เมื่อเปิดใช้งานแล้ว การอัปเดตจะดำเนินการโดยอัตโนมัติทุกวัน

![อัปเดตอัตโนมัติ](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)
