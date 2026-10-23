/* Browser-only persistence. Only product references and order summaries are stored. */
(() => {
  'use strict';
  const P = window.Paws = window.Paws || {};
  const keys = { cart: 'paws-cart-v1', wishlist: 'paws-wishlist-v1', order: 'paws-order-v1' };
  P.storageAvailable = true;
  P.escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  P.money = value => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
  const read = (key, fallback) => {
    try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
    catch (error) { if (!(error instanceof SyntaxError)) P.storageAvailable = false; return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { P.storageAvailable = false; return false; }
  };
  P.getVariant = (product, id) => product?.variants.find(variant => String(variant.id) === String(id)) || product?.variants[0];
  const normalizeCart = value => {
    if (!Array.isArray(value)) return [];
    const cart = [];
    value.slice(0, 200).forEach(row => {
      if (!row || typeof row !== 'object' || !Number.isInteger(row.quantity) || row.quantity < 1) return;
      const product = P.productById(row.id);
      if (!product) return;
      const variant = product.variants.find(item => String(item.id) === String(row.variant));
      if (!variant) return;
      const available = Math.min(variant.stock, product.stock);
      if (available < 1) return;
      const existing = cart.find(item => item.id === product.id && item.variant === variant.id);
      if (existing) existing.quantity = Math.min(available, existing.quantity + row.quantity);
      else cart.push({ id: product.id, variant: variant.id, quantity: Math.min(available, row.quantity) });
    });
    return cart;
  };
  const normalizeWishlist = value => Array.isArray(value) ? [...new Set(value.filter(id => P.productById(id)).map(id => P.productById(id).id))].slice(0, 200) : [];
  P.state = { cart: normalizeCart(read(keys.cart, [])), wishlist: normalizeWishlist(read(keys.wishlist, [])) };
  const changed = type => {
    window.dispatchEvent(new CustomEvent('paws:change', { detail: { type } }));
    if (type === 'wishlist') document.dispatchEvent(new CustomEvent('paws:wishlist'));
  };
  const saveCart = () => { write(keys.cart, P.state.cart); changed('cart'); };
  P.cartLines = () => P.state.cart.map(row => {
    const product = P.productById(row.id), variant = P.getVariant(product, row.variant);
    const unitPrice = Number.isFinite(variant.price) ? variant.price : product.price;
    return { product, variant, quantity: row.quantity, unitPrice, lineTotal: unitPrice * row.quantity };
  });
  P.cartSubtotal = () => P.cartLines().reduce((sum, item) => sum + item.lineTotal, 0);
  P.cartCount = () => P.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  P.addToCart = (id, variantId, quantity = 1) => {
    const product = P.productById(id);
    if (!product) { P.toast?.('Sản phẩm không tồn tại.'); return false; }
    const variant = P.getVariant(product, variantId);
    const available = Math.min(product.stock, variant.stock);
    const row = P.state.cart.find(item => item.id === product.id && item.variant === variant.id);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity + (row?.quantity || 0) > available) {
      P.toast?.(`Biến thể này còn ${available} sản phẩm. Vui lòng kiểm tra số lượng trong giỏ.`); return false;
    }
    if (row) row.quantity += quantity;
    else P.state.cart.push({ id: product.id, variant: variant.id, quantity });
    saveCart();
    P.toast?.(P.storageAvailable ? 'Đã thêm vào giỏ. Một niềm vui nhỏ đang chờ!' : 'Đã thêm vào giỏ tạm. Trình duyệt đang chặn lưu trữ.');
    return true;
  };
  P.setCartQty = (id, variantId, quantity) => {
    const product = P.productById(id), variant = P.getVariant(product, variantId);
    const row = P.state.cart.find(item => String(item.id) === String(id) && String(item.variant) === String(variantId));
    if (!row || !variant || !Number.isInteger(quantity) || quantity < 1) return false;
    const stock = Math.min(product.stock, variant.stock);
    if (quantity > stock) { P.toast?.(`Chỉ còn ${stock} sản phẩm cho lựa chọn này.`); return false; }
    row.quantity = quantity; saveCart(); return true;
  };
  P.removeFromCart = (id, variant) => {
    P.state.cart = P.state.cart.filter(row => !(String(row.id) === String(id) && String(row.variant) === String(variant)));
    saveCart();
  };
  P.clearCart = () => { P.state.cart = []; saveCart(); };
  P.isWishlisted = id => P.state.wishlist.some(item => String(item) === String(id));
  P.toggleWishlist = id => {
    const product = P.productById(id); if (!product) return;
    const exists = P.isWishlisted(product.id);
    P.state.wishlist = exists ? P.state.wishlist.filter(item => item !== product.id) : [...P.state.wishlist, product.id];
    write(keys.wishlist, P.state.wishlist); changed('wishlist');
    P.toast?.(exists ? 'Đã bỏ khỏi danh sách yêu thích.' : 'Đã lưu một món yêu thích cho bé.');
  };
  const validOrder = order => {
    if (!order || typeof order !== 'object' || typeof order.id !== 'string' || !/^PAWS-[A-Z0-9-]{4,40}$/.test(order.id) || !Array.isArray(order.items) || !order.items.length || order.items.length > 200) return null;
    if (!['subtotal','shipping','total'].every(key => Number.isSafeInteger(order[key]) && order[key] >= 0)) return null;
    if (!['standard','express'].includes(order.delivery) || !['cod','demo-transfer'].includes(order.payment) || !Number.isFinite(Date.parse(order.createdAt))) return null;
    if (!order.items.every(item => item && typeof item.name === 'string' && item.name.length <= 200 && typeof item.variant === 'string' && item.variant.length <= 100 && Number.isSafeInteger(item.quantity) && item.quantity > 0 && Number.isSafeInteger(item.unitPrice) && item.unitPrice >= 0 && Number.isSafeInteger(item.lineTotal) && item.lineTotal === item.unitPrice * item.quantity)) return null;
    if (order.subtotal !== order.items.reduce((sum,item) => sum + item.lineTotal,0) || order.total !== order.subtotal + order.shipping) return null;
    return order;
  };
  P.saveOrder = order => {
    const clean = validOrder(order); if (!clean) return false;
    P.lastOrder = clean;
    // Explicit allowlist prevents contact details being saved accidentally.
    const summary = {id: clean.id, createdAt: clean.createdAt, items: clean.items.map(item => ({id:item.id, name:item.name, variant:item.variant, quantity:item.quantity, unitPrice:item.unitPrice, lineTotal:item.lineTotal})), subtotal:clean.subtotal, shipping:clean.shipping, total:clean.total, delivery:clean.delivery, payment:clean.payment};
    return write(keys.order, summary);
  };
  P.loadOrder = () => validOrder(P.lastOrder || read(keys.order, null));
  window.addEventListener('storage', event => {
    if (event.key === keys.cart || event.key === null) { P.state.cart = normalizeCart(read(keys.cart, [])); changed('cart'); }
    if (event.key === keys.wishlist || event.key === null) { P.state.wishlist = normalizeWishlist(read(keys.wishlist, [])); changed('wishlist'); }
  });
})();
