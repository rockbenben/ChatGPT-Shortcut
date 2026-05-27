---
sidebar_label: Câu hỏi thường gặp
title: "AI Short Câu hỏi thường gặp | Sử dụng, Tối ưu, Thương mại & Bảo mật"
description: "AiShort có miễn phí? Prompt dùng được trên nhiều mô hình? Có thể dùng thương mại? Hướng dẫn này trả lời 13 câu hỏi về sử dụng, tối ưu, thương mại và bảo mật dữ liệu."
---

# Câu hỏi thường gặp

## AiShort có phải là trình tạo prompt AI?

Không phải. AiShort là thư viện prompt được **tuyển chọn + biên tập thủ công** theo từng tình huống, không phải công cụ tự động sinh prompt bằng LLM. Mỗi prompt đều được sàng lọc và phân loại theo nhãn, chỉ cần một cú nhấp là sao chép và dán vào bất kỳ công cụ AI nào như ChatGPT / Claude / Gemini / DeepSeek. Nếu bạn muốn loại công cụ "tự động tạo prompt từ nhu cầu", thì PromptPerfect, ChatGPT prompt generator là một loại sản phẩm khác.

## AiShort có miễn phí không? Có cần API Key?

Hoàn toàn miễn phí, **không cần API Key, không cần đăng ký**. Duyệt, tìm kiếm và sao chép prompt không cần bất kỳ tài khoản nào.

