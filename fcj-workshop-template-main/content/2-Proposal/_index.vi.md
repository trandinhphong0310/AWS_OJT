---
title: "Đề xuất"
date: "2025-10-10"
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Hành Trình Cloud AI Đầu Tiên với AWS – Kế Hoạch Dự Án

**Dự án:** EduQuery - Tối ưu hóa hệ thống Chatbot RAG trên AWS với LangChain  
**Tổ chức:** [FPT]  
**Ngày:** 2025-10-10

---

## 1. Bối cảnh và Động lực

### 1.1 Tóm tắt điều hành

**Bối cảnh khách hàng:**  
Dự án này giải quyết một thách thức lớn trong giáo dục đại học, nơi sinh viên, nhà nghiên cứu và chuyên gia tốn nhiều thời gian để tìm kiếm thông tin trong kho tài liệu học thuật khổng lồ. Phương pháp tìm kiếm thủ công dựa trên từ khóa hiện tại không chính xác và kém hiệu quả, sinh viên trung bình mất 5-10 giờ mỗi tuần cho việc tìm tài liệu.

**Mục tiêu kinh doanh và kỹ thuật:**  
Dự án Chatbot EduQuery hướng tới xây dựng một nền tảng Hỏi-Đáp (QA) thông minh trên Amazon Web Services (AWS) nhằm:
- Giảm thời gian tìm kiếm thông tin từ 40-60%
- Nâng cao chất lượng nghiên cứu nhờ câu trả lời chính xác, theo ngữ cảnh
- Mang lại lợi thế cạnh tranh về học tập ứng dụng AI cho các trường
- Thể hiện năng lực AWS trong ứng dụng AI sinh ngữ

**Tình huống sử dụng:**
1. Sinh viên tải lên giáo trình, bài báo để hỏi đáp cụ thể
2. Nhà nghiên cứu truy vấn kho tài liệu lớn cho tổng quan tài liệu
3. Giảng viên tìm nhanh tài liệu giảng dạy phù hợp
4. Thư viện cung cấp dịch vụ tìm kiếm tài liệu bằng AI

**Dịch vụ chuyên môn đối tác:**  
Nhóm dự án sẽ xây dựng ứng dụng web serverless hoàn chỉnh tích hợp chatbot, sử dụng các dịch vụ AWS như Amazon S3, AWS Lambda, Amazon Bedrock, API Gateway, DynamoDB để đảm bảo giải pháp an toàn, mở rộng và tối ưu chi phí dựa trên kiến trúc RAG (Retrieval-Augmented Generation).

### 1.2 Tiêu chí thành công dự án

- **Hiệu quả thời gian:** Giảm thời gian tìm kiếm trung bình từ 8 phút xuống dưới 1 phút mỗi truy vấn
- **Số lượng người dùng:** Đạt 500 người dùng hoạt động/tháng trong 3 tháng đầu
- **Hiệu năng hệ thống:** Đáp ứng API (p95) dưới 3 giây mỗi truy vấn
- **Độ chính xác:** Đạt 90% truy xuất đúng (top 3 đoạn chứa đáp án)
- **Độ tin cậy:** Tỷ lệ lỗi hệ thống dưới 0.1%
- **Hài lòng người dùng:** NPS đạt +40 trở lên
- **Tỷ lệ quay lại:** 60% người dùng quay lại hàng tuần
- **Tối ưu chi phí:** Chi phí vận hành dưới $720/tháng cho 1.000 người dùng
- **Tác động chất lượng:** Cải thiện chất lượng bài luận, báo cáo, nghiên cứu

### 1.3 Giả định

**Tiền đề và phụ thuộc:**
- Tài khoản AWS với quota phù hợp
- Truy cập Amazon Bedrock (Claude 3 Sonnet, Titan Embedding)
- Kho mã nguồn trên GitHub
- Thành viên có kinh nghiệm AWS, React
- Người dùng sử dụng trình duyệt hiện đại
- Tài liệu ở định dạng hỗ trợ (PDF, DOCX, TXT)

**Ràng buộc kỹ thuật:**
- Bedrock khả dụng tại vùng AWS chọn
- Lambda tối đa 15 phút/thực thi
- API Gateway giới hạn payload 10MB
- Chi phí S3 tăng theo dung lượng
- Giới hạn token và giá mô hình nền tảng

**Ràng buộc kinh doanh:**
- Thời gian phát triển 14 tuần
- Ngân sách $35.000 phát triển, $720/tháng vận hành
- Mục tiêu 1.000 người dùng đầu tiên
- Yêu cầu phê duyệt và tuân thủ của trường

**Rủi ro:**
- **AI Hallucination (Ưu tiên cao):** Mô hình AI trả lời sai lệch nội dung tài liệu
- **Bảo mật dữ liệu (Ưu tiên cao):** Nguy cơ rò rỉ thông tin nhạy cảm
- **Chấp nhận người dùng (Ưu tiên cao):** Người dùng ngại dùng công cụ AI mới
- **Vượt chi phí (Trung bình):** Chi phí AWS, đặc biệt Bedrock, vượt dự toán
- **Hiệu năng (Trung bình):** Truy vấn vector có thể chậm
- **Trễ tiến độ (Trung bình):** Kỹ thuật phức tạp gây chậm tiến độ

---

## 2. Kiến trúc giải pháp / Sơ đồ kiến trúc

### 2.1 Sơ đồ kiến trúc kỹ thuật

Giải pháp EduQuery sử dụng kiến trúc **microservices serverless** trên AWS, tuân thủ nguyên tắc AWS Well-Architected Framework, đảm bảo mở rộng, tin cậy, bảo mật nhiều lớp và tối ưu chi phí.

**Tổng quan kiến trúc:**

Hệ thống gồm 6 lớp chính:

1. **Lớp Edge** - Phân phối nội dung toàn cầu, bảo mật
2. **Lớp API** - Định tuyến yêu cầu, xác thực
3. **Lớp Tính toán** - Xử lý logic nghiệp vụ serverless
4. **Lưu trữ & Dữ liệu** - Lưu trữ tài liệu, metadata
5. **AI/ML** - Sinh embedding, tổng hợp câu trả lời
6. **Bảo mật & Giám sát** - Kiểm soát truy cập, quan sát hệ thống

**Nguyên tắc kiến trúc:**
- **Ưu tiên serverless:** Không quản lý máy chủ, tự động mở rộng
- **Sự kiện hóa:** S3 trigger xử lý tài liệu
- **Microservices:** Lambda độc lập cho từng chức năng
- **Bảo mật thiết kế:** Mã hóa dữ liệu, IAM tối thiểu quyền
- **Tối ưu chi phí:** Trả theo sử dụng, không tốn tài nguyên nhàn rỗi

