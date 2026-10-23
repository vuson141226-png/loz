// 1. Thông báo ngắn: textContent giúp nội dung luôn được xử lý như văn bản.
let toastTimer;
function showToast(message, showCartLink) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.replaceChildren();
  const text = document.createElement('span');
  text.className = 'toast-message';
  text.textContent = message;
  toast.appendChild(text);
  if (showCartLink) {
    const link = document.createElement('a');
    link.className = 'toast-link';
    link.href = 'cart.html';
    link.textContent = 'Xem giỏ →';
    toast.appendChild(link);
  }
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'toast-close';
  closeButton.setAttribute('aria-label', 'Đóng thông báo');
  closeButton.innerHTML = '<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  toast.appendChild(closeButton);
  function hideToast() {
    toast.classList.remove('show');
    // Phần tử đang ẩn không được nhận focus bàn phím.
    toast.inert = true;
  }
  closeButton.addEventListener('click', hideToast);
  toast.addEventListener('mouseenter', function () { clearTimeout(toastTimer); }, { once: true });
  toast.addEventListener('focusin', function () { clearTimeout(toastTimer); }, { once: true });
  toast.inert = false;
  toast.classList.add('show');
  toastTimer = setTimeout(hideToast, 5200);
}

// 2. Menu thu gọn: đóng bằng Escape, bấm ngoài, chọn liên kết hoặc đổi kích thước.
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
const mobileScreen = window.matchMedia('(max-width: 1024px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (menuToggle && mainNav) {
  mainNav.classList.add('menu-enhanced');
  function setMenuOpen(open, returnFocus) {
    const isOpen = mobileScreen.matches && open;
    mainNav.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    menuToggle.innerHTML = '<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' + (isOpen ? '<path d="m6 6 12 12M18 6 6 18"/>' : '<path d="M4 6h16M4 12h16M4 18h16"/>') + '</svg>';
    mainNav.inert = mobileScreen.matches && !isOpen;
    if (mobileScreen.matches && !isOpen) mainNav.setAttribute('aria-hidden', 'true');
    else mainNav.removeAttribute('aria-hidden');
    if (!isOpen) {
      const dropdown = mainNav.querySelector('.nav-more');
      if (dropdown) dropdown.open = false;
    }
    if (isOpen) {
      // Toggle nằm sau nav trong HTML: đưa focus vào menu để Tab đi qua các liên kết.
      requestAnimationFrame(function () {
        // Chờ khung hình tiếp để visibility của transition đã chuyển sang visible.
        requestAnimationFrame(function () {
          if (!mainNav.classList.contains('open')) return;
          const firstLink = mainNav.querySelector('a');
          if (firstLink) firstLink.focus({ preventScroll: true });
        });
      });
    }
    if (returnFocus) menuToggle.focus();
  }
  menuToggle.addEventListener('click', function (event) {
    // Dừng nổi bọt để click SVG không bị hiểu thành click ngoài sau khi đổi icon.
    event.stopPropagation();
    setMenuOpen(!mainNav.classList.contains('open'));
  });
  mainNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (mainNav.classList.contains('open') && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
    const dropdown = mainNav.querySelector('.nav-more');
    if (dropdown && !dropdown.contains(event.target)) dropdown.open = false;
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (mainNav.classList.contains('open')) setMenuOpen(false, true);
    const dropdown = mainNav.querySelector('.nav-more');
    if (dropdown && dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
  });
  mobileScreen.addEventListener('change', function () { setMenuOpen(false, mobileScreen.matches && mainNav.contains(document.activeElement)); });
  setMenuOpen(false);
}
const header = document.querySelector('.site-header');
if (header) {
  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 15); }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}
// Đánh dấu nhóm Khám phá khi đang xem một trang phụ.
if (document.querySelector('.nav-more .active')) document.querySelector('.nav-more summary').classList.add('active');

// 3. Lọc thực đơn: kết hợp danh mục với từ khóa tìm kiếm.
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

