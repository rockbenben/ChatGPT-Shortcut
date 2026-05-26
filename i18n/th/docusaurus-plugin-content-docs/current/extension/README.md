---
sidebar_label: ติดตั้งส่วนขยายเบราว์เซอร์
title: ส่วนขยาย AI Short | แถบด้านข้าง ChatGPT/Gemini/Claude · ติดตั้งบน Chrome/Edge/Firefox
description: เรียกใช้ prompt ของ AiShort ได้โดยตรงจากแถบด้านข้างของหน้าสนทนา AI อย่าง ChatGPT, Gemini, Claude, Doubao ไม่ต้องสลับแท็บเพื่อคัดลอกและวาง ติดตั้งคลิกเดียวบน Chrome, Edge, Firefox
---

# ติดตั้งส่วนขยายเบราว์เซอร์

ส่วนขยาย AiShort (ChatGPT Shortcut) ฝังคลัง prompt ไว้ในแถบด้านข้างของหน้าสนทนา AI อย่าง ChatGPT, Gemini, Claude, Doubao โดยตรง ไม่ต้องสลับกลับมาที่ aishort.top เพื่อคัดลอกและวางอีกต่อไป รองรับ Chrome, Edge, Firefox และเรียกใช้ได้อย่างรวดเร็วด้วย `Alt + Shift + S`

## 📥 วิธีติดตั้ง

### 1. ผ่านสโตร์ (แนะนำ ติดตั้งคลิกเดียว)

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/) (หลังติดตั้งต้อง[ตั้งค่าการอนุญาตหนึ่งครั้ง](./firefox-extension-setting.md) ไม่เช่นนั้นแถบด้านข้างจะไม่แสดงบน ChatGPT)

### 2. เปิดสโตร์ไม่ได้? ใช้แพ็คเกจติดตั้งในเครื่อง

ดาวน์โหลดจากช่องทางต่อไปนี้ แล้วทำตามคู่มือที่เกี่ยวข้อง:

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 คู่มือการติดตั้ง: [ไฟล์ CRX](./manual-chrome-extension.md) · [ไฟล์ ZIP](./manual-chrome-extension-zip.md)

## ✅ หลังติดตั้งเสร็จ

กด `Alt + Shift + S` เพื่อเรียกใช้ หรือคลิกไอคอนบนแถบเครื่องมือ ดูรายละเอียดที่[คู่มือการใช้งาน](./usage.md)

## 🧩 สคริปต์ Tampermonkey

นอกจากส่วนขยาย เรายังมี [**สคริปต์ Tampermonkey ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere)
Tampermonkey เป็นส่วนขยายเบราว์เซอร์ที่อนุญาตให้ผู้ใช้รันสคริปต์ที่กำหนดเองเพื่อปรับปรุงฟังก์ชันหน้าเว็บ

ด้วยสคริปต์นี้ คุณสามารถเรียกใช้แถบด้านข้าง AiShort บนเว็บไซต์ใดก็ได้ อย่างไรก็ตาม โปรดทราบว่าเนื่องจากหน้า ChatGPT อย่างเป็นทางการจำกัดการแทรกสคริปต์ บนหน้านั้นสคริปต์จะทำงานในรูปแบบ**ป๊อปอัป**แทนแถบด้านข้าง

หลังจากเปิดใช้แถบด้านข้าง AiShort คุณจะเห็นไอคอนสีเขียวสำหรับเปิด/ปิดที่มุมล่างขวาของหน้าเว็บที่รองรับ คลิกที่ไอคอนนี้เพื่อเปิดหรือปิดแถบด้านข้าง ปัจจุบันรองรับ ChatGPT, Gemini, Claude, Doubao และอื่น ๆ โดยค่าเริ่มต้น

![](/img/docs/extension-sidebar.gif)
