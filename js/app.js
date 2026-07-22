/* =========================================================
   MyCSB – Logica applicazione (prototipo)
   Router semplice a stato + rendering delle viste.
   ========================================================= */

const state = {
  lang: "it",
  authed: false,          // area personale sbloccata
  familyUnlocked: false,  // area famiglia sbloccata
  route: "welcome",
  param: null,
  pin: "",
  history: [],
};

/* ------------------- Helpers ------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const t = (k) => (I18N[state.lang] && I18N[state.lang][k]) || I18N.it[k] || k;
const L = (obj, base) => obj[base + "_" + state.lang] ?? obj[base + "_it"] ?? "";
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

function go(route, param = null) {
  if (state.route !== route || state.param !== param) {
    state.history.push({ route: state.route, param: state.param });
  }
  state.route = route;
  state.param = param;
  render();
  const main = $(".app-main");
  if (main) main.scrollTop = 0;
}
function back() {
  const prev = state.history.pop();
  if (prev) { state.route = prev.route; state.param = prev.param; render(); }
  else go("home");
}
function setLang(l) { state.lang = l; DATA.user.language = l; render(); }

function unreadCount() { return DATA.notifications.filter(n => n.unread).length; }

/* ------------------- Toast ------------------- */
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

/* ------------------- Sheet (modale dal basso) ------------------- */
function openSheet(html) {
  closeSheet();
  const ov = document.createElement("div");
  ov.className = "sheet-overlay";
  ov.innerHTML = `<div class="sheet"><div class="sheet-grip"></div>${html}</div>`;
  ov.addEventListener("click", (e) => { if (e.target === ov) closeSheet(); });
  $(".app-frame").appendChild(ov);
  return ov;
}
function closeSheet() { const ov = $(".sheet-overlay"); if (ov) ov.remove(); }

/* Foglio di conferma "Richiesta inviata con successo" */
function successSheet(extraHtml = "") {
  openSheet(`
    <div class="success-box">
      <div class="s-check">✓</div>
      <h2>${t("request_sent")}</h2>
      <p class="muted">${t("request_sent_sub")}</p>
      ${extraHtml}
      <button class="btn btn-primary mt-16" onclick="closeSheet()">${t("close")}</button>
    </div>`);
}

/* Logo CSB ufficiale (albero) – file SVG vettoriale */
function treeLogo(cls = "logo-tree") {
  return `<img src="assets/logo-csb.svg?v=4" class="${cls}" alt="Centro Sanitario Bregaglia">`;
}
/* Logo CSB ufficiale completo (albero + scritta) */
function fullLogo(cls = "logo-full") {
  return `<img src="assets/logo-csb-full.svg?v=4" class="${cls}" alt="Centro Sanitario Bregaglia">`;
}

/* ------------------- Header + Nav ------------------- */
function headerHtml(title, showBack) {
  const langBtns = `<div class="lang-toggle">
      <button class="${state.lang==='it'?'active':''}" onclick="setLang('it')">IT</button>
      <button class="${state.lang==='de'?'active':''}" onclick="setLang('de')">DE</button>
    </div>`;
  if (!showBack) {
    return `<header class="app-header">
      <div class="h-brand">${treeLogo('h-logo')}<span class="brand-name">MyCSB</span></div>
      ${langBtns}
    </header>`;
  }
  return `<header class="app-header has-back">
    <button class="h-back" onclick="back()" aria-label="${t('back')}">‹</button>
    <div class="h-title">${esc(title)}</div>
    ${langBtns}
  </header>`;
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
      <span class="nav-ico">${it.ico}</span>
      <span>${t(it.k)}</span>
      ${it.r==='notifications' && uc>0 ? `<span class="nav-badge">${uc}</span>` : ''}
    </button>`).join("")}</nav>`;
}

/* ------------------- Router / render ------------------- */
function render() {
  const app = $(".app-frame");
  // Schermate a tutto campo senza nav
  if (state.route === "welcome") { app.innerHTML = renderWelcome(); return; }
  if (state.route === "login")   { app.innerHTML = renderLogin(); return; }
  if (state.route === "familyGate") { app.innerHTML = renderFamilyGate(); return; }

  const map = {
    home: { title:"MyCSB", back:false, body: viewHome },
    services: { title:t("nav_services"), back:false, body: viewServices },
    bookings: { title:t("nav_bookings"), back:false, body: viewBookings },
    notifications: { title:t("nav_notifications"), back:false, body: viewNotifications },
    profile: { title:t("nav_profile"), back:false, body: viewProfile },
    service: { title:"", back:true, body: viewService },
    chatList: { title:t("s_messages"), back:true, body: viewChatList },
    chatThread: { title:"", back:true, body: viewChatThread },
    family: { title:t("s_home"), back:true, body: viewFamily },
    final: { title:"MyCSB", back:true, body: viewFinal },
  };
  const cfg = map[state.route] || map.home;
  const showBack = cfg.back;
  app.innerHTML = `${headerHtml(cfg.title, showBack)}<main class="app-main"><div class="view">${cfg.body()}</div></main>${navHtml()}`;
}

/* ================= SCHERMATE FULL ================= */
function renderWelcome() {
  return `<div class="center-screen">
    ${fullLogo('logo-full')}
    <h1 style="font-size:2rem;margin:10px 0 2px;color:#5d4530">MyCSB</h1>
    <p class="muted" style="max-width:280px">${t("welcome_sub")}</p>
    <div class="qr-box"><img src="assets/qr.svg" alt="QR code MyCSB" width="100%" height="100%"></div>
    <p class="faint" style="margin-top:-6px">${state.lang==='it'?'Scansiona il QR code per accedere':'QR-Code scannen zum Öffnen'}</p>
    <div style="width:100%;max-width:300px;margin-top:14px">
      <button class="btn btn-primary btn-lg" onclick="go('home')">${state.lang==='it'?'Apri MyCSB':'MyCSB öffnen'} →</button>
      <div class="lang-toggle" style="margin:16px auto 0;width:fit-content">
        <button class="${state.lang==='it'?'active':''}" onclick="setLang('it')">Italiano</button>
        <button class="${state.lang==='de'?'active':''}" onclick="setLang('de')">Deutsch</button>
      </div>
    </div>
  </div>`;
}

function renderLogin() {
  const dots = [0,1,2,3].map(i => `<div class="pin-dot ${i < state.pin.length ? 'filled':''}"></div>`).join("");
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  return `<div class="center-screen">
    <button class="btn-ghost" style="position:absolute;top:16px;left:10px;font-size:1.6rem" onclick="go('home')">‹</button>
    <div class="avatar" style="width:70px;height:70px;font-size:1.6rem">${DATA.user.initials}</div>
    <h2 style="margin-top:14px">${t("login_personal")}</h2>
    <p class="muted">${DATA.user.name} · ${DATA.user.userId}</p>
    <p class="faint">${state.lang==='it'?'Codice dimostrativo: 1234':'Demo-Code: 1234'}</p>
    <div class="pin-display">${dots}</div>
    <div class="keypad">${keys.map(k => k==="" ? `<button class="blank"></button>` :
       `<button onclick="pinPress('${k}')">${k}</button>`).join("")}</div>
    <p class="faint" style="margin-top:18px;max-width:280px">🔒 ${state.lang==='it'?'Autenticazione a due fattori simulata':'Simulierte Zwei-Faktor-Authentifizierung'}</p>
  </div>`;
}
function pinPress(k) {
  if (k === "⌫") { state.pin = state.pin.slice(0,-1); render(); return; }
  if (state.pin.length >= 4) return;
  state.pin += k;
  render();
  if (state.pin.length === 4) {
    setTimeout(() => {
      if (state.pin === "1234" || true) { // il prototipo accetta qualsiasi codice
        state.authed = true; state.pin = "";
        const dest = state._afterLogin || "profile"; state._afterLogin = null;
        toast(state.lang==='it' ? "Accesso effettuato" : "Angemeldet");
        go(dest);
      }
    }, 220);
  }
}
function requireAuth(dest) {
  if (state.authed) { go(dest); return; }
  state._afterLogin = dest;
  state.pin = "";
  state.route = "login"; state.param = null; render();
}

