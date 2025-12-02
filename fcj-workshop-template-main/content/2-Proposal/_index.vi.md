---
title: "Bản đề xuất"
date: "2025-12-01"
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Document QA với AWS Bedrock

## Hệ thống Phân tích Tài liệu Thông minh sử dụng RAG

### 1. Tóm tắt điều hành

Hệ thống Document QA là một ứng dụng serverless được thiết kế để cách mạng hóa cách người dùng tương tác với tài liệu. Bằng cách tận dụng **AWS Bedrock** cho Generative AI và công nghệ **RAG (Retrieval Augmented Generation)**, nền tảng cho phép người dùng tải lên tài liệu PDF/TXT và đặt câu hỏi bằng ngôn ngữ tự nhiên. Hệ thống cung cấp các câu trả lời chính xác, nhận biết ngữ cảnh bằng cách truy xuất thông tin liên quan từ tài liệu đã tải lên, giảm đáng kể thời gian tìm kiếm thủ công và cải thiện khả năng tiếp cận thông tin.

### 2. Tuyên bố vấn đề

### Vấn đề là gì?

Các phương pháp tìm kiếm tài liệu truyền thống (khớp từ khóa) thường không nắm bắt được ngữ cảnh hoặc ý nghĩa ngữ nghĩa. Việc xem xét tài liệu thủ công tốn nhiều thời gian, dễ xảy ra lỗi và không hiệu quả, đặc biệt là đối với khối lượng văn bản lớn. Người dùng gặp khó khăn trong việc trích xuất thông tin chi tiết cụ thể một cách nhanh chóng, dẫn đến tắc nghẽn năng suất.

### Giải pháp

Chúng tôi đề xuất một **Chatbot dựa trên RAG Serverless** sử dụng **AWS Bedrock (Amazon Titan)**. Giải pháp bao gồm:

- **Tải lên & Xử lý**: Người dùng tải tài liệu lên S3; Lambda kích hoạt trích xuất văn bản và tạo embeddings.
- **Tìm kiếm Vector**: Embeddings được lưu trữ và truy vấn để tìm các đoạn tài liệu liên quan.
- **Generative AI**: AWS Bedrock tạo ra các phản hồi ngôn ngữ tự nhiên dựa trên ngữ cảnh được truy xuất.
- **Kiến trúc Serverless**: Được xây dựng trên AWS Lambda, API Gateway và DynamoDB để tự động mở rộng và tiết kiệm chi phí.

### Lợi ích và Hoàn vốn đầu tư (ROI)

- **Hiệu quả**: Giảm thời gian phân tích tài liệu từ hàng giờ xuống còn vài giây.
- **Chính xác**: RAG đảm bảo câu trả lời dựa trên tài liệu được cung cấp, giảm thiểu ảo giác (hallucinations).
- **Tiết kiệm chi phí**: Mô hình serverless trả tiền theo mức sử dụng (ước tính < $5/tháng cho mức sử dụng thấp).
- **Khả năng mở rộng**: Tự động xử lý tải thay đổi mà không cần quản lý cơ sở hạ tầng thủ công.

### 3. Kiến trúc giải pháp

Nền tảng sử dụng kiến trúc serverless hiện đại để đảm bảo khả năng mở rộng, bảo mật và hiệu suất.

![Architecture](/images/2-Proposal/architecture.png)

### Dịch vụ AWS sử dụng

- **AWS Bedrock**: Cung cấp các Mô hình Nền tảng (Amazon Titan) cho embeddings và tạo văn bản.
- **AWS Lambda**: Tính toán serverless để xử lý các yêu cầu API, xử lý tài liệu và điều phối.
- **Amazon API Gateway**: Quản lý các điểm cuối REST API cho frontend.
- **Amazon S3**: Lưu trữ tài liệu thô đã tải lên và tài sản tĩnh frontend.
- **Amazon DynamoDB**: Quản lý phiên người dùng và lịch sử trò chuyện.
- **Vector Store**: (Được triển khai qua Lambda/Local hoặc vector DB chuyên dụng) Lưu trữ embeddings tài liệu cho tìm kiếm ngữ nghĩa.

