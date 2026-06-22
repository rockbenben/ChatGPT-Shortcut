---
sidebar_label: Triển khai
title: Triển khai AI Short | Thiết lập Vercel, Docker & Cloudflare
description: Muốn tự lưu trữ thư viện prompt AI của riêng bạn? Triển khai AI Short dễ dàng bằng Vercel, Docker hoặc Cloudflare. Bao gồm mẹo cấu hình và script tự động cập nhật.
---

# Triển khai Dự án

> **Dành cho ai**: các nhà phát triển muốn tự lưu trữ hoặc tùy chỉnh AiShort. Người dùng thông thường chỉ cần truy cập [aishort.top](https://www.aishort.top) — không cần đọc tài liệu này.

## Chọn Mô hình Triển khai

Chọn mô hình phù hợp với nhu cầu của bạn:

| Mô hình                          | Backend                                       | Ghi chú                                                                                                                                                                           |
| -------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tiêu chuẩn** (mặc định)        | Dùng lại backend chính thức dùng chung        | Sau khi fork, bạn có thể tùy chỉnh tên trang web, mô tả, prompt, v.v. (xem [Cấu hình](./deploy/configuration)); đăng nhập, yêu thích, cộng đồng và đồng bộ hoạt động ngay lập tức |
| **Phiên bản Ngoại tuyến**        | Không có backend, dữ liệu lưu cục bộ trên trình duyệt | Mạng nội bộ doanh nghiệp hoặc chính phủ bị cô lập; không cần tài khoản                                                                                                          |
| **Backend tự lưu trữ hoàn toàn** | Backend độc lập của riêng bạn                 | Khi bạn cần hệ thống tài khoản độc lập, toàn quyền sở hữu dữ liệu và cộng đồng riêng tư                                                                                         |

Hai mô hình đầu được đề cập trong hướng dẫn này. Đối với mô hình thứ ba, vì dịch vụ backend không phải mã nguồn mở, vui lòng [gửi email cho nhà phát triển](mailto:qingwhat@gmail.com) kèm mô tả ngắn về trường hợp sử dụng và quy mô của bạn để nhận kế hoạch triển khai và hỗ trợ.

## Tài liệu Triển khai

Quy trình triển khai được tách thành các tài liệu sau, tham khảo khi cần:

- **[Triển khai Tiêu chuẩn](./deploy/standard)** — Dùng lại backend chính thức dùng chung, hỗ trợ build cục bộ, Vercel, Cloudflare Pages và Docker.
- **[Phiên bản ngoại tuyến (Mạng nội bộ)](./deploy/offline)** — Giải pháp ngoại tuyến cho mạng nội bộ doanh nghiệp, mạng cơ quan nhà nước và các môi trường bị cô lập, không cần backend hay tài khoản.
- **[Cấu hình và Tùy chỉnh](./deploy/configuration)** — Sửa tiêu đề trang web, mô tả, prompt và đối tác backend tùy chỉnh.
- **[Bật Đồng bộ Cập nhật](./deploy/sync-updates)** — Để fork của bạn tự động cập nhật theo upstream, tránh bị tụt hậu tính năng.