// 4. Chi tiết món: đọc ID trên URL, chỉ dùng dữ liệu món được viết sẵn trong products.js.
const detailContainer = document.getElementById('product-detail');
if (detailContainer) {
  const requestedId = Number(new URLSearchParams(window.location.search).get('id') || 1);
  const product = products.find(function (item) { return item.id === requestedId; });
  if (!product) {
    detailContainer.innerHTML = '<div class="empty-state"><h1>Không tìm thấy món ăn</h1><p>Món bạn tìm có thể không nằm trong thực đơn minh họa.</p><a class="button" href="products.html">Quay lại thực đơn ↗</a></div>';
    document.getElementById('related-products').parentElement.hidden = true;
  } else {
    document.title = product.name + ' | S Chicken';
    detailContainer.innerHTML = '<div class="detail-layout"><div class="detail-image"><img src="images/' + product.image + '" alt="' + product.name + ' — ảnh minh họa" width="500" height="400"></div><div class="detail-copy"><p class="eyebrow">' + product.category + ' · S CHICKEN</p><h1>' + product.name + '</h1><p class="detail-price">' + formatPrice(product.price) + '</p><p>' + product.description + ' Mỗi phần ăn là một chút niềm vui để bạn thưởng thức cùng những người thân yêu.</p><h2>Thành phần & lưu ý dị ứng</h2><p>' + product.ingredients + '</p><label for="detail-quantity">Số lượng (1–99)</label><div class="purchase-row"><div class="quantity-control"><button id="quantity-minus" aria-label="Giảm số lượng" disabled>−</button><input id="detail-quantity" type="number" min="1" max="99" step="1" value="1" aria-label="Số lượng món ăn"><button id="quantity-plus" aria-label="Tăng số lượng">+</button></div><button class="button" id="detail-add">Thêm vào giỏ hàng ↗</button></div><a class="text-link detail-cart-link" href="cart.html">Đến giỏ hàng của bạn →</a><p class="muted">Ảnh và thành phần minh họa. Không sử dụng thông tin này thay cho tư vấn chế độ ăn thực tế.</p></div></div>';
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
    const productBadges = { 1: 'Được yêu thích', 2: 'Cay mê ly', 3: 'Bán chạy', 4: 'Combo tiết kiệm', 7: 'Vị mới', 11: 'Đi cùng hội bạn' };
    const plusIcon = '<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>';
    const arrowIcon = '<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
    const related = products.filter(function (item) { return item.id !== product.id; }).slice(0, 4);
    document.getElementById('related-products').innerHTML = related.map(function (item) {
      const badge = productBadges[item.id] ? '<span class="product-badge">' + productBadges[item.id] + '</span>' : '';
      return '<article class="product-card">' +
        '<div class="product-visual">' + badge + '<a class="product-image" href="product-detail.html?id=' + item.id + '"><img src="images/' + item.image + '" alt="' + item.name + ' — hình minh họa" width="480" height="360" loading="lazy"></a></div>' +
        '<div class="product-info"><span class="product-category">' + item.category + '</span><h3><a href="product-detail.html?id=' + item.id + '">' + item.name + '</a></h3><p>' + item.description + '</p>' +
        '<div class="product-bottom"><strong>' + formatPrice(item.price) + '</strong><button class="add-button" data-add="' + item.id + '" aria-label="Thêm ' + item.name + ' vào giỏ">' + plusIcon + '<span>Thêm món</span></button></div>' +
        '<a class="detail-link" href="product-detail.html?id=' + item.id + '">Xem chi tiết ' + arrowIcon + '</a></div></article>';
    }).join('');
    // Liên kết đi tiếp trong hành trình mua hàng dùng cùng icon với các thẻ món.
    document.querySelector('.detail-cart-link').innerHTML = 'Đến giỏ hàng của bạn ' + arrowIcon;
  }
}

// 5. Accordion: đo chiều cao thật, chạy transition rồi trả height về auto.
// Thuộc tính hidden chỉ được bật sau khi đóng xong để vẫn có hiệu ứng mượt.
document.querySelectorAll('.faq-question').forEach(function (button) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;
  let closeTimer;
  panel.style.overflow = 'hidden';
  panel.style.transition = 'height 260ms ease, opacity 260ms ease';
  function finishTransition() {
    if (button.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
    else panel.hidden = true;
  }
  panel.addEventListener('transitionend', function (event) { if (event.propertyName === 'height') finishTransition(); });
  button.addEventListener('click', function () {
    clearTimeout(closeTimer);
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    const item = button.closest('.faq-item');
    if (item) item.classList.toggle('is-open', opening);
    button.querySelector('b').textContent = opening ? '−' : '+';
    panel.inert = !opening;
    if (reducedMotion.matches) {
      panel.style.transition = 'none';
      panel.hidden = !opening;
      panel.style.height = 'auto';
      panel.style.opacity = opening ? '1' : '0';
      return;
    }
    panel.style.transition = 'height 260ms ease, opacity 260ms ease';
    if (opening) {
      panel.hidden = false;
      panel.style.height = '0px';
      panel.style.opacity = '0';
      panel.getBoundingClientRect(); // Xác nhận trạng thái đầu trước khi đổi chiều cao.
      panel.style.height = panel.scrollHeight + 'px';
      panel.style.opacity = '1';
    } else {
      panel.style.height = panel.getBoundingClientRect().height + 'px';
      panel.getBoundingClientRect();
      panel.style.height = '0px';
      panel.style.opacity = '0';
    }
    closeTimer = setTimeout(finishTransition, 290);
  });
});
document.querySelectorAll('.read-more').forEach(function (button) {
  button.addEventListener('click', function () {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
    button.textContent = expanded ? 'Đọc thêm ↗' : 'Thu gọn ↑';
  });
});