**Sơ đồ kiến trúc:**

![Architecture Diagram](Images/architecture_diagram.png)

**Mô tả chi tiết thành phần:**

#### 1️⃣ Lớp Edge
- **Amazon Route 53:** Quản lý DNS cho tên miền riêng
- **Amazon CloudFront:** CDN toàn cầu cho nội dung tĩnh
- **AWS WAF:** Bảo vệ chống DDoS, SQLi, XSS, tấn công web

#### 2️⃣ Lớp API
- **Amazon API Gateway:** REST API (/upload, /ask, /history)
- **Amazon Cognito Authorizer:** Xác thực/ủy quyền JWT
- **Kiểm tra yêu cầu:** Xác thực đầu vào, giới hạn tốc độ

#### 3️⃣ Lớp Tính toán
- **Presign Handler (Lambda):** Sinh URL S3 upload an toàn
- **Ingestion Handler (Lambda):** Xử lý tài liệu, chia đoạn, sinh embedding qua Bedrock
- **Chat Handler (Lambda):** Lấy đoạn liên quan, tạo prompt, gọi Foundation Model, trả lời
- **Runtime:** Python 3.11

#### 4️⃣ Lưu trữ & Dữ liệu
- **Amazon S3:**
  - Lưu trữ tài liệu (mã hóa)
  - Host frontend React
  - S3 Event trigger workflow ingestion
- **Amazon DynamoDB:**
  - Metadata người dùng, lịch sử hội thoại, quản lý phiên
- **Amazon Bedrock Knowledge Bases:**
  - Lưu vector embedding (OpenSearch Serverless)
  - Tối ưu tìm kiếm k-NN

#### 5️⃣ AI/ML (Amazon Bedrock)
- **Titan Embedding Model:** Sinh vector embedding từ đoạn văn bản
- **Claude 3 Sonnet Foundation Model:** Sinh câu trả lời theo ngữ cảnh
- **RAG Pipeline:** Kết hợp truy xuất & sinh đáp án chính xác

#### 6️⃣ Bảo mật & Giám sát
- **AWS IAM:** Kiểm soát truy cập theo vai trò
- **AWS Secrets Manager:** Lưu trữ khóa API, thông tin nhạy cảm
- **Amazon CloudWatch:** Log, metric, cảnh báo, dashboard
- **AWS CloudTrail:** Audit hoạt động API, tuân thủ

**Luồng dữ liệu:**

**Upload tài liệu (Bất đồng bộ):**
1. Người dùng yêu cầu upload → API Gateway → Presign Lambda
2. Presign Lambda sinh URL S3 an toàn
3. Client upload tài liệu lên S3
4. S3:ObjectCreated trigger Ingestion Lambda
5. Ingestion Lambda đọc, chia đoạn, gửi lên Bedrock Knowledge Base
6. Embedding lưu vào OpenSearch Serverless

**Hỏi đáp (Đồng bộ):**
1. Người dùng gửi câu hỏi → API Gateway (JWT Cognito) → Chat Lambda
2. Chat Lambda truy vấn Knowledge Base lấy đoạn liên quan
3. Chat Lambda tạo prompt với câu hỏi + ngữ cảnh
4. Bedrock Foundation Model sinh đáp án
5. Lưu đáp án, metadata vào DynamoDB
6. Trả kết quả về client qua API Gateway

**Công nghệ sử dụng:**
- **Hạ tầng code:** AWS CDK v2 (TypeScript/Python)
- **Frontend:** React 18, host trên S3 + CloudFront
- **Backend:** AWS Lambda (Python 3.11)
- **AI/ML:** Amazon Bedrock (Claude 3 Sonnet, Titan Embeddings)
- **Lưu trữ:** S3, DynamoDB, OpenSearch Serverless
- **Bảo mật:** Cognito, IAM, WAF, Secrets Manager
- **Giám sát:** CloudWatch, CloudTrail
- **CI/CD:** CodePipeline, CodeBuild, CodeDeploy, GitHub

### 2.2 Kế hoạch kỹ thuật

Nhóm EduQuery phát triển giải pháp theo nguyên tắc IaC với AWS CDK v2, đảm bảo:
- **Triển khai lặp lại** trên Dev, Staging, Production
- **Hạ tầng version control** cùng mã nguồn
- **Tự động rollback** khi gặp lỗi triển khai

**Cách tiếp cận phát triển:**

1. **IaC với AWS CDK:**
   - Định nghĩa toàn bộ tài nguyên AWS bằng code
   - Stack riêng cho mạng, tính toán, lưu trữ, bảo mật
   - Sử dụng construct chuẩn

2. **Phát triển Lambda:**
   - Presign handler cho upload S3 an toàn
   - Ingestion handler xử lý tài liệu, chia đoạn
   - Chat handler tích hợp RAG pipeline
   - Xử lý lỗi, log đầy đủ

3. **Phát triển Frontend:**
   - Xây dựng SPA React UI/UX hiện đại
   - Tích hợp xác thực Cognito
   - Kết nối API Gateway
   - Deploy lên S3 + CloudFront

4. **Chiến lược kiểm thử:**
   - Unit test Lambda (pytest)
   - Integration test API
   - E2E test luồng người dùng
   - Test hiệu năng, bảo mật

5. **Quản lý cấu hình:**
   - Cấu hình theo môi trường qua Parameter Store
   - Secrets lưu ở Secrets Manager
   - Feature flag rollout dần

**Quy trình phê duyệt:**
- Kiến trúc sư cloud duyệt thay đổi hạ tầng
- Nhóm bảo mật duyệt IAM, mã hóa
- Stakeholder duyệt thay đổi ảnh hưởng ngân sách
- Tất cả thay đổi qua CI/CD, kiểm thử tự động trước khi lên production

### 2.3 Kế hoạch dự án

Nhóm áp dụng **Agile Scrum** với **7 sprint 2 tuần** (tổng 14 tuần).

**Phân công nhóm:**

| Vai trò | Nhiệm vụ | Thành viên |
|---------|----------|------------|
| **Trưởng nhóm/Quản lý dự án** | Quản lý, điều phối, tích hợp RAG/Bedrock, QA | Dương Nguyễn Gia Huy |
| **Backend/DevOps** | Lambda, CI/CD, IaC CDK, monitoring | Đào Quang Vinh |
| **Cloud Architect** | Thiết kế AWS, API Gateway, S3, IAM, bảo mật | Nguyễn Lê Anh Quân |
| **Backend/Database** | DynamoDB, lưu trữ, tối ưu truy vấn | Nguyễn Thanh Liêm |
| **Frontend** | React UI/UX, Cognito, API client | Trần Đình Phong |

