---
title: "Blog 2"
date: "2025-09-09"
weight: 1
chapter: false
pre: " <b> 3.2. </b> "
---

# Nâng cấp AWS SDK cho Go từ V1 lên V2 với nhà phát triển Amazon Q

Phát triển phần mềm không chỉ đơn thuần là việc viết mã. Trên thực tế, các lập trình viên dành rất nhiều thời gian để bảo trì các ứng dụng hiện có và sửa lỗi. Ví dụ, việc di chuyển một ứng dụng Go từ AWS SDK for Go phiên bản cũ v1 sang phiên bản mới hơn v2 có thể là một nhiệm vụ đáng kể, nhưng đó là bước quan trọng để giúp ứng dụng của bạn sẵn sàng cho tương lai và tận dụng các tính năng được cải tiến, hiệu năng tốt hơn, cũng như sự hỗ trợ liên tục từ AWS. Khi AWS SDK for Go v1 kết thúc hỗ trợ vào ngày 31 tháng 7 năm 2025, các tổ chức có ứng dụng đang dựa vào phiên bản này sẽ phải đối mặt với thách thức nâng cấp lên SDK v2 được hỗ trợ. Việc nâng cấp này rất cần thiết để tiếp tục nhận được các bản cập nhật bảo mật và hỗ trợ kỹ thuật từ AWS.

Trong bài viết này, chúng ta sẽ khám phá hướng dẫn từng bước về cách tận dụng sức mạnh của Amazon Q Developer — trợ lý phát triển phần mềm sử dụng công nghệ AI sinh sinh — để tăng tốc quá trình di chuyển và giảm nợ kỹ thuật liên quan đến SDK cũ. Hiện tại, Amazon Q Developer hỗ trợ trao đổi bằng tiếng Anh và hơn 15 ngôn ngữ lập trình để tạo mã trực tiếp trong trình soạn thảo, bao gồm Python, Java, JavaScript, C#, và Go.

---

## Tổng quan về ứng dụng

Ứng dụng này có một cổng API Amazon ngay phía trước AWS Lambda thực hiện lệnh gọi tới Amazon S3 và Amazon DynamoDB, như được hiển thị bên dưới trong **hình 1**. Toàn bộ ứng dụng được viết bằng ngôn ngữ lập trình Go
tận dụng AWS SDK for Go v1 và được tạo bằng AWS CDK

![Hình 1](/images/SDKG1G2_OverviewDiagram_FG1.jpg)
Hình 1: Sơ đồ kiến trúc của ứng dụng được ví dụ

Để đạt được hiệu năng tốt hơn, tiếp tục nhận các bản vá bảo mật, và hỗ trợ cho các dịch vụ AWS mới hơn, chúng ta cần di chuyển ứng dụng sang sử dụng AWS SDK for Go v2. Bạn có thể tìm thấy mẫu ứng dụng này trong kho Github được cung cấp. Trong phần tiếp theo, chúng ta sẽ tìm hiểu từng bước cách triển khai ứng dụng.

**Yêu cầu trước khi thực hiện:**

Để thực hiện phần này của bài viết, bạn cần chuẩn bị các yêu cầu sau:

1. Một tài khoản AWS

2. AWS Command Line Interface (CLI) phiên bản 2 trở lên, đã được cài đặt và cấu hình trên máy trạm của bạn.

3. git, Node.js, AWS CDK, Go, curl, make và jq để triển khai và kiểm thử ứng dụng.

Hướng dẫn cài đặt:

- git,
- Node.js,
- AWS CDK,
- curl,
- go,
- make, và
- jq.

**Lưu ý:**

- Bạn có thể dùng Homebrew trên macOS hoặc Chocolatey trên Windows để cài đặt các gói cần thiết.

1. AWS Toolkit được cài đặt trong Visual Studio Code hoặc JetBrains IDE.

- Hướng dẫn cài đặt AWS Toolkit có trong phần Getting Started cho VS Code và JetBrains.

