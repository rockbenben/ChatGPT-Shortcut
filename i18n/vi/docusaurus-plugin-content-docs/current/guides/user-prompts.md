---
sidebar_label: Prompt Tùy chỉnh
title: Prompt Tùy chỉnh AI Short | Tạo, Chỉnh sửa & Chia sẻ
description: Tạo prompt AI riêng, lưu vào tài khoản cá nhân để gọi bất cứ lúc nào. Hỗ trợ chia sẻ lên cộng đồng hoặc đặt riêng tư, xuất sao lưu dữ liệu một cú nhấp.
---

# Prompt Tùy chỉnh

Sau khi đăng nhập, bạn có thể tạo prompt của riêng mình và lưu vào tài khoản để gọi nhanh bất cứ lúc nào. Prompt tùy chỉnh hiển thị trong chế độ xem "Bộ sưu tập của tôi".

## Tạo Prompt

1. Sau khi đăng nhập, nhấp nút "**Tạo prompt**" ở đầu trang
2. Điền vào hộp thoại "Tạo prompt":
   - **Tên Prompt** (bắt buộc): Đặt tên cho prompt
   - **Nội dung Prompt** (bắt buộc): Phần thân của prompt; văn bản trong dấu ngoặc vuông `[...]` sẽ được tô sáng như vị trí chờ điền khi hiển thị
   - **Cách sử dụng** (tùy chọn): Mô tả ngắn gọn prompt này làm được gì
   - **Ghi chú** (tùy chọn): Nguồn, phiên bản ngôn ngữ khác hoặc ghi chú bổ sung
3. Công tắc "**Bạn có muốn chia sẻ prompt này lên trang công khai không?**" ở dưới cùng mặc định bật — tắt để giữ prompt riêng tư
4. Nhấp "Tạo prompt" để gửi

![Hộp thoại Tạo Prompt](/img/docs/user-prompts-create.png)

> 💡 **Ví dụ** — một prompt "Trình tạo Cập nhật Standup":
> - **Tên Prompt**: Trình tạo Cập nhật Standup
> - **Nội dung Prompt**: Bạn là trợ lý giao tiếp súc tích. Hãy chuyển đổi các ghi chú dưới đây thành bản cập nhật standup hàng ngày gồm ba phần — Hôm qua, Hôm nay, Vướng mắc. Giữ mỗi gạch đầu dòng ngắn gọn và tập trung vào kết quả: [ghi chú thô của tôi]
> - **Cách sử dụng**: Chuyển ghi chú lộn xộn thành bản cập nhật standup gọn gàng
> - **Ghi chú**: Chạy trước buổi standup sáng

## Chỉnh sửa Prompt

Trong chế độ xem Bộ sưu tập của tôi, nhấp nút chỉnh sửa (bút chì) trên thẻ prompt bạn đã tạo để mở hộp thoại "Chỉnh sửa prompt". Bạn có thể:

- Sửa tên, nội dung, cách sử dụng và ghi chú
- Chuyển đổi trạng thái chia sẻ (công khai / riêng tư)
- Nhấp "Lưu" để cập nhật

![Giao diện Chỉnh sửa Prompt](/img/docs/user-prompts-edit.png)

## Xóa Prompt

Nhấp "Xóa" trong hộp thoại chỉnh sửa. Không thể khôi phục sau khi xóa — hãy thao tác cẩn thận.

## Chia sẻ lên Cộng đồng

Khi tạo hoặc chỉnh sửa, công tắc "**Bạn có muốn chia sẻ prompt này lên trang công khai không?**" ở dưới cùng kiểm soát mức độ hiển thị:

- **Bật (mặc định)**: Prompt xuất hiện trên trang [Prompt Cộng đồng](./community), người dùng khác có thể xem và thu thập
- **Tắt**: Riêng tư — chỉ mình bạn thấy

Trạng thái chia sẻ có thể chuyển đổi bất cứ lúc nào.

## Xuất Prompt

1. Vào "Tài khoản của tôi" và tìm mục "Quản lý dữ liệu → Xuất Prompt"
2. Nhấp nút "Xuất Dữ liệu"
3. Hệ thống tạo tệp JSON và tự động tải xuống

Nội dung xuất bao gồm:

- Tên, nội dung, cách sử dụng và ghi chú của prompt
- Trạng thái chia sẻ
- Bộ sưu tập, thứ tự sắp xếp bộ sưu tập và thẻ tùy chỉnh của bạn

Nên xuất sao lưu định kỳ để tránh mất dữ liệu.

## Nhập Prompt

Nhập prompt và bộ sưu tập từ tệp JSON:

1. Vào "Tài khoản của tôi" và tìm mục "Quản lý dữ liệu → Nhập Prompt"
2. Nhấp nút "Nhập dữ liệu"
3. Chọn tệp JSON
4. Hệ thống tự động hợp nhất dữ liệu (loại trùng theo tiêu đề; prompt có ID thuộc tài khoản khác sẽ được đặt thành riêng tư)

### Hợp tác Nhóm

Quy trình khuyến nghị để chia sẻ prompt trong nhóm:

1. **Lọc và chia sẻ**: Sau khi xuất, xóa thủ công danh sách bộ sưu tập hoặc lọc ra các prompt muốn chia sẻ, rồi gửi tệp cho thành viên nhóm để nhập
2. **Bảo vệ quyền riêng tư**: Prompt nhập từ người khác (ID không thuộc tài khoản hiện tại) tự động được đặt thành **riêng tư**, dữ liệu của từng thành viên không can thiệp lẫn nhau

## Tài liệu Liên quan

- [Bộ sưu tập của tôi](./my-collection) - Quản lý bộ sưu tập và thẻ
- [Prompt Cộng đồng](./community) - Chia sẻ và bình chọn
- [Quản lý Tài khoản](./account) - Đăng nhập và cài đặt