function renderFamilyGate() {
  const dots = [0,1,2,3].map(i => `<div class="pin-dot ${i < state.pin.length ? 'filled':''}"></div>`).join("");
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  return `<div class="center-screen">
    <button class="btn-ghost" style="position:absolute;top:16px;left:10px;font-size:1.6rem" onclick="go('service','carehome')">‹</button>
    <div style="font-size:44px">🌳</div>
    <h2 style="margin-top:6px">${state.lang==='it'?'Area famiglia':'Familienbereich'}</h2>
    <p class="muted" style="max-width:280px">${state.lang==='it'?'Accesso riservato ai familiari autorizzati di Giuseppe Rossi.':'Zugang nur für autorisierte Angehörige von Giuseppe Rossi.'}</p>
    <p class="faint">${state.lang==='it'?'Codice dimostrativo: 1234':'Demo-Code: 1234'}</p>
    <div class="pin-display">${dots}</div>
    <div class="keypad">${keys.map(k => k==="" ? `<button class="blank"></button>` :
       `<button onclick="famPinPress('${k}')">${k}</button>`).join("")}</div>
  </div>`;
}
function famPinPress(k) {
  if (k === "⌫") { state.pin = state.pin.slice(0,-1); render(); return; }
  if (state.pin.length >= 4) return;
  state.pin += k; render();
  if (state.pin.length === 4) {
    setTimeout(() => { state.familyUnlocked = true; state.pin = ""; go("family"); }, 220);
  }
}

/* ================= HOME ================= */
function viewHome() {
  const next = DATA.appointments[0];
  const quick = [
    { ico:"🍲", k:"quick_book_meal", act:"go('service','meals')" },
    { ico:"🩺", k:"quick_book_visit", act:"go('service','medical')" },
    { ico:"💬", k:"quick_messages", act:"go('chatList')" },
    { ico:"🔔", k:"quick_reminders", act:"go('service','reminders')" },
  ];
  const tiles = DATA.services.map(s => `
    <div class="service-tile" onclick="go('service','${s.id}')">
      <div class="ico">${s.icon}</div>
      <div class="label">${t(s.key)}</div>
    </div>`).join("");

  return `
    <div class="welcome">
      ${treeLogo('logo-tree')}
      <h1>${t("welcome_title")}</h1>
      <p class="subtitle">${t("welcome_sub")}</p>
    </div>

    <div class="quick-row">
      ${quick.map(q => `<button class="quick-chip" onclick="${q.act}"><span>${q.ico}</span>${t(q.k)}</button>`).join("")}
    </div>

    ${next ? `
    <div class="card" style="background:linear-gradient(135deg,#7a5a3d,#9b7a58);color:#fff;border:none" onclick="go('bookings')">
      <div class="faint" style="color:#f3ead9;margin-bottom:4px">${t("next_appointment")}</div>
      <div class="flex-between">
        <div>
          <div style="font-weight:800;font-size:1.1rem">${L(next,'title')}</div>
          <div style="color:#f3ead9">${next.date} · ${next.time} · ${esc(next.who)}</div>
        </div>
        <div style="font-size:1.8rem">${next.icon}</div>
      </div>
    </div>` : ''}

    <div class="section-title">${t("home_services")}</div>
    <div class="service-grid">${tiles}</div>

    <div class="card mt-16" onclick="go('final')" style="cursor:pointer;background:var(--cream-2);border-style:dashed">
      <div class="flex-between">
        <div><strong style="color:var(--brown-dark)">MyCSB</strong><div class="faint">${t("final_slogan")}</div></div>
        <span style="color:var(--ink-faint);font-size:20px">›</span>
      </div>
    </div>
  `;
}

/* ================= SERVIZI (lista) ================= */
function viewServices() {
  return `
    <h1 class="page-title">${t("nav_services")}</h1>
    <p class="lead">${state.lang==='it'?'Tutti i servizi del Centro Sanitario Bregaglia.':'Alle Dienste des Gesundheitszentrums Bergell.'}</p>
    <div class="card">
      ${DATA.services.map(s => `
        <div class="list-row clickable" onclick="go('service','${s.id}')">
          <div class="lr-ico">${s.icon}</div>
          <div class="lr-body">
            <div class="lr-title">${t(s.key)}</div>
            <div class="lr-sub">${L(s,'sub')}</div>
          </div>
          <div class="lr-arrow">›</div>
        </div>`).join("")}
    </div>
  `;
}

/* ================= DISPATCH SERVIZIO ================= */
function viewService() {
  switch (state.param) {
    case "medical": return svcMedical();
    case "physio": return svcPhysio();
    case "spitex": return svcSpitex();
    case "carehome": return svcCareHome();
    case "cafe": return svcCafe();
    case "meals": return svcMeals();
    case "laundry": return svcLaundry();
    case "specialists": return svcSpecialists();
    case "events": return svcEvents();
    case "reminders": return svcReminders();
    case "messages": return viewChatList();
    case "contacts": return svcContacts();
    default: return `<div class="empty">…</div>`;
  }
}
function svcHead(icon, titleKey, sub) {
  return `<div style="text-align:center;margin-bottom:6px">
    <div style="font-size:44px">${icon}</div>
    <h1 class="page-title" style="margin-top:4px">${t(titleKey)}</h1>
    <p class="lead">${esc(sub)}</p>
  </div>`;
}

/* ---- 1. Studio medico ---- */
function svcMedical() {
  const de = state.lang === 'de';
  return svcHead("🩺","s_medical", de?"Ihre Hausarztpraxis am CSB.":"Il vostro studio medico di base al CSB.") + `
    <div class="card">
      <div class="card-title">${de?"Öffnungszeiten":"Orari"}</div>
      <div class="info-line"><span class="k">${de?"Mo–Fr":"Lun–Ven"}</span><span class="v">08:00–12:00 · 14:00–17:00</span></div>
      <div class="info-line"><span class="k">${de?"Sa":"Sab"}</span><span class="v">08:00–11:00</span></div>
      <div class="info-line"><span class="k">${de?"Telefon":"Telefono"}</span><span class="v">+41 81 822 00 10</span></div>
    </div>
    <div class="card">
      <div class="card-title">${de?"Ärzteteam":"Medici disponibili"}</div>
      ${DATA.doctors.map(d => `<div class="list-row"><div class="lr-ico">👨‍⚕️</div><div class="lr-body"><div class="lr-title">${d.name}</div><div class="lr-sub">${L(d,'role')}</div></div></div>`).join("")}
    </div>
    <div class="card">
      <div class="card-title">${de?"Leistungen":"Prestazioni offerte"}</div>
      <div class="pill-row">${(de?["Allgemeine Untersuchungen","Vorsorge","Impfungen","Blutuntersuchungen","Atteste","Rezepte"]:["Visite generali","Prevenzione","Vaccinazioni","Esami del sangue","Certificati","Ricette"]).map(x=>`<span class="badge info">${x}</span>`).join("")}</div>
    </div>
    <button class="btn btn-primary btn-lg" onclick="bookVisitFlow()">📅 ${de?"Termin buchen":"Prenota una visita"}</button>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="simpleRequest('${de?'Rezept-Anfrage':'Richiesta ricetta'}')">💊 ${de?"Rezept":"Ricetta"}</button>
      <button class="btn btn-secondary" onclick="simpleRequest('${de?'Attest-Anfrage':'Richiesta certificato'}')">📄 ${de?"Attest":"Certificato"}</button>
    </div>
    <button class="btn btn-secondary mt-16" onclick="requireAuth('profile')">🗂️ ${de?"Meine Berichte ansehen":"Visualizza i miei referti"}</button>
  `;
}