2. Phần mở rộng Amazon Q Developer được cài đặt trong IDE bạn chọn:

- Amazon Q cho Visual Studio Marketplace
- Amazon Q cho JetBrains Marketplace

3. Nếu tổ chức của bạn đã có Amazon Q Developer Pro subscription, bạn có thể xác thực bằng AWS Identity Center (IdC). Hoặc bạn có thể xác thực bằng Builder ID miễn phí.

4. Hướng dẫn xác thực:

- Xác thực trong Visual Studio Code
- Xác thực trong JetBrains IDEs

# Triển khai môi trường mẫu Go

Các bước sau sẽ hướng dẫn bạn triển khai dự án mẫu Go vào tài khoản AWS của bạn.

1. Đầu tiên, thực hiện một bản sao Git của dự án Go mẫu này được tìm thấy ở đây.

2. Nếu bạn chưa từng sử dụng AWS CDK để triển khai lên một tài khoản và vùng (region) AWS cụ thể, bạn cần chạy lệnh cdk bootstrap một lần cho cặp tài khoản/vùng đó. Lệnh này sẽ thiết lập các tài nguyên cần thiết để CDK có thể hoạt động. Để biết thêm chi tiết, hãy tham khảo cdk bootstrap. Nếu bạn đã chạy cdk bootstrap cho tài khoản và vùng đó trước đây, bạn có thể bỏ qua bước này.

**$ cdk bootstrap aws://<account ID>/<region>**

3. Tiếp theo, hãy sử dụng lệnh cdk deploy --all để triển khai (deploy) tất cả các stack lên tài khoản và vùng (region) AWS mặc định của bạn. Tổng cộng sẽ có hai stack được triển khai: DynamoDBStack, GoSdkAmazonQStack

**$ cdk deploy --all**

Gõ y để xác nhận khi được hỏi cho hai stack: DynamoDBStack và GoSdkAmazonQStack.

4. Khi quá trình triển khai hoàn tất, hãy sao chép URL của API Gateway được hiển thị trong phần Outputs: để sử dụng cho bước tiếp theo, như minh họa trong Hình 2.

![Hình 2](/images/SDKG1G2_StackOutput_FG2.png)

5. Sau khi triển khai các stack mẫu Go bằng CDK, chúng ta sẽ kiểm thử ứng dụng mẫu bằng cách sử dụng lệnh curl với URL endpoint đã sao chép ở bước trước. Hãy truy vấn ứng dụng để tìm các người chơi có tên Carlos bằng cách nối đoạn sau vào cuối URL của bạn: getPlayers/?firstName=Carlos | jq

_Mac / Linux_

**$ curl -sX GET "https://{Enter your Hits API Endpoint URL here}/getPlayers/?firstName=Carlos" | jq**

Windows – PowerShell

**> (Invoke-WebRequest -Uri "https://{Enter your Hits API Endpoint URL here}/getPlayers/?firstName=Carlos").Content | jq**

Chạy lệnh curl và xác nhận rằng bạn thấy kết quả sau:
JSON {
"player_id": "8",
"lastName": "Hernandez",
"firstname": "Carlos",
"dob": "1988-06-18",
"plays": "Right",
"countryOfBirth": "Spain",
"countryOfResidence": "Spain"
}
Phản hồi từ API này đến từ ứng dụng Go xác nhận rằng ứng dụng đang hoạt động. Tiếp theo, chúng ta dùng Amazon Q Developer để giúp ta phân tích code và tạo tài liệu hoặc code

**Phân tích mã hiện có với Amazon Q Developer**

Amazon Q Developer Agent dành cho phát triển phần mềm có thể giúp bạn phát triển các tính năng mã mới hoặc thực hiện thay đổi mã trong các dự án ngay trong IDE của bạn. Các bước sau sẽ hướng dẫn bạn sử dụng Amazon Q Developer trong IDE để làm quen với mã nguồn của ứng dụng đang sử dụng AWS SDK for Go v1, và tạo tệp README.md bằng cách sử dụng tính năng **/doc**.

