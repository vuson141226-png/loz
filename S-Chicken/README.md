# S Chicken — Professional Redesign

Website thức ăn nhanh gồm **10 trang HTML, 15 món, 5 danh mục**, viết bằng HTML5, CSS3 và JavaScript thuần. Không dùng framework, thư viện giao diện, backend, npm hay bước build.

## Chạy website

1. Mở thư mục `S-Chicken` trong Visual Studio Code.
2. Cài tiện ích **Live Server** (Ritwick Dey) nếu chưa có.
3. Nhấp phải `index.html` → **Open with Live Server**.
4. Dùng cùng địa chỉ/cổng trong lúc thử để localStorage giữ chung giỏ hàng.

Có thể mở HTML trực tiếp, nhưng localStorage trên `file:` không thống nhất giữa trình duyệt; nên dùng Live Server. Nếu có Python, lệnh `python3 -m http.server 8000` cũng phục vụ được tệp tĩnh. Python không phải phụ thuộc của website và không phải backend của dự án.

HTML, CSS, JavaScript, ảnh và font đều nằm cục bộ. Google Maps nhúng và liên kết mạng xã hội cần Internet.

## Những gì thay đổi trong bản nâng cấp

- **Trang chủ làm mới:** hero nền kem, ảnh gà giòn lớn, typography đậm, CTA chính/phụ, danh mục, 4 món bán chạy, combo, câu chuyện và tin tức.
- **Hệ thống thiết kế chung:** đỏ `#C62828`, đỏ đậm `#991B1B`, vàng `#FFB800`, nền kem `#FFF8EF`, chữ `#222222`/`#666666`; container tối đa 1240 px; thang khoảng cách 8/16/24/32/48/64/96 px.
- **Typography cục bộ:** Barlow Condensed ExtraBold cho tiêu đề, Be Vietnam Pro cho nội dung; có fallback Arial/sans-serif, không gọi Google Fonts lúc chạy.
- **Thẻ món:** ảnh cùng tỷ lệ, badge nổi bật, thông tin co giãn để giá/nút thẳng hàng, hover nâng nhẹ và zoom ảnh.
- **Mobile:** menu SVG chuyển động, focus/inert/aria; nút dễ bấm; ở 320 px thẻ món về một cột để giữ chữ dễ đọc.
- **Tương tác:** FAQ mở/đóng mượt; reveal khi cuộn bằng IntersectionObserver; toast có link xem giỏ; trạng thái lỗi/thành công rõ ràng; tôn trọng `prefers-reduced-motion`.
- **Ảnh:** thêm ảnh minh họa AI riêng cho gà giòn/gà sốt; giữ ghi chú về ảnh dùng chung và nguồn ảnh.
- **Mã nguồn:** HTML xuống dòng/thụt lề, CSS chia nhóm và JS có chú thích tiếng Việt. Vẫn mở chạy trực tiếp, không có quy trình build.

Xem [audit, design system và bàn giao](docs/REDESIGN.md), [kết quả kiểm thử](docs/KIEM_THU.md).

## Cấu trúc dự án

```text
S-Chicken/
├── index.html                 # Trang chủ
├── about.html                 # Câu chuyện, đội ngũ và chất lượng
├── products.html              # Thực đơn, lọc và tìm kiếm
├── product-detail.html        # Chi tiết theo ?id=
├── blog.html                  # 6 tin tức, mở rộng nội dung
├── contact.html               # Liên hệ và bản đồ minh họa
├── faq.html                   # 9 câu hỏi
├── login.html                 # Đăng nhập/đăng ký mô phỏng
├── cart.html                  # Giỏ và xác nhận đơn giả lập
├── careers.html               # 3 vị trí và form ứng tuyển
├── css/style.css              # Design tokens, thành phần, responsive
├── js/products.js             # Dữ liệu 15 món
├── js/cart.js                 # Lưu giỏ, tính tổng và thao tác món
├── js/main.js                 # Menu, lọc, chi tiết, FAQ, form, reveal
├── images/                    # Ảnh, logo và SVG cục bộ
├── fonts/                     # Font cục bộ và giấy phép OFL
├── docs/                      # Audit, kiểm thử và tài liệu báo cáo
└── README.md
```

Chỉ bổ sung `fonts` để typography đồng nhất khi không có Internet và các ảnh cần cho nâng cấp; không thêm thư viện hoặc mã chạy máy chủ.

