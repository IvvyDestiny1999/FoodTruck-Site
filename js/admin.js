function showAdmin(){
  document.getElementById('loginArea').style.display='none';
  document.getElementById('adminUI').style.display='block';
  renderAdminList();
}

document.getElementById('btnLogin').addEventListener('click', ()=>{
  const p = document.getElementById('adminPass').value || '';
  if(p==='senha123'){ showAdmin(); } else { alert('Senha incorreta'); }
});

function renderAdminList(){
  const list = document.getElementById('adminList');
  const data = JSON.parse(localStorage.getItem('menu_data')||JSON.stringify([]));
  list.innerHTML = '';
  data.forEach((it,idx)=>{
    const div = document.createElement('div'); div.className='card-admin'; div.style.marginBottom='8px';
    div.innerHTML = '<strong>'+it.name+'</strong> — R$ '+ Number(it.price).toFixed(2) +'<div><button onclick="removeItem('+idx+')">Remover</button></div>';
    list.appendChild(div);
  });
}

document.getElementById('addBtn').addEventListener('click', async ()=>{
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const desc = document.getElementById('description').value;
  const file = document.getElementById('imageFile').files[0];
  if(!name || isNaN(price)){ alert('Nome e preço obrigatórios'); return; }
  let imagePath = '';
  if(file){
    // convert to base64 and store as data URL (works in SPCK preview)
    const reader = new FileReader();
    reader.onload = function(e){
      imagePath = e.target.result;
      persistItem({name,price,category,description:desc,image:imagePath});
    };
    reader.readAsDataURL(file);
  } else {
    persistItem({name,price,category,description:desc,image:''});
  }
});

function persistItem(obj){
  const data = JSON.parse(localStorage.getItem('menu_data')||JSON.stringify([]));
  const nextId = data.length ? Math.max(...data.map(d=>d.id)) + 1 : 1;
  const item = { id: nextId, category: obj.category, name: obj.name, description: obj.description, price: Number(obj.price).toFixed(2), image: obj.image };
  data.push(item);
  localStorage.setItem('menu_data', JSON.stringify(data));
  renderAdminList();
  // also re-render main menu if open
  if(window.location.pathname.endsWith('index.html') || window.location.pathname==='/' ) window.location.reload();
}

function removeItem(idx){
  const data = JSON.parse(localStorage.getItem('menu_data')||JSON.stringify([]));
  data.splice(idx,1);
  localStorage.setItem('menu_data', JSON.stringify(data));
  renderAdminList();
  if(window.location.pathname.endsWith('index.html') || window.location.pathname==='/' ) window.location.reload();
}

document.getElementById('exportBtn').addEventListener('click', ()=>{
  const data = localStorage.getItem('menu_data') || JSON.stringify([]);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='menu_export.json'; a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('importFile').addEventListener('change', (e)=>{
  const f = e.target.files[0]; if(!f) return;
  const reader = new FileReader();
  reader.onload = function(ev){ try{ const j = JSON.parse(ev.target.result); localStorage.setItem('menu_data', JSON.stringify(j)); alert('Importado'); window.location.reload(); }catch(err){ alert('JSON inválido'); } };
  reader.readAsText(f);
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
  if(!confirm('Resetar demo para os itens iniciais?')) return;
  fetch('data/menu.json?ts='+Date.now()).then(r=>r.json()).then(j=>{ localStorage.setItem('menu_data', JSON.stringify(j)); renderAdminList(); window.location.reload(); });
});

// hidden admin open for hero button
function openAdmin(){ location.href='admin.html'; }
