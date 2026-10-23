/* Small page bootstrap. Every page also works from a local file, without a server API. */
(() => {
  'use strict';
  const P = window.Paws;
  const articleCopy = {
    nutrition: {title:'Một bữa ăn tốt bắt đầu từ việc hiểu bé.',category:'DINH DƯỠNG',image:'journal-cat-food.svg',content:'<p>Mỗi bé mèo có một nhịp sống, độ tuổi và nhu cầu khác nhau. Khi chọn thức ăn, hãy bắt đầu từ nhãn sản phẩm: đối tượng sử dụng, thành phần, hướng dẫn định lượng và hạn dùng.</p><h3>Thay đổi từ từ</h3><p>Khi đổi thức ăn, trộn lượng nhỏ thức ăn mới với khẩu phần quen thuộc và tăng dần theo hướng dẫn của nhà sản xuất hoặc bác sĩ thú y. Đừng thay đổi nhiều loại cùng lúc; quan sát việc ăn uống, tiêu hóa và mức năng lượng của bé.</p><h3>Một bát nước sạch luôn ở gần</h3><p>Thay nước thường xuyên và giữ bát sạch. Vị trí yên tĩnh, tách xa khay vệ sinh thường giúp bé thoải mái hơn khi ăn uống.</p><p class="notice">Bài viết minh họa, không thay thế tư vấn thú y. Khi bé có bệnh nền, dị ứng hoặc dấu hiệu bất thường, hãy hỏi bác sĩ thú y trước khi đổi chế độ ăn.</p>',link:'products.html?category=food-cat',cta:'Khám phá góc dinh dưỡng cho mèo'},
    care: {title:'Chăm chút bộ lông, thêm một chút gần nhau.',category:'CHĂM SÓC',image:'journal-dog-care.svg',content:'<p>Chải lông không cần là một nhiệm vụ vội vã. Chọn thời điểm bé đang thư giãn, để bé làm quen với dụng cụ rồi bắt đầu bằng những lần chạm thật nhẹ.</p><h3>Chọn dụng cụ phù hợp</h3><p>Lông ngắn, dài và xoăn cần cách chăm sóc khác nhau. Chọn lược theo loại lông, tránh kéo mạnh vùng rối và ngừng lại nếu bé khó chịu. Có thể chia thành nhiều lần ngắn thay vì cố làm xong trong một lần.</p><h3>Nhẹ nhàng cũng là một cách yêu</h3><p>Dùng sản phẩm vệ sinh được ghi rõ dành cho thú cưng, đọc hướng dẫn trước khi dùng. Lau khô vùng ẩm và kiểm tra da khi chải. Nếu thấy mẩn đỏ, rụng lông bất thường hoặc ngứa kéo dài, hãy liên hệ bác sĩ thú y.</p><p class="notice">Nội dung chăm sóc chung và ảnh đều là minh họa. Không đưa ra chẩn đoán hoặc cam kết điều trị.</p>',link:'products.html?category=care',cta:'Ghé góc vệ sinh & chăm sóc'},
    home: {title:'Một góc nhỏ bình yên, một giấc ngủ thật ngoan.',category:'CUỘC SỐNG CÙNG BÉ',image:'journal-home.svg',content:'<p>Chiếc giường tốt không nhất thiết phải lớn nhất. Nó cần đủ chỗ để bé duỗi người, có bề mặt thoải mái và được đặt ở nơi bé thật sự cảm thấy an toàn.</p><h3>Để bé tự chọn nhịp nghỉ</h3><p>Quan sát những nơi bé thích nằm: cạnh cửa sổ, góc phòng yên tĩnh hay sát chỗ bạn thường ngồi. Đặt chỗ ngủ ở vị trí tương tự, tránh lối đi đông và gió thổi trực tiếp.</p><h3>Một thói quen sạch sẽ</h3><p>Giặt vỏ hoặc vệ sinh theo hướng dẫn vật liệu, phơi khô trước khi cho bé dùng lại. Một món đồ quen có mùi dễ chịu giúp chỗ nghỉ mới bớt lạ lẫm.</p><p class="notice">Bài viết và sản phẩm được dùng để minh họa. Tham khảo nhu cầu thực tế của từng bé và hướng dẫn chăm sóc phù hợp.</p>',link:'products.html?category=beds',cta:'Tìm một góc ngủ êm cho bé'}
  };
  P.articles = articleCopy;
  P.renderShell();
  P.initProducts();
  if (document.body.dataset.page === 'home') {
    document.getElementById('home-categories').innerHTML = P.categories.map(category => `<a class="category-card" href="products.html?category=${encodeURIComponent(category.id)}"><div class="category-image"><img src="${P.escape(category.image)}" alt="${P.escape(category.name)} — minh họa" width="300" height="300" loading="lazy"></div><h3>${P.escape(category.name)} <span aria-hidden="true">↗</span></h3></a>`).join('');
    const favorites = P.products.filter(product => product.tags.includes('bestseller'));
    const chosen = ['food-dog','food-cat','toys','accessories'].map(category => favorites.find(p=>p.category === category) || P.products.find(p=>p.category===category));
    document.getElementById('bestsellers').innerHTML = chosen.map(P.productCard).join('');
    document.getElementById('new-arrivals').innerHTML = P.products.filter(product=>product.tags.includes('new')).slice(-4).map(P.productCard).join('');
    document.getElementById('newsletter-form').addEventListener('submit',event => {
      event.preventDefault();
      const input = document.getElementById('newsletter-email'), status = document.getElementById('newsletter-status');
      const valid = input.value.trim() && !input.validity.typeMismatch && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      input.setAttribute('aria-invalid',String(!valid));
      status.textContent = valid ? 'Đăng ký demo thành công! Không có email được gửi hoặc lưu.' : 'Bạn nhập địa chỉ email hợp lệ để mình giữ liên lạc nhé.';
      status.classList.toggle('is-error',!valid);
      if (valid) input.value=''; else input.focus();
    });
  }
  // Page-level headings stay stable when cart content is re-rendered.
  const page = document.body.dataset.page;
  const headings = {cart:['Giỏ yêu thương.','Mỗi món nhỏ đều dành cho một người bạn đặc biệt.'],checkout:['Thêm một bước, thêm niềm vui.','Đặt hàng minh họa · Không thu tiền, không gửi đơn hàng thật.']};
  if(headings[page]) {
    const heading=document.createElement('header');heading.className='page-heading';
    heading.innerHTML=`<nav class="breadcrumb" aria-label="Đường dẫn"><a href="index.html">Trang chủ</a><span>/</span><a href="products.html">Cửa hàng</a><span>/</span><span aria-current="page">${page==='cart'?'Giỏ hàng':'Checkout demo'}</span></nav><p class="eyebrow">LITTLE THINGS, BIG LOVE</p><h1>${headings[page][0]}</h1><p>${headings[page][1]}</p>`;
    document.querySelector('.page-shell').prepend(heading);
  }
  P.initCart();
  P.initUI();
  P.initSchool();
  document.querySelectorAll('[data-icon]').forEach(node=>{node.innerHTML=P.icon(node.dataset.icon);});
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-article]');
    if(button && P.articles[button.dataset.article]) window.location.href='article.html?id='+encodeURIComponent(button.dataset.article);
  });
  // Handle images that failed before the global capture listener was registered.
  document.querySelectorAll('img').forEach(image=>{if(image.complete&&image.naturalWidth===0&&!image.dataset.fallback){image.dataset.fallback='true';image.src='assets/images/fallback.svg';}});
  if(!P.storageAvailable)P.toast('Trình duyệt đang chặn lưu trữ. Giỏ và yêu thích chỉ được giữ tạm trong trang này.');
})();