## Cách đọc và chỉnh sửa mã

### CSS và bố cục

- Khối `:root` đầu `css/style.css` giữ màu, font, khoảng cách, radius và chiều rộng container.
- CSS chia mục: nền tảng; header; trang chủ; product card; tin tức/footer; trang phụ; form; FAQ/tuyển dụng; giỏ/toast; tablet/mobile.
- Grid chia cột nội dung; Flexbox căn menu, giá/nút và nội dung thẻ.
- `clamp()` cho cỡ tiêu đề co giãn. Media query ở 1200/1024/680/359 px điều chỉnh bố cục.
- Product card là flex theo cột, `.product-bottom { margin-top: auto; }` giữ hàng giá/nút ở đáy khi mô tả khác độ dài.

### HTML và sản phẩm

- Mỗi trang có title riêng, một vùng main, header/footer và liên kết thật.
- Header/footer được viết sẵn để dễ đọc và điều hướng ngay cả khi không có JavaScript. Khi đổi menu cần cập nhật cả 10 trang.
- Mảng `products` gồm ID, tên, danh mục, giá nguyên theo đồng, tên ảnh, mô tả và thành phần.
- Thực đơn và 4 món ở trang chủ có thẻ HTML viết sẵn. Khi đổi tên/giá/ảnh cần cập nhật `products.js` **và** thẻ HTML tương ứng; thẻ liên quan ở trang chi tiết lấy từ mảng.
- `URLSearchParams` đọc ID trên URL, `find` lấy món tương ứng. ID không hợp lệ có trạng thái riêng.
- `data-category` và `data-name` giúp JavaScript lọc/ẩn thẻ theo danh mục và từ khóa. Danh mục trên URL được kiểm tra trước khi dùng.

### Giỏ hàng

- localStorage giữ khóa `schicken-cart`, chỉ lưu `{ id, quantity }`; không lưu tài khoản hoặc dữ liệu nhạy cảm.
- `loadCart()` xử lý JSON sai, phần tử null, ID không tồn tại, số lượng không hợp lệ và ID trùng.
- Mỗi món tối đa 99 phần, tối thiểu 1; nút Xóa món dùng để bỏ khỏi giỏ.
- Tổng tiền = tổng của giá trong `products.js` × số lượng. Không lấy giá từ localStorage.
- `renderCart()` vẽ lại danh sách; event delegation xử lý nút vừa tạo. Giữ focus sau tăng/giảm/xóa để thao tác bàn phím tiếp tục được.
- Sự kiện `storage` đồng bộ nhiều tab tại chỗ. Nếu trình duyệt chặn lưu, giỏ chỉ giữ trong trang đang mở và có thông báo.
- Xác nhận đơn mở dialog rồi làm trống giỏ; không thu tiền hoặc gửi đơn thực tế.

### Hiệu ứng và biểu mẫu

- Menu dùng `.open` và CSS opacity/transform; JavaScript quản lý `aria-expanded`, `inert`, Escape, bấm ngoài và đổi viewport.
- FAQ đo `scrollHeight` để chuyển chiều cao; sau khi đóng xong mới bật `hidden`, tránh đóng đột ngột. CSS giảm chuyển động khi người dùng yêu cầu.
- IntersectionObserver thêm `.is-visible` khi khối vào màn hình. HTML không có class ẩn sẵn nên nếu JS/observer không chạy, nội dung vẫn hiển thị.
- Toast tạo các node bằng DOM; nội dung dùng `textContent`. Có link giỏ và nút đóng.
- Form dùng quy tắc HTML5 (`required`, email, pattern, minlength) và JavaScript kiểm tra khoảng trắng/xác nhận mật khẩu. Báo lỗi cạnh form và đặt `aria-invalid` cho trường sai.
- **Không dùng mật khẩu thật khi thử.** Không có xác thực, lưu tài khoản, gửi email hoặc gửi hồ sơ. Tất cả thông báo đều ghi rõ mô phỏng.

## Nguồn ảnh và font

Xem [images/SOURCES.md](images/SOURCES.md) cho nguồn và phạm vi sử dụng. Ảnh AI được ghi rõ là minh họa, không phải ảnh món thật của cơ sở kinh doanh. Một số biến thể dùng chung ảnh. Thay bằng ảnh tự chụp nếu cần thể hiện khẩu phần chính xác.