1. Mở thư mục dự án Go SDK Amazon Sample Project từ các bước trước trong IDE của bạn.

2. Nhấp vào biểu tượng Amazon Q Developer trong IDE để hiển thị bảng trò chuyện của Amazon Q, như minh họa trong Hình 3.

![Hình 3](/images/SDKG1G2_AskQ_FG3-1.png)
Hình 3: Nút tích hợp Amazon Q trong Visual Studio

3. Nhập /doc (lệnh này thông báo cho Q biết rằng bạn muốn tạo tài liệu hướng dẫn) trong bảng trò chuyện Amazon Q, sau đó chọn Create a README như minh họa trong Hình 4.

![Hình 4](/images/SDKG1G2_go_doc_latest_FG4-1.gif)
Hình 4: Cửa sổ trò chuyện Amazon Q trong Visual Studio (VS) Code (Nhấp vào hình để phóng to)

Lời nhắc mà bạn gửi cho Amazon Q Developer sẽ hướng dẫn công cụ này phân tích mã nguồn của bạn và tạo một tệp README.md mới chỉ trong vài phút. Hãy chấp nhận mã mới được tạo cho tệp README.md. Kết quả đầu ra thô mà bạn nhận được từ Amazon Q Developer có thể trông giống như ảnh chụp màn hình trong Hình 5.

![Hình 5](/images/SDKG1G2_READMEMD_FG5v2.png)
Hình 5: Tệp README.md được Amazon Q tự động tạo ra (Nhấp vào hình để phóng to)

Từ kết quả ví dụ, bạn có thể thấy rằng Amazon Q Developer đã phân tích mã nguồn và điền các nội dung chi tiết dựa trên chủ đề và cấu trúc mà chúng ta đã chỉ định trong lời nhắc. Kết quả có thể khác nhau giữa các lần chạy do bản chất không xác định của Generative AI. Tính năng này giúp lập trình viên tiết kiệm thời gian và công sức trong việc viết tài liệu cho phần mã mà họ đóng góp.

## Nâng cấp sử dụng Amazon Q

Hãy sử dụng lại tính năng /dev trong bảng trò chuyện Amazon Q để nâng cấp ứng dụng của chúng ta từ AWS SDK for Go v1 lên v2.

Lời nhắc mà chúng ta sử dụng sẽ tuân theo các phương pháp thực hành tốt nhất nhằm tận dụng tối đa khả năng của Amazon Q Developer Agent trong quá trình phát triển phần mềm.

1. Nhấp vào biểu tượng Amazon Q Developer trong IDE của bạn để hiển thị bảng trò chuyện của Amazon Q, sau đó chèn đoạn văn bản lời nhắc dưới đây vào ô nhập.

/dev
I'm a senior software engineer from AWS, working on migrating from AWS Sdk V1 to V2. In this context, I need to replace every usage of AWS Sdk V1 by AWS Sdk V2 in my updateplayer.go file and make the changes in place.
In particular, here I want to convert the usage of session.NewSession to config.LoadDefaultConfig.
Here is an example:
// v1
sess, err := session.NewSession(&aws.Config{
  Region: aws.String("etc"),
  HTTPClient: &http.Client{ /* ... */ },
  // ... map fields as appropriate
})
// v2
cfg := config.LoadDefaultConfig(context.TODO(), func (o config.LoadOptions) error {
  o.Region = "etc"
  o.HTTPClient = &http.Client{ / ... */ }
  return nil
})
Important: If you're unsure about the fix, do NOT proceed rather than outputing incorrect code. 

![Hình 6](/images/SDKG1G2_upgrade_sdk_1_FG6_prem.gif)

Khi Amazon Q Developer xử lý xong và tạo ra mã mới, bạn có thể chọn Accept All Changes để lưu các thay đổi mà Amazon Q Developer đã thực hiện vào máy cục bộ của bạn.

