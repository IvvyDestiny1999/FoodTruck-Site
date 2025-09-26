function renderCart(){
  const area = document.getElementById('cartArea');
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  if(cart.length===0){ area.innerHTML='<p>Carrinho vazio</p>'; return; }
  let html = '<ul>';
  let total = 0;
  cart.forEach((c,idx)=>{ html += `<li>${c.name} — R$ ${Number(c.price).toFixed(2)} <button onclick="removeItem(${idx})">Remover</button></li>`; total += Number(c.price); });
  html += '</ul><p><strong>Total: R$ '+ total.toFixed(2) +'</strong></p>';
  area.innerHTML = html;
  window.cartTotal = total;
}
function removeItem(i){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.splice(i,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  const total = window.cartTotal || 0;
  if(total<=0){ alert('Carrinho vazio'); return; }
  // simulate QR generation: create a data URL with text
  const payload = 'PIX|amount:'+ total.toFixed(2) + '|tx:' + Date.now();
  const canvas = document.createElement('canvas'); canvas.width=300; canvas.height=300;
  const ctx = canvas.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,300,300);
  ctx.fillStyle='#000'; ctx.fillText('PIX QR',20,30); ctx.fillText(payload,20,60);
  const dataUrl = canvas.toDataURL();
  document.getElementById('qrArea').innerHTML = '<h3>PIX (simulação)</h3><p>Código: <code>'+payload+'</code></p><img src="'+dataUrl+'" alt="QR"/>';
});
renderCart();
