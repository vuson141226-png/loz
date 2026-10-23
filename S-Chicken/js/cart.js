// Giỏ chỉ lưu ID và số lượng; không có tài khoản, mật khẩu hay thông tin thanh toán.
const cartKey = 'schicken-cart';
let cart = [];
let storageAvailable = true;

function loadCart() {
  let savedText;
  try {
    savedText = localStorage.getItem(cartKey);
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
    return [];
  }
  let savedCart;
  try { savedCart = JSON.parse(savedText || '[]'); }
  catch (error) { return []; }
  if (!Array.isArray(savedCart)) return [];
  const validCart = [];
  // JSON hợp lệ chưa đủ: kiểm tra cả ID, số lượng và phần tử null.
  savedCart.forEach(function (item) {
    if (!item || typeof item !== 'object') return;
    const product = products.find(function (product) { return product.id === item.id; });
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) return;
    const existing = validCart.find(function (row) { return row.id === item.id; });
    if (existing) existing.quantity = Math.min(99, existing.quantity + item.quantity);
    else validCart.push({ id: item.id, quantity: Math.min(99, item.quantity) });
  });
  return validCart;
}
cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }
  updateCartCount();
}

function updateCartCount() {
  let count = 0;
  cart.forEach(function (item) { count += item.quantity; });
  document.querySelectorAll('.cart-count').forEach(function (badge) { badge.textContent = count; });
  document.querySelectorAll('.cart-link').forEach(function (link) { link.setAttribute('aria-label', 'Giỏ hàng, ' + count + ' món'); });
}

function addToCart(id, quantity) {
  const product = products.find(function (item) { return item.id === id; });
  if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
  const item = cart.find(function (item) { return item.id === id; });
  if (item) {
    if (item.quantity + quantity > 99) {
      showToast('Mỗi món tối đa 99 phần. Bạn kiểm tra lại giỏ nhé!', true);
      return;
    }
    item.quantity += quantity;
  } else {
    cart.push({ id: id, quantity: quantity });
  }
  saveCart();
  showToast(storageAvailable ? 'Đã thêm ' + product.name + ' vào giỏ!' : 'Đã thêm món. Trình duyệt chặn lưu trữ nên giỏ chỉ giữ trong trang này.', storageAvailable);
  // Chỉ thêm một class ngắn, không thay nội dung hay nhãn truy cập của nút.
  document.querySelectorAll('[data-add="' + id + '"], #detail-add').forEach(function (button) {
    button.classList.add('is-added');
    setTimeout(function () { button.classList.remove('is-added'); }, 900);
  });
}

function cartTotal() {
  let total = 0;
  cart.forEach(function (item) {
    const product = products.find(function (product) { return product.id === item.id; });
    total += product.price * item.quantity;
  });
  return total;
}

