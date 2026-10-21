# S Chicken — Website bài tập Thiết kế Web

Website tĩnh gồm **10 trang HTML**, dùng HTML5, CSS3 và JavaScript thuần. Không dùng framework, backend, cơ sở dữ liệu hay công cụ build. Không cần `npm install`.

## 1. Bố cục và phong cách

- Màu chính: đỏ `#C62828`; nhấn: vàng cam `#FFB300`; nền: trắng và kem `#FFF8EF`; chữ: `#222222`.
- Font Arial/sans-serif. Bố cục Flexbox và Grid; responsive theo các mốc 1200, 980 và 600 px.
- Trang chủ: hero gà sốt lớn, danh mục, 4 món bán chạy, banner combo, câu chuyện, 4 lý do chọn S, 3 tin tức và footer.
- Header/footer có sẵn trong từng HTML nên vẫn điều hướng khi tắt JavaScript. Dropdown Khám phá chứa liên kết phụ; menu hamburger dành cho màn hình nhỏ.
- Logo SVG do dự án tự thiết kế, sử dụng thống nhất. Hiệu ứng xuất hiện ảnh hero và hover nhẹ; tôn trọng cài đặt giảm chuyển động.

## 2. Chạy website

1. Mở thư mục `S-Chicken` trong Visual Studio Code.
2. Cài tiện ích **Live Server** của Ritwick Dey nếu chưa có.
3. Nhấp phải `index.html`, chọn **Open with Live Server**.
4. Dùng cùng một địa chỉ và cổng trong suốt quá trình thử nghiệm để giỏ hàng được lưu chung.

Có thể mở trực tiếp `index.html`, nhưng localStorage trên giao thức `file:` khác nhau tùy trình duyệt; nên dùng Live Server để kiểm tra chuyển trang và giỏ hàng ổn định.

Nếu máy có Python, có thể dùng lệnh tùy chọn sau ngay trong thư mục `S-Chicken`:

```sh
python3 -m http.server 8000
```

Đây chỉ là công cụ phục vụ tệp tĩnh để thử nghiệm, không phải backend của dự án. Website không cần Python khi chạy bằng Live Server hoặc được đưa lên dịch vụ hosting tĩnh.

## 3. Cấu trúc và vai trò từng tệp

```text
S-Chicken/
├── index.html                 # Trang chủ
├── about.html                 # Thương hiệu, đội ngũ, cam kết
├── products.html              # 15 món, bộ lọc và tìm kiếm
├── product-detail.html        # Chi tiết món theo ?id=
├── blog.html                  # 6 bài viết, mở rộng nội dung
├── contact.html               # Form và Google Maps minh họa
├── faq.html                   # 9 câu hỏi dạng accordion
├── login.html                 # Hai biểu mẫu đăng nhập/đăng ký mô phỏng
├── cart.html                  # Giỏ hàng, tổng tiền và xác nhận giả lập
├── careers.html               # 3 vị trí và form ứng tuyển
├── css/style.css              # CSS dùng chung, chia mục có chú thích
├── js/products.js             # Mảng dữ liệu 15 món + định dạng VNĐ
├── js/cart.js                 # Đọc/lưu giỏ, số lượng, tổng tiền
├── js/main.js                 # Menu, bộ lọc, chi tiết, FAQ, form
├── images/                    # 14 hình cục bộ, gồm logo
├── docs/BAO_CAO.md             # Dàn ý 10 slide, phân vai, câu hỏi bảo vệ
├── docs/PHAN_CONG.csv          # Mẫu mở được bằng Excel
└── README.md
```

## 4. Cách đọc và chỉnh sửa

### Nội dung và giao diện

- Đổi màu tại khối `:root` đầu `css/style.css`.
- Đổi chữ trong HTML tương ứng. Header/footer được viết trực tiếp ở cả 10 trang để sinh viên dễ đọc. Khi đổi menu, cần cập nhật cả 10 trang.
- CSS chia 7 nhóm: nền tảng, header/footer, trang chủ, trang phụ, biểu mẫu/FAQ, giỏ hàng, responsive.
- Không cần hiểu công cụ tạo mã hay chạy một bước sinh tệp nào: tất cả HTML bàn giao là mã hoàn chỉnh.

### Dữ liệu sản phẩm

