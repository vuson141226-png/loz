# PAWS & CO.

**Yêu thương trong từng điều nhỏ.** Website thương mại điện tử thú cưng dạng frontend demo, viết hoàn toàn bằng HTML5, CSS3 và Vanilla JavaScript. Không có framework, npm, Node.js, backend, database hoặc bước build.

## Chạy dự án

Mở **`index.html`** bằng trình duyệt, hoặc mở thư mục `pet-shop` trong VS Code và dùng **Live Server**. Nên dùng cùng địa chỉ và cổng trong quá trình thử để giỏ hàng và yêu thích giữ chung một origin.

Nếu máy có Python, có thể phục vụ tệp tĩnh bằng lệnh sau từ thư mục `pet-shop`:

```sh
python3 -m http.server 8010
```

Python chỉ là lựa chọn thay thế Live Server, không phải phụ thuộc hay backend của website. Không cần cài package. Tất cả ảnh, font và dữ liệu đều nằm cục bộ; không cần Internet để mua sắm demo.

## Sitemap và luồng chính

`index.html` → `products.html` → `product.html?id=daily-dog-chicken` → cart drawer / `cart.html` → `checkout.html` → `success.html?id=...`

- `wishlist.html`: danh sách đã lưu trên trình duyệt.
- `about.html`: câu chuyện thương hiệu, FAQ, hướng dẫn giao hàng và liên hệ mẫu.
- Trang chủ: danh mục, bán chạy, ưu đãi, mới về, câu chuyện, đánh giá, 3 bài viết đọc trong dialog, newsletter demo.
- Danh sách: tìm kiếm tên/mô tả/thương hiệu, lọc thú cưng/danh mục/thương hiệu/giá/đánh giá/ưu đãi/mới, 5 kiểu sắp xếp, grid/list, xem thêm, xóa lọc và trạng thái trống.
- Chi tiết: 3 hình minh họa, 2 biến thể, giá riêng, tồn kho riêng, số lượng, tabs, liên quan, yêu thích, mua ngay.
- Checkout: kiểm tra biểu mẫu, giao hàng tiêu chuẩn/nhanh, thanh toán minh họa, xác nhận hiểu quy trình demo, mã đơn cục bộ.

## Kiến trúc

```text
pet-shop/
  index.html                 Trang chủ
  products.html              Danh sách
  product.html               Chi tiết qua query id
  wishlist.html              Yêu thích
  cart.html                  Giỏ hàng
  checkout.html              Biểu mẫu mô phỏng
  success.html               Kết quả và mã đơn demo
  about.html                 Giới thiệu và FAQ
  css/
    variables.css            Màu sắc, spacing, font, tokens
    base.css                 Reset, typography, accessibility
    layout.css               Header, homepage, footer, layouts
    components.css           Cards, forms, catalog, dialogs, checkout
    responsive.css           480 / 768 / 1024 / 1440 px, reduced motion
  js/
    data.js                  24 sản phẩm, 6 danh mục, 48 biến thể
    storage.js               Dữ liệu trình duyệt, validate, tính tiền/tồn kho
    products.js              Card, lọc, gallery, chi tiết, wishlist
    cart.js                  Drawer, giỏ, checkout, kết quả
    ui.js                    Shell, search, menu, dialog, toast
    main.js                  Khởi tạo và nội dung trang
  assets/
    fonts/                   Outfit + Inter và giấy phép SIL OFL
    icons/paw.svg            Favicon
    images/                  Hero, 72 SVG sản phẩm, 3 ảnh bài viết, fallback
```

Các script classic `defer` dùng namespace `window.Paws`, không dùng ES modules hoặc fetch dữ liệu bắt buộc, nên tránh yêu cầu máy chủ khi mở file. HTML dùng semantic landmarks; nội dung danh mục/giỏ render từ dữ liệu tập trung.

## Design system

- Forest green `#264C40`, warm apricot `#E6A56A`, warm ivory `#F9F7F2`.
- Heading Outfit, body Inter, font cục bộ với `font-display: swap`.
- Spacing nhất quán, bo góc mềm, Flexbox/Grid, breakpoint 480/768/1024/1440 px.
- Focus rõ, nhãn icon, skip link, native dialog có Escape/focus return, native FAQ, tabs bàn phím, giảm chuyển động theo `prefers-reduced-motion`.

## Lưu trữ và an toàn dữ liệu

`paws-cart-v1` chỉ lưu ID sản phẩm, ID biến thể và số lượng. Giá luôn lấy lại từ catalog. Dữ liệu được kiểm tra kiểu, loại bỏ ID không có, gộp dòng trùng và giới hạn tồn kho.

`paws-wishlist-v1` lưu danh sách ID hợp lệ. Giỏ và yêu thích đồng bộ qua sự kiện `storage` giữa các tab cùng origin.

`paws-order-v1` lưu **bản tóm tắt đơn demo gần nhất**: mã đơn, sản phẩm, số lượng và tổng tiền. **Không lưu tên, địa chỉ, email, điện thoại, mật khẩu hoặc thông tin thẻ.** Không gửi biểu mẫu hoặc dữ liệu sang máy chủ. Newsletter không lưu địa chỉ email.

Nếu trình duyệt chặn localStorage, website thông báo; giỏ chỉ tồn tại trong trang hiện tại. Checkout ngăn chuyển sang trang thành công nếu không thể lưu kết quả để tránh thông báo sai. Tùy trình duyệt, lưu trữ trên `file:` có thể khác nhau giữa các trang; dùng Live Server để bảo đảm giỏ hàng cùng origin.

## Phạm vi demo

- Thương hiệu, sản phẩm, review, tồn kho, địa chỉ và ngày đăng đều là minh họa, không phải cửa hàng hay hàng hóa đang kinh doanh.
- Không xác thực, không gửi đơn thật, không thanh toán, không email, không vận chuyển, không đồng bộ giữa các thiết bị. Mã đơn chỉ có trên trình duyệt tạo đơn.
- Giao tiêu chuẩn demo 30.000 ₫, miễn phí từ 599.000 ₫; giao nhanh 50.000 ₫. Giá hiển thị bằng `Intl.NumberFormat('vi-VN')`.
- Icon tài khoản mở giải thích chế độ khách. Social mở thông tin thương hiệu demo; không giả mạo tài khoản/cổng thanh toán thật.
- Nội dung chăm sóc thú cưng mang tính tham khảo, không thay thế tư vấn thú y.

## Ảnh và font

- Hero là ảnh đã xử lý/crop bằng công cụ tạo ảnh dựa trên ảnh cún người dùng cung cấp, không phải bản gốc pixel-identical. File: `assets/images/hero-puppy.png`.
- 72 ảnh sản phẩm và 3 ảnh bài viết là SVG minh họa riêng cho dự án; không đại diện ảnh sản phẩm thương mại thật. Mỗi sản phẩm có ba góc trình bày riêng. Có fallback cục bộ khi ảnh lỗi.
- Outfit và Inter tải từ kho Google Fonts chính thức. Giấy phép ở `assets/fonts/*-OFL.txt`.

Xem [VALIDATION.md](VALIDATION.md) để biết kiểm thử thực tế và giới hạn đã xác định.
