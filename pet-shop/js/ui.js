/* Shared navigation, accessible dialogs, feedback and search. */
(() => {
  'use strict';
  const P = window.Paws;
  const paths = {
    paw: '<ellipse cx="7" cy="7" rx="2.2" ry="3" transform="rotate(-25 7 7)"/><ellipse cx="17" cy="7" rx="2.2" ry="3" transform="rotate(25 17 7)"/><ellipse cx="3" cy="12" rx="1.8" ry="2.5" transform="rotate(-30 3 12)"/><ellipse cx="21" cy="12" rx="1.8" ry="2.5" transform="rotate(30 21 12)"/><path d="M12 11c-3 0-4 4-6 6-2 3 0 5 3 4 2-1 4-1 6 0 3 1 5-1 3-4-2-2-3-6-6-6Z"/>',
    search: '<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16 16 5 5"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    heart: '<path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    truck: '<path d="M3 4h12v13H3zM15 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/>',
    support: '<path d="M3 13v-2a9 9 0 0 1 18 0v6c0 3-2 5-6 5"/><rect x="2" y="11" width="4" height="7" rx="2"/><rect x="18" y="11" width="4" height="7" rx="2"/>',
    return: '<path d="M4 9h10a6 6 0 0 1 0 12H9M8 4 3 9l5 5"/>',
    leaf: '<path d="M21 3S5 0 4 12a7 7 0 0 0 8 8C23 18 21 3 21 3Z"/><path d="m3 22 13-13"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/>',
    up: '<path d="m6 14 6-6 6 6"/>'
  };
  P.icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" ${name === 'paw' ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${paths[name] || paths.paw}</svg>`;
  const brand = () => `<a class="brand" href="index.html" aria-label="sisimimi — Trang chủ"><img src="assets/icons/logo.svg" width="176" height="44" alt="sisimimi — Yêu thương trong từng điều nhỏ"></a>`;
  P.renderShell = () => {
    const page = document.body.dataset.page;
    document.getElementById('site-header').innerHTML = `<div class="announcement"><span>Gửi một chút yêu thương đến tận cửa nhà</span><span class="announcement-offer">Miễn phí vận chuyển từ 599.000 ₫ ${P.icon('arrow')}</span></div><header class="site-header"><div class="container header-main"><button class="icon-button mobile-menu-toggle" type="button" aria-label="Mở danh mục" aria-controls="main-navigation" aria-expanded="false">${P.icon('menu')}</button>${brand()}<div class="search-wrap"><form class="search-form" role="search" action="products.html"><label for="header-search" class="sr-only">Tìm sản phẩm cho thú cưng</label>${P.icon('search')}<input id="header-search" role="combobox" aria-autocomplete="list" aria-haspopup="listbox" name="q" type="search" placeholder="Hôm nay bé cần gì?" maxlength="100" autocomplete="off" aria-controls="search-results" aria-expanded="false"><button type="submit" aria-label="Tìm kiếm">${P.icon('arrow')}</button></form><div id="search-results" class="search-results" role="listbox" aria-label="Gợi ý sản phẩm" hidden></div></div><div class="header-actions"><button class="icon-button account-button" data-account type="button" aria-label="Thông tin tài khoản">${P.icon('user')}</button><a class="icon-button" href="wishlist.html" aria-label="Danh sách yêu thích">${P.icon('heart')}<span class="badge" data-wish-count hidden>0</span></a><button class="icon-button" type="button" data-cart-open aria-label="Mở giỏ hàng">${P.icon('bag')}<span class="badge" data-cart-count hidden>0</span></button></div></div><nav id="main-navigation" class="main-nav" aria-label="Điều hướng chính"><div class="container nav-inner"><a class="nav-link ${page==='home'?'is-active':''}" href="index.html">Trang chủ</a><div class="mega-wrap"><a class="nav-link ${['products','product'].includes(page)?'is-active':''}" href="products.html">Sản phẩm <span aria-hidden="true">⌄</span></a><div class="mega-menu"><div><p class="eyebrow">THẾ GIỚI NHỎ CỦA BÉ</p><h3>Chọn yêu thương mỗi ngày.</h3><a class="text-link" href="products.html?pet=dog">Dành cho cún ↗</a><br><a class="text-link" href="products.html?pet=cat">Dành cho mèo ↗</a></div><div>${P.categories.map(c=>`<a href="products.html?category=${c.id}">${P.escape(c.name)}</a>`).join('')}</div></div></div><a class="nav-link ${page==='about'?'is-active':''}" href="about.html">Giới thiệu</a><a class="nav-link ${['blog','article'].includes(page)?'is-active':''}" href="blog.html">Tin tức</a><a class="nav-link ${page==='contact'?'is-active':''}" href="contact.html">Liên hệ</a><a class="nav-link ${page==='faq'?'is-active':''}" href="faq.html">FAQ</a><a class="nav-link ${page==='careers'?'is-active':''}" href="careers.html">Tuyển dụng</a><a class="nav-link nav-sale" href="products.html?sale=1">Khuyến mãi</a><a class="nav-link nav-account" href="login.html">Đăng nhập / Đăng ký</a></div></nav></header>`;
    document.getElementById('site-footer').innerHTML = `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand">${brand()}<p>Yêu thương trong từng điều nhỏ.<br>Để mỗi ngày bên nhau đều là ngày thật vui.</p><div class="social-links"><button type="button" data-info="social">Instagram ↗</button><button type="button" data-info="social">Facebook ↗</button></div></div><div class="footer-column"><h3>Cửa hàng nhỏ</h3><a href="products.html?pet=dog">Dành cho chó</a><a href="products.html?pet=cat">Dành cho mèo</a><a href="products.html?category=toys">Đồ chơi & niềm vui</a><a href="products.html?new=1">Những món mới về</a><a href="blog.html">Nhật ký chăm bé</a></div><div class="footer-column"><h3>Luôn ở đây vì bạn</h3><a href="faq.html">Câu hỏi thường gặp</a><button type="button" data-info="shipping">Giao hàng & đổi trả</button><button type="button" data-info="privacy">Chính sách riêng tư</button><a href="contact.html">Liên hệ với chúng tôi</a><a href="careers.html">Cơ hội nghề nghiệp</a><a href="login.html">Đăng nhập / Đăng ký demo</a></div><div class="footer-column"><h3>Ghé nhà sisimimi</h3><p>24 Đường Lá Xanh, TP. Hồ Chí Minh<br><small>Địa chỉ minh họa</small></p><button type="button" data-info="contact">hello@sisimimi.example</button><p>Thứ Hai – Chủ nhật · 9:00–20:00</p><div class="payment-icons" aria-label="Hình thức thanh toán minh họa"><span>COD</span><span>DEMO PAY</span></div></div></div><div class="container footer-bottom"><p>© 2026 sisimimi · A little love goes a long way.</p><p>Website portfolio · Sản phẩm, đánh giá và đặt hàng đều là minh họa.</p></div></footer>`;
    document.getElementById('overlays').innerHTML = `<dialog id="cart-drawer" class="cart-drawer" aria-labelledby="cart-title"><div class="drawer-header"><h2 id="cart-title">Giỏ yêu thương <span data-cart-count>0</span></h2><button class="icon-button" type="button" data-dialog-close aria-label="Đóng giỏ hàng">${P.icon('close')}</button></div><div id="drawer-content" class="drawer-body"></div></dialog><dialog id="quick-view" class="quick-modal" aria-labelledby="quickview-title"><button class="icon-button modal-close" type="button" data-dialog-close aria-label="Đóng xem nhanh">${P.icon('close')}</button><div id="quick-view-content"></div></dialog><dialog id="info-modal" class="article-modal" aria-labelledby="info-title"><button class="icon-button modal-close" type="button" data-dialog-close aria-label="Đóng nội dung">${P.icon('close')}</button><div id="info-content"></div></dialog><div class="toast-region" role="status" aria-live="polite" aria-atomic="false"></div><button class="back-to-top icon-button" type="button" aria-label="Về đầu trang" hidden>${P.icon('up')}</button>`;
  };
  let lastFocus = null;
  P.openDialog = dialog => {
    document.querySelectorAll('dialog[open]').forEach(open => open.close());
    lastFocus = document.activeElement;
    dialog.showModal(); document.body.classList.add('modal-open');
    requestAnimationFrame(() => (dialog.querySelector('button, a, input, select, [tabindex]') || dialog).focus());
  };
  P.openQuickView = id => {
    const product = P.productById(id); if (!product) return;
    document.getElementById('quick-view-content').innerHTML = P.quickViewContent(product);
    P.openDialog(document.getElementById('quick-view'));
  };
  P.toast = message => {
    const region = document.querySelector('.toast-region'); if (!region) return;
    const item = document.createElement('div'); item.className = 'toast';
    const text = document.createElement('span'); text.textContent = message;
    const close = document.createElement('button'); close.type = 'button'; close.setAttribute('aria-label','Đóng thông báo'); close.textContent = '×';
    item.append(text,close); region.append(item);
    const timer = setTimeout(() => item.remove(),6500);
    close.addEventListener('click',() => { clearTimeout(timer); item.remove(); });
    while (region.children.length > 3) region.firstElementChild.remove();
  };
  P.updateBadges = () => {
    document.querySelectorAll('[data-cart-count]').forEach(node => { node.textContent = P.cartCount(); node.hidden = P.cartCount() === 0; });
    document.querySelectorAll('[data-wish-count]').forEach(node => { node.textContent = P.state.wishlist.length; node.hidden = P.state.wishlist.length === 0; });
    document.querySelectorAll('[data-wish]').forEach(button => { const saved = P.isWishlisted(button.dataset.id); button.classList.toggle('is-active', saved); button.setAttribute('aria-pressed', saved); const product = P.productById(button.dataset.id); if (product) button.setAttribute('aria-label',(saved ? 'Bỏ yêu thích ' : 'Yêu thích ') + product.name); });
  };
  const info = {
    contact: ['Một lời chào từ cửa hàng nhỏ','<p>hello@sisimimi.example và 24 Đường Lá Xanh là thông tin liên hệ minh họa cho thiết kế portfolio, không phải địa chỉ nhận thư hoặc cửa hàng thật.</p><p>Bạn có thể tìm hiểu trải nghiệm mua sắm trong FAQ và hướng dẫn của dự án.</p><a class="button button-primary" href="faq.html">Ghé góc giải đáp ↗</a>'],
    shipping: ['Một chuyến đi thật nhẹ nhàng','<p>Chính sách minh họa: giao hàng tiêu chuẩn 2–4 ngày, phí 30.000 ₫ và miễn phí từ 599.000 ₫. Giao nhanh dự kiến 1–2 ngày, phí 50.000 ₫.</p><p>Đổi trả trong 7 ngày đối với sản phẩm chưa sử dụng, còn nguyên bao bì. Đây là website demo, không có dịch vụ vận chuyển hoặc đổi trả thực tế.</p>'],
    privacy: ['Sự riêng tư cũng cần được nâng niu','<p>Giỏ hàng và danh sách yêu thích được lưu bằng localStorage trên thiết bị này. Thông tin liên hệ nhập khi checkout chỉ dùng để kiểm tra biểu mẫu, không được lưu hay gửi đi.</p><p>Website không có backend, không tạo tài khoản thật và không xử lý thanh toán. Bạn có thể xóa dữ liệu demo trong phần cài đặt trình duyệt.</p>'],
    social: ['Cùng kể những câu chuyện nhỏ','<p>sisimimi là thương hiệu minh họa dành cho dự án portfolio. Chưa có trang mạng xã hội chính thức.</p><p>Bạn vẫn có thể khám phá nhật ký chăm sóc và những món đồ yêu thích ngay tại website này.</p><a class="button button-primary" href="index.html#journal">Đọc nhật ký chăm bé ↗</a>'],
    account: ['Xin chào, người bạn của sisimimi!','<p>Bạn có thể mua sắm demo ngay mà không cần tài khoản. Những món yêu thích và giỏ hàng được lưu riêng trên trình duyệt của bạn.</p><p>Chúng tôi không thu thập mật khẩu hoặc tạo tài khoản trong bản minh họa.</p><a class="button button-primary" href="wishlist.html">Ghé danh sách yêu thích ♡</a>']
  };
  P.showInfo = key => {
    const entry = info[key]; if (!entry) return;
    document.getElementById('info-content').innerHTML = `<p class="eyebrow">sisimimi · GÓC NHỎ THÂN QUEN</p><h2 id="info-title">${entry[0]}</h2>${entry[1]}`;
    P.openDialog(document.getElementById('info-modal'));
  };
  P.initUI = () => {
    const nav = document.getElementById('main-navigation'), toggle = document.querySelector('.mobile-menu-toggle');
    const closeNav = () => { toggle.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); };
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); toggle.focus(); } });
    document.addEventListener('click', event => {
      const target = event.target.closest('button, a');
      if (!target) return;
      if (!event.target.closest('.site-header')) closeNav();
      if (target.matches('[data-dialog-close]')) target.closest('dialog')?.close();
      if (target.matches('[data-cart-open]')) { P.renderCartDrawer(); P.openDialog(document.getElementById('cart-drawer')); }
      if (target.matches('[data-add]')) {
        const added = P.addToCart(target.dataset.id,target.dataset.variant,Number(target.dataset.quantity || 1));
        if (added) { target.classList.add('is-added'); setTimeout(()=>target.classList.remove('is-added'),800); }
      }
      if (target.matches('[data-wish]')) P.toggleWishlist(target.dataset.id);
      if (target.matches('[data-quick]')) P.openQuickView(target.dataset.id);
      if (target.matches('[data-info]')) P.showInfo(target.dataset.info);
      if (target.matches('[data-account]')) window.location.href='login.html';
      if (target.matches('.back-to-top')) window.scrollTo({ top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    document.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) { document.body.classList.remove('modal-open'); if (lastFocus?.isConnected) lastFocus.focus(); } });
      dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
    });
    const search = document.getElementById('header-search'), results = document.getElementById('search-results');
    const hideSearch = () => { results.hidden=true; search.setAttribute('aria-expanded','false'); };
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase('vi');
      if (!query) { hideSearch(); return; }
      const products = P.products.filter(product => (product.name+' '+product.description).toLocaleLowerCase('vi').includes(query)).slice(0,4);
      results.innerHTML = products.length ? `<p class="search-label" role="presentation" aria-hidden="true">Một vài gợi ý cho bé</p>${products.map((product,index) => `<a role="option" aria-selected="false" id="search-option-${index}" href="product.html?id=${encodeURIComponent(product.id)}"><img src="${P.escape(product.images[0])}" alt="" width="48" height="48"><span>${P.escape(product.name)}<small>${P.money(product.price)}</small></span>${P.icon('arrow')}</a>`).join('')}` : '<p class="search-label" role="option" aria-disabled="true">Chưa tìm thấy món phù hợp. Thử từ khóa khác nhé.</p>';
      results.hidden=false; search.setAttribute('aria-expanded','true');
    });
    search.addEventListener('keydown',event => { if (event.key === 'Escape') hideSearch(); if (event.key === 'ArrowDown') { const first=results.querySelector('a'); if(first){event.preventDefault();first.focus();} } });
    results.addEventListener('focusin',event => {
      results.querySelectorAll('[role="option"]').forEach(option=>option.setAttribute('aria-selected',String(option===event.target)));
    });
    results.addEventListener('keydown',event => {
      const options=[...results.querySelectorAll('a[role="option"]')];
      const index=options.indexOf(document.activeElement);
      if(event.key==='Escape'){event.preventDefault();hideSearch();search.focus();}
      if(event.key==='ArrowDown'){event.preventDefault();options[Math.min(index+1,options.length-1)]?.focus();}
      if(event.key==='ArrowUp'){event.preventDefault();if(index<=0)search.focus();else options[index-1].focus();}
      if(event.key==='Home'){event.preventDefault();options[0]?.focus();}
      if(event.key==='End'){event.preventDefault();options.at(-1)?.focus();}
    });
    document.addEventListener('click',event => {if(!event.target.closest('.search-wrap')) hideSearch();});
    document.querySelector('.search-wrap').addEventListener('focusout',event => {if(!event.relatedTarget?.closest('.search-wrap')) hideSearch();});
    document.querySelectorAll('.mega-wrap').forEach(wrap => wrap.addEventListener('keydown',event => { if(event.key==='Escape'){wrap.classList.add('is-dismissed');wrap.querySelector('a').focus();} }));
    document.querySelectorAll('.mega-wrap').forEach(wrap => { wrap.addEventListener('mouseenter',()=>wrap.classList.remove('is-dismissed'));wrap.addEventListener('focusout',event=>{if(!wrap.contains(event.relatedTarget)) wrap.classList.remove('is-dismissed');}); });
    const top = document.querySelector('.back-to-top');
    window.addEventListener('scroll',()=>{top.hidden=window.scrollY<650;document.querySelector('.site-header').classList.toggle('is-scrolled',window.scrollY>20);},{passive:true});
    matchMedia('(min-width: 1024px)').addEventListener('change',closeNav);
    document.addEventListener('error',event=>{const image=event.target;if(image instanceof HTMLImageElement && !image.dataset.fallback){image.dataset.fallback='true';image.src='assets/images/fallback.svg';}},true);
    window.addEventListener('paws:change',P.updateBadges);
    P.updateBadges();
  };
})();
