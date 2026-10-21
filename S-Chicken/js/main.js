// 1. Thông báo ngắn, menu trên điện thoại.
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
}
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
menuToggle.addEventListener('click', function () {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Mở menu');
    menuToggle.textContent = '☰';
    menuToggle.focus();
  }
});
// Đánh dấu nhóm Khám phá khi đang xem một trang phụ.
if (document.querySelector('.nav-more .active')) document.querySelector('.nav-more summary').classList.add('active');

// 2. Lọc thực đơn: kết hợp danh mục với từ khóa tìm kiếm.
const productList = document.getElementById('product-list');
if (productList) {
  let selectedCategory = new URLSearchParams(window.location.search).get('category') || 'Tất cả';
  const filterButtons = document.querySelectorAll('.filter-button');
  const search = document.getElementById('product-search');
  const validCategory = Array.from(filterButtons).some(function (button) { return button.dataset.category === selectedCategory; });
  if (!validCategory) selectedCategory = 'Tất cả';
  function filterProducts() {
    let count = 0;
    const keyword = search.value.trim().toLocaleLowerCase('vi');
    filterButtons.forEach(function (button) {
      const active = button.dataset.category === selectedCategory;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.product-wrapper').forEach(function (item) {
      const matchCategory = selectedCategory === 'Tất cả' || item.dataset.category === selectedCategory;
      const matchName = item.dataset.name.toLocaleLowerCase('vi').includes(keyword);
      item.hidden = !(matchCategory && matchName);
      if (!item.hidden) count++;
    });
    document.getElementById('result-count').textContent = count + ' món ngon đang chờ bạn';
    document.getElementById('no-products').hidden = count > 0;
  }
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      selectedCategory = button.dataset.category;
      filterProducts();
    });
  });
  search.addEventListener('input', filterProducts);
  filterProducts();
}

// 3. Chi tiết món: lấy ID trên URL và tra cứu mảng products.
const detailContainer = document.getElementById('product-detail');
if (detailContainer) {
  const requestedId = Number(new URLSearchParams(window.location.search).get('id') || 1);
  const product = products.find(function (item) { return item.id === requestedId; });
  if (!product) {
    detailContainer.innerHTML = '<div class="empty-state"><h1>Không tìm thấy món ăn</h1><p>Món bạn tìm có thể không nằm trong thực đơn minh họa.</p><a class="button" href="products.html">Quay lại thực đơn ↗</a></div>';
    document.getElementById('related-products').parentElement.hidden = true;
  } else {
    document.title = product.name + ' | S Chicken';
    detailContainer.innerHTML = '<div class="detail-layout"><div class="detail-image"><img src="images/' + product.image + '" alt="' + product.name + ' — ảnh minh họa" width="500" height="400"></div><div class="detail-copy"><p class="eyebrow">' + product.category + ' · S CHICKEN</p><h1>' + product.name + '</h1><p class="detail-price">' + formatPrice(product.price) + '</p><p>' + product.description + ' Mỗi phần ăn là một chút niềm vui để bạn thưởng thức cùng những người thân yêu.</p><h2>Thành phần & lưu ý dị ứng</h2><p>' + product.ingredients + '</p><label for="detail-quantity">Số lượng (1–99)</label><div class="purchase-row"><div class="quantity-control"><button id="quantity-minus" aria-label="Giảm số lượng" disabled>−</button><input id="detail-quantity" type="number" min="1" max="99" step="1" value="1" aria-label="Số lượng món ăn"><button id="quantity-plus" aria-label="Tăng số lượng">+</button></div><button class="button" id="detail-add">Thêm vào giỏ hàng ↗</button></div><p class="muted">Ảnh và thành phần minh họa. Không sử dụng thông tin này thay cho tư vấn chế độ ăn thực tế.</p></div></div>';
    const quantity = document.getElementById('detail-quantity');
    function updateQuantity(value) {
      quantity.value = Math.max(1, Math.min(99, Math.floor(Number(value) || 1)));
      document.getElementById('quantity-minus').disabled = Number(quantity.value) === 1;
      document.getElementById('quantity-plus').disabled = Number(quantity.value) === 99;
    }
    document.getElementById('quantity-minus').addEventListener('click', function () { updateQuantity(Number(quantity.value) - 1); });
    document.getElementById('quantity-plus').addEventListener('click', function () { updateQuantity(Number(quantity.value) + 1); });
    quantity.addEventListener('change', function () { updateQuantity(quantity.value); });
    document.getElementById('detail-add').addEventListener('click', function () {
      updateQuantity(quantity.value);
      addToCart(product.id, Number(quantity.value));
    });
    let related = products.filter(function (item) { return item.id !== product.id; }).slice(0, 4);
    document.getElementById('related-products').innerHTML = related.map(function (item) {
      return '<article class="product-card"><a class="product-image" href="product-detail.html?id=' + item.id + '"><img src="images/' + item.image + '" alt="' + item.name + ' — ảnh minh họa" width="300" height="240" loading="lazy"></a><div class="product-info"><span class="product-category">' + item.category + '</span><h3><a href="product-detail.html?id=' + item.id + '">' + item.name + '</a></h3><p>' + item.description + '</p><div class="product-bottom"><strong>' + formatPrice(item.price) + '</strong><button class="add-button" data-add="' + item.id + '" aria-label="Thêm ' + item.name + ' vào giỏ">+</button></div><a class="detail-link" href="product-detail.html?id=' + item.id + '">Xem chi tiết ↗</a></div></article>';
    }).join('');
  }
}