Mỗi món trong `js/products.js` có `id`, `name`, `category`, `price`, `image`, `description`, `ingredients`. `price` là số nguyên tính bằng đồng, không phải chuỗi có dấu chấm.

- Trang chi tiết đọc ID bằng `URLSearchParams`, rồi tìm món bằng `find`.
- Thẻ thực đơn nằm sẵn trong `products.html`, và 4 thẻ nổi bật nằm trong `index.html`. Khi đổi tên, giá hoặc thêm món, cập nhật các thẻ tương ứng để thống nhất với `products.js`.
- Ảnh lấy từ thư mục `images`. Nếu đổi ảnh, đổi cả trường `image` trong dữ liệu và `src` ở các thẻ HTML tương ứng.
- Có thể tự chụp 15 ảnh đúng từng món để thay ảnh minh họa đang được dùng chung. Không đổi ID cũ khi muốn giữ tính nhất quán của giỏ hàng đã lưu.

### Giỏ hàng

- localStorage dùng khóa `schicken-cart`, chỉ lưu mảng `{ id, quantity }`.
- Giới hạn mỗi món 1–99 phần; giảm ở mức 1 không tự xóa, nút Xóa món dùng để xóa.
- Tính tổng từ dữ liệu giá đáng tin cậy trong `products.js`, không lấy giá từ localStorage.
- Loại bỏ ID và số lượng không hợp lệ khi khôi phục giỏ, xử lý JSON hỏng.
- Nếu trình duyệt chặn lưu trữ, vẫn thao tác trong trang đang mở nhưng không bảo đảm giữ giỏ khi chuyển trang; có thông báo khi thêm món.
- Nhấn Thanh toán sẽ mở hộp xác nhận giả lập và làm trống giỏ. Không thu tiền, gửi đơn hoặc gọi API.

### Biểu mẫu

- HTML dùng `required`, `type="email"`, `pattern`, `minlength` để hỗ trợ kiểm tra dữ liệu.
- JavaScript chặn chuỗi chỉ có khoảng trắng và kiểm tra hai mật khẩu phải giống nhau.
- Thông báo thành công dùng `textContent`; không chèn dữ liệu người dùng vào HTML.
- Không gửi form, không lưu mật khẩu, không tạo phiên đăng nhập. **Chỉ dùng thông tin giả khi thử.**
- Nếu làm hệ thống thực tế trong tương lai sẽ cần backend và bảo mật ngoài phạm vi bài tập.

## 5. Hình ảnh và nguồn sử dụng

Toàn bộ hình đã có trong `images`, không cần tải thêm để chạy. Gồm 8 ảnh raster và 6 SVG. Ảnh món chỉ mang tính minh họa; nhiều biến thể gà dùng chung một ảnh. Các loại trà và khoai dùng minh họa SVG tự thiết kế. Hình nhân viên là SVG minh họa gốc, không phải ảnh nhân sự thật.

| Tệp | Nguồn |
| --- | --- |
| `hero-banner.png`, `about-banner.png`, `food-menu-2.png`, `food-menu-3.png`, `blog-1.jpg`, `blog-2.jpg`, `blog-3.jpg` | https://github.com/codewithsadee/foodie/tree/master/assets/images |
| `about-banner.jpg` | https://github.com/codewithsadee/grilli/tree/master/assets/images |
| `logo.svg`, `fries.svg`, `soda.svg`, `lemon-tea.svg`, `peach-tea.svg`, `team.svg` | Minh họa SVG tự thiết kế cho dự án |

README của Foodie ghi dự án “free to use” và không có giấy phép riêng. Bản lưu thông tin nguồn nằm ở `images/SOURCES.md`. Grilli dùng giấy phép MIT, đã giữ bản giấy phép tại `images/grilli-LICENSE.txt`. Kho nguồn không cung cấp thông tin tác giả/quyền riêng từng ảnh; trước khi dùng thương mại, cần kiểm tra thêm quyền hình ảnh hoặc thay bằng ảnh tự chụp/được cấp phép rõ ràng. Logo và minh họa gốc không sao chép logo của nguồn ảnh.

Google Maps cần Internet; bản đồ khu vực Chùa Bộc chỉ minh họa, không xác nhận cửa hàng thật tại địa chỉ đó. Facebook, Instagram, YouTube dẫn đến trang chủ nền tảng, không giả nhận là kênh chính thức của S Chicken.

