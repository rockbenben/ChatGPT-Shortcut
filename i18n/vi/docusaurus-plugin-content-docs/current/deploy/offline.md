---
sidebar_label: Phiên bản ngoại tuyến (Mạng nội bộ)
title: Triển khai AI Short Ngoại tuyến | Mạng nội bộ doanh nghiệp không cần máy chủ ngoài
description: Phiên bản ngoại tuyến của AI Short được thiết kế cho các doanh nghiệp, cơ quan nhà nước, ngân hàng và môi trường không thể truy cập Internet công cộng. Không cần máy chủ backend, không cần đăng ký, dữ liệu lưu cục bộ trong trình duyệt — phù hợp yêu cầu bảo vệ dữ liệu cá nhân theo NĐ-13/2023, triển khai một lần là cả nhóm dùng được.
---

# Triển khai Phiên bản Ngoại tuyến

> **Đối tượng đọc**: Quản trị viên IT hoặc người phụ trách kỹ thuật chịu trách nhiệm triển khai. Người dùng cuối chỉ cần mở địa chỉ nội bộ mà quản trị viên cung cấp, không cần đọc tài liệu này.

**Phù hợp với**: Mạng nội bộ doanh nghiệp, mạng cơ quan nhà nước, ngân hàng và các tổ chức tài chính, môi trường có yêu cầu bảo mật dữ liệu cao (tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, Luật An ninh mạng), mạng trường học, cũng như các môi trường khác **không thể hoặc không tiện truy cập Internet công cộng**.

Không backend, không cần đăng ký — toàn bộ dữ liệu nằm trong trình duyệt của người dùng. Nhờ vậy, phiên bản ngoại tuyến đặc biệt phù hợp với các tổ chức cần **lưu trữ dữ liệu trong nước** theo NĐ-13/2023: không có bất kỳ dữ liệu cá nhân nào được truyền ra máy chủ bên ngoài. Sau khi triển khai một lần, các thành viên trong mạng nội bộ chỉ cần mở trình duyệt là dùng được.

## Cách sử dụng trong nhóm

Phiên bản ngoại tuyến là website tĩnh thuần. Sau khi triển khai lên máy chủ nội bộ, các thành viên truy cập địa chỉ nội bộ bằng trình duyệt là dùng được:

1. **Quản trị viên** triển khai phiên bản ngoại tuyến lên máy chủ nội bộ (ví dụ `http://192.168.1.100:3000`)
2. **Thành viên nhóm** mở địa chỉ đó bằng trình duyệt, sau đó có thể duyệt, tìm kiếm và sao chép prompt
3. **Bộ sưu tập và prompt tự tạo của mỗi người được lưu trong trình duyệt của chính họ**, hoàn toàn độc lập với nhau
4. Không cần đăng ký tài khoản, không cần cài đặt phần mềm nào, mở là dùng được

![Kiến trúc dữ liệu phiên bản ngoại tuyến: một máy chủ nội bộ lưu trữ thư viện prompt dùng chung ở chế độ chỉ đọc; bộ sưu tập, prompt, thứ tự sắp xếp và thẻ của mỗi người dùng nằm trong localStorage của trình duyệt riêng — độc lập, không cần tài khoản](/img/docs/offline-architecture.svg)

:::tip[Lưu ý]

Thư viện prompt (các prompt tuyển chọn) là dữ liệu tĩnh được đóng gói khi build, nên mọi người dùng đều thấy cùng nội dung. Bộ sưu tập, prompt tự tạo, thứ tự sắp xếp và thẻ của mỗi người được lưu trong localStorage của trình duyệt riêng, hoàn toàn độc lập.

:::

## Khác biệt so với phiên bản trực tuyến

| Tính năng | Phiên bản trực tuyến | Phiên bản ngoại tuyến |
| --------- | -------------------- | --------------------- |
| Duyệt / tìm kiếm / lọc prompt | Có | Có |
| Sao chép prompt | Có | Có |
| Quản lý bộ sưu tập | Lưu trên máy chủ | Lưu cục bộ trong trình duyệt |
| Prompt tùy chỉnh | Lưu trên máy chủ | Lưu cục bộ trong trình duyệt |
| Bộ sưu tập của tôi (kéo thả, thẻ) | Có | Có |
| Hỗ trợ đa ngôn ngữ (18 ngôn ngữ) | Có | Có |
| Nhập / xuất dữ liệu | Có | Có (định dạng tương thích) |
| Trang chi tiết prompt | Có | Có (dữ liệu tĩnh, không có bình luận) |
| Đăng ký / đăng nhập | Có | Không (không cần tài khoản) |
| Danh sách prompt cộng đồng / bình chọn | Có | Không |
| Bình luận và phản hồi | Có | Không |

## Lưu trữ dữ liệu

Dữ liệu của mỗi người dùng được lưu trong localStorage của **trình duyệt của chính họ**, không liên quan đến máy chủ:

| Dữ liệu | Khóa lưu trữ | Mô tả |
| ------- | ------------ | ----- |
| Danh sách bộ sưu tập | `local_favorites` | Mảng ID các prompt đã thu thập |
| Prompt tự tạo | `local_user_prompts` | Dữ liệu prompt do người dùng tạo |
| Thứ tự sắp xếp | `local_myspace_order` | Thứ tự thẻ trong Bộ sưu tập của tôi |
| Thẻ tùy chỉnh | `local_custom_tags` | Định nghĩa và phân bổ thẻ |

:::caution[Lưu ý]

