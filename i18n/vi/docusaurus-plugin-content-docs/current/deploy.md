---
sidebar_label: Triển khai
title: Triển khai AI Short | Thiết lập Vercel, Docker & Cloudflare
description: Muốn tự lưu trữ thư viện prompt AI của riêng bạn? Triển khai AI Short dễ dàng bằng Vercel, Docker hoặc Cloudflare. Bao gồm mẹo cấu hình và script tự động cập nhật.
---

# Triển khai Dự án

## Cấu hình và Tùy chỉnh

AI Short là dự án mã nguồn mở cho phép bạn tự do sửa đổi tiêu đề trang web, mô tả, prompt và nội dung khác theo nhu cầu của bạn. Dưới đây là các tùy chọn sửa đổi phổ biến và hướng dẫn thao tác:

- **Sửa đổi Tiêu đề và Mô tả Trang web**
  Để thay đổi thông tin tiêu đề và mô tả của trang web, vui lòng chỉnh sửa tệp cấu hình `docusaurus.config.js`.

- **Sửa đổi Hướng dẫn Sử dụng và Giới thiệu Dự án**
  Các tệp hướng dẫn sử dụng và giới thiệu dự án nằm trong thư mục `docs`. Mở các tệp liên quan trong thư mục đó để thực hiện các sửa đổi cần thiết.

- **Sửa đổi Prompt Trang chủ**
  Prompt trang chủ được lưu trữ trong tệp `src/data/prompt.json`. Nếu bạn cần sửa đổi prompt cho một ngôn ngữ cụ thể, chẳng hạn như tiếng Trung, bạn có thể chỉnh sửa trực tiếp tệp `src/data/prompt_es.json`. Khi thêm prompt mới, định dạng như sau:

  ```json
  {
    "es": {
      "title": "prompt tùy chỉnh",
      "prompt": "prompt tùy chỉnh",
      "description": "mô tả tùy chỉnh",
      "remark": "ghi chú tùy chỉnh"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

  **Lưu ý**: Khuyến nghị đặt `id` từ 500 trở lên. Prompt mới thêm sẽ không có trang riêng hoặc phần bình luận.

- **Backend Tùy chỉnh**
  Dự án hiện tại được kết nối với hệ thống backend dùng chung. Nếu bạn muốn xây dựng backend riêng, bạn có thể tham khảo hướng dẫn giao diện trong thư mục `src/api`.

- **Hỗ trợ Đa ngôn ngữ và Triển khai**
  Sau khi hoàn thành các sửa đổi đa ngôn ngữ, bạn có thể sử dụng script `CodeUpdateHandler.py` để xử lý hàng loạt:

  ```bash
  python CodeUpdateHandler.py
  ```

## Hướng dẫn Triển khai

Yêu cầu Hệ thống:

- [Node.js 20.0](https://nodejs.org/) hoặc mới hơn.
- Hỗ trợ macOS, Windows (bao gồm WSL) và Linux.

### Triển khai Cục bộ

```shell
# Cài đặt
yarn

# Phát triển Cục bộ
yarn start

# Build
yarn build

# Build cho ngôn ngữ cụ thể
yarn build --locale vi
```

### Triển khai Vercel

Nhấp nút bên dưới để triển khai một cú nhấp ChatGPT-Shortcut lên nền tảng Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

### Triển khai Docker

```bash
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest
```

## Bật Đồng bộ Cập nhật

Sau khi fork dự án, bạn cần bật thủ công Workflows trong trang Actions của dự án đã fork và bật Upstream Sync Action. Sau khi bật, cập nhật sẽ được thực hiện tự động mỗi ngày.

![Tự động Cập nhật](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)
