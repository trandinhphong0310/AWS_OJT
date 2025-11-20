---
title: "Blog 3"
date: "2025-09-09"
weight: 1
chapter: false
pre: " <b> 3.3. </b> "
---
# Tối đa hóa giá trị kinh doanh với quy trình lập kế hoạch nhu cầu của AWS Supply Chain

Trong bối cảnh chuỗi cung ứng toàn cầu ngày nay, dự báo chính xác là quan trọng - nhưng chỉ vậy thôi thì vẫn chưa đủ. Các tổ chức đầu tư vào việc xây dựng kỹ năng phân tích nâng cao và Machine Learning (ML) để cải thiện độ chính xác của dự báo và thúc đẩy quản lý hàng tồn kho tối ưu. Mặc dù đã có những nỗ lực to lớn này, tỉ lệ hàng tồn kho đã tăng lên từ năm 2021, điều này phản ánh các tổ chức dự trữ quá mức cho biến động cung và cầu. Sự thật này cho thấy thiếu liên kết giữa cải thiện dự báo và đạt đc giá trị kinh doanh hữu hình.

Trong thời kỳ gián đoạn chuỗi cung ứng cao, sự hợp tác và chuyên môn kinh doanh thậm chí trở nên quan trọng hơn. Nếu không có sự giao tiếp hiệu quả giữa các stakeholder, ngay cả những dự báo tinh vi nhất cũng sẽ trở nên lỗi thời, giảm dần giá trị kinh doanh và khiến các tổ chức dễ bị thay đổi thị trường nhanh chóng.

Chìa khóa để mở khóa giá trị chuỗi cung ứng thực sự là việc kết hợp dự báo tiên tiến với sự hợp tác của các stakeholder hiệu quả. Bài viết này khám phá các giải pháp đổi mới của AWS Supply Chain giúp các tổ chức không chỉ tận dụng Machine Learning (ML) để tạo ra các dự báo chất lượng cao, mà còn thúc đẩy sự hợp tác hiệu quả, nắm bắt những thông tin kinh doanh quan trọng nhằm xây dựng kế hoạch nhu cầu thực sự trong mọi điều kiện thị trường.

---

## Xây dựng nhu cầu kế hoạch giá trị cao

Lập kế hoạch nhu cầu truyền thống là quá trình single-step, chỉ tập trung vào việc tạo ra dự báo chính xác nhất có thể bằng cách sử dụng dữ liệu lịch sử. Trong một môi trường năng động cao như ngày nay, quá trình đó làm thành công bị hạn chế, các sự kiện trong quá khứ không có cùng tác động trong tương lai và ý kiến của chuyên gia cũng rất quan trọng.

AWS Supply Chain nhận ra rằng lập kế hoạch nhu cầu cao thực sự cần tới cách tiếp cận two-step.

**Bước 1: Xây dựng dự báo cơ sở mạnh mẽ bằng ML**

Ở bước đầu tiên, các nhà lập kế hoạch nhu cầu sử dụng khả năng phân tích nâng cao và học máy (ML) của AWS Supply Chain để tạo ra bản dự báo cơ bản. Công cụ phân tích mô hình dự báo sẽ chạy trên dữ liệu của tổ chức và giúp họ chọn mô hình ML phù hợp nhất, có tính đến các yếu tố bên ngoài và sự thay đổi của sản phẩm để tăng độ chính xác ban đầu.

Ví dụ, thuật toán DeepAR+ có thể làm việc với các tập dữ liệu lớn chứa hàng trăm chuỗi thời gian và cho phép sử dụng thêm dữ liệu liên quan trong tương lai cũng như thông tin mô tả về sản phẩm để tạo ra kết quả dự báo.

![Hình 1](/images/DP-process-blog-image-1.png)

**Bước 2: Thúc đẩy sự hợp tác của stakeholder để xây dựng kế hoạch nhu cầu dựa trên sự đồng thuận**

Bước thứ hai, bước chủ yếu liên quan đến sàng lọc hợp tác. Các nhà hoạch định dùng trải nghiệm trực quan của người dùng của AWS Supply Chain để chia sẻ dự báo cơ bản với stakeholders, thu thập thông tin chi tiết và nắm bắt các giả định kinh doanh quan trọng. Quá trình này cho phép ghi đè và điều chỉnh cần thiết, đảm bảo kế hoạch cuối cùng phản ánh quan điểm toàn diện, phù hợp với doanh nghiệp.

![Hình 2](/images/DP-process-blog-image-2.png)

---

## Core microservice

Cung cấp dữ liệu nền tảng và lớp truyền thông, gồm:  
- **Amazon S3** bucket cho dữ liệu  
- **Amazon DynamoDB** cho danh mục dữ liệu  
- **AWS Lambda** để ghi message vào data lake và danh mục  
- **Amazon SNS** topic làm *hub*  
- **Amazon S3** bucket cho artifacts như mã Lambda

> Chỉ cho phép truy cập ghi gián tiếp vào data lake qua hàm Lambda → đảm bảo nhất quán.

---

## Front door microservice

- Cung cấp API Gateway để tương tác REST bên ngoài  
- Xác thực & ủy quyền dựa trên **OIDC** thông qua **Amazon Cognito**  
- Cơ chế *deduplication* tự quản lý bằng DynamoDB thay vì SNS FIFO vì:
  1. SNS deduplication TTL chỉ 5 phút
  2. SNS FIFO yêu cầu SQS FIFO
  3. Chủ động báo cho sender biết message là bản sao

---

## Staging ER7 microservice

- Lambda “trigger” đăng ký với pub/sub hub, lọc message theo attribute  
- Step Functions Express Workflow để chuyển ER7 → JSON  
- Hai Lambda:
  1. Sửa format ER7 (newline, carriage return)
  2. Parsing logic  
- Kết quả hoặc lỗi được đẩy lại vào pub/sub hub

---

## Tính năng mới trong giải pháp

### 1. AWS CloudFormation cross-stack references
Ví dụ *outputs* trong core microservice:
```yaml
Outputs:
  Bucket:
    Value: !Ref Bucket
    Export:
      Name: !Sub ${AWS::StackName}-Bucket
  ArtifactBucket:
    Value: !Ref ArtifactBucket
    Export:
      Name: !Sub ${AWS::StackName}-ArtifactBucket
  Topic:
    Value: !Ref Topic
    Export:
      Name: !Sub ${AWS::StackName}-Topic
  Catalog:
    Value: !Ref Catalog
    Export:
      Name: !Sub ${AWS::StackName}-Catalog
  CatalogArn:
    Value: !GetAtt Catalog.Arn
    Export:
      Name: !Sub ${AWS::StackName}-CatalogArn
