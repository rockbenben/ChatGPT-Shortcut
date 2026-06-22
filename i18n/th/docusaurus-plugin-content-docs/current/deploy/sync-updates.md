---
sidebar_label: การซิงค์ Fork ให้ทันสมัย
title: AI Short การซิงค์อัปเดต | Fork ตาม upstream อัตโนมัติ
description: ให้ AI Short fork ของคุณตามอัปเดตจาก upstream โดยอัตโนมัติ — แก้ปัญหา Vercel ไม่แสดงอัปเดต เปิดใช้งานการซิงค์อัตโนมัติด้วย GitHub Actions
---

# การซิงค์ Fork ให้ทันสมัย

การติดตั้งแบบคลิกเดียวบน Vercel อาจยังแสดงข้อความ "มีอัปเดต" อยู่เสมอ เนื่องจาก Vercel สร้างโปรเจกต์ใหม่แทนการ fork จึงไม่สามารถตรวจจับอัปเดตจาก upstream ได้ วิธีแก้ไข:

1. ลบ repository เดิม
2. ใช้ปุ่ม **Fork** ที่มุมขวาบนของหน้าเพื่อ fork โปรเจกต์นี้
3. บน[หน้า new-project ของ Vercel](https://vercel.com/new) นำเข้า repository ที่ fork มาใหม่ผ่าน Import Git Repository แล้ว deploy

## เปิดใช้งานการอัปเดตอัตโนมัติ

> หากพบข้อผิดพลาด Upstream Sync ให้รัน Sync Fork ด้วยตนเองหนึ่งครั้งก่อน!

หลังจาก fork แล้ว ให้เปิดใช้งาน Workflows ด้วยตนเองในหน้า Actions และรัน Upstream Sync action หนึ่งครั้ง เมื่อเปิดใช้งานแล้ว โปรเจกต์จะซิงค์โดยอัตโนมัติทุกวัน:

![อัปเดตอัตโนมัติ](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![เปิดใช้งานอัปเดตอัตโนมัติ](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## การอัปเดตด้วยตนเอง

ต้องการอัปเดตทันทีด้วยตัวเอง? ดู[เอกสาร fork-syncing ของ GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

คุณยังสามารถ star / watch โปรเจกต์นี้เพื่อรับการแจ้งเตือนเมื่อมีฟีเจอร์ใหม่
