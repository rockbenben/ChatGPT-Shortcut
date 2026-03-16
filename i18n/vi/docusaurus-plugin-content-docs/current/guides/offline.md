---
sidebar_label: Phiên bản Ngoại tuyến (Mạng nội bộ Doanh nghiệp)
title: AI Short Triển khai Ngoại tuyến | Không cần Máy chủ Bên ngoài cho Mạng nội bộ
description: Phiên bản ngoại tuyến AI Short được thiết kế dành cho doanh nghiệp và nhóm không thể truy cập mạng bên ngoài. Không cần máy chủ backend, không cần đăng ký, dữ liệu lưu trữ cục bộ trên trình duyệt, sẵn sàng sử dụng ngay.
---

# Phiên bản Triển khai Ngoại tuyến

**Tình huống phù hợp**: Mạng nội bộ doanh nghiệp, mạng chính phủ, môi trường bảo mật, mạng trường học và các tình huống **không thể hoặc bất tiện truy cập mạng bên ngoài**.

Phiên bản ngoại tuyến AI Short không cần máy chủ backend và đăng ký người dùng, tất cả dữ liệu được lưu trữ cục bộ trên trình duyệt. Sau khi triển khai, nhóm có thể sử dụng trực tiếp trên mạng nội bộ.

## Cách sử dụng cho Nhóm

Phiên bản ngoại tuyến là một trang web tĩnh thuần túy, sau khi triển khai lên máy chủ mạng nội bộ, thành viên nhóm chỉ cần mở trình duyệt truy cập địa chỉ mạng nội bộ đó để sử dụng:

1. **Quản trị viên** triển khai phiên bản ngoại tuyến lên máy chủ mạng nội bộ (ví dụ `http://192.168.1.100:3000`)
2. **Thành viên nhóm** mở trình duyệt truy cập địa chỉ đó, có thể duyệt, tìm kiếm và sao chép prompt
3. **Bộ sưu tập và prompt tùy chỉnh** của mỗi người được lưu trên trình duyệt của họ, không ảnh hưởng lẫn nhau
4. Không cần đăng ký tài khoản, không cần cài đặt phần mềm nào, mở là dùng

```
Máy chủ mạng nội bộ (triển khai phiên bản ngoại tuyến)
   ├── Dữ liệu thư viện prompt (chia sẻ cho tất cả, từ JSON tĩnh)
   │
   ├── Trình duyệt Người dùng A → localStorage (bộ sưu tập và prompt tùy chỉnh của A)
   ├── Trình duyệt Người dùng B → localStorage (bộ sưu tập và prompt tùy chỉnh của B)
   └── Trình duyệt Người dùng C → localStorage (bộ sưu tập và prompt tùy chỉnh của C)
```

:::tip Gợi ý
Nội dung thư viện prompt (prompt được tuyển chọn) là dữ liệu tĩnh được đóng gói khi build, tất cả người dùng thấy cùng nội dung. Bộ sưu tập, prompt tùy chỉnh, thứ tự sắp xếp và thẻ của mỗi người dùng được lưu trong localStorage của trình duyệt riêng, độc lập với nhau.
:::

## Khác biệt với Phiên bản Trực tuyến

| Tính năng | Phiên bản Trực tuyến | Phiên bản Ngoại tuyến |
| ---- | ------ | ------ |
| Duyệt/tìm kiếm/lọc prompt | ✅ | ✅ |
| Sao chép prompt | ✅ | ✅ |
| Quản lý bộ sưu tập | Lưu trên máy chủ | Lưu cục bộ trên trình duyệt |
| Prompt tùy chỉnh | Lưu trên máy chủ | Lưu cục bộ trên trình duyệt |
| Bộ sưu tập của tôi (kéo thả sắp xếp, thẻ) | ✅ | ✅ |
| Hỗ trợ đa ngôn ngữ (18 ngôn ngữ) | ✅ | ✅ |
| Nhập/xuất dữ liệu | ✅ | ✅ (định dạng tương thích) |
| Trang chi tiết prompt | ✅ | ✅ (dữ liệu tĩnh, không có bình luận) |
| Đăng ký/đăng nhập người dùng | ✅ | ❌ (không cần tài khoản) |
| Danh sách prompt cộng đồng/bình chọn | ✅ | ❌ |
| Phản hồi bình luận | ✅ | ❌ |

## Lưu trữ Dữ liệu

Dữ liệu của mỗi người dùng được lưu trong localStorage của **trình duyệt riêng**, không liên quan đến máy chủ:

| Dữ liệu | Khóa lưu trữ | Mô tả |
| ---- | ------ | ---- |
| Danh sách bộ sưu tập | `local_favorites` | Mảng ID prompt đã thu thập |
| Prompt tùy chỉnh | `local_user_prompts` | Dữ liệu prompt do người dùng tạo |
| Thứ tự sắp xếp | `local_myspace_order` | Thứ tự thẻ trong bộ sưu tập của tôi |
| Thẻ tùy chỉnh | `local_custom_tags` | Định nghĩa thẻ và quan hệ gán |

:::caution Lưu ý
- localStorage của trình duyệt có giới hạn dung lượng khoảng 5MB, hoàn toàn đủ cho sử dụng hàng ngày.
- Xóa dữ liệu trình duyệt sẽ mất dữ liệu cá nhân, khuyến nghị sao lưu định kỳ qua "Cài đặt > Xuất dữ liệu".
- Sau khi thay đổi máy tính hoặc trình duyệt cần nhập lại dữ liệu.
:::

