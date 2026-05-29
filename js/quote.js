(function(){
  const PHONE='919422062887';
  const form=document.getElementById('quoteForm');
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const data=new FormData(form);
    const lines=[
      'Hello Classic Business Centre, I would like a quote.',
      '',
      `Name: ${data.get('name')||'-'}`,
      `Phone: ${data.get('phone')||'-'}`,
      `Service: ${data.get('service')||'-'}`,
      `Branch: ${data.get('branch')||'-'}`,
      `Quantity/Size: ${data.get('quantity')||'-'}`,
      `Need by: ${data.get('deadline')||'-'}`,
      `Details: ${data.get('details')||'-'}`
    ];
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
  });
})();
