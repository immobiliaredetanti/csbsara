/* =========================================================
   MyCSB v2 – Logica applicazione (prototipo / concept)
   ========================================================= */

const CSB_MAPS_Q = encodeURIComponent("Centro Sanitario Bregaglia, Flin 5, 7606 Promontogno, Svizzera");

const state = {
  lang: "it",
  authed: false,
  route: "welcome",
  param: null,
  cart: [],
  history: [],
  pendingAfterLogin: null,
  query: "",
};

/* ------------- Helpers ------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const t = (k) => (I18N[state.lang] && I18N[state.lang][k]) || I18N.it[k] || k;
const L = (obj, base) => obj[`${base}_${state.lang}`] ?? obj[`${base}_it`] ?? "";
const LL = (obj) => (obj ? (obj[state.lang] ?? obj.it ?? "") : "");
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const money = (n) => "CHF " + Number(n).toFixed(2);

function go(route, param = null) {
  if (state.route !== route || state.param !== param) state.history.push({ route: state.route, param: state.param });
  state.route = route; state.param = param; state.query = "";
  render();
  const m = $(".app-main"); if (m) m.scrollTop = 0;
}
function back() {
  const p = state.history.pop();
  if (p) { state.route = p.route; state.param = p.param; render(); } else go("home");
}
function setLang(l) { state.lang = l; render(); }
function unreadCount() { return DATA.notifications.filter(n => n.unread).length; }

/* ------------- Toast ------------- */
function toast(msg, ok = true) {
  let wrap = $(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; $(".app-frame").appendChild(wrap); }
  const el = document.createElement("div");
  el.className = "toast" + (ok ? " ok" : "");
  el.innerHTML = `<span class="t-ico">${ok ? "✓" : "ℹ️"}</span><span>${esc(msg)}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; el.style.transition = "all .3s"; }, 2600);
  setTimeout(() => el.remove(), 2950);
}

/* ------------- Sheet ------------- */
function openSheet(html) {
  closeSheet();
  const ov = document.createElement("div");
  ov.className = "sheet-overlay";
  ov.innerHTML = `<div class="sheet"><div class="sheet-grip"></div>${html}</div>`;
  ov.addEventListener("click", (e) => { if (e.target === ov) closeSheet(); });
  $(".app-frame").appendChild(ov);
  return ov;
}
function closeSheet() { const o = $(".sheet-overlay"); if (o) o.remove(); }
function successSheet(title, sub, extra = "") {
  openSheet(`<div class="success-box">
    <div class="s-check">✓</div>
    <h2>${esc(title)}</h2>
    ${sub ? `<p class="muted">${esc(sub)}</p>` : ""}
    ${extra}
    <button class="btn btn-primary mt-16" onclick="closeSheet()">${t("close")}</button>
  </div>`);
}
function pickChip(btn) {
  btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
  btn.classList.add("selected");
}

/* ------------- Logo ------------- */
function treeLogo(cls = "logo-tree") { return `<img src="assets/logo-csb.svg?v=12" class="${cls}" alt="Centro Sanitario Bregaglia">`; }
function fullLogo(cls = "logo-full") { return `<img src="assets/logo-csb-full.svg?v=12" class="${cls}" alt="Centro Sanitario Bregaglia">`; }

/* ------------- Login ------------- */
function loginSheet(after) {
  state.pendingAfterLogin = after || null;
  openSheet(`
    <h2>${t("login")}</h2>
    <p class="muted">${t("login_needed")}</p>
    <div class="field"><label>E-mail</label><input value="anna.rossi@example.ch"></div>
    <div class="field"><label>Password</label><input type="password" value="demo1234"></div>
    <button class="btn btn-primary btn-lg" onclick="doLogin()">${t("login")}</button>
    <p class="faint text-center mt-8">${state.lang==='de'?'Demo-Konto: Anna Rossi':'Account demo: Anna Rossi'}</p>
  `);
}
function doLogin() {
  state.authed = true;
  const cb = state.pendingAfterLogin; state.pendingAfterLogin = null;
  closeSheet();
  toast(state.lang==='de' ? "Angemeldet" : "Accesso effettuato");
  if (typeof cb === "function") cb(); else render();
}
function requireLogin(cb) { if (state.authed) cb(); else loginSheet(cb); }
function logout() { state.authed = false; toast(state.lang==='de'?"Abgemeldet":"Disconnesso"); go("home"); }

/* ------------- Carrello ------------- */
function addToCart(it, de, price) {
  state.cart.push({ it, de, price });
  toast((state.lang==='de'?"In den Warenkorb: ":"Aggiunto al carrello: ") + (state.lang==='de'?de:it));
  render();
}
function removeCart(i) { state.cart.splice(i, 1); render(); if ($(".sheet-overlay")) cartSheet(); }
function cartTotal() { return state.cart.reduce((s, x) => s + x.price, 0); }
function cartSheet() {
  if (!state.cart.length) { openSheet(`<h2>${t("cart")}</h2><div class="empty"><div class="e-ico">🛒</div>${t("cart_empty")}</div><button class="btn btn-secondary" onclick="closeSheet()">${t("close")}</button>`); return; }
  const lines = state.cart.map((x, i) => `<div class="cart-line"><span class="cl-name">${state.lang==='de'?esc(x.de):esc(x.it)}</span><span class="cl-price">${money(x.price)}</span><button class="cl-del" onclick="removeCart(${i})">🗑️</button></div>`).join("");
  openSheet(`<h2>${t("cart")}</h2>${lines}
    <div class="cart-total"><span>${t("total")}</span><span>${money(cartTotal())}</span></div>
    <button class="btn btn-primary btn-lg" onclick="checkoutSheet()">${t("checkout")} →</button>`);
}
function checkoutSheet() {
  const methods = DATA.payMethods.map((m, i) => `
    <div class="pay-method ${i===0?'sel':''}" onclick="selPay(this)" data-id="${m.id}">
      <span class="pm-ico">${m.icon}</span>
      <span class="pm-label">${m.label || L(m,'label')}</span>
      <span class="pm-radio"></span>
    </div>`).join("");
  openSheet(`<h2>${t("pay_method")}</h2>
    <div class="cart-total" style="padding-top:0"><span>${t("total")}</span><span>${money(cartTotal())}</span></div>
    ${methods}
    <button class="btn btn-primary btn-lg mt-8" onclick="paySuccess()">${t("pay")} ${money(cartTotal())}</button>`);
}
function selPay(el) { el.parentElement.querySelectorAll(".pay-method").forEach(p => p.classList.remove("sel")); el.classList.add("sel"); }
function paySuccess() {
  const total = cartTotal();
  const today = "18.10.2026";
  state.cart.forEach(x => DATA.receipts.unshift({ date: today, desc_it: x.it, desc_de: x.de, amount: x.price }));
  state.cart = [];
  successSheet(t("pay_success"), null, `<div class="badge ok" style="margin-top:8px">${money(total)}</div>`);
  render();
}

/* ------------- Header + Nav ------------- */
function headerHtml(title, showBack) {
  const lang = `<div class="lang-toggle">
      <button class="${state.lang==='it'?'active':''}" onclick="setLang('it')">IT</button>
      <button class="${state.lang==='de'?'active':''}" onclick="setLang('de')">DE</button></div>`;
  if (!showBack) return `<header class="app-header"><div class="h-brand">${treeLogo('h-logo')}<span class="brand-name">MyCSB</span></div>${lang}</header>`;
  return `<header class="app-header has-back"><button class="h-back" onclick="back()" aria-label="indietro">‹</button><div class="h-title">${esc(title)}</div>${lang}</header>`;
}
function navHtml() {
  const items = [
    { r:"home", ico:"🏠", k:"nav_home" },
    { r:"services", ico:"⊞", k:"nav_services" },
    { r:"bookings", ico:"📅", k:"nav_bookings" },
    { r:"notifications", ico:"🔔", k:"nav_notifications" },
    { r:"profile", ico:"👤", k:"nav_profile" },
  ];
  const uc = unreadCount();
  return `<nav class="bottom-nav">${items.map(it => `
    <button class="${state.route===it.r?'active':''}" onclick="go('${it.r}')">
      <span class="nav-ico">${it.ico}</span><span>${t(it.k)}</span>
      ${it.r==='notifications' && uc>0 ? `<span class="nav-badge">${uc}</span>` : ''}
    </button>`).join("")}</nav>`;
}
function cartFab() {
  if (!state.cart.length) return "";
  if (["welcome","login"].includes(state.route)) return "";
  return `<button class="cart-fab" onclick="cartSheet()">🛒 ${t("cart")} · ${money(cartTotal())}</button>`;
}

/* ------------- Router ------------- */
function render() {
  const app = $(".app-frame");
  if (state.route === "welcome") { app.innerHTML = renderWelcome(); return; }

  const map = {
    home:          { title:"MyCSB", back:false, body: viewHome },
    services:      { title:t("nav_services"), back:false, body: viewServices },
    bookings:      { title:t("my_bookings"), back:false, body: viewBookings },
    notifications: { title:t("nav_notifications"), back:false, body: viewNotifications },
    profile:       { title:t("nav_profile"), back:false, body: viewProfile },
    service:       { title:"", back:true, body: viewService },
    receipts:      { title:t("receipts"), back:true, body: viewReceipts },
    concept:       { title:t("concept_badge"), back:true, body: viewConcept },
  };
  const cfg = map[state.route] || map.home;
  app.innerHTML = `${headerHtml(cfg.title, cfg.back)}<main class="app-main"><div class="view">${cfg.body()}</div></main>${navHtml()}${cartFab()}`;
}

/* ================= WELCOME ================= */
function renderWelcome() {
  return `<div class="center-screen">
    ${fullLogo('logo-full')}
    <h1 style="font-size:2rem;margin:8px 0 2px;color:var(--wine)">MyCSB</h1>
    <p style="font-weight:700;color:var(--brown-soft);margin:0 0 4px">${t("subtitle")}</p>
    <p class="muted" style="max-width:300px">${t("welcome_msg")}</p>
    <div class="qr-box" style="width:160px;height:160px"><img src="assets/qr.svg?v=12" alt="QR" width="100%" height="100%"></div>
    <p class="faint" style="margin-top:-6px">${state.lang==='it'?'Scansiona per accedere':'Scannen zum Öffnen'}</p>
    <div style="width:100%;max-width:300px;margin-top:10px">
      <button class="btn btn-primary btn-lg" onclick="go('home')">${state.lang==='it'?'Apri MyCSB':'MyCSB öffnen'} →</button>
      <div class="lang-toggle" style="margin:16px auto 0;width:fit-content">
        <button class="${state.lang==='it'?'active':''}" onclick="setLang('it')">Italiano</button>
        <button class="${state.lang==='de'?'active':''}" onclick="setLang('de')">Deutsch</button>
      </div>
    </div>
  </div>`;
}

/* ================= HOME ================= */
function viewHome() {
  const de = state.lang === 'de';
  const feat = DATA.featured.map(f => `
    <div class="feature-card" onclick="go('${f.go[0]}','${f.go[1]}')">
      <div class="f-img" style="background:var(--cream-2)">
        <span class="f-emoji">${f.icon}</span>
        ${f.img ? `<img class="f-photo" src="${f.img}?v=12" alt="" style="object-position:${f.imgpos||'center'}" onerror="this.remove()">` : ''}
      </div>
      <div class="f-body"><div class="f-tag">${L(f,'tag')}</div><div class="f-title">${L(f,'title')}</div></div>
    </div>`).join("");
  const tiles = DATA.services.map(s => `
    <div class="service-tile" onclick="go('service','${s.id}')">
      <div class="ico">${s.icon}</div><div class="label">${t(s.key)}</div>
    </div>`).join("");

  let personal = "";
  if (state.authed) {
    personal = `
      <div class="greeting">${t("good_morning")} ${DATA.user.name.split(" ")[0]}</div>
      <div class="faint" style="margin:-2px 0 12px">${t("today_for_you")}</div>
      <div class="today-card" onclick="requireLogin(()=>go('service','stafflunch'))">
        <div class="tc-ico">🍽️</div><div style="flex:1"><div class="tc-k">${t("s_stafflunch")}</div><div class="tc-t">${de?'Bestellung bestätigt':'Ordine confermato'} ✓</div></div>
      </div>
      <div class="today-card" onclick="go('bookings')">
        <div class="tc-ico">🏋️</div><div style="flex:1"><div class="tc-k">${t("next_appt")}</div><div class="tc-t">${de?'Fitnessraum':'Palestra'}</div><div class="tc-s">${de?'Morgen 10:00':'Domani ore 10:00'}</div></div>
      </div>
      <div class="today-card" onclick="go('service','laundry')">
        <div class="tc-ico">🧺</div><div style="flex:1"><div class="tc-k">${t("nav_notifications")}</div><div class="tc-t">${t("s_laundry")}</div><div class="tc-s">${de?'Deine Bestellung ist bereit.':'Il tuo ordine è pronto.'}</div></div>
      </div>
      <div class="divider"></div>`;
  }

  return `
    <div class="welcome" style="padding:18px 16px 20px">
      ${treeLogo('logo-tree')}
      <h1 style="font-size:1.5rem;margin:6px 0 2px">${t("welcome_title")}</h1>
      <p class="subtitle" style="font-size:.95rem">${t("subtitle")}</p>
    </div>

    <div class="search-bar">
      <span class="s-ico">🔍</span>
      <input type="text" placeholder="${t("search_ph")}" oninput="liveSearch(this.value)" onfocus="liveSearch(this.value)">
    </div>
    <div id="search-results"></div>
    <div class="freq-label">${t("frequent_searches")}</div>
    <div class="search-chips">
      ${[{it:"Dermatologo",de:"Dermatologe"},{it:"Pranzo",de:"Mittagessen"},{it:"Lavanderia",de:"Wäscherei"},{it:"Fisioterapia",de:"Physiotherapie"},{it:"Palestra",de:"Fitnessraum"},{it:"Spitex",de:"Spitex"}].map(q=>{const l=state.lang==='de'?q.de:q.it;return `<button class="sc" onclick="chipSearch('${l}')">${l}</button>`;}).join("")}
    </div>

    ${personal}

    <div class="section-title" style="margin-top:6px">${t("featured")}</div>
    <div class="carousel">${feat}</div>

    <div class="section-title">${t("main_services")}</div>
    <div class="service-grid">${tiles}</div>

    <div class="concept-note" onclick="go('concept')" style="cursor:pointer">
      <span class="cn-badge">${t("concept_badge")}</span>
      <p>${t("claim")} — ${de?'mehr erfahren':'scopri di più'} ›</p>
    </div>
  `;
}

/* -------- Ricerca -------- */
const SEARCH_INDEX = [
  { id:"specialists", kw:["dermatolog","cardiolog","pneumolog","ginecolog","dentist","specialist","facharzt","zahnarzt","haut","augen"] },
  { id:"eat", kw:["pranzo","mangiare","cibo","takeaway","menu","menù","essen","mittag","cafeteria","caffetteria"] },
  { id:"mealshome", kw:["pasti a domicilio","domicilio","consegna","lieferung","mahlzeit"] },
  { id:"laundry", kw:["lavanderia","biancheria","wäsch","stiratura","bucato"] },
  { id:"physio", kw:["fisioterapia","palestra","movimento","ginnastica","corso","physio","fitness","gymnastik","kurs"] },
  { id:"spitex", kw:["spitex","assistenza","domicilio","pflege","hilfe"] },
  { id:"health", kw:["medico","studio medico","visita","arzt","salute","gesundheit","appuntamento","termin"] },
  { id:"reminders", kw:["promemoria","controllo","erinnerung","prevenzione","vorsorge"] },
  { id:"carehome", kw:["casa anziani","anziani","altersheim","festa","attività"] },
  { id:"events", kw:["evento","eventi","novità","veranstaltung","bacheca"] },
  { id:"contacts", kw:["contatti","telefono","numero","kontakt","nummer","indirizzo"] },
];
function matchServices(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const ids = new Set();
  SEARCH_INDEX.forEach(e => { if (e.kw.some(k => k.includes(q) || q.includes(k))) ids.add(e.id); });
  DATA.services.forEach(s => { if (t(s.key).toLowerCase().includes(q)) ids.add(s.id==="eat"?"eat":s.id); });
  return [...ids];
}
function liveSearch(q) {
  const box = $("#search-results"); if (!box) return;
  const ids = matchServices(q);
  if (!q.trim()) { box.innerHTML = ""; return; }
  if (!ids.length) { box.innerHTML = `<div class="faint" style="padding:4px 2px 12px">${state.lang==='de'?'Keine Treffer':'Nessun risultato'}</div>`; return; }
  const label = (id) => {
    const svc = DATA.services.find(s => s.id === id);
    if (svc) return { icon: svc.icon, name: t(svc.key), route:["service",id] };
    const extra = { mealshome:{icon:"🍲",name:t("s_mealshome")}, health:{icon:"🩺",name:t("s_health_doctor")}, reminders:{icon:"🔔",name:t("s_reminders")} }[id];
    return { icon: extra?.icon||"•", name: extra?.name||id, route:["service",id] };
  };
  box.innerHTML = `<div class="card" style="margin-bottom:12px">${ids.map(id => { const l = label(id); return `
    <div class="list-row clickable" onclick="go('${l.route[0]}','${l.route[1]}')">
      <div class="lr-ico">${l.icon}</div><div class="lr-body"><div class="lr-title">${esc(l.name)}</div></div><div class="lr-arrow">›</div>
    </div>`; }).join("")}</div>`;
}
function chipSearch(q) { go("home"); setTimeout(() => { const i = $(".search-bar input"); if (i) { i.value = q; liveSearch(q); i.scrollIntoView({block:"center"}); } }, 60); }

/* ================= SERVIZI (lista) ================= */
function viewServices() {
  const extra = [
    { id:"reminders", icon:"🔔", key:"s_reminders", sub_it:"Controlli e scadenze che imposti tu", sub_de:"Selbst gesetzte Erinnerungen" },
    { id:"receipts2", icon:"🧾", key:null, sub_it:"Pagamenti e ricevute", sub_de:"Zahlungen und Belege", label:t("receipts"), route:"receipts" },
  ];
  const all = [...DATA.services, ...extra];
  return `
    <h1 class="page-title">${t("nav_services")}</h1>
    <p class="lead">${state.lang==='de'?'Alle Dienste des CSB in einem Ort.':'Tutti i servizi del CSB in un unico luogo.'}</p>
    <div class="card">
      ${all.map(s => `<div class="list-row clickable" onclick="${s.route?`go('${s.route}')`:`go('service','${s.id}')`}">
        <div class="lr-ico">${s.icon}</div>
        <div class="lr-body"><div class="lr-title">${s.label || t(s.key)}</div><div class="lr-sub">${L(s,'sub')}</div></div>
        <div class="lr-arrow">›</div></div>`).join("")}
    </div>
  `;
}

/* ================= DISPATCH SERVIZIO ================= */
function viewService() {
  switch (state.param) {
    case "eat": return svcEat();
    case "cafeteria": return svcCafeteria();
    case "stafflunch": return svcStaffLunch();
    case "mealshome": return svcMealsHome();
    case "health": return svcHealth();
    case "specialists": return svcSpecialists();
    case "reminders": return svcReminders();
    case "physio": return svcPhysio();
    case "spitex": return svcSpitex();
    case "laundry": return svcLaundry();
    case "carehome": return svcCareHome();
    case "events": return svcEvents();
    case "contacts": return svcContacts();
    default: return `<div class="empty">…</div>`;
  }
}
function svcHead(icon, titleKey, sub) {
  return `<div style="text-align:center;margin-bottom:8px">
    <div style="font-size:42px">${icon}</div>
    <h1 class="page-title" style="margin-top:2px">${typeof titleKey==='string'&&I18N.it[titleKey]?t(titleKey):esc(titleKey)}</h1>
    <p class="lead">${esc(sub)}</p></div>`;
}

/* -------- 1. MANGIARE & ORDINARE (hub) -------- */
function svcEat() {
  const de = state.lang === 'de';
  const areas = [
    { id:"cafeteria", icon:"☕", k:"s_cafeteria", s_it:"Menù del giorno, prenota e takeaway", s_de:"Tagesmenü, reservieren, Take-away" },
    { id:"stafflunch", icon:"🍽️", k:"s_stafflunch", s_it:"Riservato ai collaboratori CSB", s_de:"Für CSB-Mitarbeitende" },
    { id:"mealshome", icon:"🍲", k:"s_mealshome", s_it:"Pasti caldi consegnati a casa", s_de:"Warme Mahlzeiten nach Hause" },
  ];
  return svcHead("🍽️","s_eat", de?"Caffetteria, pranzo e consegna a domicilio.":"Caffetteria, pranzo e consegna a domicilio.") +
    areas.map(a => `<div class="hub-card" onclick="go('service','${a.id}')">
      <div class="hc-ico">${a.icon}</div>
      <div><div class="hc-t">${t(a.k)}</div><div class="hc-s">${de?a.s_de:a.s_it}</div></div>
      <span class="hc-arrow">›</span></div>`).join("");
}

/* -------- Caffetteria -------- */
function svcCafeteria() {
  const de = state.lang === 'de';
  const m = DATA.cafeMenuDay;
  return svcHead("☕","s_cafeteria", de?"Menù, prezzi e take-away.":"Menù, prezzi e take-away.") + `
    <div class="card"><div class="info-line"><span class="k">${de?"Öffnungszeiten":"Orari"}</span><span class="v">${DATA.cafeTimes}</span></div></div>
    <div class="menu-card">
      <div class="m-head"><span>${de?"Menü von heute":"Menù di oggi"}</span><span>${money(m.price)}</span></div>
      <div class="m-body">${m.items.map(i=>`<div class="menu-item"><span class="mi-v">${LL(i)}</span></div>`).join("")}</div>
    </div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="cafeOrder(false)">🍽️ ${t("book")}</button>
      <button class="btn btn-secondary" onclick="cafeOrder(true)">🥡 ${t("takeaway")}</button>
    </div>
    <button class="btn btn-secondary mt-16" onclick="cafeWeek()">📋 ${t("weekly_menu")}</button>
  `;
}
let cafeQty = 1;
function cafeOrder(takeaway) {
  cafeQty = 1;
  const de = state.lang === 'de';
  const m = DATA.cafeMenuDay;
  openSheet(`
    <h2>${takeaway ? t("takeaway") : t("book")}</h2>
    <div class="card" style="box-shadow:none;border:1px solid var(--line)"><strong>${de?"Menü von heute":"Menù di oggi"}</strong><div class="muted" style="font-size:.9rem">${m.items.map(i=>LL(i)).join(" · ")}</div><div class="price-tag mt-8">${money(m.price)}</div></div>
    <div class="field"><label>${t("day")}</label><input type="date" value="2026-10-19"></div>
    <div class="field"><label>${t("quantity")}</label>
      <div class="qty"><button onclick="cafeQ(-1)">−</button><span class="qv" id="cafeqv">1</span><button onclick="cafeQ(1)">+</button></div></div>
    <div class="field"><label>${t("pickup_time")}</label>
      <div class="chip-select">${["11:30","12:00","12:30","13:00"].map((s,i)=>`<button type="button" class="chip ${i===1?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <button class="btn btn-primary btn-lg" onclick="cafeAdd(${takeaway})">${takeaway? t("add_cart") : t("confirm")}</button>
  `);
}
function cafeQ(d) { cafeQty = Math.max(1, cafeQty + d); const e = $("#cafeqv"); if (e) e.textContent = cafeQty; }
function cafeAdd(takeaway) {
  const total = DATA.cafeMenuDay.price * cafeQty;
  closeSheet();
  if (takeaway) {
    requireLogin(() => { addToCart(`Takeaway caffetteria ×${cafeQty}`, `Take-away Cafeteria ×${cafeQty}`, total);
      successSheet(t("order_confirmed"), state.lang==='de'?'Du erhältst eine Mitteilung zur Abholung.':'Riceverai una notifica per il ritiro.'); });
  } else {
    requireLogin(() => { DATA.bookings.unshift({icon:"☕",title_it:"Tavolo caffetteria",title_de:"Tisch Cafeteria",when_it:"19.10 · 12:00",when_de:"19.10 · 12:00",status:"confirmed"});
      successSheet(t("order_confirmed")); });
  }
}
function cafeWeek() {
  openSheet(`<h2>${t("weekly_menu")}</h2>${DATA.cafeWeek.map(d=>`<div class="card" style="margin-bottom:8px"><div class="card-title" style="margin-bottom:4px">${L(d,'d')}</div><div class="muted">${L(d,'m')}</div></div>`).join("")}<button class="btn btn-secondary" onclick="closeSheet()">${t("close")}</button>`);
}

/* -------- Pranzo collaboratori -------- */
function svcStaffLunch() {
  const de = state.lang === 'de';
  if (!state.authed) {
    return svcHead("🍽️","s_stafflunch", de?"Für CSB-Mitarbeitende.":"Area riservata ai collaboratori CSB.") +
      `<div class="card text-center pad-lg"><p class="muted">${t("login_needed")}</p><button class="btn btn-primary btn-lg" onclick="requireLogin(()=>go('service','stafflunch'))">🔒 ${t("login")}</button></div>`;
  }
  return svcHead("🍽️","s_stafflunch", de?"Bestelle dein Mittagessen für morgen.":"Ordina il tuo pranzo per domani.") + `
    <div class="notice"><span class="n-ico">⏰</span><span>${de?"Bestellung bis 09:00 Uhr des Vortags.":"Ordina entro le 09:00 del giorno prima."}</span></div>
    <div class="section-title" style="margin-top:6px">${de?"Mittagessen von morgen":"Pranzo di domani"}</div>
    ${DATA.staffLunch.map((o,i)=>`<label class="pay-method ${i===0?'sel':''}" onclick="selPay(this)" data-id="${o.id}"><span class="pm-ico">${o.id==='V'?'🥗':'🍲'}</span><span class="pm-label">${L(o,'name')}</span><span class="pm-radio"></span></label>`).join("")}
    <button class="btn btn-primary btn-lg mt-8" onclick="staffOrder()">${de?'Mein Mittagessen bestellen':'Ordina il mio pranzo'}</button>
  `;
}
function staffOrder() { successSheet(t("lunch_booked")); DATA.bookings.unshift({icon:"🍽️",title_it:"Pranzo collaboratori",title_de:"Mitarbeiter-Mittagessen",when_it:"Domani",when_de:"Morgen",status:"confirmed"}); }

/* -------- Pasti a domicilio -------- */
const mealWeek = { mon:true, tue:true, wed:false, thu:true, fri:true };
function svcMealsHome() {
  const de = state.lang === 'de';
  const days = [["mon","Lunedì","Montag"],["tue","Martedì","Dienstag"],["wed","Mercoledì","Mittwoch"],["thu","Giovedì","Donnerstag"],["fri","Venerdì","Freitag"]];
  return svcHead("🍲","s_mealshome", de?"Warme Mahlzeiten nach Hause geliefert.":"Pasti caldi consegnati a casa.") + `
    <div class="card">
      <div class="card-title">${de?"Wie es funktioniert":"Come funziona"}</div>
      <p class="muted mb-0" style="font-size:.92rem">${de?"Wähle die Tage, an denen du eine Mahlzeit erhalten möchtest. Bestellbar auch für Angehörige.":"Scegli i giorni in cui ricevere il pasto. Ordinabile anche per un familiare."}</p>
      <div class="info-line mt-8"><span class="k">${de?"Zonen":"Zone servite"}</span><span class="v" style="font-size:.82rem;text-align:right">${de?DATA.mealsZones_de:DATA.mealsZones_it}</span></div>
      <div class="info-line"><span class="k">${de?"Preis / Mahlzeit":"Prezzo / pasto"}</span><span class="v">${money(DATA.mealsHomePrice)}</span></div>
    </div>
    <div class="card">
      <div class="card-title">${t("week_plan")}</div>
      <div class="week-grid">
        ${days.map(d=>`<div class="week-row"><span class="wr-day">${de?d[2]:d[1]}</span><button class="switch ${mealWeek[d[0]]?'on':''}" onclick="toggleDay('${d[0]}',this)"></button></div>`).join("")}
      </div>
    </div>
    <button class="btn btn-primary btn-lg" onclick="mealsConfirm()">🛒 ${de?'Woche bestellen':'Ordina la settimana'}</button>
    <button class="btn btn-secondary mt-16" onclick="toast('${de?'Service pausiert':'Servizio sospeso'}')">⏸️ ${t("suspend")}</button>
  `;
}
function toggleDay(d, btn) { mealWeek[d] = !mealWeek[d]; btn.classList.toggle("on"); }
function mealsConfirm() {
  const de = state.lang === 'de';
  const n = Object.values(mealWeek).filter(Boolean).length;
  if (!n) { toast(de?"Keine Tage gewählt":"Nessun giorno selezionato", false); return; }
  requireLogin(() => {
    addToCart(`Pasti a domicilio ×${n}`, `Mahlzeiten nach Hause ×${n}`, DATA.mealsHomePrice * n);
    DATA.bookings.unshift({icon:"🍲",title_it:`Pasti a domicilio (${n} giorni)`,title_de:`Mahlzeiten (${n} Tage)`,when_it:"Settimana prossima",when_de:"Nächste Woche",status:"confirmed"});
    successSheet(t("order_confirmed"), de?`${n} Mahlzeiten geplant.`:`${n} pasti pianificati.`);
  });
}

/* -------- 4. Salute & prevenzione (studio medico) -------- */
function svcHealth() {
  const de = state.lang === 'de';
  return svcHead("🩺","s_health", de?"Dienste entdecken und Zugang erleichtern.":"Scopri i servizi e accedi facilmente.") + `
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Kein klinischer Bereich: keine Befunde oder Krankenakten.":"Nessun dato clinico: qui non ci sono referti o cartelle."}</span></div>
    <div class="card">
      <div class="card-title">${t("s_health_doctor")}</div>
      <div class="info-line"><span class="k">${de?"Öffnungszeiten":"Orari"}</span><span class="v">${de?"Mo–Fr auf Termin":"Lun–Ven su appuntamento"}</span></div>
      <div class="info-line"><span class="k">${de?"Telefon":"Telefono"}</span><span class="v">+41 81 838 11 45</span></div>
    </div>
    <div class="card">
      <div class="card-title">${de?"Ambulatorien":"Ambulatori"}</div>
      ${DATA.doctors.map(d=>`<div class="list-row"><div class="lr-ico">👨‍⚕️</div><div class="lr-body"><div class="lr-title">${esc(d.name)}</div><div class="lr-sub">${L(d,'role')}</div></div></div>`).join("")}
    </div>
    <button class="btn btn-primary btn-lg" onclick="apptFlow()">📅 ${de?'Termin anfragen':'Richiedi appuntamento'}</button>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="go('service','specialists')">🩻 ${t("s_specialists")}</button>
      <button class="btn btn-secondary" onclick="go('service','reminders')">🔔 ${t("s_reminders")}</button>
    </div>
  `;
}
function apptFlow() {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?'Termin anfragen':'Richiedi appuntamento'}</h2>
    <div class="field"><label>${de?"Leistung":"Prestazione"}</label><select>${DATA.visitTypes.map(v=>`<option>${LL(v)}</option>`).join("")}</select></div>
    <div class="field"><label>${t("day")}</label><input type="date" value="2026-10-22"></div>
    <div class="field"><label>${de?"Bevorzugte Zeit":"Fascia oraria preferita"}</label>
      <div class="chip-select">${DATA.timeSlots.slice(0,6).map((s,i)=>`<button type="button" class="chip ${i===3?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_opt")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="apptSend()">${t("send")}</button>
  `);
}
function apptSend() {
  requireLogin(() => {
    DATA.bookings.push({icon:"🩺",title_it:"Richiesta visita medica",title_de:"Arzttermin-Anfrage",when_it:"In attesa di conferma",when_de:"Wartet auf Bestätigung",status:"pending"});
    successSheet(t("request_sent"), t("request_sent_sub"), `<div class="badge wait" style="margin-top:8px">${t("st_pending")}</div>`);
  });
}

/* -------- 5. Specialisti -------- */
function svcSpecialists() {
  const de = state.lang === 'de';
  return svcHead("🩻","s_specialists", de?"Fachärzte am CSB.":"Specialisti al CSB.") +
    DATA.specialists.map(s => `
      <div class="card">
        <div class="flex-between">
          <div style="display:flex;gap:12px;align-items:center">
            <div class="lr-ico" style="font-size:22px">${s.icon}</div>
            <div><div class="lr-title">${L(s,'field')}</div>
            <div class="spec-next">${de?'Nächste Präsenz: ':'Prossima presenza: '}${s.next_de&&de?s.next_de:s.next}</div></div>
          </div>
          ${s.partner ? `<span class="badge info">Partner</span>` : `<span class="badge ok">CSB</span>`}
        </div>
        ${s.partner ? `<div class="faint mt-8">${de?"Unabhängiger Partner-Fachmann.":"Professionista indipendente / Partner."}</div>`:``}
        <div class="btn-row mt-8">
          <button class="btn btn-secondary btn-sm" style="width:100%" onclick="toast('${de?'Informationen':'Informazioni'}')">ℹ️ ${t("info")}</button>
          <button class="btn btn-primary btn-sm" style="width:100%" onclick="specReq('${esc(L(s,'field'))}')">📅 ${t("request")}</button>
        </div>
      </div>`).join("");
}
function specReq(name) {
  openSheet(`<h2>${t("request")} – ${esc(name)}</h2>
    <div class="field"><label>${t("day")}</label><input type="date" value="2026-10-29"></div>
    <div class="field"><label>${t("note_opt")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="(function(){requireLogin(function(){DATA.bookings.push({icon:'🩻',title_it:'Richiesta specialista',title_de:'Facharzt-Anfrage',when_it:'In attesa di conferma',when_de:'Wartet auf Bestätigung',status:'pending'});successSheet(t('request_sent'),t('request_sent_sub'));});})()">${t("send")}</button>`);
}

/* -------- 6. Promemoria salute -------- */
function svcReminders() {
  const de = state.lang === 'de';
  return svcHead("🔔","s_reminders", de?"Freiwillige Erinnerungen, die du selbst setzt.":"Promemoria volontari che imposti tu.") + `
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Keine Diagnosen oder persönlichen medizinischen Empfehlungen.":"Nessuna diagnosi né raccomandazione medica personalizzata."}</span></div>
    ${DATA.reminders.map(r=>`
      <div class="card" style="${r.on?'':'opacity:.6'}">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div class="lr-ico">${r.icon}</div>
          <div style="flex:1">
            <div class="lr-title">${L(r,'title')}</div>
            <div class="lr-sub">${L(r,'every')}</div>
            <div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" onclick="remFire('${esc(L(r,'title'))}')">${de?'Testen':'Prova promemoria'}</button>
              <button class="switch ${r.on?'on':''}" onclick="remToggle('${r.id}',this)"></button>
            </div>
          </div>
        </div>
      </div>`).join("")}
  `;
}
function remToggle(id, btn) { const r = DATA.reminders.find(x=>x.id===id); if (r) r.on = !r.on; btn.classList.toggle("on"); btn.closest(".card").style.opacity = r && r.on ? "1" : ".6"; }
function remFire(title) {
  const de = state.lang === 'de';
  openSheet(`
    <div style="text-align:center;padding-top:6px"><div style="font-size:40px">🔔</div></div>
    <h2 style="text-align:center;font-size:1.2rem">${de?'Erinnerung':'Promemoria'}</h2>
    <p class="muted text-center">${de?`Es ist Zeit für die Erinnerung, die du eingestellt hattest: ${esc(title)}.`:`È arrivato il momento del promemoria che avevi impostato per: ${esc(title)}.`}</p>
    <button class="btn btn-primary" onclick="closeSheet();go('service','specialists')">${t("discover")} / ${t("request")}</button>
    <button class="btn btn-ghost" onclick="closeSheet();toast('${de?'Später erinnern':'Ti ricorderemo più tardi'}')">${t("remind_later")}</button>
  `);
}

/* -------- 7. Fisioterapia & movimento -------- */
function svcPhysio() {
  const de = state.lang === 'de';
  const gcolors = ["#9a8f79","#b3a082","#8b8069","#c9bda6"];
  return svcHead("🤸","s_physio", de?"Therapie, Fitnessraum und Kurse.":"Trattamenti, palestra e corsi.") + `
    <div class="gallery">${["🏋️","🧘","🤸","💪"].map((e,i)=>`<div class="g-item" style="background:${gcolors[i]}">${e}</div>`).join("")}</div>
    <div class="card"><div class="card-title">${de?"Behandlungen":"Trattamenti"}</div>
      <div class="pill-row">${DATA.physioTreatments.map(x=>`<span class="badge info">${LL(x)}</span>`).join("")}</div></div>
    <button class="btn btn-primary btn-lg" onclick="physioReq()">🤸 ${de?'Physiotherapie anfragen':'Richiedi fisioterapia'}</button>

    <div class="section-title">🏋️ ${t("gym_calendar")}</div>
    ${DATA.gymSlots.map((s,i)=>`
      <div class="slot ${s.free?'free':'busy'}" ${s.free?`onclick="gymBook('${de?s.day_de:s.day_it}','${s.time}')"`:''}>
        <span class="sl-when">${de?s.day_de:s.day_it} · ${s.time}</span>
        ${s.free?`<span class="badge ok">${t("st_available")}</span>`:`<span class="badge wait">${t("st_full")}</span>`}
      </div>`).join("")}

    <div class="section-title">🧘 ${t("courses")}</div>
    ${DATA.courses.map((c,i)=>`
      <div class="card">
        <div class="flex-between">
          <div style="display:flex;gap:12px;align-items:center">
            <div class="lr-ico" style="font-size:22px">${c.icon}</div>
            <div><div class="lr-title">${L(c,'title')}</div><div class="lr-sub">${L(c,'when')} · ${c.places} ${t("places_left")}</div></div>
          </div>
          <span class="price-tag">${money(c.price)}</span>
        </div>
        <button class="btn btn-primary btn-sm mt-8" style="width:100%" onclick="courseJoin(${i})">${t("subscribe")}</button>
      </div>`).join("")}`;
}
function physioReq() {
  const de = state.lang === 'de';
  openSheet(`<h2>${de?'Physiotherapie anfragen':'Richiedi fisioterapia'}</h2>
    <div class="field"><label>${de?"Behandlung":"Trattamento"}</label><select>${DATA.physioTreatments.map(x=>`<option>${LL(x)}</option>`).join("")}</select></div>
    <div class="field"><label>${t("day")}</label><input type="date" value="2026-10-20"></div>
    <div class="field"><label>${t("note_opt")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="(function(){requireLogin(function(){DATA.bookings.push({icon:'🤸',title_it:'Richiesta fisioterapia',title_de:'Physio-Anfrage',when_it:'In attesa di conferma',when_de:'Wartet auf Bestätigung',status:'pending'});successSheet(t('request_sent'),t('request_sent_sub'));});})()">${t("send")}</button>`);
}
function gymBook(day, time) {
  const de = state.lang === 'de';
  openSheet(`<h2>${de?'Fitnessraum buchen':'Prenota palestra'}</h2>
    <div class="card" style="box-shadow:none;border:1px solid var(--line)"><strong>🏋️ ${esc(day)} · ${esc(time)}</strong></div>
    <button class="btn btn-primary btn-lg mt-8" onclick="(function(){requireLogin(function(){DATA.bookings.unshift({icon:'🏋️',title_it:'Palestra',title_de:'Fitnessraum',when_it:'${esc(day)} · ${esc(time)}',when_de:'${esc(day)} · ${esc(time)}',status:'confirmed'});successSheet(t('order_confirmed'));});})()">${t("confirm")}</button>`);
}
function courseJoin(i) {
  const c = DATA.courses[i];
  const de = state.lang === 'de';
  requireLogin(() => {
    addToCart(`Corso: ${c.title_it}`, `Kurs: ${c.title_de}`, c.price);
    DATA.bookings.unshift({icon:c.icon,title_it:"Corso: "+c.title_it,title_de:"Kurs: "+c.title_de,when_it:c.when_it,when_de:c.when_de,status:"confirmed"});
    successSheet(t("order_confirmed"), de?'Zum Warenkorb hinzugefügt.':'Aggiunto al carrello.');
  });
}

/* -------- 8. Spitex -------- */
function svcSpitex() {
  const de = state.lang === 'de';
  return svcHead("🏠","s_spitex", de?"Hauspflege: informieren und anfragen.":"Assistenza a domicilio: informati e richiedi.") + `
    <div class="card"><div class="card-title">${de?"Dienste":"Servizi disponibili"}</div>
      <div class="pill-row">${DATA.spitexServices.map(x=>`<span class="badge info">${LL(x)}</span>`).join("")}</div></div>
    <div class="card"><div class="info-line"><span class="k">${de?"Telefon":"Telefono"}</span><span class="v">+41 81 822 18 04</span></div>
      <div class="info-line"><span class="k">Email</span><span class="v">spitex@csbregaglia.ch</span></div></div>
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Angegebene Tage und Zeiten sind Wünsche. Die definitive Planung bestätigt die Spitex.":"Giorni e orari indicati sono preferenze. La pianificazione definitiva è confermata dallo Spitex."}</span></div>
    <button class="btn btn-primary btn-lg" onclick="spitexReq()">📨 ${de?'Anfrage senden':'Invia richiesta'}</button>
    <button class="btn btn-secondary mt-16" onclick="toast('${de?'Abwesenheit gemeldet':'Assenza segnalata'}')">🚫 ${de?'Abwesenheit melden':'Segnala assenza'}</button>
  `;
}
function spitexReq() {
  const de = state.lang === 'de';
  openSheet(`<h2>${de?'Assistenz-Anfrage':'Richiesta assistenza'}</h2>
    <div class="field"><label>${de?"Dienst":"Servizio"}</label><select>${DATA.spitexServices.map(x=>`<option>${LL(x)}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Bevorzugter Tag":"Giorno preferito"}</label>
      <div class="chip-select">${(de?["Mo","Di","Mi","Do","Fr"]:["Lun","Mar","Mer","Gio","Ven"]).map((d,i)=>`<button type="button" class="chip ${i===0?'selected':''}" onclick="pickChip(this)">${d}</button>`).join("")}</div></div>
    <div class="field"><label>${de?"Bevorzugte Zeit":"Fascia preferita"}</label>
      <div class="chip-select">${["08:00–10:00","10:00–12:00","14:00–16:00"].map((s,i)=>`<button type="button" class="chip ${i===0?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_opt")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet(t('request_sent'),t('request_sent_sub'),'<div class=&quot;badge wait&quot; style=&quot;margin-top:8px&quot;>'+t('st_pending')+'</div>')">${t("send")}</button>`);
}

/* -------- 9. Lavanderia -------- */
function svcLaundry() {
  const de = state.lang === 'de';
  const stLabels = [t("st_received"), t("st_processing"), t("st_ready")];
  return svcHead("🧺","s_laundry", de?"Ein CSB-Dienst – auch für externe Kunden.":"Un servizio del CSB – anche per clienti esterni.") + `
    <div class="card"><div class="card-title">${de?"Preisliste":"Listino"}</div>
      ${DATA.laundryServices.map(s=>`<div class="info-line"><span class="k">${LL(s)}</span><span class="v">${s.price}</span></div>`).join("")}</div>

    <div class="section-title">📦 ${t("order_tracking")}</div>
    ${DATA.laundryOrders.map(o=>`
      <div class="card">
        <div class="flex-between"><div class="card-title" style="margin:0">${o.id}</div><span class="price-tag">${money(o.amount)}</span></div>
        <div class="stepper mt-8">
          ${[0,1,2].map(step=>`<div class="step ${step<o.status?'done':step===o.status?'current':''}"><div class="dot">${step<=o.status?'✓':''}</div><div class="st-body"><div class="st-title">${stLabels[step]}</div></div></div>`).join("")}
        </div>
        ${o.status===2?`<div class="notice" style="margin:4px 0 0"><span class="n-ico">✅</span><span>${de?'Deine Wäsche ist abholbereit.':'La tua biancheria è pronta per il ritiro.'}</span></div>`:``}
      </div>`).join("")}

    <div class="btn-row">
      <button class="btn btn-primary" onclick="laundryOrder()">➕ ${de?'Neue Bestellung':'Nuovo ordine'}</button>
      <button class="btn btn-secondary" onclick="laundryQuote()">💰 ${de?'Offerte':'Preventivo'}</button>
    </div>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="laundryChat()">💬 ${de?'Wäscherei kontaktieren':'Contatta la lavanderia'}</button>
      <button class="btn btn-secondary" onclick="go('receipts')">🧾 ${de?'Belege':'Fatture'}</button>
    </div>
    <div class="concept-note" style="margin-top:16px"><span class="cn-badge">${de?'Neue Dienste':'Nuovi servizi'}</span><p>${de?'MyCSB kann dem CSB helfen, neue Dienste für externe Kunden zu entwickeln und zu bewerben.':'MyCSB può aiutare il CSB a sviluppare e promuovere nuovi servizi verso clienti esterni.'}</p></div>
  `;
}
function laundryOrder() {
  const de = state.lang === 'de';
  openSheet(`<h2>${de?'Neue Bestellung':'Nuovo ordine'}</h2>
    <div class="field"><label>${de?"Dienst":"Servizio"}</label><select>${DATA.laundryServices.map(s=>`<option>${LL(s)}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Abholung / Lieferung":"Ritiro / consegna"}</label>
      <div class="chip-select"><button type="button" class="chip selected" onclick="pickChip(this)">${de?'Abholung':'Ritiro'}</button><button type="button" class="chip" onclick="pickChip(this)">${de?'Lieferung':'Consegna'}</button></div></div>
    <div class="field"><label>${t("day")}</label><input type="date" value="2026-10-21"></div>
    <button class="btn btn-primary btn-lg" onclick="(function(){requireLogin(function(){addToCart('Ordine lavanderia','Wäscherei-Auftrag',32.50);successSheet(t('order_confirmed'),'${de?'Du erhältst eine Mitteilung, wenn die Wäsche bereit ist.':'Riceverai una notifica quando la biancheria è pronta.'}');});})()">${t("confirm")}</button>`);
}
function laundryQuote() {
  const de = state.lang === 'de';
  openSheet(`<h2>${de?'Offerte anfragen':'Richiedi preventivo'}</h2>
    <div class="field"><label>${t("note_opt")}</label><textarea placeholder="${de?'Beschreibe deinen Bedarf…':'Descrivi la tua esigenza…'}"></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet(t('request_sent'),t('request_sent_sub'))">${t("send")}</button>`);
}
function laundryChat() {
  const de = state.lang === 'de';
  const bubbles = DATA.laundryChat.map(b=>`<div class="bubble ${b.from}">${de?b.de:b.it}<div class="b-time">${b.time}</div></div>`).join("");
  openSheet(`<h2>💬 ${t("s_laundry")}</h2>
    <div class="chat-thread" id="lchat" style="max-height:300px;overflow-y:auto">${bubbles}</div>
    <div class="chat-input"><input id="lcin" placeholder="${de?'Nachricht…':'Messaggio…'}" onkeydown="if(event.key==='Enter')lSend()"><button onclick="lSend()">➤</button></div>`);
}
function lSend() {
  const inp = $("#lcin"), th = $("#lchat"); if (!inp||!th||!inp.value.trim()) return;
  const de = state.lang === 'de';
  const now = new Date().toLocaleTimeString(de?'de-CH':'it-CH',{hour:'2-digit',minute:'2-digit'});
  const me = document.createElement("div"); me.className="bubble me"; me.innerHTML=`${esc(inp.value)}<div class="b-time">${now}</div>`; th.appendChild(me); inp.value="";
  th.scrollTop = th.scrollHeight;
  setTimeout(()=>{ const r=document.createElement("div"); r.className="bubble them"; r.innerHTML=`${de?'Danke! Wir melden uns in Kürze.':'Grazie! Le rispondiamo a breve.'}<div class="b-time">${now}</div>`; th.appendChild(r); th.scrollTop=th.scrollHeight; }, 800);
}

/* -------- 10. Casa anziani -------- */
function svcCareHome() {
  const de = state.lang === 'de';
  return svcHead("🌳","s_carehome", de?"Leben, Aktivitäten und Informationen.":"Vita, attività e informazioni.") + `
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Keine persönlichen Gesundheitsdaten der Bewohner.":"Nessuna informazione sanitaria personale degli ospiti."}</span></div>
    <div class="card">
      <div class="card-title">${de?"Informationen":"Informazioni"}</div>
      <div class="info-line"><span class="k">${de?"Besuchszeiten":"Orari visite"}</span><span class="v">10:00–12:00 · 14:00–20:00</span></div>
      <div class="info-line"><span class="k">${de?"Kontakt":"Contatti"}</span><span class="v">+41 81 838 11 90</span></div>
    </div>
    <div class="card">
      <div class="card-title">📅 ${de?"Aktivitätenkalender":"Calendario attività"}</div>
      ${DATA.careActivities.map(a=>`<div class="info-line"><span class="k">${de?a.d_de:a.d_it}</span><span class="v">${a.icon} ${de?a.a_de:a.a_it}</span></div>`).join("")}
    </div>
    <div class="section-title">🎉 ${de?"Events für Angehörige":"Eventi per familiari"}</div>
    ${DATA.careEvents.map((e,i)=>`
      <div class="card">
        <div style="display:flex;gap:12px"><div class="lr-ico" style="font-size:22px">${e.icon}</div>
          <div style="flex:1"><div class="lr-title">${L(e,'title')}</div>
            <div class="lr-sub">📅 ${e.date} · 🕐 ${e.time} · 📍 ${esc(e.place)}</div>
            <p class="muted" style="margin:6px 0 0;font-size:.9rem">${L(e,'note')}</p>
            <button class="btn btn-primary btn-sm mt-8" onclick="careJoin('${esc(L(e,'title'))}')">${t("participate")}</button>
          </div></div>
      </div>`).join("")}`;
}
function careJoin(title) {
  const de = state.lang === 'de';
  openSheet(`<h2>${t("participate")}</h2><p class="muted">${esc(title)}</p>
    <div class="field"><label>${de?"Anzahl Teilnehmer":"Numero di partecipanti"}</label><select><option>1</option><option selected>2</option><option>3</option><option>4</option></select></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet('${de?'Teilnahme bestätigt':'Partecipazione confermata'}','${esc(title)}')">${t("confirm")}</button>`);
}

/* -------- 11. Eventi & novità -------- */
let eventCat = "all";
function svcEvents() {
  const de = state.lang === 'de';
  const list = DATA.events.filter(e => eventCat==="all" || e.cat===eventCat);
  return `<div style="text-align:center;margin-bottom:6px"><div style="font-size:42px">📅</div><h1 class="page-title">${t("s_events")}</h1><p class="lead">${de?'Die digitale Pinnwand des CSB.':'La bacheca digitale del CSB.'}</p></div>
    <div class="tabs" style="flex-wrap:nowrap">${DATA.eventCats.map(c=>`<button class="${eventCat===c.id?'active':''}" onclick="setEventCat('${c.id}')">${LL(c)}</button>`).join("")}</div>
    ${list.map(e=>`
      <div class="card">
        <div style="display:flex;gap:12px"><div class="lr-ico" style="font-size:22px">${e.icon}</div>
          <div style="flex:1"><div class="lr-title">${L(e,'title')}</div>
            <div class="lr-sub">📅 ${e.date}${e.time?` · ${e.time}`:''}</div>
            <p class="muted" style="margin:6px 0 0;font-size:.9rem">${L(e,'desc')}</p>
            <div class="btn-row mt-8">
              <button class="btn btn-primary btn-sm" style="width:100%" onclick="successSheet('${state.lang==='de'?'Angemeldet':'Iscrizione confermata'}','${esc(L(e,'title'))}')">${t("subscribe")}</button>
              <button class="btn btn-secondary btn-sm" style="width:100%" onclick="toast('${de?'Zum Kalender hinzugefügt':'Aggiunto al calendario'}')">📅 ${t("add_calendar")}</button>
            </div>
            <button class="btn btn-ghost btn-sm mt-8" onclick="toast('${de?'Wir erinnern dich':'Ti ricorderemo'}')">🔔 ${t("remind")}</button>
          </div></div>
      </div>`).join("")}`;
}
function setEventCat(c) { eventCat = c; render(); }

/* -------- 16. Contatti -------- */
function svcContacts() {
  const de = state.lang === 'de';
  return svcHead("📞","s_contacts", de?"Alle Dienste und Nummern.":"Directory di tutti i servizi.") + `
    <div class="card">${DATA.contacts.map(c=>`
      <div class="list-row"><div class="lr-ico">${c.icon}</div>
        <div class="lr-body"><div class="lr-title">${L(c,'label')}</div><div class="lr-sub">${esc(c.value)}</div></div>
        <a class="doc-actions" href="tel:${esc(c.value.replace(/\s/g,''))}"><button title="${t('call')}">📞</button></a>
      </div>`).join("")}</div>
    <div class="card">
      <div class="card-title">📍 ${de?"Adresse":"Indirizzo"}</div>
      <p class="muted mb-0">Centro Sanitario Bregaglia<br>${DATA.org.address_it}</p>
      <p class="faint mt-8" style="margin-bottom:0">${DATA.org.address2_it}</p>
      <div class="info-line" style="margin-top:8px"><span class="k">Email</span><span class="v">${DATA.org.email}</span></div>
      <div class="info-line"><span class="k">Web</span><span class="v">${DATA.org.web}</span></div>
      <div style="border-radius:14px;margin-top:12px;overflow:hidden;border:1px solid var(--line);height:190px;background:#e8e8e8">
        <iframe title="CSB" width="100%" height="100%" style="border:0;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${CSB_MAPS_Q}&amp;z=15&amp;output=embed"></iframe>
      </div>
      <div class="btn-row mt-16">
        <a class="btn btn-secondary" href="tel:+41818381199" style="text-decoration:none">📞 ${t("call")}</a>
        <a class="btn btn-primary" href="https://www.google.com/maps/dir/?api=1&amp;destination=${CSB_MAPS_Q}" target="_blank" rel="noopener" style="text-decoration:none">🧭 ${t("directions")}</a>
      </div>
    </div>`;
}

/* ================= PRENOTAZIONI ================= */
function viewBookings() {
  const de = state.lang === 'de';
  const badge = (s) => s==='pending' ? `<span class="badge wait">${t("st_pending")}</span>` : `<span class="badge ok">${t("st_confirmed")}</span>`;
  const upcoming = DATA.bookings.filter(b=>b.status!=='pending');
  const pending = DATA.bookings.filter(b=>b.status==='pending');
  const row = (a, withBadge) => `<div class="card"><div class="flex-between">
      <div style="display:flex;gap:12px;align-items:center"><div class="lr-ico" style="font-size:22px">${a.icon}</div>
      <div><div class="lr-title">${L(a,'title')}</div><div class="lr-sub">${L(a,'when')}</div></div></div>
      ${withBadge?badge(a.status):''}</div></div>`;
  return `<h1 class="page-title">${t("my_bookings")}</h1>
    <div class="tabs">
      <button class="active" onclick="bkTab(this,'bk-up')">${t("st_upcoming")}</button>
      <button onclick="bkTab(this,'bk-pend')">${t("st_pending")}</button>
      <button onclick="bkTab(this,'bk-past')">${t("st_past")}</button>
    </div>
    <div id="bk-up">${upcoming.map(a=>row(a,true)).join("") || empty()}</div>
    <div id="bk-pend" class="hidden">${pending.map(a=>row(a,true)).join("") || empty()}</div>
    <div id="bk-past" class="hidden">${DATA.bookingsPast.map(a=>row(a,false)).join("") || empty()}</div>`;
}
function empty() { return `<div class="empty"><div class="e-ico">📭</div>${state.lang==='de'?'Nichts hier':'Niente qui'}</div>`; }
function bkTab(btn, id) {
  btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  ["bk-up","bk-pend","bk-past"].forEach(x=>{const e=$("#"+x); if(e) e.classList.add("hidden");});
  $("#"+id).classList.remove("hidden");
}

/* ================= NOTIFICHE ================= */
function viewNotifications() {
  const de = state.lang === 'de';
  return `<div class="flex-between"><h1 class="page-title" style="margin:0">${t("nav_notifications")}</h1>
      <button class="btn-ghost btn-sm" onclick="markAllRead()">${de?'Alle gelesen':'Segna letti'}</button></div>
    <div class="card mt-16">${DATA.notifications.map(n=>`
      <div class="list-row">
        <div class="lr-ico">${n.icon}</div>
        <div class="lr-body"><div class="lr-title" style="${n.unread?'':'font-weight:600'}">${L(n,'title')} ${n.unread?'<span class="badge new" style="font-size:.6rem;padding:2px 6px">•</span>':''}</div>
        <div class="faint" style="font-size:.78rem">${L(n,'time')}</div></div>
      </div>`).join("")}</div>
    <div class="section-title">${de?"Welche Mitteilungen erhalten":"Quali notifiche ricevere"}</div>
    <div class="card">${DATA.notifPrefs.map(p=>`<div class="switch-row"><div class="sr-label">${LL(p)}</div><button class="switch ${p.on?'on':''}" onclick="prefToggle('${p.id}',this)"></button></div>`).join("")}</div>`;
}
function markAllRead() { DATA.notifications.forEach(n=>n.unread=false); render(); }
function prefToggle(id, btn) { const p = DATA.notifPrefs.find(x=>x.id===id); if (p) p.on=!p.on; btn.classList.toggle("on"); }

/* ================= PROFILO / AREA PERSONALE ================= */
function viewProfile() {
  const de = state.lang === 'de';
  if (!state.authed) {
    return `<h1 class="page-title">${t("nav_profile")}</h1>
      <div class="card text-center pad-lg">
        <div class="avatar" style="margin:6px auto 14px;width:70px;height:70px;font-size:1.6rem">${DATA.user.initials}</div>
        <p class="muted">${de?'Melde dich an, um deine Buchungen, Bestellungen und Einstellungen zu verwalten.':'Accedi per gestire le tue prenotazioni, gli ordini e le preferenze.'}</p>
        <button class="btn btn-primary btn-lg" onclick="requireLogin(()=>render())">🔒 ${t("login")}</button>
      </div>
      <div class="card"><div class="card-title">${de?"Öffentlicher Zugang":"Accesso pubblico"}</div>
        <p class="muted mb-0" style="font-size:.92rem">${de?'Ohne Anmeldung: Dienste, Menüs, Fachärzte, Events, Zeiten und Kontakte.':'Senza accesso: servizi, menù, specialisti, eventi, orari e contatti.'}</p></div>`;
  }
  const u = DATA.user;
  const item = (icon, label, route) => `<div class="list-row clickable" onclick="${route}"><div class="lr-ico">${icon}</div><div class="lr-body"><div class="lr-title">${label}</div></div><div class="lr-arrow">›</div></div>`;
  return `
    <div class="profile-head">
      <div class="avatar">${u.initials}</div>
      <div style="flex:1"><div class="p-name">${esc(u.name)}</div><div class="p-id">${u.userId}${u.staff?' · '+(de?'Mitarbeiterin':'Collaboratrice'):''}</div></div>
      <button class="btn-ghost" onclick="logout()" style="width:auto;font-size:1.3rem">⎋</button>
    </div>
    <div class="card">
      ${item("📅", t("my_bookings"), "go('bookings')")}
      ${item("🛒", t("my_orders"), "go('bookings')")}
      ${item("🍲", t("s_mealshome"), "go('service','mealshome')")}
      ${item("🧺", t("s_laundry"), "go('service','laundry')")}
      ${item("📅", t("s_events"), "go('service','events')")}
      ${item("🧾", t("receipts"), "go('receipts')")}
      ${item("🔔", t("s_reminders"), "go('service','reminders')")}
      ${item("🔔", t("nav_notifications"), "go('notifications')")}
    </div>
    <div class="section-title">${t("preferences")}</div>
    <div class="card">
      <div class="switch-row"><div><div class="sr-label">${t("language")}</div></div>
        <div class="lang-toggle"><button class="${state.lang==='it'?'active':''}" onclick="setLang('it')">IT</button><button class="${state.lang==='de'?'active':''}" onclick="setLang('de')">DE</button></div></div>
      <div class="switch-row"><div class="sr-label">${de?'Push-Mitteilungen':'Notifiche push'}</div><button class="switch on" onclick="this.classList.toggle('on')"></button></div>
      <div class="switch-row clickable" onclick="go('concept')"><div class="sr-label">${t("privacy")} & ${t("concept_badge")}</div><span class="lr-arrow">›</span></div>
    </div>
    <button class="btn btn-secondary" onclick="logout()">⎋ ${t("logout")}</button>
    <div style="height:8px"></div>`;
}

/* ================= RICEVUTE ================= */
function viewReceipts() {
  const de = state.lang === 'de';
  if (!DATA.receipts.length) return `<h1 class="page-title">${t("receipts")}</h1>${empty()}`;
  return `<h1 class="page-title">${t("receipts")}</h1>
    <div class="card">${DATA.receipts.map(r=>`<div class="doc-row"><div class="doc-ico">🧾</div>
      <div style="min-width:0"><div class="lr-title" style="font-size:.95rem">${L(r,'desc')}</div><div class="lr-sub">${r.date}</div></div>
      <div style="margin-left:auto;font-weight:800;color:var(--brown-dark)">${money(r.amount)}</div></div>`).join("")}</div>`;
}

/* ================= CONCEPT ================= */
function viewConcept() {
  const de = state.lang === 'de';
  return `<div style="text-align:center;padding:10px 0">${fullLogo('logo-full')}
      <h1 style="font-size:1.8rem;margin:10px 0 2px;color:var(--wine)">MyCSB</h1>
      <p style="font-weight:700;color:var(--brown-soft)">${t("claim")}</p>
      <p class="muted">${t("claim_sub")}</p></div>
    <div class="card pad-lg">
      <span class="cn-badge" style="background:var(--brown-soft);color:#fff;display:inline-block;font-size:.7rem;font-weight:800;padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px">${t("concept_badge")}</span>
      <p class="mb-0" style="font-size:.95rem">${t("concept_text")}</p>
    </div>
    <div class="card">
      <div class="card-title">${de?"Was MyCSB ist":"Cos'è MyCSB"}</div>
      <p class="muted" style="font-size:.92rem">${de?'MyCSB ist der digitale Schalter der Dienste des Gesundheitszentrums Bergell. Es verbindet das CSB mit Bürgern, Nutzern, Angehörigen, Mitarbeitenden, externen Kunden und Partner-Fachpersonen.':'MyCSB è lo sportello digitale dei servizi del Centro Sanitario Bregaglia. Mette in collegamento il CSB con cittadini, utenti, familiari, collaboratori, clienti esterni e professionisti partner.'}</p>
      <div class="pill-row">${(de?['Information','Buchung','Verkauf','Kommunikation','Events','Vorsorge','Promotion']:['Informazione','Prenotazione','Vendita','Comunicazione','Eventi','Prevenzione','Promozione']).map(x=>`<span class="badge info">${x}</span>`).join("")}</div>
    </div>
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?'MyCSB ist KEINE Krankenakte, ersetzt weder die klinische Software noch die internen Kommunikationsmittel des Personals.':'MyCSB NON è una cartella clinica, non sostituisce i software sanitari né gli strumenti interni di comunicazione del personale.'}</span></div>
    <button class="btn btn-primary btn-lg" onclick="go('home')">🏠 ${de?'Zur Startseite':'Torna alla home'}</button>`;
}

/* ------------- Init ------------- */
window.state = state;
document.addEventListener("DOMContentLoaded", () => { render(); });
