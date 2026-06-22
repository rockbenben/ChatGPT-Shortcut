---
sidebar_label: Bật Đồng bộ Cập nhật
title: Đồng bộ Cập nhật AI Short | Fork tự động theo upstream
description: Để fork AI Short của bạn tự động theo các cập nhật upstream — khắc phục việc Vercel không báo có bản cập nhật, bật tự động đồng bộ qua GitHub Actions.
---

# Bật Đồng bộ Cập nhật

Triển khai Vercel một lần nhấp có thể tiếp tục hiển thị thông báo "có bản cập nhật" — vì Vercel tạo dự án mới thay vì fork, nên không thể phát hiện các cập nhật từ upstream. Để khắc phục:

1. Xóa repository gốc
2. Dùng nút **Fork** ở góc trên bên phải trang để fork dự án này
3. Trên [trang dự án mới của Vercel](https://vercel.com/new), nhập lại repository đã fork trong phần Import Git Repository và triển khai

## Bật Tự động Cập nhật

> Nếu bạn gặp lỗi Upstream Sync, hãy chạy Sync Fork thủ công một lần!

Sau khi fork, bật thủ công Workflows trong trang Actions và chạy Upstream Sync action một lần. Sau khi bật, dự án sẽ tự động đồng bộ mỗi ngày:

![Tự động cập nhật](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Bật tự động cập nhật](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Cập nhật Thủ công

Muốn cập nhật ngay bằng tay? Xem [tài liệu đồng bộ fork của GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Bạn cũng có thể star / watch dự án này để nhận thông báo về các tính năng mới.
