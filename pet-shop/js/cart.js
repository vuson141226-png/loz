/* Cart and checkout are a local demonstration. No personal or payment data is saved. */
(function () {
  'use strict';
  const P = window.Paws = window.Paws || {};
  const FREE_SHIPPING = 599000;
  let initialized = false;
  let submitting = false;
  const escape = value => P.escape(String(value == null ? '' : value));
  const shippingPrice = (subtotal, delivery = 'standard') => subtotal === 0 ? 0 : delivery === 'express' ? 50000 : subtotal >= FREE_SHIPPING ? 0 : 30000;
  const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const bag = '<svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 15h24l3 27H9l3-27Z"/><path d="M18 17v-6a6 6 0 0 1 12 0v6"/></svg>';

  function emptyState(compact) {
    return '<div class="empty-state' + (compact ? ' empty-state-compact' : '') + '"><span class="empty-icon">' + bag + '</span><p class="eyebrow">MỘT CHÚT YÊU THƯƠNG ĐANG CHỜ</p><h2>Giỏ hàng còn trống</h2><p>Tìm một món quà nhỏ để người bạn bốn chân thêm vui mỗi ngày.</p><a class="button btn btn-primary" href="products.html">Khám phá sản phẩm ' + arrow + '</a></div>';
  }

  function lineMarkup(line, compact) {
    const p = line.product;
    const variant = line.variant || {};
    const variantId = typeof variant === 'string' ? variant : variant.id;
    const variantLabel = typeof variant === 'string' ? variant : variant.label;
    const stock = Math.min(p.stock, Number.isInteger(variant.stock) ? variant.stock : p.stock);
    const image = p.images && p.images[0] || 'assets/images/fallback.svg';
    return '<article class="cart-line' + (compact ? ' cart-line-compact' : '') + '" data-cart-line="' + escape(p.id) + '" data-variant="' + escape(variantId) + '">' +
      '<a class="cart-line-image" href="product.html?id=' + encodeURIComponent(p.id) + '"><img src="' + escape(image) + '" alt="' + escape(p.name) + ' — sản phẩm minh họa" width="100" height="110" loading="lazy"></a>' +
      '<div class="cart-line-body"><p class="product-brand">' + escape(p.brand || 'PAWS & CO.') + '</p><h3><a href="product.html?id=' + encodeURIComponent(p.id) + '">' + escape(p.name) + '</a></h3><p class="muted cart-variant">' + escape(variantLabel || 'Tiêu chuẩn') + '</p><p class="cart-unit-price">' + P.money(line.unitPrice) + '</p>' +
      '<div class="qty-control" role="group" aria-label="Số lượng ' + escape(p.name) + '">' +
      '<button type="button" data-cart-qty="-1" data-id="' + escape(p.id) + '" data-variant="' + escape(variantId) + '" aria-label="Giảm số lượng ' + escape(p.name) + '"' + (line.quantity <= 1 ? ' disabled' : '') + '>−</button>' +
      '<span aria-live="polite">' + line.quantity + '</span>' +
      '<button type="button" data-cart-qty="1" data-id="' + escape(p.id) + '" data-variant="' + escape(variantId) + '" aria-label="Tăng số lượng ' + escape(p.name) + '"' + (line.quantity >= stock ? ' disabled' : '') + '>+</button></div></div>' +
      '<div class="cart-line-end"><strong>' + P.money(line.lineTotal) + '</strong><button class="text-button remove-button" type="button" data-remove-cart data-id="' + escape(p.id) + '" data-variant="' + escape(variantId) + '" aria-label="Xóa ' + escape(p.name) + ' khỏi giỏ">Xóa</button></div></article>';
  }

  function shippingProgress(subtotal) {
    const remaining = Math.max(0, FREE_SHIPPING - subtotal);
    return '<div class="shipping-progress"><p>' + (remaining ? 'Thêm <strong>' + P.money(remaining) + '</strong> để được miễn phí giao hàng tiêu chuẩn.' : 'Bạn đã được miễn phí giao hàng tiêu chuẩn!') + '</p><div class="shipping-track" role="progressbar" aria-label="Tiến độ miễn phí giao hàng" aria-valuemin="0" aria-valuemax="599000" aria-valuenow="' + Math.min(subtotal, FREE_SHIPPING) + '"><span style="width:' + Math.min(100, subtotal / FREE_SHIPPING * 100).toFixed(2) + '%"></span></div></div>';
  }

  function totalsMarkup(subtotal, shipping) {
    return '<div class="summary-row"><span>Tạm tính</span><strong>' + P.money(subtotal) + '</strong></div><div class="summary-row"><span>Phí giao hàng mô phỏng</span><strong>' + (shipping === 0 ? 'Miễn phí' : P.money(shipping)) + '</strong></div><div class="summary-row summary-total"><span>Tổng cộng</span><strong>' + P.money(subtotal + shipping) + '</strong></div><p class="muted tax-note">Giá và sản phẩm chỉ dùng để minh họa trải nghiệm mua sắm.</p>';
  }

  P.renderCartDrawer = function () {
    const mount = document.getElementById('drawer-content');
    if (!mount) return;
    const lines = P.cartLines();
    if (!lines.length) {
      mount.innerHTML = emptyState(true);
      return;
    }
    const subtotal = P.cartSubtotal();
    mount.innerHTML = shippingProgress(subtotal) + '<div class="drawer-lines">' + lines.map(line => lineMarkup(line, true)).join('') + '</div><div class="drawer-summary">' +
      '<div class="summary-row summary-total"><span>Tạm tính</span><strong>' + P.money(subtotal) + '</strong></div><p class="muted">Phí giao hàng được tính ở bước tiếp theo.</p><a class="button btn btn-primary full-width" href="checkout.html">Tiếp tục đặt hàng demo ' + arrow + '</a><a class="button btn btn-outline full-width" href="cart.html">Xem giỏ hàng (' + P.cartCount() + ')</a><p class="drawer-demo-note">Quy trình minh họa · Không phát sinh thanh toán</p></div>';
  };

  function renderCartPage() {
    const mount = document.getElementById('cart-app');
    if (!mount) return;
    const lines = P.cartLines();
    if (!lines.length) { mount.innerHTML = emptyState(false); return; }
    const subtotal = P.cartSubtotal();
    mount.innerHTML = '<div class="cart-layout"><section class="cart-main" aria-label="Sản phẩm trong giỏ"><div class="section-heading cart-heading"><h2>Những món bạn đã chọn <span class="muted">(' + P.cartCount() + ')</span></h2><a class="text-link" href="products.html">Mua sắm tiếp ' + arrow + '</a></div>' + shippingProgress(subtotal) + '<div class="cart-lines">' + lines.map(line => lineMarkup(line, false)).join('') + '</div></section><aside class="order-summary"><p class="eyebrow">MỘT MÓN QUÀ NHỎ</p><h2>Tóm tắt giỏ hàng</h2>' + totalsMarkup(subtotal, shippingPrice(subtotal)) + '<a class="button btn btn-primary full-width" href="checkout.html">Đặt hàng mô phỏng ' + arrow + '</a><p class="secure-note">Không thu tiền. Không gửi đơn hàng thật.</p><a class="text-link" href="products.html">Tiếp tục khám phá</a></aside></div>';
  }

  function field(id, label, type, autocomplete, placeholder, extra) {
    return '<div class="field' + (id === 'address' ? ' field-full' : '') + '"><label for="' + id + '">' + label + ' <span aria-hidden="true">*</span></label><input id="' + id + '" name="' + id + '" type="' + type + '" autocomplete="' + autocomplete + '" placeholder="' + placeholder + '" required aria-describedby="' + id + '-error"' + (extra || '') + '><span id="' + id + '-error" class="field-error" aria-live="polite"></span></div>';
  }

  function checkoutItems() {
    return P.cartLines().map(line => '<div class="checkout-item"><img src="' + escape(line.product.images[0]) + '" width="64" height="70" alt="' + escape(line.product.name) + '" loading="lazy"><div><h3>' + escape(line.product.name) + '</h3><p class="muted">' + escape(line.variant.label || line.variant.id) + ' · Số lượng ' + line.quantity + '</p></div><strong>' + P.money(line.lineTotal) + '</strong></div>').join('');
  }

  function renderCheckoutSummary() {
    const mount = document.getElementById('checkout-order-summary');
    if (!mount) return;
    const selected = document.querySelector('input[name="delivery"]:checked');
    const subtotal = P.cartSubtotal();
    const shipping = shippingPrice(subtotal, selected ? selected.value : 'standard');
    mount.innerHTML = '<p class="eyebrow">DÀNH CHO NGƯỜI BẠN NHỎ</p><h2>Đơn hàng mô phỏng</h2><div class="checkout-items">' + checkoutItems() + '</div>' + totalsMarkup(subtotal, shipping) + '<p class="secure-note">Không thu tiền · Không gửi đơn hàng thật</p>';
  }

  function renderCheckout() {
    const mount = document.getElementById('checkout-app');
    if (!mount) return;
    if (!P.cartLines().length) { mount.innerHTML = emptyState(false); return; }
    const standard = shippingPrice(P.cartSubtotal());
    mount.innerHTML = '<div class="demo-notice" role="note"><strong>Bạn đang trải nghiệm checkout mô phỏng.</strong> Không có thanh toán hay giao hàng thực tế. Thông tin trong form chỉ được dùng để kiểm tra hợp lệ, không được lưu hoặc gửi đi. Hãy sử dụng thông tin thử nghiệm.</div><div class="checkout-layout"><form id="checkout-form" class="checkout-form" novalidate><section class="checkout-section"><div class="step-title"><span>01</span><h2>Thông tin người nhận</h2></div><p class="muted">Các trường có dấu * là bắt buộc.</p><div class="form-grid">' +
      field('fullName', 'Họ và tên', 'text', 'name', 'Ví dụ: Nguyễn Minh An', ' minlength="2" maxlength="100"') +
      field('phone', 'Số điện thoại', 'tel', 'tel', 'Ví dụ: 0901234567', ' inputmode="tel" maxlength="20"') +
      field('email', 'Email', 'email', 'email', 'ban@example.com', ' maxlength="254"') +
      '<div class="field"><label for="city">Tỉnh / thành phố <span aria-hidden="true">*</span></label><select id="city" name="city" required aria-describedby="city-error"><option value="">Chọn tỉnh / thành phố</option><option value="hcm">TP. Hồ Chí Minh</option><option value="hanoi">Hà Nội</option><option value="danang">Đà Nẵng</option><option value="other">Tỉnh / thành phố khác</option></select><span id="city-error" class="field-error" aria-live="polite"></span></div>' +
      field('address', 'Địa chỉ nhận hàng', 'text', 'street-address', 'Số nhà, đường, phường / xã, quận / huyện', ' minlength="10" maxlength="300"') + '</div></section><fieldset class="checkout-section"><legend class="step-title"><span>02</span><span>Phương thức giao hàng</span></legend><label class="choice-card"><input type="radio" name="delivery" value="standard" checked><span><strong>Giao hàng tiêu chuẩn</strong><small>Dự kiến 2–4 ngày · Thông tin minh họa</small></span><b>' + (standard ? P.money(standard) : 'Miễn phí') + '</b></label><label class="choice-card"><input type="radio" name="delivery" value="express"><span><strong>Giao hàng nhanh</strong><small>Dự kiến 1–2 ngày · Thông tin minh họa</small></span><b>' + P.money(50000) + '</b></label></fieldset><fieldset class="checkout-section"><legend class="step-title"><span>03</span><span>Thanh toán mô phỏng</span></legend><label class="choice-card"><input type="radio" name="payment" value="cod" checked><span><strong>Thanh toán khi nhận hàng — demo</strong><small>Không thu tiền và không có giao hàng thực tế.</small></span></label><label class="choice-card"><input type="radio" name="payment" value="demo-transfer"><span><strong>Chuyển khoản — demo</strong><small>Chỉ mô phỏng lựa chọn. Không cung cấp tài khoản chuyển tiền.</small></span></label></fieldset><label class="consent-label"><input type="checkbox" id="demoConsent" name="demoConsent" required aria-describedby="demoConsent-error"><span>Tôi hiểu đây là trải nghiệm minh họa, không tạo đơn hàng thật.</span></label><span id="demoConsent-error" class="field-error" aria-live="polite"></span><p id="checkout-status" class="form-status" role="status" aria-live="polite"></p><button type="submit" class="button btn btn-primary checkout-submit">Hoàn tất đơn hàng mô phỏng ' + arrow + '</button><a class="text-link checkout-back" href="cart.html">← Quay lại giỏ hàng</a></form><aside id="checkout-order-summary" class="order-summary" aria-label="Tóm tắt đơn hàng"></aside></div>';
    renderCheckoutSummary();
    const form = document.getElementById('checkout-form');
    form.addEventListener('change', event => {
      if (event.target.name === 'delivery') renderCheckoutSummary();
      if (event.target.matches('input,select')) validateField(event.target, true);
      if (!form.querySelector('[aria-invalid="true"]')) document.getElementById('checkout-status').textContent = '';
    });
    form.addEventListener('input', event => {
      if (event.target.getAttribute('aria-invalid') === 'true') validateField(event.target, true);
      if (!form.querySelector('[aria-invalid="true"]')) document.getElementById('checkout-status').textContent = '';
    });
    form.addEventListener('submit', submitCheckout);
  }

  function validateField(input, show) {
    const value = input.value.trim();
    let error = '';
    if (input.id === 'fullName' && (value.length < 2 || !/[\p{L}]/u.test(value))) error = 'Vui lòng nhập họ tên có ít nhất 2 ký tự.';
    if (input.id === 'phone' && !/^(?:0\d{9}|\+84\d{9})$/.test(value.replace(/[\s.-]/g, ''))) error = 'Nhập số điện thoại Việt Nam hợp lệ, ví dụ 0901234567.';
    if (input.id === 'email' && (!value || input.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) error = 'Vui lòng nhập email hợp lệ.';
    if (input.id === 'address' && value.length < 10) error = 'Nhập địa chỉ đầy đủ có ít nhất 10 ký tự.';
    if (input.id === 'city' && !value) error = 'Vui lòng chọn tỉnh / thành phố.';
    if (input.id === 'demoConsent' && !input.checked) error = 'Vui lòng xác nhận bạn hiểu đây là đơn hàng mô phỏng.';
    if (show) {
      const target = document.getElementById(input.id + '-error');
      if (target) target.textContent = error;
      input.setAttribute('aria-invalid', error ? 'true' : 'false');
    }
    return !error;
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const fields = Array.from(form.querySelectorAll('#fullName,#phone,#email,#address,#city,#demoConsent'));
    const valid = fields.map(input => validateField(input, true)).every(Boolean);
    const status = document.getElementById('checkout-status');
    if (!valid) {
      status.textContent = 'Vui lòng kiểm tra các trường được đánh dấu bên trên.';
      fields.find(input => input.getAttribute('aria-invalid') === 'true').focus();
      return;
    }
    const lines = P.cartLines();
    if (!lines.length) { status.textContent = 'Giỏ hàng đã trống. Hãy thêm sản phẩm trước khi đặt hàng mô phỏng.'; return; }
    const delivery = form.querySelector('input[name="delivery"]:checked').value;
    const payment = form.querySelector('input[name="payment"]:checked').value;
    const subtotal = P.cartSubtotal();
    const shipping = shippingPrice(subtotal, delivery);
    const random = window.crypto && window.crypto.getRandomValues ? window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-5) : Math.random().toString(36).slice(2, 7);
    const order = {
      id: 'PAWS-' + Date.now().toString(36).toUpperCase() + '-' + random.toUpperCase(),
      createdAt: new Date().toISOString(),
      items: lines.map(line => ({ id: line.product.id, name: line.product.name, variant: line.variant.label || line.variant.id, quantity: line.quantity, unitPrice: line.unitPrice, lineTotal: line.lineTotal })),
      subtotal, shipping, total: subtotal + shipping, delivery, payment
    };
    submitting = true;
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = 'Đang tạo kết quả mô phỏng…';
    status.textContent = 'Đang xử lý trên thiết bị của bạn. Không gửi dữ liệu ra máy chủ.';
    window.setTimeout(() => {
      try {
        const saved = P.saveOrder(order);
        const persisted = P.loadOrder();
        if (saved === false || !persisted || persisted.id !== order.id) {
          status.textContent = 'Trình duyệt đang chặn lưu trữ. Không thể chuyển sang trang kết quả; giỏ hàng vẫn được giữ nguyên. Hãy cho phép lưu trữ và thử lại.';
          button.disabled = false;
          button.innerHTML = 'Thử lại đơn hàng mô phỏng ' + arrow;
          submitting = false;
          return;
        }
        P.clearCart();
        window.location.href = 'success.html?id=' + encodeURIComponent(order.id);
      } catch (error) {
        status.textContent = 'Không thể lưu kết quả mô phỏng. Giỏ hàng vẫn được giữ nguyên; vui lòng thử lại.';
        button.disabled = false;
        button.textContent = 'Thử lại đơn hàng mô phỏng';
        submitting = false;
      }
    }, 450);
  }

  function renderSuccess() {
    const mount = document.getElementById('success-app');
    if (!mount) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const order = P.loadOrder();
    if (!order || !id || order.id !== id || !Array.isArray(order.items)) {
      mount.innerHTML = '<div class="empty-state"><span class="empty-icon">' + bag + '</span><p class="eyebrow">KẾT QUẢ MÔ PHỎNG</p><h1>Chưa có đơn hàng demo này</h1><p>Kết quả chỉ có trên trình duyệt đã hoàn tất checkout. Bạn có thể quay lại cửa hàng để bắt đầu trải nghiệm.</p><a class="button btn btn-primary" href="products.html">Khám phá sản phẩm ' + arrow + '</a></div>';
      return;
    }
    const date = new Date(order.createdAt);
    const dateText = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    mount.innerHTML = '<section class="success-card"><span class="success-icon" aria-hidden="true"><svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="20"/><path d="m15 24 6 6 13-14"/></svg></span><p class="eyebrow">MỘT TRẢI NGHIỆM ĐẦY YÊU THƯƠNG</p><h1>Hoàn tất đơn hàng<br>mô phỏng!</h1><p>Cảm ơn bạn đã khám phá PAWS & CO. Đây là kết quả demo được tạo trên trình duyệt; không có đơn hàng thật được gửi, thanh toán hay giao hàng thực tế.</p><div class="order-reference"><span>Mã đơn hàng demo</span><strong>' + escape(order.id) + '</strong><small>' + escape(dateText) + '</small></div><div class="success-order-items">' + order.items.map(item => '<div class="summary-row"><span>' + escape(item.name) + '<small class="muted"> ' + escape(item.variant) + ' × ' + Number(item.quantity) + '</small></span><strong>' + P.money(Number(item.lineTotal)) + '</strong></div>').join('') + '</div>' + totalsMarkup(Number(order.subtotal), Number(order.shipping)) + '<p class="demo-notice">Thông tin người nhận không được lưu. Chỉ bản tóm tắt đơn hàng minh họa được giữ trên thiết bị này.</p><a class="button btn btn-primary" href="products.html">Tiếp tục khám phá ' + arrow + '</a><a class="text-link" href="index.html">Về trang chủ</a></section>';
  }

  function restoreFocus(id, variant, direction) {
    const candidates = Array.from(document.querySelectorAll('[data-cart-qty]'));
    const candidate = candidates.find(button => String(button.dataset.id) === String(id) && String(button.dataset.variant) === String(variant) && button.dataset.cartQty === String(direction) && !button.disabled);
    const fallback = candidates.find(button => String(button.dataset.id) === String(id) && String(button.dataset.variant) === String(variant) && !button.disabled);
    const next = candidate || fallback;
    if (next) next.focus({ preventScroll: true });
  }

  P.initCart = function () {
    if (initialized) return;
    initialized = true;
    renderCartPage();
    P.renderCartDrawer();
    renderCheckout();
    renderSuccess();
    window.addEventListener('paws:change', () => {
      renderCartPage();
      P.renderCartDrawer();
      if (document.getElementById('checkout-app') && !submitting) {
        if (!P.cartLines().length) renderCheckout();
        else if (document.getElementById('checkout-form')) renderCheckoutSummary();
        else renderCheckout();
      }
    });
    document.addEventListener('click', event => {
      const quantityButton = event.target.closest('[data-cart-qty]');
      if (quantityButton) {
        const { id, variant, cartQty } = quantityButton.dataset;
        const line = P.cartLines().find(item => String(item.product.id) === String(id) && String(item.variant.id) === String(variant));
        if (!line) return;
        const updated = P.setCartQty(id, variant, line.quantity + Number(cartQty));
        restoreFocus(id, variant, cartQty);
        if (updated !== false) P.toast('Đã cập nhật số lượng trong giỏ hàng.');
        return;
      }
      const removeButton = event.target.closest('[data-remove-cart]');
      if (removeButton) {
        const dialog = removeButton.closest('dialog');
        P.removeFromCart(removeButton.dataset.id, removeButton.dataset.variant);
        const scope = dialog || document.getElementById('cart-app');
        const focus = scope && scope.querySelector('[data-remove-cart],a.button');
        if (focus) focus.focus({ preventScroll: true });
        P.toast('Đã xóa sản phẩm khỏi giỏ hàng.');
      }
    });
  };
}());