/* Flusso prenotazione visita */
function bookVisitFlow() {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?"Termin buchen":"Prenota una visita"}</h2>
    <div class="field"><label>${de?"Art der Untersuchung":"Tipo di visita"}</label>
      <select id="bv-type">${DATA.visitTypes.map(v=>`<option>${de?v.de:v.it}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Arzt/Ärztin":"Medico"}</label>
      <select id="bv-doc">${DATA.doctors.map(d=>`<option>${d.name}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Datum":"Data"}</label><input type="date" id="bv-date" value="2026-08-25"></div>
    <div class="field"><label>${de?"Uhrzeit":"Fascia oraria"}</label>
      <div class="chip-select" id="bv-slots">${DATA.timeSlots.map((s,i)=>`<button type="button" class="chip ${i===3?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea placeholder="${de?'z.B. Nüchtern':'es. a digiuno'}"></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet()">${de?"Anfrage senden":"Invia richiesta"}</button>
  `);
}
function pickChip(btn) {
  const wrap = btn.parentElement;
  wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
  btn.classList.add("selected");
}
function simpleRequest(title) {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${esc(title)}</h2>
    <p class="muted">${de?"Beschreiben Sie kurz Ihre Anfrage.":"Descriva brevemente la sua richiesta."}</p>
    <div class="field"><label>${t("note_optional")}</label><textarea placeholder="${de?'Ihre Nachricht…':'Il tuo messaggio…'}"></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet()">${t("send")}</button>
  `);
}

/* ---- 2. Fisioterapia ---- */
function svcPhysio() {
  const de = state.lang === 'de';
  const gcolors = ["#7d9a6b","#9b7a58","#6f8fa6","#c9a06a"];
  return svcHead("🤸","s_physio", de?"Behandlungen, Fitnessraum und Übungen.":"Trattamenti, palestra ed esercizi.") + `
    <div class="gallery">
      ${["🏋️","🧘","🤸","💪"].map((e,i)=>`<div class="g-item" style="background:${gcolors[i]}">${e}</div>`).join("")}
    </div>
    <div class="card" style="border-left:4px solid var(--leaf)">
      <div class="card-title">${de?"Ihr nächster Termin":"Il tuo prossimo appuntamento"}</div>
      <div><strong>${de?"Physiotherapie":"Fisioterapia individuale"}</strong></div>
      <div class="muted">${de?"Dienstag":"Martedì"} 18.08.2026 · 10:30 · ${de?"Betreuerin":"Operatrice"}: Giulia</div>
    </div>
    <div class="card">
      <div class="card-title">${de?"Behandlungen":"Trattamenti disponibili"}</div>
      ${DATA.physioTreatments.map(x=>`<div class="info-line"><span class="k">${de?x.de:x.it}</span><span class="v">›</span></div>`).join("")}
    </div>
    <div class="card">
      <div class="card-title">${de?"Zugewiesene Übungen":"Esercizi assegnati"}</div>
      ${DATA.physioExercises.map(x=>`<div class="list-row"><div class="lr-ico">✅</div><div class="lr-body"><div class="lr-title" style="font-size:.95rem">${de?x.de:x.it}</div></div></div>`).join("")}
    </div>
    <div class="btn-row">
      <button class="btn btn-leaf" onclick="bookPhysio(false)">📅 ${de?"Sitzung buchen":"Prenota seduta"}</button>
      <button class="btn btn-secondary" onclick="bookPhysio(true)">🏋️ ${de?"Fitnessraum":"Palestra"}</button>
    </div>
    <button class="btn btn-secondary mt-16" onclick="requireAuth('profile')">🗂️ ${de?"Physio-Berichte":"Referti fisioterapici"}</button>
  `;
}
function bookPhysio(gym) {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${gym ? (de?"Fitnessraum buchen":"Prenota palestra") : (de?"Sitzung buchen":"Prenota seduta")}</h2>
    ${!gym ? `<div class="field"><label>${de?"Behandlung":"Trattamento"}</label><select>${DATA.physioTreatments.map(x=>`<option>${de?x.de:x.it}</option>`).join("")}</select></div>` : ''}
    <div class="field"><label>${de?"Datum":"Data"}</label><input type="date" value="2026-08-18"></div>
    <div class="field"><label>${de?"Uhrzeit":"Orario"}</label>
      <div class="chip-select">${["09:00","10:30","14:00","15:30"].map((s,i)=>`<button type="button" class="chip ${i===1?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea></textarea></div>
    <button class="btn btn-leaf btn-lg" onclick="successSheet()">${t("send")}</button>
  `);
}

/* ---- 3. Spitex ---- */
function svcSpitex() {
  const de = state.lang === 'de';
  return svcHead("🏠","s_spitex", de?"Hauspflege für Sie und Ihre Angehörigen.":"Assistenza domiciliare per lei e i suoi familiari.") + `
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Angehörige senden eine Anfrage mit Wünschen. Der Spitex-Koordinator prüft und bestätigt oder schlägt eine Alternative vor.":"Il familiare invia una richiesta con le preferenze. Il coordinatore Spitex verifica e conferma o propone un'alternativa."}</span></div>
    <div class="section-title" style="margin-top:8px">${de?"Geplante Einsätze":"Interventi programmati"}</div>
    ${DATA.spitexPlanned.map(p=>`
      <div class="card" style="margin-bottom:10px">
        <div class="flex-between">
          <div style="display:flex;gap:12px;align-items:center">
            <div class="lr-ico">${p.icon}</div>
            <div><div class="lr-title">${L(p,'title')}</div><div class="lr-sub">${L(p,'when')} · ${esc(p.who)}</div></div>
          </div>
          ${statusBadge(p.status)}
        </div>
      </div>`).join("")}
    <button class="btn btn-primary btn-lg mt-16" onclick="spitexRequest()">➕ ${de?"Neuen Einsatz anfragen":"Richiedi un nuovo intervento"}</button>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="simpleRequest('${de?'Abwesenheit melden':'Segnala assenza'}')">🚫 ${de?"Abwesenheit":"Assenza"}</button>
      <button class="btn btn-secondary" onclick="openChatThread('spitex')">✉️ ${de?"Koordinator":"Coordinatore"}</button>
    </div>
  `;
}
function statusBadge(status) {
  if (status === "confirmed") return `<span class="badge ok">${t("st_confirmed")}</span>`;
  if (status === "alt") return `<span class="badge alt">${t("st_alt")}</span>`;
  return `<span class="badge wait">${t("st_wait")}</span>`;
}
function spitexRequest() {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?"Assistenz-Anfrage":"Richiesta di assistenza"}</h2>
    <div class="field"><label>${de?"Gewünschter Dienst":"Servizio richiesto"}</label>
      <select>${DATA.spitexServices.map(x=>`<option>${de?x.de:x.it}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Bevorzugter Tag":"Giorno preferito"}</label>
      <div class="chip-select">${(de?["Mo","Di","Mi","Do","Fr"]:["Lun","Mar","Mer","Gio","Ven"]).map((d,i)=>`<button type="button" class="chip ${i===0?'selected':''}" onclick="pickChip(this)">${d}</button>`).join("")}</div></div>
    <div class="field"><label>${de?"Zeitfenster":"Fascia oraria"}</label>
      <div class="chip-select">${["08:00–10:00","10:00–12:00","14:00–16:00"].map((s,i)=>`<button type="button" class="chip ${i===0?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea placeholder="${de?'z.B. vor dem Arzttermin':'es. preferibilmente prima della visita medica'}"></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet('<div class=&quot;badge wait&quot; style=&quot;margin-top:10px&quot;>${t('st_wait')}</div>')">${t("send")}</button>
  `);
}

/* ---- 4. Casa anziani ---- */
function svcCareHome() {
  const de = state.lang === 'de';
  return svcHead("🌳","s_home", de?"Wohnen, Betreuung und Familienbereich.":"Residenza, cura e area famiglia.") + `
    <div class="card">
      <div class="card-title">${de?"Zwei Abteilungen":"I due reparti"}</div>
      <div class="list-row"><div class="lr-ico">🌿</div><div class="lr-body"><div class="lr-title">${de?"Abteilung Pflege":"Reparto cura"}</div><div class="lr-sub">${de?"Langzeitpflege und Betreuung":"Cure di lunga durata e assistenza"}</div></div></div>
      <div class="list-row"><div class="lr-ico">🏡</div><div class="lr-body"><div class="lr-title">${de?"Abteilung Wohnen":"Reparto residenza"}</div><div class="lr-sub">${de?"Betreutes Wohnen":"Abitare assistito"}</div></div></div>
    </div>
    <div class="card">
      <div class="card-title">${de?"Besuchszeiten":"Orari di visita"}</div>
      <div class="info-line"><span class="k">${de?"Täglich":"Tutti i giorni"}</span><span class="v">10:00–12:00 · 14:00–18:00</span></div>
      <div class="info-line"><span class="k">${de?"Kontakt":"Contatti"}</span><span class="v">+41 81 822 00 00</span></div>
      <div class="info-line"><span class="k">${de?"Bezugsperson":"Referente"}</span><span class="v">Claudia (${de?"Pflege":"cura"})</span></div>
    </div>
    <div class="card">
      <div class="card-title">${de?"Aktivitäten":"Attività"}</div>
      <div class="pill-row">${(de?["Gruppenaktivitäten","Musik","Spaziergänge","Feste","Physiotherapie"]:["Attività di gruppo","Musica","Passeggiate","Feste","Fisioterapia"]).map(x=>`<span class="badge info">${x}</span>`).join("")}</div>
    </div>
    <div class="card" style="background:linear-gradient(135deg,#7d9a6b,#5f7c50);color:#fff;border:none;cursor:pointer" onclick="openFamilyArea()">
      <div class="flex-between">
        <div><div style="font-weight:800;font-size:1.1rem">🔒 ${de?"Familienbereich":"Area famiglia"}</div>
        <div style="color:#eef3e9">${de?"Reservierter Zugang für Angehörige":"Accesso riservato ai familiari autorizzati"}</div></div>
        <span style="font-size:20px">›</span>
      </div>
    </div>
  `;
}
function openFamilyArea() {
  if (state.familyUnlocked) { go("family"); return; }
  state.pin = "";
  state.route = "familyGate"; state.param = null; render();
}
function viewFamily() {
  const de = state.lang === 'de';
  return `
    <div style="text-align:center;margin-bottom:10px">
      <div style="font-size:40px">🌳</div>
      <h1 class="page-title">${de?"Familienbereich":"Area famiglia"}</h1>
      <p class="lead">${de?"Betreute Person":"Persona assistita"}: <strong>Giuseppe Rossi</strong></p>
    </div>
    <div class="notice"><span class="n-ico">🔐</span><span>${de?"Die für Angehörige sichtbaren Informationen hängen von den Berechtigungen, der Einwilligung der Person und den Datenschutzregeln ab.":"Le informazioni visibili ai familiari dipendono dalle autorizzazioni, dal consenso dell'utente e dalle regole di protezione dei dati."}</span></div>
    <div class="card">
      <div class="card-title">📔 ${de?"Tagebuch – Heute, 22.07.2026":"Diario giornaliero – Oggi, 22.07.2026"}</div>
      ${DATA.careHomeDiary.map(d=>`<div class="list-row"><div class="lr-ico">${d.icon}</div><div class="lr-body"><div class="lr-title" style="font-size:.98rem;font-weight:600">${L(d,'text')}</div></div></div>`).join("")}
    </div>
    <div class="card">
      <div class="card-title">🍽️ ${de?"Teilnahme an Mahlzeiten":"Partecipazione ai pasti"}</div>
      <div class="info-line"><span class="k">${de?"Frühstück":"Colazione"}</span><span class="v badge ok">${de?"Eingenommen":"Consumata"}</span></div>
      <div class="info-line"><span class="k">${de?"Mittagessen":"Pranzo"}</span><span class="v badge ok">${de?"Eingenommen":"Consumato"}</span></div>
    </div>
    <div class="card">
      <div class="card-title">📅 ${de?"Nächste Termine":"Prossimi appuntamenti"}</div>
      <div class="info-line"><span class="k">${de?"Physiotherapie":"Fisioterapia"}</span><span class="v">23.07 · 10:30</span></div>
      <div class="info-line"><span class="k">${de?"Musiknachmittag":"Pomeriggio musicale"}</span><span class="v">28.09 · 15:30</span></div>
    </div>
    <div class="btn-row">
      <button class="btn btn-secondary" onclick="openChatThread('carehome')">✉️ ${de?"Abteilung":"Reparto"}</button>
      <button class="btn btn-secondary" onclick="simpleRequest('${de?'Gesprächsanfrage':'Richiesta di colloquio'}')">🗣️ ${de?"Gespräch":"Colloquio"}</button>
    </div>
  `;
}

/* ---- 5. Caffetteria ---- */
function svcCafe() {
  const de = state.lang === 'de';
  const m = DATA.cafeMenuDay;
  return svcHead("☕","s_cafe", de?"Menü, Preise und Reservierungen.":"Menù, prezzi e prenotazioni.") + `
    <div class="card">
      <div class="info-line"><span class="k">${de?"Öffnungszeiten":"Orari"}</span><span class="v">08:00–18:00</span></div>
    </div>
    <div class="menu-card">
      <div class="m-head"><span>${L(m,'date')}</span><span>${m.price}</span></div>
      <div class="m-body">
        ${m.items.map(i=>`<div class="menu-item"><span class="mi-k">${L(i,'k')}</span><span class="mi-v">${L(i,'v')}</span></div>`).join("")}
      </div>
    </div>
    <div class="btn-row">
      <button class="btn btn-primary" onclick="cafeBook(false)">🍽️ ${de?"Tisch reservieren":"Prenota tavolo"}</button>
      <button class="btn btn-secondary" onclick="cafeBook(true)">🥡 ${de?"Take-away":"Asporto"}</button>
    </div>
    <button class="btn btn-secondary mt-16" onclick="cafeWeek()">📋 ${de?"Wochenmenü ansehen":"Visualizza menù settimanale"}</button>
  `;
}
function cafeBook(takeaway) {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${takeaway ? (de?"Take-away bestellen":"Ordina da asporto") : (de?"Tisch reservieren":"Prenota tavolo")}</h2>
    <div class="field"><label>${de?"Datum":"Data"}</label><input type="date" value="2026-07-23"></div>
    ${!takeaway ? `<div class="field"><label>${de?"Personen":"Persone"}</label><select><option>1</option><option>2</option><option selected>3</option><option>4</option></select></div>` : ''}
    <div class="field"><label>${de?"Uhrzeit":"Orario"}</label>
      <div class="chip-select">${["11:30","12:00","12:30","13:00"].map((s,i)=>`<button type="button" class="chip ${i===1?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet()">${t("confirm")}</button>
  `);
}
function cafeWeek() {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?"Wochenmenü":"Menù settimanale"}</h2>
    ${DATA.cafeWeek.map(d=>`<div class="card" style="margin-bottom:8px"><div class="card-title" style="margin-bottom:4px">${L(d,'d')}</div><div class="muted">${L(d,'m')}</div></div>`).join("")}
    <button class="btn btn-secondary" onclick="closeSheet()">${t("close")}</button>
  `);
}

/* ---- 6. Pasti a domicilio ---- */
function svcMeals() {
  const de = state.lang === 'de';
  return svcHead("🍲","s_meals", de?"Warme Mahlzeiten bequem nach Hause.":"Pasti caldi comodamente a casa.") + `
    <div class="card" style="border-left:4px solid var(--leaf)">
      <div class="flex-between"><div class="card-title" style="margin:0">${de?"Nächste Lieferung":"Prossima consegna"}</div>${statusBadge('confirmed')}</div>
      <div class="info-line"><span class="k">${de?"Datum":"Data"}</span><span class="v">24.07.2026</span></div>
      <div class="info-line"><span class="k">${de?"Lieferung":"Consegna"}</span><span class="v">11:30–12:30</span></div>
      <div class="info-line"><span class="k">Menù</span><span class="v">${de?"Vollmenü":"Menù completo"}</span></div>
      <div class="btn-row mt-8">
        <button class="btn btn-secondary btn-sm" onclick="mealBook(true)" style="width:100%">✏️ ${de?"Ändern":"Modifica"}</button>
        <button class="btn btn-secondary btn-sm" onclick="mealCancel()" style="width:100%">🚫 ${de?"Stornieren":"Annulla"}</button>
      </div>
    </div>
    <button class="btn btn-primary btn-lg" onclick="mealBook(false)">➕ ${de?"Mahlzeit buchen":"Prenota un pasto"}</button>
    <div class="section-title">${de?"Bestellverlauf":"Storico ordini"}</div>
    <div class="card">
      ${DATA.mealsHistory.map(h=>`<div class="list-row"><div class="lr-ico">🍲</div><div class="lr-body"><div class="lr-title">${L(h,'menu')}</div><div class="lr-sub">${h.date}</div></div>${statusBadge(h.status)}</div>`).join("")}
    </div>
  `;
}
function mealBook(edit) {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${edit ? (de?"Bestellung ändern":"Modifica prenotazione") : (de?"Mahlzeit buchen":"Prenota un pasto")}</h2>
    <div class="field"><label>${de?"Tag":"Giorno"}</label><input type="date" value="2026-07-25"></div>
    <div class="field"><label>Menù</label>
      <div class="chip-select">${(de?["Vollmenü","Leichtes Menü","Vegetarisch"]:["Menù completo","Menù leggero","Vegetariano"]).map((s,i)=>`<button type="button" class="chip ${i===0?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea placeholder="${de?'z.B. ohne Salz':'es. senza sale'}"></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet('<div class=&quot;badge ok&quot; style=&quot;margin-top:10px&quot;>${t('st_confirmed')}</div>')">${t("confirm")}</button>
  `);
}
function mealCancel() {
  const de = state.lang === 'de';
  toast(de ? "Bestellung storniert" : "Prenotazione annullata");
}

/* ---- 7. Lavanderia ---- */
function svcLaundry() {
  const de = state.lang === 'de';
  const o = DATA.laundryOrder;
  const stepLabels = { received: t("st_received"), processing: t("st_processing"), ready: t("st_ready") };
  return svcHead("🧺","s_laundry", de?"Wäscheservice für externe Kunden.":"Servizio lavanderia per clienti esterni.") + `
    <div class="card">
      <div class="card-title">${de?"Preisliste":"Listino prezzi"}</div>
      ${DATA.laundryServices.map(s=>`<div class="info-line"><span class="k">${de?s.de:s.it}</span><span class="v">${s.price}</span></div>`).join("")}
    </div>
    <div class="card">
      <div class="flex-between"><div class="card-title" style="margin:0">${de?"Auftrag":"Ordine"} ${o.id}</div></div>
      <div class="stepper mt-8">
        ${o.steps.map((s,i)=>`
          <div class="step ${i < o.current ? 'done' : i===o.current ? 'current':''}">
            <div class="dot">${i <= o.current ? '✓':''}</div>
            <div class="st-body"><div class="st-title">${stepLabels[s]}</div>${i===o.current?`<div class="st-sub">${de?'Aktueller Status':'Stato attuale'}</div>`:''}</div>
          </div>`).join("")}
      </div>
      <div class="notice" style="margin:6px 0 0"><span class="n-ico">✅</span><span>${L(o,'msg')}</span></div>
    </div>
    <button class="btn btn-primary btn-lg" onclick="laundryRequest()">📦 ${de?"Abholung anfragen":"Richiedi ritiro"}</button>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="simpleRequest('${de?'Kostenvoranschlag':'Richiesta preventivo'}')">💰 ${de?"Offerte":"Preventivo"}</button>
      <button class="btn btn-secondary" onclick="openChatThread('laundry')">💬 ${de?"Nachricht":"Messaggio"}</button>
    </div>
  `;
}
function laundryRequest() {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?"Abholung anfragen":"Richiesta di ritiro"}</h2>
    <div class="field"><label>${de?"Art":"Tipo di servizio"}</label><select>${DATA.laundryServices.map(s=>`<option>${de?s.de:s.it}</option>`).join("")}</select></div>
    <div class="field"><label>${de?"Abholdatum":"Data ritiro"}</label><input type="date" value="2026-07-24"></div>
    <div class="field"><label>${de?"Adresse":"Indirizzo"}</label><input value="${esc(DATA.user.address)}"></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet()">${t("send")}</button>
  `);
}

/* ---- 8. Specialisti ---- */
function svcSpecialists() {
  const de = state.lang === 'de';
  return svcHead("🦷","s_specialists", de?"Fachärzte und Partner-Professionals.":"Specialisti e professionisti partner.") + `
    ${DATA.specialists.map((s,i)=>`
      <div class="card">
        <div class="flex-between">
          <div style="display:flex;gap:12px;align-items:center">
            <div class="lr-ico" style="font-size:22px">${s.icon}</div>
            <div>
              <div class="lr-title">${L(s,'name')}</div>
              <div class="lr-sub">${esc(s.who)} · ${L(s,'days')}</div>
            </div>
          </div>
          ${s.partner ? `<span class="badge info">Partner</span>` : `<span class="badge ok">CSB</span>`}
        </div>
        <button class="btn btn-secondary btn-sm mt-8" style="width:100%" onclick="specVisit('${esc(L(s,'name'))}')">📅 ${de?"Termin anfragen":"Richiedi visita"}</button>
      </div>`).join("")}
    <div class="notice"><span class="n-ico">ℹ️</span><span>${de?"Einige Fachpersonen sind unabhängig vom CSB, werden aber als Partner der Plattform vorgestellt.":"Alcuni professionisti sono indipendenti dal CSB ma presentati come partner della piattaforma."}</span></div>
  `;
}
function specVisit(name) {
  const de = state.lang === 'de';
  openSheet(`
    <h2>${de?"Termin anfragen":"Richiedi visita"}</h2>
    <p class="muted">${esc(name)}</p>
    <div class="field"><label>${de?"Datum":"Data"}</label><input type="date" value="2026-09-02"></div>
    <div class="field"><label>${de?"Uhrzeit":"Orario"}</label>
      <div class="chip-select">${["09:00","10:30","14:00","15:30"].map((s,i)=>`<button type="button" class="chip ${i===2?'selected':''}" onclick="pickChip(this)">${s}</button>`).join("")}</div></div>
    <div class="field"><label>${t("note_optional")}</label><textarea></textarea></div>
    <button class="btn btn-primary btn-lg" onclick="successSheet()">${t("send")}</button>
  `);
}

/* ---- 9. Promemoria sanitari ---- */
function svcReminders() {
  const de = state.lang === 'de';
  return svcHead("🔔","s_reminders", de?"Personalisierbare Gesundheits-Erinnerungen.":"Promemoria sanitari personalizzabili.") + `
    ${DATA.reminders.map(r=>`
      <div class="card" style="${r.on?'':'opacity:.6'}">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div class="lr-ico">${r.icon}</div>
          <div style="flex:1">
            <div style="font-weight:600;color:var(--ink)">${L(r,'text')}</div>
            <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
              ${r.action ? `<button class="btn btn-primary btn-sm" onclick="reminderBook()">${de?'Jetzt buchen':'Prenota ora'}</button>` : `<button class="btn btn-secondary btn-sm" onclick="toast('${de?'Verschoben':'Posticipato'}')">${de?'Verschieben':'Posticipa'}</button>`}
              <button class="switch ${r.on?'on':''}" onclick="toggleReminder('${r.id}',this)" aria-label="toggle"></button>
            </div>
          </div>
        </div>
      </div>`).join("")}
    <div class="notice"><span class="n-ico">💡</span><span>${de?"Aktivieren oder deaktivieren Sie einzelne Erinnerungen.":"Puoi attivare o disattivare i singoli promemoria."}</span></div>
  `;
}
function toggleReminder(id, btn) {
  const r = DATA.reminders.find(x => x.id === id);
  if (r) { r.on = !r.on; }
  btn.classList.toggle("on");
  btn.closest(".card").style.opacity = r && r.on ? "1" : ".6";
}
function reminderBook() { bookVisitFlow(); }

/* ---- 13. Contatti ---- */
function svcContacts() {
  const de = state.lang === 'de';
  return svcHead("📞","s_contacts", de?"Nützliche Nummern und Standort.":"Numeri utili e come raggiungerci.") + `
    <div class="card">
      ${DATA.contacts.map(c=>`
        <div class="list-row">
          <div class="lr-ico" style="${c.emergency?'background:#f2e2dc':''}">${c.icon}</div>
          <div class="lr-body"><div class="lr-title">${L(c,'label')}</div><div class="lr-sub">${esc(c.value)}</div></div>
          <a class="doc-actions" href="tel:${esc(c.value.replace(/\s/g,''))}"><button title="${t('call')}">📞</button></a>
        </div>`).join("")}
    </div>
    <div class="card">
      <div class="card-title">📍 ${de?"Adresse":"Indirizzo"}</div>
      <p class="muted mb-0">Centro Sanitario Bregaglia<br>Via Principale, 7605 Stampa (GR)</p>
      <div style="height:130px;border-radius:14px;margin-top:12px;background:linear-gradient(135deg,#dfe8d6,#cbd8c0);display:flex;align-items:center;justify-content:center;font-size:40px;border:1px solid var(--line)">🗺️</div>
      <div class="btn-row mt-16">
        <a class="btn btn-secondary" href="tel:+41818220000" style="text-decoration:none">📞 ${t("call")}</a>
        <button class="btn btn-secondary" onclick="toast('${de?'Route wird geöffnet…':'Apertura indicazioni…'}')">🧭 ${t("directions")}</button>
      </div>
    </div>
  `;
}

/* ---- 12. Eventi ---- */
function svcEvents() {
  const de = state.lang === 'de';
  return svcHead("📅","s_events", de?"Veranstaltungen und Neuigkeiten des CSB.":"Eventi, corsi e novità del CSB.") + `
    ${DATA.events.map((e,i)=>`
      <div class="card">
        <div style="display:flex;gap:12px">
          <div class="lr-ico" style="font-size:24px">${e.icon}</div>
          <div style="flex:1">
            <div class="lr-title">${L(e,'title')}</div>
            <div class="lr-sub">📅 ${e.date} · 🕐 ${e.time}</div>
            <div class="lr-sub">📍 ${L(e,'place')}</div>
            <p class="muted" style="margin:8px 0 0;font-size:.9rem">${L(e,'desc')}</p>
            <button class="btn btn-primary btn-sm mt-8" onclick="eventSignup('${esc(L(e,'title'))}')">${de?"Anmelden":"Iscriviti"}</button>
          </div>
        </div>
      </div>`).join("")}
  `;
}
function eventSignup(title) {
  successSheet(`<p class="muted">${esc(title)}</p>`);
}

/* ================= PRENOTAZIONI ================= */
function viewBookings() {
  const de = state.lang === 'de';
  const badge = (s) => s==='wait' ? `<span class="badge wait">${t('st_wait')}</span>` : `<span class="badge ok">${t('st_confirmed')}</span>`;
  return `
    <h1 class="page-title">${t("nav_bookings")}</h1>
    <div class="tabs">
      <button class="active" onclick="tabSwitch(this,'bk-future')">${de?"Zukünftig":"Futuri"}</button>
      <button onclick="tabSwitch(this,'bk-past')">${de?"Vergangen":"Passati"}</button>
    </div>
    <div id="bk-future">
      ${DATA.appointments.map(a=>`
        <div class="card">
          <div class="flex-between">
            <div style="display:flex;gap:12px;align-items:center">
              <div class="lr-ico" style="font-size:22px">${a.icon}</div>
              <div><div class="lr-title">${L(a,'title')}</div><div class="lr-sub">${a.date} · ${a.time} · ${esc(a.who)}</div></div>
            </div>
            ${badge(a.status)}
          </div>
        </div>`).join("")}
      <button class="btn btn-primary btn-lg mt-8" onclick="go('services')">➕ ${de?"Neue Buchung":"Nuova prenotazione"}</button>
    </div>
    <div id="bk-past" class="hidden">
      ${DATA.pastAppointments.map(a=>`
        <div class="card" style="opacity:.85">
          <div style="display:flex;gap:12px;align-items:center">
            <div class="lr-ico" style="font-size:22px">${a.icon}</div>
            <div><div class="lr-title">${L(a,'title')}</div><div class="lr-sub">${a.date} · ${a.time} · ${esc(a.who)}</div></div>
          </div>
        </div>`).join("")}
    </div>
  `;
}
function tabSwitch(btn, id) {
  btn.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const cont = btn.closest(".view");
  ["bk-future","bk-past","doc-health","doc-admin","doc-appt"].forEach(x => { const el = cont.querySelector("#"+x); if (el) el.classList.add("hidden"); });
  const target = cont.querySelector("#"+id); if (target) target.classList.remove("hidden");
}

/* ================= NOTIFICHE ================= */
function viewNotifications() {
  const de = state.lang === 'de';
  return `
    <div class="flex-between">
      <h1 class="page-title" style="margin:0">${t("nav_notifications")}</h1>
      <button class="btn-ghost btn-sm" onclick="markAllRead()">${de?"Alle gelesen":"Segna letti"}</button>
    </div>
    <p class="lead">${de?"Ihr Mitteilungszentrum.":"Il tuo centro notifiche."}</p>
    <div class="card">
      ${DATA.notifications.map(n=>`
        <div class="list-row clickable" onclick="openNotif('${n.id}')">
          <div class="lr-ico">${n.icon}</div>
          <div class="lr-body">
            <div class="lr-title" style="${n.unread?'':'font-weight:600'}">${L(n,'title')} ${n.unread?'<span class="badge new" style="font-size:.6rem;padding:2px 7px">•</span>':''}</div>
            <div class="lr-sub">${L(n,'sub')}</div>
            <div class="faint" style="font-size:.78rem">${L(n,'time')}</div>
          </div>
        </div>`).join("")}
    </div>
  `;
}
function markAllRead() { DATA.notifications.forEach(n => n.unread = false); render(); }
function openNotif(id) {
  const n = DATA.notifications.find(x => x.id === id);
  if (n) n.unread = false;
  const de = state.lang === 'de';
  openSheet(`
    <div style="text-align:center;padding-top:8px"><div style="font-size:40px">${n.icon}</div></div>
    <h2 style="text-align:center">${L(n,'title')}</h2>
    <p class="muted text-center">${L(n,'sub')}</p>
    <p class="faint text-center">${L(n,'time')}</p>
    <button class="btn btn-primary" onclick="closeSheet();notifAction('${n.cat}')">${de?"Öffnen":"Apri"}</button>
    <button class="btn btn-ghost" onclick="closeSheet()">${t("close")}</button>
  `);
}
function notifAction(cat) {
  const map = { referti:"profile", pasti:"meals", lavanderia:"laundry", spitex:"spitex", "casa anziani":"carehome", eventi:"events", appuntamenti:"bookings", fatture:"profile" };
  const dest = map[cat] || "home";
  if (dest === "profile") requireAuth("profile");
  else if (["bookings"].includes(dest)) go(dest);
  else go("service", dest);
}

/* ================= PROFILO / AREA PERSONALE ================= */
function viewProfile() {
  const de = state.lang === 'de';
  if (!state.authed) {
    return `
      <h1 class="page-title">${t("nav_profile")}</h1>
      <div class="card text-center pad-lg">
        <div class="avatar" style="margin:6px auto 14px;width:70px;height:70px;font-size:1.6rem">${DATA.user.initials}</div>
        <p class="muted">${de?"Melden Sie sich an, um Ihren persönlichen Bereich zu sehen: Dokumente, Termine, Rechnungen und Mitteilungen.":"Accedi per vedere la tua area personale: documenti, appuntamenti, fatture e comunicazioni."}</p>
        <button class="btn btn-primary btn-lg" onclick="requireAuth('profile')">🔒 ${t("login_personal")}</button>
      </div>
      <div class="card">
        <div class="card-title">${de?"Öffentlicher Zugang":"Accesso pubblico"}</div>
        <p class="muted mb-0" style="font-size:.92rem">${de?"Ohne Anmeldung sehen Sie: Dienste, Öffnungszeiten, Menüs, Veranstaltungen und Kontakte.":"Senza accesso puoi vedere: servizi, orari, menù, eventi e contatti."}</p>
      </div>
    `;
  }
  const u = DATA.user;
  return `
    <div class="profile-head">
      <div class="avatar">${u.initials}</div>
      <div style="flex:1">
        <div class="p-name">${esc(u.name)}</div>
        <div class="p-id">${de?"Benutzer-Nr.":"N. utente"}: ${u.userId}</div>
      </div>
      <button class="btn-ghost" onclick="logout()" title="${t('logout')}" style="width:auto;font-size:1.3rem">⎋</button>
    </div>

    <div class="section-title" style="margin-top:8px">${t("personal_data")}</div>
    <div class="card">
      <div class="info-line"><span class="k">${de?"Geburtsdatum":"Data di nascita"}</span><span class="v">${u.birth}</span></div>
      <div class="info-line"><span class="k">Email</span><span class="v" style="font-size:.85rem">${esc(u.email)}</span></div>
      <div class="info-line"><span class="k">${de?"Telefon":"Telefono"}</span><span class="v">${esc(u.phone)}</span></div>
      <div class="info-line"><span class="k">${t("pref_language")}</span><span class="v">${state.lang==='it'?'Italiano':'Deutsch'}</span></div>
    </div>

    <div class="section-title">🗂️ ${de?"Digitale Mappe":"Cartella digitale"}</div>
    <div class="tabs">
      <button class="active" onclick="tabSwitch(this,'doc-health')">${de?"Gesundheit":"Sanitari"}</button>
      <button onclick="tabSwitch(this,'doc-admin')">${de?"Verwaltung":"Amministrativi"}</button>
      <button onclick="tabSwitch(this,'doc-appt')">${t("appointments")}</button>
    </div>
    <div class="card" id="doc-health">
      ${DATA.documents.health.map(d=>docRow(d)).join("")}
    </div>
    <div class="card hidden" id="doc-admin">
      ${DATA.documents.admin.map(d=>docRow(d,true)).join("")}
    </div>
    <div class="card hidden" id="doc-appt">
      ${DATA.appointments.map(a=>`<div class="doc-row"><div class="doc-ico">${a.icon}</div><div><div class="lr-title">${L(a,'title')}</div><div class="lr-sub">${a.date} · ${a.time}</div></div><div style="margin-left:auto">${a.status==='wait'?`<span class="badge wait">${t('st_wait')}</span>`:`<span class="badge ok">${t('st_confirmed')}</span>`}</div></div>`).join("")}
    </div>

    <div class="section-title">👨‍👩‍👧 ${t("authorized_family")}</div>
    <div class="card">
      ${u.family.map(f=>`<div class="list-row"><div class="lr-ico">👤</div><div class="lr-body"><div class="lr-title">${esc(f.name)}</div><div class="lr-sub">${state.lang==='de'?f.rel_de:f.rel_it}</div></div></div>`).join("")}
    </div>

    <div class="section-title">🔐 ${t("privacy_settings")}</div>
    <div class="card">
      <div class="switch-row"><div><div class="sr-label">${de?"Angehörige können Dokumente sehen":"I familiari possono vedere i documenti"}</div></div><button class="switch on" onclick="this.classList.toggle('on')"></button></div>
      <div class="switch-row"><div><div class="sr-label">${de?"Fotos im Familienbereich erlauben":"Consenti foto nell'area famiglia"}</div></div><button class="switch on" onclick="this.classList.toggle('on')"></button></div>
      <div class="switch-row"><div><div class="sr-label">${de?"Push-Mitteilungen":"Notifiche push"}</div></div><button class="switch on" onclick="this.classList.toggle('on')"></button></div>
    </div>

    <button class="btn btn-secondary" onclick="logout()">⎋ ${t("logout")}</button>
    <div style="height:8px"></div>
  `;
}
function docRow(d, admin) {
  return `<div class="doc-row">
    <div class="doc-ico">${d.icon}</div>
    <div style="min-width:0"><div class="lr-title" style="font-size:.96rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${L(d,'title')}</div><div class="lr-sub">${d.date}${d.amount?` · <strong>${d.amount}</strong>`:''}</div></div>
    <div class="doc-actions">
      <button title="${t('view')}" onclick="viewDoc('${esc(L(d,'title'))}')">👁️</button>
      <button title="${t('download')}" onclick="toast('${state.lang==='de'?'Download gestartet':'Download avviato'}')">⬇️</button>
      <button title="${t('share')}" onclick="toast('${state.lang==='de'?'Link kopiert':'Link copiato'}')">🔗</button>
    </div>
  </div>`;
}
function viewDoc(title) {
  const de = state.lang === 'de';
  openSheet(`
    <h2 style="font-size:1.15rem">${esc(title)}</h2>
    <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:20px;min-height:280px">
      <div style="text-align:center;border-bottom:2px solid var(--brown);padding-bottom:10px;margin-bottom:14px">
        ${treeLogo('logo-tree')}
        <strong style="display:block;color:var(--brown-dark)">Centro Sanitario Bregaglia</strong>
        <span class="faint">${de?'DEMO-Dokument – keine echten Daten':'Documento DIMOSTRATIVO – dati non reali'}</span>
      </div>
      <p class="muted" style="font-size:.9rem">${esc(title)}</p>
      <div style="height:10px;background:#f0e9db;border-radius:4px;margin:10px 0;width:90%"></div>
      <div style="height:10px;background:#f0e9db;border-radius:4px;margin:10px 0;width:70%"></div>
      <div style="height:10px;background:#f0e9db;border-radius:4px;margin:10px 0;width:80%"></div>
      <div style="height:10px;background:#f0e9db;border-radius:4px;margin:10px 0;width:60%"></div>
      <p class="faint" style="margin-top:20px">${de?'Patient: Maria Rossi · CSB-000125':'Paziente: Maria Rossi · CSB-000125'}</p>
    </div>
    <div class="btn-row mt-16">
      <button class="btn btn-secondary" onclick="toast('${de?'Download gestartet':'Download avviato'}')">⬇️ ${t('download')}</button>
      <button class="btn btn-primary" onclick="closeSheet()">${t('close')}</button>
    </div>
  `);
}
function logout() {
  state.authed = false; state.familyUnlocked = false;
  toast(state.lang==='de' ? "Abgemeldet" : "Disconnesso");
  go("home");
}

/* ================= MESSAGGISTICA ================= */
function viewChatList() {
  const de = state.lang === 'de';
  return `
    <div style="text-align:center;margin-bottom:6px"><div style="font-size:40px">💬</div>
    <h1 class="page-title">${t("s_messages")}</h1>
    <p class="lead">${de?"Sichere Nachrichten – wählen Sie einen Dienst.":"Messaggistica sicura – scegli un servizio."}</p></div>
    <div class="card">
      ${CHAT_SERVICES.map(s=>`
        <div class="list-row clickable" onclick="openChatThread('${s.id}')">
          <div class="lr-ico">${s.icon}</div>
          <div class="lr-body"><div class="lr-title">${t(s.key)}</div></div>
          <div class="lr-arrow">›</div>
        </div>`).join("")}
    </div>
    <div class="notice"><span class="n-ico">🔒</span><span>${de?"Demo-Chat mit vorbereiteten Nachrichten.":"Chat dimostrativa con messaggi già preparati."}</span></div>
  `;
}
function openChatThread(svc) { go("chatThread", svc); }
function viewChatThread() {
  const svc = state.param;
  const de = state.lang === 'de';
  const svcObj = CHAT_SERVICES.find(s => s.id === svc) || DATA.services.find(s=>s.id===svc);
  const svcName = svcObj ? t(svcObj.key) : "";
  const preset = DATA.chatPresets[svc] || DATA.chatPresets.default;
  const bubbles = preset.map(b => `
    <div class="bubble ${b.from}">${de?b.de:b.it}<div class="b-time">${b.time}</div></div>`).join("");
  return `
    <div style="text-align:center;margin:-6px 0 8px"><div class="lr-ico" style="margin:0 auto;font-size:22px">${svcObj?svcObj.icon:'💬'}</div>
    <strong style="color:var(--brown-dark)">${esc(svcName)}</strong></div>
    <div class="chat-thread" id="chat-thread">${bubbles}</div>
    <div class="chat-input">
      <input id="chat-in" placeholder="${de?'Nachricht schreiben…':'Scrivi un messaggio…'}" onkeydown="if(event.key==='Enter')sendChat()">
      <button onclick="sendChat()">➤</button>
    </div>
  `;
}
function sendChat() {
  const inp = $("#chat-in");
  const thread = $("#chat-thread");
  if (!inp || !thread) return;
  const val = inp.value.trim();
  if (!val) return;
  const de = state.lang === 'de';
  const now = new Date().toLocaleTimeString(de?'de-CH':'it-CH', {hour:'2-digit',minute:'2-digit'});
  const me = document.createElement("div");
  me.className = "bubble me";
  me.innerHTML = `${esc(val)}<div class="b-time">${now}</div>`;
  thread.appendChild(me);
  inp.value = "";
  thread.parentElement.scrollTop = thread.scrollHeight;
  setTimeout(() => {
    const rep = document.createElement("div");
    rep.className = "bubble them";
    rep.innerHTML = `${de?'Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze.':'Grazie per il suo messaggio. Le risponderemo a breve.'}<div class="b-time">${now}</div>`;
    thread.appendChild(rep);
    const main = $(".app-main"); if (main) main.scrollTop = main.scrollHeight;
  }, 900);
}

/* ================= PAGINA FINALE ================= */
function viewFinal() {
  const de = state.lang === 'de';
  return `
    <div style="text-align:center;padding:14px 0">
      ${treeLogo('logo-tree')}
      <h1 style="font-size:2rem;margin:12px 0 4px;color:var(--brown-dark)">MyCSB</h1>
      <p style="font-size:1.15rem;font-weight:700;color:var(--brown-soft)">${t("final_slogan")}</p>
    </div>
    <div class="card pad-lg">
      <p>${de?"MyCSB will die Beziehung zwischen dem Gesundheitszentrum Bergell, den Bürgerinnen und Bürgern und den Familien vereinfachen und die Dienste zugänglicher, transparenter und näher an den Menschen machen.":"MyCSB vuole semplificare il rapporto tra il Centro Sanitario Bregaglia, i cittadini e le famiglie, rendendo i servizi più accessibili, trasparenti e vicini alle persone."}</p>
      <p class="mb-0">${de?"Das Projekt kann schrittweise entwickelt werden – ausgehend von Informationsdiensten und Buchungen bis hin zur künftigen Integration von Dokumenten und digitalen Gesundheitsdiensten.":"Il progetto può essere sviluppato gradualmente, partendo dai servizi informativi e dalle prenotazioni, per arrivare in futuro all'integrazione con documenti e servizi sanitari digitali."}</p>
    </div>
    <div class="section-title">${de?"Mögliche zukünftige Entwicklungen":"Possibili sviluppi futuri"}</div>
    <div class="card">
      ${(de?["Online-Zahlungen","Integration mit persönlichem Kalender","Erweiterte Authentifizierung","Vollständige Übersetzung","Anbindung an CSB-Software"]:["Pagamenti online","Integrazione con calendario personale","Autenticazione avanzata","Traduzione completa","Collegamento ai software CSB"]).map(x=>`<div class="list-row"><div class="lr-ico">🚀</div><div class="lr-body"><div class="lr-title" style="font-size:.95rem;font-weight:600">${x}</div></div></div>`).join("")}
    </div>
    <button class="btn btn-primary btn-lg" onclick="go('home')">🏠 ${de?"Zur Startseite":"Torna alla home"}</button>
  `;
}

/* ------------------- Init ------------------- */
window.state = state; // esposto per debug
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  if (params.get("skip") === "1") state.route = "home";
  render();
});
