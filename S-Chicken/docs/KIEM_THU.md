# Kết quả kiểm thử Professional Redesign

Ngày kiểm tra: **23/10/2026**. Trình duyệt thực thi: **Chromium headless** qua Playwright, phục vụ tệp HTML tĩnh bằng HTTP server cục bộ. Playwright và HTTP server chỉ là công cụ kiểm thử của môi trường, không là phụ thuộc để người dùng chạy website bằng Live Server.

## 1. Kết quả tổng thể

- Bộ kiểm thử hồi quy chính: **179 phép kiểm tra đạt, 0 thất bại**, không ghi nhận `pageerror` JavaScript.
- Responsive: **60 lượt trang**, tức đủ 10 trang ở **320, 375, 480, 768, 1024 và 1440 px**. Ảnh cục bộ tải được, không phát hiện tràn ngang ở các lượt kiểm tra.
- Kiểm tra riêng **giỏ có 3 dòng món, số lượng lớn** ở cả 6 độ rộng: đạt. Tổng 99 gà nguyên bản + 2 burger + 1 combo hội bạn là **4.118.000 ₫**; nút tăng món đã đạt 99 ở trạng thái disabled.
- Kiểm tra riêng **320×568 px**: section thực đơn và card hiển thị với opacity 1 sau khi cuộn, không tràn ngang. Có thử cho section bắt đầu ngoài viewport để thực sự đi qua IntersectionObserver.
- Click cả **5 danh mục trên trang chủ**: mỗi danh mục sang thực đơn đúng và hiện 3 món; riêng “Burger & món kèm” có `%26` trong URL.
- Vùng thông báo form ban đầu không hiện viền rỗng; chỉ xuất hiện khối thông báo khi có lỗi hoặc thành công.

179 là số phép kiểm tra trong bộ hồi quy chính, không phải 179 kịch bản kinh doanh độc lập. Các ca bổ sung về giỏ có món, viewport ngắn và đường dẫn danh mục được thực thi riêng sau đó.

## 2. Các hành vi đã thực thi

| Nhóm | Kết quả quan sát |
| --- | --- |
| Cấu trúc/điều hướng | Đủ 10 HTML, title riêng, không có ID trùng trong mỗi trang; đường dẫn tệp và anchor cục bộ tồn tại |
| Thực đơn | Hiện 15 món; lọc gà sốt còn 3; tìm trong danh mục; có thông báo khi không khớp; category URL đúng/sai được xử lý |
| Chi tiết món | ID 3 mở burger đúng; ID 999 hiện không tìm thấy; số lượng bị chặn tối đa 99 |
| Thêm giỏ | Thêm 2 phần từ trang chi tiết; badge cập nhật đúng; toast xuất hiện |
| Tổng tiền | 2 burger + 1 gà = 137.000 ₫; tăng gà = 176.000 ₫; giảm = 137.000 ₫; xóa burger = 39.000 ₫ |
| Lưu giỏ | Tải lại vẫn còn 2 dòng; JSON hỏng/ID sai/số lượng âm/phần tử sai kiểu không làm trang lỗi |
| Xác nhận demo | Mở dialog, xóa giỏ đã xác nhận, quay về trạng thái trống có liên kết tiếp tục mua |
| FAQ/tin tức | Mở và đóng được; chờ kết thúc chuyển động rồi xác nhận hidden và aria-expanded |
| Đăng ký | Mật khẩu xác nhận sai bị chặn; dữ liệu đúng báo thành công mô phỏng; không lưu tài khoản/mật khẩu |
| Đăng nhập | Dữ liệu giả hợp lệ hiện thông báo thành công mô phỏng |
| Liên hệ | Email sai định dạng không hợp lệ; tên chỉ có khoảng trắng bị chặn; dữ liệu đúng hiện thông báo giả lập |
| Tuyển dụng | Nút ứng tuyển chọn đúng vị trí; dữ liệu hợp lệ hiện thông báo giả lập |
| Menu di động | Mở được, Escape đóng và trả focus; chuyển desktop không giữ khóa cuộn |
| Reduce motion | Tắt smooth scroll; menu vẫn hoạt động |
| Khi tắt JavaScript | Tiêu đề/nội dung chính trang chủ và 15 thẻ thực đơn vẫn hiển thị; các tính năng động cần JavaScript |

## 3. Kiểm tra giao diện thực tế

Đã chụp các trang chủ, thực đơn, chi tiết, giỏ, FAQ và đăng nhập ở các kích thước đại diện. Đã xem ảnh chụp các bố cục mobile, đặc biệt giỏ 320 px có nhiều món/số lượng lớn, FAQ, chi tiết và biểu mẫu. Lỗi viền thông báo rỗng được phát hiện trong ảnh đăng nhập rồi sửa và kiểm tra lại có border-left 0 px trước khi người dùng gửi form.

Kiểm tra opacity riêng tránh nhầm một phần tử có kích thước trong DOM với nội dung thực sự đang hiển thị: section dài của thực đơn phải đạt opacity 1 sau khi xuất hiện ở viewport ngắn.

## 4. Giới hạn chưa xác minh

- Chưa chạy riêng **Chrome, Edge và Firefox bản cài**. Nhóm cần thử lại trên các trình duyệt của máy nộp bài.
- Chưa xác nhận **Google Maps bên ngoài** tải thành công trong mạng đám mây bị giới hạn. Địa chỉ trên bản đồ là minh họa.
- Chưa thử trên điện thoại vật lý hoặc công cụ đọc màn hình. Kiểm tra kích thước trong Chromium không thay thế hoàn toàn kiểm tra thiết bị thật.
- Không có backend, xác thực, gửi email/hồ sơ, giao hàng hay thanh toán thật theo đúng phạm vi bài tập.
- Một số món dùng chung ảnh minh họa; ảnh AI không phải ảnh chụp sản phẩm thực tế. Nguồn và giấy phép ảnh/font được ghi trong dự án.

## 5. Tự kiểm tra trước khi nộp

Mở `index.html` bằng Live Server; dùng Console và Device Toolbar. Chạy lại hành trình **trang chủ → danh mục → chi tiết → thêm giỏ → thay đổi số lượng → xác nhận mô phỏng**. Thử form sai rồi đúng; bật Reduce motion; kiểm tra menu bằng bàn phím. Đối chiếu các tổng tiền mẫu trong bảng trên, rồi lặp lại trên Chrome, Edge và Firefox. Không nhập mật khẩu thật hoặc thông tin thanh toán cá nhân.
