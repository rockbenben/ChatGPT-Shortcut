---
sidebar_label: การกำหนดค่าและการปรับแต่ง
title: AI Short การกำหนดค่าและการปรับแต่ง | แก้ไขชื่อไซต์, prompt, backend ที่กำหนดเอง
description: ปรับแต่ง AI Short — แก้ไขชื่อและคำอธิบายไซต์ เพิ่ม prompt หน้าแรก เชื่อมต่อ backend ที่กำหนดเอง พร้อมคำอธิบายโครงสร้าง API module และกลไกการ cache
---

# การกำหนดค่าและการปรับแต่ง

AI Short เป็น open source — คุณสามารถปรับแก้ชื่อไซต์ คำอธิบาย prompt และอื่นๆ ได้อย่างอิสระ

## ชื่อและคำอธิบายไซต์

แก้ไขไฟล์ `docusaurus.config.js`

## เอกสารและคู่มือ

แก้ไขไฟล์ที่เกี่ยวข้องในไดเรกทอรี `docs/`

## Prompt หน้าแรก

ข้อมูลต้นฉบับอยู่ใน `src/data/prompt.json` — เป็น array ที่แต่ละ object เก็บทุกเวอร์ชันภาษาโดยใช้รหัสภาษาเป็น key (`zh` / `en` / `ja` ฯลฯ) รูปแบบสำหรับเพิ่ม prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

หลังจากแก้ไขแล้ว ให้รัน `python CodeUpdateHandler.py` สคริปต์จะแยก `prompt.json` เป็นไฟล์ `prompt_<locale>.json` แต่ละภาษา และอัปเดตหน้าแรกและหน้า prompt ที่คัดสรรของแต่ละภาษา

![ไปป์ไลน์ข้อมูล: ไฟล์ต้นฉบับ prompt.json ประมวลผลด้วย python CodeUpdateHandler.py — แยกตามภาษาเป็นไฟล์ prompt แต่ละ locale สร้างข้อมูลการ์ดและหน้ารายละเอียดของแต่ละ id พร้อมการแปลงจีนตัวย่อเป็นตัวเต็มด้วย OpenCC](/img/docs/data-pipeline.svg)

> **หมายเหตุ**: แนะนำให้ตั้งค่า `id` เป็น 500 หรือมากกว่า เพื่อเลี่ยงการชนกับ ID ของ prompt ที่มีอยู่หรือเนื้อหาในชุมชน การรัน `python CodeUpdateHandler.py` จะสร้างข้อมูลการ์ดและหน้ารายละเอียดให้ทุก prompt (รวมถึงที่เพิ่มใหม่) โดยอัตโนมัติ ไม่ต้องสร้างไฟล์หน้าด้วยตัวเอง เพียงแต่ prompt ที่กำหนดเองจะยังไม่มี meta description ที่คัดสรรและข้อมูลคอมเมนต์ตามค่าเริ่มต้น

## Backend ที่กำหนดเอง

โดยค่าเริ่มต้นโปรเจกต์จะเชื่อมต่อกับ backend ส่วนกลาง (ล็อกอิน รายการโปรด ชุมชน คอมเมนต์ และการซิงค์ข้ามอุปกรณ์ล้วนขึ้นอยู่กับระบบนี้) และ `src/api` บันทึกข้อกำหนดอินเทอร์เฟซทั้งหมดไว้สำหรับอ้างอิง ตัว backend service นั้นไม่ได้เป็น open-source สำหรับ**การติดตั้งแบบ self-hosted สมบูรณ์พร้อม backend ของตัวเอง** ดู[เลือกรูปแบบการติดตั้ง](../deploy#เลือกรูปแบบการติดตั้ง)

โครงสร้าง API module:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

การ Cache: ข้อมูล API จะถูก cache อย่างชาญฉลาดผ่าน `lscache` ร่วมกับ ETag — เมื่อเซิร์ฟเวอร์ตอบกลับด้วย 304 Not Modified ระบบจะใช้ cache ท้องถิ่นแทนเพื่อลดการถ่ายโอนข้อมูล