**Lịch giao tiếp:**
- **Daily Standup:** 15 phút mỗi sáng (Slack nếu remote)
- **Sprint Planning:** 2 tuần/lần (thứ 2) - 2h
- **Sprint Review:** Cuối sprint (thứ 6) - 1h
- **Retrospective:** Sau review - 1h
- **Backlog Refinement:** Giữa sprint (thứ 4) - 1h
- **Báo cáo tiến độ:** Tuần/lần cho giảng viên

**Chuyển giao kiến thức:**
- **Tài liệu:** GitHub wiki, Confluence
- **Code review:** Bắt buộc mọi pull request
- **Pair programming:** Tính năng phức tạp (Bedrock, RAG)
- **Buổi kỹ thuật:** 1h/tuần về AWS, best practice
- **Handover:** Runbook, ADR đầy đủ

### 2.4 Bảo mật

Bảo mật theo 5 nhóm của AWS Well-Architected Security Pillar:

#### 1️⃣ Kiểm soát truy cập
- **Cognito:** Xác thực người dùng JWT
- **IAM:** Phân quyền tối thiểu
- **MFA:** Bắt buộc với admin
- **API Gateway Authorizer:** Kiểm tra JWT mọi API
- **Quản lý phiên:** Token tự hết hạn, refresh

#### 2️⃣ Bảo mật hạ tầng
- **VPC:** Lambda trong subnet riêng (nếu cần)
- **Security Group:** Rule chặt chẽ
- **WAF:** Chống OWASP Top 10
- **DDoS:** CloudFront, AWS Shield
- **Cô lập môi trường:** Dev/Staging/Prod riêng

#### 3️⃣ Bảo vệ dữ liệu
- **Mã hóa khi lưu:** 
  - S3: AES-256
  - DynamoDB: AWS-managed
  - Bedrock: Mặc định mã hóa
- **Mã hóa khi truyền:** 
  - HTTPS/TLS 1.2+
  - S3 URL có hạn
- **Phân loại dữ liệu:** Tag, log truy cập
- **Cô lập đa tenant:** Dữ liệu tách biệt

#### 4️⃣ Phát hiện & giám sát
- **CloudTrail:** Log API 90 ngày
- **CloudWatch:** 
  - Log real-time, metric filter
  - Cảnh báo hoạt động bất thường
- **AWS Config:** Theo dõi tuân thủ
- **GuardDuty (tùy chọn):** Phát hiện mối đe dọa

#### 5️⃣ Ứng phó sự cố
- **Kế hoạch ứng phó:** Quy trình xử lý sự cố
- **Cảnh báo tự động:** CloudWatch gửi SNS/Slack
- **Backup & phục hồi:** 
  - S3 versioning
  - DynamoDB point-in-time recovery
  - Test backup định kỳ
- **Audit trail:** Log CloudTrail phục vụ điều tra

**Tuân thủ:**  
Khách hàng cung cấp yêu cầu kiểm soát (GDPR, FERPA...), nhóm đảm bảo đáp ứng và tài liệu hóa.

---

## 3. Hoạt động & Sản phẩm bàn giao

### 3.1 Hoạt động & Mốc bàn giao

| Giai đoạn | Thời gian | Hoạt động | Mốc/Sản phẩm | Tổng công |
|-----------|-----------|-----------|--------------|-----------|
| **Giai đoạn 1: Nền tảng & Backend** | Tuần 1-4 | • Thiết lập AWS (VPC, IAM)<br>• IaC với CDK<br>• Lambda ingestion (xử lý file, Bedrock)<br>• Lambda query (RAG, trả lời)<br>• Unit test Lambda | **Mốc 1: Backend MVP**<br>• Upload S3<br>• Xử lý tự động<br>• API trả lời nội bộ<br>• Unit test pass | 80 công |
| **Giai đoạn 2: API & Bảo mật** | Tuần 5-7 | • API Gateway (/upload, /ask, /history)<br>• Cognito (đăng ký, đăng nhập, JWT)<br>• Bảo vệ endpoint bằng Cognito<br>• Tài liệu API (OpenAPI/Swagger)<br>• Test tích hợp Postman | **Mốc 2: API bảo mật**<br>• Endpoint bảo vệ xác thực<br>• Đăng ký/đăng nhập<br>• API xác thực thành công<br>• Công bố tài liệu API | 60 công |
| **Giai đoạn 3: Frontend** | Tuần 8-11 | • Thiết kế UI/UX<br>• React app (login, upload, chat)<br>• Tích hợp API backend<br>• Xử lý lỗi, trạng thái loading<br>• Responsive mobile/tablet<br>• Unit test frontend | **Mốc 3: Alpha**<br>• Giao diện hoàn chỉnh<br>• Luồng người dùng end-to-end<br>• Đăng nhập, upload, hỏi đáp<br>• Responsive | 80 công |
| **Giai đoạn 4: Test, Triển khai & Ra mắt** | Tuần 12-14 | • Test toàn diện (unit, tích hợp, E2E, hiệu năng)<br>• CI/CD pipeline (CodePipeline, CodeBuild, CodeDeploy)<br>• Beta test người dùng<br>• Thu thập phản hồi<br>• Tối ưu hiệu năng<br>• Audit bảo mật<br>• Triển khai production<br>• Đào tạo, tài liệu | **Mốc 4: Sẵn sàng ra mắt**<br>• Test pass (>90% coverage)<br>• CI/CD hoạt động<br>• Beta test, phản hồi<br>• Triển khai production<br>• Tài liệu hoàn chỉnh<br>• Sẵn sàng cho người dùng | 60 công |
| **Tổng** | **14 tuần** | | | **280 công** |

**Quản lý thay đổi:**
- Mọi thay đổi phạm vi đều thảo luận, đánh giá tác động
- Yêu cầu thay đổi được ghi nhận, đánh giá ảnh hưởng
- Agile cho phép linh hoạt trong sprint

**Kế hoạch giao tiếp:**
- **Báo cáo tuần:** Gửi giảng viên thứ 6
- **Sprint Review:** Demo, cập nhật tiến độ 2 tuần/lần
- **Risk Register:** Cập nhật, review hàng tuần
- **Slack:** Giao tiếp nhóm real-time
- **GitHub Projects:** Theo dõi task, tiến độ

**Kế hoạch chuyển giao:**
- **Buổi chuyển giao:** Tuần 13-14
- **Tài liệu bàn giao:** Sơ đồ kiến trúc, runbook, API, hướng dẫn
- **Hỗ trợ:** 4 tuần sau ra mắt
- **Đào tạo:** 2 ngày cho đội vận hành

