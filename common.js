/* ═════════════════════════════════════
   Trunklii — Shared JS
   Builds nav + search + Q&A bot on every page
   ═════════════════════════════════════ */
(function(){

// ── Detect studio + base path ──
function getStudioKey(){
  return location.pathname.includes('/nr/') ? 'nr' : 'et';
}
function getBasePath(){
  // Find /et/ or /nr/ in path and use that as base
  const m = location.pathname.match(/^(.*?\/(et|nr)\/)/);
  return m ? m[1] : './';
}
function getRootPath(){
  // Path back to root (where site-data.js lives)
  const m = location.pathname.match(/^(.*?)\/(et|nr)\//);
  return m ? (m[1]||'') + '/' : './';
}

const STUDIO = getStudioKey();
const BASE = getBasePath();   // e.g. /et/ or /nr/
const ROOT = getRootPath();   // e.g. / (parent of et/)

window.TRUNKLII = { STUDIO, BASE, ROOT };

// ── Nav definition (single source of truth) ──
const NAV_ITEMS = [
  { id:'about', label:'About', href:BASE+'#about' },
  { id:'flow', label:'Flow', href:BASE+'#flow' },
  { id:'gallery', label:'Gallery', href:BASE+'#gallery', sub:[
    { label:'All', href:BASE+'#gallery' },
    { label:'七五三', href:BASE+'#gallery?cat=753' },
    { label:'Newborn', href:BASE+'#gallery?cat=newborn' },
    { label:'Birthday', href:BASE+'#gallery?cat=birthday' },
    { label:'Family', href:BASE+'#gallery?cat=family' },
    { label:'Maternity', href:BASE+'#gallery?cat=maternity' }
  ]},
  { id:'costume', label:'Costume', href:BASE+'#costume' },
  { id:'kimono', label:'Kimono', href:BASE+'#kimono' },
  { id:'plans', label:'Plans', href:BASE+'#plans' },
  { id:'calendar', label:'Calendar', href:BASE+'calendar/' },
  { id:'reservation', label:'Reservation', href:BASE+'reservation/' },
  { id:'goods', label:'Goods', href:BASE+'goods/' },
  { id:'qa', label:'Q&A', href:BASE+'qa/' },
  { id:'cancellation', label:'Cancel Policy', href:BASE+'cancellation-policy/' },
  { id:'recruit', label:'Recruit', href:BASE+'#recruit', isNew:true }
];

// ── Build nav HTML ──
function buildNav(currentPage){
  const data = window.SITE_DATA;
  const d = data.studios[STUDIO];
  const other = STUDIO === 'et' ? 'nr' : 'et';
  const otherD = data.studios[other];
  const otherPath = ROOT + other + '/';

  const navItems = NAV_ITEMS.map(item => {
    const isCurrent = item.id === currentPage;
    if(item.sub){
      return `
        <li class="nav-item">
          <a href="${item.href}" class="nav-link ${isCurrent?'current':''}">${item.label}${item.isNew?'<sup>NEW</sup>':''}</a>
          <div class="nav-drop">
            ${item.sub.map(s=>`<a href="${s.href}">${s.label}</a>`).join('')}
          </div>
        </li>`;
    }
    return `<li class="nav-item"><a href="${item.href}" class="nav-link ${isCurrent?'current':''}">${item.label}${item.isNew?'<sup>NEW</sup>':''}</a></li>`;
  }).join('');

  return `
<header class="nav">
  <div class="nav-top">
    <button class="hamburger" onclick="TRUNKLII_NAV.openMob()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="brand-tabs">
      <li><a href="${ROOT}et/" class="brand-tab ${STUDIO==='et'?'active':''}">Studio et.</a></li>
      <li><a href="${ROOT}nr/" class="brand-tab ${STUDIO==='nr'?'active':''}">Maison nr.</a></li>
    </ul>
    <div class="nav-logo-wrap">
      <a href="${BASE}" class="nav-logo" id="nav-logo-link"></a>
    </div>
    <div class="nav-right">
      <button class="nav-icon-btn" onclick="TRUNKLII_NAV.openSearch()" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="7"/>
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-linecap="round"/>
        </svg>
        <span>Search</span>
      </button>
      <a href="${BASE}#access" class="nav-icon-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        <span>Access</span>
      </a>
      <a href="${d.instagram}" target="_blank" rel="noopener" class="nav-ig" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
      </a>
    </div>
  </div>
  <nav class="nav-bot">
    <ul class="nav-menu">${navItems}</ul>
    <a href="${d.bookingUrl}" class="nav-book">${d.bookingLabel}</a>
  </nav>
</header>

<div class="mob-nav" id="mob-nav">
  <div class="mob-top">
    <button class="mob-close" onclick="TRUNKLII_NAV.closeMob()" aria-label="Close">✕</button>
    <div class="mob-logo" id="mob-logo"></div>
    <div class="mob-spacer"></div>
  </div>

  <div style="padding:1rem 1.5rem;border-bottom:1px solid #f0eee9">
    <input type="text" class="mob-search-input" placeholder="サイト内を検索..." id="mob-search-input" onkeydown="if(event.key==='Enter'){TRUNKLII_NAV.closeMob();TRUNKLII_NAV.openSearch(this.value)}"/>
  </div>

  <div class="mob-brand-row">
    <a href="${ROOT}et/" class="mob-brand-tab ${STUDIO==='et'?'active':''}">
      <img class="brand-svg" src="${ROOT}assets/et-square.svg" alt="Studio et."/>
    </a>
    <a href="${ROOT}nr/" class="mob-brand-tab ${STUDIO==='nr'?'active':''}">
      <img class="brand-svg" src="${ROOT}assets/nr-square.svg" alt="Maison nr."/>
    </a>
  </div>

  <div class="mob-list">
    ${NAV_ITEMS.map(item=>{
      if(item.sub){
        return `
        <div class="mob-item">
          <div class="mob-item-top" onclick="TRUNKLII_NAV.toggleMobItem(event,this)">
            <span class="mob-item-label">${item.label}</span><span class="mob-arrow">›</span>
          </div>
          <div class="mob-sub">
            ${item.sub.map(s=>`<a href="${s.href}" onclick="TRUNKLII_NAV.closeMob()">${s.label}</a>`).join('')}
          </div>
        </div>`;
      }
      return `
        <div class="mob-item">
          <div class="mob-item-top">
            <a href="${item.href}" class="mob-item-label" onclick="TRUNKLII_NAV.closeMob()">${item.label}${item.isNew?'<sup>NEW</sup>':''}</a>
          </div>
        </div>`;
    }).join('')}
  </div>

  <div class="mob-actions">
    <a href="${d.bookingUrl}" class="mob-book-btn" onclick="TRUNKLII_NAV.closeMob()">${d.bookingLabel}</a>
  </div>
</div>

<!-- SEARCH OVERLAY -->
<div class="search-overlay" id="search-overlay">
  <div class="search-head">
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="7"/>
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-linecap="round"/>
    </svg>
    <input type="text" class="search-input" id="search-input" placeholder="What are you looking for?" autofocus/>
    <button class="search-close" onclick="TRUNKLII_NAV.closeSearch()" aria-label="Close">✕</button>
  </div>
  <div class="search-results" id="search-results">
    <div class="search-empty">キーワードを入力してください。</div>
  </div>
</div>

<!-- Q&A BOT FAB -->
<button class="qa-bot-fab" id="qa-bot-fab" onclick="TRUNKLII_QA.open()" aria-label="Q&A">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M21 12a8 8 0 1 1-3-6.3L21 4l-1 4.5"/>
    <circle cx="9" cy="12" r="1" fill="currentColor"/>
    <circle cx="13" cy="12" r="1" fill="currentColor"/>
    <circle cx="17" cy="12" r="1" fill="currentColor"/>
  </svg>
</button>

<!-- Q&A BOT PANEL -->
<div class="qa-bot-panel" id="qa-bot-panel">
  <div class="qa-head">
    <div>
      <div class="qa-head-title">Q&A Assistant</div>
      <div class="qa-head-sub">${d.name}</div>
    </div>
    <button class="qa-close" onclick="TRUNKLII_QA.close()" aria-label="Close">✕</button>
  </div>
  <div class="qa-body" id="qa-body"></div>
  <div class="qa-suggestions" id="qa-suggestions"></div>
  <div class="qa-input-wrap">
    <input type="text" class="qa-input" id="qa-input" placeholder="質問を入力..." onkeydown="if(event.key==='Enter')TRUNKLII_QA.submit()"/>
    <button class="qa-send" onclick="TRUNKLII_QA.submit()">Send</button>
  </div>
</div>
  `;
}

// ── Logo loader ──
async function loadLogo(){
  try{
    const r = await fetch(ROOT + 'assets/' + STUDIO + '-wide.svg');
    if(!r.ok) throw new Error();
    const svg = await r.text();
    document.getElementById('nav-logo-link').innerHTML = svg;
    document.getElementById('mob-logo').innerHTML = svg;
  }catch(e){
    const d = window.SITE_DATA.studios[STUDIO];
    const fallback = `<span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.6rem;font-weight:300">${d.name}</span>`;
    document.getElementById('nav-logo-link').innerHTML = fallback;
    document.getElementById('mob-logo').innerHTML = fallback;
  }
}

// ── Nav controllers ──
window.TRUNKLII_NAV = {
  openMob(){ document.getElementById('mob-nav').classList.add('open'); document.body.style.overflow='hidden'; },
  closeMob(){ document.getElementById('mob-nav').classList.remove('open'); document.body.style.overflow=''; },
  toggleMobItem(e, el){
    e.preventDefault();
    const item = el.closest('.mob-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.mob-item.open').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  },
  openSearch(prefill){
    const ov = document.getElementById('search-overlay');
    ov.classList.add('open');
    document.body.style.overflow='hidden';
    setTimeout(()=>{
      const inp = document.getElementById('search-input');
      if(prefill){ inp.value = prefill; runSearch(prefill); }
      inp.focus();
    },50);
  },
  closeSearch(){
    document.getElementById('search-overlay').classList.remove('open');
    document.body.style.overflow='';
  }
};

// ── Search index ──
function buildSearchIndex(){
  const d = window.SITE_DATA.studios[STUDIO];
  const idx = [];
  const push = (title, snippet, url, section)=> idx.push({title, snippet, url, section});

  push(d.about.heading, d.about.body, BASE+'#about', 'About');
  push(d.flow.heading, d.flow.body, BASE+'#flow', 'Flow');
  d.flow.steps.forEach(s=>push(s.title, s.desc + (s.note?' ＊'+s.note:''), BASE+'#flow', 'Flow'));
  d.gallery.forEach(g=>push(g.caption||'Photo', g.category, BASE+'#gallery', 'Gallery'));
  push(d.costume.heading, d.costume.body, BASE+'#costume', 'Costume');
  d.costume.items.forEach(i=>push(i.name, i.desc, BASE+'#costume', 'Costume'));
  push(d.kimono.heading, d.kimono.body, BASE+'#kimono', 'Kimono');
  d.kimono.items.forEach(i=>push(i.name, i.desc, BASE+'#kimono', 'Kimono'));
  d.plans.forEach(p=>push(p.name, `${p.price} — ${p.desc}`, BASE+'#plans', 'Plans'));
  if(d.calendar) push(d.calendar.heading, d.calendar.body, BASE+'calendar/', 'Calendar');
  if(d.reservation){
    push(d.reservation.heading, d.reservation.body, BASE+'reservation/', 'Reservation');
    (d.reservation.notes||[]).forEach(n=>push('Reservation Note', n, BASE+'reservation/', 'Reservation'));
  }
  if(d.cancelPolicy){
    push(d.cancelPolicy.heading, d.cancelPolicy.body, BASE+'cancellation-policy/', 'Cancel Policy');
    (d.cancelPolicy.items||[]).forEach(p=>push(p.when, p.fee, BASE+'cancellation-policy/', 'Cancel Policy'));
  }
  if(d.goods){
    push(d.goods.heading, d.goods.body, BASE+'goods/', 'Goods');
    (d.goods.items||[]).forEach(i=>push(i.name, `${i.price} — ${i.desc}`, BASE+'goods/', 'Goods'));
  }
  if(d.qa){
    push(d.qa.heading, d.qa.body, BASE+'qa/', 'Q&A');
    (d.qa.items||[]).forEach(item=>push(item.q, item.a, BASE+'qa/', 'Q&A'));
  }
  push(d.recruit.heading, d.recruit.body, BASE+'#recruit', 'Recruit');
  d.recruit.positions.forEach(p=>push(p.title, p.desc, BASE+'#recruit', 'Recruit'));
  return idx;
}

let SEARCH_INDEX = null;

function runSearch(query){
  if(!SEARCH_INDEX) SEARCH_INDEX = buildSearchIndex();
  const q = query.trim().toLowerCase();
  const out = document.getElementById('search-results');
  if(!q){ out.innerHTML = '<div class="search-empty">キーワードを入力してください。</div>'; return; }
  const results = SEARCH_INDEX.filter(item=>{
    return (item.title||'').toLowerCase().includes(q) || (item.snippet||'').toLowerCase().includes(q);
  });
  if(!results.length){ out.innerHTML = '<div class="search-empty">「'+escHtml(query)+'」に一致する結果はありません。</div>'; return; }
  // Group by section
  const groups = {};
  results.forEach(r=>{ (groups[r.section]=groups[r.section]||[]).push(r); });
  out.innerHTML = Object.keys(groups).map(sec=>`
    <div class="search-section">
      <div class="search-section-title">${escHtml(sec)} (${groups[sec].length})</div>
      ${groups[sec].slice(0,8).map(r=>`
        <a href="${r.url}" class="search-result" onclick="TRUNKLII_NAV.closeSearch()">
          <div class="search-result-title">${highlight(r.title, q)}</div>
          <div class="search-result-snippet">${highlight((r.snippet||'').slice(0,140), q)}</div>
          <div class="search-result-meta">${escHtml(sec)}</div>
        </a>
      `).join('')}
    </div>
  `).join('');
}

function escHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function highlight(text, q){
  if(!q) return escHtml(text);
  const escTxt = escHtml(text);
  const escQ = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return escTxt.replace(new RegExp('('+escQ+')','gi'), '<mark>$1</mark>');
}

// ── Q&A Bot ──
window.TRUNKLII_QA = {
  open(){
    document.getElementById('qa-bot-panel').classList.add('open');
    document.getElementById('qa-bot-fab').classList.add('hidden');
    if(!this._initialized){ this.greet(); this._initialized = true; }
  },
  close(){
    document.getElementById('qa-bot-panel').classList.remove('open');
    document.getElementById('qa-bot-fab').classList.remove('hidden');
  },
  greet(){
    const body = document.getElementById('qa-body');
    const d = window.SITE_DATA.studios[STUDIO];
    body.innerHTML = `
      <div class="qa-msg qa-msg-bot">
        <div class="qa-avatar">e</div>
        <div class="qa-bubble">こんにちは。${d.name} のQ&Aアシスタントです。<br>気になることをお気軽にお尋ねください。</div>
      </div>
    `;
    this.showSuggestions();
  },
  showSuggestions(){
    const d = window.SITE_DATA.studios[STUDIO];
    const sug = document.getElementById('qa-suggestions');
    const items = (d.qa?.items||[]);
    const top = items.slice(0,4);
    if(!top.length){ sug.innerHTML = ''; return; }
    sug.innerHTML = top.map(i=>`<button class="qa-chip" onclick="TRUNKLII_QA.askDirect('${escAttr(i.q)}','${escAttr(i.a)}')">${escHtml(i.q)}</button>`).join('');
  },
  submit(){
    const inp = document.getElementById('qa-input');
    const q = inp.value.trim();
    if(!q) return;
    inp.value = '';
    this.addUser(q);
    setTimeout(()=>this.answer(q), 400);
  },
  askDirect(q, a){
    this.addUser(q);
    setTimeout(()=>this.addBot(a), 350);
    document.getElementById('qa-suggestions').innerHTML = '';
  },
  addUser(text){
    const body = document.getElementById('qa-body');
    body.insertAdjacentHTML('beforeend', `<div class="qa-msg qa-msg-user"><div class="qa-bubble">${escHtml(text)}</div></div>`);
    body.scrollTop = body.scrollHeight;
  },
  addBot(text){
    const body = document.getElementById('qa-body');
    body.insertAdjacentHTML('beforeend', `<div class="qa-msg qa-msg-bot"><div class="qa-avatar">e</div><div class="qa-bubble">${text}</div></div>`);
    body.scrollTop = body.scrollHeight;
  },
  answer(query){
    const d = window.SITE_DATA.studios[STUDIO];
    const items = (d.qa?.items||[]);
    const q = query.toLowerCase();
    // Find best match by keyword overlap
    let best = null, bestScore = 0;
    items.forEach(i=>{
      const text = (i.q + ' ' + i.a).toLowerCase();
      let score = 0;
      q.split(/[\s、。,.\?？!！]+/).forEach(w=>{ if(w.length>=2 && text.includes(w)) score+=w.length; });
      if(score > bestScore){ bestScore = score; best = i; }
    });
    if(best && bestScore >= 2){
      this.addBot(escHtml(best.a));
    } else {
      this.addBot(`申し訳ございません、お答えできる情報が見つかりませんでした。<br>詳しくは<a href="${BASE}qa/" style="color:var(--accent);text-decoration:underline">Q&Aページ</a>または<a href="${d.instagram}" target="_blank" style="color:var(--accent);text-decoration:underline">Instagram DM</a>でお問い合わせください。`);
    }
  }
};

function escAttr(s){ return (s||'').replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

// ── Build footer ──
function buildFooter(){
  const g = window.SITE_DATA.global;
  return `
<footer>
  <a href="${ROOT}" class="footer-logo">${(g.brandName||'Trunklii').toUpperCase()}</a>
  <ul class="footer-links">
    <li><a href="${BASE}#about">About</a></li>
    <li><a href="${BASE}#flow">Flow</a></li>
    <li><a href="${BASE}#gallery">Gallery</a></li>
    <li><a href="${BASE}#costume">Costume</a></li>
    <li><a href="${BASE}#kimono">Kimono</a></li>
    <li><a href="${BASE}#plans">Plans</a></li>
    <li><a href="${BASE}calendar/">Calendar</a></li>
    <li><a href="${BASE}reservation/">Reservation</a></li>
    <li><a href="${BASE}goods/">Goods</a></li>
    <li><a href="${BASE}qa/">Q&A</a></li>
    <li><a href="${BASE}cancellation-policy/">Cancel Policy</a></li>
    <li><a href="${BASE}#recruit">Recruit</a></li>
  </ul>
  <span class="footer-copy">${escHtml(g.copyright||'© 2025 Trunklii')}</span>
</footer>
  `;
}

// ── Boot ──
window.TRUNKLII_INIT = function(currentPage){
  document.getElementById('trunklii-nav-mount').innerHTML = buildNav(currentPage||'');
  const fmount = document.getElementById('trunklii-footer-mount');
  if(fmount) fmount.innerHTML = buildFooter();
  loadLogo();

  // Search input wiring
  const sInput = document.getElementById('search-input');
  if(sInput){
    sInput.addEventListener('input', e=>runSearch(e.target.value));
    sInput.addEventListener('keydown', e=>{ if(e.key==='Escape') TRUNKLII_NAV.closeSearch(); });
  }
  document.addEventListener('keydown', e=>{
    if(e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){
      e.preventDefault();
      TRUNKLII_NAV.openSearch();
    }
    if(e.key === 'Escape'){
      TRUNKLII_NAV.closeSearch();
    }
  });
};

})();
