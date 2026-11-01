/* ===== ДАННЫЕ ТОВАРОВ ===== */
const products = [
  {id:1, name:'Кола Классик', cat:'Классика', emoji:'🥤 ', price:120, gift:'+ жвачка'},
  {id:2, name:'Дюшес Лимонад', cat:'Классика', emoji:'🍋 ', price:110, gift:'+ леденцы'},
  {id:3, name:'Тархун', cat:'Классика', emoji:'🌿 ', price:130, gift:'+ жвачка'},
  {id:4, name:'Dr Pepper', cat:'Классика', emoji:'🟤 ', price:160, gift:'+ стикеры'},
  {id:5, name:'Манго-Маракуйя', cat:'Экзотика', emoji:'🥭 ', price:180, gift:'+ паучи 18+'},
  {id:6, name:'Лайм-Мята', cat:'Экзотика', emoji:'🍈 ', price:170, gift:'+ паучи 18+'},
  {id:7, name:'Арбузный бум', cat:'Экзотика', emoji:'🍉 ', price:190, gift:'+ жвачка'},
  {id:8, name:'Кислый лимон', cat:'Крафт', emoji:'🍋‍🟩 ', price:200, gift:'+ паучи 18+'},
  {id:9, name:'Черника-Ваниль', cat:'Крафт', emoji:'🫐 ', price:210, gift:'+ леденцы'},
  {id:10, name:'Энергетик Турбо', cat:'Энергетики', emoji:'⚡ ', price:220, gift:'+ паучи 18+'},
  {id:11, name:'Энергетик Манго', cat:'Энергетики', emoji:'🔋 ', price:230, gift:'+ стикеры'},
  {id:12, name:'Набор «Газява-пак»', cat:'Наборы', emoji:'🎁 ', price:690, gift:'+ подарок 18+'},
];

/* ===== КОРЗИНА ===== */
let cart = [];

function renderFilters(){
  const cats = ['Все', ...new Set(products.map(p => p.cat))];
  const box = document.getElementById('filters');
  box.innerHTML = cats.map((c, i) =>
    `<button class="filter ${i === 0 ? 'active' : ''}" onclick="filterCat('${c}', this)">${c}</button>`
  ).join('');
}

function filterCat(cat, btn){
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid(cat === 'Все' ? products : products.filter(p => p.cat === cat));
}

function renderGrid(items){
  document.getElementById('grid').innerHTML = items.map(p => `
    <div class="card">
      <div class="emoji">${p.emoji}</div>
      <div class="tag">${p.cat}</div>
      <h3>${p.name}</h3>
      <div class="gift">🎁  ${p.gift}</div>
      <div class="price">${p.price} ₽</div>
      <button onclick="addToCart(${p.id})">В корзину</button>
    </div>
  `).join('');
}

function addToCart(id){
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  updateCartUI();
  showToast('Добавлено в корзину 🥤 ');
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI(){
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const box = document.getElementById('cartItems');
  if (cart.length === 0){
    box.innerHTML = '<div class="cart-empty">Корзина пуста 🥤 </div>';
    document.getElementById('cartTotal').textContent = '0 ₽';
    return;
  }

  let total = 0;
  box.innerHTML = cart.map(i => {
    const p = products.find(x => x.id === i.id);
    total += p.price * i.qty;
    return `<div class="cart-item">
      <span>${p.emoji} ${p.name} × ${i.qty}</span>
      <span>${p.price * i.qty} ₽ <button onclick="removeFromCart(${i.id})">×</button></span>
    </div>`;
  }).join('');
  document.getElementById('cartTotal').textContent = total + ' ₽';
}

function openCart(){
  document.getElementById('cartModal').classList.add('open');
  updateCartUI();
}

function checkout(){
  if (cart.length === 0){ showToast('Корзина пуста'); return; }
  const total = cart.reduce((s, i) => {
    const p = products.find(x => x.id === i.id);
    return s + p.price * i.qty;
  }, 0);
  showToast(`Заказ на ${total} ₽ оформлен! Ждите курьера 🚚 `);
  cart = [];
  updateCartUI();
  document.getElementById('cartModal').classList.remove('open');
}

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ===== ЗАКРЫТИЕ МОДАЛКИ ПО КЛИКУ НА ФОН ===== */
document.getElementById('cartModal').addEventListener('click', e => {
if (e.target.id === 'cartModal') e.target.classList.remove('open');
});

/* ===== ИНИЦИАЛИЗАЦИЯ ===== */
renderFilters();
renderGrid(products);
updateCartUI();
