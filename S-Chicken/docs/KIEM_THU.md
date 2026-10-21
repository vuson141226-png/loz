# Kết quả kiểm thử trong môi trường phát triển

Công cụ: Chromium headless thật qua Playwright, phục vụ tệp HTML tĩnh bằng Python HTTP server. Các công cụ này chỉ phục vụ kiểm thử, không là phụ thuộc của website. Không cần cài Playwright, Python hoặc Node để chạy bằng Live Server.

## Đã đạt

- 10 trang có title riêng, không trùng ID HTML, mọi đường dẫn tệp cục bộ tồn tại.
- 30 lượt trang ở 375, 768, 1440 px: ảnh tải được; không có tràn ngang hoặc lỗi JavaScript trong lượt kiểm tra.
- Hiển thị 15 món; lọc gà sốt, danh mục từ URL, tìm trong danh mục, trạng thái không có kết quả.
- Trang chi tiết đúng ID; trạng thái ID không tồn tại; điều chỉnh số lượng và giới hạn tối đa 99.
- Thêm 2 burger và 1 gà → 137.000 ₫; tăng số lượng gà → 176.000 ₫; giảm → 137.000 ₫; xóa burger → 39.000 ₫.
- Giỏ giữ sau khi tải lại; xác nhận mô phỏng mở dialog và xóa giỏ; trạng thái giỏ trống đúng.
- JSON giỏ bị hỏng, ID không tồn tại và số lượng âm không làm trang lỗi.
- FAQ và tin tức mở/đóng đúng.
- Đăng ký bắt lỗi xác nhận mật khẩu; đăng ký/đăng nhập đúng hiện thành công giả lập; không có mật khẩu trong localStorage.
- Trường email sai bị đánh dấu không hợp lệ; form liên hệ và ứng tuyển hợp lệ hiện thông báo mô phỏng.
- Nút ứng tuyển chọn đúng vị trí; hamburger hoạt động và Escape đóng menu.
- JavaScript qua kiểm tra cú pháp.

Lượt kiểm thử tự động hoàn tất 523 phép kiểm tra, bao gồm nhiều phép kiểm tra đường dẫn tệp lặp giữa các trang; đây không phải 523 kịch bản nghiệp vụ độc lập. Đã xem ảnh chụp giao diện desktop và mobile.

## Chưa xác minh / giới hạn

- Chrome, Edge và Firefox bản cài riêng chưa chạy trong môi trường này. Nhóm cần kiểm tra trên máy nộp bài.
- Google Maps nhúng cần mạng ngoài; chưa xác nhận hiển thị thành công trong mạng đám mây bị giới hạn. Địa chỉ là minh họa.
- Chưa kiểm tra bằng thiết bị cảm ứng vật lý hoặc trình đọc màn hình.
- Không có backend, xác thực, gửi email/hồ sơ, giao hàng hoặc thanh toán thật theo đúng phạm vi bài tập.
- Một số ảnh sản phẩm dùng chung; xem README về nguồn và giới hạn quyền hình ảnh.