function renderCart() {
  const container = document.getElementById('cart-content');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-state"><span class="empty-cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l2 14H4L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></span><h2>Giỏ hàng đang chờ món ngon!</h2><p>Chọn một chút giòn ngon để bắt đầu bữa vui của bạn.</p><a class="button" href="products.html">Tiếp tục mua sắm ↗</a></div>';
    return;
  }
  let rows = '';
  let count = 0;
  cart.forEach(function (item) {
    count += item.quantity;
    const product = products.find(function (product) { return product.id === item.id; });
    rows += '<article class="cart-row" data-cart-row="' + item.id + '"><img src="images/' + product.image + '" alt="' + product.name + ' — ảnh minh họa" width="90" height="90"><div><h2><a href="product-detail.html?id=' + product.id + '">' + product.name + '</a></h2><p>Đơn giá: ' + formatPrice(product.price) + '</p><div class="quantity-control"><button data-cart-change="-1" data-id="' + item.id + '" aria-label="Giảm số lượng ' + product.name + '" ' + (item.quantity === 1 ? 'disabled' : '') + '>−</button><span class="quantity-number" tabindex="-1" aria-label="Số lượng ' + item.quantity + '">' + item.quantity + '</span><button data-cart-change="1" data-id="' + item.id + '" aria-label="Tăng số lượng ' + product.name + '" ' + (item.quantity === 99 ? 'disabled' : '') + '>+</button></div></div><div class="cart-item-end"><strong>' + formatPrice(product.price * item.quantity) + '</strong><button class="remove-item" data-remove="' + item.id + '" aria-label="Xóa ' + product.name + '">Xóa món</button></div></article>';
  });
  container.innerHTML = '<div class="cart-layout"><div class="cart-items"><div class="cart-list-heading"><h2>Món đã chọn</h2><span>' + count + ' phần</span></div>' + rows + '<a class="text-link continue-shopping" href="products.html">← Tiếp tục mua sắm</a></div><aside class="cart-summary" aria-label="Tóm tắt đơn hàng"><p class="eyebrow">SẮP ĐỦ MỘT BỮA VUI</p><h2>Bữa ngon của bạn</h2><div class="summary-line"><span>Tạm tính</span><strong>' + formatPrice(cartTotal()) + '</strong></div><div class="summary-line"><span>Phí giao hàng</span><span>0 ₫ (mô phỏng)</span></div><div class="summary-line summary-total"><b>Tổng cộng</b><strong>' + formatPrice(cartTotal()) + '</strong></div><button class="button" id="checkout-button">Thanh toán mô phỏng ↗</button><p class="muted">Không thu tiền hoặc yêu cầu thông tin thẻ. Chỉ xác nhận đơn hàng minh họa.</p></aside></div>';
}

// Ủy quyền sự kiện: các nút vẫn hoạt động sau khi giỏ được vẽ lại.
document.addEventListener('click', function (event) {
  const addButton = event.target.closest('[data-add]');
  if (addButton) addToCart(Number(addButton.dataset.add), 1);
  const changeButton = event.target.closest('[data-cart-change]');
  if (changeButton) {
    const id = Number(changeButton.dataset.id);
    const change = Number(changeButton.dataset.cartChange);
    const item = cart.find(function (item) { return item.id === id; });
    if (item) {
      item.quantity = Math.max(1, Math.min(99, item.quantity + change));
      saveCart();
      renderCart();
      // Giữ vị trí bàn phím khi render thay toàn bộ danh sách.
      const replacement = document.querySelector('[data-id="' + id + '"][data-cart-change="' + change + '"]');
      if (replacement && !replacement.disabled) replacement.focus({ preventScroll: true });
      else document.querySelector('[data-cart-row="' + id + '"] .quantity-number').focus({ preventScroll: true });
      showToast('Đã cập nhật số lượng. Tổng mới: ' + formatPrice(cartTotal()));
    }
  }
  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    cart = cart.filter(function (item) { return item.id !== Number(removeButton.dataset.remove); });
    saveCart();
    renderCart();
    const nextButton = document.querySelector('#cart-content .remove-item, #cart-content .button');
    if (nextButton) nextButton.focus({ preventScroll: true });
    showToast('Đã xóa món khỏi giỏ.');
  }
  if (event.target.closest('#checkout-button') && cart.length > 0) {
    const total = cartTotal();
    document.getElementById('checkout-summary').textContent = 'Tổng tiền minh họa: ' + formatPrice(total);
    document.getElementById('checkout-dialog').showModal();
    cart = [];
    saveCart();
    renderCart();
  }
});

const checkoutDialog = document.getElementById('checkout-dialog');
const closeCheckout = document.getElementById('close-checkout');
if (closeCheckout && checkoutDialog) {
  closeCheckout.addEventListener('click', function () { checkoutDialog.close(); });
  checkoutDialog.addEventListener('close', function () {
    const continueButton = document.querySelector('#cart-content .button');
    if (continueButton) continueButton.focus();
  });
}
// Tab khác thay giỏ: cập nhật tại chỗ, không tải lại và làm mất nội dung form.
window.addEventListener('storage', function (event) {
  if (event.key === cartKey || event.key === null) {
    cart = loadCart();
    updateCartCount();
    renderCart();
    showToast('Giỏ hàng đã được cập nhật từ tab khác.');
  }
});
updateCartCount();
renderCart();
