---
title: "Worklog Tuần 12"
date: "2025-09-09"
weight: 2
chapter: false
pre: " <b> 1.12 </b> "
---

### Mục tiêu tuần 12:

- Kết nối với các thành viên First Cloud Journey và làm quen với môi trường làm việc.
- Hiểu các kiến thức nền tảng về AWS và các nhóm dịch vụ cốt lõi (Compute, Storage, Networking, Database, ...).
- Thành thạo thao tác và sử dụng AWS Management Console.
- Cài đặt, cấu hình và thực hành sử dụng AWS CLI song song với Console để quản lý tài nguyên.
- Hoàn thành các bài thực hành về:
  - AWS Security Hub
  - Slack Incoming Webhooks (Lambda, gán tag EC2, tự động hóa start/stop)
  - Quản lý và lọc tài nguyên AWS bằng tag
  - Thực hành xử lý các tình huống lỗi (Memory Pressure, Table Error)
  - S3, Glue, Kinesis Firehose, QuickSight
  - DynamoDB (khám phá, backup, cleanup)

### Các công việc cần triển khai trong tuần này:

| Thứ | Công việc                                                                                                                                                                                                                     | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                      |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------- |
| 2   | - AWS Security Hub <br> - Thực hành và nghiên cứu bổ sung <br> - Kích hoạt Security Hub <br> - Tạo VPC và Security Hub                                                                                                        | 21/11/2025   | 21/11/2025      | <https://000022.awsstudygroup.com/> |
| 3   | - Slack Incoming Webhooks <br>&emsp; + Tạo tag cho EC2 và role cho Lambda <br>&emsp; + Hàm tự động start/stop EC2 <br>&emsp; + Kiểm tra kết quả <br>&emsp; + Dọn dẹp tài nguyên <br>&emsp; + Tạo EC2 với tag <br>             | 22/11/2025   | 22/11/2025      | <https://000027.awsstudygroup.com/> |
| 4   | - Quản lý tag tài nguyên AWS <br> - Lọc tài nguyên theo tag <br> - **Thực hành:** <br>&emsp; + Tạo migration serverless <br>&emsp; + Tạo event và log <br>&emsp; + Xử lý tình huống Memory Pressure                           | 23/11/2025   | 23/11/2025      | <https://000043.awsstudygroup.com/> |
| 5   | - Xử lý tình huống Table Error <br>&emsp; + Tạo S3 bucket <br>&emsp; + Tạo delivery stream <br>&emsp; + Tạo Glue Crawler <br>&emsp; + Thiết lập session connect <br> - Trực quan hóa với QuickSight <br> - Thực hành DynamoDB | 24/11/2025   | 24/11/2025      | <https://000039.awsstudygroup.com/> |
| 6   | - **Thực hành:** <br>&emsp; + Khám phá DynamoDB <br>&emsp; + Thao tác trên DynamoDB Console <br>&emsp; + Backup và cleanup                                                                                                    | 25/11/2025   | 25/11/2025      | <https://000039.awsstudygroup.com/> |

### Kết quả đạt được tuần 12:

- Nắm rõ các nhóm dịch vụ chính của AWS và vai trò của chúng trong kiến trúc cloud.
- Tạo và cấu hình thành công tài khoản AWS Free Tier để thực hành.
- Sử dụng thành thạo AWS Management Console để tìm kiếm, khám phá và quản lý dịch vụ.
- Đã cài đặt, cấu hình đầy đủ AWS CLI (Access Key, Secret Key, Region mặc định) và kiểm tra kết nối thành công.
- Thực hiện các thao tác cơ bản với CLI như:
  - Kiểm tra thông tin tài khoản và cấu hình
  - Liệt kê các region khả dụng
  - Quản lý dịch vụ EC2
  - Tạo và quản lý key pair
  - Quản lý tài nguyên song song bằng Console & CLI
- Hoàn thành nhiều bài thực hành, bao gồm:
  - Kích hoạt và sử dụng AWS Security Hub
  - Thiết lập Slack Webhooks & Lambda để tự động hóa EC2 start/stop
  - Quản lý và lọc tài nguyên bằng tag
  - Xử lý các tình huống lỗi Memory Pressure và Table Error
  - Làm việc với S3, Kinesis Firehose, Glue Crawler, QuickSight
  - Khám phá DynamoDB, tạo bảng, sử dụng các tính năng trên console, thực hiện backup và cleanup
  - Nâng cao kỹ năng troubleshooting, phân tích vấn đề và áp dụng giải pháp dựa trên tài liệu AWS.
