---
title: "Worklog Tuần 8"
date: "2025-09-09"
weight: 1
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* Thực hành kết nối và quản lý EC2 bằng nhiều phương pháp (RDP Client, Fleet Manager, SSH).
* Tìm hiểu, cấu hình nguồn dữ liệu (SQL Server, Oracle) và thực hiện chuyển đổi schema sang Aurora MySQL.
* Trải nghiệm thực tế các công cụ migration của AWS: tạo migration task, endpoint, xử lý sự cố.
* Hiểu và sử dụng AWS CLI để quản lý tài khoản, region và tài nguyên.
* Khám phá quy trình backup, restore và dọn dẹp tài nguyên trên AWS.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                                                                                   | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ----------------------------------------- |
| 2   | - Tìm hiểu khái niệm database <br> - Tìm hiểu Amazon RDS và Amazon Aurora                                                                                         | 27/10/2025   | 27/10/2025      |
| 3   | - Tìm hiểu Redshift và Elasticache <br> **Thực hành:** <br>&emsp; + Tạo VPC <br>&emsp; + Tạo security group cho EC2, RDS <br>&emsp; + Tạo DB subnet group <br>&emsp; + Tạo EC2 instance <br>&emsp; + Tạo RDS database instance | 28/10/2025   | 28/10/2025      | <https://000005.awsstudygroup.com/> |
| 4   | - Triển khai ứng dụng <br> - Backup, restore & dọn dẹp tài nguyên <br> **Thực hành:** <br>&emsp; + EC2 Connect Fleet Manager <br>&emsp; + EC2 Connect RDP Client <br>&emsp; + SQLSrv Src Config | 29/10/2025   | 29/10/2025      | <https://000043.awsstudygroup.com/> <br> <https://000005.awsstudygroup.com/> |
| 5   | - Kết nối Oracle SrcDB <br>&emsp; + Cấu hình Oracle SrcDB <br> - Xóa constraint <br> **Thực hành:** <br>&emsp; + MSSQL to aur MySQL target config <br>&emsp; + MSSQL to aur MySQL create project <br>&emsp; + MSSQL to aur MySQL SchemConv <br>&emsp; + Oracle2 MySQL Schema conversion 1 | 30/10/2025   | 30/10/2025      | <https://000043.awsstudygroup.com/> |
| 6   | **Thực hành:** <br>&emsp; + Tạo Mig Task và Endpoint <br>&emsp; + Kiểm tra S3 <br>&emsp; + Tạo Severless Migration <br>&emsp; + Tạo event not <br>&emsp; + Xem log <br>&emsp; + Xử lý sự cố Test Scenario Mem Pressure | 31/10/2025   | 31/10/2025      | <https://000043.awsstudygroup.com/> |


### Kết quả đạt được tuần 8:

* Kết nối thành công tới EC2 bằng cả RDP Client và Fleet Manager.
* Cấu hình SQL Server, Oracle làm nguồn dữ liệu và thiết lập Aurora MySQL làm đích migration.
* Hoàn thành các dự án chuyển đổi schema và migration từ MSSQL/Oracle sang Aurora MySQL, bao gồm xử lý sự cố và constraint.
* Thực hành tạo migration task, endpoint, migration serverless; theo dõi log và event.
* Sử dụng AWS CLI để quản lý tài nguyên, xác thực thông tin tài khoản, region, EC2.
* Thực hiện backup, restore và dọn dẹp tài nguyên AWS trong quy trình migration.