## 6. Bảng đối chiếu yêu cầu

| Yêu cầu | Đã triển khai ở đâu |
| --- | --- |
| HTML5, CSS3, JS thuần; không framework/backend/build | Toàn bộ 10 HTML, 1 CSS, 3 JS |
| Logo SVG; màu sắc, font thống nhất | `images/logo.svg`, `css/style.css` |
| Trang chủ đủ hero, giới thiệu, 4 món, khuyến mãi, lý do chọn, tin tức | `index.html` |
| Câu chuyện, sứ mệnh, tầm nhìn, giá trị, chất lượng, đội ngũ | `about.html` |
| Tối thiểu 12 món và 5 danh mục | `products.html`: 15 món; lọc + tìm kiếm |
| Chi tiết theo ID, thành phần, số lượng, món liên quan, đánh giá | `product-detail.html`, `main.js` |
| Tối thiểu 6 bài, ảnh/ngày/mô tả/đọc thêm | `blog.html`: 6 bài |
| Địa chỉ demo, thông tin mẫu, đủ 5 trường, bản đồ | `contact.html` |
| Tối thiểu 8 FAQ mở/đóng | `faq.html`: 9 câu |
| Đăng nhập/đăng ký; xác nhận mật khẩu, không lưu mật khẩu | `login.html`, `main.js` |
| Giỏ thêm, tăng/giảm/xóa, tính tổng, trống, tiếp tục mua, thanh toán giả | `cart.html`, `cart.js` |
| Tuyển dụng 3 vị trí, quyền lợi, mô tả/yêu cầu và form | `careers.html` |
| Header/footer thống nhất, liên kết đủ 10 trang, active, hamburger | Tất cả HTML; chi tiết món có breadcrumb về thực đơn |
| Mỗi trang có title riêng | Thẻ `<title>` mỗi HTML; trang chi tiết đổi theo món |
| Grid/Flexbox, hover/transition/animation/responsive | `css/style.css` |
| Tối thiểu 8 hình, ưu tiên 12–20 | 14 hình cục bộ, gồm 8 ảnh raster + 6 SVG |
| Mã dễ đọc, chú thích tiếng Việt, dùng addEventListener | 3 tệp JS, CSS chia mục |
| Dàn ý báo cáo, Excel, chức năng bảo vệ, hỏi đáp | `docs/BAO_CAO.md`, `docs/PHAN_CONG.csv` |

## 7. Cách tự kiểm tra trước khi nộp

1. Mở DevTools → Console; tải từng trang để kiểm tra lỗi JavaScript.
2. Tại Thực đơn, lần lượt lọc 5 danh mục, thử tìm có/không có kết quả.
3. Mở hai món khác nhau; kiểm tra tên/giá đổi theo ID. Thử `?id=999`.
4. Thêm 2 burger 49.000 ₫ và 1 gà 39.000 ₫ → tổng **137.000 ₫**. Tăng gà lên 2 → **176.000 ₫**. Xóa burger → **78.000 ₫**.
5. Tải lại và chuyển trang, kiểm tra giỏ vẫn còn. Xóa hết để kiểm tra trạng thái trống.
6. Thanh toán mô phỏng: xem hộp xác nhận, giỏ được xóa, không nhập thẻ.
7. Form: thử thiếu trường, email sai, điện thoại sai, khoảng trắng, mật khẩu không khớp, sau đó dữ liệu đúng.
8. Thử mở/đóng cả FAQ và bài viết; thử nút ứng tuyển chọn đúng vị trí.
9. Dùng chế độ thiết bị ở 375, 768, 1440 px, kiểm tra không tràn ngang; thử hamburger và phím Escape.
10. Lặp lại trên Chrome, Edge và Firefox ở máy nộp bài. Xóa dữ liệu demo trong DevTools → Application → Local Storage nếu cần.

Kiểm thử tự động trong môi trường hiện tại dùng Chromium; không coi đó là xác minh riêng trên Chrome, Edge hay Firefox. Google Maps bên ngoài không được xác nhận tải thành công trong môi trường đám mây bị giới hạn mạng. Không có chức năng giao dịch, đăng nhập hoặc gửi biểu mẫu thực tế.