### 3.2 Ngoài phạm vi

Các mục sau không nằm trong phạm vi dự án:

- **App di động native:** iOS/Android (chỉ web responsive)
- **Đa ngôn ngữ:** UI & NLP chỉ tiếng Anh ban đầu
- **Dashboard phân tích nâng cao:** Analytics hành vi người dùng
- **Tích hợp LMS:** Moodle, Canvas...
- **Hỗ trợ tài liệu đa phương tiện:** Ảnh, sơ đồ, chữ viết tay
- **Cộng tác thời gian thực:** Nhiều người chỉnh sửa cùng lúc
- **Chế độ offline:** Yêu cầu kết nối internet
- **Huấn luyện mô hình nền tảng:** Chỉ dùng pre-trained Bedrock
- **Di chuyển dữ liệu:** Import kho tài liệu cũ
- **Tích hợp bên thứ 3:** Google Drive, Dropbox...
- **Quản lý người dùng nâng cao:** Vai trò, tổ chức, phê duyệt
- **Chứng chỉ tuân thủ:** SOC 2, ISO 27001 (chỉ best practice, không chứng nhận)

### 3.3 Lộ trình production

Bản bàn giao đầu là **Proof of Concept (PoC)** cho các tình huống ở 1.1. Chưa đủ tính năng production.

**Khoảng trống cần bổ sung:**
1. **Tối ưu mở rộng:** PoC test 1.000 user, production có thể 10.000+
2. **Xử lý lỗi nâng cao:** PoC cơ bản, production cần retry, degrade, thông báo thân thiện
3. **Giám sát:** PoC log cơ bản, production cần dashboard, tracing, metric
4. **Bảo mật:** PoC cơ bản, production cần pentest, audit, compliance
5. **Vận hành:** Backup, runbook, on-call, tối ưu chi phí
6. **Tính năng đầy đủ:** Đa ngôn ngữ, filter nâng cao, feedback, dashboard admin

**Checklist production:**
- [ ] Load test 10x traffic
- [ ] Audit bảo mật, pentest
- [ ] Test kế hoạch phục hồi
- [ ] Dashboard, cảnh báo
- [ ] Runbook vận hành
- [ ] Tài liệu, đào tạo user
- [ ] Đáp ứng compliance
- [ ] Tối ưu chi phí
- [ ] Đào tạo đội hỗ trợ
- [ ] Test rollback

**Thời gian dự kiến:**
- Hoàn thành PoC: Tuần 14
- Production hardening: +4-6 tuần
- Ra mắt production: Tuần 20-22

---

## 4. Dự toán chi phí AWS theo dịch vụ

### 4.1 Tổng quan chi phí – 2 kịch bản triển khai

Dự án ước tính chi phí cho 2 kịch bản:
1. **Free Tier/Sinh viên:** Phát triển, test (dành cho sinh viên)
2. **Production:** Triển khai thực tế cho tổ chức

---

### 4.2 Kịch bản 1: Free Tier/Sinh viên (Phát triển & Test)

**Đối tượng:** Sinh viên, nhóm nhỏ, PoC  
**Giả định sử dụng:**
- 10-20 user/tháng
- 500 upload tài liệu/tháng
- 5.000 truy vấn/tháng
- 10GB lưu trữ
- Workload phát triển/test

| Dịch vụ AWS | Chi tiết sử dụng | Ước tính (USD/tháng) | Ghi chú |
|-------------|------------------|----------------------|---------|
| **Lambda** | 5.500 lần/tháng, ~27.500 GB-s, trong free tier | **$0** | ✅ Free Tier |
| **API Gateway** | 5.500 request/tháng, free tier | **$0** | ✅ Free Tier |
| **S3** | 10GB, 500 PUT, 5.000 GET, free tier 5GB | **~$0.12** | Vượt nhẹ lưu trữ |
| **Bedrock** | 500 doc × 20 token = 10K token, Titan Embedding: $0.001<br>5K query × 15 token in = 75K, 5K × 500 out = 2.5M, Titan Text | **~$4.12** | Dùng Titan tiết kiệm |
| **DynamoDB** | 100MB, 5K read, 500 write, free tier | **$0** | ✅ Free Tier |
| **Cognito** | 20 user/tháng, free tier | **$0** | ✅ Free Tier |
| **CloudFront** | 10GB, 5K HTTPS, free tier | **$0** | ✅ Free Tier |
| **CloudWatch** | 2GB log, 5 metric, 5 alarm, free tier | **$0** | ✅ Free Tier |
| **Secrets Manager** | 2 secrets, sau 30 ngày $0.80 | **$0.80** | Sau trial |
| **Data Transfer** | 5GB outbound, free tier | **$0** | ✅ Free Tier |
| **CodePipeline** | 1 pipeline, free tier | **$0** | ✅ Free Tier |
| **Tổng/tháng (Sinh viên)** | | **≈ $5.04** | 🎓 Rất rẻ |

**💡 Mẹo tiết kiệm cho sinh viên:**
- Dùng **AWS Educate** hoặc **Academy** (thường $100-200/năm)
- Tận dụng free tier 12 tháng
- Dùng Titan thay Claude (rẻ hơn 10 lần)
- Cache mạnh để giảm gọi Bedrock
- Xóa tài nguyên không dùng
- Đặt cảnh báo ngân sách $10/tháng

---

### 4.3 Kịch bản 2: Production (Tổ chức)

**Đối tượng:** Trường, thư viện, viện nghiên cứu  
**Giả định sử dụng:**
- 1.000 user/tháng
- 200.000 upload tài liệu/tháng
- 2.000.000 truy vấn/tháng
- 200GB lưu trữ
- Workload production

| Dịch vụ AWS | Chi tiết sử dụng | Ước tính (USD/tháng) | Ghi chú |
|-------------|------------------|----------------------|---------|
| **Lambda** | 200K upload × 30s × 1GB, 2M query × 5s × 1GB, ~1.67M GB-s | **$120** | Graviton2 |
| **API Gateway** | 2.2M request/tháng | **$8** | Chuẩn |
| **S3** | 200GB doc, 10GB frontend, 200K PUT, 2M GET | **$5** | Có lifecycle |
| **Bedrock** | 200K doc × 20 token = 4M, Titan Embedding: $0.40<br>2M query × 15 in = 30M, 2M × 500 out = 1B, Claude 3 Sonnet | **$440** | Claude cao cấp, cache giảm 35% |
| **DynamoDB** | 1GB, 2M read, 200K write, on-demand | **$15** | On-demand |
| **Cognito** | 1.000 user/tháng | **$0** | Free Tier |
| **CloudFront** | 100GB, 2M HTTPS | **$10** | Edge |
| **CloudWatch** | 10GB log, 10 metric, 10 alarm | **$15** | Lọc log |
| **Secrets Manager** | 5 secrets | **$2** | API key |
| **Data Transfer** | 50GB outbound | **$5** | Vượt free tier |
| **OpenSearch Serverless** | Đã gồm trong Bedrock | **$0** | AWS quản lý |
| **CodePipeline** | 1 pipeline | **$1** | Pipeline thứ 2 |
| **Tổng/tháng (Production)** | | **≈ $621** | 🏢 1.000 user |

