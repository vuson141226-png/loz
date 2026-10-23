# Đối chiếu đề bài Thiết kế Web — sisimimi

## I. Tối thiểu 10 trang frontend, không framework, không database

| Mục | Triển khai | Cách kiểm tra |
| --- | --- | --- |
| 1. Homepage + logo SVG | `index.html`, `assets/icons/logo.svg` | Hero ảnh cún, danh mục, sản phẩm, nội dung; logo link về trang chủ |
| 2. About Us | `about.html` | Lịch sử giả lập 2024–2026, sứ mệnh, tầm nhìn, giá trị, 3 nhân vật đội ngũ minh họa |
| 3. Products/Services | `products.html` | 24 món, ảnh/tên/giá; tìm kiếm và bộ lọc; card dẫn chi tiết có mô tả |
| 4. Product Detail | `product.html?id=...` | 3 hình, mô tả, giá/biến thể, thông số, đánh giá mẫu, tồn kho và thêm giỏ |
| 5. News/Blog | `blog.html`, `article.html?id=...` | 3 bài có tiêu đề/ảnh/ngày/tóm tắt; nhấn đọc sang trang chi tiết |
| 6. Contact Us | `contact.html` | Form 5 trường; thông tin liên hệ mẫu; iframe Google Maps tải khi nhấn nút |
| 7. FAQ | `faq.html` | 10 câu hỏi; tìm kiếm, không có kết quả, mở/đóng bằng chuột/bàn phím |
| 8. Login/Register | `login.html` | 2 tab; form kiểm tra email, mật khẩu giả, xác nhận mật khẩu; thành công mô phỏng |
| 9. Shopping Cart | `cart.html` | Sửa số lượng, xóa, tổng tiền; checkout và kết quả demo riêng |
| 10. Careers | `careers.html` | 3 vị trí, công việc, yêu cầu, quyền lợi; nút chọn vị trí và form ứng tuyển |

Có 14 file HTML: 10 loại trang bắt buộc và 4 trang bổ sung (bài viết, yêu thích, checkout, kết quả).

## II. Các lưu ý kỹ thuật

| Yêu cầu | Thực hiện / giới hạn |
| --- | --- |
| Layout CSS | Grid/Flexbox trong `css/style.css`; không có framework hoặc thư viện UI |
| Định dạng và màu thống nhất; animation/transition | Header/footer, font và design tokens chung; hover/focus/transition nhẹ; reduced motion |
| `<title>` riêng từng trang | 14 title phân biệt; trang bài viết đổi title theo bài |
| Điều hướng nhất quán, có hiệu ứng | Header/footer chung; mega menu, trạng thái trang đang xem, mobile menu |
| Dễ đọc, phối màu hài hòa, icon nhất quán | Forest green/ivory/apricot; SVG; focus rõ; kiểm tra contrast tự động |
| External stylesheet chung | Mọi HTML cùng dùng duy nhất `css/style.css` |
| Ít nhất 8 ảnh | 72 ảnh sản phẩm SVG, 3 ảnh bài viết, fallback và ảnh hero; logo SVG riêng |
| Thử nhiều trình duyệt | Đã chạy Chromium. Firefox tải bị mạng môi trường từ chối 403; cần thử thêm Edge/Firefox/Safari trên máy nộp bài. Không ghi nhận các trình duyệt đó là đã đạt |
| Responsive | Đã kiểm tra 14 trang × 6 độ rộng 320–1440 px; không tràn ngang |

## III. Phần bàn giao

- `sisimimi.zip`: toàn bộ source frontend và tài liệu.
- `docs/BAO_CAO_SISIMIMI.pptx`: giới thiệu website, công nghệ, sitemap, các luồng và kết quả kiểm tra.
- **Không làm phần nhóm/bảng phân công Excel**, theo yêu cầu bổ sung của người dùng. Tên gói là `sisimimi.zip`, không tự đặt số nhóm.

## Kịch bản trình diễn

1. Trang chủ → Sản phẩm → lọc Chó → mở một món → đổi biến thể → thêm giỏ.
2. Mở drawer → sửa số lượng → xem giỏ → checkout demo → mã đơn minh họa.
3. Mở Tin tức → đọc chi tiết; Liên hệ → thử form sai rồi đúng; FAQ → tìm câu hỏi.
4. Đăng ký → thử mật khẩu không khớp rồi đúng; Tuyển dụng → chọn vị trí → gửi form demo.
5. Thu nhỏ màn hình, thử Tab/Escape và menu mobile.
