---
sidebar_label: Prompt Tùy chỉnh
title: Prompt Tùy chỉnh AI Short | Tạo, Chỉnh sửa & Chia sẻ
description: Tạo prompt AI riêng, lưu vào tài khoản cá nhân để gọi bất cứ lúc nào. Hỗ trợ chia sẻ lên cộng đồng hoặc đặt riêng tư, xuất sao lưu dữ liệu một cú nhấp.
---

# Prompt Tùy chỉnh

Sau khi đăng nhập, bạn có thể tạo prompt của riêng mình, lưu vào tài khoản để gọi bất cứ lúc nào. Prompt tùy chỉnh sẽ hiển thị trong chế độ xem "Bộ sưu tập của tôi".

## Tạo Prompt

1. Nhấp nút "Thêm" ở góc trên bên phải
2. Trong cửa sổ "Tạo prompt" hiện ra, điền các trường:
   - **Tên prompt** (bắt buộc): Đặt tên cho prompt
   - **Nội dung prompt** (bắt buộc): Nội dung chính của prompt
   - **Vai trò·Sử dụng** (tùy chọn): Mô tả ngắn gọn prompt có thể làm gì
   - **Ghi chú** (tùy chọn): Nguồn, phiên bản ngôn ngữ khác hoặc giải thích bổ sung
3. Công tắc "Bạn có muốn chia sẻ prompt này lên trang công khai?" ở dưới cùng mặc định bật — tắt để chỉ mình bạn xem được
4. Nhấp "Tạo prompt" để gửi

![Popup Tạo Prompt](/img/docs/user-prompts-create.png)

> 💡 **Ví dụ điền form** — một prompt "Trợ lý ghi biên bản cuộc họp":
> - **Tên prompt**: Trợ lý ghi biên bản cuộc họp
> - **Nội dung prompt**: Bạn là trợ lý văn phòng chuyên ghi biên bản. Dựa vào ghi chú thô bên dưới, hãy soạn biên bản cuộc họp gồm các mục: chủ đề, người tham dự, nội dung thảo luận chính, quyết định đã chốt và việc cần làm (kèm người phụ trách, hạn chót). Trình bày súc tích, dùng gạch đầu dòng: [ghi chú thô từ cuộc họp]
> - **Vai trò·Sử dụng**: Biến ghi chú rời rạc thành biên bản cuộc họp có cấu trúc, sẵn sàng gửi cho cả nhóm
> - **Ghi chú**: Chạy ngay sau mỗi cuộc họp để không bỏ sót việc cần làm

## Chỉnh sửa Prompt

Trong chế độ xem Bộ sưu tập của tôi, nhấp thẻ prompt bạn đã tạo để mở cửa sổ "Chỉnh sửa prompt", có thể:

- Sửa tên, nội dung, vai trò, ghi chú
- Chuyển đổi trạng thái chia sẻ (công khai/riêng tư)
- Nhấp "Lưu" để cập nhật

![Giao diện Chỉnh sửa Prompt](/img/docs/user-prompts-edit.png)

## Xóa Prompt

Nhấp "Xóa" trong cửa sổ chỉnh sửa. Sau khi xóa không thể khôi phục, vui lòng thao tác cẩn thận.

## Chia sẻ lên Cộng đồng

Khi tạo hoặc chỉnh sửa, công tắc "Bạn có muốn chia sẻ prompt này lên trang công khai?" ở dưới cùng kiểm soát mức độ hiển thị:

- **Bật (mặc định)**: Prompt hiển thị trên trang [Prompt Cộng đồng](./community), người dùng khác có thể xem và thu thập
- **Tắt**: Prompt riêng tư, chỉ mình bạn xem được

Trạng thái chia sẻ có thể chuyển đổi bất cứ lúc nào.

## Xuất dữ liệu

1. Vào "Tài khoản của tôi" → tìm mục "Quản lý dữ liệu → Xuất prompt"
2. Nhấp nút "Xuất dữ liệu"
3. Hệ thống tạo tệp JSON và tự động tải xuống

Nội dung xuất bao gồm:

- Tên, nội dung, vai trò·sử dụng, ghi chú của prompt
- Thời gian tạo và cập nhật
- Trạng thái chia sẻ

Nên xuất sao lưu định kỳ để tránh mất dữ liệu.

## Nhập dữ liệu

Nhập prompt và bộ sưu tập từ tệp JSON:

1. Vào "Tài khoản của tôi" → tìm mục "Quản lý dữ liệu → Nhập prompt"
2. Nhấp nút "Nhập dữ liệu"
3. Chọn tệp JSON
4. Hệ thống tự động hợp nhất dữ liệu (loại trùng theo tiêu đề; prompt có ID của người khác sẽ tự động đặt làm riêng tư)

### Hợp tác nhóm

Quy trình khuyến nghị để chia sẻ prompt trong nhóm:

1. **Lọc và chia sẻ**: Sau khi xuất, xóa thủ công danh sách bộ sưu tập hoặc lọc ra các prompt cần chia sẻ, rồi gửi tệp cho thành viên nhóm để nhập
2. **Bảo vệ quyền riêng tư**: Khi nhập prompt do người khác chia sẻ (ID không thuộc tài khoản hiện tại), nó sẽ tự động được đặt làm **riêng tư**, dữ liệu của các thành viên không can thiệp lẫn nhau

## Tài liệu Liên quan

- [Bộ sưu tập của tôi](./my-collection) - Quản lý bộ sưu tập và thẻ
- [Prompt Cộng đồng](./community) - Chia sẻ và bình chọn
- [Quản lý Tài khoản](./account) - Đăng nhập và cài đặt
