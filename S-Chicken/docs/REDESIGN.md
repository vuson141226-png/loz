# S Chicken — Bàn giao Professional Redesign

Bản nâng cấp ngày 23/10/2026 giữ nguyên 10 trang và các chức năng Front-end. Website vẫn chỉ dùng HTML5, CSS3, JavaScript thuần; không có framework, backend, npm hoặc bước build.

## 1. Audit bản trước

| Phát hiện | Quyết định nâng cấp |
| --- | --- |
| Hero đỏ toàn khối, ảnh gà dùng lặp giữa nhiều loại, trang chủ di động dài và nặng về trang trí | Hero nền kem, tiêu đề cô đọng, ảnh gà mới tách nền, CTA rõ và banner ưu đãi riêng |
| Chưa có hệ thống chữ mang cá tính; nhiều chú thích và nút quá nhỏ trên mobile | Font tiêu đề Barlow Condensed đậm, nội dung Be Vietnam Pro; tăng kích thước điều khiển và phân cấp thông tin |
| Product card chưa có badge; nút có thể lệch theo số dòng mô tả | Khung ảnh đồng nhất, badge, card Flexbox theo cột, hàng giá/nút được đẩy xuống đáy |
| Trang phụ dùng cách trình bày khá giống nhau | Giữ hệ thống chung nhưng FAQ có vùng giới thiệu, đăng nhập có khối thương hiệu, giỏ có khối tổng kết rõ |
| Icon chính còn là ký tự; thiếu chuyển động khi cuộn và khi đóng/mở | SVG đồng bộ, reveal bằng IntersectionObserver, menu/FAQ chuyển động nhẹ |
| Form báo lỗi chủ yếu bằng trình duyệt; giỏ vẽ lại làm mất focus | Thêm lỗi/thành công ngay dưới form, aria-invalid, giữ focus điều khiển giỏ và trả focus khi đóng dialog |
| HTML bị dồn trên dòng dài | Định dạng lại toàn bộ HTML, chia CSS thành các mục và giữ chú thích JavaScript bằng tiếng Việt |
| Các tính năng chọn món/giỏ/form cơ bản đã hoạt động | Bảo toàn 15 món, 5 danh mục, tìm kiếm, ID chi tiết, localStorage, 6 bài viết, 9 FAQ, 3 vị trí tuyển dụng |

Trong quá trình kiểm tra còn sửa liên kết danh mục “Burger & món kèm”: ký tự `&` phải mã hóa thành `%26` để không bị hiểu là dấu tách tham số URL. Sửa thêm vùng thông báo form rỗng có viền do khoảng trắng khi định dạng HTML.

## 2. Design system

| Thành phần | Quy ước |
| --- | --- |
| Màu chính | Đỏ `#C62828`, đỏ đậm `#991B1B` |
| Màu nhấn | Vàng `#FFB800`, dùng cho ưu đãi và điểm nhấn |
| Nền | Kem `#FFF8EF`, trắng `#FFFFFF` |
| Chữ | Chính `#222222`, phụ `#666666` |
| Font tiêu đề | Barlow Condensed ExtraBold, lưu cục bộ; dự phòng Arial Narrow/Arial |
| Font nội dung | Be Vietnam Pro Regular/SemiBold, lưu cục bộ; dự phòng Arial/sans-serif |
| Container | Tối đa 1240 px, lề thu gọn theo màn hình |
| Khoảng cách | Các biến 8, 16, 24, 32, 48, 64, 96 px trong `:root` |
| Bo góc | 8 px cho nút/điều khiển, 16 px cho card/khối chính |
| Button | Màu đỏ hoặc vàng, hover nâng nhẹ, trạng thái active/focus/disabled rõ |
| Product card | Ảnh cùng tỷ lệ, nội dung Flexbox co giãn, badge, giá nổi bật và nút thêm |
| Breakpoint chính | Menu mobile ở ≤1024 px; bố cục mobile ở ≤680 px; sản phẩm về một cột ở <360 px |
| Chuyển động | Tương tác nhỏ khoảng 220–300 ms; reveal khoảng 600 ms, ảnh hero xuất hiện nhẹ |