Sau khi đăng ký bạn có thể mở khóa thêm các tính năng mở rộng như bộ sưu tập với kéo thả sắp xếp, nhãn tùy chỉnh, tạo và quản lý prompt cá nhân, chia sẻ và bình chọn cộng đồng, xuất dữ liệu JSON, đồng bộ đa thiết bị — vẫn miễn phí. Toàn bộ mã nguồn được mở trên [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Lưu ý: AiShort chỉ cung cấp prompt, **việc gọi mô hình AI có tính phí hay không phụ thuộc vào dịch vụ AI mà bạn sử dụng** (ví dụ ChatGPT bản miễn phí/trả phí, tính phí API, v.v.).

## Có bao nhiêu prompt? Bao quát những kịch bản nào?

AiShort lưu trữ **tổng cộng 5000+ prompt**, chia thành hai thư viện:

- **Thư viện chọn lọc** —— tuyển chọn thủ công, phân loại theo 25+ thẻ kịch bản, dịch đầy đủ sang 18 ngôn ngữ. Thẻ: hỗ trợ viết, IT/lập trình, bài viết/báo cáo, SEO/tiếp thị, chức năng doanh nghiệp, học thuật/giáo viên, giáo dục/học sinh, ngôn ngữ/dịch thuật, tâm lý/xã hội, rèn luyện tư duy, công cụ năng suất, terminal/interpreter, tranh luận/diễn thuyết, đánh giá/nhận xét, khoa học thú vị, bách khoa cuộc sống, y tế sức khỏe, cố vấn tài chính, âm nhạc/nghệ thuật, triết học/tôn giáo, văn bản/từ ngữ, trò chơi thú vị, cố vấn chuyên nghiệp, v.v.
- **[Thư viện cộng đồng](./community)** —— chiếm phần lớn, được người dùng đóng góp liên tục, có thể sắp xếp theo mức độ phổ biến hoặc mới nhất, hỗ trợ tìm kiếm; bao quát kịch bản tinh tế và rộng hơn thư viện chọn lọc.

Nếu thư viện chọn lọc không có, hãy tìm trong cộng đồng.

## AiShort hỗ trợ các mô hình AI nào? Prompt có dùng được trên nhiều mô hình?

Prompt của AiShort là phổ quát, **dùng được trong bất kỳ tình huống AI nào cho phép nhập prompt** — không chỉ trang hội thoại, mà còn các công cụ lập trình như Cursor, gọi API, AI agent, v.v. Dưới đây là các mô hình hội thoại phổ biến:

- Quốc tế: ChatGPT, Gemini, Claude, Grok
- Trung Quốc: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, Zhipu Qingyan, Xinghuo, Tencent Yuanbao
- Nền tảng API: OpenRouter, SiliconFlow, Groq

Xem danh sách mô hình đầy đủ tại [Bắt đầu → Các Mô hình AI Phổ biến](./getting-started#các-mô-hình-ai-phổ-biến).

**Tính phổ quát đa mô hình**: Đại đa số prompt văn bản đều dùng được trên nhiều mô hình — viết lách, dịch thuật, lập trình, hỏi đáp là các tác vụ phổ quát, cùng một prompt chạy trên các mô hình ngôn ngữ lớn chủ đạo đều cho kết quả hiệu quả, và mặc định mỗi prompt của AiShort không bị ràng buộc vào mô hình cụ thể. Tuy nhiên **hiệu quả vẫn có khác biệt**: với mảng viết lách Claude thường tinh tế hơn về chi tiết, ChatGPT-5 bám sát chỉ thị hơn; mảng lập trình GPT-5, Gemini Pro, DeepSeek mỗi mô hình có thế mạnh riêng; với các bài đòi hỏi suy luận sâu thì Claude Opus / Gemini Deep Thinking / dòng o-series thường ổn định hơn. Prompt vẽ tranh (Midjourney / Stable Diffusion / DALL·E) thì không dùng chung được, cần điều chỉnh theo cú pháp riêng của từng công cụ.

## Tại sao prompt được viết bằng tiếng Anh?

Các mô hình AI hiểu tiếng Anh chính xác hơn và đầu ra ổn định hơn. Prompt tiếng Việt cũng dùng được, nhưng chạy cùng một prompt tiếng Việt nhiều lần thì kết quả thường lệch nhau khá nhiều. Với các tình huống quan trọng nên dùng tiếng Anh.

> 💡 Muốn nhận trả lời bằng tiếng Việt? Thêm `respond in Vietnamese` (hoặc `trả lời bằng tiếng Việt`) ở cuối prompt.

## Có phải nhập prompt mỗi lần?

**Gọi API**: Đặt prompt làm `system prompt`, các cuộc hội thoại tiếp theo sẽ tự động áp dụng.

**Phiên bản Web**: Nếu chưa chuyển hội thoại, ChatGPT sẽ ghi nhớ prompt hiện tại. Khi trả lời bắt đầu lệch hướng, nghĩa là nó đã "quên", chỉ cần dán lại một lần.

**Mẹo nhỏ**: Lưu các hội thoại thường dùng làm bookmark trình duyệt, lần sau mở trực tiếp.

## Làm sao chọn prompt phù hợp?

Tìm ngược từ đầu ra bạn muốn: cần viết bài thì dùng nhãn [`write`](/?tags=write) hoặc [`article`](/?tags=article); cần viết code thì dùng [`code`](/?tags=code) hoặc [`interpreter`](/?tags=interpreter); cần dịch thì dùng [`language`](/?tags=language); muốn nhập vai thì dùng [`games`](/?tags=games); chưa quen với nhãn thì cứ tìm trực tiếp bằng từ khóa. Mỗi thẻ prompt đều hiển thị độ phổ biến (số lần sao chép), prompt được sao chép nhiều thường có chất lượng ổn định hơn.

## Tại sao tôi không tìm thấy prompt liên quan?

Phạm vi tìm kiếm trên trang chủ là **thư viện prompt tuyển chọn** (sau khi đăng nhập còn bao gồm prompt cá nhân của bạn), **không bao gồm** prompt được chia sẻ trong cộng đồng.

Nếu dùng từ khóa ngắn mà không tìm thấy trên trang chủ, hãy vào trang [Prompt Cộng đồng](./community) để tìm lại — ở đó có nhiều nội dung do người dùng chia sẻ hơn.

## Phải làm gì nếu AI đưa ra thông tin sai?

AI đôi khi sẽ "ảo giác", xuất thông tin có vẻ hợp lý nhưng thực tế không chính xác. Cách xử lý:

1. **Xác minh thông tin quan trọng**: Đặc biệt là dữ liệu, trích dẫn, mã, v.v.
2. **Tối ưu nhiều lượt**: Để AI kiểm tra và tối ưu lại câu trả lời
3. **Xác minh chéo**: Dùng các prompt hoặc mô hình khác nhau để xác minh các kết luận quan trọng

Prompt phù hợp có thể giúp giảm sự xuất hiện của AI ảo giác.

## Prompt không hiệu quả — điều chỉnh thế nào?

Đừng vội thay prompt khác, trước hết điều chỉnh theo các hướng sau:

1. **Viết cụ thể hơn ở các `[ô giữ chỗ]` trong ngoặc vuông** — bổ sung phong cách, độ dài, lĩnh vực, chân dung độc giả, v.v.
2. **Hỏi tiếp để AI tự tối ưu**: Với câu trả lời chưa ưng, hỏi tiếp "hãy viết lại theo hướng X hơn" hoặc "viết lại theo phong cách Y", AI thường chỉ cần một, hai lượt là bám sát mục tiêu; cũng có thể yêu cầu AI tự chấm điểm và cải thiện câu trả lời của chính mình
3. **So sánh đổi mô hình**: Cùng một prompt chạy trên Claude Sonnet / ChatGPT / Gemini / DeepSeek đôi khi cho kết quả khác biệt rất lớn — viết lách Claude thường tinh tế hơn, lập trình GPT-5 / DeepSeek ổn định hơn
4. **Thử cộng đồng**: Trong [Prompt Cộng đồng](./community) có thể có phiên bản phù hợp hơn — và cũng hoan nghênh bạn chia sẻ prompt tốt của mình ở đó
5. **Gửi phản hồi**: Gặp vấn đề hoặc có gợi ý cải thiện? Hoan nghênh [phản hồi](/feedback)

## Sao lưu prompt của tôi như thế nào?

1. Vào "Tài khoản của tôi" → tìm mục "Quản lý dữ liệu → Xuất prompt"
2. Nhấp nút "Xuất dữ liệu"
3. Hệ thống tự động tạo tệp JSON để tải xuống

Nên sao lưu định kỳ để tránh mất dữ liệu.

## Tôi có thể dùng prompt AiShort cho dự án thương mại?

Có thể, nhưng tùy theo giấy phép từng nguồn:

1. Nội dung lấy từ [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) theo **CC0 phạm vi công cộng**, không có bất kỳ ràng buộc nào
2. Nội dung do AiShort tự xây dựng và do cộng đồng đóng góp mặc định áp dụng giấy phép mở **CC BY-SA 4.0** — cho phép thương mại, phân phối lại, chỉnh sửa, với yêu cầu giữ lại ghi nhận tác giả AiShort / tác giả gốc và cho phép các tác phẩm phái sinh tiếp tục mở
3. Bản quyền **nội dung AI tạo ra từ prompt của bạn** thuộc về ai sẽ theo điều khoản sử dụng của dịch vụ AI mà bạn dùng (OpenAI / Anthropic / Google, v.v.), đa phần thuộc về bạn
4. Một số rất ít mục có ghi chú rõ "chỉ dùng cá nhân" trong phần mô tả thẻ prompt thì không áp dụng quy định trên

## Sao chép prompt có làm lộ dữ liệu của tôi?

Không. Prompt của AiShort được đóng gói dưới dạng JSON tĩnh trong tài nguyên trang, **thao tác sao chép diễn ra ngay tại clipboard cục bộ trên trình duyệt của bạn**.

**Nội dung cụ thể bạn điền vào các ô giữ chỗ trong ngoặc vuông và câu trả lời AI gửi lại cho bạn** — tất cả đều được truyền trực tiếp giữa bạn và nền tảng AI mà bạn chọn (ChatGPT / Claude / Gemini / DeepSeek, v.v.), AiShort không nhìn thấy.

Cần làm rõ: khi sao chép, hệ thống sẽ gửi **sự kiện đếm ẩn danh** về backend (POST `/cards/<id>/copy`), chỉ dùng để thống kê độ phổ biến của từng prompt (chính là "số lần sao chép" hiển thị trên thẻ). **Chỉ truyền ID của thẻ, không bao gồm** nội dung bạn điền, không bao gồm thông tin cá nhân, không liên kết tới danh tính người dùng.

**Sau khi đăng nhập tài khoản**, danh sách bộ sưu tập, prompt tùy chỉnh, và bài đóng góp cho cộng đồng mới được đồng bộ về backend để hỗ trợ đồng bộ đa thiết bị, và luôn hỗ trợ xuất JSON cũng như xóa toàn bộ dữ liệu chỉ với một cú nhấp bất kỳ lúc nào.

## Tài liệu Liên quan

- [Bắt đầu](./getting-started) - Phương pháp sử dụng cơ bản
- [Bộ sưu tập của tôi](./my-collection) - Quản lý bộ sưu tập và thẻ
- [Prompt Cộng đồng](./community) - Khám phá và chia sẻ
