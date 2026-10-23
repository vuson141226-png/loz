/* Product presentation, discovery and details. No fetch is required, including on file://. */
(() => {
  'use strict';
  const P = window.Paws = window.Paws || {};
  const categories = {
    'food-dog': 'Thức ăn cho chó', 'food-cat': 'Thức ăn cho mèo', toys: 'Đồ chơi',
    accessories: 'Phụ kiện', care: 'Vệ sinh & chăm sóc', beds: 'Giường & nhà'
  };
  const e = value => P.escape(String(value ?? ''));
  const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  const star = '<span aria-hidden="true">★</span>';
  const firstVariant = product => product.variants.find(v => (v.stock ?? product.stock) > 0) || product.variants[0];
  const variantPrice = (product, variant) => Number(variant?.price ?? product.price);
  const stockOf = (product, variant) => Math.max(0, Math.min(Number(product.stock) || 0, Number(variant?.stock ?? product.stock) || 0));
  const normalized = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLocaleLowerCase('vi');
  const getProduct = id => P.products.find(item => String(item.id) === String(id));
  const priceHTML = (product, price = product.price) => `<strong>${P.money(price)}</strong>${product.originalPrice > price ? `<del>${P.money(product.originalPrice)}</del>` : ''}`;
  const badgeHTML = product => {
    if (product.originalPrice > product.price) return `<span class="product-badge badge-sale">−${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>`;
    if (product.tags.includes('new')) return '<span class="product-badge badge-new">Mới về</span>';
    if (product.tags.includes('bestseller')) return '<span class="product-badge">Bán chạy</span>';
    return '';
  };
  P.productCard = product => {
    const variant = firstVariant(product);
    const wish = P.isWishlisted(product.id);
    return `<article class="product-card" data-product-card="${e(product.id)}">
      <div class="product-image">
        <a href="product.html?id=${encodeURIComponent(product.id)}" aria-label="Xem ${e(product.name)}"><img src="${e(product.images[0])}" alt="${e(product.name)} — sản phẩm minh họa" width="500" height="500" loading="lazy" decoding="async"></a>
        ${badgeHTML(product)}
        <button class="icon-button wish-button ${wish ? 'is-active' : ''}" type="button" data-wish data-id="${e(product.id)}" aria-pressed="${wish}" aria-label="${wish ? 'Bỏ yêu thích' : 'Yêu thích'} ${e(product.name)}">${heart}</button>
        <button class="quick-view" type="button" data-quick data-id="${e(product.id)}">Xem nhanh <span aria-hidden="true">↗</span></button>
      </div>
      <div class="product-info"><p class="product-brand">${e(product.brand)} <span>·</span> ${e(categories[product.category] || '')}</p>
        <h3><a href="product.html?id=${encodeURIComponent(product.id)}">${e(product.name)}</a></h3>
        <p class="product-rating" aria-label="${e(product.rating)} trên 5 sao, ${e(product.reviewCount)} đánh giá minh họa">${star} ${e(product.rating)} <span>(${e(product.reviewCount)})</span></p>
        <div class="product-bottom"><p class="product-price">${priceHTML(product)}</p><button class="add-button" type="button" data-add data-id="${e(product.id)}" data-variant="${e(variant.id)}" data-quantity="1" ${stockOf(product, variant) < 1 ? 'disabled' : ''} aria-label="Thêm ${e(product.name)} vào giỏ"><span aria-hidden="true">+</span><span class="add-button-label">Thêm vào giỏ</span></button></div>
      </div></article>`;
  };
  P.quickViewContent = product => {
    const variant = firstVariant(product);
    return `<div class="quick-view-content"><div class="quick-view-image"><img src="${e(product.images[0])}" alt="${e(product.name)}" width="500" height="500"></div><div class="quick-view-info"><p class="eyebrow">${e(product.brand)} · XEM NHANH</p><h2 id="quickview-title">${e(product.name)}</h2><p class="product-rating">${star} ${e(product.rating)} <span>(${e(product.reviewCount)} đánh giá minh họa)</span></p><p class="detail-price">${priceHTML(product, variantPrice(product, variant))}</p><p>${e(product.description)}</p><p class="muted">Biến thể: ${e(variant.label)} · Còn ${stockOf(product, variant)} sản phẩm demo</p><button class="button button-primary" type="button" data-add data-id="${e(product.id)}" data-variant="${e(variant.id)}" data-quantity="1" ${stockOf(product, variant) < 1 ? 'disabled' : ''}>Thêm vào giỏ hàng <span aria-hidden="true">↗</span></button><a class="text-link" href="product.html?id=${encodeURIComponent(product.id)}">Xem đầy đủ chi tiết →</a><small class="demo-note">Sản phẩm và giao dịch chỉ dùng để minh họa.</small></div></div>`;
  };
  const emptyHTML = (title, description) => `<div class="empty-state"><span class="empty-symbol" aria-hidden="true">♡</span><h2>${e(title)}</h2><p>${e(description)}</p><a class="button button-primary" href="products.html">Khám phá sản phẩm ↗</a></div>`;
  function initCatalog() {
    const mount = document.getElementById('catalog-app');
    if (!mount) return;
    const params = new URLSearchParams(location.search);
    const maxPrice = Math.max(...P.products.map(p => p.originalPrice || p.price), 1000000);
    const initial = () => ({ q: '', pet: '', categories: [], brands: [], max: maxPrice, rating: 0, sale: false, fresh: false, sort: 'bestseller', limit: 12, view: 'grid' });
    let state = initial();
    state.q = (params.get('q') || '').slice(0,100);
    state.pet = ['dog', 'cat'].includes(params.get('pet')) ? params.get('pet') : '';
    state.categories = params.getAll('category').filter(c => Object.hasOwn(categories, c));
    state.sale = params.get('sale') === '1';
    state.fresh = params.get('new') === '1';
    const brands = [...new Set(P.products.map(p => p.brand))].sort();
    mount.innerHTML = `<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="index.html">Trang chủ</a><span aria-hidden="true">/</span><span>Sản phẩm</span></nav>
      <header class="catalog-heading"><div><p class="eyebrow">NHỮNG ĐIỀU NHỎ, NIỀM VUI LỚN</p><h1>Chọn yêu thương<span class="accent-dot">.</span></h1><p>Những món đồ được chọn bằng sự quan tâm, dành riêng cho bạn nhỏ.</p></div><span class="catalog-heading-note">Sản phẩm minh họa<br>Chất lượng trải nghiệm thật</span></header>
      <div class="catalog-layout"><aside class="catalog-sidebar"><button class="filter-toggle button button-outline" type="button" aria-expanded="false" aria-controls="product-filters">Bộ lọc sản phẩm <span aria-hidden="true">↓</span></button><form id="product-filters" class="filter-panel"><div class="filter-heading"><h2>Bộ lọc</h2><button type="button" class="text-button" data-clear-filters>Xóa tất cả</button></div>
      <details open><summary>Bạn nhỏ của bạn</summary><div class="filter-options">${[['','Tất cả thú cưng'],['dog','Chó'],['cat','Mèo']].map(([value,label]) => `<label><input type="radio" name="pet" value="${value}" ${state.pet === value ? 'checked' : ''}>${label}</label>`).join('')}</div></details>
      <details open><summary>Danh mục</summary><div class="filter-options">${Object.entries(categories).map(([key,label]) => `<label><input type="checkbox" name="category" value="${key}" ${state.categories.includes(key) ? 'checked' : ''}>${label}</label>`).join('')}</div></details>
      <details open><summary>Thương hiệu minh họa</summary><div class="filter-options">${brands.map(brand => `<label><input type="checkbox" name="brand" value="${e(brand)}">${e(brand)}</label>`).join('')}</div></details>
      <details open><summary>Khoảng giá</summary><div class="filter-options"><label for="price-range">Giá tối đa: <strong id="price-range-value">${P.money(maxPrice)}</strong></label><input id="price-range" name="max" type="range" min="0" max="${maxPrice}" step="10000" value="${maxPrice}" aria-describedby="price-range-value"><span class="range-labels"><span>0 ₫</span><span>${P.money(maxPrice)}</span></span></div></details>
      <details open><summary>Đánh giá</summary><div class="filter-options"><label for="rating-filter" class="sr-only">Đánh giá tối thiểu</label><select id="rating-filter" name="rating"><option value="0">Tất cả đánh giá</option><option value="4">Từ 4 sao</option><option value="4.5">Từ 4,5 sao</option><option value="4.8">Từ 4,8 sao</option></select></div></details>
      <div class="filter-options"><label><input name="sale" type="checkbox" ${state.sale ? 'checked' : ''}>Đang ưu đãi</label><label><input name="fresh" type="checkbox" ${state.fresh ? 'checked' : ''}>Sản phẩm mới</label></div></form></aside>
      <div class="catalog-main"><form class="catalog-search" role="search"><label class="sr-only" for="catalog-search">Tìm trong sản phẩm</label><input id="catalog-search" name="q" type="search" placeholder="Tìm một chút yêu thương…" value="${e(state.q)}" maxlength="100"><button class="icon-button" type="submit" aria-label="Tìm sản phẩm">⌕</button></form><div class="catalog-toolbar"><p id="catalog-count" role="status" aria-live="polite"></p><div class="catalog-controls"><label class="sr-only" for="product-sort">Sắp xếp sản phẩm</label><select id="product-sort"><option value="bestseller">Bán chạy nhất</option><option value="newest">Mới nhất</option><option value="price-asc">Giá: thấp đến cao</option><option value="price-desc">Giá: cao đến thấp</option><option value="rating">Đánh giá cao nhất</option></select><div class="view-controls" aria-label="Kiểu hiển thị"><button type="button" class="icon-button is-active" data-view="grid" aria-label="Dạng lưới" aria-pressed="true">▦</button><button type="button" class="icon-button" data-view="list" aria-label="Dạng danh sách" aria-pressed="false">☰</button></div></div></div><div id="catalog-results" class="product-grid"></div><div class="load-more-wrap"><button class="button button-outline" id="load-more" type="button">Xem thêm sản phẩm <span aria-hidden="true">↓</span></button><p id="catalog-progress" class="muted"></p></div></div></div>`;
    const form = mount.querySelector('#product-filters');
    function updateURL() {
      const query = new URLSearchParams();
      if (state.q) query.set('q',state.q);
      if (state.pet) query.set('pet',state.pet);
      state.categories.forEach(c => query.append('category',c));
      if (state.sale) query.set('sale','1');
      if (state.fresh) query.set('new','1');
      try { history.replaceState(null,'',location.pathname+(query.size ? '?'+query : '')); } catch (_) { /* Some file:// browsers restrict history changes. */ }
    }
    function updateResults() {
      const query = normalized(state.q.trim());
      const list = P.products.filter(p => (!query || normalized(p.name+' '+p.description+' '+p.brand).includes(query)) && (!state.pet || p.petType === state.pet || p.petType === 'both') && (!state.categories.length || state.categories.includes(p.category)) && (!state.brands.length || state.brands.includes(p.brand)) && p.price <= state.max && p.rating >= state.rating && (!state.sale || p.originalPrice > p.price) && (!state.fresh || p.tags.includes('new')));
      list.sort((a,b) => state.sort === 'price-asc' ? a.price-b.price : state.sort === 'price-desc' ? b.price-a.price : state.sort === 'rating' ? b.rating-a.rating : state.sort === 'newest' ? String(b.createdAt || '').localeCompare(String(a.createdAt || '')) : Number(b.tags.includes('bestseller'))-Number(a.tags.includes('bestseller')) || b.reviewCount-a.reviewCount);
      mount.querySelector('#catalog-count').textContent = `${list.length} sản phẩm${state.q ? ' cho “'+state.q+'”' : ''}`;
      const results = mount.querySelector('#catalog-results');
      results.classList.toggle('product-list',state.view === 'list');
      results.innerHTML = list.length ? list.slice(0,state.limit).map(P.productCard).join('') : `<div class="empty-state"><span class="empty-symbol" aria-hidden="true">⌕</span><h2>Chưa tìm thấy bạn đồng hành phù hợp</h2><p>Thử từ khóa khác hoặc mở rộng bộ lọc một chút nhé.</p><button type="button" class="button button-primary" data-clear-filters>Xóa bộ lọc</button></div>`;
      mount.querySelector('#load-more').hidden = state.limit >= list.length;
      mount.querySelector('#catalog-progress').textContent = list.length ? `Đang xem ${Math.min(state.limit,list.length)} / ${list.length} sản phẩm` : '';
      mount.querySelector('#price-range-value').textContent = P.money(state.max);
      mount.querySelectorAll('[data-view]').forEach(button => { button.classList.toggle('is-active',button.dataset.view === state.view); button.setAttribute('aria-pressed',button.dataset.view === state.view); });
      updateURL();
    }
    const readFilters = () => {
      const values = new FormData(form);
      state.pet = values.get('pet') || '';
      state.categories = values.getAll('category');
      state.brands = values.getAll('brand');
      state.max = Number(values.get('max'));
      state.rating = Number(values.get('rating'));
      state.sale = values.has('sale');
      state.fresh = values.has('fresh');
      state.limit = 12;
      updateResults();
    };
    form.addEventListener('change',readFilters);
    form.querySelector('[name="max"]').addEventListener('input',readFilters);
    form.addEventListener('submit',event => event.preventDefault());
    const search = mount.querySelector('#catalog-search');
    search.addEventListener('input',() => { state.q = search.value.slice(0,100);state.limit=12;updateResults(); });
    mount.querySelector('.catalog-search').addEventListener('submit',event => { event.preventDefault();updateResults(); });
    mount.querySelector('#product-sort').addEventListener('change',event => { state.sort = event.target.value; updateResults(); });
    mount.addEventListener('click',event => {
      if (event.target.closest('[data-clear-filters]')) { state=initial();form.reset();form.querySelector('[name="pet"][value=""]').checked=true;form.querySelector('[name="max"]').value=maxPrice;form.querySelector('[name="sale"]').checked=false;form.querySelector('[name="fresh"]').checked=false;form.querySelectorAll('[name="category"]').forEach(input => input.checked=false);search.value='';mount.querySelector('#product-sort').value='bestseller';updateResults(); }
      if (event.target.closest('#load-more')) { state.limit+=12;updateResults(); }
      const view = event.target.closest('[data-view]');
      if (view) { state.view=view.dataset.view;updateResults(); }
      const toggle = event.target.closest('.filter-toggle');
      if (toggle) { const open=toggle.getAttribute('aria-expanded') !== 'true';toggle.setAttribute('aria-expanded',open);form.classList.toggle('is-open',open); }
    });
    document.addEventListener('paws:wishlist',updateResults);
    updateResults();
  }
  P.renderProductDetail = product => {
    const v = firstVariant(product);
    const stock = stockOf(product,v);
    const wish = P.isWishlisted(product.id);
    return `<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="index.html">Trang chủ</a><span aria-hidden="true">/</span><a href="products.html">Sản phẩm</a><span aria-hidden="true">/</span><span>${e(product.name)}</span></nav>
      <section class="product-detail"><div class="product-gallery"><div class="detail-main-image">${badgeHTML(product)}<img id="detail-main-image" src="${e(product.images[0])}" alt="${e(product.name)} — góc nhìn 1" width="700" height="700" fetchpriority="high"></div><div class="gallery-thumbnails" aria-label="Các góc nhìn sản phẩm">${product.images.map((image,index) => `<button type="button" class="gallery-thumb ${index===0?'is-active':''}" data-image-index="${index}" aria-label="Xem ảnh ${index+1}" aria-pressed="${index===0}"><img src="${e(image)}" alt="" width="100" height="100"></button>`).join('')}</div><p class="image-note">Hình ảnh và sản phẩm chỉ dùng để minh họa.</p></div>
      <div class="detail-info"><p class="eyebrow">${e(product.brand)} · ${e(categories[product.category])}</p><h1>${e(product.name)}</h1><p class="product-rating">${star} ${e(product.rating)} <span>· ${e(product.reviewCount)} đánh giá minh họa</span></p><p class="detail-price" id="detail-price">${priceHTML(product,variantPrice(product,v))}</p><p class="detail-description">${e(product.description)}</p><fieldset class="variant-options"><legend>Chọn phiên bản <span id="variant-label">${e(v.label)}</span></legend><div class="variant-buttons">${product.variants.map(variant => `<button type="button" class="variant-button ${String(variant.id)===String(v.id)?'is-active':''}" data-variant-choice="${e(variant.id)}" aria-pressed="${String(variant.id)===String(v.id)}" ${stockOf(product,variant)<1?'disabled':''}>${e(variant.label)}${stockOf(product,variant)<1?' · Hết hàng':''}</button>`).join('')}</div></fieldset><p class="stock-status" id="detail-stock">${stock>0?`● Còn ${stock} sản phẩm demo`:'Hết hàng minh họa'}</p>
      <div class="detail-actions"><div class="quantity-control"><button type="button" data-detail-quantity="-1" aria-label="Giảm số lượng" disabled>−</button><label class="sr-only" for="detail-quantity">Số lượng</label><input id="detail-quantity" type="number" min="1" max="${Math.max(1,stock)}" value="1" inputmode="numeric"><button type="button" data-detail-quantity="1" aria-label="Tăng số lượng" ${stock<=1?'disabled':''}>+</button></div><button type="button" class="button button-primary" id="detail-add" data-add data-id="${e(product.id)}" data-variant="${e(v.id)}" data-quantity="1" ${!stock?'disabled':''}>Thêm vào giỏ <span aria-hidden="true">↗</span></button><button type="button" class="icon-button wish-button ${wish?'is-active':''}" data-wish data-id="${e(product.id)}" aria-pressed="${wish}" aria-label="Yêu thích ${e(product.name)}">${heart}</button></div><button type="button" class="button button-outline buy-now" id="buy-now" ${!stock?'disabled':''}>Mua ngay · Thanh toán mô phỏng</button><div class="delivery-notes"><p><span aria-hidden="true">↗</span> Miễn phí giao hàng demo từ 599.000 ₫</p><p><span aria-hidden="true">↺</span> Chính sách đổi trả 7 ngày minh họa</p><p><span aria-hidden="true">♡</span> Được chọn bằng sự quan tâm</p></div></div></section>
      <section class="product-information"><div class="product-tabs" role="tablist" aria-label="Thông tin sản phẩm"><button id="tab-description" role="tab" aria-selected="true" aria-controls="panel-description" tabindex="0" data-tab="description">Mô tả</button><button id="tab-specs" role="tab" aria-selected="false" aria-controls="panel-specs" tabindex="-1" data-tab="specs">Thông số</button><button id="tab-reviews" role="tab" aria-selected="false" aria-controls="panel-reviews" tabindex="-1" data-tab="reviews">Đánh giá mẫu (${e(product.reviewCount)})</button></div><div id="panel-description" role="tabpanel" aria-labelledby="tab-description" tabindex="0"><h2>Điều nhỏ tạo nên sự khác biệt.</h2><p>${e(product.description)}</p><p>Chọn phiên bản phù hợp với thể trạng, thói quen và sở thích của thú cưng. Luôn giám sát bạn nhỏ khi sử dụng đồ chơi hoặc phụ kiện. Với thức ăn và sản phẩm chăm sóc, hãy đọc hướng dẫn và tham khảo bác sĩ thú y khi cần.</p><p class="demo-note">Danh mục trong PAWS & CO. là dữ liệu thiết kế minh họa, không phải lời khẳng định chất lượng hoặc tư vấn y tế cho sản phẩm thật.</p></div><div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" tabindex="0" hidden><dl class="spec-list"><div><dt>Thương hiệu minh họa</dt><dd>${e(product.brand)}</dd></div><div><dt>Danh mục</dt><dd>${e(categories[product.category])}</dd></div><div><dt>Dành cho</dt><dd>${product.petType==='dog'?'Chó':product.petType==='cat'?'Mèo':'Chó và mèo'}</dd></div><div><dt>Phiên bản</dt><dd>${product.variants.map(variant => e(variant.label)).join(' · ')}</dd></div><div><dt>Mã sản phẩm demo</dt><dd>PAWS-${e(product.id)}</dd></div></dl></div><div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" tabindex="0" hidden><p class="demo-note">Những nội dung dưới đây là đánh giá minh họa cho giao diện, không phải phản hồi của khách hàng thật.</p><div class="review-card"><p class="product-rating">★★★★★ · Minh Anh</p><h3>Một lựa chọn thật dễ thương</h3><p>Thiết kế tinh tế, thông tin dễ hiểu. Mình rất thích trải nghiệm chọn phiên bản và đặt hàng của cửa hàng.</p><small>Đánh giá mẫu · Không xác thực mua hàng</small></div><div class="review-card"><p class="product-rating">★★★★★ · Hoàng Nam</p><h3>Quan tâm đến từng chi tiết</h3><p>Đây là phản hồi giả lập để thể hiện bố cục đánh giá sản phẩm.</p><small>Nội dung minh họa</small></div></div></section>
      <section class="related-products"><div class="section-heading"><div><p class="eyebrow">THÊM MỘT CHÚT YÊU THƯƠNG</p><h2>Bạn nhỏ có thể thích</h2></div><a class="text-link" href="products.html?category=${e(product.category)}">Xem cùng danh mục ↗</a></div><div class="product-grid">${P.products.filter(p => p.id!==product.id && (p.category===product.category || p.petType===product.petType)).slice(0,4).map(P.productCard).join('')}</div></section>`;
  };
  function initDetail() {
    const mount=document.getElementById('product-app');
    if (!mount) return;
    const product=getProduct(new URLSearchParams(location.search).get('id'));
    if (!product) { mount.innerHTML=emptyHTML('Không tìm thấy sản phẩm','Sản phẩm này không có trong danh mục minh họa. Cùng khám phá những lựa chọn khác nhé.');document.title='Không tìm thấy sản phẩm · PAWS & CO.';return; }
    document.title=product.name+' · PAWS & CO.';
    mount.innerHTML=P.renderProductDetail(product);
    let variant=firstVariant(product);
    const quantity=mount.querySelector('#detail-quantity');
    function syncQuantity() {
      const stock=stockOf(product,variant);
      const value=Math.max(1,Math.min(Math.max(1,stock),Number.parseInt(quantity.value,10)||1));
      quantity.value=value;
      quantity.max=Math.max(1,stock);
      mount.querySelector('[data-detail-quantity="-1"]').disabled=value<=1;
      mount.querySelector('[data-detail-quantity="1"]').disabled=value>=stock;
      const add=mount.querySelector('#detail-add');
      add.dataset.variant=variant.id;add.dataset.quantity=value;add.disabled=!stock;
      mount.querySelector('#buy-now').disabled=!stock;
      quantity.disabled=!stock;
    }
    function activateTab(name) {
      mount.querySelectorAll('[data-tab]').forEach(button => { const active=button.dataset.tab===name;button.setAttribute('aria-selected',active);button.tabIndex=active?0:-1;mount.querySelector('#panel-'+button.dataset.tab).hidden=!active; });
    }
    mount.addEventListener('click',event => {
      const thumbnail=event.target.closest('[data-image-index]');
      if (thumbnail) { const index=Number(thumbnail.dataset.imageIndex);const image=mount.querySelector('#detail-main-image');image.src=product.images[index];image.alt=product.name+' — góc nhìn '+(index+1);mount.querySelectorAll('[data-image-index]').forEach(button => { button.classList.toggle('is-active',button===thumbnail);button.setAttribute('aria-pressed',button===thumbnail); }); }
      const choice=event.target.closest('[data-variant-choice]');
      if (choice) { variant=product.variants.find(v => String(v.id)===choice.dataset.variantChoice);mount.querySelector('#variant-label').textContent=variant.label;mount.querySelector('#detail-price').innerHTML=priceHTML(product,variantPrice(product,variant));mount.querySelector('#detail-stock').textContent=`● Còn ${stockOf(product,variant)} sản phẩm demo`;mount.querySelectorAll('[data-variant-choice]').forEach(button => { button.classList.toggle('is-active',button===choice);button.setAttribute('aria-pressed',button===choice); });syncQuantity(); }
      const control=event.target.closest('[data-detail-quantity]');
      if (control) { quantity.value=(Number(quantity.value)||1)+Number(control.dataset.detailQuantity);syncQuantity(); }
      const tab=event.target.closest('[data-tab]');
      if (tab) activateTab(tab.dataset.tab);
      if (event.target.closest('#buy-now')) { syncQuantity();if(P.addToCart(product.id,variant.id,Number(quantity.value))!==false) location.href='checkout.html'; }
    });
    mount.querySelector('[role="tablist"]').addEventListener('keydown',event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      const tabs=[...mount.querySelectorAll('[data-tab]')];
      const current=tabs.indexOf(document.activeElement);
      if (current<0) return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      activateTab(tabs[next].dataset.tab);tabs[next].focus();
    });
    quantity.addEventListener('change',syncQuantity);
    syncQuantity();
  }
  P.renderWishlist = () => {
    const mount=document.getElementById('wishlist-app');
    if(!mount) return;
    const restoreFocus=mount.contains(document.activeElement);
    const list=P.products.filter(p => P.isWishlisted(p.id));
    mount.innerHTML=`<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="index.html">Trang chủ</a><span aria-hidden="true">/</span><span>Yêu thích</span></nav><header class="page-heading"><p class="eyebrow">DÀNH CHO MỘT NGÀY ĐẶC BIỆT</p><h1>Những điều bạn thích.</h1><p>${list.length} món đồ đang chờ bạn nhỏ. Danh sách được lưu trên trình duyệt này.</p></header>${list.length?`<div class="product-grid wishlist-grid">${list.map(P.productCard).join('')}</div>`:emptyHTML('Một góc nhỏ để dành yêu thương','Chạm vào trái tim trên sản phẩm để lưu những món đồ bạn yêu thích.')}`;
    if(restoreFocus) (mount.querySelector('[data-wish]') || mount.querySelector('a.button'))?.focus({preventScroll:true});
  };
  P.initProducts=() => { initCatalog();initDetail();P.renderWishlist();document.addEventListener('paws:wishlist',P.renderWishlist); };
})();
