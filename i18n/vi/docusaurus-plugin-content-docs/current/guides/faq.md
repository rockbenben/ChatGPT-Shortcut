---
sidebar_label: Câu hỏi thường gặp
title: Câu hỏi thường gặp AI Short | Tối ưu Prompt & Xử lý AI Ảo giác
description: Prompt không hiệu quả? AI xuất thông tin sai? Hướng dẫn này giải đáp các câu hỏi thường gặp, hướng dẫn bạn tối ưu prompt, tránh AI ảo giác và sao lưu dữ liệu.
---

# Câu hỏi thường gặp

## AiShort có thu phí không?

Phiên bản web AiShort **hoàn toàn miễn phí**, duyệt, sao chép và tìm kiếm prompt đều không cần trả phí, thậm chí không cần đăng ký tài khoản. Các tính năng nâng cao sau khi đăng nhập (bộ sưu tập, prompt tùy chỉnh, chia sẻ cộng đồng) cũng miễn phí.

Lưu ý: AiShort chỉ cung cấp prompt, **việc gọi mô hình AI có tính phí hay không phụ thuộc vào dịch vụ AI mà bạn sử dụng** (ví dụ ChatGPT bản miễn phí/trả phí, tính phí API, v.v.).

## Hỗ trợ những mô hình AI nào?

Prompt của AiShort là phổ quát — có thể dùng trong **bất kỳ tình huống AI nào cần nhập prompt**: không chỉ trang hội thoại, mà còn công cụ lập trình như Cursor, gọi API, AI agent, v.v. Dưới đây là các mô hình hội thoại phổ biến:

- Quốc tế: ChatGPT, Gemini, Claude, Grok
- Tiếng Việt: PhoGPT (VinAI Research, mã nguồn mở, phù hợp triển khai nội bộ)
- Trung Quốc: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, Zhipu Qingyan, Xinghuo, Tencent Yuanbao
- Nền tảng API: OpenRouter, SiliconFlow, Groq

Xem danh sách mô hình đầy đủ tại [Bắt đầu → Các Mô hình AI Phổ biến](./getting-started#các-mô-hình-ai-phổ-biến).

## Tại sao nên sử dụng prompt tiếng Anh?

Các mô hình AI được huấn luyện chủ yếu trên dữ liệu tiếng Anh, nên hiểu chỉ thị tiếng Anh chính xác hơn và đầu ra ổn định hơn — cùng một prompt tiếng Việt chạy nhiều lần thường cho kết quả lệch nhau khá nhiều. Với các tác vụ quan trọng (báo cáo gửi sếp, tài liệu kỹ thuật, code review) nên ưu tiên prompt tiếng Anh.

Dân làm IT ở Việt Nam vốn đã quen đọc tài liệu, đặt tên biến và trao đổi kỹ thuật bằng tiếng Anh, nên cách kết hợp **prompt tiếng Anh + yêu cầu mô hình trả lời tiếng Việt** chạy rất mượt trong thực tế.

> 💡 Muốn nhận trả lời bằng tiếng Việt? Thêm `respond in Vietnamese` (hoặc `trả lời bằng tiếng Việt`) ở cuối prompt. Cần văn phong trang trọng hơn thì viết rõ `trả lời bằng tiếng Việt, dùng giọng văn trang trọng, xưng "chúng tôi"`.

## Tôi có cần nhập prompt mỗi lần không?

**Gọi API**: Đặt prompt làm `system prompt`, các cuộc hội thoại tiếp theo sẽ tự động áp dụng.

**Phiên bản Web**: Nếu chưa chuyển hội thoại, ChatGPT sẽ ghi nhớ prompt hiện tại. Khi trả lời bắt đầu lệch hướng, nghĩa là nó đã "quên", chỉ cần dán lại một lần.

**Mẹo nhỏ**: Lưu các hội thoại thường dùng làm bookmark trình duyệt, lần sau mở trực tiếp.

## Tại sao tôi không thể tìm thấy prompt liên quan?

Phạm vi tìm kiếm trên trang chủ là **thư viện prompt tuyển chọn** (sau khi đăng nhập còn bao gồm prompt cá nhân của bạn), **không bao gồm** prompt được chia sẻ trong cộng đồng.

Nếu dùng từ khóa ngắn mà không tìm thấy trên trang chủ, hãy vào trang [Prompt Cộng đồng](./community) để tìm lại — ở đó có nhiều nội dung do người dùng chia sẻ hơn.

## AI xuất thông tin sai thì sao?

AI đôi khi sẽ "ảo giác", xuất thông tin có vẻ hợp lý nhưng thực tế không chính xác. Cách xử lý:

1. **Xác minh thông tin quan trọng**: Đặc biệt là dữ liệu, trích dẫn, mã, v.v.
2. **Tối ưu nhiều lượt**: Để AI kiểm tra và tối ưu lại câu trả lời
3. **Xác minh chéo**: Dùng các prompt hoặc mô hình khác nhau để xác minh các kết luận quan trọng

Prompt phù hợp có thể giúp giảm sự xuất hiện của AI ảo giác.

## Làm sao để sao lưu prompt của tôi?

1. Vào "Tài khoản của tôi" → tìm mục "Quản lý dữ liệu → Xuất prompt"
2. Nhấp nút "Xuất dữ liệu"
3. Hệ thống tự động tạo tệp JSON để tải xuống

Nên sao lưu định kỳ để tránh mất dữ liệu.

## Kết quả prompt không lý tưởng?

1. **Yêu cầu AI tối ưu**: Để AI tự chấm điểm và cải thiện câu trả lời của chính nó
2. **Đổi góc nhìn đặt câu hỏi**: Dùng các prompt khác nhau để diễn đạt cùng một nhu cầu
3. **Thử cộng đồng**: Trong [Prompt Cộng đồng](./community) có thể có phiên bản phù hợp hơn — và cũng hoan nghênh bạn chia sẻ prompt tốt của mình ở đó
4. **Gửi phản hồi**: Gặp vấn đề hoặc có gợi ý cải thiện? Hoan nghênh [phản hồi](/feedback)

## Tài liệu Liên quan

- [Bắt đầu](./getting-started) - Phương pháp sử dụng cơ bản
- [Bộ sưu tập của tôi](./my-collection) - Quản lý bộ sưu tập và thẻ
- [Prompt Cộng đồng](./community) - Khám phá và chia sẻ
