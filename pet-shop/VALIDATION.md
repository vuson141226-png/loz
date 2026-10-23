# Kiểm tra sisimimi

Kiểm tra ngày **24/10/2026** theo múi giờ người dùng. Trình duyệt thực thi: Chromium headless qua Playwright; phục vụ HTML tĩnh qua HTTP. Công cụ test ở ngoài source, không phải phụ thuộc khi chạy website.

## Lần cập nhật theo đề bài

- **84 lượt trang/kích thước**: 14 trang ở 320, 375, 480, 768, 1024, 1440 px. Không tràn ngang; đủ một H1 mỗi trang; 14 title phân biệt; cùng một stylesheet; logo SVG; không ảnh hỏng, HTTP lỗi hoặc JavaScript pageerror.
- **Liên hệ**: 4 trường bắt buộc báo lỗi; dữ liệu hợp lệ báo thành công mô phỏng và reset; có cấu hình iframe Google Maps và đường dẫn mở bản đồ. Không lưu/gửi biểu mẫu.
- **Đăng nhập/đăng ký**: báo lỗi trống; email/mật khẩu; mật khẩu xác nhận không khớp; thành công mô phỏng; tab bằng bàn phím; localStorage không chứa thông tin đăng nhập.
- **Tuyển dụng**: 3 vị trí; nút ứng tuyển chọn đúng vị trí và đặt focus; kiểm tra trường bắt buộc; chặn URL không phải HTTP(S); dữ liệu đúng báo demo; không lưu hồ sơ.
- **FAQ**: 10 câu; tìm không dấu; trạng thái không có kết quả; mở/đóng bằng details/summary.
- **Tin tức**: 3 bài, trang chi tiết, link từ trang chủ; ID không tồn tại/`constructor` được xử lý an toàn; icon tài khoản dẫn đến trang Đăng nhập.
- **Axe-core 4.10.3**: không phát hiện vi phạm tự động WCAG 2 A/AA và WCAG 2.1 AA trên 7 loại trang mới/cập nhật: Giới thiệu, Tin tức, Bài viết, Liên hệ, FAQ, Tài khoản, Tuyển dụng.
- **12 nhóm hồi quy giỏ/checkout đạt** sau đổi tên: giỏ/drawer, thay đổi số lượng, persist, tổng tiền, responsive, lỗi biểu mẫu, phí giao hàng, đơn demo, tồn kho, JSON hỏng, mua ngay, chặn storage và không có pageerror.

## Đã kiểm tra ở phần mua sắm

Đã chạy lại và đạt **50 phép kiểm tra** danh mục: lọc kết hợp và reset; 5 kiểu sort; sale/new/price; grid/list/load more; tìm không dấu; XSS; wishlist; quick view; gallery; giá/tồn kho biến thể; giới hạn số lượng; tabs; gợi ý tìm kiếm bằng bàn phím; ID sai; pageerror. Tên thương hiệu trong bộ kiểm tra đã được điều chỉnh theo sisimimi.

Tổng mẫu: 2 phần `daily-dog-chicken`, biến thể 1 kg → **370.000 ₫** chưa gồm vận chuyển. Giao tiêu chuẩn 30.000 ₫, miễn phí từ 599.000 ₫; nhanh 50.000 ₫. Đơn demo có mã `SISIMIMI-...`, không lưu dữ liệu người nhận và không gửi đơn thật.

## Giới hạn minh bạch

- Chưa xác nhận Firefox, Edge, Safari hoặc thiết bị thật. Đã thử cài Firefox bằng Playwright nhưng mạng trả **403 Domain forbidden** từ nguồn tải trình duyệt, nên không thể chạy Firefox trong môi trường này.
- Cần chạy lại trên nhiều trình duyệt ở máy nộp bài theo đề. Không thay việc kiểm tra đó bằng khẳng định “tương thích mọi trình duyệt”.
- Trình duyệt môi trường chặn `file://`; đã xác minh qua HTTP/Live Server. Source dùng script classic và tài nguyên cục bộ, không cần backend. localStorage trên `file:` tùy chính sách trình duyệt.
- Google Maps cần Internet. Đã xác minh cấu hình nhúng/đường dẫn; chưa xác nhận nội dung Google tải thành công trong mạng đám mây hạn chế.
- Audit accessibility tự động không thay thế kiểm tra thủ công với trình đọc màn hình.
- Không có backend, xác thực, thanh toán, email hoặc tuyển dụng thật; đúng phạm vi frontend.

## Checklist trên máy nộp bài

- [ ] Chrome: 10 trang bắt buộc, giỏ, form, điều hướng, mobile.
- [ ] Edge: lặp lại luồng mua sắm, login/register demo và FAQ.
- [ ] Firefox: giỏ/localStorage, gallery, dialog, form và responsive.
- [ ] Google Maps hiển thị khi có Internet.
- [ ] Mở báo cáo PowerPoint, kiểm tra font và sửa nội dung thuyết trình theo bài nộp thực tế.
