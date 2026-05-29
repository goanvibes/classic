
(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('cbc-theme') || 'light';
  root.dataset.theme=saved;
  const nav=document.getElementById('siteNav');
  const menu=document.querySelector('.menu-btn');
  const theme=document.querySelector('.theme-toggle');
  const navLinks=document.querySelectorAll('.site-nav a');
  const current=(location.pathname.split('/').pop() || 'index.html');
  navLinks.forEach(a=>{ if(a.getAttribute('href')===current) a.classList.add('active'); });
  if(menu && nav){
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
    });
    navLinks.forEach(a=>a.addEventListener('click',()=>{ nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }));
  }
  function renderTheme(){
    const dark=root.dataset.theme==='dark';
    if(theme) theme.innerHTML=`<i class="fa-solid ${dark?'fa-sun':'fa-moon'}"></i>`;
  }
  renderTheme();
  if(theme){ theme.addEventListener('click',()=>{ const next=root.dataset.theme==='dark'?'light':'dark'; root.dataset.theme=next; localStorage.setItem('cbc-theme',next); renderTheme(); }); }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('in'); }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const serviceCards=document.querySelectorAll('.interactive-card');
  serviceCards.forEach(card=>{
    const btn=card.querySelector('.service-summary');
    const panel=card.querySelector('.service-expanded-info');
    if(!btn || !panel) return;
    btn.addEventListener('click',()=>{
      const wasOpen=card.classList.contains('active');
      serviceCards.forEach(other=>{
        other.classList.remove('active');
        const otherBtn=other.querySelector('.service-summary');
        const otherPanel=other.querySelector('.service-expanded-info');
        if(otherBtn) otherBtn.setAttribute('aria-expanded','false');
        if(otherPanel) otherPanel.hidden=true;
      });
      if(!wasOpen){
        card.classList.add('active');
        btn.setAttribute('aria-expanded','true');
        panel.hidden=false;
        setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'center'}),80);
      }
    });
  });
  const form=document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      const msg=`Hello Classic Business Centre, I need a quote.%0A%0AName: ${encodeURIComponent(data.name||'')}%0APhone: ${encodeURIComponent(data.phone||'')}%0AService: ${encodeURIComponent(data.service||'')}%0ADetails: ${encodeURIComponent(data.details||'')}`;
      window.open(`https://wa.me/919422062887?text=${msg}`,'_blank');
    });
  }
})();
