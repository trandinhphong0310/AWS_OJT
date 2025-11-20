---
title: "Worklog Tuần 4"
date: "2025-08-14"
weight: 1
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Hiểu và thực hành sử dụng AWS Snow Family, Storage Gateway, Backup cho môi trường hybrid cloud.
* Tìm hiểu các nhóm dịch vụ AWS: Compute, Storage, Networking, Database.
* Trải nghiệm import/export máy ảo (VM) lên/xuống AWS.
* Thực hành mount, quản lý file share trên hệ thống on-premises với Amazon FSx, EFS.
* Khám phá các kỹ thuật tối ưu hiệu năng lưu trữ: deduplication, shadow copy, throughput scaling.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                        | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ------------------------------------- |
| 2   | - Tìm hiểu Snow Family, Storage Gateway, Backup <br> **Thực hành:** <br>&emsp; + Tạo S3 Bucket <br>&emsp; + Triển khai hạ tầng <br>&emsp; + Tạo backup plan <br>&emsp; + Thiết lập notification | 28/09/2025   | 28/09/2025      | <https://000013.awsstudygroup.com/> |
| 3   | - Tìm hiểu các nhóm dịch vụ AWS: Compute, Storage, Networking, Database, ...                                                    | 29/09/2025   | 29/09/2025      | <https://cloudjourney.awsstudygroup.com/> |
| 4   | - **Thực hành:** <br>&emsp; + Import VM lên AWS <br>&emsp; + Deploy instance từ AMI <br>&emsp; + Thiết lập S3 bucket ACL <br>&emsp; + Export VM từ Instance <br>&emsp; + Cleanup resource | 30/09/2025   | 30/09/2025      | <https://000014.awsstudygroup.com/> |
| 5   | - Mount file share trên máy on-premises: <br>&emsp; + Tạo SSD Multi-AZ file system <br>&emsp; + Tạo HDD Multi-AZ file system <br>&emsp; + Tạo file share mới <br>&emsp; + Test hiệu năng | 01/10/2025   | 01/10/2025      | <https://000025.awsstudygroup.com/> <br> <https://000024.awsstudygroup.com/> |
| 6   | - Monitor hiệu năng <br>&emsp; + Bật deduplication <br>&emsp; + Bật shadow copy <br>&emsp; + Bật user store quota <br>&emsp; + Scale throughput capacity | 02/10/2025   | 02/10/2025      | <https://cloudjourney.awsstudygroup.com/> |

### Kết quả đạt được tuần 4:

* Tạo S3 bucket, triển khai backup plan, cấu hình notification bảo vệ dữ liệu.
* Ôn tập, hiểu rõ các nhóm dịch vụ AWS và ứng dụng thực tế trong cloud infrastructure.
* Thực hành import/export VM, cấu hình S3 ACL, cleanup resource trên AWS.
* Thiết lập file system Multi-AZ (SSD & HDD), mount file share on-premises, test hiệu năng hệ thống.
* Áp dụng deduplication, shadow copy, user quota để tối ưu lưu trữ và giám sát hiệu quả.