// 4. Accordion FAQ và đọc thêm tin tức: đổi trạng thái hidden và aria-expanded.
document.querySelectorAll('.faq-question, .read-more').forEach(function (button) {
  button.addEventListener('click', function () {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
    if (button.classList.contains('read-more')) button.textContent = expanded ? 'Đọc thêm ↗' : 'Thu gọn ↑';
    else button.querySelector('b').textContent = expanded ? '+' : '−';
  });
});

// 5. Chuyển biểu mẫu tài khoản (không tạo tài khoản hoặc lưu mật khẩu).
document.querySelectorAll('.auth-tab').forEach(function (button) {
  button.addEventListener('click', function () {
    document.querySelectorAll('.auth-tab').forEach(function (tab) {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
      document.getElementById(tab.dataset.form).hidden = !active;
    });
  });
});

// 6. Kiểm tra form bằng HTML5 và JavaScript trước khi hiển thị thành công giả lập.
document.querySelectorAll('[data-demo-form]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    message.classList.remove('error');
    message.textContent = '';
    // Không chấp nhận chuỗi chỉ có khoảng trắng ở trường bắt buộc.
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let hasBlank = false;
    fields.forEach(function (field) {
      if (!field.value.trim()) hasBlank = true;
    });
    if (hasBlank) {
      message.textContent = 'Vui lòng điền đầy đủ thông tin, không chỉ nhập khoảng trắng.';
      message.classList.add('error');
      return;
    }
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.dataset.demoForm === 'register' && form.elements.password.value !== form.elements.confirmPassword.value) {
      message.textContent = 'Mật khẩu xác nhận chưa khớp. Bạn kiểm tra lại nhé!';
      message.classList.add('error');
      return;
    }
    const messages = {
      contact: 'Đã ghi nhận lời nhắn mô phỏng! Không có dữ liệu nào được gửi đi.',
      careers: 'Đã tiếp nhận hồ sơ giả lập! Không có hồ sơ thực tế được gửi đi.',
      login: 'Đăng nhập mô phỏng thành công! Không có tài khoản hay phiên xác thực thực tế.',
      register: 'Đăng ký mô phỏng thành công! Không lưu tài khoản hoặc mật khẩu.'
    };
    message.textContent = messages[form.dataset.demoForm];
    form.reset();
  });
});

document.querySelectorAll('.apply-job').forEach(function (button) {
  button.addEventListener('click', function () {
    document.getElementById('job-position').value = button.dataset.position;
    document.getElementById('application').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('job-position').focus({ preventScroll: true });
  });
});