Mọi màu, font, spacing và kích thước chung được khai báo tại đầu `css/style.css`. Font được tải từ tệp cục bộ, không cần Google Fonts CDN. Giấy phép SIL OFL của hai bộ font được giữ trong `fonts/`.

## 3. Các tệp thay đổi

- **10 tệp HTML:** `index.html`, `about.html`, `products.html`, `product-detail.html`, `blog.html`, `contact.html`, `faq.html`, `login.html`, `cart.html`, `careers.html`. Làm mới header/footer, icon SVG, cấu trúc nội dung, badge, đường dẫn và định dạng mã.
- **`css/style.css`:** thay bằng hệ thống thiết kế dùng chung, bố cục theo từng mục đích, responsive, trạng thái tương tác và chế độ giảm chuyển động.
- **`js/products.js`:** cập nhật ảnh minh họa gà, giữ ID và giá để giỏ cũ tiếp tục tương thích.
- **`js/main.js`:** menu, toast có liên kết giỏ, FAQ chuyển động và bài viết mở/thu gọn, reveal, kiểm tra form và các chi tiết UX.
- **`js/cart.js`:** tăng khả năng phục hồi dữ liệu, thông báo thao tác, giữ focus và trình bày giỏ theo giao diện mới.
- **`images/hero-chicken.webp`, `images/hero-chicken-cutout.webp`, `images/chicken-sauce.webp`:** ảnh minh họa AI mới, bản cắt nền dùng cho hero; nguồn và giới hạn được ghi ở `images/SOURCES.md`.
- **`fonts/`:** ba tệp font cần thiết và hai giấy phép OFL. Thêm thư mục để font chạy cục bộ, không thêm công cụ build.
- **`README.md`, `docs/REDESIGN.md`, `docs/KIEM_THU.md`:** cách chạy/chỉnh sửa, giải thích nâng cấp và kết quả kiểm thử thực tế.

Tài liệu báo cáo `docs/BAO_CAO.md` được bổ sung phần bảo vệ bản nâng cấp; mẫu Excel từ bản trước được giữ lại. Ảnh món và nhân sự đều có tính minh họa; ảnh AI không được mô tả là món ăn thực tế của cửa hàng.

## 4. Giải thích những đoạn code quan trọng

### Card cao đều và nút thẳng hàng

`.product-card` và `.product-info` dùng `display: flex; flex-direction: column`. `.product-info` có `flex: 1`, còn `.product-bottom` có `margin-top: auto`. Vì vậy phần giá/nút nằm ở đáy card dù mô tả dài ngắn khác nhau. Khung ảnh dùng `aspect-ratio` và `object-fit: contain` để món không bị méo.

### Menu di động

JavaScript thêm lớp `menu-enhanced`, thay đổi lớp `open` và thuộc tính `aria-expanded`. `inert` ngăn các liên kết trong menu đã đóng nhận focus. CSS chuyển `opacity` và `transform` thay cho xuất hiện đột ngột. Escape đóng menu và trả focus về nút mở; đổi sang desktop sẽ bỏ inert và aria-hidden để các liên kết dùng được bình thường.

### Reveal khi cuộn

Nội dung HTML mặc định hiển thị. Chỉ khi có JavaScript, có IntersectionObserver và người dùng không yêu cầu giảm chuyển động thì khối ở dưới màn hình mới được gắn trạng thái chờ. Khi xuất hiện, thêm `is-visible` rồi ngừng quan sát khối đó. Ngưỡng quan sát nhỏ để section thực đơn rất dài không bị mắc ở trạng thái trong suốt trên điện thoại thấp.

### FAQ và tin tức

