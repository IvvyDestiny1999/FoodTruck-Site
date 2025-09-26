// App script: loads data/menu.json (or localStorage), renders menu, handles add-to-cart and donation bars.
const API_BASE = '.'; // static assets

async function loadMenu(){
  // prefer localStorage edited menu if exists
  const local = localStorage.getItem('menu_data');
  if(local){
    try { return JSON.parse(local); } catch(e){ console.warn('invalid local menu'); }
  }
  try {
    const resp = await fetch('data/menu.json?ts=' + Date.now());
    if(!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    return data;
  } catch(e){
    console.warn('fetch menu failed', e);
    return [];
  }
}

function formatMoney(v){ return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function renderMenu(items){
  const container = document.getElementById('menu');
  if(!container) return;
  const grouped = items.reduce((acc,item)=>{ acc[item.category]=acc[item.category]||[]; acc[item.category].push(item); return acc; },{});
  container.innerHTML = '';
  Object.keys(grouped).forEach(cat=>{
    const h = document.createElement('h2'); h.textContent = cat; container.appendChild(h);
    const grid = document.createElement('div'); grid.className='grid'; container.appendChild(grid);
    grouped[cat].forEach(it=>{
      const card = document.createElement('article'); card.className='card';
      if(it.image){
        const img = document.createElement('img'); img.src = it.image; img.alt = it.name; card.appendChild(img);
      } else {
        const ph = document.createElement('div'); ph.className='placeholder'; ph.textContent='Sem imagem'; card.appendChild(ph);
      }
      const body = document.createElement('div'); body.className='card-body';
      const title = document.createElement('h3'); title.textContent = it.name; body.appendChild(title);
      const p = document.createElement('p'); p.style.color='#64748b'; p.textContent = it.description || ''; body.appendChild(p);
      const footer = document.createElement('div'); footer.style.display='flex'; footer.style.justifyContent='space-between'; footer.style.alignItems='center';
      const price = document.createElement('div'); price.className='price'; price.textContent = 'R$ ' + Number(it.price).toFixed(2);
      const btn = document.createElement('button'); btn.className='btn'; btn.textContent='Pedir'; btn.onclick = ()=>{ addToCart(it); };
      footer.appendChild(price); footer.appendChild(btn);
      body.appendChild(footer);
      card.appendChild(body);
      grid.appendChild(card);
    });
  });
}

function addToCart(item){
  const c = JSON.parse(localStorage.getItem('cart')||'[]');
  c.push(item);
  localStorage.setItem('cart', JSON.stringify(c));
  alert('Adicionado ao carrinho: ' + item.name);
}

async function updateDonationBars(){
  // items: doacoes.txt (integer)
  try{
    const r = await fetch('data/doacoes.txt?ts=' + Date.now());
    if(r.ok){
      const t = (await r.text()).trim();
      const n = Number(t) || 0;
      document.getElementById('received').textContent = n;
      const meta = Number(document.getElementById('meta').textContent) || 1;
      const pct = Math.min(100, Math.round((n/meta)*100));
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = pct + '%';
    }
  }catch(e){ console.warn('doacoes fetch failed', e); }

  try{
    const r = await fetch('data/money.txt?ts=' + Date.now());
    if(r.ok){
      const t = (await r.text()).trim().replace(',', '.');
      const n = Number(t) || 0;
      document.getElementById('receivedMoney').textContent = formatMoney(n);
      document.getElementById('metaMoney').textContent = formatMoney(5000);
      const pct = Math.min(100, Math.round((n/5000)*100));
      document.getElementById('moneyBar').style.width = pct + '%';
      document.getElementById('moneyText').textContent = pct + '%';
    }
  }catch(e){ console.warn('money fetch failed', e); }
}

(async function init(){
  const items = await loadMenu();
  renderMenu(items);
  updateDonationBars();
  // refresh bars every 30s
  setInterval(updateDonationBars, 30000);
})();

