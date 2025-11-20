---
title: "Worklog Tuần 7"
date: "2025-09-09"
weight: 1
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Hiểu và thực hành AWS IAM: user, group, role, policy.
* Cấu hình permission, access control để bảo mật tài nguyên.
* Thực hành AWS KMS mã hóa dữ liệu, test tích hợp với S3.
* Enable CloudTrail để audit, dùng Athena truy vấn log.
* Tạo EC2, tagging, quản lý policy qua IAM.
* Áp dụng security restriction (IP, time, switch role) cho IAM user.

### Các công việc cần triển khai trong tuần này:
| Thứ | Công việc                                                                                                                        | Ngày bắt đầu | Ngày hoàn thành | Nguồn tài liệu                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- | ------------------------------------- |
| 2   | - Truy cập EC2 console ở Tokyo, North Virginia <br> - Tạo EC2 khi chưa có tag <br> - Edit resource EC2, kiểm tra policy <br> - Tạo restriction policy | 19/10/2025   | 19/10/2025      | <https://000030.awsstudygroup.com/> <br> <https://000028.awsstudygroup.com/> |
| 3   | - Tạo IAM Limited user <br> - Test IAM User Limits <br> - Tạo Policy, Role <br> - Tạo Group, User <br> - Tạo KMS <br> - Tạo bucket <br> - Upload data lên S3 | 20/10/2025   | 20/10/2025      | <https://000033.awsstudygroup.com/> |
| 4   | - Tạo CloudTrail <br> - Logging CloudTrail & tạo Athena <br> - Truy vấn Athena <br> **Thực hành:** <br>&emsp; + Test, chia sẻ dữ liệu mã hóa trên S3 <br>&emsp; + Tạo IAM Group, User | 21/10/2025   | 21/10/2025      | <https://000044.awsstudygroup.com/> <br> <https://000033.awsstudygroup.com/> |
| 5   | - Kiểm tra permission <br>&emsp; + Tạo admin IAM role <br>&emsp; + Cấu hình switch role <br>&emsp; + Giới hạn switch role theo IP <br>&emsp; + Giới hạn switch role theo thời gian | 22/10/2025   | 22/10/2025      | <https://cloudjourney.awsstudygroup.com/> |
| 6   | - **Thực hành:** <br>&emsp; + Tạo EC2 instance <br>&emsp; + Tạo S3 bucket <br>&emsp; + Tạo IAM user, access key <br>&emsp; + Tạo IAM role, sử dụng IAM role | 23/10/2025   | 23/10/2025      | <https://000048.awsstudygroup.com/> |

### Kết quả đạt được tuần 7:
* Tạo, cấu hình EC2 ở nhiều region (Tokyo, North Virginia).
* Thiết lập IAM user, group, role, policy, kiểm tra permission restriction.
* Thực hành tạo KMS, test mã hóa với dữ liệu S3.
* Enable CloudTrail, kết nối Athena, truy vấn log hoạt động.
* Test RBAC: giới hạn switch role theo IP, thời gian.
* Hiểu sâu về bảo mật tài nguyên AWS, cấu hình policy, compliance thực tế.