**Link AWS Pricing Calculator:**  
[https://calculator.aws/#/estimate?id=eduquery-chatbot-production-2023](https://calculator.aws/#/estimate?id=eduquery-chatbot-production-2023)

---

### 4.4 So sánh chi phí

| Chỉ số | Sinh viên | Production | Khác biệt |
|--------|-----------|------------|-----------|
| **User/tháng** | 10-20 | 1.000 | 50-100x |
| **Query/tháng** | 5.000 | 2.000.000 | 400x |
| **Upload tài liệu** | 500 | 200.000 | 400x |
| **AI Model** | Titan Text | Claude 3 Sonnet | Chất lượng/giá |
| **Chi phí/tháng** | ~$5 | ~$621 | 124x |
| **Chi phí/user** | $0.25-0.50 | $0.62 | Quy mô lớn rẻ hơn |
| **Phù hợp** | PoC, Test, Học | Production, Doanh nghiệp | - |

---

### 4.5 Chiến lược tối ưu chi phí

#### Sinh viên:
1. **AWS Credits:** Đăng ký AWS Educate ($100-200)
2. **Tận dụng free tier:** 12 tháng
3. **Dùng Titan:** Thay Claude
4. **Cache mạnh:** 80%+ query
5. **Dọn tài nguyên:** Xóa file, log không dùng
6. **Cảnh báo ngân sách:** $5, $10, $15

#### Production:
1. **Reserved Capacity:** Savings Plan cho Lambda
2. **Right-sizing:** Theo dõi memory Lambda
3. **CloudFront cache:** Cache asset, API phổ biến
4. **S3 Lifecycle:** Chuyển file cũ sang Glacier sau 90 ngày
5. **Tối ưu query:** Cache query Bedrock (giảm 35%)
6. **Giám sát:** AWS Budgets cảnh báo 80%, 100%

---

### 4.6 Mở rộng (Production)

**5.000 user (5x):**
- Lambda: ~$600/tháng
- Bedrock: ~$2.200/tháng
- Dịch vụ khác: ~$100/tháng
- **Tổng: ~$2.900/tháng**

**10.000 user (10x):**
- Lambda: ~$1.200/tháng
- Bedrock: ~$4.400/tháng
- Dịch vụ khác: ~$200/tháng
- **Tổng: ~$5.800/tháng**

---

### 4.7 Lộ trình triển khai

**Giai đoạn 1 (1-14 tuần): Sinh viên**
- Free tier, AWS Educate
- Chi phí: **~$5/tháng** hoặc **$0** nếu có credits
- Mục đích: Phát triển, test, PoC
- User: 10-20

**Giai đoạn 2 (Tháng 4-6): Pilot**
- 100 user
- Chi phí: **~$80/tháng**
- Mục đích: Beta test thực tế
- User: 100

**Giai đoạn 3 (Tháng 7+): Production**
- 1.000+ user
- Chi phí: **~$621/tháng**
- Mục đích: Toàn trường
- User: 1.000+

---

## 5. Cơ cấu & Phân công nhóm

### 5.1 Tổng quan nhóm

| Tên | MSSV | Vai trò chính | Vai trò phụ | Liên hệ |
|-----|------|---------------|-------------|---------|
| **Dương Nguyễn Gia Huy** | SE182202 | Trưởng nhóm/PM | QA, RAG/Bedrock Dev | huy.dng@example.com |
| **Đào Quang Vinh** | SE180012 | Backend Dev | DevOps | vinh.dq@example.com |
| **Nguyễn Lê Anh Quân** | SE192307 | Cloud Architect | Backend (API, S3) | quan.nla@example.com |
| **Nguyễn Thanh Liêm** | SE184163 | Backend Dev | Database (DynamoDB) | liem.nt@example.com |
| **Trần Đình Phong** | SE184217 | Frontend Dev | UI/UX | phong.td@example.com |

---

### 5.2 Phân công chi tiết

#### 👨‍💼 Dương Nguyễn Gia Huy - Trưởng nhóm/PM
**Chính:**
- Quản lý dự án, tiến độ
- Điều phối, phân công
- Báo cáo tiến độ
- Quản lý rủi ro
- Giám sát chất lượng

**Kỹ thuật:**
- Tích hợp Bedrock
- Triển khai RAG pipeline
- Chunking, embedding
- Vector search
- Thiết kế test case
- Test tự động (Jest/Pytest)
- Test API (Postman)
- Test hiệu năng, bảo mật

**Sản phẩm:**
- Báo cáo tuần
- Tích hợp embedding
- Pipeline RAG
- Logic truy vấn
- Tài liệu test
- Bộ test tự động
- Báo cáo coverage (>80%)

---

#### 💻 Đào Quang Vinh - Backend/DevOps
**Chính:**
- Phát triển backend
- CI/CD pipeline
- Giám sát, triển khai
- Tự động hóa hạ tầng

**Kỹ thuật:**
- Lambda ingestion
- Lambda chat/query
- CodePipeline tự động deploy
- CloudWatch log, metric
- IaC CDK/CloudFormation
- Định dạng API, xử lý lỗi
- Tối ưu hiệu năng

**Sản phẩm:**
- Lambda ingestion
- Lambda chat handler
- CI/CD pipeline
- IaC CDK
- Dashboard CloudWatch
- Tài liệu API

---

#### 🏗️ Nguyễn Lê Anh Quân - Cloud Architect
**Chính:**
- Thiết kế kiến trúc AWS
- Lập kế hoạch hạ tầng
- Bảo mật, IAM
- Tư vấn kỹ thuật

**Kỹ thuật:**
- Thiết kế serverless (Lambda, API, S3, DynamoDB)
- Thiết lập tài khoản, IAM
- Cấu hình API Gateway
- Sinh URL S3 upload an toàn
- Giám sát tích hợp

**Sản phẩm:**
- Đề xuất, sơ đồ kiến trúc
- Tài liệu thiết kế hạ tầng
- Cấu hình API Gateway
- Lambda upload S3
- Tài liệu bảo mật, IAM

---

#### 🗄️ Nguyễn Thanh Liêm - Backend/Database
**Chính:**
- Quản lý dữ liệu backend
- Thiết kế, tối ưu DB
- Logic lưu trữ
- Tối ưu truy vấn

**Kỹ thuật:**
- Thiết kế schema DynamoDB
- Lưu lịch sử hội thoại
- Quản lý metadata user
- Tối ưu truy vấn DB
- Triển khai pattern truy cập
- Theo dõi chi phí DB

**Sản phẩm:**
- Bảng DynamoDB, pattern truy cập
- Lambda lưu trữ
- Tài liệu DB
- Báo cáo tối ưu truy vấn
- Quy trình backup, phục hồi

---

#### 🎨 Trần Đình Phong - Frontend
**Chính:**
- Thiết kế, phát triển UI
- Tích hợp backend
- Tối ưu trải nghiệm
- Responsive

**Kỹ thuật:**
- React SPA
- UI/UX chat
- Tích hợp Cognito
- Giao diện upload file
- Kết nối API Gateway
- Xử lý lỗi, trạng thái
- Deploy frontend S3/CloudFront

**Sản phẩm:**
- Ứng dụng React UI/UX hiện đại
- Luồng xác thực Cognito
- Giao diện upload tài liệu
- Giao diện chat/hỏi đáp
- Responsive mobile/tablet
- Deploy frontend

---

### 5.3 Cam kết thời gian

| Thành viên | Giờ/tuần | Trọng tâm |
|------------|----------|-----------|
| **Dương Nguyễn Gia Huy** | 25-30 | Quản lý, RAG/Bedrock, QA |
| **Đào Quang Vinh** | 25-30 | Backend, DevOps |
| **Nguyễn Lê Anh Quân** | 25-30 | Kiến trúc, Backend |
| **Nguyễn Thanh Liêm** | 25-30 | Backend, Dữ liệu |
| **Trần Đình Phong** | 25-30 | Frontend, UI/UX |

**Tổng nhóm:** ~125-145 giờ/tuần

---

### 5.4 Công cụ giao tiếp & hợp tác

| Công cụ | Mục đích | Tần suất |
|---------|----------|----------|
| **Slack/Discord** | Giao tiếp hàng ngày | Real-time |
| **GitHub** | Quản lý mã, issue | Commit hàng ngày |
| **Google Meet/Zoom** | Họp sprint, review | 3 lần/tuần |
| **Notion/Confluence** | Tài liệu, ghi chú | Cập nhật tuần |
| **AWS Console** | Quản lý hạ tầng | Khi cần |
| **Postman** | Test API | Hàng ngày (dev) |

---

### 5.6 Quy trình ra quyết định

**Kỹ thuật:**
- **Nhỏ:** Dev tự quyết
- **Vừa:** Thảo luận nhóm, Huy duyệt
- **Lớn:** Toàn nhóm + giảng viên duyệt

**Giải quyết xung đột:**
1. Thảo luận nhóm
2. Không đồng thuận: Huy quyết định, Anh Quân tư vấn
3. Ghi nhận lý do trên GitHub/Notion

---

## 6. Nguồn lực & Dự toán chi phí

### 6.1 Phân bổ nguồn lực

| Nguồn lực | Nhiệm vụ | Đơn giá (USD/h) |
|-----------|----------|-----------------|
| **Cloud Architect/PM** | Thiết kế, quản lý, liên hệ, kỹ thuật | $45 |
| **Backend Dev** (2) | Lambda, API, Bedrock, IaC | $35 |
| **Frontend Dev** | React, Cognito, responsive | $35 |
| **QA** | Test, automation, CI/CD | $30 |
| **DevOps** | CI/CD, monitoring, tối ưu | $35 |

*DevOps gộp với Backend 2 (Ngô Đức Huy)*

### 6.2 Phân bổ công theo giai đoạn

| Giai đoạn | Cloud Architect | Backend (×2) | Frontend | QA | DevOps | Tổng giờ |
|-----------|----------------|--------------|----------|-----|--------|----------|
| **GĐ1: Nền tảng & Backend** | 120 | 240 | 40 | 80 | 80 | 560 |
| **GĐ2: API & Bảo mật** | 80 | 160 | 40 | 80 | 60 | 420 |
| **GĐ3: Frontend** | 80 | 80 | 240 | 80 | 40 | 520 |
| **GĐ4: Test & Ra mắt** | 80 | 80 | 80 | 160 | 80 | 480 |
| **Tổng** | **360** | **560** | **400** | **400** | **260** | **1.980** |

### 6.3 Tính chi phí

| Nguồn lực | Tổng giờ | Đơn giá | Tổng (USD) |
|-----------|----------|---------|------------|
| Cloud Architect/PM | 360 | $45 | $16.200 |
| Backend Dev (2×280) | 560 | $35 | $19.600 |
| Frontend Dev | 400 | $35 | $14.000 |
| QA | 400 | $30 | $12.000 |
| DevOps | 260 | $35 | $9.100 |
| **Tổng phát triển** | **1.980** | | **$70.900** |

### 6.4 Phân bổ đóng góp

| Bên | Đóng góp (USD) | % |
|-----|---------------|---|
| **Khách hàng (Trường)** | $35.450 | 50% |
| **Đối tác (Nhóm phát triển)** | $28.360 | 40% |
| **AWS (Credit/tài trợ)** | $7.090 | 10% |
| **Tổng** | **$70.900** | **100%** |

*AWS giả định có Activate hoặc chương trình tài trợ*

### 6.5 Chi phí vận hành

| Hạng mục | Mô tả | Ước tính (USD/tháng) |
|----------|-------|----------------------|
| **Hạ tầng AWS** | Lambda, Bedrock, S3, DynamoDB... | $621 |
| **Bảo trì, hỗ trợ** | ~10% 1 kỹ sư | $280 |
| **Tổng/tháng** | | **≈ $901** |

### 6.6 Tổng đầu tư

#### Sinh viên (giai đoạn phát triển)
| Hạng mục | Số tiền (USD) |
|----------|---------------|
| **Phát triển** (4 SV × 3,5 tháng × $0) | $0 |
| **AWS** (3,5 tháng × $5) | $17,5 |
| **AWS Educate Credit** | -$100 (đủ 20 tháng) |
| **Tổng** | **$0** (được tài trợ) |

#### Production (sau tốt nghiệp)
| Hạng mục | Số tiền (USD) |
|----------|---------------|
| **Phát triển 1 lần** | $70.900 |
| **Vận hành năm đầu** (12×$621) | $7.452 |
| **Tổng năm đầu** | **$78.352** |

### 6.7 Phân tích ROI

#### Sinh viên
**Giá trị học tập:**
- **Thành viên:** 5 SV
- **Kết quả:** Kỹ năng AWS, dự án thực tế
- **Portfolio:** Dự án chuyên nghiệp
- **Chi phí:** **$0** (được tài trợ)
- **ROI:** **Vô hạn** (không tốn, giá trị cao)

#### Production
**Giá trị tạo ra:**
- **User:** 1.000 SV
- **Tiết kiệm/user:** 3h/tuần
- **Tổng tiết kiệm:** 1.000 × 3 × 4 = **12.000h/tháng**
- **Giá trị giờ:** $1,25/h
- **Tổng giá trị:** 12.000 × $1,25 = **$15.000/tháng**

**Tính ROI:**
- **Giá trị/tháng:** $15.000
- **Chi phí/tháng:** $621
- **Lợi ích/tháng:** $14.379
- **Lợi ích/năm:** $172.548
- **Thu hồi vốn:** $70.900 / $14.379 ≈ **5 tháng**
- **ROI năm đầu:** ($172.548 - $78.352) / $78.352 = **120%**

**Kết luận:**  
- **Sinh viên:** Học miễn phí, giá trị cao
- **Production:** Hiệu quả tài chính, thu hồi vốn 5 tháng, ROI 120%

---

## 7. Nghiệm thu

### 7.1 Quy trình nghiệm thu

Kết thúc mỗi giai đoạn (3.1), nhóm nộp sản phẩm kèm **Phiếu nghiệm thu** (phụ lục A).

**Thời gian nghiệm thu:**  
Khách hàng có **8 ngày làm việc** để kiểm tra, đánh giá sản phẩm theo tiêu chí.

### 7.2 Xác nhận nghiệm thu

Nếu đạt tiêu chí, khách hàng gửi **xác nhận nghiệm thu bằng văn bản** trước khi hết hạn.

### 7.3 Quy trình từ chối

Nếu không đạt, khách hàng ghi **lý do từ chối** vào Phiếu nghiệm thu, trả lại sản phẩm.

### 7.4 Quy trình khắc phục

Nhận được từ chối, nhóm **sửa lỗi, bổ sung** để đáp ứng yêu cầu, sau đó nộp lại.

Khách hàng chỉ kiểm tra lại các điểm đã bị từ chối và ảnh hưởng liên quan.

### 7.5 Nghiệm thu mặc định

Nếu khách hàng **không phản hồi** trong thời hạn, sản phẩm được **coi là nghiệm thu**.

### 7.6 Tiêu chí nghiệm thu từng giai đoạn

#### Giai đoạn 1: Nền tảng & Backend
- [ ] Upload S3 thành công
- [ ] S3 trigger Lambda ingestion
- [ ] Tài liệu được chia đoạn, embedding lên Bedrock
- [ ] Lambda query trả lời đúng
- [ ] Unit test >80% coverage
- [ ] Tất cả test tự động pass

#### Giai đoạn 2: API & Bảo mật
- [ ] API Gateway hoạt động (/upload, /ask, /history)
- [ ] Cognito đăng ký, đăng nhập
- [ ] JWT xác thực mọi endpoint
- [ ] Postman test API xác thực thành công
- [ ] Công bố tài liệu API
- [ ] Checklist bảo mật hoàn thành

#### Giai đoạn 3: Frontend
- [ ] React deploy S3, CloudFront
- [ ] Đăng ký, đăng nhập UI
- [ ] Upload tài liệu hoạt động
- [ ] Chat hiển thị đúng
- [ ] Responsive desktop, tablet, mobile
- [ ] Unit test frontend >70%
- [ ] Luồng người dùng end-to-end

#### Giai đoạn 4: Test, Triển khai & Ra mắt
- [ ] Tất cả test pass
- [ ] Coverage backend >85%, frontend >70%
- [ ] CI/CD deploy Dev, Staging, Production
- [ ] Test hiệu năng p95 <3s
- [ ] Audit bảo mật không lỗi nghiêm trọng
- [ ] Beta test ≥50 user
- [ ] Phản hồi user đã xử lý
- [ ] Tài liệu hoàn chỉnh
- [ ] Chuyển giao kiến thức
- [ ] Deploy production thành công

### 7.7 Nghiệm thu cuối cùng

Khi hoàn thành giai đoạn 4, dự án được **coi là hoàn thành**. Khách hàng cấp **Giấy chứng nhận nghiệm thu cuối cùng** xác nhận:
- Đáp ứng tiêu chí nghiệm thu
- Hệ thống vận hành production
- Đã chuyển giao tài liệu, kiến thức
- Có kế hoạch hỗ trợ

---

## 8. Quản lý rủi ro

### 8.1 Bảng rủi ro

| STT | Loại | Mô tả | Mức độ | Xác suất | Ưu tiên | Giải pháp |
|-----|------|-------|--------|----------|---------|-----------|
| 1 | **Kỹ thuật** | AI trả lời sai (Hallucination) | Cao | TB | Cao | Prompt engineering, hiển thị nguồn, dùng model mới, chấm điểm tin cậy |
| 2 | **Kỹ thuật** | Truy vấn vector chậm | TB | Thấp | TB | Dùng OpenSearch Serverless, tối ưu chunk, cache query, giám sát index |
| 3 | **Bảo mật** | Rò rỉ dữ liệu nhạy cảm | Rất cao | Thấp | Cao | Mã hóa, IAM tối thiểu, cô lập tenant, audit, phân loại dữ liệu |
| 4 | **Kinh doanh** | Người dùng không dùng | Cao | TB | Cao | Phát triển theo pha, UI đơn giản, đào tạo, truyền thông giá trị, onboarding tốt |
| 5 | **Vận hành** | Chi phí AWS vượt dự toán | Cao | TB | TB | Đặt ngân sách, giám sát chi phí, cache query, chọn model rẻ, giới hạn user |
| 6 | **Dự án** | Trễ tiến độ do kỹ thuật | TB | TB | TB | Agile, nhận diện sớm, buffer thời gian, liên hệ AWS, có phương án dự phòng |
| 7 | **Kỹ thuật** | Lambda cold start chậm | TB | TB | Thấp | Provisioned concurrency, tối ưu package, SnapStart, timeout hợp lý |
| 8 | **Tuân thủ** | Không đáp ứng quy định | Cao | Thấp | TB | Làm việc sớm với compliance, tài liệu hóa, chính sách xóa dữ liệu, xuất dữ liệu, review định kỳ |
| 9 | **Vận hành** | Bedrock outage | TB | Thấp | Thấp | Graceful degrade, thông báo lỗi rõ, cân nhắc multi-region, giám sát AWS Health |
| 10 | **Kinh doanh** | Thiếu dữ liệu huấn luyện | Thấp | TB | Thấp | Seed tài liệu mẫu, khuyến khích upload, hợp tác thư viện số hóa |

### 8.2 Kế hoạch dự phòng

**Nếu AI Hallucination nghiêm trọng:**
- **Ngay:** Hiển thị đoạn gốc thay vì trả lời tổng hợp
- **Ngắn hạn:** Thử model khác trên Bedrock
- **Dài hạn:** Pipeline kiểm tra độ tin cậy

**Nếu chi phí Bedrock cao:**
- **Ngay:** Cache, giới hạn tốc độ
- **Ngắn hạn:** Giới hạn query miễn phí/user
- **Dài hạn:** Mô hình trả phí

**Nếu ít người dùng:**
- **Ngay:** Phỏng vấn tìm nguyên nhân
- **Ngắn hạn:** Đơn giản UI, video hướng dẫn, thưởng
- **Dài hạn:** Đổi nhóm user, use case

**Nếu trễ tiến độ:**
- **Ngay:** Ưu tiên MVP, hoãn tính năng phụ
- **Ngắn hạn:** Thêm nhân lực, tăng giờ
- **Dài hạn:** Đàm phán gia hạn

**Nếu bị tấn công bảo mật:**
- **Ngay:** Kích hoạt ứng phó, cô lập hệ thống
- **Ngắn hạn:** Điều tra, thông báo user
- **Dài hạn:** Bổ sung kiểm soát, audit bên thứ 3

### 8.3 Giám sát rủi ro

- **Review hàng tuần:** Sprint planning
- **Báo cáo tháng:** Rủi ro ưu tiên cho sponsor
- **Giám sát tự động:** CloudWatch cảnh báo chi phí, hiệu năng, lỗi
- **Đánh giá quý:** Cập nhật xác suất, mức độ

---

## 9. Kết quả & Chỉ số thành công

### 9.1 KPI

#### Kỹ thuật

| Chỉ số | Mục tiêu | Đo lường |
|--------|---------|----------|
| **API p95** | <3s | CloudWatch, dashboard |
| **Tỷ lệ lỗi** | <0.1% | Logs, tracking |
| **Độ chính xác RAG** | 90% (top 3 đúng) | Đánh giá thủ công 100 query |
| **Uptime** | 99,5% | Synthetic monitoring |
| **Lambda cold start** | <1s | Lambda Insights |
| **Xử lý tài liệu** | <60s/10 trang PDF | CloudWatch custom metric |

#### Kinh doanh

| Chỉ số | Mục tiêu | Đo lường |
|--------|---------|----------|
| **User mới/tháng** | 500/3 tháng | Log DynamoDB, Cognito |
| **Tỷ lệ quay lại** | 60%/tuần | Theo dõi hoạt động |
| **NPS** | +40 | Survey, feedback |
| **Tỷ lệ query thành công** | 85% | Feedback user |
| **Query/user** | 20/tháng | Analytics |
| **Upload tài liệu** | 200/tháng | S3 event metric |

#### Tác động

| Chỉ số | Gốc | Mục tiêu | Đo lường |
|--------|-----|---------|----------|
| **Thời gian tìm kiếm** | 8 phút | <1 phút | Survey, đo thực tế |
| **Tiết kiệm/user** | 0h | 3h/tuần | Survey, analytics |
| **Chất lượng nghiên cứu** | Gốc | +20% | Đánh giá giảng viên |
| **Hài lòng user** | Gốc | +40% | Survey trước/sau |

### 9.2 Lợi ích kinh doanh

**Ngắn hạn (0-6 tháng):**
- **Năng suất:** Tiết kiệm 3-5h/tuần
- **Tương tác:** Tăng tương tác tài liệu
- **Tiên phong:** Trường dẫn đầu AI giáo dục
- **PoC:** Kiểm chứng kiến trúc RAG

**Trung hạn (6-18 tháng):**
- **Chất lượng:** Cải thiện bài luận, báo cáo
- **Hệ sinh thái tri thức:** Dữ liệu query, tài liệu
- **Mở rộng:** Nhiều phòng ban
- **Tiết kiệm:** Giảm thời gian thư viện hỗ trợ

**Dài hạn (18+ tháng):**
- **Thương hiệu:** Dẫn đầu AI giáo dục
- **Mở rộng nền tảng:** Đa phương tiện, tích hợp LMS, analytics
- **Doanh thu:** Có thể thương mại hóa
- **Nghiên cứu:** Dữ liệu cho AI giáo dục

### 9.3 Cải tiến kỹ thuật

- **Cloud mature:** Từ prototype lên enterprise
- **Serverless:** Thành thạo kiến trúc AWS
- **AI/ML:** Kinh nghiệm AI Bedrock
- **DevOps:** CI/CD, IaC chuẩn
- **Bảo mật:** Đáp ứng kiểm soát, compliance

### 9.4 Giá trị lâu dài

Nền tảng EduQuery mở rộng linh hoạt:

**Tính năng tương lai:**
- **Đa phương tiện:** Ảnh, sơ đồ, biểu đồ
- **Tích hợp LMS:** Moodle, Canvas...
- **Analytics nâng cao:** Gợi ý, phân tích lỗ hổng kiến thức
- **Cộng tác:** Bộ sưu tập, workspace nhóm
- **App di động:** iOS, Android
- **Đa ngôn ngữ:** Hỗ trợ SV quốc tế
- **Voice:** Hỏi đáp bằng giọng nói
- **Trích dẫn:** Sinh bibliography tự động

**Lộ trình mở rộng:**
- Hiện tại: 1.000 user, 1 trường
- Năm 1: 5.000 user, nhiều phòng ban
- Năm 2: 10.000+ user, liên trường
- Năm 3+: SaaS thương mại

### 9.5 Tổng kết tiêu chí thành công

Dự án thành công khi:

✅ **Kỹ thuật:** Đạt mục tiêu hiệu năng, tin cậy, bảo mật  
✅ **Kinh doanh:** Đạt mục tiêu user, hài lòng  
✅ **Tài chính:** ROI dương sau 6 tháng  
✅ **Tác động:** Cải thiện hiệu quả học tập, nghiên cứu  
✅ **Chiến lược:** Trường dẫn đầu AI giáo dục

---

## 10. Phụ lục

### Phụ lục A: Mẫu phiếu nghiệm thu
