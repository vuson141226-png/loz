// Chỉ lưu ID món và số lượng; không lưu tài khoản hoặc thông tin nhạy cảm.
const cartKey = 'schicken-cart';
let cart = [];
let storageAvailable = true;
try {
  const savedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  // Kiểm tra dữ liệu để giỏ hàng hỏng không làm website ngừng hoạt động.
  if (Array.isArray(savedCart)) {
    savedCart.forEach(function (item) {
      const product = products.find(function (product) { return product.id === item.id; });
      if (product && Number.isInteger(item.quantity) && item.quantity > 0) {
        const existing = cart.find(function (row) { return row.id === item.id; });
        if (existing) existing.quantity = Math.min(99, existing.quantity + item.quantity);
        else cart.push({ id: item.id, quantity: Math.min(99, item.quantity) });
      }
    });
  }
} catch (error) {
  // Chế độ riêng tư hoặc dữ liệu JSON hỏng: vẫn dùng giỏ hàng trong phiên hiện tại.
  storageAvailable = false;
}

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
}

function addToCart(id, quantity) {
  const product = products.find(function (item) { return item.id === id; });
  if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
  const item = cart.find(function (item) { return item.id === id; });
  if (item) {
    if (item.quantity + quantity > 99) {
      showToast('Mỗi món tối đa 99 phần. Bạn kiểm tra lại giỏ nhé!');
      return;
    }
    item.quantity += quantity;
  } else {
    cart.push({ id: id, quantity: quantity });
  }
  saveCart();
  showToast(storageAvailable ? 'Đã thêm ' + product.name + ' vào giỏ!' : 'Đã thêm món. Trình duyệt chặn lưu trữ nên giỏ chỉ giữ trong trang này.');
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
    container.innerHTML = '<div class="empty-state"><span aria-hidden="true">♡</span><h2>Giỏ hàng đang chờ món ngon!</h2><p>Chọn một chút giòn ngon để bắt đầu bữa vui của bạn.</p><a class="button" href="products.html">Tiếp tục mua sắm ↗</a></div>';
    return;
  }
  let rows = '';
  cart.forEach(function (item) {
    const product = products.find(function (product) { return product.id === item.id; });
    rows += '<article class="cart-row"><img src="images/' + product.image + '" alt="' + product.name + ' — ảnh minh họa" width="90" height="90"><div><h2><a href="product-detail.html?id=' + product.id + '">' + product.name + '</a></h2><p>Đơn giá: ' + formatPrice(product.price) + '</p><div class="quantity-control"><button data-cart-change="-1" data-id="' + item.id + '" aria-label="Giảm số lượng ' + product.name + '" ' + (item.quantity === 1 ? 'disabled' : '') + '>−</button><span class="quantity-number" aria-label="Số lượng">' + item.quantity + '</span><button data-cart-change="1" data-id="' + item.id + '" aria-label="Tăng số lượng ' + product.name + '" ' + (item.quantity === 99 ? 'disabled' : '') + '>+</button></div></div><div class="cart-item-end"><strong>' + formatPrice(product.price * item.quantity) + '</strong><button class="remove-item" data-remove="' + item.id + '" aria-label="Xóa ' + product.name + '">Xóa món</button></div></article>';
  });
  container.innerHTML = '<div class="cart-layout"><div>' + rows + '<a class="text-link continue-shopping" href="products.html">← Tiếp tục mua sắm</a></div><aside class="cart-summary"><h2>Bữa ngon của bạn</h2><div class="summary-line"><span>Tạm tính</span><strong>' + formatPrice(cartTotal()) + '</strong></div><div class="summary-line"><span>Phí giao hàng</span><span>0 ₫ (mô phỏng)</span></div><div class="summary-line summary-total"><b>Tổng cộng</b><strong>' + formatPrice(cartTotal()) + '</strong></div><button class="button" id="checkout-button">Thanh toán mô phỏng ↗</button><p class="muted">Không thu tiền hoặc yêu cầu thông tin thẻ. Chỉ xác nhận đơn hàng minh họa.</p></aside></div>';
}

// Ủy quyền sự kiện: vẫn hoạt động sau khi danh sách giỏ được vẽ lại.
document.addEventListener('click', function (event) {
  const addButton = event.target.closest('[data-add]');
  if (addButton) addToCart(Number(addButton.dataset.add), 1);
  const changeButton = event.target.closest('[data-cart-change]');
  if (changeButton) {
    const item = cart.find(function (item) { return item.id === Number(changeButton.dataset.id); });
    if (item) {
      item.quantity = Math.max(1, Math.min(99, item.quantity + Number(changeButton.dataset.cartChange)));
      saveCart();
      renderCart();
    }
  }
  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    cart = cart.filter(function (item) { return item.id !== Number(removeButton.dataset.remove); });
    saveCart();
    renderCart();
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

const closeCheckout = document.getElementById('close-checkout');
if (closeCheckout) closeCheckout.addEventListener('click', function () {
  document.getElementById('checkout-dialog').close();
  document.querySelector('#cart-content .button').focus();
});
// Đồng bộ giỏ nếu người dùng mở nhiều tab cùng website.
window.addEventListener('storage', function (event) {
  if (event.key === cartKey) window.location.reload();
});
updateCartCount();
renderCart();
