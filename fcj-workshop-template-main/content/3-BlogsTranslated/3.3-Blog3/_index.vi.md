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

Trước đây, việc đánh giá quy trình lập kế hoạch nhu cầu để xem nó mang lại giá trị kinh doanh như thế nào thường dựa vào các chỉ số độ chính xác như MAPE (Mean Absolute Percentage Error) hoặc WAPE (Weighted Absolute Percentage Error). Mặc dù những chỉ số này vẫn rất quan trọng để đánh giá hiệu quả tổng thể, nhưng chúng chưa đủ để đo lường giá trị được tạo ra ở từng bước trong quy trình hai giai đoạn. Chúng chỉ tập trung vào mức độ sai lệch giữa dự báo và kết quả thực tế, mà bỏ qua các yếu tố đầu vào và những điều chỉnh quan trọng được thực hiện trong quá trình hợp tác.

Chính vì vậy, khái niệm Forecast Value Add (FVA) trở nên cần thiết. FVA đo lường riêng biệt hiệu quả của dự báo do máy tạo ra và phần điều chỉnh của con người trong quá trình dự báo, giúp tổ chức xác định hoạt động nào thực sự mang lại giá trị và hoạt động nào có thể gây nhiễu hoặc thiên lệch. Bằng cách phân tích FVA, doanh nghiệp có thể tối ưu hóa quy trình lập kế hoạch nhu cầu, tập trung vào những bước thực sự quan trọng.

Ví dụ, **Tempur Sealy International, the world’s bedding provider and RS components** đã áp dụng thành công FVA và nhờ đó hiểu rõ hơn đâu là những yếu tố thực sự giúp cải thiện dự báo, thay vì chỉ tạo ra nhiễu.

Giải pháp của AWS Supply Chain hỗ trợ quy trình hai bước này và cung cấp các công cụ báo cáo, phân tích giúp so sánh kết quả thực tế với các loại dự báo (dự báo ban đầu, dự báo đồng thuận) và tính toán FVA để đánh giá giá trị được tạo ra ở từng bước. Nhờ vậy, các tổ chức có thể xây dựng kế hoạch nhu cầu mang lại giá trị kinh doanh cao hơn, chứ không chỉ dừng lại ở độ chính xác của con số dự báo.

## Đừng chỉ dự báo - hãy kiến tạo tương lai của bạn

Lập kế hoạch nhu cầu không chỉ là về độ chính xác - nó là tạo ra giá trị kinh doanh thực sự. Cách tiếp cận two-step với AWS Supply Chain hỗ trợ quá trình này, kết hợp dự báo ML tiên tiến với sự kết hợp mạnh mẽ của công cụ. Bằng cách tận dụng các thông tin chi tiết dựa trên dữ liệu cùng kiến thức chuyên môn của con người, các tổ chức có thể xây dựng kế hoạch nhu cầu không chỉ dự đoán mà còn định hình tương lai. Trong thị trường đầy biến động ngày nay, đây không chỉ là một lợi thế — mà là một điều cần thiết. Với AWS Supply Chain, hãy biến việc lập kế hoạch nhu cầu của bạn thành một lợi thế chiến lược giúp doanh nghiệp phát triển mạnh mẽ hơn.

Hãy bắt đầu hành trình của bạn bằng cách:  
- **Đánh giá quy trình hiện tại:** Xem xét cách tổ chức của bạn cân bằng giữa độ chính xác của dự báo và ý kiến hợp tác từ các bên liên quan. Bạn có đang thực sự tận dụng tối đa giá trị của cả hai chưa? 
- **Khám phá AWS Supply Chain:** Hãy lên lịch một buổi demo với đội ngũ quản lý tài khoản để xem cách mà công cụ dự báo bằng ML và nền tảng hợp tác tích hợp của AWS có thể thay đổi quy trình lập kế hoạch nhu cầu của bạn.
- **Tìm hiểu kỹ thuật:** Truy cập AWS Workshop Studio để tự mình trải nghiệm hướng dẫn kỹ thuật. Bạn sẽ học cách tạo một instance, nhập dữ liệu, thao tác với giao diện, tạo insight, và xây dựng kế hoạch nhu cầu.  