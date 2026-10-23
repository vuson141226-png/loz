# Kiểm tra PAWS & CO.

Thực hiện trong môi trường phát triển ngày **24/10/2026** (múi giờ người dùng). Trình duyệt: Chromium headless thực, qua Playwright; phục vụ website bằng HTTP server tệp tĩnh. Công cụ kiểm tra nằm ngoài source của website; dự án không phụ thuộc chúng để chạy.

## Kết quả

- **50 phép kiểm tra** danh mục/chi tiết/tìm kiếm/yêu thích đạt, không có lỗi JavaScript.
- **12 nhóm kiểm tra** giỏ hàng/checkout đạt, bao gồm luồng đặt hàng demo và các trường hợp lỗi.
- **48 lượt trang/kích thước**: 8 trang ở 320, 375, 480, 768, 1024, 1440 px. Không tràn ngang, ảnh hỏng, HTTP lỗi hoặc `pageerror`. Giỏ hàng, checkout và yêu thích có dữ liệu khi kiểm tra.
- Menu mobile, Escape/focus return, newsletter sai/đúng, nội dung bài viết, FAQ, reduced motion và về đầu trang: đạt.
- Đã kiểm tra trực quan ảnh chụp trang chủ, danh mục, chi tiết, giỏ hàng và checkout ở desktop/mobile; điều chỉnh header mobile và kích thước nút chạm.
- **Axe-core 4.10.3**: không phát hiện lỗi contrast trên 4 trang chính × 2 kích thước. Sau khi sửa semantics của ô gợi ý tìm kiếm, audit các quy tắc WCAG 2 A/AA và WCAG 2.1 AA trên trang chủ, danh mục, chi tiết, checkout cùng trạng thái mở gợi ý cũng không còn vi phạm tự động.

Số phép kiểm tra không có nghĩa là số kịch bản kinh doanh độc lập. Audit tự động không thay thế đánh giá accessibility thủ công trên thiết bị và công cụ hỗ trợ thực tế.

## Các hành vi đã thực thi

### Danh mục và chi tiết

- 24 sản phẩm, ban đầu hiện 12; xem thêm hiện đủ 24 rồi ẩn nút.
- Kết hợp loại thú cưng, danh mục, thương hiệu, giá, đánh giá; xóa bộ lọc; lọc ưu đãi và sản phẩm mới.
- 5 cách sắp xếp: bán chạy, mới nhất, giá tăng/giảm, đánh giá.
- Tìm không dấu trong danh mục; trạng thái không có kết quả; query cập nhật URL.
- Chuỗi thử chứa markup không được thực thi trong tìm kiếm hoặc ID sản phẩm.
- Chuyển grid/list; yêu thích được lưu qua điều hướng và tải lại; xóa về trạng thái trống.
- Gallery đủ 3 hình, chuyển hình; đổi biến thể cập nhật giá và giới hạn số lượng.
- Số lượng âm hoặc quá lớn được chuẩn hóa; không vượt tồn kho kể cả khi món đã có trong giỏ.
- Tabs bằng chuột và phím mũi tên; quick view thêm giỏ; Escape đóng.
- Gợi ý header có kết quả/không có kết quả, điều hướng bằng bàn phím, Escape trả focus.
- Sản phẩm không tồn tại có trạng thái lỗi và đường dẫn quay về mua sắm.

### Giỏ hàng và đặt hàng mô phỏng

- Chi tiết → thêm giỏ → drawer → tăng/giảm/xóa → trạng thái trống; đóng drawer trả focus.
- Giỏ được giữ sau chuyển trang và tải lại; tổng của 2 túi hạt `daily-dog-chicken` 1 kg là **370.000 ₫**.
- Tồn kho theo biến thể, nút tăng bị vô hiệu khi đạt giới hạn; thêm lặp quá tồn kho bị từ chối.
- JSON hỏng, ID không có, dòng trùng, số lượng sai hoặc vượt tồn kho được xử lý an toàn.
- Biểu mẫu chặn bỏ trống, tên toàn khoảng trắng, số điện thoại/email/địa chỉ sai và thiếu xác nhận hiểu demo.
- Phí tiêu chuẩn **30.000 ₫**, miễn phí từ **599.000 ₫**; phí nhanh **50.000 ₫** cập nhật vào tổng.
- Dữ liệu hợp lệ → tạo mã `PAWS-...` → lưu tóm tắt → xóa giỏ → trang kết quả; tải lại trang kết quả vẫn hiển thị.
- Xác minh localStorage không chứa dữ liệu người nhận.
- Giỏ trống, mã đơn không có, localStorage bị chặn đều có thông báo phù hợp. Khi không lưu được kết quả, không chuyển sang trang thành công và giữ giỏ tạm.
- Mua ngay dùng đúng biến thể và số lượng đang chọn.
- Thông báo lỗi tổng hợp tự xóa khi người dùng sửa hết dữ liệu sai.

### Kiểm tra bổ sung cuối cùng

- Header mobile có nút menu/giỏ 44×44 px, không tràn ở 320/375/480/768 px.
- Khi xóa mục cuối trong wishlist, focus chuyển đến CTA mua sắm.
- Liên hệ mẫu mở giải thích minh bạch thay vì gửi thư đến địa chỉ không có thật.
- Bộ kiểm tra order từ localStorage xác minh kiểu dữ liệu, giá không âm và tính nhất quán của tổng tiền.

## Giới hạn đã xác định

- Chromium được quản lý trong môi trường này chặn điều hướng `file://` bằng chính sách quản trị. Không thể tuyên bố đã chạy thử trực tiếp chế độ mở file tại đây. Source dùng script classic và tài nguyên cục bộ, không có fetch/ES module bắt buộc; HTTP/Live Server đã được xác minh đầy đủ. Tính ổn định của localStorage trên `file:` phụ thuộc trình duyệt.
- Chưa chạy riêng Chrome, Edge, Safari, Firefox, điện thoại vật lý hoặc trình đọc màn hình.
- Không có backend, thanh toán, gửi đơn, xác thực hoặc dịch vụ email thật theo phạm vi yêu cầu.

## Tự thử nhanh

1. Mở trang chủ bằng Live Server, chọn danh mục hoặc tìm “hạt chó”.
2. Vào sản phẩm, đổi biến thể, tăng số lượng, thêm giỏ và mở icon giỏ.
3. Sửa số lượng, sang giỏ hàng, tải lại và kiểm tra tổng.
4. Sang checkout, thử gửi form trống rồi nhập dữ liệu giả hợp lệ, chọn giao hàng và xác nhận demo.
5. Hoàn tất, kiểm tra mã đơn và dòng nhắc không có đơn hàng thật được gửi.
6. Thử lưu/xóa yêu thích, mở quick view, newsletter và bài viết; dùng Tab/Escape và kích thước mobile.