Một số ảnh cũ lấy từ Foodie/Grilli của codewithsadee. Grilli có giấy phép MIT đính kèm; Foodie ghi “free to use” nhưng không cấp phép riêng cho từng ảnh. Nếu dùng thương mại, kiểm tra quyền từng ảnh hoặc thay bằng ảnh có quyền rõ ràng. Không nhận hình minh họa là cửa hàng/nhân sự thật.

Font lấy từ kho chính thức [Google Fonts](https://github.com/google/fonts): Barlow Condensed và Be Vietnam Pro, giấy phép SIL Open Font License trong `fonts/*-OFL.txt`.

## Bảng đối chiếu yêu cầu giảng viên

| Yêu cầu | Phần đã triển khai |
| --- | --- |
| HTML/CSS/JS thuần, không framework/backend/build | 10 HTML, 1 CSS và 3 JS |
| Logo SVG, nhận diện và điều hướng đồng nhất | Header/footer toàn bộ trang, `images/logo.svg` |
| Trang chủ đầy đủ 8 nhóm nội dung | Hero, giới thiệu, 4 món, ưu đãi, lý do chọn, tin tức và footer |
| Giới thiệu đủ câu chuyện/sứ mệnh/tầm nhìn/giá trị/đội ngũ | `about.html` |
| Tối thiểu 12 món, 5 danh mục | 15 món và lọc/tìm tại `products.html` |
| Chi tiết ID, thành phần, số lượng, liên quan, đánh giá | `product-detail.html`, `main.js` |
| 6 bài viết mở rộng | `blog.html` |
| Liên hệ 5 trường và Google Maps địa điểm demo | `contact.html` |
| Tối thiểu 8 FAQ, accordion mượt | 9 câu tại `faq.html` |
| Form đăng nhập/đăng ký, kiểm tra mật khẩu | `login.html`, không lưu tài khoản/mật khẩu |
| Giỏ thêm/tăng/giảm/xóa/lưu/tính tổng/trống/xác nhận giả | `cart.html`, `cart.js` |
| 3 vị trí tuyển dụng, quyền lợi, form | `careers.html` |
| Hover, zoom, reveal, menu/FAQ, toast, reduced motion | `style.css` và `main.js` |
| Ảnh cục bộ, alt, lazy loading dưới màn hình đầu | `images`, thẻ img trong HTML/JS |
| Responsive điện thoại, tablet, desktop | Media queries; kết quả thực chạy trong tài liệu kiểm thử |
| Dàn ý PowerPoint và mẫu Excel phân công | `docs/BAO_CAO.md`, `docs/PHAN_CONG.csv` |

## Tự kiểm tra trước khi nộp

1. Mở từng trang và xem Console không báo lỗi JavaScript.
2. Lọc đủ 5 danh mục; tìm có/không có kết quả; thử URL danh mục.
3. Mở `product-detail.html?id=3`; thử ID 999, số lượng 1 và 99.
4. Thêm 2 burger 49.000 ₫ và 1 gà 39.000 ₫ → **137.000 ₫**. Tăng gà lên 2 → **176.000 ₫**.
5. Tải lại, mở tab khác, giảm/xóa món và xem giỏ cập nhật. Xóa hết để thử trạng thái trống.
6. Xác nhận đơn mô phỏng; không nhập thông tin thẻ.
7. Thử form trống, email sai, điện thoại sai, khoảng trắng, mật khẩu không khớp rồi dữ liệu đúng.
8. Mở/đóng FAQ và bài viết; thử nút ứng tuyển chọn đúng vị trí.
9. Thử 320,375,480,768,1024,1440 px; dùng bàn phím cho menu, Escape và biểu mẫu.
10. Bật cài đặt Reduce motion để kiểm tra nội dung vẫn hiện. Chạy riêng trên Chrome, Edge và Firefox ở máy nộp bài.

Kết quả trong môi trường hiện tại được báo chính xác trong [KIEM_THU.md](docs/KIEM_THU.md). Chromium không thay thế việc kiểm tra riêng trên Chrome/Edge/Firefox. Bản đồ và mạng xã hội cần mạng ngoài; địa chỉ, số điện thoại, ưu đãi, nhân sự và mọi giao dịch đều là demo.