Khi mở, JavaScript bỏ `hidden`, đo `scrollHeight` rồi chuyển chiều cao từ 0 đến giá trị đó. Khi đóng, chuyển ngược về 0 và đặt lại `hidden` sau khi chuyển động kết thúc. `aria-expanded` luôn cập nhật. Khi bật Reduce motion, chuyển trạng thái FAQ trực tiếp để người dùng không phải chờ hiệu ứng. Bài viết tin tức dùng nút Đọc thêm/Thu gọn và thuộc tính hidden, không dùng hiệu ứng đo chiều cao.

### Giỏ hàng và focus bàn phím

Vẫn chỉ lưu `{ id, quantity }` ở khóa `schicken-cart`. Khi khôi phục, bỏ phần tử sai kiểu/ID không tồn tại/số lượng không hợp lệ, gộp ID trùng và giới hạn 99 phần mỗi món. Sau khi vẽ lại danh sách, tìm điều khiển tương ứng bằng ID và hành động để trả focus. Khi chạm giới hạn, focus số lượng thay vì nút đã disabled.

### Form và thông báo

Form vẫn có các ràng buộc HTML5. JavaScript kiểm tra tính hợp lệ, khoảng trắng, email và xác nhận mật khẩu; thêm `aria-invalid`, lớp lỗi và thông báo rõ ngay dưới form. Nội dung thông báo dùng `textContent`. Không gửi dữ liệu, không tạo tài khoản hay lưu mật khẩu. Toast sau thêm món có liên kết đến giỏ để tiếp tục hành trình mua hàng.

## 5. Đối chiếu yêu cầu nâng cấp

| Yêu cầu | Phần đáp ứng |
| --- | --- |
| Chỉ HTML/CSS/JS thuần; giữ 10 trang | Toàn bộ dự án, không có framework/build/backend |
| Nhận diện, typography, spacing thống nhất | `:root`, font cục bộ, logo SVG, header/footer dùng chung kiểu |
| Trang chủ khác biệt rõ rệt | Hero kem với ảnh mới, CTA, danh mục, card có badge, banner đỏ, câu chuyện và SVG lợi ích |
| Product grid và hành trình đặt món | Lọc/tìm kiếm → chi tiết → số lượng → toast có Xem giỏ → giỏ |
| Giỏ trực quan, tổng cập nhật | Danh sách món, điều chỉnh số lượng, xóa, khối tổng kết, dialog xác nhận demo |
| Login/form có trạng thái lỗi và thành công | `.is-invalid`, `.form-message.error`, `.form-message.success`, aria-invalid |
| Micro-interactions | Hover nút/card/ảnh, sticky header, menu/FAQ có chuyển động, reveal, toast |
| Reduced motion và focus | Media query, kiểm tra trong JS, focus-visible, inert, Escape và phục hồi focus |
| Responsive 320–480/481–1024/>1024 | Kiểm tra 6 độ rộng, thêm ca 320×568 và giỏ có món |
| Tệp ảnh cục bộ, alt, lazy loading | Tệp ảnh có sẵn cục bộ, alt ghi minh họa, lazy ở dưới màn hình; ảnh mới là minh họa AI |
| Code dễ đọc, hướng dẫn và bàn giao | HTML định dạng lại, CSS chia mục, chú thích JS, README và tài liệu này |
| Không mất chức năng cũ | Các luồng hồi quy đã thực thi; chi tiết tại `KIEM_THU.md` |

Bảng đối chiếu yêu cầu bài tập gốc, cấu trúc thư mục và hướng dẫn tự kiểm tra nằm trong [README](../README.md).

## 6. Chạy và kiểm tra

Mở thư mục `S-Chicken` bằng VS Code, chạy `index.html` với Live Server. Không có bước cài npm. Dùng cùng địa chỉ và cổng để localStorage được chia sẻ giữa các trang.

Đã thực thi kiểm thử bằng Chromium thật trong môi trường phát triển. Kết quả, các ca thử và giới hạn được ghi riêng trong [KIEM_THU.md](KIEM_THU.md). Cần chạy riêng trên Chrome, Edge và Firefox ở máy nộp bài; không coi Chromium là bằng chứng đã kiểm tra cả ba trình duyệt.
