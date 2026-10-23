/* Assignment pages: static editorial content and frontend-only form demonstrations. */
(() => {
  'use strict';
  const P=window.Paws;
  const articleMeta={
    nutrition:{date:'2026-10-12',summary:'Đọc nhãn, thay đổi khẩu phần từ từ và giữ nước sạch để chọn một bữa ăn phù hợp cho mèo.'},
    care:{date:'2026-10-08',summary:'Biến thói quen chải lông thành khoảng thời gian nhẹ nhàng cùng người bạn bốn chân.'},
    home:{date:'2026-10-02',summary:'Một góc nghỉ yên tĩnh và chiếc giường đúng kích thước giúp bé cảm thấy an toàn hơn.'}
  };
  const articleCard=(id,article)=>`<article class="journal-card"><a class="journal-image" href="article.html?id=${encodeURIComponent(id)}"><img src="assets/images/${P.escape(article.image)}" alt="Minh họa ${P.escape(article.title)}" width="720" height="480" loading="lazy"></a><div class="journal-meta"><span>${P.escape(article.category)}</span><time datetime="${articleMeta[id].date}">${new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(articleMeta[id].date))} · Minh họa</time></div><h2><a href="article.html?id=${encodeURIComponent(id)}">${P.escape(article.title)}</a></h2><p>${articleMeta[id].summary}</p><a class="text-link" href="article.html?id=${encodeURIComponent(id)}">Đọc bài viết ↗</a></article>`;
  function initArticles(){
    const blog=document.getElementById('blog-app');
    if(blog)blog.innerHTML=Object.entries(P.articles).map(([id,article])=>articleCard(id,article)).join('');
    const mount=document.getElementById('article-app');
    if(!mount)return;
    const id=new URLSearchParams(location.search).get('id');
    const article=Object.prototype.hasOwnProperty.call(P.articles,id)?P.articles[id]:null;
    if(!article || !Object.prototype.hasOwnProperty.call(articleMeta,id)){
      mount.innerHTML='<section class="empty-state"><h1>Chưa tìm thấy bài viết</h1><p>Liên kết có thể chưa đúng. Mời bạn chọn một câu chuyện khác trong nhật ký.</p><a class="button" href="blog.html">Về trang Tin tức ↗</a></section>';return;
    }
    document.title=article.title+' | sisimimi';
    mount.innerHTML=`<nav class="breadcrumb" aria-label="Đường dẫn"><a href="index.html">Trang chủ</a><span>/</span><a href="blog.html">Tin tức</a><span>/</span><span aria-current="page">Bài viết</span></nav><article class="article-page"><header class="page-heading"><p class="eyebrow">NHẬT KÝ SISIMIMI · ${article.category}</p><h1>${P.escape(article.title)}</h1><p><time datetime="${articleMeta[id].date}">${articleMeta[id].date}</time> · Ngày đăng và tác giả minh họa · Ban nội dung sisimimi</p></header><img class="article-cover" src="assets/images/${article.image}" alt="Minh họa ${P.escape(article.title)}" width="720" height="480"><div class="article-body">${article.content}</div><a class="button" href="${article.link}">${article.cta} ↗</a></article><section class="section"><div class="section-heading"><h2>Đọc thêm một chút.</h2><a class="text-link" href="blog.html">Tất cả bài viết ↗</a></div><div class="journal-grid">${Object.entries(P.articles).filter(([key])=>key!==id).map(([key,value])=>articleCard(key,value)).join('')}</div></section>`;
  }
  function checkField(field){
    const value=field.value.trim(),kind=field.dataset.validate;
    let error='';
    if(kind==='name' && (value.length<2 || !/\p{L}/u.test(value)))error='Vui lòng nhập họ tên có ít nhất 2 ký tự chữ.';
    if(kind==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))error='Vui lòng nhập địa chỉ email hợp lệ.';
    if(kind==='phone' && !/^(0\d{9}|\+84\d{9})$/.test(value.replace(/[\s.-]/g,'')))error='Nhập số điện thoại Việt Nam hợp lệ, ví dụ 0901234567.';
    if(kind==='message' && value.length<10)error='Lời nhắn cần có ít nhất 10 ký tự.';
    if(kind==='application' && value.length<20)error='Phần giới thiệu cần có ít nhất 20 ký tự.';
    if(kind==='required' && !value)error='Vui lòng chọn một vị trí ứng tuyển.';
    if(kind==='password' && (field.value.length<8 || !value))error='Mật khẩu giả lập cần có ít nhất 8 ký tự.';
    if(kind==='confirm' && (!value || field.value!==document.getElementById('register-password').value))error='Mật khẩu xác nhận chưa khớp.';
    if(kind==='url' && value){
      try {const url=new URL(value);if(!['http:','https:'].includes(url.protocol))error='Chỉ dùng đường dẫn bắt đầu bằng https:// hoặc http://.';}
      catch(_){error='Vui lòng nhập đường dẫn CV hợp lệ hoặc để trống.';}
    }
    if(field.maxLength>0 && field.value.length>field.maxLength)error='Nội dung quá dài. Vui lòng rút ngắn theo giới hạn của trường.';
    const message=document.getElementById(field.id+'-error');
    if(message)message.textContent=error;
    field.setAttribute('aria-invalid',String(Boolean(error)));
    return !error;
  }
  function initForm(id,success){
    const form=document.getElementById(id);if(!form)return;
    const status=document.getElementById(id.replace('-form','-status'));
    const fields=[...form.querySelectorAll('[data-validate]')];
    const update=event=>{
      if(event.target.dataset.validate && event.target.getAttribute('aria-invalid')==='true')checkField(event.target);
      if(event.target.id==='register-password' && document.getElementById('register-confirm').value)checkField(document.getElementById('register-confirm'));
      if(!fields.some(field=>field.getAttribute('aria-invalid')==='true') && status.classList.contains('is-error')){status.textContent='';status.classList.remove('is-error');}
    };
    form.addEventListener('input',update);form.addEventListener('change',update);
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const valid=fields.map(checkField).every(Boolean);
      if(!valid){status.textContent='Vui lòng kiểm tra các trường được đánh dấu.';status.classList.add('is-error');fields.find(field=>field.getAttribute('aria-invalid')==='true').focus();return;}
      const button=form.querySelector('[type="submit"]');
      const text=button.textContent;button.disabled=true;button.textContent='Đang kiểm tra trên trình duyệt…';
      status.classList.remove('is-error');status.textContent='Đang xử lý mô phỏng, không gửi dữ liệu ra máy chủ.';
      window.setTimeout(()=>{
        form.reset();fields.forEach(field=>field.removeAttribute('aria-invalid'));
        button.disabled=false;button.textContent=text;status.textContent=success;status.focus();
      },300);
    });
  }
  function initAuth(){
    const tabs=[...document.querySelectorAll('[data-auth-tab]')];
    const select=tab=>{
      tabs.forEach(button=>{const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!active;});
    };
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>select(tab));
      tab.addEventListener('keydown',event=>{
        if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=tabs[event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+1)%tabs.length];select(next);next.focus();}
      });
    });
    initForm('login-form','Đăng nhập mô phỏng thành công. Không tạo phiên đăng nhập hoặc xác thực tài khoản thật.');
    initForm('register-form','Đăng ký mô phỏng thành công. Không tạo tài khoản thật và không lưu email hay mật khẩu.');
  }
  function initFAQ(){
    const search=document.getElementById('faq-search');if(!search)return;
    const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLocaleLowerCase('vi');
    const entries=[...document.querySelectorAll('.faq-entry')];
    const update=()=>{
      const query=normalize(search.value.trim());let count=0;
      entries.forEach(entry=>{const matches=normalize(entry.textContent).includes(query);entry.hidden=!matches;if(matches)count++;});
      document.getElementById('faq-count').textContent=`${count} câu hỏi phù hợp`;
      document.getElementById('faq-empty').hidden=count>0;
    };
    search.addEventListener('input',update);update();
  }
  P.initSchool=()=>{
    initArticles();initAuth();initFAQ();
    initForm('contact-form','Đã kiểm tra lời nhắn demo thành công. Không có email hoặc thông tin cá nhân nào được gửi hay lưu.');
    initForm('application-form','Ứng tuyển mô phỏng thành công. Không có hồ sơ thật được gửi hoặc lưu; không liên hệ tuyển dụng thực tế.');
    document.querySelectorAll('[data-apply]').forEach(button=>button.addEventListener('click',()=>{
      const select=document.getElementById('apply-position');select.value=button.dataset.apply;
      if(select.getAttribute('aria-invalid')==='true')checkField(select);
      document.getElementById('application').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      select.focus({preventScroll:true});
    }));
    document.getElementById('load-map')?.addEventListener('click',event=>{
      const frame=document.getElementById('contact-map');frame.src=frame.dataset.mapSrc;frame.hidden=false;
      event.currentTarget.hidden=true;
      document.getElementById('map-status').textContent='Đang yêu cầu bản đồ từ Google. Nếu mạng chặn nội dung, dùng liên kết Mở Google Maps bên dưới. Địa điểm chỉ minh họa.';
    });
    // Indicate the current page consistently across the shared header.
    document.querySelectorAll('.main-nav .nav-link.is-active').forEach(link=>link.setAttribute('aria-current','page'));
  };
})();