// 6. Tab tài khoản: chỉ chuyển giao diện, không tạo hoặc lưu tài khoản.
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

// 7. Form: dùng quy tắc HTML5 và trạng thái lỗi dễ thấy ngay dưới biểu mẫu.
document.querySelectorAll('[data-demo-form]').forEach(function (form) {
  const message = form.querySelector('.form-message');
  const fields = form.querySelectorAll('input, textarea, select');
  if (!message) return;
  form.noValidate = true;
  if (!message.id) message.id = form.dataset.demoForm + '-message';
  function validateField(field) {
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) field.setCustomValidity('Vui lòng điền đầy đủ thông tin, không chỉ nhập khoảng trắng.');
    else if (field.type === 'email' && field.validity.typeMismatch) field.setCustomValidity('Email chưa đúng định dạng, ví dụ: ban@example.com.');
    else if (field.validity.patternMismatch) field.setCustomValidity('Số điện thoại cần từ 9 đến 16 ký tự hợp lệ.');
    else if (field.validity.tooShort) field.setCustomValidity('Nội dung quá ngắn. Vui lòng nhập ít nhất ' + field.minLength + ' ký tự.');
    if (field.name === 'confirmPassword' && field.value && field.value !== form.elements.password.value) field.setCustomValidity('Mật khẩu xác nhận chưa khớp. Bạn kiểm tra lại nhé!');
    const invalid = !field.checkValidity();
    field.classList.toggle('is-invalid', invalid);
    field.setAttribute('aria-invalid', String(invalid));
    if (invalid) field.setAttribute('aria-describedby', message.id);
    else field.removeAttribute('aria-describedby');
    return !invalid;
  }
  fields.forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      if (message.classList.contains('success')) {
        message.textContent = '';
        message.classList.remove('success');
      }
    });
    field.addEventListener('change', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    message.classList.remove('error', 'success');
    message.textContent = '';
    let firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      message.textContent = firstInvalid.validationMessage;
      message.classList.add('error');
      firstInvalid.focus();
      return;
    }
    const messages = {
      contact: 'Đã ghi nhận lời nhắn mô phỏng! Không có dữ liệu nào được gửi đi.',
      careers: 'Đã tiếp nhận hồ sơ giả lập! Không có hồ sơ thực tế được gửi đi.',
      login: 'Đăng nhập mô phỏng thành công! Không có tài khoản hay phiên xác thực thực tế.',
      register: 'Đăng ký mô phỏng thành công! Không lưu tài khoản hoặc mật khẩu.'
    };
    message.textContent = messages[form.dataset.demoForm];
    message.classList.add('success');
    form.reset();
    fields.forEach(function (field) { field.setCustomValidity(''); field.removeAttribute('aria-invalid'); field.classList.remove('is-invalid'); });
  });
});
document.querySelectorAll('.apply-job').forEach(function (button) {
  button.addEventListener('click', function () {
    document.getElementById('job-position').value = button.dataset.position;
    document.getElementById('application').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    document.getElementById('job-position').focus({ preventScroll: true });
  });
});

// 8. Hiện dần khi cuộn: HTML mặc định vẫn hiển thị nếu không có JavaScript.
// Chỉ những khối còn ở dưới màn hình mới được chuẩn bị hiệu ứng.
const revealSections = document.querySelectorAll('main > section, .product-card, .news-card');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.01 });
  revealSections.forEach(function (section) {
    if (section.getBoundingClientRect().top < window.innerHeight) return;
    section.classList.add('reveal', 'reveal-ready');
    revealObserver.observe(section);
  });
  reducedMotion.addEventListener('change', function () {
    if (!reducedMotion.matches) return;
    revealSections.forEach(function (section) { section.classList.add('is-visible'); });
    revealObserver.disconnect();
  });
}
