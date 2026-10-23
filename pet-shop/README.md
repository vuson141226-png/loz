# sisimimi — Website thú cưng

**Yêu thương trong từng điều nhỏ.** Website bài tập frontend bằng HTML5, CSS3 và JavaScript thuần. Có **14 trang**, đủ **10 loại trang bắt buộc** trong đề. Không framework, backend, Node.js, database hoặc build.

## Chạy website

1. Giải nén `sisimimi.zip`.
2. Mở `index.html`, hoặc mở thư mục trong VS Code rồi chạy bằng **Live Server**.
3. Dùng cùng địa chỉ/cổng khi thử để giỏ hàng và yêu thích giữ chung localStorage.

Mọi ảnh, font, dữ liệu và code đều nằm cục bộ. Riêng Google Maps cần Internet; nhấn **Tải bản đồ Google** ở trang Liên hệ. Live Server được khuyến nghị vì quy tắc localStorage trên đường dẫn `file:` khác nhau giữa trình duyệt.

Nếu muốn phục vụ tệp bằng Python, chạy `python3 -m http.server 8011` trong thư mục chứa `index.html`. Đây chỉ là công cụ phục vụ tệp tùy chọn, không phải backend hay phụ thuộc của website.

## Các trang theo đề

| STT đề | Trang | File |
| --- | --- | --- |
| 1 | Trang chủ, logo SVG | `index.html` |
| 2 | Giới thiệu: lịch sử, sứ mệnh, giá trị, đội ngũ | `about.html` |
| 3 | Danh sách sản phẩm, ảnh, mô tả, giá, bộ lọc | `products.html` |
| 4 | Chi tiết, gallery, thông số, đánh giá, thêm giỏ | `product.html?id=daily-dog-chicken` |
| 5 | Tin tức: ảnh, ngày, tóm tắt, liên kết bài viết | `blog.html` |
| 6 | Liên hệ: form, email, số điện thoại, địa chỉ, Google Maps | `contact.html` |
| 7 | FAQ: 10 câu hỏi, tìm kiếm và mở/đóng | `faq.html` |
| 8 | Đăng nhập/Đăng ký mô phỏng | `login.html` |
| 9 | Giỏ: sửa số lượng, xóa, tổng tiền, checkout | `cart.html` |
| 10 | Tuyển dụng: 3 vị trí, yêu cầu, quyền lợi, form ứng tuyển | `careers.html` |

Trang bổ sung: `article.html?id=nutrition` (bài viết), `wishlist.html`, `checkout.html`, `success.html`.

## Tương tác chính

- 24 sản phẩm, 6 danh mục, 48 biến thể với giá và tồn kho riêng; 3 ảnh cho mỗi món.
- Tìm kiếm, lọc kết hợp, sắp xếp, grid/list, xem thêm, quick view, yêu thích.
- Gallery, tabs mô tả/thông số/đánh giá, số lượng, mua ngay và kiểm tra tồn kho.
- Cart drawer và giỏ đầy đủ; lưu/đồng bộ giỏ và yêu thích giữa các tab cùng origin.
- Checkout kiểm tra biểu mẫu, phí giao hàng và tạo mã đơn `SISIMIMI-...` trên trình duyệt.
- Các form liên hệ, đăng nhập, đăng ký, ứng tuyển, newsletter đều có thông báo sai/đúng và trạng thái đang xử lý.
- Header sticky, mega menu, menu mobile, Escape và focus cho dialog, nút về đầu trang, reduced motion.

## Cấu trúc mã nguồn

- `css/style.css`: **một external stylesheet dùng chung** cho mọi trang, chia phần bằng chú thích. Bao gồm CSS variables, Flexbox, Grid và breakpoint 480/768/1024/1440 px.
- `js/data.js`: dữ liệu sản phẩm, danh mục và đường dẫn ảnh.
- `js/storage.js`: kiểm tra localStorage, tính tiền, giới hạn tồn kho, lưu giỏ/yêu thích/tóm tắt đơn.
- `js/products.js`: card, danh sách, bộ lọc, chi tiết và wishlist.
- `js/cart.js`: drawer, giỏ, checkout và kết quả mô phỏng.
- `js/ui.js`: logo, header/footer chung, menu, search, dialog và toast.
- `js/school.js`: tin tức, bài viết, FAQ và các form theo đề.
- `js/main.js`: khởi tạo và tương tác trang chủ.
- `assets/icons/logo.svg`: logo sisimimi; `assets/images/`: ảnh cún và SVG minh họa cục bộ.
- `docs/DOI_CHIEU_DE_BAI.md`: bảng đối chiếu chi tiết.
- `docs/BAO_CAO_SISIMIMI.pptx`: bản báo cáo giới thiệu website và công nghệ.

Dùng script classic với `defer` và namespace `window.Paws` để chạy khi mở file, không cần fetch hoặc ES module. `Paws` là tên kỹ thuật nội bộ được giữ để tương thích dữ liệu giỏ cũ; thương hiệu hiển thị là **sisimimi**.

## Dữ liệu minh họa và quyền riêng tư

Không có tài khoản, đơn hàng, thanh toán, email hoặc hồ sơ ứng tuyển thật được tạo/gửi. Không nhập mật khẩu thật hoặc dữ liệu cá nhân nhạy cảm. Form không lưu tên, email, điện thoại, địa chỉ, CV hoặc mật khẩu.

localStorage chỉ giữ ID/biến thể/số lượng trong giỏ, ID yêu thích và bản tóm tắt đơn gần nhất. Giá được lấy lại từ catalog. Dữ liệu hỏng được kiểm tra trước khi dùng. Nếu lưu trữ bị chặn, website báo rõ và ngăn thông báo checkout thành công sai.

Thương hiệu, sản phẩm, review, đội ngũ, lịch sử công ty, tin tuyển dụng, địa chỉ và số điện thoại đều là minh họa. Đội ngũ thương hiệu trên trang Giới thiệu không phải thành viên nhóm làm bài. Bản đồ dùng Công viên Tao Đàn làm địa điểm công cộng minh họa, không gắn nhãn shop thật.

Giao tiêu chuẩn demo 30.000 ₫, miễn phí từ 599.000 ₫; giao nhanh 50.000 ₫. Không có dịch vụ vận chuyển kết nối.

## Nguồn và giấy phép

- Layout và SVG sản phẩm là phần thiết kế của dự án; không sử dụng template/framework frontend bên ngoài.
- Hero được xử lý từ ảnh cún người dùng cung cấp; không phải bản gốc pixel-identical.
- Font Outfit và Inter lấy từ kho Google Fonts chính thức; giấy phép SIL OFL ở `assets/fonts/*-OFL.txt`.
- Google Maps là nội dung nhúng bên ngoài, cần mạng và chịu chính sách của Google.
- Audio/video/Flash là gợi ý tùy chọn trong đề, không bổ sung Flash vì không còn được trình duyệt hiện đại hỗ trợ.

Xem [VALIDATION.md](VALIDATION.md) để biết kiểm thử thực tế và giới hạn. Phần thông tin nhóm và bảng phân công Excel không thực hiện theo yêu cầu của bạn.
