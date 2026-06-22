---
sidebar_label: Triển khai Tiêu chuẩn
title: Triển khai Tiêu chuẩn AI Short | Build cục bộ, Vercel, Cloudflare, Docker
description: Hướng dẫn triển khai tiêu chuẩn AI Short, dùng lại backend chính thức dùng chung, hỗ trợ build cục bộ, triển khai một lần nhấp lên Vercel, Cloudflare Pages và Docker, hoạt động ngay lập tức.
---

# Triển khai Tiêu chuẩn

Dùng lại backend chính thức dùng chung và hoạt động ngay lập tức. Fork dự án trước, sau đó triển khai bằng một trong các phương thức dưới đây.

**Yêu cầu**: [Node.js 20.0](https://nodejs.org/) trở lên, trên macOS, Windows (bao gồm WSL) hoặc Linux.

![Sơ đồ triển khai tiêu chuẩn: sau khi fork, triển khai qua build cục bộ, Vercel, Cloudflare Pages hoặc Docker — tất cả đều dùng lại backend chính thức dùng chung (đăng nhập, bộ sưu tập, cộng đồng, bình luận, đồng bộ đa thiết bị)](/img/docs/standard-deploy-topology.svg)

## Build Cục bộ

```shell
# cài đặt dependencies
yarn

# phát triển cục bộ
yarn start

# build: xuất file tĩnh ra thư mục build, sử dụng defaultLocale trong scripts/i18nLocales.mjs
yarn build
```

> **Chỉ build một số ngôn ngữ cụ thể**: dùng `yarn build --locale <locale>` (ví dụ: `zh-Hans`, `en`, `ja`… xem danh sách locale đầy đủ trong `scripts/i18nLocales.mjs`). Kết hợp nhiều locale: `yarn build --locale zh-Hans && yarn build --locale en`.

## Triển khai Vercel

Nhấp nút bên dưới để triển khai một lần lên Vercel:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

> **Lưu ý**: Gói miễn phí của Vercel có thể thất bại do giới hạn bộ nhớ. Hãy triển khai một ngôn ngữ duy nhất — vào **Settings → Build & Deployment → Build Command** của dự án, nhấp **Override** và đặt lệnh cho một ngôn ngữ (`yarn build --locale zh-Hans` cho tiếng Trung, `yarn build --locale pt` cho tiếng Bồ Đào Nha, v.v.).

## Triển khai Cloudflare Pages

Trước tiên 👉 [Fork dự án này](https://github.com/rockbenben/ChatGPT-Shortcut/fork), sau đó triển khai:

1. Đăng nhập vào [Cloudflare Pages](https://pages.cloudflare.com/) và chọn **Create a project**
2. Kết nối repository bạn vừa fork
3. Cấu hình build:
   - **Build command**: `yarn build --locale zh-Hans` (thay locale bằng ngôn ngữ bạn muốn triển khai, ví dụ: `yarn build --locale pt` cho tiếng Bồ Đào Nha)
   - **Output directory**: `build`
4. Nhấp **Deploy** và chờ Cloudflare Pages hoàn tất build

Mỗi lần push sau đó sẽ tự động kích hoạt quá trình build và deploy.

## Triển khai Docker

Triển khai bằng một dòng lệnh:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Hoặc dùng `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