## Triển khai

Phiên bản ngoại tuyến dựa trên nhánh `offline`. Sau khi quản trị viên hoàn thành triển khai một lần, thành viên nhóm không cần thao tác gì.

### Triển khai Docker (Khuyến nghị)

Phương pháp triển khai đơn giản nhất, một lệnh có thể chạy trên máy chủ mạng nội bộ:

```bash
# Sử dụng image phiên bản ngoại tuyến đã build sẵn
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Hoặc sử dụng Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Sau khi triển khai, thành viên nhóm truy cập `http://<IP máy chủ>:3000` để sử dụng.

Sử dụng `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build từ Mã nguồn

Nếu cần tùy chỉnh nội dung prompt hoặc sửa đổi cấu hình:

```bash
# Clone nhánh offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Cài đặt dependencies
yarn

# Phát triển cục bộ
yarn start

# Build phiên bản một ngôn ngữ (Trung Quốc)
yarn build --locale zh-Hans

# Build tất cả ngôn ngữ
yarn build
```

Sản phẩm build nằm trong thư mục `build/`, có thể triển khai lên bất kỳ máy chủ tệp tĩnh nào (Nginx, Apache, Caddy, v.v.).

### Ví dụ Cấu hình Nginx

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Triển khai trên Nền tảng

Khi triển khai trên Vercel, Cloudflare Pages và các nền tảng khác, chọn nhánh `offline`, các bước khác giống phiên bản trực tuyến, xem chi tiết tại [Triển khai Dự án](../deploy).

## Nhập-Xuất Dữ liệu

### Xuất

Vào "Cài đặt > Xuất dữ liệu", xuất bộ sưu tập cá nhân và prompt tùy chỉnh dưới dạng tệp JSON.

### Nhập

Hỗ trợ nhập tệp JSON với các định dạng sau:

- **Tệp xuất từ phiên bản ngoại tuyến**: Khôi phục hoàn toàn bộ sưu tập, prompt, thứ tự và thẻ
- **Tệp xuất từ phiên bản trực tuyến**: Tự động tương thích
  - Prompt người dùng → Hợp nhất vào cục bộ (loại bỏ trùng lặp theo tiêu đề)
  - Bộ sưu tập tuyển chọn (card) → Hợp nhất vào bộ sưu tập cục bộ
  - Bộ sưu tập cộng đồng (community) → Tự động chuyển thành prompt tùy chỉnh cục bộ
  - Thứ tự MySpace → Khôi phục vào cục bộ
  - Thẻ tùy chỉnh → Thêm và hợp nhất (không ghi đè thẻ hiện có)

### Di chuyển từ Phiên bản Trực tuyến

1. Xuất dữ liệu từ trang "Tài khoản của tôi" trên phiên bản trực tuyến (aishort.top)
2. Nhập tệp JSON đó vào trang "Cài đặt" của phiên bản ngoại tuyến
3. Bộ sưu tập cộng đồng sẽ tự động chuyển thành prompt cục bộ, bộ sưu tập tuyển chọn đồng bộ bình thường

## Câu hỏi Thường gặp

### Sau khi triển khai, nhóm sử dụng như thế nào?

Sau khi quản trị viên triển khai lên máy chủ mạng nội bộ, thông báo địa chỉ truy cập (ví dụ `http://192.168.1.100:3000`) cho thành viên nhóm. Mọi người mở trình duyệt, không cần cài đặt, không cần đăng ký.

### Dữ liệu của mỗi người có ảnh hưởng lẫn nhau không?

Không. Bộ sưu tập và prompt tùy chỉnh của mỗi người được lưu trong localStorage của trình duyệt riêng, hoàn toàn độc lập. Trên máy chủ chỉ có thư viện prompt chia sẻ (chỉ đọc).

### Dữ liệu có thể bị mất không?

Các thao tác sau có thể gây mất dữ liệu cá nhân:

- Xóa dữ liệu/bộ nhớ đệm trình duyệt
- Sử dụng chế độ riêng tư/ẩn danh
- Thay đổi máy tính hoặc trình duyệt

Khuyến nghị sao lưu dữ liệu quan trọng định kỳ qua "Cài đặt > Xuất dữ liệu" thành tệp JSON.

### Có thể chia sẻ prompt tùy chỉnh giữa các thành viên nhóm không?

Có. Một người xuất tệp JSON, sau đó các thành viên khác nhập tại "Cài đặt > Nhập dữ liệu". Khi nhập sẽ tự động loại bỏ trùng lặp.

### Cách cập nhật thư viện prompt?

Thư viện prompt là dữ liệu tĩnh được đóng gói khi build. Cách cập nhật:

1. Quản trị viên pull mã nguồn nhánh `offline` mới nhất
2. Build lại và triển khai (hoặc pull image Docker mới nhất)
3. Thành viên nhóm làm mới trang trình duyệt sẽ thấy nội dung mới (dữ liệu cá nhân không bị ảnh hưởng)

### Định dạng dữ liệu phiên bản ngoại tuyến có tương thích với phiên bản trực tuyến không?

Tương thích. Định dạng JSON xuất ra giống nhau, có thể nhập-xuất giữa hai phiên bản. ID prompt khác nhau giữa hai phiên bản (trực tuyến dùng ID máy chủ, ngoại tuyến dùng ID timestamp), nhưng khi nhập sẽ loại bỏ trùng lặp theo tiêu đề, không có xung đột.