- Bộ nhớ cục bộ trình duyệt giới hạn khoảng 5 MB, đủ dùng cho nhu cầu hàng ngày.
- Xóa dữ liệu trình duyệt sẽ làm mất dữ liệu cá nhân — khuyến nghị định kỳ sao lưu qua "Tài khoản của tôi → Quản lý dữ liệu → Xuất".
- Khi đổi máy tính hoặc trình duyệt, cần nhập lại dữ liệu.

:::

## Triển khai

Phiên bản ngoại tuyến dựa trên nhánh `offline`. Sau khi quản trị viên triển khai một lần, các thành viên không cần thao tác gì thêm.

### Triển khai Docker (Khuyến nghị)

Cách triển khai đơn giản nhất, chỉ một dòng lệnh là chạy được trên máy chủ nội bộ:

```bash
# Dùng image dựng sẵn của phiên bản ngoại tuyến
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Hoặc dùng Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Sau khi triển khai, thành viên truy cập `http://<IP-máy-chủ>:3000` là dùng được.

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

### Build từ mã nguồn

Khi cần tùy chỉnh nội dung prompt hoặc thay đổi cấu hình:

```bash
# Clone nhánh ngoại tuyến
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Cài đặt dependencies
yarn

# Phát triển cục bộ
yarn start

# Build phiên bản đơn ngôn ngữ (tiếng Việt)
yarn build --locale vi

# Build tất cả ngôn ngữ
yarn build
```

Kết quả build nằm trong thư mục `build/`, có thể triển khai trên bất kỳ máy chủ file tĩnh nào (Nginx, Apache, Caddy, v.v.).

### Cấu hình Nginx mẫu

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

### Triển khai trên nền tảng

Khi triển khai trên Vercel, Cloudflare Pages hay các nền tảng tương tự, chỉ cần chọn nhánh `offline`, các bước còn lại giống phiên bản trực tuyến. Xem chi tiết tại [Triển khai dự án](../deploy).

## Nhập xuất dữ liệu

### Xuất

Vào "Tài khoản của tôi → Quản lý dữ liệu → Xuất" để xuất bộ sưu tập và prompt tự tạo thành file JSON.

### Nhập

Hỗ trợ nhập các định dạng file JSON sau:

- **File xuất từ phiên bản ngoại tuyến**: Khôi phục đầy đủ bộ sưu tập, prompt, thứ tự và thẻ
- **File xuất từ phiên bản trực tuyến**: Tự động xử lý tương thích
  - Prompt người dùng → Gộp vào cục bộ (chống trùng theo tiêu đề)
  - Bộ sưu tập tuyển chọn (card) → Gộp vào bộ sưu tập cục bộ
  - Bộ sưu tập cộng đồng (community) → Tự động chuyển thành prompt tự tạo cục bộ
  - Thứ tự MySpace → Khôi phục về cục bộ
  - Thẻ tùy chỉnh → Gộp thêm (không ghi đè thẻ hiện có)

### Di chuyển từ phiên bản trực tuyến

1. Xuất dữ liệu tại trang "Tài khoản của tôi" trên phiên bản trực tuyến (aishort.top)
2. Nhập file JSON đó tại "Tài khoản của tôi → Quản lý dữ liệu → Nhập" trên phiên bản ngoại tuyến
3. Bộ sưu tập cộng đồng sẽ tự động chuyển thành prompt cục bộ, bộ sưu tập tuyển chọn đồng bộ bình thường

## Câu hỏi thường gặp

### Sau khi triển khai, nhóm sử dụng thế nào?

Sau khi quản trị viên triển khai lên máy chủ nội bộ, chỉ cần thông báo địa chỉ truy cập (ví dụ `http://192.168.1.100:3000`) cho các thành viên. Mỗi người mở bằng trình duyệt, không cần cài đặt, không cần đăng ký.

### Dữ liệu của mọi người có ảnh hưởng lẫn nhau không?

Không. Bộ sưu tập và prompt tự tạo của mỗi người được lưu trong localStorage của trình duyệt riêng, hoàn toàn độc lập. Trên máy chủ chỉ có thư viện prompt dùng chung (chỉ đọc).

### Dữ liệu có bị mất không?

Các thao tác sau sẽ làm mất dữ liệu cá nhân:

- Xóa dữ liệu / cache trình duyệt
- Duyệt web ở chế độ ẩn danh / riêng tư
- Đổi máy tính hoặc trình duyệt

Khuyến nghị sao lưu dữ liệu quan trọng định kỳ thành file JSON qua "Tài khoản của tôi → Quản lý dữ liệu → Xuất".

### Có thể chia sẻ prompt tự tạo giữa các thành viên không?

Có. Một người xuất file JSON, các thành viên khác nhập vào tại "Tài khoản của tôi → Quản lý dữ liệu → Nhập" là xong, tự động chống trùng.

### Làm sao để cập nhật thư viện prompt?

Thư viện prompt là dữ liệu tĩnh được đóng gói khi build. Cách cập nhật:

1. Quản trị viên kéo mã mới nhất từ nhánh `offline`
2. Build và triển khai lại (hoặc pull image Docker mới nhất)
3. Thành viên nhóm chỉ cần refresh trình duyệt là thấy nội dung mới (dữ liệu cá nhân không bị ảnh hưởng)

### Định dạng dữ liệu của phiên bản ngoại tuyến có tương thích với phiên bản trực tuyến không?

Có. Định dạng JSON xuất ra giống nhau, có thể nhập qua lại giữa hai phiên bản. ID prompt khác nhau (phiên bản trực tuyến dùng ID máy chủ, phiên bản ngoại tuyến dùng ID timestamp), nhưng việc nhập sẽ chống trùng theo tiêu đề nên không xung đột.
