---
sidebar_label: Cài đặt Tiện ích Firefox
title: Thiết lập Tiện ích Firefox - Thanh bên gốc & Phím tắt
description: Hướng dẫn thiết lập AI Short trên Firefox - từ v4.4.0 giống hệt bản Chrome, thanh bên gốc không cần cấp quyền theo trang, Alt+Shift+D để bật tắt.
---

# Cài đặt Tiện ích Firefox

Từ v4.4.0, bản Firefox giống hệt bản Chrome: cùng ba chế độ hiển thị — **thanh bên, cửa sổ bật lên và cửa sổ riêng** — với thư viện prompt được đóng gói ngay trong tiện ích.

Tiện ích chỉ yêu cầu quyền `storage`; nó không đọc cũng không sửa các trang bạn truy cập, nên **không cần cấp quyền cho từng trang nữa**.

> Các bản cũ (v4.3 trở về trước) chèn thanh bên vào trang ChatGPT bằng content script, nên bạn phải nhấp chuột phải vào biểu tượng và chọn "Always allow on \*\*\*". Cơ chế này đã bị loại bỏ — sau khi cập nhật, hãy bỏ qua bước này.

## Phím tắt

- `Alt + Shift + S`: mở tiện ích theo chế độ hiển thị hiện tại
- `Alt + Shift + D`: bật/tắt thanh bên gốc của Firefox

Tùy chỉnh trong `about:addons` → biểu tượng bánh răng → "Manage Extension Shortcuts".

## Trang cài đặt

Ghim AI Short lên thanh công cụ Firefox, rồi mở "Options" từ trang tiện ích để đổi ngôn ngữ, chế độ hiển thị và chế độ tối.

Ý nghĩa từng tùy chọn xem trong [hướng dẫn sử dụng](./usage).