Hình 7 và Hình 8 minh họa các đoạn mã thể hiện những thay đổi do Amazon Q Developer tạo ra.

![Hình 7](/images/SDKG1G2_Gov1toGov2_FG7v2.png)
Hình 7: Lưu ý các thay đổi trong phần import của mã ứng dụng Go — từ “aws-sdk-go” sang sử dụng các module “aws-sdk-go-v2” (Nhấp vào hình để phóng to)

![Hình 8](/images/SDKG1G2_Gov1toGov2_FG8_v2.png)
Hình 8: Amazon Q Developer đã nâng cấp đối tượng session theo phong cách mã hóa của AWS SDK for Go v2, cho phép ứng dụng ghi dữ liệu vào bảng DynamoDB (Nhấp vào hình để phóng to)
Amazon Q Developer có thể biến những nhiệm vụ tẻ nhạt như tái cấu trúc mã trở nên nhanh chóng và dễ dàng chỉ với một lời nhắc phù hợp. Tiếp theo, hãy biên dịch và triển khai mã mới của chúng ta lên hạ tầng AWS.


**Xây dựng, triển khai và kiểm tra**

1. Chấp nhận tất cả các thay đổi mã do Amazon Q Developer tạo ra trong bảng trò chuyện.

2. Quay lại phiên terminal tại thư mục gốc của dự án đã được clone, và chạy các lệnh make để biên dịch lại tệp thực thi Go binary updatePlayer.

**$ go mod tidy && make updatePlayer**

- Lưu ý: Lệnh make có thể mất khoảng 35 đến 45 phút để hoàn tất, tùy thuộc vào cấu hình và hiệu năng của máy tính cục bộ.

3. Sau khi mã Go mới đã được biên dịch lại, chúng ta cần triển khai lại CDK stack.

**$ cdk deploy --all**

4. Bây giờ, sau khi bạn đã triển khai lại CDK stack với mã đã được cập nhật bởi Amazon Q Developer, hãy kiểm tra để xác nhận rằng mã mới hoạt động đúng như mong đợi. Chạy lại lệnh API mà bạn đã sử dụng trong Bước 1: Triển khai môi trường mẫu Go Deploy Sample Go Environment.

Mac / Linux

**$ curl -sX GET "https://{Enter your Hits API Endpoint URL here}/getPlayers/?firstName=Carlos" | jq**

Windows – PowerShell

**> (Invoke-WebRequest -Uri "https://{Enter your Hits API Endpoint URL here}/getPlayers/?firstName=Carlos").Content | jq**

Nếu bạn nhận được phản hồi API giống như ở bước 1: Triển khai môi trường mẫu Deploy Sample Go Environment, điều đó có nghĩa là bạn đã tái cấu trúc mã Go thành công bằng Amazon Q Developer!

Nếu có bất kỳ lỗi nào xảy ra, bạn có thể sử dụng Amazon Q Developer để debug và cung cấp các thông tin cần thiết nhằm khắc phục sự cố.

**Dọn dẹp**

Để tránh phát sinh chi phí và xóa các tài nguyên mà bạn đã tạo, hãy chạy lệnh sau:
    **$ cdk destroy --all**

## Kết luận

Bằng cách chủ động thực hiện việc chuyển đổi ngay từ bây giờ, bạn không chỉ đảm bảo tiếp tục nhận được các bản cập nhật bảo mật và hỗ trợ kỹ thuật, mà còn tận dụng được hiệu năng nâng cao và các dịch vụ AWS mới hơn. Đừng chờ đến khi hạn cuối — hãy trao quyền cho nhóm phát triển của bạn với Amazon Q Developer và biến quá trình di chuyển từ một thách thức thành cơ hội đổi mới sáng tạo.
Sẵn sàng bắt đầu chưa? Truy cập trang sản phẩm Amazon Q Developer để bắt đầu, hoặc tham gia cộng đồng AWS trên AWS re:Post để nhận hỗ trợ và hướng dẫn thêm.