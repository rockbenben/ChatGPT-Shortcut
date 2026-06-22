---
sidebar_label: Cấu hình và Tùy chỉnh
title: Cấu hình và Tùy chỉnh AI Short | Sửa tiêu đề, prompt, backend tùy chỉnh
description: Tùy chỉnh AI Short — sửa tiêu đề và mô tả trang web, thêm prompt trang chủ, đối tác backend tùy chỉnh, kèm mô tả cấu trúc module API và cơ chế cache.
---

# Cấu hình và Tùy chỉnh

AI Short là mã nguồn mở — bạn có thể tự do sửa đổi tiêu đề trang web, mô tả, prompt và nhiều thứ khác.

## Tiêu đề và mô tả trang web

Chỉnh sửa `docusaurus.config.js`.

## Tài liệu và hướng dẫn

Chỉnh sửa các file tương ứng trong thư mục `docs/`.

## Prompt trang chủ

Dữ liệu nguồn nằm trong `src/data/prompt.json` — một mảng trong đó mỗi object lưu tất cả các phiên bản ngôn ngữ theo mã ngôn ngữ (`zh` / `en` / `ja`, v.v.). Định dạng để thêm một prompt:

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

Sau khi chỉnh sửa, chạy `python CodeUpdateHandler.py`. Script này sẽ tách `prompt.json` thành các file `prompt_<locale>.json` riêng theo từng ngôn ngữ và cập nhật trang chủ cũng như các trang prompt tuyển chọn cho mỗi ngôn ngữ.

![Quy trình xử lý dữ liệu: file gốc prompt.json được python CodeUpdateHandler.py xử lý — tách theo ngôn ngữ thành các file prompt riêng cho từng locale, tạo JSON thẻ và trang chi tiết cho mỗi id, kèm chuyển đổi tiếng Trung Giản thể sang Phồn thể bằng OpenCC](/img/docs/data-pipeline.svg)

> **Lưu ý**: nên đặt `id` từ 500 trở lên để tránh xung đột ID với prompt hiện có hoặc nội dung cộng đồng. Chạy `python CodeUpdateHandler.py` sẽ tự động tạo dữ liệu thẻ và trang chi tiết cho mỗi prompt (bao gồm cả prompt mới thêm), không cần tạo file trang thủ công; prompt tùy chỉnh mặc định không có phần mô tả meta tuyển chọn và dữ liệu bình luận.

## Backend tùy chỉnh

Theo mặc định dự án kết nối với backend dùng chung (đăng nhập, yêu thích, cộng đồng, bình luận và đồng bộ hóa đa thiết bị đều phụ thuộc vào nó), và `src/api` ghi lại toàn bộ hợp đồng giao diện để tham khảo. Bản thân dịch vụ backend không phải mã nguồn mở; để **triển khai tự lưu trữ hoàn toàn với backend riêng**, xem [Chọn Mô hình Triển khai](../deploy#chọn-mô-hình-triển-khai) ở trên.

Cấu trúc module API:

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

Bộ nhớ đệm: dữ liệu API được cache thông minh qua `lscache` kết hợp ETag — khi máy chủ trả về 304 Not Modified, cache cục bộ sẽ được dùng lại để giảm truyền dữ liệu.