### Thiết kế thành phần

- **Frontend**: Được lưu trữ trên S3 (hoặc Amplify), cung cấp giao diện trò chuyện thân thiện với người dùng.
- **Lớp API**: API Gateway định tuyến các yêu cầu (`/upload`, `/ask`) đến các hàm Lambda.
- **Lớp Xử lý**: Lambda xử lý trích xuất văn bản, gọi Bedrock để lấy embeddings và thực hiện tìm kiếm tương đồng vector.
- **Lớp AI**: AWS Bedrock tạo phản hồi sử dụng ngữ cảnh được truy xuất và truy vấn của người dùng.

### 4. Triển khai kỹ thuật

**Các giai đoạn triển khai**

- **Giai đoạn 1: Nền tảng (Tuần 1-4)**: Thiết lập môi trường AWS, quyền truy cập Bedrock và logic backend cơ bản.
- **Giai đoạn 2: API & Bảo mật (Tuần 5-7)**: Phát triển API Gateway, Lambda functions và triển khai CORS/Bảo mật.
- **Giai đoạn 3: Phát triển Frontend (Tuần 8-11)**: Xây dựng giao diện React/Next.js và tích hợp với API.
- **Giai đoạn 4: Kiểm thử & Triển khai (Tuần 12-14)**: Kiểm thử toàn diện, tối ưu hóa và triển khai cuối cùng.

**Yêu cầu kỹ thuật**

- **Mô hình AI**: Amazon Titan (qua Bedrock) cho Embeddings và Tạo văn bản.
- **Backend**: Node.js/Python trên AWS Lambda.
- **Cơ sở hạ tầng dưới dạng mã (IaC)**: Serverless Framework hoặc AWS CDK.
- **Frontend**: React.js / Next.js.

### 5. Lộ trình & Mốc triển khai

- **Tháng 1**: Thiết kế kiến trúc, Thiết lập AWS, Backend Core (Upload/Embeddings).
- **Tháng 2**: Triển khai RAG, Logic tìm kiếm Vector, Phát triển API.
- **Tháng 3**: Tích hợp Frontend, Hoàn thiện UI/UX, Kiểm thử và Ra mắt.

### 6. Ước tính ngân sách

**Chi phí hàng tháng ước tính (Sử dụng Thấp-Trung bình)**

- **AWS Bedrock (Titan)**: ~$0 (Free Tier / Chi phí thấp cho mỗi 1k tokens)
- **AWS Lambda**: ~$0.20 cho 1M yêu cầu
- **Amazon S3**: ~$0.023 mỗi GB
- **Amazon DynamoDB**: ~$0.25 cho 1M yêu cầu
- **Amazon API Gateway**: ~$3.50 cho 1M yêu cầu

**Tổng ước tính**: < **$5.00 / tháng**

### 7. Đánh giá rủi ro

#### Ma trận rủi ro

- **Ảo giác (Lỗi AI)**: Ảnh hưởng Trung bình, Xác suất Trung bình.
- **Vượt ngân sách**: Ảnh hưởng Trung bình, Xác suất Thấp (Serverless).
- **Rò rỉ dữ liệu**: Ảnh hưởng Cao, Xác suất Thấp.

#### Chiến lược giảm thiểu

- **Ảo giác**: Triển khai RAG nghiêm ngặt (câu trả lời dựa trên ngữ cảnh).
- **Chi phí**: Thiết lập Cảnh báo Ngân sách AWS và hạn ngạch sử dụng.
- **Bảo mật**: Sử dụng Presigned URLs cho S3, vai trò IAM với quyền tối thiểu.

### 8. Kết quả kỳ vọng

#### Cải tiến kỹ thuật

- Quy trình phân tích tài liệu hoàn toàn tự động.
- Độ trễ truy xuất dưới một giây cho tìm kiếm vector.
- Kiến trúc có khả năng mở rộng hỗ trợ người dùng đồng thời.

#### Giá trị dài hạn

- Một khung RAG có thể tái sử dụng cho các ứng dụng cơ sở tri thức trong tương lai.
- Tăng năng suất đáng kể cho người dùng cần truy xuất thông tin nhanh chóng.